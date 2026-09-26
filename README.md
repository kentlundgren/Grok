# Grok – Testprojekt för Grok Build

Det här repot används för att **testa och utforska Grok Build** – xAI:s terminalbaserade kodningsagent som kan planera uppgifter, granska ändringar och köra subagenter.

## Bakgrund och erfarenheter

Projektet är en del av min utforskning av agentiska verktyg på fritiden, tillsammans med Cloud Cowork, Cursor och GitHub. Jag dokumenterar vad som fungerar, vad som strular och hur verktygen kompletterar varandra.

**Blogginlägg med praktiska erfarenheter:** [Kom jag igång med Grok Build](https://klel.wordpress.com/2026/06/13/kom-jag-igang-med-grok-build/) (13 juni 2026)

## Syfte

Tanken är att undersöka hur Grok Build kan användas för att:

- Generera faktabaserade, interaktiva HTML-presentationer
- Analysera komplexa datamängder och presentera dem visuellt
- Jämföra AI-verktyg (Grok, Cursor, ChatGPT med flera) i praktiska projekt

## Projekt i detta repo

Det finns ett [GitHub-projekt knutet till detta repo](https://github.com/users/kentlundgren/projects/4), där arbetet och uppgifterna i projektet kan följas.

### 📊 Vårdköer i Sverige 2022–2026

En interaktiv, faktabaserad analys av hur vårdköerna (väntetider enligt vårdgarantin) i Sverige har utvecklats.

- **Källkod:** [vardkoer/](vardkoer/)
- **Live presentation (GitHub Pages):** [https://kentlundgren.github.io/Grok/vardkoer/](https://kentlundgren.github.io/Grok/vardkoer/)

Projektet är byggt som ett konkret exempel på hur en analytisk prompt kan omvandlas till en levande, delbar webbpresentation.

### Familjens lördags-DD

Tips, kuponger och resultat för Dagens Dubbel på lördagar (Kent, Lotta, Benita). Statisk app utan build.

- **Källkod:** [dagens-dubbel/](dagens-dubbel/)
- **Live:** [https://kentlundgren.github.io/Grok/dagens-dubbel/](https://kentlundgren.github.io/Grok/dagens-dubbel/)
- Relaterat skill i repot: [skills/lordags-dagens-dubbel/](skills/lordags-dagens-dubbel/)

### Intervjuförberedelse, Försäkringskassan

Förberedelsematerial inför en intervju till controller på Försäkringskassan.

- **Live:** [https://kentlundgren.github.io/Grok/intervju/Forsakringskassan_202609/](https://kentlundgren.github.io/Grok/intervju/Forsakringskassan_202609/)

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

*Senast uppdaterat: 26 september 2026*
