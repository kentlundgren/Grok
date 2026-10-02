# Byggkontrakt

Detta kontrakt gäller mappen `aktuellt/regeringsbildning` i `kentlundgren/Grok`.

## Poängen, som inte får tappas

Besökaren ska förstå att generativ AI här används för att strukturera fyra politiskt åtskilda utfall och sedan ompröva dem. Besökaren ska inte gå därifrån och tro att den högsta procentsiffran är ett mätresultat, eller att sidan alltid visar dagens läge.

Skriv den meningen, eller en kortare version av den, högt på sidan om du bygger om layouten.

Sidan ska också tydligt säga att analysen är gjord med AI (vilken modell, vilken tidpunkt) och att siffrorna inte är kvalitetssäkrade. Det är ett medvetet undantag från regeln att inte AI-märka texter: här är AI själva ämnet.

## Vad som redan är scenen

Första vyn är en tidsväljare och fyrfältaren. Axlarna är röda linjer, från kompromiss till låsning, och regeringsunderlag, från tydlig koalition till lösare lösning. Ett klick på en ruta visar statsminister, vem som måste avstå, 175-regeln, eftergiften, hindret, tecknet att bevaka och rutans procent över tid. Prompt, video och detta kontrakt ligger bakom scenen, inte framför den.

Fyrfältaren är utgångsläget. Den svarta ramen (den valda rutan) flyttas av sig själv var 4:e sekund, i ordningen ruta 1, 2, 3, 4 och sedan om från början (beslut av Kent 2026-10-02, efter att utgångsläget först var stilla). Växlingen ska alltid vara lätt att stoppa: den pausar medan musen eller tangentbordsfokus är på rutorna eller detaljerna, stannar vid klick eller tryck, har en egen paus-knapp, och startar inte alls om besökaren har valt "minska rörelse" i systemet. Ta inte bort de spärrarna.

Ovanför fyrfältaren finns också ett val, "Se de fyra alternativen i tur och ordning" (4 sekunder per alternativ, en gång), som tonar ned de andra rutorna. Båda ritas av samma data och följer därför varje körning. Det ska alltid gå att stoppa och gå tillbaka (knapp, Escape, bakåtknappen).

Den senaste körningen är förvald. En tidigare körning markeras som tidigare. Procenten visas alltid med modell och tidpunkt. En processnotis är inte en körning: den ligger ovanför fyrfältaren och ändrar inte vilken tidpunkt som är vald.

## Två sorters uppdateringar

Välj en. Blanda inte ihop dem.

| | Processnotis | Ny körning |
| --- | --- | --- |
| När | Ett verifierat besked som inte flyttar en röd linje och inte räcker för nya procent. Exempel: talmannen sätter en tid, ger eller tar tillbaka ett uppdrag, utan ett namngivet underlag. | En modell har gjort en ny prövning och sätter nya procent i sitt eget namn. Eller ett parti har flyttat en linje så att de fyra utfallen måste vägas om. |
| Var | Ny post sist i `notices` i `scenario.js`. | Ny post sist i `snapshots` i `scenario.js`. |
| Procent | Inga. Skriv inte 0 och kopiera inte den förra körningens siffror. | Nya. De fyra ska summera till 100. Märkta med modellens namn. |
| Vad som inte ska göras | Ingen delningssida, ingen ny `og`-bild, ingen ny rotationsvideo. | Skriv inte över en tidigare post. Lägg inte procent under en annan modells namn. |

Om du är osäker: gör en processnotis. Skriv i den vad som skulle krävas för en ny körning. Det är billigare att lägga till en körning senare än att låtsas att ett kalenderbesked är en ny sannolikhet.

## Datamodell: en enda källa

All data ligger i `scenario.js` (`window.SCENARIO`). Det finns ingen kopia i `index.html`. Filen är JavaScript och inte JSON så att sidan fungerar även som `file://`.

- `meta`, `mandates`, `axes`: gäller alla körningar.
- `scenarios`: det som inte ändras mellan körningar (titel, mandatmatematik, vem som måste avstå, eftergift, porträtt).
- `snapshots`: en post per körning med `asOf`, `asOfLabel`, `asOfShort`, `context`, `model`, procent, hinder och tecken att bevaka per ruta, `review` och `process`.
- `notices`: verifierade besked som inte flyttar procent. Ingen `model`, inga procent.

### Lägga till en processnotis

