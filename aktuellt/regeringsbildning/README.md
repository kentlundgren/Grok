# Regeringsbildning – fyrfältaren som scen

Live-sida, när GitHub Pages är påslaget för `main` och rot: [https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/](https://kentlundgren.github.io/Grok/aktuellt/regeringsbildning/)

Poängen: generativ AI kan tvinga fram fyra åtskilda, källbelagda sätt som en svensk regeringsbildning kan falla ut, och därefter ompröva dem. Analysen är gjord med AI (Grok) och siffrorna är inte kvalitetssäkrade. Sidan visar körningar vid olika tidpunkter: den senaste är förvald och tidigare går att välja. Hittills finns en körning, från morgonen den 2 oktober 2026 kl 08:19, och en processnotis från eftermiddagen samma dag. Notisen är inte en ny analys. Sidan är inte en levande nyhetssida.

## För en annan modell, eller en människa som ska bygga vidare

Läs `BYGGKONTRAKT.md` först. Där står skillnaden mellan en processnotis och en ny körning. Ett fakta-besked som inte flyttar procenten läggs i `notices`. Nya procent läggs som en ny post i `snapshots`. Ändra inte utfall i HTML. Behåll relativa sökvägar så att samma filer fungerar lokalt, på GitHub Pages och på Vercel.

## Filer

| Fil | Roll |
| --- | --- |
| `index.html` | Sidan. Innehåller ingen data. |
| `stil.css` | Utseende. |
| `app.js` | Tidsväljare, klick, panel, metod och teknik-modal. |
| `scenario.js` | Enda datakällan: fakta, rutor, körningar med procent och omprövning, samt processnotiser utan procent. |
| `metod.md` | Vad som får stå som faktum. |
| `BYGGKONTRAKT.md` | Regler för nästa bygge. |
| `prompt1.md` | Den korta beställningen. |
| `prompt2.md` | Prompten som kördes. |
| `bilder/` | Fyrfältaren och en bild av första prompten. |
| `video/` | Körningen den 2 oktober 2026, rotationsvideon till inlägg och `gor_rotation.py` som gör om den. |
| `k/` | En delningssida per körning, med egna `og:`-taggar. Den adressen delas på LinkedIn och X. |
| `og-bild.jpg` | Förhandsbilden (1200 × 630) för basadressen. |

## Att uppdatera efter ett nytt besked

Bestäm först vilken sort det är. Reglerna står i `BYGGKONTRAKT.md`.

- Processnotis: lägg en post sist i `notices`. Inga procent, ingen ny delningssida.
- Ny körning: lägg en post sist i `snapshots`, med eget `asOf` och egna procent i den modellens namn. Skriv aldrig över en tidigare post. En ny körning ska ha egen video eller bild om sådan finns.
