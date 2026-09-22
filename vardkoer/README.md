# Vårdköer i Sverige 2022–2026

> Här skedde en uppdatering 2026-09-22: live-sidan lades överst. Den fanns tidigare bara som text längre ner i instruktionen.

- **Live:** [https://kentlundgren.github.io/Grok/vardkoer/](https://kentlundgren.github.io/Grok/vardkoer/)

En interaktiv, faktabaserad HTML-presentation som analyserar hur vårdköerna (väntetider enligt vårdgarantin) i Sverige har utvecklats mellan 2022 och 2026.

## Bakgrund

Prompten bakom analysen är **Prompt 3** (den analytiska + orsaks- och bias-versionen):

- Steg 1: Samla rådata från SKR och Socialstyrelsen
- Steg 2: Granska politiska påståenden från regering och opposition
- Steg 3: Orsaksanalys
- Steg 4: Tvådelade slutsatser (vad data visar + varför bilden är splittrad)

## Innehåll

- Senaste tillgängliga nyckeltal (april 2026)
- Interaktiva diagram över tid (andelen inom 90 dagar + antal som väntat längre)
- Sammanfattande tabell 2022–2026
- Jämförelse av regeringens respektive oppositionens påståenden
- Orsaksanalys (COVID, finansiering, SVF, databasövergång, personal, efterfrågan)
- Nyanserade slutsatser

## Källförteckning

> Här skedde en uppdatering 2026-09-22: listan skrevs om till Harvardformat. Riksrevisionens tidigare adress gav 404 och byttes till den gällande.

Myndigheten för vård- och omsorgsanalys (u.å.) Webbplats. Tillgänglig på: [https://www.vardanalys.se/](https://www.vardanalys.se/) (Hämtad 22 september 2026). *(Myndighetens startsida. Presentationen hänvisar till rapporter om tillgänglighet. Länken är inte en namngiven rapport.)*

Riksrevisionen (2023) *I väntan på vård – ineffektiv statlig styrning för kortare köer*. Tillgänglig på: [https://www.riksrevisionen.se/granskningar/granskningsrapporter/2023/i-vantan-pa-vard---ineffektiv-statlig-styrning-for-kortare-koer.html](https://www.riksrevisionen.se/granskningar/granskningsrapporter/2023/i-vantan-pa-vard---ineffektiv-statlig-styrning-for-kortare-koer.html) (Hämtad 22 september 2026). *(Granskar den statliga styrningen för kortare vårdköer. Titeln är sidans egen.)*

Socialstyrelsen (u.å.) *Lägesbild och statistik om tillgänglighet, väntetider och vårdgaranti i hälso- och sjukvård*. Tillgänglig på: [https://www.socialstyrelsen.se/statistik-och-data/statistik/alla-statistikamnen/lagesbild-och-statistik-tillganglighet-vantetider-och-vardgaranti-i-halso-och-sjukvard/](https://www.socialstyrelsen.se/statistik-och-data/statistik/alla-statistikamnen/lagesbild-och-statistik-tillganglighet-vantetider-och-vardgaranti-i-halso-och-sjukvard/) (Hämtad 22 september 2026). *(Löpande statistik om vårdgarantin från juli 2025.)*

Sveriges Kommuner och Regioner (u.å.) *Väntetider i vården*. Tillgänglig på: [https://extra.skr.se/vantetiderivarden.46246.html](https://extra.skr.se/vantetiderivarden.46246.html) (Hämtad 22 september 2026). *(Historisk väntetidsdatabas och ingång till vårdgarantiläget.)*

Regeringsunderlag, Vårdföretagarnas månadsrapporter samt faktagranskningar i SVT och DN nämns i presentationen men saknar en bestämd skrift med adress. De står därför inte i källförteckningen.

**Viktigt:** Statistiken är sammanställd i juni 2026. Dataövergången från SKR till Socialstyrelsen (juli 2025) samt journalsystembyten i flera regioner påverkar jämförbarheten. Kontrollera alltid de senaste siffrorna direkt hos källorna.

## Hur du kör / visar presentationen

**Enklast:**
1. Öppna `index.html` direkt i webbläsaren (dubbelklicka eller `open index.html`).

**Via GitHub Pages (rekommenderat för delning):**
1. Gå till repo-inställningar → Pages
2. Välj branch `main` och mapp `/vardkoer`
3. Presentationen blir tillgänglig på `https://kentlundgren.github.io/Grok/vardkoer/`

## Commit & push

```bash
# Från repo-roten
git add vardkoer/
git commit -m "Add interactive vårdköer analysis (based on Prompt 3)"
git push origin main
```

## Teknik

- Enkel fil (`index.html`) – lätt att versionhantera och visa
- Tailwind CSS via CDN + Chart.js
- Fullt responsiv
- Inga externa beroenden utöver CDNs (fungerar offline efter första laddning)

---

Skapad som ett konkret exempel på hur man kan omvandla en forskningsinriktad prompt till en levande, delbar presentation.
Se även `index.html` för full källhänvisning och metod.