1. Läs den senaste notisen och den senaste körningens `review.wouldChange`. Skriv om beskedet uppfyller någon av de punkterna eller inte.
2. Lägg en post sist i `notices` med `id`, `asOf`, `asOfLabel`, `kind: "process"`, `movesProbabilities: false`, `title`, `text`, `notTheTrigger`, `nextRunWhen`, `source` och `sourceLabel`.
3. Källan ska vara en primärkälla, i första hand riksdagen.se, med datum.
4. Ändra inte `snapshots`, procent eller `model` på en tidigare körning.

### Lägga till en ny körning

Gör inte detta för ett rent processbesked. Använd då processnotis ovan.

1. Kopiera den senaste posten i `snapshots` och lägg kopian sist.
2. Ge den nytt `id`, `asOf`, `asOfLabel`, `asOfShort`, `context` och `model`.
3. Fyll i nya procent. De fyra ska summera till 100.
4. Uppdatera `obstacles`, `watch`, `review` och `process` efter källorna, med datum.
5. Ändra inte tidigare poster. Sidan sorterar på `asOf` och räknar själv ut skillnaden mot körningen före.
6. Gör en delningssida för körningen: kopiera `k/2026-10-02-0819/` till `k/<id>/`, byt id, tid, texter och bild i taggarna och i vidarebefordran. Förhandsvisningar ser inte `#`-ankaret, så den adressen är den som delas på LinkedIn och X.
7. Gör en stillbild för delning, 1200 × 630, till `bilder/og_<id>.jpg`, och byt `og-bild.jpg` och `og:`-taggarna i `index.html` om den nya körningen ska vara den som basadressen visar.
8. Gör om rotationsvideon (den ligger inte på sidan, den är en fil att ladda upp i inlägg på LinkedIn och X, där en stillbild annars är det enda som visas): kör `python video/gor_rotation.py` från mappen `aktuellt/regeringsbildning`. Den läser `scenario.js` och ger `video/rotation_fyra_utfall_<ååmmdd>_kl<tt>.mp4`. Videon är en fil och uppdateras inte av sig själv. Kräver Python med Pillow, Node.js och ffmpeg.
9. Procenten ska vara tagen fram av den modell som anges i `model`. Skriv aldrig in siffror som någon annan modell eller människa har tagit fram under en annan modells namn.

## Får ändras

- Text i rutorna, om `scenario.js` ändras och källan klarar ändringen.
- Visuell ordning, typografi och hur panelen öppnas.
- Nya körningar och processnotiser enligt ovan.

## Får inte ändras utan ny källa

- Mandatfördelningen för valet den 13 september 2026.
- Regeln att 175 nej-röster krävs för att fälla ett förslag.
- Att procenten är en analytisk uppskattning.
- En tidigare körnings procent, tidsstämpel, modell eller omprövning.
- Att omprövningen i körningen 2 oktober 08:19 valde ruta 4, trots att ruta 3 hade samma siffra i fyrfältaren.

## Hur en annan modell fortsätter

0. Läs avsnittet "Flera AI-agenter över tid" i `AGENTS.md` i repots rot och de översta posterna i `AGENTLOGG.md`. Lägg en ny post där när du är klar.
1. Läs `scenario.js`, `notices` och `metod.md`. Bestäm först om beskedet är en processnotis eller en ny körning.
2. Ändra bara data om du samtidigt anger datum och källa.
3. Låt `app.js` läsa `scenario.js`. Hårdkoda inte ett utfall i HTML.
4. Använd relativa sökvägar: `stil.css`, `app.js`, `scenario.js`, `video/…`, `bilder/…`.
5. Testa att de fyra rutorna och tidpunkterna går att välja med tangentbord.
6. Behåll GitHub-hörnan (nere till vänster) och teknik-modalen (nere till höger).
7. Om sidan ska publiceras: länka live-sidan högst upp i `README.md`.

## Publicering

Statisk sida, ingen build. GitHub Pages från `main` ger `https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/` om Pages är påslaget för repot. Samma mapp kan vara Root Directory på Vercel. Byt inte till ett ramverk om inte uppgiften uttryckligen kräver det.

## Ändringslogg

- 2026-10-02, eftermiddag: Processnotis skild från ny körning. `notices` i `scenario.js`. Första notisen: sonderingen återupptas måndag 5 oktober. Inga nya procent.

- 2026-10-02: Länkförhandsvisning (`og:`-taggar, `og-bild.jpg`, delningssida per körning) och `video/gor_rotation.py`. Rutornas etiketter har nu riktiga å och ä (`quadrantLabel`).
- 2026-10-02: En datakälla (`scenario.js`) i stället för `scenario.json` plus en kopia i HTML. Tidsväljare och körningar med tidsstämpel. AI-upplysning. GitHub-hörna och teknik-modal. Sakfel i ruta 2 rättat: det räcker att två ledamöter avstår, inte 24.
