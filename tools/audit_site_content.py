import argparse
import importlib.util
import json
import re
import subprocess
import sys
from collections import Counter
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path


DEFAULT_EXCEL = Path(r"C:\Users\CORE\Documents\celularesxalapa\V7.10    GENERAL .xlsx")
DEFAULT_SITE_JSON = Path("public/data/catalogo-excel.json")
DEFAULT_OFFERS = Path("lib/telcel-offers.ts")
DEFAULT_REPORT_DIR = Path("reports")

EXPECTED_TYPES = {"Prepago", "Postpago", "Accesorios", "Combos", "WiFi Telcel", "ZMA"}
EXPECTED_OFFER_TERMS = [
    "Portabilidad Telcel con mas gigas",
    "Doble de GB",
    "50% mas gigas",
    "Planes Telcel Ultra",
    "Planes Telcel Libre",
    "WiFi Telcel",
    "31 de julio de 2026",
    "Telcel Ultra Ilimitado",
    "Libre VIP",
    "GB ilimitados desde $399",
]


@dataclass
class Check:
    name: str
    status: str
    detail: str


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def ensure_catalog_from_excel(excel_path: Path, temp_path: Path):
    extractor = Path("tools/extract_excel_catalog.py")
    if not extractor.exists():
        raise FileNotFoundError("Missing tools/extract_excel_catalog.py")
    command = [sys.executable, str(extractor), str(excel_path), str(temp_path)]
    subprocess.run(command, check=True, capture_output=True, text=True)
    return load_json(temp_path)


def money(value):
    return f"${value:,.0f}" if isinstance(value, (int, float)) else "N/D"


def norm(value):
    return re.sub(r"\s+", " ", str(value or "").strip()).upper()


def index_items(items):
    return {
        (
            norm(item.get("tipo")),
            norm(item.get("marca")),
            norm(item.get("modelo")),
            norm(item.get("categoria")),
        ): item
        for item in items
    }


def compare_catalogs(excel_catalog, site_catalog):
    checks = []

    excel_count = excel_catalog.get("count")
    site_count = site_catalog.get("count")
    checks.append(
        Check(
            "Conteo total de productos",
            "PASS" if excel_count == site_count else "FAIL",
            f"Excel interpretado: {excel_count}; sitio: {site_count}.",
        )
    )

    excel_types = set(excel_catalog.get("filters", {}).get("tipos", []))
    site_types = set(site_catalog.get("filters", {}).get("tipos", []))
    missing_types = sorted(EXPECTED_TYPES - site_types)
    status = "PASS" if excel_types == site_types and not missing_types else "FAIL"
    checks.append(
        Check(
            "Tipos comerciales disponibles",
            status,
            f"Tipos en sitio: {', '.join(sorted(site_types))}. Faltantes esperados: {', '.join(missing_types) or 'ninguno'}.",
        )
    )

    excel_plans = set(excel_catalog.get("filters", {}).get("planes", []))
    site_plans = set(site_catalog.get("filters", {}).get("planes", []))
    plan_missing = sorted(excel_plans - site_plans)
    checks.append(
        Check(
            "Planes postpago/a plazo",
            "PASS" if not plan_missing else "FAIL",
            f"Planes en Excel: {len(excel_plans)}; planes en sitio: {len(site_plans)}; faltantes: {len(plan_missing)}.",
        )
    )

    excel_by_type = Counter(item["tipo"] for item in excel_catalog["items"])
    site_by_type = Counter(item["tipo"] for item in site_catalog["items"])
    mismatched = {
        key: {"excel": excel_by_type[key], "site": site_by_type[key]}
        for key in sorted(set(excel_by_type) | set(site_by_type))
        if excel_by_type[key] != site_by_type[key]
    }
    checks.append(
        Check(
            "Conteo por tipo",
            "PASS" if not mismatched else "FAIL",
            json.dumps(mismatched, ensure_ascii=False) if mismatched else dict_to_text(site_by_type),
        )
    )

    excel_index = index_items(excel_catalog["items"])
    site_index = index_items(site_catalog["items"])
    missing_keys = sorted(set(excel_index) - set(site_index))
    checks.append(
        Check(
            "Productos faltantes por llave tipo/marca/modelo/categoria",
            "PASS" if not missing_keys else "FAIL",
            f"Faltantes: {len(missing_keys)}. Muestras: {format_keys(missing_keys[:5])}",
        )
    )

    sample_diffs = []
    for key in sorted(set(excel_index) & set(site_index))[:250]:
        excel_item = excel_index[key]
        site_item = site_index[key]
        for field in ["precioConIva", "precioSinIva"]:
            if excel_item.get(field) != site_item.get(field):
                sample_diffs.append(
                    f"{site_item.get('tipo')} / {site_item.get('marca')} / {site_item.get('modelo')} {field}: "
                    f"Excel {money(excel_item.get(field))}, sitio {money(site_item.get(field))}"
                )
                break
    checks.append(
        Check(
            "Muestra de precios contado",
            "PASS" if not sample_diffs else "FAIL",
            "Sin diferencias en muestra de 250 productos." if not sample_diffs else "; ".join(sample_diffs[:5]),
        )
    )

    return checks


