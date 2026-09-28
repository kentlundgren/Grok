---
name: koldioxidlagring-villkor
description: >-
  Beskriver förutsättningar och villkor för geologisk lagring av koldioxid (CCS)
  i Sverige och Norden: djup och superkritisk fas, reservoar och takberg,
  juridiska gränser, SGU:s två kandidatområden, risker, kostnad per ton och
  kWh, stöd och EU ETS. Används när användaren frågar om koldioxidlagring,
  CCS, BECCS, CO2-lager, Faludden, Arnagergrönsanden, Northern Lights,
  Greensand, SGU RR 2026:06, eller arbetar med filer i mappen koldioxidlagring/.
metadata:
  author: Kent Lundgren
  created: 2026-09-28
  last_updated: 2026-09-28
  canonical: .agents/skills/koldioxidlagring-villkor/SKILL.md
---

# Koldioxidlagring: förutsättningar och villkor

Kunskapen kommer från mappen `koldioxidlagring/`, alltså Kents anteckningar från SGU-föredraget och sidorna om kalkyl, Norden, bidrag och EU ETS. Live: https://kentlundgren.github.io/Grok/koldioxidlagring/

Skillet gäller för Cursor, Claude Code och Grok. Originalet ligger här. `.claude/skills/koldioxidlagring-villkor/SKILL.md` pekar hit.

## Grundregler

- Skilj alltid på **kandidat**, **undersökt**, **godkänt** och **i drift**. Inget svenskt lager är godkänt eller byggt (hösten 2026).
- Siffrorna gäller vid hämtdatumet 28 september 2026. Priser, stöd och driftstatus ändras. Kontrollera mot källan innan ett tal återanvänds som aktuellt.
- Hitta inte på kapacitet, platser, belopp eller tillstånd. Om mappen inte belägger något, säg det och sök en primärkälla.
- Källor i Harvardstil enligt skillen `kent-referens`. Färdiga poster finns i [references/kallor.md](references/kallor.md).
- Skriv belopp med hela ord: "miljoner kronor", "miljarder kronor". Inte mnkr eller mdkr.

## 1. Fysik: varför djupare än cirka 800 meter

- CO₂ blir superkritisk vid cirka 31 °C och 74 bar. Med normal geotermisk gradient och hydrostatiskt tryck nås det ungefär 800 m under ytan.
- Superkritisk CO₂ tar cirka 30–300 gånger mindre plats än gas vid ytan, beroende på referens. Densiteten ligger ofta på 600–700 kg/m³ på lagringsdjup i Nordsjön.
- 800 m är en tumregel, inte en lag. I varm berggrund kan fasövergången ske vid 550–750 m, i kall berggrund djupare.
- Större djup ger oftast tätare CO₂ och tjockare takberg, men dyrare brunnar.

## 2. Geologi: vad en lagringsplats kräver

| Villkor | Vad som ska gälla | Exempel ur materialet |
| --- | --- | --- |
| Reservoar | Porös och genomsläpplig sandsten på rätt djup | Faluddensandstenen; Arnagergrönsanden (glaukonitrik sandsten från krita) |
| Reservoartjocklek | SGU:s minimikriterium är 20 m | Lilla Beddinge-1: cirka 20 m, precis på gränsen. Skåre-1: 49,5 m, ställvis okonsoliderad |
| Takberg | Tätt och mekaniskt stabilt över reservoaren | Mer än 500 m förkislad kalksten, lerig kalksten och märgelsten i båda Skåne-hålen |
| Läckagevägar | Inga förkastningar eller gasutsippringar som förbinder reservoar och havsbotten | Röda flaggor på SGU:s karta Trelleborg–Ystad |
| Mineralstabilitet | Reservoarmineralen ska tåla CO₂-injektion | Glaukonitens stabilitet är en nyckelfråga (dansk analogi, Project Greensand) |
| Plymens utbredning | Plymen ska stanna inom svenskt område | Två av sju modellerade brunnar i Arnagergrönsanden riskerar att nå danskt område efter 500 år |
| Data | Djupseismik, borrkärnor, täthetstester av takberget | Mer än 3 400 km ny reflektionsseismik 2023–2025; två nya kärnhål 2024–2025 |

## 3. Juridik: varför bara till havs

