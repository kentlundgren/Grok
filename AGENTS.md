# AGENTS.md – Projektbeskrivning för AI-agenter

Det här dokumentet beskriver repot `kentlundgren/Grok` och ger kontext till AI-agenter (Cursor, Grok Build, ChatGPT o.s.v.) som arbetar i projektet.

## Projektöversikt

**Repo:** `kentlundgren/Grok`  
**Syfte:** Testprojekt för att utforska och jämföra AI-verktyg, primärt Grok Build (xAI).  
**Ägare:** Kent Lundgren  
**Språk:** Svenska (kod och kommentarer på svenska om inget annat anges)  
**Blogg:** [Kom jag igång med Grok Build](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/) (13 juni 2026)

## Kontext: Grok Build i praktiken

Kent testar Grok Build som en del av ett befintligt flöde med Cloud Cowork (lokala filer), Cursor (kodredigering) och GitHub (versionshantering och publicering). Grok Build är **inte en ny IDE** utan en terminalbaserad agent som planerar uppgifter, visar diffar för godkännande och kan köra subagenter parallellt.

### Erfarenheter från första testet (juni 2026)

**Installation (Windows):**
- Kör alltid i **PowerShell** – inte i vanlig Kommandotolken (`irm` saknas där).
- Installationskommando: `irm https://x.ai/cli/install.ps1 | iex`
- Autentisering via OAuth med SuperGrok-konto i webbläsaren.

**Vad fungerar bra:**
- Sömlig integration med Git och befintliga repon.
- Plan Mode + diff-granskning ger mänsklig kontroll innan filer skrivs.
- Headless-läge passar repetitiva uppgifter på fritiden.
- Subagenter som arbetar parallellt delar upp komplexa uppgifter utan manuell steg-för-steg-styrning.
- Kompletterar Cursor och Cloud Cowork – ersätter dem inte.

**Vad att vara medveten om:**
- Beta-känsla; små installationshinder på Windows är förväntade.
- Kräver SuperGrok/Premium+ – inte gratis.
- Lärkurva om användaren inte redan är bekväm i terminalen.

**Rekommenderat arbetssätt:**
1. Börja smått – testa på ett litet script innan större projekt.
2. Använd `AGENTS.md` (det här dokumentet) för att ge agenten projektkontext.
3. Kombinera med Cursor för slutlig polering av kod.
4. Använd PowerShell-syntax på Windows (inte `&&` för att kedja kommandon).

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

Presentationen analyserar hur vårdköerna enligt vårdgarantin (90-dagarsmålet) har utvecklats, med interaktiva diagram, politisk granskning och orsaksanalys. Byggd som konkret exempel på hur en analytisk prompt (Prompt 3: enkel → analytisk → orsaks- och bias-version) kan bli en levande webbpresentation.

## Kodkonventioner

- **HTML:** Semantisk HTML5, responsiv design (Tailwind)
- **JavaScript:** Kommenterad kod; ES2023-funktioner markeras explicit
- **Indatafält:** Gul bakgrund (`#fef08a` / Tailwind `bg-yellow-200`) för tydlig UX
- **Filer:** Separata HTML/CSS/JS-filer om möjligt; undantag för enkla enkelfils-presentationer
- **Kommentarer:** Förklarar *varför*, inte *vad*. Uppdateringar markeras tydligt i koden.

## Arbetssätt med AI

Det här repot används för att **testa Grok Build** och dokumentera erfarenheter:
- Prompts testas i flera versioner (enkel → analytisk → orsaks- och bias-version)
- Resultat jämförs mot Cursor-genererad kod och ChatGPT-output
- Fokus på faktabaserade, källhänvisade presentationer
- Reflektioner och tips publiceras på bloggen: [klel.wordpress.com](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/)

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

## Referenser

- Kent Lundgren (2026) *Kom jag igång med Grok Build*. [https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/)
- xAI (2026) *Introducing Grok Build*. [https://x.ai/news/grok-build-cli](https://x.ai/news/grok-build-cli)
- xAI Docs (2026) *Getting Started | Grok Build*. [https://docs.x.ai/build/overview](https://docs.x.ai/build/overview)
