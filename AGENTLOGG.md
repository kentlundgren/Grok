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
