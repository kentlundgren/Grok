/*
 * karta.js — interaktiv karta över var SGU har undersökt för koldioxidlagring
 *
 * Här skedde en uppdatering 2026-09-28: filen skapades. Den ersätter hänvisningar
 * till föredragsbilder som inte finns på sidorna.
 *
 * Data: data/sgu-karta.js (window.SGU_KARTA), genererad ur SGU:s öppna data.
 * Bakgrund: OpenStreetMap via Leaflet (laddas från CDN i HTML-filen).
 * Kartan ritas i varje element med klassen "sgu-karta". Attributet data-vy
 * väljer startläge: "skane" (söder om Skåne), "oresund" eller "bada".
 * Ingen ES2023-funktionalitet används.
 */
(function () {
  "use strict";

  var D = window.SGU_KARTA;
  if (!D || !window.L) return;

  // Startlägen: [söder, väster], [norr, öster] i grader.
  var VYER = {
    skane: [[55.05, 12.6], [55.75, 14.5]],
    oresund: [[55.3, 12.45], [56.15, 13.15]],
    // Här skedde en uppdatering 2026-09-28: vy för SGU:s andra kandidatområde, sydost om Gotland.
    gotland: [[55.6, 16.4], [58.5, 19.6]],
    bada: [[54.9, 12.4], [58.2, 19.6]]
  };

  // En färg per mätår, så att man ser hur undersökningen byggdes ut.
  var ARSFARG = { "2023": "#0369a1", "2024": "#c2410c", "2025": "#7c3aed", "okänt": "#64748b" };

  function tal(x) {
    return Math.round(x).toLocaleString("sv-SE");
  }

  function rita(behallare) {
    // zoomSnap 0.5 låter vyerna fylla kartan tätare än hela zoomsteg.
    var karta = L.map(behallare, { scrollWheelZoom: false, zoomSnap: 0.5 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 14,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · Data: <a href="https://www.sgu.se/produkter-och-tjanster/geologiska-data/samhallsplanering--geologiska-data/koldioxidlagring/">SGU</a>'
    }).addTo(karta);

    // SGU:s två områden av primärt intresse för koldioxidlagring.
    var omraden = L.geoJSON(D.omraden, {
      style: { color: "#0c4a6e", weight: 2, dashArray: "6 4", fillColor: "#38bdf8", fillOpacity: 0.08 },
      onEachFeature: function (f, lager) { lager.bindPopup("<strong>" + f.properties.namn + "</strong><br>SGU:s område av primärt intresse för koldioxidlagring."); }
    }).addTo(karta);

    // Ekolodets mätlinjer, ett lager per år.
    var arslager = {};
    D.matlinjer.features.forEach(function (f) {
      var ar = f.properties.ar;
      arslager["Mätlinjer " + ar + " (" + tal(f.properties.km) + " km)"] = L.geoJSON(f, {
        style: { color: ARSFARG[ar] || ARSFARG["okänt"], weight: 1.2, opacity: 0.8 }
      }).addTo(karta);
    });

    // Borrhål: SGU:s nyckelhål framhävda, övriga som små grå punkter.
    function popup(p) {
      var rader = ["<strong>" + p.namn + "</strong>"];
      if (p.ar) rader.push("Borrat " + p.ar + (p.op ? " av " + p.op : ""));
      if (p.langd) rader.push("Borrad längd " + p.langd.toLocaleString("sv-SE") + " m enligt SGU:s data");
      return rader.join("<br>");
    }
    var nyckel = L.geoJSON(D.borrhal, {
      filter: function (f) { return f.properties.nyckel; },
      pointToLayer: function (f, ll) {
        return L.circleMarker(ll, { radius: 7, color: "#fff", weight: 2, fillColor: "#16a34a", fillOpacity: 1 });
      },
      onEachFeature: function (f, lager) {
        lager.bindPopup(popup(f.properties));
        // Fasta etiketter bara för de nya hålen i Skåne; hålen på Gotland ligger för tätt.
        var fast = f.properties.namn === "Lilla Beddinge-1" || f.properties.namn === "Skåre-1";
        lager.bindTooltip(f.properties.namn, { permanent: fast, direction: "right", className: "sgu-etikett" });
      }
    }).addTo(karta);
    var ovriga = L.geoJSON(D.borrhal, {
      filter: function (f) { return !f.properties.nyckel; },
      pointToLayer: function (f, ll) {
        return L.circleMarker(ll, { radius: 2.5, weight: 0, fillColor: "#475569", fillOpacity: 0.7 });
      },
      onEachFeature: function (f, lager) { lager.bindPopup(popup(f.properties)); }
    });

    var overlager = { "Undersökningsområden": omraden };
    Object.keys(arslager).forEach(function (k) { overlager[k] = arslager[k]; });
    overlager["SGU:s nyckelborrhål"] = nyckel;
    overlager["Övriga borrhål i SGU:s urval"] = ovriga;
    L.control.layers(null, overlager, { collapsed: true }).addTo(karta);
    L.control.scale({ imperial: false }).addTo(karta);

    var vy = behallare.getAttribute("data-vy") || "skane";
    karta.fitBounds(VYER[vy] || VYER.skane);

    // Knappar under kartan för att hoppa mellan vyerna.
    var knappar = behallare.parentNode.querySelectorAll("[data-sgu-vy]");
    Array.prototype.forEach.call(knappar, function (k) {
      k.addEventListener("click", function () { karta.fitBounds(VYER[k.getAttribute("data-sgu-vy")]); });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll(".sgu-karta"), rita);
})();
