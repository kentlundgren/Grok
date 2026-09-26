/**
 * Familjens lördags-DD
 * Försöker läsa data/*.json. Om fetch inte går (file://) används window.DD_* från data.js.
 */
(async function () {
  const stallningEl = document.getElementById("stallning");
  const selectEl = document.getElementById("week-select");
  const viewEl = document.getElementById("week-view");
  const CACHE_BUST = "20260926e";

  function showError(err) {
    const msg = err && err.message ? err.message : String(err);
    if (viewEl) viewEl.textContent = "Kunde inte visa omgången: " + msg;
  }

  try {
    const loaded = await loadAll();
    const index = loaded.index;
    const weeks = loaded.weeks;
    weeks.sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });

    renderStandings(index, weeks);
    fillSelect(weeks);
    const params = new URLSearchParams(location.search);
    const startId = params.get("vecka") || (weeks[0] && weeks[0].id);
    if (startId) selectEl.value = startId;
    renderWeek(weeks.filter(function (w) { return w.id === startId; })[0] || weeks[0]);

    selectEl.addEventListener("change", function () {
      const week = weeks.filter(function (w) { return w.id === selectEl.value; })[0];
      if (!week) return;
      try {
        const url = new URL(location.href);
        url.searchParams.set("vecka", week.id);
        history.replaceState({}, "", url);
      } catch (e) {}
      renderWeek(week);
    });
  } catch (err) {
    showError(err);
  }

  async function loadAll() {
    try {
      const index = await loadJson("data/weeks.json");
      const weeks = [];
      for (var i = 0; i < (index.weeks || []).length; i++) {
        weeks.push(await loadJson("data/" + index.weeks[i] + ".json"));
      }
      return { index: index, weeks: weeks };
    } catch (err) {
      if (window.DD_INDEX && window.DD_WEEKS && window.DD_WEEKS.length) {
        return { index: window.DD_INDEX, weeks: window.DD_WEEKS.slice() };
      }
      throw err;
    }
  }

  async function loadJson(path) {
    const res = await fetch(path + "?v=" + CACHE_BUST, { cache: "no-store" });
    if (!res.ok) throw new Error("Kunde inte läsa " + path + " (" + res.status + ")");
    return res.json();
  }

  function renderStandings(index, weeks) {
    const closed = weeks.filter(function (w) {
      return w.result && w.result.status === "klar";
    });
    stallningEl.innerHTML = (index.tipsters || []).map(function (name) {
      const stats = tally(name, closed);
      return (
        '<div class="bg-white border border-stone-200 rounded-xl p-4">' +
        '<p class="text-sm text-stone-500">' + escapeHtml(name) + "</p>" +
        '<p class="text-2xl font-semibold">' + stats.hits + " träff</p>" +
        '<p class="text-sm text-stone-600">' +
        stats.oneRight + " ett rätt \u00b7 " + stats.played + " spelade \u00b7 " + stats.spent + " kr</p>" +
        "</div>"
      );
    }).join("");
  }

  function tally(name, closedWeeks) {
    var hits = 0, oneRight = 0, played = 0, spent = 0;
    closedWeeks.forEach(function (week) {
      var tip = (week.tips || []).filter(function (t) {
        return t.person === name && t.status === "inlämnad";
      })[0];
      if (!tip) return;
      played += 1;
      spent += Number(tip.cost || 0);
      var a = hit(tip.dd1, week.result.dd1Winner);
      var b = hit(tip.dd2, week.result.dd2Winner);
      if (a && b) hits += 1;
      else if (a || b) oneRight += 1;
    });
    return { hits: hits, oneRight: oneRight, played: played, spent: spent };
  }

  function hit(nums, winner) {
    if (winner == null || !Array.isArray(nums)) return false;
    return nums.map(Number).indexOf(Number(winner)) !== -1;
  }

  function fillSelect(weeks) {
    selectEl.innerHTML = weeks.map(function (w) {
      return '<option value="' + escapeHtml(w.id) + '">' + escapeHtml(w.date + " \u00b7 " + w.track) + "</option>";
    }).join("");
  }

  function renderWeek(week) {
    if (!week) {
      viewEl.textContent = "Ingen omgång ännu.";
      return;
    }
    var res = week.result || {};
    var races = week.races || {};
    var dd1 = races.dd1 || {};
    var dd2 = races.dd2 || {};
    var statusLabel =
      res.status === "klar"
        ? "Resultat: " + res.dd1Winner + "\u2013" + res.dd2Winner + (res.ddOdds ? " \u00b7 DD-odds " + res.ddOdds : "")
        : "Resultat saknas \u2014 fylls i efter loppen.";
    var statusClass = res.status === "klar" ? "text-emerald-700" : "bg-yellow-200 px-2 py-1 rounded";

    viewEl.innerHTML =
      '<div class="flex flex-wrap items-start justify-between gap-3">' +
      "<div>" +
      '<h3 class="text-2xl font-semibold">' + escapeHtml(week.track + " \u00b7 " + week.weekday + " " + week.date) + "</h3>" +
      '<p class="text-stone-600">' +
      escapeHtml((dd1.label || "DD-1") + ", " + (dd1.distance || "") + " \u00b7 " + (dd2.label || "DD-2") + ", " + (dd2.distance || "")) +
      "</p></div>" +
      '<p class="text-sm ' + statusClass + '">' + escapeHtml(statusLabel) + "</p>" +
      "</div>" +
      (week.comment ? '<p class="mt-3 text-stone-700">' + escapeHtml(week.comment) + "</p>" : "") +
      '<div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">' +
      (week.tips || []).map(function (tip) { return tipCard(week, tip); }).join("") +
      "</div>";
  }

  function tipCard(week, tip) {
    if (tip.status !== "inlämnad") {
      return (
        '<section class="coupon-slip rounded-lg p-4">' +
        '<h4 class="font-semibold">' + escapeHtml(tip.person) + "</h4>" +
        '<p class="text-sm mt-2">Tipset saknas. Fyll i data/' + escapeHtml(week.id) + ".json när tipset finns.</p>" +
        (tip.note ? '<p class="text-sm mt-2">' + escapeHtml(tip.note) + "</p>" : "") +
        "</section>"
      );
    }
    var res = week.result || {};
    return (
      '<section class="border border-stone-200 rounded-lg p-4">' +
      '<div class="flex items-baseline justify-between gap-2">' +
      '<h4 class="font-semibold">' + escapeHtml(tip.person) + "</h4>" +
      '<span class="text-sm text-stone-500">' + escapeHtml(String(tip.cost) + " kr \u00b7 " + (tip.system || "")) + "</span>" +
      "</div>" +
      '<p class="text-sm text-stone-500">' + (tip.submitted ? "Inlämnad " + escapeHtml(tip.submitted) : "") + "</p>" +
      raceLine("DD-1", tip.dd1, tip.names && tip.names.dd1, res.dd1Winner) +
      raceLine("DD-2", tip.dd2, tip.names && tip.names.dd2, res.dd2Winner) +
      (tip.scratch ? '<p class="text-sm mt-2">' + escapeHtml(tip.scratch) + "</p>" : "") +
      '<p class="text-sm mt-2 font-medium">' + escapeHtml(outcomeText(tip, res)) + "</p>" +
      (tip.coupon ? '<p class="text-sm mt-2"><a class="underline" href="' + escapeHtml(tip.coupon) + '">Visa kupong</a></p>' : "") +
      "</section>"
    );
  }

  function raceLine(label, nums, names, winner) {
    var chips = (nums || []).map(function (n) {
      var name = (names && (names[n] || names[String(n)])) || "";
      var cls = "inline-block rounded px-2 py-1 text-sm mr-1 mb-1 bg-stone-100";
      if (winner != null) cls += Number(n) === Number(winner) ? " horse-hit" : " horse-miss";
      return '<span class="' + cls + '">' + escapeHtml(String(n) + (name ? " " + name : "")) + "</span>";
    }).join("");
    return '<div class="mt-3"><p class="text-xs uppercase tracking-wide text-stone-500">' +
      escapeHtml(label) + '</p><div class="mt-1">' + chips + "</div></div>";
  }

  function outcomeText(tip, res) {
    if (res.status !== "klar") return "Väntar på resultat.";
    var a = hit(tip.dd1, res.dd1Winner);
    var b = hit(tip.dd2, res.dd2Winner);
    if (a && b) return res.ddOdds ? "DD-träff \u00b7 odds " + res.ddOdds : "DD-träff";
    if (a || b) return "Ett rätt \u2014 ingen utdelning.";
    return "Miss.";
  }

  function escapeHtml(value) {
    var el = document.createElement("span");
    el.textContent = value == null ? "" : String(value);
    return el.innerHTML;
  }
})();
