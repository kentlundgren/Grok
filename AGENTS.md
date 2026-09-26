# AGENTS.md – Projektbeskrivning för AI-agenter

Det här dokumentet beskriver repot `kentlundgren/Grok` och ger kontext till AI-agenter (Cursor, Grok Build, Claude Code, ChatGPT o.s.v.) som arbetar i projektet.

## Projektöversikt

**Repo:** `kentlundgren/Grok`  
**Syfte:** Testprojekt för att utforska och jämföra AI-verktyg, primärt Grok Build (xAI).  
**Ägare:** Kent Lundgren  
**Språk:** Svenska (kod och kommentarer på svenska om inget annat anges)  
**Blogg:** [Kom jag igång med Grok Build](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/) (13 juni 2026)

## Mappstruktur

```
Grok/
├── README.md
├── AGENTS.md
├── skills/lordags-dagens-dubbel/
├── dagens-dubbel/     # Familjens lördags-DD (live-app, ingen build)
├── intervju/Forsakringskassan_202609/
└── vardkoer/
```

### dagens-dubbel — Familjens lördags-DD

| Egenskap | Värde |
|---|---|
| Typ | Statisk HTML-app (ingen build) |
| Tekniker | HTML5, Tailwind CSS (CDN), vanilla JS, JSON |
| Live URL | https://kentlundgren.github.io/Grok/dagens-dubbel/ |
| GitHub-källa | https://github.com/kentlundgren/Grok/tree/main/dagens-dubbel |
| Agentfiler | `dagens-dubbel/CLAUDE.md`, `.cursor/rules/dagens-dubbel.mdc` |

Ny lördag = `data/ÅÅMMDD.json` + mapp `ÅÅMMDD/` + id i `data/weeks.json`. Resultat fylls i samma JSON.

## Git-flöde

`main` är GitHub Pages-grenen.

**Standard för agenter:** ändra filer, men committa och pusha inte utan uttrycklig begäran. Ägaren pushar normalt via Cursor.

**Undantag:** om ägaren uttryckligen ber om commit/push.

## Viktigt för agenter

1. Fråga om befintlig fil ska uppdateras eller om en ny versionsfil ska skapas.
2. Relativa sökvägar. Ingen Vite/React-build i dagens-dubbel utan att fråga.
3. README i mapp med live-sida ska ha live-länken högst upp:
   `https://kentlundgren.github.io/Grok/<mapp>/`
4. Gul bakgrund på fält som väntar på ifyllnad.
5. Läs `dagens-dubbel/CLAUDE.md` innan större ändringar i den appen.
