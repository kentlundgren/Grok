# AGENTS.md – Projektbeskrivning för AI-agenter

Det här dokumentet beskriver repot `kentlundgren/Grok` och ger kontext till AI-agenter (Cursor, Grok Build, Claude Code, ChatGPT o.s.v.) som arbetar i projektet.

## Projektöversikt

**Repo:** `kentlundgren/Grok`  
**Syfte:** Testprojekt för att utforska och jämföra AI-verktyg, primärt Grok Build (xAI).  
**Ägare:** Kent Lundgren  
**Språk:** Svenska (kod och kommentarer på svenska om inget annat anges)  
**Blogg:** [Kom jag igång med Grok Build](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/) (13 juni 2026)

## Arbetssätt: Claude-kompassen

Ägaren kodar enligt [Claude-kompassen](https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/#claude).

| Fas | Vad det betyder här |
| --- | --- |
| 0 PRD | Vad/varför innan större omskrivning. Fråga vid tvekan. |
| 1 Styrfiler | `AGENTS.md` (denna) + närmaste `CLAUDE.md` + ev. SKILL.md |
| 2 Yta | Cursor och Claude Code är normal yta. Grok får scaffolde och förklara. |
| 3 Leverans | Ägaren commit:ar i Cursor och pushar till GitHub Pages, om hen inte uttryckligen bett agenten pusha. |

Kodsättet ligger inte i den här filen. Kopia av Groks interna skill `kodsatt-agentic-engineering` finns i `.agents/skills/kodsatt-agentic-engineering/`. Originalet är den interna skillen. `.claude/skills/kodsatt-agentic-engineering/` pekar dit. Här skedde en uppdatering 2026-10-05.

Agenten är tankepartner, inte ställföreträdande avsändare. Hitta inte på krav, hästar eller resultat.

## Flera AI-agenter över tid

Ägaren arbetar med flera AI-modeller och verktyg, över tid och ofta på samma sak: Grok (Grok Build), Claude (Claude Code och Cowork), Cursor och vid behov ChatGPT, Gemini och andra. Att köra samma uppdrag i olika verktyg vid olika tillfällen är ett medvetet sätt att lära känna modellernas och verktygens styrkor och svagheter. Det gäller alla repon, inte bara det här. Se skillen `kent-ai-arbetssatt` (`AI-teknik/Presentationer/.claude/skills/kent-ai-arbetssatt/SKILL.md`) och [Claude-kompassen](https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/#claude), som beskriver rollerna. Kompassen är en bild och kan vara inaktuell.

### Roller, så som de är beskrivna eller belagda

| Verktyg | Roll | Källa |
| --- | --- | --- |
| Claude Code | Research, skrivande, kodning och lokal testning. Föreslår, bygger och verifierar, men committar och pushar inte om ägaren inte uttryckligen ber om det. | Claude-kompassen |
| Cursor | Kodyta, redigering, diff, commit och push. Ägaren väljer Cursor för filer och versionshantering. | Claude-kompassen |
| Grok / Grok Build | Scaffolda och förklara. Har också tagit fram analysen i `aktuellt/regeringsbildning` (fältet `model` i `scenario.js`). | Denna fil, `scenario.js` |
| Cowork | Lokala filer, i Claude-appens skrivbordsyta. | Denna fil |
| ChatGPT, Gemini | Används, men rollen är inte beskriven här eller i kompassen. Fråga ägaren, gissa inte. | |

### Om du tar över mitt i arbetet

1. Du är inte först och inte ensam. Läs `git status`, `git log -5` och översta posterna i `AGENTLOGG.md` innan du ändrar. En annan agent eller ägaren kan ha ändrat filer sedan senast.
2. Ändra inte tillbaka andras ändringar. Verkar något fel, säg det och fråga.
3. Skriv aldrig text eller siffror under en annan modells eller människas namn. Ange vilken modell och vilket verktyg som gjorde vad, till exempel fältet `model` i `aktuellt/regeringsbildning/scenario.js`.
4. Skriv inte att du har gjort eller testat något som du inte har gjort.
5. Lämna en överlämning i slutet av ett arbetspass: en ny post överst i `AGENTLOGG.md` med vad som ändrades, vad som är verifierat och vad som återstår. Ägaren committar.
6. Verktygsspecifika filer (`CLAUDE.md`, `.cursor/rules/`, `.agents/skills/`) ska bara gälla just det verktyget eller peka hit. Skriv inte samma regel på flera ställen.

Här skedde en uppdatering 2026-10-02: avsnittet lades till.

## Kontext: Grok Build i praktiken

Kent testar Grok Build som en del av ett befintligt flöde med Cloud Cowork (lokala filer), Cursor (kodredigering) och GitHub (versionshantering och publicering). Grok Build är **inte en ny IDE** utan en terminalbaserad agent som planerar uppgifter, visar diffar för godkännande och kan köra subagenter parallellt.

### Erfarenheter från första testet (juni 2026)

**Installation (Windows):**
- Kör alltid i **PowerShell** – inte i vanlig Kommandotolken (`irm` saknas där).
- Installationskommando: `irm https://x.ai/cli/install.ps1 | iex`
- Autentisering via OAuth med SuperGrok-konto i webbläsaren.

**Vad fungerar bra:**
- Sömlös integration med Git och befintliga repon.
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
├── README.md
├── AGENTS.md
├── .agents/skills/koldioxidlagring-villkor/ # Skill som Cursor och Grok hittar själva
├── .agents/skills/kodsatt-agentic-engineering/ # Kopia av Groks interna skill, avstämd 2026-10-05
├── .claude/skills/koldioxidlagring-villkor/ # Pekare för Claude Code till skillet ovan
├── .claude/skills/kodsatt-agentic-engineering/ # Pekare till kopian ovan
├── skills/lordags-dagens-dubbel/
├── dagens-dubbel/     # Familjens lördags-DD (live-app, ingen build)
├── intervju/Forsakringskassan_202609/
├── koldioxidlagring/  # Anteckningar från SGU-föredrag om CCS
└── vardkoer/
```

## Aktiva delprojekt

### dagens-dubbel — Familjens lördags-DD

| Egenskap | Värde |
|---|---|
| Typ | Statisk HTML-app (ingen build) |
| Tekniker | HTML5, Tailwind CSS (CDN), vanilla JS, JSON + data.js-fallback |
| Live URL | https://kentlundgren.github.io/Grok/dagens-dubbel/ |
| GitHub-källa | https://github.com/kentlundgren/Grok/tree/main/dagens-dubbel |
| Agentfiler | `dagens-dubbel/README.md`, `dagens-dubbel/CLAUDE.md`, `dagens-dubbel/.cursor/rules/` |

Tippare: Kent, Lotta, Benita, Bengt. Ny lördag = `data/ÅÅMMDD.json` + mapp `ÅÅMMDD/` + id i `data/weeks.json` + spegling i `data.js`. Öppna inte `index.html` som `file://` och förvänta fetch — använd live-URL, lokal server eller `data.js`.

### vardkoer – Vårdköer i Sverige 2022–2026

| Egenskap | Värde |
|---|---|
| Typ | Interaktiv HTML-presentation |
| Tekniker | HTML5, Tailwind CSS (CDN), Chart.js |
| Live URL | https://kentlundgren.github.io/Grok/vardkoer/ |
| GitHub-källa | https://github.com/kentlundgren/Grok/tree/main/vardkoer |
| Data | SKR, Socialstyrelsen, Riksrevisionen (t.o.m. april 2026) |

### koldioxidlagring – SGU-uppdraget om CCS

| Egenskap | Värde |
|---|---|
| Typ | Statisk HTML-anteckning |
| Tekniker | HTML5, Tailwind CSS (CDN) |
| Live URL | https://kentlundgren.github.io/Grok/koldioxidlagring/ |
| GitHub-källa | https://github.com/kentlundgren/Grok/tree/main/koldioxidlagring |
| Källor | SGU RR 2026:06 och närliggande myndighetsmaterial |
| Agentfiler | `koldioxidlagring/AGENTS.md`, `koldioxidlagring/CLAUDE.md`, skill `.agents/skills/koldioxidlagring-villkor/` |

Här skedde en uppdatering 2026-09-28: skillet `koldioxidlagring-villkor` och mappens egna agentfiler lades till.

## Kodkonventioner

- **HTML:** Semantisk HTML5, responsiv design (Tailwind)
- **JavaScript:** Kommenterad kod; ES2023-funktioner markeras explicit
- **Indatafält:** Gul bakgrund (`#fef08a` / Tailwind `bg-yellow-200`) för tydlig UX
- **Filer:** Separata HTML/CSS/JS-filer om möjligt
- **Kommentarer:** Förklarar *varför*, inte *vad*

## Git-flöde

```
main        # Huvudgren, direkt tillgänglig via GitHub Pages
```

### Commit och push – Kent har kontrollen

Kent vill **själv** committa och pusha till GitHub via Cursor, om han inte uttryckligen ber agenten göra det.

**Standard för agenter:**
- Gör filändringar lokalt, men **committa och pusha inte** på egen hand.
- Efter ändringar: informera vad som ändrats och att Kent kan committa och pusha i Cursor när han vill.

**Undantag:**
- Om Kent **uttryckligen** ber om att committa och pusha ska agenten göra det.

## Viktigt för agenter

1. Fråga alltid om befintlig fil ska uppdateras **eller** om en ny versionsfil (`filnamn_verX`) ska skapas.
2. Kommentera tydligt i koden när uppdateringar görs.
3. Använd PowerShell-syntax på Windows (inte `&&`).
4. Lägg alltid till `.gitignore` i nya projekt.
5. Använd relativa sökvägar.
6. **Committa och pusha inte** utan uttrycklig begäran.
7. **README-inledning:** live-länk högst upp: `https://kentlundgren.github.io/Grok/<mapp>/`
8. Läs `dagens-dubbel/README.md` och `dagens-dubbel/CLAUDE.md` innan större ändringar i den appen. Inför inte Vite/React där utan att fråga.
9. **Hörnknappar på alla HTML-sidor:** diskret `{ } GitHub` nere till vänster (länk till mappen på GitHub) och `</> teknik` nere till höger (modal med avsnitten Tekniken och Metoden). Lägg till båda utan att fråga. Detaljer i `.cursor/rules/horn-lankar-github-teknik.mdc`. Här skedde en uppdatering 2026-09-28: punkten lades till.
10. **Länkförhandsvisning (Open Graph):** startsidan i varje mapp ska ha `og:`- och `twitter:`-taggar med absoluta adresser och en egen bild `og-bild.jpg` på 1200 × 630 pixlar. Det kan byggas ut till undersidor om Kent ber om det. Detaljer i `.cursor/rules/lankforhandsvisning-og.mdc`. Här skedde en uppdatering 2026-09-28: punkten lades till.

## Referenser

- Kent Lundgren (2026) *Claude-kompassen*. [https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/](https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/)
- Kent Lundgren (2026) *Kom jag igång med Grok Build*. [https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/)
- xAI (2026) *Introducing Grok Build*. [https://x.ai/news/grok-build-cli](https://x.ai/news/grok-build-cli)
- xAI Docs (2026) *Getting Started | Grok Build*. [https://docs.x.ai/build/overview](https://docs.x.ai/build/overview)
