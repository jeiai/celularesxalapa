import argparse
import json
import re
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


DEFAULT_EXCEL = Path(r"C:\Users\CORE\Documents\celularesxalapa\equipos v10.xlsx")
FALLBACK_EXCEL = Path(r"C:\Users\CORE\Documents\celularesxalapa\V7.10    GENERAL .xlsx")
DEFAULT_SITE_JSON = Path("public/data/equipos-catalogo.json")
DEFAULT_REPORT_DIR = Path("reports")

PUBLIC_FILES = [
    Path("app/precios/page.tsx"),
    Path("app/ofertas-telcel/page.tsx"),
    Path("app/api/catalog/route.ts"),
    Path("app/api/quote/route.ts"),
    Path("components/excel-product-browser.tsx"),
    Path("components/sections/catalog.tsx"),
    Path("components/sections/comparison-tool.tsx"),
    Path("components/sections/quote-tool.tsx"),
    Path("components/sections/hero.tsx"),
    Path("components/sections/operations.tsx"),
    Path("components/sections/promotions.tsx"),
    Path("components/sections/telcel-offer-highlight.tsx"),
    Path("components/telcel-offer-tabs.tsx"),
    Path("lib/telcel-offers.ts"),
]

PROHIBITED_PUBLIC_RE = re.compile(
    r"(\$[\d,]+|precio|precios|mensual|mensualidad|enganche|costo|costos|pago|pagos|cashback|stock|disponibilidad)",
    re.IGNORECASE,
)
PROHIBITED_CATALOG_KEY_RE = re.compile(
    r"(precio|mensual|enganche|diferencia|costo|cargo|cashback|iva|stock|disponibilidad|availability)",
    re.IGNORECASE,
)


@dataclass
class Check:
    name: str
    status: str
    detail: str


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def norm(value):
    return re.sub(r"\s+", " ", str(value or "").strip()).upper()


def item_key(item):
    return (
        norm(item.get("category")),
        norm(item.get("brand")),
        norm(item.get("model")),
        norm(item.get("technology")),
        norm(item.get("color")),
    )


def resolve_excel(path: Path):
    if path.exists():
        return path
    if path == DEFAULT_EXCEL and FALLBACK_EXCEL.exists():
        return FALLBACK_EXCEL
    raise FileNotFoundError(f"Excel not found: {path}")


def build_catalog_from_excel(excel_path: Path, output_path: Path):
    extractor = Path("tools/extract_public_equipment_catalog.py")
    command = [sys.executable, str(extractor), "--input", str(excel_path), "--output", str(output_path)]
    subprocess.run(command, check=True, capture_output=True, text=True)
    return load_json(output_path)


def compare_public_catalogs(excel_catalog, site_catalog):
    checks = []
    checks.append(
        Check(
            "Conteo de modelos publicos",
            "PASS" if excel_catalog.get("count") == site_catalog.get("count") else "FAIL",
            f"Excel: {excel_catalog.get('count')}; sitio: {site_catalog.get('count')}.",
        )
    )

    excel_keys = {item_key(item) for item in excel_catalog.get("items", [])}
    site_keys = {item_key(item) for item in site_catalog.get("items", [])}
    missing = sorted(excel_keys - site_keys)
    extra = sorted(site_keys - excel_keys)
    checks.append(
        Check(
            "Marcas y modelos alineados al Excel",
            "PASS" if not missing and not extra else "FAIL",
            f"Faltantes: {len(missing)}; extras: {len(extra)}.",
        )
    )

    bad_keys = sorted(
        {
            key
            for item in site_catalog.get("items", [])
            for key in item.keys()
            if PROHIBITED_CATALOG_KEY_RE.search(key)
        }
    )
    checks.append(
        Check(
            "JSON publico sin campos economicos",
            "PASS" if not bad_keys else "FAIL",
            f"Campos prohibidos: {', '.join(bad_keys) or 'ninguno'}.",
        )
    )
    return checks


def audit_public_files(paths):
    findings = []
    for path in paths:
        if not path.exists():
            continue
        for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
            visible_line = re.sub(r'href="/precios"', "", line)
            if PROHIBITED_PUBLIC_RE.search(visible_line):
                findings.append(f"{path}:{line_number}: {line.strip()}")
    return [
        Check(
            "Vistas publicas sin terminos economicos",
            "PASS" if not findings else "FAIL",
            "Sin hallazgos." if not findings else "\n".join(findings[:40]),
        )
    ]


def write_reports(checks, report_dir: Path):
    report_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    json_path = report_dir / f"site-content-audit-{timestamp}.json"
    md_path = report_dir / f"site-content-audit-{timestamp}.md"
    passed = sum(1 for check in checks if check.status == "PASS")
    failed = sum(1 for check in checks if check.status == "FAIL")
    payload = {
        "generatedAt": timestamp,
        "summary": {"passed": passed, "failed": failed, "total": len(checks)},
        "checks": [check.__dict__ for check in checks],
    }
    json_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# Auditoria de contenido CelularesXalapa.com",
        "",
        f"Generado: {timestamp}",
        f"Resultado: {passed} PASS / {failed} FAIL / {len(checks)} checks",
        "",
        "## Checks",
        "",
    ]
    for check in checks:
        lines.extend([f"### {check.status} - {check.name}", "", check.detail, ""])
    md_path.write_text("\n".join(lines), encoding="utf-8")
    return json_path, md_path, failed


def parse_args():
    parser = argparse.ArgumentParser(description="Audita el catalogo publico saneado contra el Excel de equipos.")
    parser.add_argument("--excel", type=Path, default=DEFAULT_EXCEL)
    parser.add_argument("--site-json", type=Path, default=DEFAULT_SITE_JSON)
    parser.add_argument("--report-dir", type=Path, default=DEFAULT_REPORT_DIR)
    parser.add_argument("--fail-on-diff", action="store_true")
    return parser.parse_args()


def main():
    args = parse_args()
    excel_path = resolve_excel(args.excel)
    if not args.site_json.exists():
        raise FileNotFoundError(f"Site JSON not found: {args.site_json}")

    temp_path = args.report_dir / "_latest_public_equipment_catalog.json"
    excel_catalog = build_catalog_from_excel(excel_path, temp_path)
    site_catalog = load_json(args.site_json)

    checks = []
    checks.extend(compare_public_catalogs(excel_catalog, site_catalog))
    checks.extend(audit_public_files(PUBLIC_FILES))
    json_path, md_path, failed = write_reports(checks, args.report_dir)

    print(f"Audit report JSON: {json_path}")
    print(f"Audit report Markdown: {md_path}")
    print(f"Checks failed: {failed}")

    if failed and args.fail_on_diff:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
