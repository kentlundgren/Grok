---
name: generativ-ai-privat-och-professionellt
description: Hur generativ AI kan och bör hanteras privat och professionellt, och när de två rollerna flyter ihop, till exempel när man testar, leker och lär med generativ AI på fritiden eller pro bono. Används när frågan gäller vad som får matas in i en AI-modell, vilken yta (konsumentchatt, API, avtal) som passar, vem som äger resultatet, hur man visar att AI varit med, eller gränsen mellan fritidsexperiment och uppdrag. Pekar vidare till controllerrollen-generativ-ai och ai-minne-formagor-organisation i stället för att upprepa dem.
metadata:
  type: workflow
  version: "0.1"
  origin: Skriven av Claude Code (Sonnet 5.5) 2026-10-05 på Kents begäran. Inte en kopia av en Grok-skill. Ägaren avgör om originalet ska ligga här eller i Groks skill-lager.
  last_updated: 2026-10-05 (Stockholm)
---

# Generativ AI privat och professionellt

Detta är en tunn skill. Den bär det som saknades: hur de två rollerna hänger ihop. Detaljerna ligger i två andra skills, som den pekar på och inte upprepar (AGENTS.md: samma regel ska inte stå på flera ställen).

Märk varje påstående *(egen praktik)* eller *(källa)*. Hitta inte på siffror. Kan en länk inte öppnas, säg det.

## Två roller, ett huvud

*(egen praktik)* Samma person är ofta två saker:

- **Privat / pro bono:** fritiden är den primära arenan för att testa, leka och lära med generativ AI. Här får man prova fel.
- **Professionell:** uppdrag, arbetsgivare, kollegor och uppdragsgivare. Här finns mandat, sekretess, personuppgifter och ansvar.

Rollerna flyter ihop: det man lär på fritiden används på jobbet, och jobbets frågor väcker fritidsexperiment. Det är bra. Det som inte får flyta ihop är **uppgifterna**.

## Regeln som låter rollerna flyta ihop

*(egen praktik, se erfarenheter.md, omdöme 6 i controllerrollen-generativ-ai)* Kunskap, metod och verktyg får gå mellan rollerna. Uppdragets data, arbetsgivarens siffror och andras personuppgifter får inte användas som lekmaterial. Leken görs på egen, påhittad eller publik data. Lärdomen tas med, materialet stannar.

Pro bono är en egen gråzon. Ideell förening, naturskydd eller studentnation är inte "privat" i dataskyddets mening: medlemmars namn, protokoll och ekonomi är någon annans uppgifter, även om arbetet är gratis. Behandla dem som professionella uppgifter.

## Tre frågor före varje inmatning

Samma tre prov som i `controllerrollen-generativ-ai` (avsnittet Känsliga data), i generell form. Ordningen räknas.

1. **Vems uppgift är det?** Mina egna, publika, påhittade: fritt fram. Någon annans, särskilt personuppgifter (namn, personnummer, enskilda rader): behövs de verkligen? Minimera, använd aggregat.
2. **Vilken yta?** Konsumentchatt och API/företagsavtal är olika produkter. *(källa)* Anthropics konsumentvillkor tillåter träning på inmatning om man inte valt bort det, och bortvalet gäller inte samtal som flaggats för säkerhetsgranskning eller rapporterats (Anthropic, 2026). Villkor ändras: läs om dem innan du förlitar dig på dem.
3. **Vem äger klassningen?** Intern är inte samma sak som hemlig, men ändå inte automatiskt lämplig i en fri chatt. Saknas organisationens klassning: aggregat, avrundade tal och ett verktyg arbetsgivaren godkänt. Uppfinn den inte själv.

Offentlig sektors regler (offentlighets- och sekretesslagen, dataskydd) och källorna till dem finns i `controllerrollen-generativ-ai/references/kallkanon.md`, nivå 3. Läs dem där.

## Avsändarskap och spårbarhet

*(egen praktik)* AI får vara skriv- och kodpartner. Ansvaret ligger kvar hos människan. Underlag får automatiseras, men prognoskommentar, avvikelse och samråd lämnas inte som färdiga. Visa processen öppet: blir lösningen mer trovärdig, eller mindre min, om jag visar hur den kom till? Märk upp vilken modell och vilket verktyg som gjort vad (AGENTS.md, "Om du tar över mitt i arbetet").

## Så använder du skillen

- **Fritidsfråga** (kod, experiment, lärande): kontrollera bara fråga 1. Är all data egen eller publik går leken före.
- **Uppdragsnära fråga:** gör alla tre. Är svaret oklart, fråga ägaren innan något matas in.
- **Blandad fråga:** säg vilken roll varje del hör till, och dela upp. Experimentet på publik data, resultatet först efter granskning i uppdraget.
- **Controllerarbete:** gå vidare till `controllerrollen-generativ-ai`.
- **Frågan är vem som äger original, kopior och pekare:** gå vidare till `ai-minne-formagor-organisation`.

## Cross-references

- `controllerrollen-generativ-ai`: yrkesdjupet, källkanon, analysgång, känsliga data i ekonomistyrningen.
- `ai-minne-formagor-organisation`: normalform, person/grupp/organisation.
- `kodsatt-agentic-engineering`: när experimentet blir kod som ska leva, delas eller röra data.
- `kent-referens`: källformat (finns utanför repot).

## Referenser

Anthropic (2026) *Privacy Policy*, gällande från 10 september 2026. Tillgänglig på: [https://www.anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy) (Hämtad: 2026-10-05). *(Konsumentvillkor: träning på inmatning om man inte valt bort det, med undantag för säkerhetsgranskade och rapporterade samtal. Kontrollerad denna dag.)*

Övriga källor (Digg, IMY, SpaceXAI, OpenAI) finns i `controllerrollen-generativ-ai/references/kallkanon.md`. De omkontrollerades inte 2026-10-05: nätverket i sessionen blockerade dessa domäner. Läs om sidorna innan en regel citeras.
