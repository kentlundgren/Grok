# Förändringen vid årsskiftet 2026/2027 – diagram

- **Live:** [https://kentlundgren.github.io/Grok/aktuellt/Serviceforvaltningen/forandring/](https://kentlundgren.github.io/Grok/aktuellt/Serviceforvaltningen/forandring/)

Diagram över hur Lunds servicenämnd och serviceförvaltning upphör den 31 december 2026 och vad som tar vid den 1 januari 2027. Varje ruta och linje har en säkerhetsgrad (belagt, indikerat, ospecificerat) och en källa. Uppgifterna är hämtade ur källorna på sidan och är inte kvalitetssäkrade. Kontrollera mot källan innan något återges.

## Filer

| Fil | Innehåll |
|---|---|
| `index.html` | Sidans struktur, hörnknappar och teknik-modal |
| `stil.css` | Utseende |
| `app.js` | Ritar rutor, linjer, tidslinje, frågor och källor från `data.js` |
| `data.js` | Allt innehåll: rutor, kopplingar, tidslinje, öppna frågor, källor |

Ingen build och inga bibliotek. Öppna via en lokal server eller live-adressen.

## Så ändrar du innehållet

Allt står i `data.js`. En ny källa läggs till i `KALLOR`, en ny koppling till en avdelning ändras i fältet `mal` och `status`. Om kommunen publicerar vilken verksamhet som går till vilken av de fem förvaltningarna: lägg till en ruta för mottagaren i `HOGER` och peka avdelningens `mal` dit, och ändra `status` från `ospecificerat` till `belagt`.
