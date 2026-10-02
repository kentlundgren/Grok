// Ritar sidan av window.SCENARIO (scenario.js). Ingen data hårdkodas här.
const data = window.SCENARIO;

// Körningarna sorteras på tid, så att "senaste" alltid är den sista oavsett ordningen i filen.
const snapshots = data ? [...data.snapshots].sort((a, b) => new Date(a.asOf) - new Date(b.asOf)) : [];
const state = { snapId: null, selected: null };

// Texten kommer från scenario.js, men escapas ändå så att en tecken som < eller & aldrig tolkas som kod.
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
));

const currentSnap = () => snapshots.find((s) => s.id === state.snapId);
const prevSnap = () => snapshots[snapshots.findIndex((s) => s.id === state.snapId) - 1];
const isLatest = () => snapshots[snapshots.length - 1].id === state.snapId;

// Slår ihop rutans fasta del med den valda körningens del (procent, hinder, tecken att bevaka).
function scenarioAt(id, snap = currentSnap()) {
  const base = data.scenarios.find((item) => item.id === id);
  return { ...base, ...snap.scenarios[id] };
}

function showPanel(name) {
  document.querySelectorAll(".tabs button[data-panel]").forEach((button) => {
    button.setAttribute("aria-selected", button.dataset.panel === name ? "true" : "false");
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === name);
  });
}

// Turläge: de fyra alternativen markeras ett i taget, STEP_MS var, en gång. Allt hämtas ur datan,
// så läget fungerar för varje körning utan en separat videofil. Fyrfältaren är alltid utgångsläget.
const STEP_MS = 4000;
const tour = { active: false, timer: null };

function setMode(mode) {
  document.querySelector(".mode").setAttribute("aria-pressed", mode === "tur" ? "true" : "false");
}

function clearTourMarks() {
  clearTimeout(tour.timer);
  document.querySelector(".stage").classList.remove("touring");
  document.querySelectorAll(".cell").forEach((cell) => cell.classList.remove("step"));
}

function tourBar() { return document.querySelector("[data-tour-bar]"); }

function tourStep(index) {
  const snap = currentSnap();
  const ids = data.scenarios.map((item) => item.id);
  if (index >= ids.length) { finishTour(); return; }
  const item = scenarioAt(ids[index]);
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.toggle("step", cell.dataset.id === item.id);
  });
  const bar = tourBar();
  bar.hidden = false;
  bar.innerHTML = `
    <span><b>Alternativ ${index + 1} av ${ids.length}:</b> ${esc(item.title)} · ${item.probability} %
    <small>(uppskattning av ${esc(snap.model)}, ${esc(snap.asOfShort)})</small></span>
    <span class="progress" aria-hidden="true"><i></i></span>
    <button type="button" data-tour-stop>Stoppa</button>`;
  bar.querySelector("[data-tour-stop]").addEventListener("click", () => endTour());
  const cell = document.querySelector(`.cell[data-id="${item.id}"]`);
  const box = cell.getBoundingClientRect();
  if (box.top < 0 || box.bottom > window.innerHeight) {
    cell.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  tour.timer = setTimeout(() => tourStep(index + 1), STEP_MS);
}

function finishTour() {
  clearTourMarks();
  const bar = tourBar();
  bar.hidden = false;
  bar.innerHTML = `
    <span><b>Klart.</b> Det var de ${data.scenarios.length} alternativen, ett i taget.</span>
    <span class="tour-actions"><button type="button" data-tour-again>Spela igen</button>
    <button type="button" data-tour-back>Tillbaka till fyrfältaren</button></span>`;
  bar.querySelector("[data-tour-again]").addEventListener("click", () => startTour());
  bar.querySelector("[data-tour-back]").addEventListener("click", () => endTour());
}

function startTour(fromHash) {
  showPanel("scen");
  clearTourMarks();
  if (!tour.active && !fromHash) history.pushState(null, "", "#tur");
  tour.active = true;
  setMode("tur");
  document.querySelector(".stage").classList.add("touring");
  tourStep(0);
}

function endTour(fromHash) {
  if (!tour.active) return;
  tour.active = false;
  clearTourMarks();
  tourBar().hidden = true;
  setMode("stabil");
  if (!fromHash) history.replaceState(null, "", `#k-${state.snapId}`);
}

