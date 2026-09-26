# Familjens lördags-DD

- **Live:** [https://kentlundgren.github.io/Grok/dagens-dubbel/](https://kentlundgren.github.io/Grok/dagens-dubbel/)
- **Källkod:** [https://github.com/kentlundgren/Grok/tree/main/dagens-dubbel](https://github.com/kentlundgren/Grok/tree/main/dagens-dubbel)

Statisk app (ingen npm-build) som visar Kent, Lotta, Benita och Bengts Dagens Dubbel varje lördag: system 35–45 kr à 5 kr/rad, en skräll i ett av loppen, och utfall när loppen är körda.

Den här README:n är skriven så att **Grok, Claude Code, Cursor, Codex eller annan modell** ska kunna fortsätta arbetet utan att gissa.

## Läs först (agenter)

1. Den här filen.
2. `CLAUDE.md` i samma mapp.
3. Repo-roten `../AGENTS.md`.
4. Ägarens arbetssätt: [Claude-kompassen](https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/#claude).

Kort kedja ägaren följer: **PRD/krav → styrfiler (AGENTS.md, CLAUDE.md, SKILL.md) → yta (Cursor / Claude Code / Grok) → ägaren commit:ar i Cursor → GitHub Pages.**

Committa och pusha **inte** om ägaren inte uttryckligen bett om det.

## Vad appen gör

- Visar ställning per tippare (träff / ett rätt / spelade / kronor) när `result.status` är `"klar"`.
- Visar en omgång i taget (dropdown).
- Gula kort = tips saknas ännu.
- Vita kort = inlämnat tips.

Tippare just nu: Kent, Lotta, Benita, Bengt. Listan styrs av `data/weeks.json` → `tipsters`.

## Arkitektur

Ingen bundler. Live-sidan är filerna som de ligger i git.

| Fil | Roll |
| --- | --- |
| `index.html` | Skal, Tailwind CDN |
| `stil.css` | Extra stil (kuponggult) |
| `app.js` | Ritar ställning och omgång |
| `data/weeks.json` | Register + tippare |
| `data/ÅÅMMDD.json` | En lördag, maskinläsbar källa |
| `data.js` | Snapshot av samma data så `file://` fungerar |
| `ÅÅMMDD/` | Mänskliga anteckningar och kupongbilder |
| `CLAUDE.md` | Guardrails för Claude Code |

`app.js` försöker `fetch("data/weeks.json")`. Misslyckas det (vanligt när man öppnar `index.html` som fil i Windows) används `window.DD_INDEX` / `window.DD_WEEKS` från `data.js`.

**När du ändrar ett tips eller resultat:** uppdatera både `data/ÅÅMMDD.json` **och** `data.js`. Annars ser live-sidan och den lokala filen olika ut.

Inför inte Vite, React eller Next utan att fråga.

## Så lägger du till en ny lördag

Id = `ÅÅMMDD` (exempel `271003`).

1. Skapa mappen `dagens-dubbel/ÅÅMMDD/` med `README.md`, `kent.md`, `lotta.md`, `benita.md`, `bengt.md`.
2. Kopiera `data/260926.json` till `data/ÅÅMMDD.json`. Byt id, datum, bana, töm tips eller fyll i dem. Sätt `result.status` till `"pending"`.
3. Lägg id:t först i `weeks` i `data/weeks.json`.
4. Spegla samma innehåll i `data.js`.
5. När loppen är körda: `result.status = "klar"`, fyll `dd1Winner`, `dd2Winner`, `ddOdds` (samma två filer).

Rader = antal hästar i DD-1 × antal i DD-2. Insats 5 kr. Mål 35–45 kr (t.ex. 3×3 = 45 eller 4×2 = 40). En skräll i **ett** av loppen.

## Så fyller du i någons tips

I `data/ÅÅMMDD.json` (och `data.js`) hitta objektet med `"person": "Bengt"` (eller Lotta/Benita):

```json
{
  "person": "Bengt",
  "status": "inlämnad",
  "submitted": "2026-09-26 12:00",
  "cost": 45,
  "stake": 5,
  "rows": 9,
  "system": "3x3",
  "dd1": [2, 8, 11],
  "dd2": [1, 3, 7],
  "names": { "dd1": { "2": "Namn" }, "dd2": { "1": "Namn" } },
  "scratch": null,
  "coupon": null,
  "note": ""
}
```

Gissa aldrig hästar. Om ägaren inte skickat startnummer: lämna `status: "saknas"`.

## Lokal visning (Windows / OneDrive)

Öppna **inte** bara filen om du vill testa fetch-vägen. Antingen:

- live-URL:en ovan, eller
- i mappen `dagens-dubbel`: `python -m http.server 8080` och gå till `http://localhost:8080/`

Efter `data.js`-fallbacken ska även dubbelklick på `index.html` visa omgången. Pull:a senast från GitHub först — OneDrive-kopian kan ligga efter `main`.

## Felsökning

| Symptom | Orsak | Åtgärd |
| --- | --- | --- |
| Tom vit ruta på Pages | gammal `app.js` i cache | hard reload (Ctrl+F5), kolla att `index.html` laddar `app.js?v=…` |
| Bara tre tippare | gammal `weeks.json` i cache | hard reload |
| `Failed to fetch` på `C:\...\index.html` | `file://` får inte läsa JSON | uppdatera till senaste `data.js` + `app.js`, eller kör lokal server |
| Lokal sida ≠ live-sida | OneDrive inte pull:ad | `git pull` i Grok-repot |

## Relaterat skill

Tipsunderlag (vilka hästar, skräll, 35–45 kr) tas fram med `skills/lordags-dagens-dubbel/` i detta repo. Grok har också en global kopia av samma skill.

18+. [ATG: Spela med måtta](https://www.atg.se/spela-med-matta).
