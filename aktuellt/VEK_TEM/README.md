# Samma fråga, nya modeller

- **Live:** [https://kentlundgren.github.io/Grok/aktuellt/VEK_TEM/](https://kentlundgren.github.io/Grok/aktuellt/VEK_TEM/)

Statisk webbsida (HTML, CSS, JavaScript, ingen build) som svarar på en återkommande fråga: **hur ser man en organisation så att man kan styra, planera och följa upp den?** Samma tema som blogginlägget [Samma fråga, nya modeller](https://controllerutangranser.wordpress.com/2026/10/16/samma-fraga-nya-modeller/) (16 oktober 2026) och en kortare [LinkedIn-artikel](https://www.linkedin.com/pulse/samma-fr%C3%A5ga-nya-modeller-kent-lundgren-jmkee/). Sidan är den utökade versionen med källor, diagram och uppgiftskontroll.

Mappen heter `VEK_TEM` i repot eftersom jämförelsen utgår från **VEK** (verksamhet, ekonomi, kompetens), **TEM** (teknik, ekonomi, miljö) och **balanserat styrkort** – men innehållet handlar om modeller i stort, inte bara om de tre namnen.

## Vad sidan innehåller

| Avsnitt | Innehåll |
| --- | --- |
| Kort svar | Flera perspektiv än ekonomi, managementmode, privat/offentligt, gemensamma frågor. |
| Tre sätt | VEK, TEM och balanserat styrkort – med tabell och Diagram 1. VEK beskrivs utifrån en statlig myndighet i källan (läsaren kan känna igen exemplet; sidan säger **myndigheten** där det räcker). |
| [Verksamhetsringen](https://kentlundgren.github.io/Grok/aktuellt/VEK_TEM/#verksamhetsringen) | Egen variant av balanserat styrkort: verksamhetsförst, medurs till finansiellt utfall, controller i centrum. Direktlänk med `#verksamhetsringen`. |
| Tre steg | Styrning, planering och uppföljning – egen uppdelning, Diagram 2 (VEK i praktiken). |
| Modeller och mode | Abrahamson, tidslinje, [balanserat styrkort idag](https://kentlundgren.github.io/Grok/aktuellt/VEK_TEM/#h-bsc-idag) (popularitet, kritik, andra ramverk). |
| Privat och offentligt | Tabell 2 utifrån källor. |
| Fyra frågor | Checklista inför nästa modell (egen). |
| Källor | Harvardstil med hämtdatum; fakta jämförda mot original där det gått. |

Faktauppgifter är markerade mot källor. Jämförelser, diagramkopplingar, Verksamhetsringen, tidslinje och frågelista är **egna sammanställningar** och står så på sidan.

## Filer

| Fil | Roll |
| --- | --- |
| `index.html` | Hela sidan, inklusive SVG-diagram och hopp till avsnitt. |
| `stil.css` | Utseende. |
| `app.js` | Förklaringsrutor i diagram, aktiv sektion i toppnavigeringen, teknik-modal. |
| `KONTROLL.md` | Uppgiftskontroll mot källtext (vid behov uppdateras den när sidan ändras). |
| `Bilder/VEK_TEM_BalanseratStyrkort.jpg` | Diagram 1 (egen sammanställning). |
| `Bilder/VEK_styrning_planering_uppfoljning.svg` | Diagram 2, fristående vektorfil. |
| `Bilder/VEK_styrning_planering_uppfoljning.png` | Diagram 2 som PNG för blogg och sociala medier. |
| `Bilder/verksamhetsringen.svg` | Diagram 4, Verksamhetsringen. |
| `Bilder/eget_balanserat_styrkort.jpg` | Handskiss som utgångspunkt till Verksamhetsringen. |
| `Bilder/KVAB.jpg` | Foto till blogginlägget (Kalmar Verkstad). Foto: Johannes Scherman, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kalmar_Verkstad_augusti_2022.jpg). |

## Teknik och publicering

- GitHub Pages under `Grok/aktuellt/VEK_TEM/`.
- Källkod i repot: [github.com/kentlundgren/Grok/tree/main/aktuellt/VEK_TEM](https://github.com/kentlundgren/Grok/tree/main/aktuellt/VEK_TEM).
- Lokal kopia (Kent): `C:\Users\kentl\OneDrive\AI\Grok\aktuellt\VEK_TEM`.

## Status

- Förhandsbild för delning (`og-bild.jpg` och Open Graph-taggar i `index.html`) saknas ännu; lägg till innan sidan delas brett.
- Efter ändringar: committa och pusha i Cursor så live-sidan uppdateras.
