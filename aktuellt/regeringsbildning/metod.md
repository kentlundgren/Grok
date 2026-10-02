# Metod och källregel

Sidan visar hur en generativ modell kan användas för att ta fram fyra åtskilda regeringsutfall, och sedan ompröva dem. Den visar inte att en procent är ett mätvärde.

## Ordningen

1. `prompt1.md` är beställningen: ta fram en prompt som tvingar fram en fyrfältare och därefter en ny prövning.
2. `prompt2.md` är den skärpta prompten. Den krävde dagsaktuella källor, negativ parlamentarism och fyra utfall som inte får vara varianter av samma lösning.
3. Videon visar körningen. Bilden är fyrfältaren som sparades från den körningen.
4. `scenario.json` är den strukturerade versionen av samma körning, morgonen den 2 oktober 2026, före talmannens pressträff klockan 11.

## Vad som får stå som faktum

- Mandat och valresultat ska peka på Valmyndigheten.
- Talmannens steg ska peka på riksdagen.se.
- Partipåståenden ska ha datum och källa.
- Egna slutsatser, inklusive procent, ska märkas som bedömning.

## Vad som inte får stå som faktum

- Citat, mandat, förhandlingskontakter eller sannolikheter som inte finns i källan.
- En uppdatering som skriver över morgonens fall utan att lägga ett nytt datum i `meta.asOf`.

## Primärkällor för detta fall

- Valmyndigheten, resultat fastställt 19 september 2026: https://val.se/servicelankar/servicelankar/pressrum/nyheter--pressmeddelanden/pressmeddelande-nya/2026-09-19-valresultat-faststallt-i-2026-ars-riksdagsval
- Riksdagen, sonderingsuppdrag 18 september 2026: https://www.riksdagen.se/sv/aktuellt/aktuelltnotiser/2026/sep/18/talmannen-ger-sonderingsuppdrag-till-magdalena_cmse396c91a-ef46-4f54-88c6-10a144af63fcsv/
- Riksdagen, inget nytt uppdrag 30 september 2026: https://www.riksdagen.se/sv/aktuellt/aktuelltnotiser/2026/sep/30/talmannen-om-regeringsbildningen_cms2bfd2cfc-e605-4ef3-aa72-03133c80c145sv/
- Regeringsformen 6 kap. 4–5 §§: https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/kungorelse-1974152-om-beslutad-ny-regeringsform_sfs-1974-152/
