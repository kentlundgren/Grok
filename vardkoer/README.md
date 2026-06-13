# Vårdköer i Sverige 2022–2026

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

## Källor (primära)

- SKR – Väntetider i vården (https://extra.skr.se/vantetiderivarden.46246.html)
- Socialstyrelsen – Lägesbild och statistik om tillgänglighet/vårdgaranti
- Riksrevisionen (2023): "I väntan på vård"
- Myndigheten för vård- och omsorgsanalys
- Regeringsdokument och faktagranskningar (SVT, DN m.fl.) med referenser till ovanstående

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