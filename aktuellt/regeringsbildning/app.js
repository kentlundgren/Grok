const state = { data: null, selected: "s4" };

const byId = (id) => state.data.scenarios.find((item) => item.id === id);

function showPanel(name) {
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.panel === name ? "true" : "false");
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === name);
  });
}

function renderFacts() {
  const { mandates, meta } = state.data;
  document.querySelector("[data-stamp]").textContent = meta.asOfLabel;
  document.querySelector("[data-thesis]").textContent = meta.thesis;
  document.querySelector("[data-facts]").innerHTML = [
    ["176", mandates.left.label],
    ["173", mandates.tido.label],
    ["175", "nej-röster krävs för att fälla"]
  ].map(([n, label]) => `<div class="fact"><b>${n}</b><span>${label}</span></div>`).join("");
}

function facesHtml(item) {
  if (!item.faces || !item.faces.length) return "";
  return `<span class="faces">${item.faces.map((face) => `
    <span class="face">
      <img src="${face.src}" alt="${face.name}, ${face.party}${face.note ? ", illustration" : ""}">
      <span>${face.party}</span>
    </span>`).join("")}</span>`;
}

function renderStage() {
  document.querySelector("[data-cells]").innerHTML = state.data.scenarios.map((item) => `
    <button class="cell ${item.id}" data-id="${item.id}" aria-pressed="${item.id === state.selected}">
      <small>${item.quadrant.replaceAll("-", " · ")}</small>
      <strong>${item.title}</strong>
      ${facesHtml(item)}
      <em>${item.probabilityLabel}</em>
    </button>
  `).join("");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => select(cell.dataset.id));
  });
}

function select(id) {
  state.selected = id;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.setAttribute("aria-pressed", cell.dataset.id === id ? "true" : "false");
  });
  const item = byId(id);
  const parties = item.inGovernment.length ? item.inGovernment.join(", ") : "Ingen regering i detta utfall";
  document.querySelector("[data-detail]").innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.probabilityLabel} i fyrfältaren. ${state.data.meta.probabilityNote}</p>
    <div class="kv">
      <b>Statsminister</b><span>${item.primeMinister}</span>
      <b>I regeringen</b><span>${parties}</span>
      <b>Måste tolerera</b><span>${item.mustTolerate}</span>
      <b>Mandatregeln</b><span>${item.math}</span>
      <b>Eftergift</b><span>${item.concession}</span>
      <b>Hinder</b><span>${item.obstacles}</span>
      <b>Tecken att bevaka</b><span>${item.watch}</span>
    </div>
  `;
}

function renderReview() {
  const review = state.data.review;
  const chosen = byId(review.chosenId);
  document.querySelector("[data-review]").innerHTML = `
    <h2>Efter omprövningen: ${chosen.title}</h2>
    <p>Intervall ${review.interval}. Punktestimatet ${review.point} är den siffra som får rutorna att summera till 100.</p>
    <p>${review.why}</p>
    <p><b>Starkaste invändningen.</b> ${review.objection}</p>
    <p><b>Vad som skulle ändra slutsatsen.</b> ${review.wouldChange.join(" ")}</p>
  `;
}

function renderMethod() {
  const steps = state.data.process.map((step) => `<li><b>${step.date}.</b> ${step.text}</li>`).join("");
  document.querySelector("[data-steps]").innerHTML = steps;
  document.querySelector("[data-video]").src = state.data.meta.video;
  document.querySelector("[data-shot]").src = state.data.meta.originalImage;
}

async function init() {
  const response = await fetch("scenario.json");
  state.data = await response.json();
  renderFacts();
  renderStage();
  select(state.data.review.chosenId);
  renderReview();
  renderMethod();
  document.querySelectorAll(".tabs button").forEach((button) => {
    button.addEventListener("click", () => showPanel(button.dataset.panel));
  });
}

init().catch((error) => {
  document.querySelector("[data-thesis]").textContent = "Scenen kunde inte läsa scenario.json. Öppna sidan via en webbserver eller GitHub Pages, inte som lokal fil.";
  console.error(error);
});
