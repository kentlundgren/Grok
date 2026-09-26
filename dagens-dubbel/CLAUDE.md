# CLAUDE.md — dagens-dubbel

Statisk GitHub Pages-app i `kentlundgren/Grok`. Ingen npm-build.

## Live

https://kentlundgren.github.io/Grok/dagens-dubbel/

## Ägarens arbetssätt (Claude-kompassen)

https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/#claude

- Fas 0: kort krav innan större omskrivning (vad/varför), inte kod först.
- Fas 1: den här filen + `../AGENTS.md` + ev. SKILL.md styr *hur*.
- Fas 2: yta = Cursor och/eller Claude Code. Grok får scaffolde, inte äga leveransen.
- Fas 3: ägaren commit:ar och pushar i Cursor om hen inte uttryckligen bett agenten göra det. Live = GitHub Pages.

Du är tankepartner, inte ställföreträdande avsändare.

## Vad du får ändra

- Ny lördag: `data/ÅÅMMDD.json` + mapp `ÅÅMMDD/` + rad i `data/weeks.json` + spegling i `data.js`.
- Resultat: fältet `result` i veckans JSON **och** i `data.js`.
- Tips: objekten `Kent` / `Lotta` / `Benita` / `Bengt`. `status` → `"inlämnad"` bara när startnummer finns.
- Utseende: `index.html`, `stil.css`, `app.js`.

## Vad du inte ska göra utan att fråga

- Vite / React / Next.
- Commit/push (standard: ägaren i Cursor).
- Påhittade vinnare eller påhittade hästar.

## Konventioner

- Svenska i UI.
- Relativa sökvägar.
- Gult = väntar på ifyllnad.
- README ska ha live-länken högst upp.

## Relaterat

`skills/lordags-dagens-dubbel/SKILL.md` — hur 35–45 kr-systemet tas fram.
