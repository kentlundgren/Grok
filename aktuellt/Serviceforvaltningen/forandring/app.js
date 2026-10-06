/*
 * app.js – ritar diagrammet, tidslinjen, de öppna frågorna och källorna från data.js.
 * All text sätts med textContent, så ett tecken som < i datafilen aldrig tolkas som kod.
 */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  /* ---------- Hjälpfunktioner ---------- */
  function el(tag, klass, text) {
    var e = document.createElement(tag);
    if (klass) e.className = klass;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function kallLank(id) {
    var a = el('a', null, KALLOR[id].kort);
    a.href = '#ref-' + id;
    return a;
  }

  function kallRad(ids, prefix) {
    var p = el('p', 'kallrad');
    p.appendChild(document.createTextNode(prefix || 'Källa: '));
    ids.forEach(function (id, i) {
      if (i > 0) p.appendChild(document.createTextNode('; '));
      p.appendChild(kallLank(id));
    });
    return p;
  }

  /* ---------- Rutor ---------- */
  var rutor = {};      // id -> DOM-element
  var info = {};       // id -> data (för detaljpanelen)
  var kanter = [];     // { fran, till, status }

  function skapaRuta(d, extra) {
    var b = el('button', 'ruta ' + d.status);
    b.type = 'button';
    b.id = 'ruta-' + d.id;
    b.setAttribute('aria-label', d.namn + ', ' + STATUS_TEXT[d.status]);
    var namn = el('span', 'namn', d.namn);
    if (d.ny) namn.appendChild(el('span', 'ny', d.ny));
    b.appendChild(namn);
    if (d.under) b.appendChild(el('span', 'under', d.under));
    if (extra) extra(b);
    rutor[d.id] = b;
    info[d.id] = d;
    b.addEventListener('click', function () { visaDetalj(d.id); });
    b.addEventListener('mouseenter', function () { lyft(d.id); });
    b.addEventListener('mouseleave', slapp);
    b.addEventListener('focus', function () { lyft(d.id); });
    b.addEventListener('blur', slapp);
    return b;
  }

  function malNamn(malId) {
    return malId === 'nyfast' ? 'Ny fastighetsförvaltning' : 'Övriga serviceverksamheter (fem förvaltningar)';
  }

  function byggVanster() {
    var kol = document.getElementById('vanster');
    kol.appendChild(el('h3', 'kolumn-rubrik', VANSTER.rubrik));
    kol.appendChild(skapaRuta(VANSTER.nod));

    var ram = el('div', 'ram');
    var rub = el('p', 'ram-rubrik');
    rub.appendChild(el('strong', null, VANSTER.forvaltning.namn));
    rub.appendChild(document.createTextNode(' · ' + VANSTER.forvaltning.under));
    ram.appendChild(rub);

    VANSTER.avdelningar.forEach(function (a) {
      ram.appendChild(skapaRuta(a, function (b) {
        // Textrad som ersätter linjen på smal skärm
        b.appendChild(el('span', 'gar-till', '→ ' + malNamn(a.mal) + ' (' + STATUS_TEXT[a.status].toLowerCase() + ')'));
      }));
      kanter.push({ fran: a.id, till: a.mal, status: a.status });
    });

    var s = VANSTER.stod;
    ram.appendChild(skapaRuta(s, function (b) {
      var chips = el('span', 'stod-delar');
      s.delar.forEach(function (d) { chips.appendChild(el('span', 'chip', d)); });
      b.appendChild(chips);
      b.appendChild(el('span', 'gar-till', '→ ej specificerat, kan gå till båda målen'));
    }));
    s.mal.forEach(function (m) { kanter.push({ fran: s.id, till: m, status: s.status }); });

    kol.appendChild(ram);
  }

  function byggHoger() {
    var kol = document.getElementById('hoger');
    kol.appendChild(el('h3', 'kolumn-rubrik', HOGER.rubrik));
    kol.appendChild(skapaRuta(HOGER.ks));

    var nf = el('div', 'hoger-nyfast');
    nf.appendChild(skapaRuta(HOGER.nyfast, function (b) {
      var ul = el('span', 'uppdrag');
      HOGER.nyfast.uppdrag.forEach(function (u) { ul.appendChild(el('span', 'chip', u)); });
      b.appendChild(ul);
    }));
    kol.appendChild(nf);
    kanter.push({ fran: 'ks', till: 'nyfast', status: 'belagt' });

    var ov = el('div', 'hoger-ovriga');
    ov.appendChild(skapaRuta(HOGER.ovriga, function (b) {
      var ul = el('span', 'mottagare');
      HOGER.ovriga.mottagare.forEach(function (m) { ul.appendChild(el('span', 'chip', m)); });
      b.appendChild(ul);
    }));
    kol.appendChild(ov);

    HOGER.noteringar.forEach(function (n) { kol.appendChild(el('p', 'notering', n)); });
  }

  /* ---------- Linjer ---------- */
  function pilmarkering(svg) {
    var defs = document.createElementNS(NS, 'defs');
    ['belagt', 'indikerat', 'ospecificerat'].forEach(function (s) {
      var m = document.createElementNS(NS, 'marker');
      m.setAttribute('id', 'pil-' + s);
      m.setAttribute('viewBox', '0 0 10 10');
      m.setAttribute('refX', '9'); m.setAttribute('refY', '5');
      m.setAttribute('markerWidth', '7'); m.setAttribute('markerHeight', '7');
      m.setAttribute('orient', 'auto-start-reverse');
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', 'M0,0 L10,5 L0,10 z');
      p.setAttribute('class', 'pil-' + s);
      m.appendChild(p);
      defs.appendChild(m);
    });
    svg.appendChild(defs);
  }

  function ritaLinjer() {
    var diagram = document.getElementById('diagram');
    var svg = document.getElementById('linjer');
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (window.getComputedStyle(svg).display === 'none') return; // smal skärm
    pilmarkering(svg);

    var box = diagram.getBoundingClientRect();
    function rect(id) {
      var r = rutor[id].getBoundingClientRect();
      return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
    }

    // Fördela ankomstpunkterna längs målrutans vänstra kant, så att linjer inte läggs ovanpå varandra
    var perMal = {};
    kanter.forEach(function (k) {
      if (k.fran === 'ks') return;
      (perMal[k.till] = perMal[k.till] || []).push(k);
    });

    kanter.forEach(function (k) {
      var a = rect(k.fran), b = rect(k.till);
      var d;
      if (k.fran === 'ks') {
        // lodrät pil inom högerkolumnen
        var x = b.x + b.w / 2;
        d = 'M' + x + ',' + (a.y + a.h) + ' L' + x + ',' + (b.y - 1);
      } else {
        var grupp = perMal[k.till];
        var i = grupp.indexOf(k);
        var andel = (i + 1) / (grupp.length + 1);
        var x1 = a.x + a.w, y1 = a.y + a.h / 2;
        var x2 = b.x - 2, y2 = b.y + b.h * (0.15 + 0.7 * andel);
        var dx = (x2 - x1) * 0.5;
        d = 'M' + x1 + ',' + y1 + ' C' + (x1 + dx) + ',' + y1 + ' ' + (x2 - dx) + ',' + y2 + ' ' + x2 + ',' + y2;
      }
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('class', 'linje ' + k.status);
      p.setAttribute('marker-end', 'url(#pil-' + k.status + ')');
      p.setAttribute('data-fran', k.fran);
      p.setAttribute('data-till', k.till);
      svg.appendChild(p);
    });
  }

  /* ---------- Lyft fram linjer vid hover och fokus ---------- */
  function lyft(id) {
    var diagram = document.getElementById('diagram');
    var lyfta = false;
    Array.prototype.forEach.call(document.querySelectorAll('#linjer .linje'), function (p) {
      var traff = p.getAttribute('data-fran') === id || p.getAttribute('data-till') === id;
      p.classList.toggle('lyft', traff);
      if (traff) lyfta = true;
    });
    diagram.classList.toggle('fokus', lyfta);
  }

  function slapp() {
    document.getElementById('diagram').classList.remove('fokus');
    Array.prototype.forEach.call(document.querySelectorAll('#linjer .linje'), function (p) {
      p.classList.remove('lyft');
    });
  }

  /* ---------- Detaljpanel ---------- */
  function visaDetalj(id) {
    var d = info[id];
    var panel = document.getElementById('detalj');
    panel.textContent = '';
    panel.appendChild(el('span', 'status ' + d.status, STATUS_TEXT[d.status]));
    panel.appendChild(el('h3', null, d.namn));
    panel.appendChild(el('p', null, d.text));
    panel.appendChild(kallRad(d.kallor));
    Object.keys(rutor).forEach(function (k) { rutor[k].classList.toggle('vald', k === id); });
  }

  /* ---------- Tidslinje, öppna frågor, källor ---------- */
  function byggTidslinje() {
    var ol = document.getElementById('tidslinje');
    var viktiga = ['2026-03-26', '2026-12-31', '2027-01-01'];
    TIDSLINJE.forEach(function (t) {
      var li = el('li', viktiga.indexOf(t.datum) >= 0 ? 'viktig' : '');
      var time = el('time', null, t.datum);
      time.setAttribute('datetime', t.datum);
      li.appendChild(time);
      li.appendChild(el('span', null, t.text + ' '));
      li.appendChild(kallRad(t.kallor));
      ol.appendChild(li);
    });
  }

  function byggOppna() {
    var rot = document.getElementById('oppna');
    OPPNA.forEach(function (o) {
      var kort = el('article', 'fraga ' + o.status);
      kort.appendChild(el('span', 'status ' + o.status, STATUS_TEXT[o.status]));
      kort.appendChild(el('h3', null, o.rubrik));
      kort.appendChild(el('p', null, o.text));
      kort.appendChild(kallRad(o.kallor));
      rot.appendChild(kort);
    });
  }

  function byggKallor() {
    var rot = document.getElementById('kallor');
    Object.keys(KALLOR).forEach(function (id) {
      var k = KALLOR[id];
      var p = el('p', 'ref');
      p.id = 'ref-' + id;
      // "Lunds kommun, 2026a" -> "Lunds kommun (2026a)" enligt Harvard
      var delar = k.kort.match(/^(.*), (u\.å\.|\d{4}[a-z]?)$/);
      var forf = delar ? delar[1] + ' (' + delar[2] + ')' : k.kort;
      p.appendChild(document.createTextNode(forf + ' '));
      p.appendChild(el('em', null, k.titel));
      p.appendChild(document.createTextNode('. Tillgänglig på: '));
      var a = el('a', null, k.url);
      a.href = k.url; a.target = '_blank'; a.rel = 'noopener';
      p.appendChild(a);
      p.appendChild(document.createTextNode(' (Hämtad: ' + HAMTAD + '). '));
      p.appendChild(el('em', null, '(' + k.notion + ')'));
      rot.appendChild(p);
    });
  }

  /* ---------- Modal ---------- */
  function modal() {
    var overlay = document.getElementById('techModal');
    function oppna() { overlay.classList.add('show'); document.getElementById('techClose').focus(); }
    function stang() { overlay.classList.remove('show'); document.getElementById('techBtn').focus(); }
    document.getElementById('techBtn').addEventListener('click', oppna);
    document.getElementById('techClose').addEventListener('click', stang);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) stang(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('show')) stang();
    });
  }

  /* ---------- Start ---------- */
  byggVanster();
  byggHoger();
  byggTidslinje();
  byggOppna();
  byggKallor();
  modal();

  ritaLinjer();
  window.addEventListener('resize', ritaLinjer);
  if (window.ResizeObserver) new ResizeObserver(ritaLinjer).observe(document.getElementById('diagram'));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ritaLinjer);
})();
