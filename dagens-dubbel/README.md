# Familjens lördags-DD

- **Live:** [https://kentlundgren.github.io/Grok/dagens-dubbel/](https://kentlundgren.github.io/Grok/dagens-dubbel/)

Statisk app som visar flera lördagar: Kent, Lotta, Benita och Bengts Dagens Dubbel, system, kostnad och resultat. Ingen build. Samma filer fungerar på GitHub Pages och när du öppnar mappen i Cursor eller Claude Code.

## Så lägger du till en ny lördag

1. Skapa `dagens-dubbel/ÅÅMMDD/` (exempel `271003`).
2. Kopiera `data/260926.json` till `data/ÅÅMMDD.json` och fyll i bana, hästar, status.
3. Lägg id:t först i listan `weeks` i `data/weeks.json`.
4. Lägg `kent.md`, `lotta.md`, `benita.md`, `bengt.md` i veckomappen. Kupongbilder valfritt.
5. När loppen är körda: sätt `result.status` till `"klar"` och fyll `dd1Winner`, `dd2Winner`, `ddOdds`.

Appen räknar rader som `antal i DD-1 × antal i DD-2`. Standardinsats 5 kr, budget 35–45 kr.

## Filer

| Fil | Roll |
| --- | --- |
| `index.html` | Live-sidan |
| `app.js` | Läser JSON och ritar ställning + omgång |
| `stil.css` | Komplement till Tailwind |
| `data/weeks.json` | Register över omgångar |
| `data/ÅÅMMDD.json` | En omgång, maskinläsbar |
| `ÅÅMMDD/` | Mänskliga anteckningar och kupongbilder |
| `CLAUDE.md` | Kontext för Claude Code |

Relaterat Grok-skill (kopia i detta repo): [`../skills/lordags-dagens-dubbel/`](../skills/lordags-dagens-dubbel/).

18+. [ATG: Spela med måtta](https://www.atg.se/spela-med-matta).