function setupModes() {
  const seconds = (data.scenarios.length * STEP_MS) / 1000;
  const turButton = document.querySelector('.mode[data-mode="tur"]');
  turButton.textContent = `Se de fyra alternativen i tur och ordning · ${seconds} s`;
  // Knappen är av/på: ett klick startar turen, ett klick till avbryter och går tillbaka till den stilla fyrfältaren.
  turButton.addEventListener("click", () => (tour.active ? endTour() : startTour()));
}

function renderFacts() {
  const { mandates, meta } = data;
  document.querySelector("[data-thesis]").textContent = meta.thesis;
  document.querySelector("[data-facts]").innerHTML = [
    ["176", mandates.left.label],
    ["173", mandates.tido.label],
    [String(mandates.rejectAt), "nej-röster krävs för att fälla"]
  ].map(([n, label]) => `<div class="fact"><b>${esc(n)}</b><span>${esc(label)}</span></div>`).join("");
}

// Tidsväljaren: en knapp per körning. Den senaste är förvald.
function renderPicker() {
  const last = snapshots.length - 1;
  document.querySelector("[data-picker]").innerHTML = snapshots.map((snap, i) => `
    <button type="button" class="snap" data-snap="${esc(snap.id)}" aria-pressed="${snap.id === state.snapId}">
      <b>${esc(snap.asOfLabel)}</b>
      <span>${esc(snap.model)}${i === last ? " · senaste" : ""}</span>
    </button>`).join("");
  document.querySelectorAll(".snap").forEach((button) => {
    button.addEventListener("click", () => selectSnapshot(button.dataset.snap));
  });
  document.querySelector("[data-picker-note]").textContent = snapshots.length === 1
    ? "Det finns en körning hittills. När en ny körning görs läggs den till här, och då går det att jämföra procenten mellan tidpunkterna."
    : "Välj tidpunkt för att se hur procenten, hindren och tecknen att bevaka såg ut då. Skillnaden visas mot körningen före.";
}

function renderHeader() {
  const snap = currentSnap();
  document.querySelector("[data-stamp]").textContent = `Procenten togs fram av ${snap.model} den ${snap.asOfLabel}, ${snap.context}`;
  const old = document.querySelector("[data-old]");
  old.hidden = isLatest();
  document.querySelector("[data-ai]").textContent =
    `Den här analysen är gjord med generativ AI. Fyrfältaren, procenten och omprövningen är framtagna av ${snap.model} utifrån källorna i fliken Så togs det fram. Siffrorna är inte kvalitetssäkrade. Kontrollera mot källan innan något återges.`;
}

function facesHtml(item) {
  if (!item.faces || !item.faces.length) return "";
  return `<span class="faces">${item.faces.map((face) => `
    <span class="face">
      <img src="${esc(face.src)}" alt="${esc(face.name)}, ${esc(face.party)}${face.note ? ", illustration" : ""}">
      <span>${esc(face.party)}</span>
    </span>`).join("")}</span>`;
}

// Skillnad i procentenheter mot körningen före, bara när det finns en körning före.
function deltaText(id) {
  const prev = prevSnap();
  if (!prev) return "";
  const diff = currentSnap().scenarios[id].probability - prev.scenarios[id].probability;
  const sign = diff > 0 ? "+" : diff < 0 ? "−" : "±";
  return `${sign}${Math.abs(diff)} procentenheter mot ${prev.asOfShort}`;
}

function renderStage() {
  const snap = currentSnap();
  document.querySelector("[data-cells]").innerHTML = data.scenarios.map((base) => {
    const item = scenarioAt(base.id);
    const delta = deltaText(base.id);
    return `
    <button class="cell ${esc(item.id)}" data-id="${esc(item.id)}" aria-pressed="${item.id === state.selected}">
      <small>${esc(item.quadrantLabel)}</small>
      <strong>${esc(item.title)}</strong>
      ${facesHtml(item)}
      <em>${item.probability} %</em>
      <span class="when">${esc(snap.model.split(" ")[0])}, ${esc(snap.asOfShort)}${delta ? ` · ${esc(delta)}` : ""}</span>
    </button>`;
  }).join("");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => select(cell.dataset.id));
  });
}