def audit_telcel_offer(path: Path):
    text = path.read_text(encoding="utf-8")
    checks = []
    missing_terms = [term for term in EXPECTED_OFFER_TERMS if term not in text]
    checks.append(
        Check(
            "Oferta Telcel - terminos clave",
            "PASS" if not missing_terms else "FAIL",
            f"Faltantes: {', '.join(missing_terms) or 'ninguno'}.",
        )
    )

    group_ids = re.findall(r'id: "([^"]+)"', text)
    expected_groups = {"portabilidad-amigo", "smartphone-doble-gb", "telcel-ultra", "telcel-libre", "wifi-telcel"}
    missing_groups = sorted(expected_groups - set(group_ids))
    checks.append(
        Check(
            "Oferta Telcel - grupos comerciales",
            "PASS" if not missing_groups else "FAIL",
            f"Grupos detectados: {', '.join(group_ids)}. Faltantes: {', '.join(missing_groups) or 'ninguno'}.",
        )
    )

    price_terms = ["openPrice: 349", "controlledPrice: 399", "openPrice: 1499", "price: 1399"]
    missing_prices = [term for term in price_terms if term not in text]
    checks.append(
        Check(
            "Oferta Telcel - precios representativos",
            "PASS" if not missing_prices else "FAIL",
            f"Faltantes: {', '.join(missing_prices) or 'ninguno'}.",
        )
    )

    return checks


def dict_to_text(counter):
    return ", ".join(f"{key}: {counter[key]}" for key in sorted(counter))


def format_keys(keys):
    if not keys:
        return "ninguna"
    return " | ".join(" / ".join(value for value in key if value) for key in keys)


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
    parser = argparse.ArgumentParser(description="Audita que el sitio refleje el Excel y la oferta comercial Telcel.")
    parser.add_argument("--excel", type=Path, default=DEFAULT_EXCEL)
    parser.add_argument("--site-json", type=Path, default=DEFAULT_SITE_JSON)
    parser.add_argument("--offers", type=Path, default=DEFAULT_OFFERS)
    parser.add_argument("--report-dir", type=Path, default=DEFAULT_REPORT_DIR)
    parser.add_argument("--fail-on-diff", action="store_true")
    return parser.parse_args()


def main():
    args = parse_args()
    if not args.excel.exists():
        raise FileNotFoundError(f"Excel not found: {args.excel}")
    if not args.site_json.exists():
        raise FileNotFoundError(f"Site JSON not found: {args.site_json}")
    if not args.offers.exists():
        raise FileNotFoundError(f"Offer file not found: {args.offers}")

    temp_path = args.report_dir / "_latest_excel_catalog.json"
    excel_catalog = ensure_catalog_from_excel(args.excel, temp_path)
    site_catalog = load_json(args.site_json)

    checks = []
    checks.extend(compare_catalogs(excel_catalog, site_catalog))
    checks.extend(audit_telcel_offer(args.offers))
    json_path, md_path, failed = write_reports(checks, args.report_dir)

    print(f"Audit report JSON: {json_path}")
    print(f"Audit report Markdown: {md_path}")
    print(f"Checks failed: {failed}")

    if failed and args.fail_on_diff:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
