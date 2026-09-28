/*
 * helhet.js — korsreferenser mellan sidorna i koldioxidlagring/
 *
 * Här skedde en uppdatering 2026-09-28: filen skapades så att sidorna hänger ihop.
 * Den lägger in tre saker på varje sida som laddar den:
 *   1. en navigeringsrad överst, grupperad efter tema
 *   2. en "Läs vidare"-ruta längst ner med föregående/nästa och relaterade sidor
 *   3. på startsidan: kartan "Så hänger det ihop" i elementet #helhet-karta
 *
 * All information om sidorna finns i SIDOR nedan. En ny sida läggs till där,
 * och i HTML-filen läggs helhet.css och helhet.js in som på de andra sidorna.
 * Ingen ES2023-funktionalitet används.
 */
(function () {
  "use strict";

  // Teman i den ordning de visas i navigeringsraden.
  var TEMAN = [
    { id: "plats", namn: "Geologi och plats" },
    { id: "pengar", namn: "Pengar" },
    { id: "omvarld", namn: "Omvärlden" }
  ];

  // Ordningen i listan är läsordningen som styr "Föregående" och "Nästa".
  // "relaterat" anger sidor som hänger ihop med sidan, med en mening om varför.
  var SIDOR = [
    {
      fil: "index.html",
      kort: "Översikt",
      titel: "Koldioxidlagring i Sverige",
      tema: "plats",
      relaterat: [
        { fil: "kalkyl.html", varfor: "Varför 800 meter räcker, och vad lagringen kostar per kWh." },
        { fil: "sydvastra-ostersjon.html", varfor: "Kartorna över området söder om Skåne där Arnagergrönsanden ligger." },
        { fil: "norden.html", varfor: "Lagren i Norge och Danmark som svenska företag använder i dag." }
      ]
    },
    {
      fil: "sydvastra-ostersjon.html",
      kort: "Sydvästra Östersjön",
      titel: "Djupseismik och maringeologi söder om Skåne",
      tema: "plats",
      relaterat: [
        { fil: "index.html#arnager", varfor: "Vad grönsand är och vad borrningarna i Skåne träffade." },
        { fil: "oresund-karta.html", varfor: "Kartan som ofta förväxlas med kandidatområdet." },
        { fil: "kalkyl.html", varfor: "Varför reservoaren måste ligga där koldioxiden blir superkritisk." }
      ]
    },
    {
      fil: "oresund-karta.html",
      kort: "Öresund-kartan",
      titel: "Kartan över Öresund är inte en lagringsplats",
      tema: "plats",
      relaterat: [
        { fil: "sydvastra-ostersjon.html", varfor: "Det område SGU faktiskt pekar ut som kandidat." },
        { fil: "index.html#hav", varfor: "Varför lagen bara tillåter lagring till havs." },
        { fil: "bidrag.html", varfor: "Öresundskrafts avskiljning i Helsingborg och vart koldioxiden ska." }
      ]
    },
    {
      fil: "kalkyl.html",
      kort: "Kalkyl öre/kWh",
      titel: "Varför djupare än 800 meter, och vad kostar det per kWh?",
      tema: "pengar",
      relaterat: [
        { fil: "bidrag.html", varfor: "Vad staten och EU betalar per lagrat ton." },
        { fil: "ets.html", varfor: "Samma omräkning till öre per kWh för priset på utsläppsrätter." },
        { fil: "norden.html", varfor: "Vad transport och lagring kostar i Norge och Danmark." }
      ]
    },
    {
      fil: "bidrag.html",
      kort: "Bidrag",
      titel: "Vilka har fått bidrag, och till vad?",
      tema: "pengar",
      relaterat: [
        { fil: "ets.html", varfor: "Stöden omräknade till öre per kWh och jämförda med EU ETS." },
        { fil: "norden.html", varfor: "Lagren i Nordsjön som stöden i praktiken betalar för." },
        { fil: "kalkyl.html", varfor: "Hela kedjans kostnad, från avskiljning till lager." }
      ]
    },
    {
      fil: "ets.html",
      kort: "EU ETS",
      titel: "EU ETS-priset mot bidragen",
      tema: "pengar",
      relaterat: [
        { fil: "bidrag.html", varfor: "Beloppen bakom jämförelsen, organisation för organisation." },
        { fil: "kalkyl.html", varfor: "Formeln för öre per kWh och vad den bygger på." }
      ]
    },
    {
      fil: "norden.html",
      kort: "Norge och Danmark",
      titel: "Hur långt har Norge och Danmark kommit?",
      tema: "omvarld",
      relaterat: [
        { fil: "bidrag.html", varfor: "Stöden till Ørsted, Greensand, Northern Lights och Celsio." },
        { fil: "index.html#omraden", varfor: "Sveriges egna två kandidatområden, som ännu inte är byggda." },
        { fil: "kalkyl.html", varfor: "Samma räknesätt för öre per kWh som i jämförelsen." }
      ]
    }
  ];

  // Länkar till ett avsnitt på startsidan visas med avsnittets namn, inte sidans.
  var AVSNITT = {
    "index.html#omraden": "De två områdena",
    "index.html#hav": "Varför bara till havs",
    "index.html#arnager": "Borrningarna i Skåne"
  };

  // Kedjan på startsidan: frågorna en läsare behöver svar på, i tur och ordning.
  var KEDJA = [
    {
      fraga: "Var kan koldioxiden lagras?",
      svar: "Två kandidatområden till havs. Öresund är inte ett av dem.",
      lankar: ["index.html#omraden", "sydvastra-ostersjon.html", "oresund-karta.html"]
    },
    {
      fraga: "Vad kräver fysiken och lagen?",
      svar: "Mer än cirka 800 m djup, tätt takberg, och bara till havs.",
      lankar: ["kalkyl.html", "index.html#hav"]
    },
    {
      fraga: "Vad kostar det?",
      svar: "Hela kedjan ger ofta 50–120 öre/kWh på el och värme.",
      lankar: ["kalkyl.html"]
    },
    {
      fraga: "Vem betalar?",
      svar: "Staten och EU, per lagrat ton. Stödet ligger över priset på utsläppsrätter.",
      lankar: ["bidrag.html", "ets.html"]
    },
    {
      fraga: "Hur gör grannländerna?",
      svar: "Norge och Danmark lagrar redan. Svensk koldioxid skeppas dit.",
      lankar: ["norden.html"]
    }
  ];

  // Sidan som visas nu. En adress som slutar på "/" är startsidan.
  var aktuellFil = location.pathname.split("/").pop() || "index.html";
  var aktuellIndex = SIDOR.findIndex(function (s) { return s.fil === aktuellFil; });
  if (aktuellIndex === -1) return; // Okänd sida: lägg inte in något.
  var aktuell = SIDOR[aktuellIndex];

  // Hittar sidan för en länk. Ett eventuellt #ankare ignoreras vid uppslaget.
  function sida(lank) {
    var fil = lank.split("#")[0];
    return SIDOR.filter(function (s) { return s.fil === fil; })[0];
  }

  function el(tagg, klass, text) {
    var e = document.createElement(tagg);
    if (klass) e.className = klass;
    if (text) e.textContent = text;
    return e;
  }

  function lank(href, klass, text) {
    var a = el("a", klass, text);
    a.href = href;
    return a;
  }

  // 1. Navigeringsraden överst på sidan.
  function byggNav() {
    var nav = el("nav", "hh-nav");
    nav.setAttribute("aria-label", "Sidorna om koldioxidlagring");
    var inre = el("div", "hh-nav-inre");
    inre.appendChild(lank("index.html", "hh-nav-hem", "Koldioxidlagring"));

    TEMAN.forEach(function (tema) {
      var grupp = el("div", "hh-nav-grupp");
      grupp.appendChild(el("span", "hh-nav-tema", tema.namn));
      SIDOR.forEach(function (s) {
        if (s.tema !== tema.id) return;
        var a = lank(s.fil, "hh-nav-lank", s.kort);
        if (s === aktuell) a.setAttribute("aria-current", "page");
        grupp.appendChild(a);
      });
      inre.appendChild(grupp);
    });

    nav.appendChild(inre);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  // 2. "Läs vidare" längst ner: relaterade sidor plus föregående och nästa.
  function byggLasVidare() {
    var ruta = el("aside", "hh-vidare");
    ruta.setAttribute("aria-label", "Läs vidare");
    var inre = el("div", "hh-vidare-inre");
    inre.appendChild(el("h2", "hh-vidare-rubrik", "Läs vidare"));

    var lista = el("div", "hh-kort-lista");
    aktuell.relaterat.forEach(function (r) {
      var mal = sida(r.fil);
      if (!mal) return;
      var kort = lank(r.fil, "hh-kort");
      kort.appendChild(el("span", "hh-kort-tema", temaNamn(mal.tema)));
      kort.appendChild(el("span", "hh-kort-titel", AVSNITT[r.fil] || mal.titel));
      kort.appendChild(el("span", "hh-kort-text", r.varfor));
      lista.appendChild(kort);
    });
    inre.appendChild(lista);

    // Föregående och nästa följer läsordningen i SIDOR.
    var steg = el("div", "hh-steg");
    var fore = SIDOR[aktuellIndex - 1];
    var nasta = SIDOR[aktuellIndex + 1];
    steg.appendChild(fore ? lank(fore.fil, "hh-steg-lank", "← " + fore.kort) : el("span"));
    steg.appendChild(el("span", "hh-steg-nr", "Sida " + (aktuellIndex + 1) + " av " + SIDOR.length));
    steg.appendChild(nasta ? lank(nasta.fil, "hh-steg-lank hh-steg-nasta", nasta.kort + " →") : el("span"));
    inre.appendChild(steg);

    ruta.appendChild(inre);
    var main = document.querySelector("main");
    main.parentNode.insertBefore(ruta, main.nextSibling);
  }

  // 3. Kartan "Så hänger det ihop" på startsidan.
  function byggKarta() {
    var fast = document.getElementById("helhet-karta");
    if (!fast) return;
    var lista = el("ol", "hh-kedja");
    KEDJA.forEach(function (k, i) {
      var steg = el("li", "hh-kedja-steg");
      steg.appendChild(el("span", "hh-kedja-nr", String(i + 1)));
      var text = el("div");
      text.appendChild(el("p", "hh-kedja-fraga", k.fraga));
      text.appendChild(el("p", "hh-kedja-svar", k.svar));
      var lankar = el("p", "hh-kedja-lankar");
      k.lankar.forEach(function (l) {
        var mal = sida(l);
        if (mal) lankar.appendChild(lank(l, "hh-chip", AVSNITT[l] || mal.kort));
      });
      text.appendChild(lankar);
      steg.appendChild(text);
      lista.appendChild(steg);
    });
    fast.appendChild(lista);
  }

  function temaNamn(id) {
    return TEMAN.filter(function (t) { return t.id === id; })[0].namn;
  }

  byggNav();
  byggLasVidare();
  byggKarta();
})();