function select(id) {
  state.selected = id;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.setAttribute("aria-pressed", cell.dataset.id === id ? "true" : "false");
  });
  const snap = currentSnap();
  const item = scenarioAt(id);
  const parties = item.inGovernment.length ? item.inGovernment.join(", ") : "Ingen regering i detta utfall";
  const overTime = snapshots.map((s) => `${s.asOfShort}: ${s.scenarios[id].probability} %`).join(" → ");
  document.querySelector("[data-detail]").innerHTML = `
    <h2>${esc(item.title)}</h2>
    <p>${item.probability} %, uppskattat av ${esc(snap.model)} den ${esc(snap.asOfLabel)}. ${esc(data.meta.probabilityNote)}</p>
    <div class="kv">
      <b>Statsminister</b><span>${esc(item.primeMinister)}</span>
      <b>I regeringen</b><span>${esc(parties)}</span>
      <b>Måste tolerera</b><span>${esc(item.mustTolerate)}</span>
      <b>Mandatregeln</b><span>${esc(item.math)}</span>
      <b>Eftergift</b><span>${esc(item.concession)}</span>
      <b>Hinder</b><span>${esc(item.obstacles)}</span>
      <b>Tecken att bevaka</b><span>${esc(item.watch)}</span>
      <b>Procent över tid</b><span>${esc(overTime)}</span>
    </div>
  `;
}

function renderReview() {
  const snap = currentSnap();
  const review = snap.review;
  const chosen = scenarioAt(review.chosenId);
  document.querySelector("[data-review]").innerHTML = `
    <h2 id="omprovning">Efter omprövningen ${esc(snap.asOfShort)}: ${esc(chosen.title)}</h2>
    <p>Intervall ${esc(review.interval)}. Punktestimatet ${esc(review.point)} är den siffra som får rutorna att summera till 100.</p>
    <p>${esc(review.why)}</p>
    <p><b>Starkaste invändningen.</b> ${esc(review.objection)}</p>
    <p><b>Vad som skulle ändra slutsatsen.</b> ${esc(review.wouldChange.join(" "))}</p>
  `;
}

function renderMethod() {
  const snap = currentSnap();
  document.querySelector("[data-steps]").innerHTML =
    snap.process.map((step) => `<li><b>${esc(step.date)}.</b> ${esc(step.text)}</li>`).join("");
  const video = document.querySelector("[data-video]");
  const shot = document.querySelector("[data-shot]");
  video.hidden = !snap.video;
  shot.closest("figure").hidden = !snap.originalImage;
  if (snap.video) video.src = snap.video;
  if (snap.originalImage) shot.src = snap.originalImage;
  document.querySelector("[data-method-run]").textContent = `Visar körningen ${snap.asOfLabel}.`;
}

function selectSnapshot(id, keepHash) {
  if (tour.active) endTour(true);
  state.snapId = id;
  if (!keepHash) history.replaceState(null, "", `#k-${id}`);
  state.selected = state.selected || currentSnap().review.chosenId;
  renderPicker();
  renderHeader();
  renderStage();
  select(state.selected);
  renderReview();
  renderMethod();
}

// En länk som slutar på #k-<körning> öppnar den körningen. Övriga ankare öppnar fliken de ligger i.
function followHash() {
  const hash = decodeURIComponent(location.hash.slice(1));
  if (hash === "tur") {
    if (!tour.active) startTour(true);
    return;
  }
  if (tour.active) endTour(true);
  if (!hash) return;
  if (hash.startsWith("k-")) {
    const snap = snapshots.find((s) => `k-${s.id}` === hash);
    if (snap) selectSnapshot(snap.id, true);
    return;
  }
  const target = document.getElementById(hash);
  const panel = target && target.closest(".panel");
  if (panel) {
    showPanel(panel.id);
    target.scrollIntoView();
  }
}

function setupModal() {
  const techBtn = document.getElementById("techBtn");
  const techModal = document.getElementById("techModal");
  const techClose = document.getElementById("techClose");
  const openModal = () => { techModal.classList.add("show"); techClose.focus(); };
  const closeModal = () => { techModal.classList.remove("show"); techBtn.focus(); };
  techBtn.addEventListener("click", openModal);
  techClose.addEventListener("click", closeModal);
  techModal.addEventListener("click", (event) => { if (event.target === techModal) closeModal(); });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (techModal.classList.contains("show")) closeModal();
    else if (tour.active) endTour();
  });
}

function init() {
  setupModal();
  if (!data || !snapshots.length) {
    document.querySelector("[data-thesis]").textContent = "Sidan kunde inte läsa underlaget. scenario.js saknas eller är trasig.";
    return;
  }
  document.querySelectorAll(".tabs button[data-panel]").forEach((button) => {
    button.addEventListener("click", () => showPanel(button.dataset.panel));
  });
  renderFacts();
  setupModes();
  selectSnapshot(snapshots[snapshots.length - 1].id, true);
  window.addEventListener("hashchange", followHash);
  followHash();
}

init();
