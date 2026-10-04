# Grok – Testprojekt för Grok Build

Det här repot används för att **testa och utforska Grok Build** – xAI:s terminalbaserade kodningsagent som kan planera uppgifter, granska ändringar och köra subagenter.

## 🗂️ Lokalt repo

Repo-rot lokalt:

`C:\Users\kentl\OneDrive\AI\Grok`

På GitHub:

`https://github.com/kentlundgren/Grok`

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

### ML + LLM (compound AI för controlling)

Skill och aktörskatalog för att kombinera ML-artefakter med generativ AI — tal från modell/kalkyl, text från LLM.

- **Mapp:** [ML_LLM/](ML_LLM/)
- **Skill:** [ML_LLM/SKILL.md](ML_LLM/SKILL.md)
- **Aktörer och länkar:** [ML_LLM/references/aktorer-processer.md](ML_LLM/references/aktorer-processer.md)
- Globalt Grok-skill-namn: `ml-llm-kombination`

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

### Koldioxidlagring i Sverige

Anteckningar från SGU-föredraget om regeringsuppdraget 2023–2025 och slutrapporten RR 2026:06.

- **Källkod:** [koldioxidlagring/](koldioxidlagring/)
- **Live:** [https://kentlundgren.github.io/Grok/koldioxidlagring/](https://kentlundgren.github.io/Grok/koldioxidlagring/)

### Regeringsbildning 2026: fyra utfall

En fyrfältare som visar fyra åtskilda sätt som den svenska regeringsbildningen efter valet 2026 kan falla ut, framtagen med generativ AI (Grok) och därefter omprövad. Poängen är att få fyra möjligheter att hålla i huvudet och diskutera samtidigt, inte att visa exakt matematik. Mandaten är fakta. Procenten är uppskattningar, inte kvalitetssäkrade, och ska kontrolleras mot källorna.

Sidan har en tidsväljare, så att körningar vid olika tidpunkter kan jämföras (hittills en körning, 2 oktober 2026 kl 08:19), och ett turläge som markerar de fyra alternativen ett i taget, 4 sekunder var. Den stilla fyrfältaren är alltid utgångsläget.

- **Källkod:** [aktuellt/regeringsbildning/](aktuellt/regeringsbildning/)
- **Live:** [https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/](https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/)
- **Delningslänk för körningen kl 08:19:** [https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/k/2026-10-02-0819/](https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/k/2026-10-02-0819/) (har egen förhandsbild för LinkedIn och X)
- **Hur man bygger vidare:** [aktuellt/regeringsbildning/BYGGKONTRAKT.md](aktuellt/regeringsbildning/BYGGKONTRAKT.md)

### Scampi 30 – Yanmar YSB12G

Underhåll från bloggen Tankar i tiden från Lund, plus val av propylenglykol till motor och vattenpump.

- **Källkod:** [Scampi/](Scampi/)
- **Live:** [https://kentlundgren.github.io/Grok/Scampi/](https://kentlundgren.github.io/Grok/Scampi/)
- **Skill:** [Scampi/SKILL.md](Scampi/SKILL.md)

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

*Senast uppdaterat: 4 oktober 2026*
