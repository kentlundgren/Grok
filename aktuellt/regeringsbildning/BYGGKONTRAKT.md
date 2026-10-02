# Byggkontrakt

Detta kontrakt gäller mappen `aktuellt/regeringsbildning` i `kentlundgren/Grok`.

## Poängen, som inte får tappas

Besökaren ska förstå att generativ AI här används för att strukturera fyra politiskt åtskilda utfall och sedan ompröva dem. Besökaren ska inte gå därifrån och tro att den högsta procentsiffran är ett mätresultat, eller att sidan alltid visar dagens läge.

Skriv den meningen, eller en kortare version av den, högt på sidan om du bygger om layouten.

Sidan ska också tydligt säga att analysen är gjord med AI (vilken modell, vilken tidpunkt) och att siffrorna inte är kvalitetssäkrade. Det är ett medvetet undantag från regeln att inte AI-märka texter: här är AI själva ämnet.

## Vad som redan är scenen

Första vyn är en tidsväljare och fyrfältaren. Axlarna är röda linjer, från kompromiss till låsning, och regeringsunderlag, från tydlig koalition till lösare lösning. Ett klick på en ruta visar statsminister, vem som måste avstå, 175-regeln, eftergiften, hindret, tecknet att bevaka och rutans procent över tid. Prompt, video och detta kontrakt ligger bakom scenen, inte framför den.

Fyrfältaren är alltid utgångsläget och ska vara stilla. Ovanför den finns ett val, "Se de fyra alternativen i tur och ordning" (4 sekunder per alternativ, en gång), som ritas av samma data och därför följer varje körning. Det ska alltid gå att stoppa och gå tillbaka (knapp, Escape, bakåtknappen). Ändra inte utgångsläget till att röra sig av sig själv.

Den senaste körningen är förvald. En tidigare körning markeras som tidigare. Procenten visas alltid med modell och tidpunkt.

## Datamodell: en enda källa

All data ligger i `scenario.js` (`window.SCENARIO`). Det finns ingen kopia i `index.html`. Filen är JavaScript och inte JSON så att sidan fungerar även som `file://`.

- `meta`, `mandates`, `axes`: gäller alla körningar.
- `scenarios`: det som inte ändras mellan körningar (titel, mandatmatematik, vem som måste avstå, eftergift, porträtt).
- `snapshots`: en post per körning med `asOf`, `asOfLabel`, `asOfShort`, `context`, `model`, procent, hinder och tecken att bevaka per ruta, `review` och `process`.

### Lägga till en ny körning

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
- Nya körningar enligt ovan.

## Får inte ändras utan ny källa

- Mandatfördelningen för valet den 13 september 2026.
- Regeln att 175 nej-röster krävs för att fälla ett förslag.
- Att procenten är en analytisk uppskattning.
- En tidigare körnings procent, tidsstämpel, modell eller omprövning.
- Att omprövningen i körningen 2 oktober 08:19 valde ruta 4, trots att ruta 3 hade samma siffra i fyrfältaren.

## Hur en annan modell fortsätter

1. Läs `scenario.js` och `metod.md`.
2. Ändra bara data om du samtidigt anger datum och källa.
3. Låt `app.js` läsa `scenario.js`. Hårdkoda inte ett utfall i HTML.
4. Använd relativa sökvägar: `stil.css`, `app.js`, `scenario.js`, `video/…`, `bilder/…`.
5. Testa att de fyra rutorna och tidpunkterna går att välja med tangentbord.
6. Behåll GitHub-hörnan (nere till vänster) och teknik-modalen (nere till höger).
7. Om sidan ska publiceras: länka live-sidan högst upp i `README.md`.

## Publicering

Statisk sida, ingen build. GitHub Pages från `main` ger `https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/` om Pages är påslaget för repot. Samma mapp kan vara Root Directory på Vercel. Byt inte till ett ramverk om inte uppgiften uttryckligen kräver det.

## Ändringslogg

- 2026-10-02: Länkförhandsvisning (`og:`-taggar, `og-bild.jpg`, delningssida per körning) och `video/gor_rotation.py`. Rutornas etiketter har nu riktiga å och ä (`quadrantLabel`).
- 2026-10-02: En datakälla (`scenario.js`) i stället för `scenario.json` plus en kopia i HTML. Tidsväljare och körningar med tidsstämpel. AI-upplysning. GitHub-hörna och teknik-modal. Sakfel i ruta 2 rättat: det räcker att två ledamöter avstår, inte 24.
