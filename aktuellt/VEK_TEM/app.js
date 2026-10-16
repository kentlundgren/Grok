/* VEK, TEM och balanserat styrkort: förklaringsrutor i diagrammet, navigering och teknik-modal.
   Inga bibliotek, ingen data lämnar webbläsaren. Inga ES2023-funktioner. */
(function () {
  "use strict";

  /* Förklaringsruta vid hovring, fokus och tryck på rutor i Diagram 2.
     Klick låser rutan, Escape eller klick utanför stänger den. */
  (function popover() {
    var pop = document.getElementById("tipPop");
    if (!pop) { return; }
    var locked = null;

    function show(target) {
      var text = target.getAttribute("data-tip");
      if (!text) { return; }
      pop.textContent = text;
      pop.hidden = false;
      var r = target.getBoundingClientRect();
      var top = window.pageYOffset + r.bottom + 8;
      var left = window.pageXOffset + r.left;
      var maxLeft = window.pageXOffset + document.documentElement.clientWidth - pop.offsetWidth - 12;
      pop.style.top = top + "px";
      pop.style.left = Math.max(8, Math.min(left, maxLeft)) + "px";
    }
    function hide() { pop.hidden = true; locked = null; }

    Array.prototype.forEach.call(document.querySelectorAll(".dnode"), function (n) {
      n.addEventListener("mouseenter", function () { if (!locked) { show(n); } });
      n.addEventListener("mouseleave", function () { if (locked !== n) { hide(); } });
      n.addEventListener("focus", function () { if (!locked) { show(n); } });
      n.addEventListener("blur", function () { if (locked !== n) { hide(); } });
      n.addEventListener("click", function (e) {
        e.stopPropagation();
        if (locked === n) { hide(); } else { show(n); locked = n; }
      });
      n.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (locked === n) { hide(); } else { show(n); locked = n; } }
      });
    });
    document.addEventListener("click", hide);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { hide(); } });
  })();

  /* Markerar aktuellt avsnitt i toppnavigeringen. */
  (function nav() {
    var links = document.querySelectorAll(".topnav a");
    if (!("IntersectionObserver" in window)) { return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Array.prototype.forEach.call(links, function (a) {
            a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Array.prototype.forEach.call(links, function (a) {
      var s = document.getElementById(a.getAttribute("href").slice(1));
      if (s) { io.observe(s); }
    });
  })();

  /* Teknik-modal. */
  (function modal() {
    var btn = document.getElementById("techBtn");
    var box = document.getElementById("techModal");
    var close = document.getElementById("techClose");
    if (!btn || !box || !close) { return; }
    function open() { box.classList.add("show"); close.focus(); }
    function shut() { box.classList.remove("show"); btn.focus(); }
    btn.addEventListener("click", open);
    close.addEventListener("click", shut);
    box.addEventListener("click", function (e) { if (e.target === box) { shut(); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("show")) { shut(); } });
  })();
})();
