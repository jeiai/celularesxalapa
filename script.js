const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0
});

const devices = {
  "iPhone Pro": { price: 15999, camera: "Excelente", battery: "Todo el dia", storage: "256 GB" },
  "Galaxy Ultra": { price: 13999, camera: "Zoom avanzado", battery: "Muy alta", storage: "256 GB" },
  "Xiaomi Note": { price: 6999, camera: "Muy buena", battery: "Alta", storage: "128 GB" }
};

const searchForm = document.querySelector(".top-search");
const searchInput = document.querySelector("#siteSearch");
const searchNotice = document.querySelector("#searchNotice");
const targets = [...document.querySelectorAll(".search-target")];

function showNotice(text) {
  searchNotice.textContent = text;
  searchNotice.classList.add("show");
  window.clearTimeout(showNotice.timer);
  showNotice.timer = window.setTimeout(() => searchNotice.classList.remove("show"), 2600);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();

  targets.forEach((target) => target.classList.remove("hidden-by-search"));

  if (!query) {
    showNotice("Mostrando todo el sitio.");
    return;
  }

  const matches = targets.filter((target) => target.dataset.search.includes(query));
  if (!matches.length) {
    showNotice("No encontramos coincidencias. Prueba con celulares, planes, internet o Telmex.");
    return;
  }

  targets.forEach((target) => {
    if (!matches.includes(target)) target.classList.add("hidden-by-search");
  });
  matches[0].scrollIntoView({ behavior: "smooth", block: "start" });
  showNotice(`${matches.length} seccion(es) encontradas.`);
});

const compareA = document.querySelector("#compareA");
const compareB = document.querySelector("#compareB");
const compareResult = document.querySelector("#compareResult");

function renderCompare() {
  const first = devices[compareA.value];
  const second = devices[compareB.value];
  compareResult.innerHTML = `
    <div><strong>${compareA.value}</strong><br>${money.format(first.price)}</div>
    <div><strong>${compareB.value}</strong><br>${money.format(second.price)}</div>
    <div><strong>Camara</strong><br>${first.camera} vs ${second.camera}</div>
    <div><strong>Bateria</strong><br>${first.battery} vs ${second.battery}</div>
  `;
}

compareA.addEventListener("change", renderCompare);
compareB.addEventListener("change", renderCompare);
renderCompare();

const quoteDevice = document.querySelector("#quoteDevice");
const downPayment = document.querySelector("#downPayment");
const downLabel = document.querySelector("#downLabel");
const months = document.querySelector("#months");
const quoteResult = document.querySelector("#quoteResult");

function renderQuote() {
  const price = Number(quoteDevice.value);
  const down = Number(downPayment.value);
  const term = Number(months.value);
  const financed = Math.max(price - down, 0);
  const monthly = Math.ceil((financed * 1.08) / term);
  downLabel.textContent = money.format(down);
  quoteResult.textContent = `${money.format(monthly)}/mes`;
}

[quoteDevice, downPayment, months].forEach((input) => input.addEventListener("input", renderQuote));
renderQuote();

document.querySelectorAll("[data-quote]").forEach((button) => {
  button.addEventListener("click", () => {
    const device = button.dataset.quote;
    const matchingOption = [...quoteDevice.options].find((option) => option.textContent === device);
    quoteDevice.selectedIndex = matchingOption.index;
    renderQuote();
    document.querySelector("#cotizador").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector(".appointment-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showNotice("Listo. Tu solicitud quedo preparada para conectar con WhatsApp o CRM.");
});
