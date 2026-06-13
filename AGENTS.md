# AGENTS.md – Projektbeskrivning för AI-agenter

Det här dokumentet beskriver repot `kentlundgren/Grok` och ger kontext till AI-agenter (Cursor, Grok Builder, ChatGPT o.s.v.) som arbetar i projektet.

## Projektöversikt

**Repo:** `kentlundgren/Grok`  
**Syfte:** Testprojekt för att utforska och jämföra AI-verktyg, primärt Grok Builder (xAI).  
**Ägare:** Kent Lundgren  
**Språk:** Svenska (kod och kommentarer på svenska om inget annat anges)

## Mappstruktur

```
Grok/
├── README.md          # Projektöversikt
├── AGENTS.md          # Det här dokumentet – kontext för AI-agenter
└── vardkoer/          # Delprojekt: Vårdköer i Sverige 2022–2026
    ├── index.html     # Interaktiv HTML-presentation (Tailwind CSS + Chart.js)
    └── README.md      # Dokumentation för delprojektet
```

## Aktiva delprojekt

### vardkoer – Vårdköer i Sverige 2022–2026

| Egenskap | Värde |
|---|---|
| Typ | Interaktiv HTML-presentation |
| Tekniker | HTML5, Tailwind CSS (CDN), Chart.js |
| Live URL | https://kentlundgren.github.io/Grok/vardkoer/ |
| GitHub-källa | https://github.com/kentlundgren/Grok/tree/main/vardkoer |
| Data | SKR, Socialstyrelsen, Riksrevisionen (t.o.m. april 2026) |

Presentationen analyserar hur vårdköerna enligt vårdgarantin (90-dagarsmålet) har utvecklats, med interaktiva diagram, politisk granskning och orsaksanalys.

## Kodkonventioner

- **HTML:** Semantisk HTML5, responsiv design (Tailwind)
- **JavaScript:** Kommenterad kod; ES2023-funktioner markeras explicit
- **Indatafält:** Gul bakgrund (`#fef08a` / Tailwind `bg-yellow-200`) för tydlig UX
- **Filer:** Separata HTML/CSS/JS-filer om möjligt; undantag för enkla enkelfils-presentationer
- **Kommentarer:** Förklarar *varför*, inte *vad*. Uppdateringar markeras tydligt i koden.

## Arbetssätt med AI

Det här repot används för att **testa Grok Builder** och dokumentera erfarenheter:
- Prompts testas i flera versioner (enkel → analytisk → orsaks- och bias-version)
- Resultat jämförs mot Cursor-genererad kod och ChatGPT-output
- Fokus på faktabaserade, källhänvisade presentationer

## Git-flöde

```
main        # Huvudgren, direkt tillgänglig via GitHub Pages
```

GitHub Pages serverar `/vardkoer/index.html` på:  
`https://kentlundgren.github.io/Grok/vardkoer/`

## Viktigt för agenter

1. Fråga alltid om befintlig fil ska uppdateras **eller** om en ny versionsfil (`filnamn_verX`) ska skapas.
2. Kommentera tydligt i koden när uppdateringar görs.
3. Använd PowerShell-syntax (inte `&&` för att kedja kommandon – dela upp i separata steg).
4. Lägg alltid till `.gitignore` i nya projekt.
5. Använd relativa sökvägar i Vite-projekt (`base: './'` i `vite.config.js`).
