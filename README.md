# Grok – Testprojekt för Grok Build

Det här repot används för att **testa och utforska Grok Build** – xAI:s terminalbaserade kodningsagent som körs direkt i CLI:t och kan planera uppgifter, granska ändringar och köra subagenter parallellt.

## Bakgrund och erfarenheter

Projektet är en del av min utforskning av agentiska verktyg på fritiden, tillsammans med Cloud Cowork, Cursor och GitHub. Jag dokumenterar vad fungerar, vad strular och hur verktygen kan komplettera varandra snarare än ersätta varandra.

**Blogginlägg med praktiska erfarenheter:** [Kom jag igång med Grok Build](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/) (13 juni 2026)

### Vad jag lärde mig

- **Installation på Windows:** Kör installationskommandot i **PowerShell**, inte i vanlig Kommandotolken (`irm` finns inte där).
  ```powershell
  irm https://x.ai/cli/install.ps1 | iex
  ```
- **Beta-känsla:** Små hinder är förväntade – autentisering via webbläsare (OAuth med SuperGrok) och första körningen tog några minuter.
- **Arbetssätt:** Grok Build känns mer terminal-native än en IDE, men Plan Mode och diff-granskning ger bra mänsklig kontroll – likt Cursor, fast i CLI:t.
- **Kombination:** Grok Build för planering och implementation, Cursor för slutlig polering, GitHub för versionshantering och publicering.

### För- och nackdelar (min bedömning)

| Fördelar | Nackdelar |
|---|---|
| Sömlig Git-integration med befintliga repon | Beta – små installationshinder på Windows |
| Plan Mode + review ger kontroll | Kräver SuperGrok/Premium+ |
| Headless-läge för repetitiva uppgifter | Lärkurva om du inte redan är bekväm i terminalen |
| Kompletterar Cloud Cowork och Cursor | |

## Syfte

Tanken är att undersöka hur Grok Build kan användas för att:
- Generera faktabaserade, interaktiva HTML-presentationer
- Analysera komplexa datamängner och presentera dem visuellt
- Jämföra AI-verktyg (Grok, Cursor, ChatGPT m.fl.) i praktiska projekt

## Projekt i detta repo

### 📊 Vårdköer i Sverige 2022–2026

En interaktiv, faktabaserad analys av hur vårdköerna (väntetider enligt vårdgarantin) i Sverige har utvecklats.

- **Källkod:** [vardkoer/](vardkoer/)
- **Live presentation (GitHub Pages):** [https://kentlundgren.github.io/Grok/vardkoer/](https://kentlundgren.github.io/Grok/vardkoer/)

Projektet är byggt som ett konkret exempel på hur en analytisk prompt kan omvandlas till en levande, delbar webbpresentation.

## Tekniker

- HTML5 + Tailwind CSS (via CDN)
- Chart.js för interaktiva diagram
- GitHub Pages för publicering

## Om Grok Build

[Grok Build](https://x.ai/cli) är xAI:s terminalbaserade kodningsagent. Det här repot dokumenterar erfarenheter och resultat från testning av verktyget.

**Referenser:**
- [Introducing Grok Build](https://x.ai/news/grok-build-cli) (xAI, 2026)
- [Getting Started | Grok Build](https://docs.x.ai/build/overview) (xAI Docs, 2026)

---

*Senast uppdaterat: juni 2026*
