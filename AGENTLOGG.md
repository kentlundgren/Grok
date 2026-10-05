# AGENTLOGG – överlämning mellan AI-agenter och ägaren

Nyaste posten överst. Läs de tre översta innan du ändrar något. Lägg en ny post överst i slutet av ett arbetspass. Skriv bara det som är sant: vad som ändrades, vad som är verifierat och hur, och vad som återstår. Skriv aldrig under en annan modells namn. Inga lösenord, nycklar eller personuppgifter. Ägaren committar. Regeln finns i `AGENTS.md`, avsnittet "Flera AI-agenter över tid".

Mall:

```
## ÅÅÅÅ-MM-DD tt:mm · Verktyg (modell) · kort rubrik
- Gjort:
- Verifierat (och hur):
- Inte verifierat:
- Återstår / nästa steg:
- Obs (något en annan agent bör veta):
```

---

## 2026-10-05 · Claude Code (Sonnet 5.5) · ny skill om generativ AI privat och professionellt

- **Gjort:** Ny skill `generativ-ai-privat-och-professionellt` i `.agents/skills/` (original, skriven av Claude Code, inte en Grok-kopia) med pekare i `.claude/skills/`. Saknad pekare lades till för `controllerrollen-generativ-ai`. `forslag-till-original.md` listar ändringar att göra i Groks original. Kopiorna av ai-minne- och controller-skillen är oförändrade.
- **Verifierat (och hur):** Anthropics integritetspolicy (gällande 2026-09-10) öppnades och lästes 2026-10-05. Filerna skrevs och syns i `git status`.
- **Inte verifierat:** Att Claude Code laddar de nya skillsen i en ny session. Digg, IMY, SpaceXAI, OpenAI och Claude-kompassen kunde inte omkontrolleras (domänerna blockerades i sessionen). Skillen är version 0.1 och ej granskad av ägaren.
- **Återstår:** Ägaren granskar texten. Förslagen i `forslag-till-original.md` förs över till Groks original. `AGENTS.md` mappstruktur uppdaterades med de nya mapparna.
- **Obs:** Ägaren bad uttryckligen om commit och push till grenen `claude/focused-pascal-yb1gps`.

---

## 2026-10-05 10:50 · Grok (xAI) · kopia av kodsätt-skillen

- **Gjort:** Lade en kopia av Groks interna skill `kodsatt-agentic-engineering` i `.agents/skills/kodsatt-agentic-engineering/` (SKILL.md och references). `.claude/skills/kodsatt-agentic-engineering/SKILL.md` är en pekare, inte en andra regeltext. `AGENTS.md` pekar dit och upprepar inte regeln.
- **Verifierat (och hur):** Filerna skapades via GitHubs API på `main`. Sökvägarna kom tillbaka i svaren. Inget lokalt test och ingen sidvisning.
- **Inte verifierat:** Att Cursor och Claude Code faktiskt läser skillen i en session.
- **Återstår:** Originalet ligger i Groks skill-lager. Om det ändras ska kopian uppdateras med nytt avstämningsdatum.
- **Obs:** Ägaren bad uttryckligen att kopiorna skulle läggas i repot. Därför committades filerna här, trots den vanliga regeln att ägaren committar.

## 2026-10-02 · Claude Code (Sonnet 5.5) · `aktuellt/regeringsbildning`

- **Gjort:** `scenario.js` blev enda datakälla (ersatte `scenario.json` och en kopia i HTML). Tidsväljare och körningar med tidsstämpel. AI-upplysning på sidan. Sakfel i ruta 2 rättat (det räcker att 2 ledamöter avstår, inte 24). GitHub-hörna och teknik-modal. Länkförhandsvisning (`og:`-taggar, `og-bild.jpg`, delningssida `k/2026-10-02-0819/`). `video/gor_rotation.py` och en rotationsvideo att ladda upp i inlägg. Turläge ("Se de fyra alternativen i tur och ordning") och en svart ram som flyttas av sig själv var 4:e sekund, med spärrar (paus vid hover och fokus, stopp vid klick, paus-knapp, av vid "minska rörelse"). Rot-`README.md` uppdaterad, och avsnittet "Flera AI-agenter över tid" lades till i `AGENTS.md`.
- **Verifierat (och hur):** Sidan, tidsväljaren, turläget, den automatiska växlingen (4,0 s mellan stegen i ordningen 1, 2, 3, 4 och sedan 1) och delningssidans vidarebefordran testades i webbläsaren via en lokal testserver. Rotationsvideon kontrollerades genom stillbilder ur den färdiga filen.
- **Inte verifierat:** Hur förhandsvisningen ser ut på LinkedIn och X (visades först efter push av ägaren, och X-inlägget med länkkort syntes bara på ägarens skärmbild). "Minska rörelse" provades inte. Mobilvisning provades inte utöver ett smalt fönster.
- **Återstår:** Claude-kompassen (`AI-teknik`-repot) bör uppdateras om ChatGPT, Gemini och Grok, och om att `AGENTS.md` lästes som projektinstruktion i en Claude Code-session här, vilket kompassen säger att Claude Code inte gör. Ägaren avgör.
- **Obs:** En processnotis (`notices` i `scenario.js`, om talmannens besked) lades till av någon annan än Claude Code under dagen. Jag vet inte av vem. Lägg inte till nya procent i en notis; se `metod.md`.

## 2026-10-02 08:19 · Grok (xAI) · fyrfältaren, första körningen

- **Gjort:** Körde `aktuellt/regeringsbildning/prompt2.md` och tog fram fyrfältaren med procent 28 / 12 / 30 / 30 och en omprövning som valde ruta 4. Underlaget finns i `scenario.js` (`snapshots[0]`, `model: "Grok (xAI)"`).
- **Verifierat:** Inte av mig. Posten är återskapad ur `scenario.js` och `prompt2.md` av Claude Code, som inte själv körde analysen.
- **Återstår:** Ny körning efter nya besked. Procenten ska då tas fram av den modell som anges i `model`.
