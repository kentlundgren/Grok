# CLAUDE.md — dagens-dubbel

Detta är en **statisk** GitHub Pages-app i `kentlundgren/Grok`. Ingen npm-build, ingen bundler.

## Live

https://kentlundgren.github.io/Grok/dagens-dubbel/

## Vad du får ändra

- Ny lördag: `data/ÅÅMMDD.json` + mapp `ÅÅMMDD/` + rad i `data/weeks.json`.
- Resultat: fältet `result` i veckans JSON.
- Tips från Lotta eller Benita: samma JSON, objekten med `"person": "Lotta"` / `"Benita"`. Sätt `status` till `"inlämnad"`.
- Utseende: `index.html`, `stil.css`, `app.js`.

## Vad du inte ska göra utan att fråga

- Införa Vite/React/Next utan att användaren bett om det.
- Committa och pusha (ägaren gör det i Cursor, om hen inte uttryckligen ber agenten).
- Ta bort utfall eller skriva påhittade vinnare.

## Konventioner i Grok-repot

- Svenska i UI och kommentarer.
- Relativa sökvägar (`data/weeks.json`, inte `/Grok/...`).
- Gul bakgrund (`bg-yellow-200` / `#fef9c3`) på fält som väntar på ifyllnad.
- README i en mapp med live-sida ska ha live-länken högst upp.

## Relaterat skill

`skills/lordags-dagens-dubbel/SKILL.md` — hur lördagens 35–45 kr-system tas fram.
Källkopian som Grok själv kör ligger globalt hos användaren; denna mapp är repo-kopian så Cursor och Claude Code ser samma instruktioner.