- Förordning (2014:21) 10 § tillåter lagring bara i ekonomisk zon och i territorialhav som inte ingår i fastighet.
- CCS-direktivet tillåter landlager, men Sverige byggde aldrig det regelverket (prop. 2011/12:125).
- SGU menar att förbudet också träffar injektionsanläggningar på land.
- Gränsöverskridande plym kräver data fram till territorialgränsen. Därför slutar undersökningsområdet vid EEZ-gränsen.

## 4. Sveriges två kandidatområden

| Område | Reservoar | Modellerad kapacitet | Svagheter |
| --- | --- | --- | --- |
| Sydöstra Östersjön (sydost om Gotland) | Faluddensandstenen | Mer än 300 megaton på 30 år | Kräver fler undersökningar |
| Skåne och sydvästra Östersjön | Arnagergrönsanden | Drygt 100 megaton på 30 år | Tunn i Lilla Beddinge, svårborrad i Skåre, djupare kandidater oborrade, plym mot Danmark |

SGU:s slutsats i RR 2026:06 (mars 2026): båda områdena är tänkbara, bedömd kapacitet minst 5 miljoner ton per år, mer undersökningar krävs, en anläggning ligger minst ett decennium fram.

**Öresund är inte en kandidat.** Kartan "CCS MAK Västra Skåne 2025" visar mätlinjer. Sundet är för grunt för 800-meterskravet, är farled och gränsar mot Danmark.

## 5. Ekonomi och drift

- Kedjan är avskiljning + transport + lagring. Avskiljningen är den största posten, lagringen den minsta.
- Formel: kedjekostnad (€/ton) × kg CO₂/kWh × avskiljningsgrad ÷ 1 000 × SEK/€ = kr/kWh.
- Förval: träbränsle 0,42 kg CO₂/kWh på el + värme vid 90 % verkningsgrad; 1,26 kg/kWh om allt slås på elen.
- Typiskt påslag för biokraftvärme: 50–120 öre/kWh på el + värme, tre–fyra gånger mer på bara el. Avskiljningen tar ånga och sänker elproduktionen, vilket inte ingår i formeln.
- EU ETS cirka 86 euro/ton (28 september 2026) ≈ 40 öre/kWh på el + värme. Exergis stöd motsvarar cirka 1 800 kronor per ton ≈ 76 öre/kWh.
- ETS gäller fossila ton. Bio-CCS-stödet betalar för borttagna biogena ton. Samma måttstock, inte samma vara.

Detaljer: `koldioxidlagring/kalkyl.html`, `ets.html`, `bidrag.html`.

## 6. Läget i Norden

- **Norge:** Northern Lights i drift sedan augusti 2025 (Aurora, 2 600 m). Fas 1 är 1,5 Mt/år och fullbokad; fas 2 ska nå mer än 5 Mt/år 2028.
- **Danmark:** Greensand i kommersiell drift sedan 18 september 2026 (Nini West, 1 800 m), upp till 0,4 Mt/år i första fasen. Ørsteds bio-CO₂ går till Norge.
- **Sverige:** ingen egen injektion. Stockholm Exergi har bokat lagring i Norge. Norsk och dansk lagring är den praktiska marknaden detta decennium.

Detaljer: `koldioxidlagring/norden.html`.

## Arbetsgång: "Kan koldioxid lagras på plats X?"

Gå igenom villkoren i ordning och svara per punkt med ja, nej eller okänt, plus källa:

1. Ligger platsen i ekonomisk zon eller territorialhav utanför fastighet?
2. Finns en reservoar på minst cirka 800 m djup (justerat för temperatur)?
3. Är reservoaren minst 20 m tjock och genomsläpplig?
4. Finns ett tätt takberg, och är det testat?
5. Finns förkastningar eller gasutsippringar som kan bli läckagevägar?
6. Stannar plymen inom svenskt område på lång sikt?
7. Vilka data finns: seismik, borrningar, kärnor?
8. Vilken kapacitet är modellerad, och av vem?
9. Status: kandidat, undersökt, godkänt eller i drift? Vilken tidplan?

Avsluta med en mening om vad som saknas innan platsen kan bli ett lager.

## Arbete i mappen koldioxidlagring/

- Statisk HTML med Tailwind via CDN, ingen build. Följ sidornas befintliga stil: `bg-sky-900`-header, `max-w-3xl`, källförteckning sist.
- Varje sida slutar med en källförteckning där den synliga URL:en är klickbar och har hämtdatum.
- Ny sida: länka från `koldioxidlagring/README.md` med live-adress.
- Committa och pusha inte utan uttrycklig begäran.
