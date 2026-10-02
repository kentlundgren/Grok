# Byggkontrakt

Detta kontrakt gäller mappen `aktuellt/regeringsbildning` i `kentlundgren/Grok`.

## Poängen, som inte får tappas

Besökaren ska förstå att generativ AI här används för att strukturera fyra politiskt åtskilda utfall och sedan ompröva dem. Besökaren ska inte gå därifrån och tro att den högsta procentsiffran är ett mätresultat, eller att sidan alltid visar dagens läge.

Skriv den meningen, eller en kortare version av den, högt på sidan om du bygger om layouten.

## Vad som redan är scenen

Första vyn är fyrfältaren. Axlarna är röda linjer, från kompromiss till låsning, och regeringsunderlag, från tydlig koalition till lösare lösning. Ett klick på en ruta visar statsminister, vem som måste avstå, 175-regeln, eftergiften och tecknet att bevaka. Prompt, video och detta kontrakt ligger bakom scenen, inte framför den.

## Får ändras

- Text i rutorna, om `scenario.json` ändras och källan klarar ändringen.
- Visuell ordning, typografi och hur panelen öppnas.
- Ett nytt daterat fall bredvid morgonfallet.

## Får inte ändras utan ny källa

- Mandatfördelningen för valet den 13 september 2026.
- Regeln att 175 nej-röster krävs för att fälla ett förslag.
- Att procenten är en analytisk uppskattning.
- Att omprövningen valde ruta 4, trots att ruta 3 hade samma siffra i fyrfältaren.
- Tidsstämpeln för detta fall: morgonen den 2 oktober 2026, före klockan 11.

## Hur en annan modell fortsätter

1. Läs `scenario.json` och `metod.md`.
2. Ändra bara data om du samtidigt anger datum och källa.
3. Låt `app.js` läsa JSON. Hårdkoda inte ett nytt utfall i HTML.
4. Använd relativa sökvägar: `stil.css`, `app.js`, `scenario.json`, `video/…`, `bilder/…`.
5. Testa att de fyra rutorna går att välja med tangentbord.
6. Om sidan ska publiceras: länka live-sidan högst upp i `README.md`.

## Publicering

Statisk sida, ingen build. GitHub Pages från `main` ger `https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/` om Pages är påslaget för repot. Samma mapp kan vara Root Directory på Vercel. Byt inte till ett ramverk om inte uppgiften uttryckligen kräver det.
