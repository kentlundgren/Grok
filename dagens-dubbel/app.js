/**
 * Familjens lördags-DD
 * Läser data/weeks.json och data/<id>.json.
 * Ingen build — samma filer fungerar på GitHub Pages, lokalt och i Cursor/Claude Code.
 */
(async function () {
  const stallningEl = document.getElementById("stallning");
  const selectEl = document.getElementById("week-select");
  const viewEl = document.getElementById("week-view");

  const index = await loadJson("data/weeks.json");
  const weeks = [];
  for (const id of index.weeks) {
    weeks.push(await loadJson(`data/${id}.json`));
  }
  weeks.sort((a, b) => b.date.localeCompare(a.date));

  renderStandings(index, weeks);
  fillSelect(weeks);
  const startId = new URLSearchParams(location.search).get("vecka") || weeks[0]?.id;
  selectEl.value = startId;
  renderWeek(weeks.find((w) => w.id === startId) || weeks[0]);

  selectEl.addEventListener("change", () => {
    const week = weeks.find((w) => w.id === selectEl.value);
    const url = new URL(location.href);
    url.searchParams.set("vecka", week.id);
    history.replaceState({}, "", url);
    renderWeek(week);
  });

  async function loadJson(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Kunde inte läsa ${path}`);
    return res.json();
  }

  function renderStandings(index, weeks) {
    const closed = weeks.filter((w) => w.result?.status === "klar");
    stallningEl.innerHTML = index.tipsters
      .map((name) => {
        const stats = tally(name, closed);
        return `<div class="bg-white border border-stone-200 rounded-xl p-4">
          <p class="text-sm text-stone-500">${name}</p>
          <p class="text-2xl font-semibold">${stats.hits} träff</p>
          <p class="text-sm text-stone-600">${stats.oneRight} ett rätt · ${stats.played} spelade · ${stats.spent} kr</p>
        </div>`;
      })
      .join("");
  }

  function tally(name, closedWeeks) {
    let hits = 0;
    let oneRight = 0;
    let played = 0;
    let spent = 0;
    for (const week of closedWeeks) {
      const tip = week.tips.find((t) => t.person === name && t.status === "inlämnad");
      if (!tip) continue;
      played += 1;
      spent += Number(tip.cost || 0);
      const a = hit(tip.dd1, week.result.dd1Winner);
      const b = hit(tip.dd2, week.result.dd2Winner);
      if (a && b) hits += 1;
      else if (a || b) oneRight += 1;
    }
    return { hits, oneRight, played, spent };
  }

  function hit(nums, winner) {
    if (winner == null || !Array.isArray(nums)) return false;
    return nums.map(Number).includes(Number(winner));
  }

  function fillSelect(weeks) {
    selectEl.innerHTML = weeks
      .map((w) => `<option value="${w.id}">${w.date} · ${w.track}</option>`)
      .join("");
  }

  function renderWeek(week) {
    if (!week) {
      viewEl.textContent = "Ingen omgång ännu.";
      return;
    }
    const res = week.result || {};
    const statusLabel =
      res.status === "klar"
        ? `Resultat: ${res.dd1Winner}–${res.dd2Winner}${res.ddOdds ? ` · DD-odds ${res.ddOdds}` : ""}`
        : "Resultat saknas — fylls i efter loppen.";

    viewEl.innerHTML = `
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 class="text-2xl font-semibold">${week.track} · ${week.weekday} ${week.date}</h3>
          <p class="text-stone-600">${week.races.dd1.label}, ${week.races.dd1.distance} · ${week.races.dd2.label}, ${week.races.dd2.distance}</p>
        </div>
        <p class="text-sm ${res.status === "klar" ? "text-emerald-700" : "bg-yellow-200 px-2 py-1 rounded"}">${statusLabel}</p>
      </div>
      ${week.comment ? `<p class="mt-3 text-stone-700">${escapeHtml(week.comment)}</p>` : ""}
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        ${week.tips.map((tip) => tipCard(week, tip)).join("")}
      </div>
    `;
  }

  function tipCard(week, tip) {
    if (tip.status !== "inlämnad") {
      return `<section class="coupon-slip rounded-lg p-4">
        <h4 class="font-semibold">${escapeHtml(tip.person)}</h4>
        <p class="text-sm mt-2">Tipset saknas. Lägg in hästar i <code>data/${week.id}.json</code> eller i mappen <code>${week.id}/</code>.</p>
        ${tip.note ? `<p class="text-sm mt-2">${escapeHtml(tip.note)}</p>` : ""}
      </section>`;
    }
    const res = week.result || {};
    const outcome = outcomeText(tip, res);
    return `<section class="border border-stone-200 rounded-lg p-4">
      <div class="flex items-baseline justify-between gap-2">
        <h4 class="font-semibold">${escapeHtml(tip.person)}</h4>
        <span class="text-sm text-stone-500">${tip.cost} kr · ${tip.system || ""}</span>
      </div>
      <p class="text-sm text-stone-500">${tip.submitted ? "Inlämnad " + tip.submitted : ""}</p>
      ${raceLine("DD-1", tip.dd1, tip.names?.dd1, res.dd1Winner)}
      ${raceLine("DD-2", tip.dd2, tip.names?.dd2, res.dd2Winner)}
      ${tip.scratch ? `<p class="text-sm mt-2">Skräll: ${escapeHtml(tip.scratch)}</p>` : ""}
      <p class="text-sm mt-2 font-medium">${outcome}</p>
      ${tip.coupon ? `<p class="text-sm mt-2"><a class="underline" href="${tip.coupon}">Visa kupong</a></p>` : ""}
    </section>`;
  }

  function raceLine(label, nums, names, winner) {
    const chips = (nums || [])
      .map((n) => {
        const name = names?.[n] || names?.[String(n)] || "";
        let cls = "inline-block rounded px-2 py-1 text-sm mr-1 mb-1 bg-stone-100";
        if (winner != null) cls += Number(n) === Number(winner) ? " horse-hit" : " horse-miss";
        return `<span class="${cls}">${n}${name ? " " + escapeHtml(name) : ""}</span>`;
      })
      .join("");
    return `<div class="mt-3"><p class="text-xs uppercase tracking-wide text-stone-500">${label}</p><div class="mt-1">${chips}</div></div>`;
  }

  function outcomeText(tip, res) {
    if (res.status !== "klar") return "Väntar på resultat.";
    const a = hit(tip.dd1, res.dd1Winner);
    const b = hit(tip.dd2, res.dd2Winner);
    if (a && b) return res.ddOdds ? `DD-träff · odds ${res.ddOdds}` : "DD-träff";
    if (a || b) return "Ett rätt — ingen utdelning.";
    return "Miss.";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&")
      .replaceAll("<", "<")
      .replaceAll(">", ">")
      .replaceAll('"', """);
  }
})().catch((err) => {
  document.getElementById("week-view").textContent = err.message;
});
