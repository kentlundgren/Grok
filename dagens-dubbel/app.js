/**
 * Familjens lördags-DD
 * Försöker läsa data/*.json. Om fetch inte går (file://) används window.DD_* från data.js.
 */
(async function () {
  const stallningEl = document.getElementById("stallning");
  const selectEl = document.getElementById("week-select");
  const viewEl = document.getElementById("week-view");
  // Här skedde en uppdatering 2026-09-26: cache-nyckel efter analysrutan under korten.
  // Här skedde en uppdatering 2026-09-26: cache-nyckel efter Benitas byte 6 → 10 i DD-2.
  const CACHE_BUST = "20260926h";

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

  // Här skedde en uppdatering 2026-09-26: nollorna förklaras med antal färdigspelade omgångar.
  function renderStandings(index, weeks) {
    var closed = weeks.filter(function (w) {
      return w.result && w.result.status === "klar";
    });
    var names = index.tipsters || [];
    var lead = omgangPhrase(closed.length);
    if (!closed.length && names.length) {
      lead += ". Därför står det 0 på " + joinSv(names);
    }
    var cards = names.map(function (name) {
      var stats = tally(name, closed);
      return (
        '<div class="bg-white border border-stone-200 rounded-xl p-3 sm:p-4">' +
        '<p class="text-xs sm:text-sm text-stone-500">' + escapeHtml(name) + "</p>" +
        '<p class="text-lg sm:text-2xl font-semibold">' + stats.hits + " träff</p>" +
        '<p class="text-xs sm:text-sm text-stone-600">' +
        stats.oneRight + " ett rätt \u00b7 " + stats.played + " spelade \u00b7 " + stats.spent + " kr</p>" +
        "</div>"
      );
    }).join("");
    stallningEl.innerHTML =
      '<p class="text-sm text-stone-700">' + escapeHtml(lead) + ".</p>" +
      '<div class="grid grid-cols-2 lg:grid-cols-4 gap-3">' + cards + "</div>";
  }

  function omgangPhrase(n) {
    if (n === 1) return "1 färdigspelad omgång";
    return n + " färdigspelade omgångar";
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
      "</div>" +
      analysisSection(week);
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

  // Här skedde en uppdatering 2026-09-26: analys under de fyra korten.
  // Likhet, delade rader och systemform räknas ur inlämnade tips.
  // Låg = kortast i loppet eller under market.lowUnder. Hög = över market.highOver.
  function analysisSection(week) {
    var tips = submittedTips(week);
    var body;
    if (tips.length < 2) {
      body = '<p class="mt-3 text-sm bg-yellow-200 rounded px-2 py-1">Analysen väntar tills minst två tips är inlämnade.</p>';
    } else {
      body =
        '<div class="mt-4 space-y-4 text-sm leading-6">' +
        block("Likhet",
          "<p>" + escapeHtml(legStory(week, tips, "dd1", "första loppet")) + "</p>" +
          "<p class=\"mt-2\">" + escapeHtml(legStory(week, tips, "dd2", "andra loppet")) + "</p>" +
          "<p class=\"mt-2\">" + escapeHtml(closestSentence(tips, week)) + "</p>") +
        block("Rader", "<p>" + escapeHtml(rowStory(tips, week)) + "</p>") +
        block("System", systemList(tips)) +
        block("Odds", oddsBlock(week, tips)) +
        block("Hästarna vi spelat", horseTables(week, tips)) +
        "</div>";
    }
    return (
      '<section class="mt-6 pt-6 border-t border-stone-200">' +
      '<h3 class="text-xl font-semibold">Analys</h3>' +
      body +
      "</section>"
    );
  }

  function block(title, inner) {
    return '<div><h4 class="font-semibold">' + escapeHtml(title) + "</h4>" + inner + "</div>";
  }

  function submittedTips(week) {
    return (week.tips || []).filter(function (tip) {
      if (tip.status !== "inlämnad") return false;
      return (tip.dd1 && tip.dd1.length) || (tip.dd2 && tip.dd2.length);
    });
  }

  function nums(arr) {
    var out = [];
    (arr || []).forEach(function (n) {
      var v = Number(n);
      if (out.indexOf(v) === -1) out.push(v);
    });
    return out;
  }

  function sharedNums(a, b) {
    var set = {};
    nums(b).forEach(function (n) { set[n] = true; });
    return nums(a).filter(function (n) { return set[n]; });
  }

  function joinSv(parts) {
    var list = (parts || []).filter(function (p) { return p; });
    if (list.length === 0) return "";
    if (list.length === 1) return list[0];
    if (list.length === 2) return list[0] + " och " + list[1];
    return list.slice(0, -1).join(", ") + " och " + list[list.length - 1];
  }

  function antalOrd(n) {
    var ord = ["ingen", "en", "två", "tre", "fyra", "fem", "sex", "sju", "åtta"];
    return ord[n] || String(n);
  }

  function findMarket(week, leg, no) {
    var list = (week.market && week.market[leg]) || [];
    for (var i = 0; i < list.length; i++) {
      if (Number(list[i].no) === Number(no)) return list[i];
    }
    return null;
  }

  function horseName(week, tips, leg, no) {
    var h = findMarket(week, leg, no);
    if (h && h.name) return h.name;
    for (var i = 0; i < tips.length; i++) {
      var names = tips[i].names && tips[i].names[leg];
      if (!names) continue;
      var found = names[no] || names[String(no)];
      if (found) return found;
    }
    return "";
  }

  function horseText(week, tips, leg, no) {
    var h = findMarket(week, leg, no);
    var name = horseName(week, tips, leg, no);
    var label = String(no) + (name ? " " + name : "");
    if (h && h.scratched) label += " (struken)";
    return label;
  }

  function horseEntries(week, tips, leg) {
    var map = {};
    tips.forEach(function (tip) {
      nums(tip[leg]).forEach(function (no) {
        var key = String(no);
        if (!map[key]) map[key] = { no: no, people: [] };
        map[key].people.push(tip.person);
      });
    });
    var minLive = minOdds(week, leg);
    var entries = Object.keys(map).map(function (key) {
      var item = map[key];
      var h = findMarket(week, leg, item.no);
      item.name = horseName(week, tips, leg, item.no);
      item.odds = h ? h.odds : null;
      item.scratched = !!(h && h.scratched);
      item.band = item.scratched ? null : bandOf(item.odds, minLive, week);
      return item;
    });
    entries.sort(function (a, b) {
      if (a.scratched !== b.scratched) return a.scratched ? 1 : -1;
      var ao = a.odds == null ? 9999 : a.odds;
      var bo = b.odds == null ? 9999 : b.odds;
      if (ao !== bo) return ao - bo;
      return a.no - b.no;
    });
    return entries;
  }

  function legStory(week, tips, leg, label) {
    var entries = horseEntries(week, tips, leg);
    var total = tips.length;
    var all = entries.filter(function (e) { return e.people.length === total; });
    var shared = entries.filter(function (e) { return e.people.length > 1 && e.people.length < total; });
    var alone = entries.filter(function (e) { return e.people.length === 1; });
    var parts = [];
    if (!entries.length) {
      return "Inga hästar i " + label + ".";
    }
    if (all.length) {
      parts.push(finish("Alla " + antalOrd(total) + " har " + joinSv(all.map(function (e) { return horseText(week, tips, leg, e.no); }))));
    } else {
      parts.push("Ingen häst i " + label + " finns hos alla.");
    }
    shared.forEach(function (e) {
      parts.push(finish(joinSv(e.people) + " har " + horseText(week, tips, leg, e.no)));
    });
    var aloneSentences = [];
    tips.forEach(function (tip) {
      var own = alone.filter(function (e) { return e.people[0] === tip.person; });
      if (!own.length) return;
      aloneSentences.push(finish(tip.person + " har " + joinSv(own.map(function (e) { return horseText(week, tips, leg, e.no); }))));
    });
    if (aloneSentences.length) parts.push("Ensamt: " + aloneSentences.join(" "));
    return parts.join(" ");
  }

  function finish(text) {
    if (!text) return "";
    var last = text.charAt(text.length - 1);
    if (last === "." || last === "!" || last === "?") return text;
    return text + ".";
  }

  function closestSentence(tips, week) {
    var best = [];
    var bestScore = -1;
    for (var i = 0; i < tips.length; i++) {
      for (var j = i + 1; j < tips.length; j++) {
        var d1 = sharedNums(tips[i].dd1, tips[j].dd1);
        var d2 = sharedNums(tips[i].dd2, tips[j].dd2);
        var score = d1.length + d2.length;
        var item = { a: tips[i].person, b: tips[j].person, d1: d1, d2: d2, score: score };
        if (score > bestScore) {
          bestScore = score;
          best = [item];
        } else if (score === bestScore) {
          best.push(item);
        }
      }
    }
    if (bestScore < 1) return "Ingen delar en häst med någon annan.";
    var lead = best.length > 1 ? "Lika nära varandra är " : "Närmast varandra är ";
    return lead + best.map(function (item) {
      return item.a + " och " + item.b + ", med " +
        horseList(week, tips, "dd1", item.d1) + " i första loppet och " +
        horseList(week, tips, "dd2", item.d2) + " i andra";
    }).join("; ") + ".";
  }

  function horseList(week, tips, leg, numbers) {
    if (!numbers.length) return "ingen gemensam häst";
    return joinSv(numbers.map(function (no) { return horseText(week, tips, leg, no); }));
  }

  function rowStory(tips, week) {
    var map = {};
    tips.forEach(function (tip) {
      nums(tip.dd1).forEach(function (a) {
        nums(tip.dd2).forEach(function (b) {
          var key = a + "-" + b;
          if (!map[key]) map[key] = [];
          map[key].push(tip.person);
        });
      });
    });
    var shared = Object.keys(map).filter(function (key) { return map[key].length >= 2; });
    shared.sort(function (a, b) {
      if (map[b].length !== map[a].length) return map[b].length - map[a].length;
      return a.localeCompare(b, "sv");
    });
    if (!shared.length) return "Ingen rad delas av två eller fler.";
    return shared.map(function (key) {
      var people = map[key];
      var who = people.length === tips.length ? "Alla " + antalOrd(tips.length) : joinSv(people);
      return who + " har " + rowLabel(week, tips, key) + ".";
    }).join(" ");
  }

  function rowLabel(week, tips, key) {
    var parts = key.split("-");
    return horseText(week, tips, "dd1", parts[0]) + "–" + horseText(week, tips, "dd2", parts[1]);
  }

  function systemList(tips) {
    var rows = 0;
    var cost = 0;
    var items = tips.map(function (tip) {
      var a = nums(tip.dd1).length;
      var b = nums(tip.dd2).length;
      rows += a * b;
      cost += Number(tip.cost || 0);
      return "<li>" + escapeHtml(tip.person + ": " + a + "×" + b + ", " + (tip.cost || 0) + " kr, " + widthPhrase(a, b)) + "</li>";
    }).join("");
    return (
      "<ul class=\"list-disc pl-5\">" + items +
      "<li>" + escapeHtml("Tillsammans " + rows + " rader och " + cost + " kr.") + "</li></ul>"
    );
  }

  function widthPhrase(a, b) {
    if (a === b) return "lika många hästar i båda loppen";
    if (a > b) return "bredare i första loppet";
    return "bredare i andra loppet";
  }

  function minOdds(week, leg) {
    var list = (week.market && week.market[leg]) || [];
    var best = null;
    list.forEach(function (h) {
      if (h.scratched || !(h.odds > 0)) return;
      if (best == null || h.odds < best) best = h.odds;
    });
    return best;
  }

  function bandOf(odds, minLive, week) {
    if (!(odds > 0)) return null;
    var lowUnder = week.market && week.market.lowUnder != null ? Number(week.market.lowUnder) : 5;
    var highOver = week.market && week.market.highOver != null ? Number(week.market.highOver) : 12;
    if (odds < lowUnder || (minLive != null && Math.abs(odds - minLive) < 0.011)) return "låg";
    if (odds > highOver) return "hög";
    return "mellan";
  }

  function formatOdds(n) {
    return (Math.round(Number(n) * 100) / 100).toFixed(2).replace(".", ",");
  }

  function oddsBlock(week, tips) {
    if (!week.market || !week.market.dd1 || !week.market.dd2) {
      return '<p class="bg-yellow-200 rounded px-2 py-1">Vinnarodds saknas i veckans data, så låg- och högoddsare går inte att säga. Likhet och system ovan räknas ändå.</p>';
    }
    var lines = [
      favoriteSentence(week, tips, "dd1", "första loppet"),
      favoriteSentence(week, tips, "dd2", "andra loppet"),
      nearSentence(week, tips, "dd1"),
      nearSentence(week, tips, "dd2"),
      oddsCompare(tips, week)
    ].filter(function (line) { return line; });
    var people = tips.map(function (tip) {
      return "<li>" + escapeHtml(
        tip.person + ". DD-1: " + describeLeg(tip, week, "dd1") + ". DD-2: " + describeLeg(tip, week, "dd2") + "."
      ) + "</li>";
    }).join("");
    return (
      lines.map(function (line) { return "<p>" + escapeHtml(line) + "</p>"; }).join("") +
      '<ul class="list-disc pl-5 mt-2">' + people + "</ul>" +
      '<p class="mt-2 text-xs text-stone-500">' + sourceLine(week) + "</p>"
    );
  }

  function favoriteSentence(week, tips, leg, label) {
    var fav = null;
    var minLive = minOdds(week, leg);
    ((week.market && week.market[leg]) || []).forEach(function (h) {
      if (h.scratched || !(h.odds > 0)) return;
      if (minLive != null && Math.abs(h.odds - minLive) < 0.011) fav = h;
    });
    if (!fav) return "";
    var who = peopleOn(tips, leg, fav.no);
    var whoText = who.length === tips.length
      ? "Alla " + antalOrd(tips.length) + " har den."
      : (who.length ? joinSv(who) + " har den." : "Ingen av oss har den.");
    return "Favorit i " + label + " är " + fav.no + " " + fav.name + " till " + formatOdds(fav.odds) + ". " + whoText;
  }

  function peopleOn(tips, leg, no) {
    var out = [];
    tips.forEach(function (tip) {
      if (nums(tip[leg]).indexOf(Number(no)) !== -1) out.push(tip.person);
    });
    return out;
  }

  function nearSentence(week, tips, leg) {
    var minLive = minOdds(week, leg);
    if (minLive == null) return "";
    var hits = [];
    horseEntries(week, tips, leg).forEach(function (e) {
      if (e.scratched || !(e.odds > 0)) return;
      if (Math.abs(e.odds - minLive) < 0.011) return;
      if (e.odds - minLive <= 0.5) hits.push(e);
    });
    if (!hits.length) return "";
    return hits.map(function (e) {
      var who = e.people.length === tips.length ? "Alla " + antalOrd(tips.length) : joinSv(e.people);
      return e.no + " " + e.name + " till " + formatOdds(e.odds) + " ligger tätt bakom favoriten. " + who + " har den.";
    }).join(" ");
  }

  function describeLeg(tip, week, leg) {
    var counts = { "låg": 0, "mellan": 0, "hög": 0, "saknas": 0 };
    var dead = [];
    var minLive = minOdds(week, leg);
    nums(tip[leg]).forEach(function (no) {
      var h = findMarket(week, leg, no);
      if (h && h.scratched) {
        dead.push(horseText(week, [tip], leg, no).replace(" (struken)", ""));
        return;
      }
      var band = h ? bandOf(h.odds, minLive, week) : null;
      if (!band) counts.saknas += 1;
      else counts[band] += 1;
    });
    var text = countPhrase(counts);
    if (dead.length) text += ". Struken på kupongen: " + joinSv(dead);
    return text;
  }

  function countPhrase(counts) {
    var parts = [];
    ["låg", "mellan", "hög"].forEach(function (key) {
      if (counts[key]) parts.push(counts[key] + " " + key);
    });
    if (counts.saknas) parts.push(counts.saknas + " utan odds");
    if (!parts.length) return "inga levande hästar";
    return joinSv(parts);
  }

  function oddsCompare(tips, week) {
    var s1 = lowShare(tips, week, "dd1");
    var s2 = lowShare(tips, week, "dd2");
    if (!s1.live || !s2.live) return "";
    var diff = s2.share - s1.share;
    if (diff >= 0.15) return "Andra loppet ligger tyngre mot korta odds än första.";
    if (diff <= -0.15) return "Första loppet ligger tyngre mot korta odds än andra.";
    return "Fördelningen mellan korta och höga odds är liknande i de två loppen.";
  }

  function lowShare(tips, week, leg) {
    var live = 0;
    var low = 0;
    var minLive = minOdds(week, leg);
    tips.forEach(function (tip) {
      nums(tip[leg]).forEach(function (no) {
        var h = findMarket(week, leg, no);
        if (!h || h.scratched) return;
        live += 1;
        if (bandOf(h.odds, minLive, week) === "låg") low += 1;
      });
    });
    return { live: live, low: low, share: live ? low / live : 0 };
  }

  function sourceLine(week) {
    var m = week.market || {};
    var low = m.lowUnder != null ? formatOdds(m.lowUnder) : "5,00";
    var high = m.highOver != null ? formatOdds(m.highOver) : "12,00";
    var when = m.fetched ? " Hämtat " + m.fetched + "." : "";
    var href = m.url ? '<a class="underline" href="' + escapeHtml(m.url) + '">' + escapeHtml(m.source || "ATG") + "</a>" : escapeHtml(m.source || "ATG");
    return "Vinnarodds: " + href + "." + escapeHtml(when) +
      " Låg = kortast i loppet eller under " + escapeHtml(low) +
      ". Mellan = däremellan. Hög = över " + escapeHtml(high) +
      ". Ögonblicksbild, oddsen rör sig.";
  }

  function horseTables(week, tips) {
    return (
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">' +
      horseTable(week, tips, "dd1", "DD-1") +
      horseTable(week, tips, "dd2", "DD-2") +
      "</div>"
    );
  }

  function horseTable(week, tips, leg, title) {
    var rows = horseEntries(week, tips, leg).map(function (e) {
      var odds = e.scratched ? "struken" : (e.odds > 0 ? formatOdds(e.odds) + (e.band ? " · " + e.band : "") : "saknas");
      var who = e.people.length === tips.length ? "alla " + antalOrd(tips.length) : joinSv(e.people);
      var cls = e.scratched ? "text-stone-400" : "";
      return "<tr class=\"" + cls + "\"><td class=\"py-1 pr-3\">" + escapeHtml(horseText(week, tips, leg, e.no).replace(" (struken)", "")) +
        "</td><td class=\"py-1 pr-3 whitespace-nowrap\">" + escapeHtml(odds) +
        "</td><td class=\"py-1\">" + escapeHtml(who) + "</td></tr>";
    }).join("");
    return (
      '<div class="overflow-x-auto">' +
      '<p class="text-xs uppercase tracking-wide text-stone-500 mb-1">' + escapeHtml(title) + "</p>" +
      "<table class=\"w-full text-sm\"><thead><tr class=\"text-left text-stone-500\">" +
      "<th class=\"py-1 pr-3 font-medium\">Häst</th><th class=\"py-1 pr-3 font-medium\">Odds</th><th class=\"py-1 font-medium\">Vilka</th>" +
      "</tr></thead><tbody>" + rows + "</tbody></table></div>"
    );
  }

  function escapeHtml(value) {
    var el = document.createElement("span");
    el.textContent = value == null ? "" : String(value);
    return el.innerHTML;
  }
})();

/* Här skedde en uppdatering 2026-09-26: teknik-modalen nere till höger.
   Samma mönster som Claude-kompassen: klass .show, kryss, klick utanför, Escape. */
(function () {
  var modal = document.getElementById("tech-modal");
  var openBtn = document.getElementById("tech-open");
  var closeBtn = document.getElementById("tech-close");
  if (!modal || !openBtn) return;

  function closeModal() {
    modal.classList.remove("show");
  }

  openBtn.addEventListener("click", function () {
    modal.classList.add("show");
  });
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });
})();
