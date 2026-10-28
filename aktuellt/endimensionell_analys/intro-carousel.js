/**
 * Växlar mellan tre satsbilder på startsidan.
 * Här skedde en uppdatering 2026-10-28: 3 s bild per bild; paus vid reduced motion.
 */
(function () {
  "use strict";

  var root = document.querySelector(".theorem-carousel");
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll(".theorem-slide"));
  var dots = Array.prototype.slice.call(root.querySelectorAll(".theorem-dot"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0;
  var timer = null;
  var INTERVAL_MS = 3000;

  function setActive(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (slide, n) {
      var on = n === index;
      slide.classList.toggle("is-active", on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
    });
    dots.forEach(function (dot, n) {
      dot.classList.toggle("is-active", n === index);
      dot.setAttribute("aria-selected", n === index ? "true" : "false");
    });
    root.setAttribute("data-active", String(index));
  }

  function next() {
    setActive(index + 1);
  }

  function start() {
    if (reduceMotion || slides.length < 2) return;
    stop();
    timer = window.setInterval(next, INTERVAL_MS);
  }

  function stop() {
    if (timer != null) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var n = Number(dot.dataset.index);
      if (!Number.isFinite(n)) return;
      setActive(n);
      start();
    });
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", function (e) {
    if (!root.contains(e.relatedTarget)) start();
  });

  setActive(0);
  start();
})();
