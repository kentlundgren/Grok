# AGENTS.md — koldioxidlagring

Anteckningar och kalkyler om geologisk lagring av koldioxid (CCS), byggda på SGU:s föredrag och RR 2026:06. Statisk HTML för GitHub Pages i `kentlundgren/Grok`.

- **Live:** [https://kentlundgren.github.io/Grok/koldioxidlagring/](https://kentlundgren.github.io/Grok/koldioxidlagring/)
- Repots regler i `../AGENTS.md` gäller också här.

## Skill

Förutsättningar och villkor för lagring finns i skillet `koldioxidlagring-villkor`:

- Original: `../.agents/skills/koldioxidlagring-villkor/SKILL.md` (Cursor och Grok hittar det själva)
- Claude Code: `../.claude/skills/koldioxidlagring-villkor/SKILL.md` pekar på originalet
- Källor: `../.agents/skills/koldioxidlagring-villkor/references/kallor.md`

Läs skillet innan du svarar på sakfrågor eller ändrar innehåll på sidorna.

## Sidor

| Fil | Innehåll |
| --- | --- |
| `index.html` | Uppdraget, 800 m, varför bara till havs, de två områdena, borrningarna i Skåne |
| `kalkyl.html` | Superkritisk fas och räknare för öre per kWh |
| `ets.html` | EU ETS-priset mot bidragen i öre per kWh |
| `bidrag.html` | Beviljade stöd i Sverige, Danmark och Norge |
| `norden.html` | Northern Lights och Greensand, kostnad från bioeldat kraftvärme |
| `oresund-karta.html` | Varför Öresund-kartan visar mätlinjer, inte ett lager |
| `sydvastra-ostersjon.html` | Djupseismik och maringeologi söder om Skåne |
| `sydost-gotland.html` | Faluddensandstenen sydost om Gotland, Nore-borrningarna och tillståndet som stoppar undersökningarna (tillagd 2026-09-28) |
| `helhet.js` + `helhet.css` | Navigeringsrad, "Visste du …"-rutan på startsidan, Läs vidare, kedjan "Så hänger det ihop" samt GitHub-hörna och teknik-modal på alla sidor |
| `karta.js` + `karta.css` | Leaflet-kartan på de två kartsidorna (`<div class="sgu-karta" data-vy="skane">`, vyerna är `skane`, `oresund` och `bada`) |
| `data/sgu-karta.js` | SGU:s öppna data (CC0) omräknad till WGS 84: områden, mätlinjer och borrhål. Genererad, redigera inte för hand |
| `data/konvertera.py` | Skapar `data/sgu-karta.js` ur SGU:s GeoPackage-filer. Instruktion överst i filen |
| `og-bild.jpg` | Bilden för länkförhandsvisning av startsidan (1200 × 630 pixlar) |

Här skedde en uppdatering 2026-09-28: kartfilerna, Visste du-rutan och länkförhandsvisningen lades till.

- **Visste du:** de fem påståendena står i listan `VISSTE` i `helhet.js`. Varje påstående måste gå att belägga på sidan det länkar till.
- **Kartorna:** kartsidorna visar sedimentekolodets mätlinjer. Djupseismik, förkastningar och gasutsippringar finns i SGU:s multistrålepaket och visas inte.

## Korsreferenser

Här skedde en uppdatering 2026-09-28: sidorna kopplades ihop via `helhet.js`.

- Listan `SIDOR` i `helhet.js` styr navigeringen, läsordningen (föregående och nästa) och vilka sidor som visas under Läs vidare.
- Ny sida: lägg in den i `SIDOR` med tema och två eller tre relaterade sidor, och lägg in `helhet.css` och `helhet.js` i `<head>` som på de andra sidorna.
- Nytt ankare på startsidan som ska länkas: ge avsnittet ett `id` och lägg in namnet i `AVSNITT`.
- Länka i löptexten när en sida nämner något som en annan sida förklarar.

## Regler i mappen

- Tailwind via CDN, ingen build. Följ sidornas befintliga stil. Inför inte Vite, React eller ett byggsteg utan att fråga.
- Skilj på kandidat, undersökt, godkänt och i drift. Inget svenskt lager är godkänt.
- Hitta inte på siffror. Daterade uppgifter (ETS-pris, driftstatus, stöd) ska ha hämtdatum och kontrolleras innan de uppdateras.
- Källförteckning i Harvardstil enligt `kent-referens`. Den synliga URL:en ska vara klickbar.
- Hänvisa inte till föredragsbilder som om läsaren ser dem ("bilden visar", "föredragets karta"). Skriv vad SGU sa eller visade i föredraget. Här skedde en uppdatering 2026-09-28: punkten lades till.
- Belopp med hela ord: "miljoner kronor", "miljarder kronor".
- Ny sida: lägg till live-länken i `README.md`.
- Fråga om en befintlig sida ska uppdateras eller om en ny `_verX`-fil ska skapas.
- Committa och pusha inte utan uttrycklig begäran.
