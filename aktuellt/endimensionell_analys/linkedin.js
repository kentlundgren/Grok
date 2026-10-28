/**
 * Ordantal och kopiering av LinkedIn-utkast.
 * Här skedde en uppdatering 2026-10-28: två varianter, kort och längre.
 */
(function () {
  "use strict";

  function plainParagraphs(root) {
    return Array.prototype.map.call(root.querySelectorAll("p"), function (p) {
      return p.textContent.replace(/\s+/g, " ").trim();
    }).filter(Boolean);
  }

  function wordCount(paragraphs) {
    var text = paragraphs.filter(function (line) {
      return line.indexOf("http") !== 0;
    }).join(" ");
    if (!text) return 0;
    return text.split(/\s+/).length;
  }

  function linkedInText(paragraphs) {
    return paragraphs.join("\n\n");
  }

  document.querySelectorAll("[data-count-for]").forEach(function (meta) {
    var root = document.getElementById(meta.getAttribute("data-count-for"));
    if (!root) return;
    var n = wordCount(plainParagraphs(root));
    meta.textContent = n + " ord";
  });

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var root = document.getElementById(btn.getAttribute("data-copy"));
      if (!root) return;
      var text = linkedInText(plainParagraphs(root));
      function done() {
        var previous = btn.textContent;
        btn.textContent = "Kopierat";
        btn.classList.add("is-done");
        window.setTimeout(function () {
          btn.textContent = previous;
          btn.classList.remove("is-done");
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          window.prompt("Kopiera texten:", text);
        });
      } else {
        window.prompt("Kopiera texten:", text);
      }
    });
  });

  var techBtn = document.getElementById("techBtn");
  var techModal = document.getElementById("techModal");
  var techClose = document.getElementById("techClose");
  if (techBtn && techModal && techClose) {
    function openModal() { techModal.classList.add("show"); techClose.focus(); }
    function closeModal() { techModal.classList.remove("show"); techBtn.focus(); }
    techBtn.addEventListener("click", openModal);
    techClose.addEventListener("click", closeModal);
    techModal.addEventListener("click", function (event) {
      if (event.target === techModal) closeModal();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && techModal.classList.contains("show")) closeModal();
    });
  }
})();
