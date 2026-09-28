# Koldioxidlagring i Sverige

- **Live:** [https://kentlundgren.github.io/Grok/koldioxidlagring/](https://kentlundgren.github.io/Grok/koldioxidlagring/)
- **Bidrag:** [https://kentlundgren.github.io/Grok/koldioxidlagring/bidrag.html](https://kentlundgren.github.io/Grok/koldioxidlagring/bidrag.html)
- **EU ETS mot öre/kWh:** [https://kentlundgren.github.io/Grok/koldioxidlagring/ets.html](https://kentlundgren.github.io/Grok/koldioxidlagring/ets.html)
- **Kalkyl öre/kWh:** [https://kentlundgren.github.io/Grok/koldioxidlagring/kalkyl.html](https://kentlundgren.github.io/Grok/koldioxidlagring/kalkyl.html)
- **Norge och Danmark:** [https://kentlundgren.github.io/Grok/koldioxidlagring/norden.html](https://kentlundgren.github.io/Grok/koldioxidlagring/norden.html)
- **Öresund-kartan:** [https://kentlundgren.github.io/Grok/koldioxidlagring/oresund-karta.html](https://kentlundgren.github.io/Grok/koldioxidlagring/oresund-karta.html)
- **Sydvästra Östersjön:** [https://kentlundgren.github.io/Grok/koldioxidlagring/sydvastra-ostersjon.html](https://kentlundgren.github.io/Grok/koldioxidlagring/sydvastra-ostersjon.html)
- **Sydost om Gotland:** [https://kentlundgren.github.io/Grok/koldioxidlagring/sydost-gotland.html](https://kentlundgren.github.io/Grok/koldioxidlagring/sydost-gotland.html)

Anteckningar från SGU-föredraget, BECCS-kalkyl, nordisk jämförelse, beviljade bidrag och EU ETS.

## Vad mappen täcker

- Varför lagring ska ske djupare än 800 meter
- Uppskattad kostnad per kWh för bioenergi med avskiljning och lagring
- EU ETS-pris omräknat till öre per kWh jämfört med bidragen
- Vilka organisationer som fått bidrag, volym, plats och lagringsmål
- Hur långt Norge och Danmark kommit
- De två undersökta svenska områdena och vad kartorna visar

## Teknik

Statisk HTML med Tailwind CSS via CDN. Ingen build.

Här skedde en uppdatering 2026-09-28: sidorna hänger ihop via `helhet.js` och `helhet.css`. Varje sida får en navigeringsrad överst och en Läs vidare-ruta längst ner, och startsidan visar hur sidorna svarar på fem frågor i tur och ordning.

Här skedde en uppdatering 2026-09-28:

- De två kartsidorna har en interaktiv karta (Leaflet och OpenStreetMap) med SGU:s öppna data: undersökningsområden, mätlinjer per år och borrhål. Datan skapas av `data/konvertera.py`.
- Startsidan har rutan "Visste du …" med fem påståenden som byts var sjätte sekund.
- Startsidan har länkförhandsvisning (Open Graph) med bilden `og-bild.jpg`.
