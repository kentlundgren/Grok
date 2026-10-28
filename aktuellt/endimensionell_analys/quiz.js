/**
 * Quiz för startsidan — tre svårighetsgrader × tre satser.
 * Här skedde en uppdatering 2026-10-28: frågor, svarsfeedback och koppling till app.html.
 * Här skedde en uppdatering 2026-10-28: svarsalternativ blandas om vid varje fråga (och ny omgång).
 */
(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D"];

  /** Fisher–Yates — ES2023: Array.prototype.toSorted används inte; vanlig loop. */
  function shuffleIndices(length) {
    const order = Array.from({ length: length }, (_, i) => i);
    for (let i = length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = order[i];
      order[i] = order[j];
      order[j] = tmp;
    }
    return order;
  }

  function sameChoiceOrder(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  /** Kopiera frågan med omkastade alternativ; facit-index och feedback följer med. */
  function withShuffledChoices(q, avoidChoices) {
    let order = shuffleIndices(q.choices.length);
    let attempt = 0;
    while (
      avoidChoices &&
      sameChoiceOrder(
        order.map((i) => q.choices[i]),
        avoidChoices
      ) &&
      attempt < 12
    ) {
      order = shuffleIndices(q.choices.length);
      attempt++;
    }
    const choices = order.map((i) => q.choices[i]);
    const feedback = order.map((i) => q.feedback[i]);
    const correct = order.indexOf(q.correct);
    return {
      theorem: q.theorem,
      theoremLabel: q.theoremLabel,
      prompt: q.prompt,
      choices,
      feedback,
      correct,
      appLink: q.appLink,
      appHint: q.appHint,
    };
  }

  /** @type {Record<string, Array<QuizItem>>} */
  const BANK = {
    easy: [
      {
        theorem: "mvt",
        theoremLabel: "Medelvärdessatsen",
        prompt:
          "En bil kör 180 km på exakt 3 timmar. Hastigheten varierar kontinuerligt under resan (inga stopp). Måste det ha funnits minst ett ögonblick då hastigheten var exakt 60 km/h?",
        choices: [
          "Ja — medelvärdessatsen ger minst en tidpunkt med den medelhastigheten.",
          "Nej — man kan köra 90 km/h hela vägen om man bromsar kraftigt i slutet.",
          "Ja, men bara om hastigheten är deriverbar som funktion av tiden.",
          "Nej — satsen gäller bara för polynom, inte för verklig trafik.",
        ],
        correct: 0,
        feedback: [
          "Rätt. Medelhastigheten är 60 km/h. Om s(t) är sträckan är s′(t) hastigheten; kontinuitet och deriverbarhet på (0, 3) ger ett ögonblick då s′ = medelhastigheten.",
          "Medelhastigheten är 180/3 = 60 km/h. Om du aldrig hade 60 km/h skulle genomsnittet inte bli 60 — tänk sekantens lutning mellan start och mål.",
          "I kursen formuleras satsen med deriverbarhet på det öppna intervallet. I praktiken antar vi ofta en mjuk hastighetskurva; då är villkoren rimliga.",
          "Satsen är just till för att dra slutsatser om hastighet och förändring från medelvärden — inte bara för rena räkneexempel.",
        ],
        appLink: "app.html?tab=mvt",
        appHint: "Dra i a och b och se sekanten parallell med en tangent.",
      },
      {
        theorem: "ivt",
        theoremLabel: "Satsen om mellanliggande värden",
        prompt:
          "Klockan 06:00 är temperaturen −4 °C och klockan 18:00 är den +2 °C. Temperaturen ändras kontinuerligt under dagen. Kan vi vara säkra på att den någon gång var exakt 0 °C?",
        choices: [
          "Ja — alla värden mellan −4 och +2 måste antas någon gång.",
          "Nej — vädret kan hoppa över 0 °C om det blåser kallt.",
          "Ja, men bara om temperaturen också är deriverbar.",
          "Nej — 0 °C ligger inte mellan −4 och +2.",
        ],
        correct: 0,
        feedback: [
          "Rätt. 0 ligger mellan −4 och 2. En kontinuerlig funktion på ett intervall kan inte «hoppa över» en mellanliggande höjd.",
          "Det vore ett språng i grafen — då är funktionen inte kontinuerlig. Satsen om mellanliggande värden kräver kontinuitet.",
          "Deriverbarhet behövs inte här; det räcker med kontinuitet. Det är en vanlig förväxling med medelvärdessatsen.",
          "0 ligger faktiskt mellan −4 och +2 på tallinjen. Kontinuitet tvingar fram en tidpunkt då T(t) = 0.",
        ],
        appLink: "app.html?tab=ivt",
        appHint: "Justera höjden k och se var grafen skär linjen y = k.",
      },
      {
        theorem: "evt",
        theoremLabel: "Extremvärdessatsen",
        prompt:
          "En mätserie beskriver en kontinuerlig funktion f på veckodagarna måndag–fredag (ett slutet intervall). Finns det garanterat minst en dag med störst och en med minst mätvärde?",
        choices: [
          "Ja — på ett kompakt intervall antar en kontinuerlig funktion max och min.",
          "Nej — extremvärdet kan «nästan» nås men inträffa bara på helgen utanför intervallet.",
          "Ja, men bara om f också är deriverbar varje dag.",
          "Nej — bara om funktionen är linjär.",
        ],
        correct: 0,
        feedback: [
          "Rätt. [mån, fre] är kompakt (slutet och begränsat). Kontinuitet räcker för att max och min ska antas någonstans i intervallet.",
          "På ett slutet intervall kan supremum som inte antas bara hända om funktionen inte är kontinuerlig — eller om intervallet är öppet.",
          "Extremvärdessatsen kräver inte deriverbarhet. |x| har minimum i 0 utan att vara deriverbar där.",
          "Alla kontinuerliga funktioner på kompakta intervall, inte bara linjära.",
        ],
        appLink: "app.html?tab=evt",
        appHint: "Jämför «kompakt intervall» med motexemplen öppet intervall och språng.",
      },
    ],
    medium: [
      {
        theorem: "mvt",
        theoremLabel: "Medelvärdessatsen",
        prompt:
          "f är kontinuerlig på [0, 1], deriverbar på (0, 1) och f(0) = f(1) = 0. Vad följer av medelvärdessatsen (Rolles fall)?",
        choices: [
          "Det finns ξ ∈ (0, 1) med f′(ξ) = 0.",
          "f är identiskt noll på hela [0, 1].",
          "f′(0) = f′(1) = 0 måste gälla.",
          "Det finns inget sådant ξ om f bara tangerar x-axeln.",
        ],
        correct: 0,
        feedback: [
          "Rätt. Sekantens lutning är 0, så någon tangent i (0, 1) måste vara horisontell — det är Rolles sats.",
          "f kan gå upp och ner och ändå ha f(0) = f(1); tänk sin(πx) på [0, 1].",
          "Derivata i ändpunkterna ingår inte i standardformuleringen; ξ ska ligga strikt mellan 0 och 1.",
          "Om grafen lämnar och återvänder till noll måste den någonstans vända — där är derivatan 0 (under deriverbarhetsvillkoret).",
        ],
        appLink: "app.html?tab=mvt",
        appHint: "Prova kurvan sin x på ett intervall där f(a) ≈ f(b).",
      },
      {
        theorem: "ivt",
        theoremLabel: "Satsen om mellanliggande värden",
        prompt:
          "f är definierad på [−1, 1] med f(−1) = −1 och f(1) = 1, men f har ett språng: f(x) = −1 för x < 0 och f(x) = 1 för x ≥ 0. Finns c ∈ (−1, 1) med f(c) = 0?",
        choices: [
          "Nej — funktionen antar bara −1 och 1; alla värden mellan missas.",
          "Ja — 0 ligger mellan −1 och 1 så kontinuitet ger ett c.",
          "Ja — i x = 0 blir f(0) = 0 automatiskt.",
          "Nej — men det finns c om vi istället söker f(c) = 0,5.",
        ],
        correct: 0,
        feedback: [
          "Rätt. Det här är motexemplet «med språng» i appen: utan kontinuitet kan grafen hoppa över alla mellanliggande höjder.",
          "Kontinuitet är förutsättningen — den är bruten i 0.",
          "I definitionen här är f(0) = 1, inte 0.",
          "0,5 missas också; alla värden strikt mellan −1 och 1 antas inte.",
        ],
        appLink: "app.html?tab=ivt&mode=jump",
        appHint: "Välj «Med språng» i visualiseringen och flytta k mellan −1 och 1.",
      },
      {
        theorem: "evt",
        theoremLabel: "Extremvärdessatsen",
        prompt:
          "f(x) = x på det öppna intervallet (0, 1). Är f kontinuerlig där, och antar f ett största värde på (0, 1)?",
        choices: [
          "f är kontinuerlig men antar inget maximum på (0, 1) — intervallet är inte kompakt.",
          "f antar maximum 1 i x = 1.",
          "f antar både max och min eftersom f är kontinuerlig.",
          "f är inte kontinuerlig på (0, 1).",
        ],
        correct: 0,
        feedback: [
          "Rätt. Supremum är 1 men 1 ingår inte i intervallet. Extremvärdessatsen kräver ett kompakt intervall, t.ex. [0, 1].",
          "Punkten 1 ingår inte i (0, 1); f(x) kommer nära 1 men når det inte inuti intervallet.",
          "Kontinuitet räcker inte utan kompakthet (slutet + begränsat).",
          "f(x) = x är kontinuerlig överallt, särskilt på (0, 1).",
        ],
        appLink: "app.html?tab=evt&mode=open",
        appHint: "Motexemplet «Öppet intervall» visar att max och min kan saknas.",
      },
    ],
    hard: [
      {
        theorem: "mvt",
        theoremLabel: "Medelvärdessatsen",
        prompt:
          "f(x) = |x| på [−1, 1]. Vilken slutsats är korrekt om medelvärdessatsen?",
        choices: [
          "Villkoret deriverbar på (−1, 1) är inte uppfyllt (hörn i 0), så satsens slutsats behöver inte gälla.",
          "Det finns ξ ∈ (−1, 1) med f′(ξ) = 0 eftersom f(−1) = f(1).",
          "Satsen ger alltid exakt ett ξ, och det är x = 0.",
          "Satsen gäller eftersom f är kontinuerlig på [−1, 1].",
        ],
        correct: 0,
        feedback: [
          "Rätt. Kontinuitet räcker inte; deriverbarhet på det öppna intervallet krävs. I hörnet finns ingen väldefinierad tangentlutning.",
          "Rolle-liknande likhet i ändpunkterna hjälper inte om f inte är deriverbar överallt på (−1, 1).",
          "Det kan finnas flera eller inga punkter med önskad sekantlutning när villkoren brister; |x| är standardmotexempel.",
          "Kontinuitet är bara halva villkoren — prova |x| i appen med kurvan |x|.",
        ],
        appLink: "app.html?tab=mvt",
        appHint: "Välj kurvan |x| och notera att slutsatsen markeras som att den inte håller.",
      },
      {
        theorem: "ivt",
        theoremLabel: "Satsen om mellanliggande värden",
        prompt:
          "f är kontinuerlig på [a, b] och k är ett reellt tal mellan f(a) och f(b). Vilken påstående motsvarar satsen om mellanliggande värden?",
        choices: [
          "Det finns minst ett c ∈ [a, b] med f(c) = k.",
          "Det finns c ∈ (a, b) med f(c) = k om k strikt ligger mellan f(a) och f(b).",
          "f måste vara växande på [a, b] för att k ska antas.",
          "k får bara antas om f är deriverbar på (a, b).",
        ],
        correct: 1,
        feedback: [
          "Nära, men c kan ibland vara en ändpunkt när k = f(a) eller f(b). Formuleringen med strikt mellan och (a, b) är den vanliga kärnan i kursen.",
          "Rätt. För ett värde strikt mellan bildvärdena finns en inre punkt där funktionen antar det — under kontinuitet.",
          "Monotoni krävs inte; grafen får gå upp och ner.",
          "Deriverbarhet spelar ingen roll för mellanliggande värden.",
        ],
        appLink: "app.html?tab=ivt",
        appHint: "Sök nollställe när f(a) och f(b) har olika tecken — ett tillämpat fall av satsen.",
      },
      {
        theorem: "evt",
        theoremLabel: "Extremvärdessatsen",
        prompt:
          "På [0, 1] definieras f(x) = x för x < 1 och f(1) = 0 (språng nedåt i höger ändpunkt). Vilket påstående stämmer?",
        choices: [
          "f antar ett minimum på [0, 1] men inget maximum — supremum 1 antas inte.",
          "f antar både max och min eftersom [0, 1] är kompakt.",
          "f saknar minimum eftersom f(1) = 0 är lägst.",
          "Extremvärdessatsen gäller inte eftersom intervallet är kompakt.",
        ],
        correct: 0,
        feedback: [
          "Rätt. Intervallet är kompakt men f är inte kontinuerlig i 1. Värden nära 1 från vänster är nära 1, men f(1) = 0 — maximum antas inte.",
          "Kompakthet räcker inte utan kontinuitet på hela [a, b].",
          "Minimum 0 antas faktiskt (i x = 1 och längs [0,1) är f(x) = x ≥ 0).",
          "Intervallet är kompakt; det är bristande kontinuitet som bryter satsen.",
        ],
        appLink: "app.html?tab=evt&mode=jump",
        appHint: "Motexemplet «Språng» i extremvärdesfliken matchar detta.",
      },
    ],
  };

  const state = {
    view: "intro",
    difficulty: null,
    index: 0,
    score: 0,
    answered: false,
    /** Aktuell fråga med omkastade svarsalternativ */
    activeQuestion: null,
    /** Senaste alternativordning per frågeindex (för omstart) */
    lastChoiceOrder: [],
    /** Facit som användaren såg under omgången */
    runFacit: [],
  };

  const root = document.getElementById("quiz-root");
  const views = {
    intro: document.getElementById("view-intro"),
    difficulty: document.getElementById("view-difficulty"),
    quiz: document.getElementById("view-quiz"),
    results: document.getElementById("view-results"),
  };

  function show(view) {
    state.view = view;
    Object.entries(views).forEach(([key, el]) => {
      if (el) el.hidden = key !== view;
    });
  }

  function currentSet() {
    return BANK[state.difficulty] || [];
  }

  function currentQuestion() {
    return currentSet()[state.index];
  }

  function renderQuizQuestion() {
    const base = currentQuestion();
    if (!base) return;
    state.answered = false;
    state.activeQuestion = withShuffledChoices(base, state.lastChoiceOrder[state.index]);

    const q = state.activeQuestion;

    document.getElementById("quiz-progress").textContent =
      "Fråga " + (state.index + 1) + " av 3 · " + labelDifficulty(state.difficulty);
    document.getElementById("quiz-theorem").textContent = q.theoremLabel;
    document.getElementById("quiz-prompt").textContent = q.prompt;

    const list = document.getElementById("quiz-choices");
    list.innerHTML = "";
    q.choices.forEach((text, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.dataset.index = String(i);
      btn.innerHTML = "<span class=\"choice-letter\">" + LETTERS[i] + "</span><span>" + text + "</span>";
      btn.addEventListener("click", () => pickAnswer(i, btn));
      li.appendChild(btn);
      list.appendChild(li);
    });

    const panel = document.getElementById("quiz-feedback");
    panel.hidden = true;
    panel.className = "feedback-panel";
    document.getElementById("quiz-next").hidden = true;
  }

  function pickAnswer(choiceIndex, btn) {
    if (state.answered) return;
    state.answered = true;
    const q = state.activeQuestion;
    if (!q) return;
    const correct = q.correct === choiceIndex;
    if (correct) state.score += 1;

    state.lastChoiceOrder[state.index] = q.choices.slice();
    state.runFacit[state.index] = {
      theoremLabel: q.theoremLabel,
      letter: LETTERS[q.correct],
      text: q.choices[q.correct],
      appLink: q.appLink,
    };

    document.querySelectorAll(".choice-btn").forEach((b) => {
      b.disabled = true;
      const i = Number(b.dataset.index);
      if (i === q.correct) b.classList.add("is-correct");
      else if (i === choiceIndex && !correct) b.classList.add("is-wrong");
    });

    const panel = document.getElementById("quiz-feedback");
    panel.hidden = false;
    panel.className = "feedback-panel " + (correct ? "ok" : "no");

    document.getElementById("feedback-verdict").textContent = correct ? "Rätt svar!" : "Inte riktigt — men bra att du funderade.";
    document.getElementById("feedback-body").textContent = q.feedback[choiceIndex];
    document.getElementById("feedback-answer").textContent =
      "Facit: " + LETTERS[q.correct] + ". " + q.choices[q.correct];

    const link = document.getElementById("feedback-app");
    link.href = q.appLink;
    link.textContent = "Öppna i visualiseringen";
    document.getElementById("feedback-app-hint").textContent = q.appHint;

    const next = document.getElementById("quiz-next");
    next.hidden = false;
    next.textContent = state.index < 2 ? "Nästa fråga" : "Se resultat";
    next.focus();
  }

  function renderResults() {
    const total = 3;
    document.getElementById("results-score").textContent = state.score + " av " + total + " rätt";
    const summary = document.getElementById("results-summary");
    let msg;
    if (state.score === 3) msg = "Utmärkt — du har grepp om villkoren och tillämpningarna.";
    else if (state.score === 2) msg = "Bra! Läs facitkommentarerna en gång till och prova visualiseringen.";
    else if (state.score === 1) msg = "Bra start. Motexemplen i appen hjälper dig se när satserna inte gäller.";
    else msg = "Ta det lugnt — börja med lätt nivå eller utforska satserna i appen medan du drar i a och b.";
    summary.textContent = msg;

    const recap = document.getElementById("results-recap");
    recap.innerHTML = state.runFacit
      .map((row, i) => {
        if (!row) return "";
        return (
          "<article class=\"recap-card\"><h3>" +
          (i + 1) +
          ". " +
          row.theoremLabel +
          "</h3><p><strong>Facit:</strong> " +
          row.letter +
          ". " +
          row.text +
          "</p><p><a href=\"" +
          row.appLink +
          "\">Visa i programmet</a></p></article>"
        );
      })
      .join("");
  }

  function labelDifficulty(d) {
    if (d === "easy") return "Lätt";
    if (d === "medium") return "Medel";
    if (d === "hard") return "Svår";
    return d;
  }

  function startQuiz(difficulty) {
    state.difficulty = difficulty;
    state.index = 0;
    state.score = 0;
    state.activeQuestion = null;
    state.lastChoiceOrder = [];
    state.runFacit = [];
    show("quiz");
    renderQuizQuestion();
  }

  document.getElementById("btn-start-quiz")?.addEventListener("click", () => show("difficulty"));

  document.querySelectorAll("[data-difficulty]").forEach((btn) => {
    btn.addEventListener("click", () => startQuiz(btn.dataset.difficulty));
  });

  document.getElementById("btn-back-intro")?.addEventListener("click", () => show("intro"));
  document.getElementById("quiz-next")?.addEventListener("click", () => {
    if (state.index < 2) {
      state.index += 1;
      renderQuizQuestion();
    } else {
      renderResults();
      show("results");
    }
  });

  document.getElementById("btn-retry-same")?.addEventListener("click", () => startQuiz(state.difficulty));
  document.getElementById("btn-retry-new")?.addEventListener("click", () => show("difficulty"));
  document.getElementById("btn-results-app")?.addEventListener("click", () => {
    location.href = "app.html";
  });

  show("intro");
})();
