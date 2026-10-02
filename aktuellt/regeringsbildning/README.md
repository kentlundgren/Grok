# Regeringsbildning – fyrfältaren som scen

Live-sida, när GitHub Pages är påslaget för `main` och rot: [https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/](https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/)

Poängen: generativ AI kan tvinga fram fyra åtskilda, källbelagda sätt som en svensk regeringsbildning kan falla ut, och därefter ompröva dem. Analysen är gjord med AI (Grok) och siffrorna är inte kvalitetssäkrade. Sidan visar körningar vid olika tidpunkter: den senaste är förvald och tidigare går att välja. Hittills finns en körning, från morgonen den 2 oktober 2026 kl 08:19. Sidan är inte en levande nyhetssida.

## För en annan modell, eller en människa som ska bygga vidare

Läs `BYGGKONTRAKT.md` först. Ändra utfall i `scenario.js`, inte i HTML. Lägg en ny körning som ny post i `snapshots`. Behåll relativa sökvägar så att samma filer fungerar lokalt, på GitHub Pages och på Vercel.

## Filer

| Fil | Roll |
| --- | --- |
| `index.html` | Sidan. Innehåller ingen data. |
| `stil.css` | Utseende. |
| `app.js` | Tidsväljare, klick, panel, metod och teknik-modal. |
| `scenario.js` | Enda datakällan: fakta, rutor, körningar med procent och omprövning. |
| `metod.md` | Vad som får stå som faktum. |
| `BYGGKONTRAKT.md` | Regler för nästa bygge. |
| `prompt1.md` | Den korta beställningen. |
| `prompt2.md` | Prompten som kördes. |
| `bilder/` | Fyrfältaren och en bild av första prompten. |
| `video/` | Körningen den 2 oktober 2026. |

## Att uppdatera efter ett nytt besked

Lägg en ny post sist i `snapshots` i `scenario.js`, med eget `asOf`. Skriv aldrig över en tidigare post. En ny körning ska ha egen video eller bild om sådan finns. Se `BYGGKONTRAKT.md` för stegen.
