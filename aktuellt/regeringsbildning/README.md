# Regeringsbildning – fyrfältaren som scen

Live-sida, när GitHub Pages är påslaget för `main` och rot: [https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/](https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/)

Poängen: generativ AI kan tvinga fram fyra åtskilda, källbelagda sätt som en svensk regeringsbildning kan falla ut, och därefter ompröva dem. Sidan är ett fall från morgonen den 2 oktober 2026, inte en levande nyhetssida.

## För en annan modell, eller en människa som ska bygga vidare

Läs `BYGGKONTRAKT.md` först. Ändra utfall i `scenario.json`, inte i HTML. Behåll relativa sökvägar så att samma filer fungerar lokalt, på GitHub Pages och på Vercel.

## Filer

| Fil | Roll |
| --- | --- |
| `index.html` | Sidan. Hämtar data, ritar scenen. |
| `stil.css` | Utseende. |
| `app.js` | Klick, panel, metod och kontrakt. |
| `scenario.json` | Fakta, rutor, procent och omprövning. |
| `metod.md` | Vad som får stå som faktum. |
| `BYGGKONTRAKT.md` | Regler för nästa bygge. |
| `prompt1.md` | Den korta beställningen. |
| `prompt2.md` | Prompten som kördes. |
| `bilder/` | Fyrfältaren och en bild av första prompten. |
| `video/` | Körningen den 2 oktober 2026. |

## Att uppdatera efter ett nytt besked

Lägg ett nytt objekt eller en daterad kopia. Skriv inte över `meta.asOf` för morgonfallet. En ny körning ska ha eget datum och egen video eller bild om sådan finns.
