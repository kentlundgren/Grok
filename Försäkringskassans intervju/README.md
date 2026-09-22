# Försäkringskassans intervju — Controller inom produktionsstyrning

> Underlag för att förbereda intervjun till Controller till Bidragsbrottsavdelningens stab på Försäkringskassan. Fokus: produktionsstyrning och att upptäcka bidragsfusk hos sökande — inte hos handläggare.

---

## 1. Minnesramen: A, B, C

Tre bedragare, tre spår. Håll dem i den ordningen — det är lättast att minnas.

### A — Andersson: upprepad registrering
Samma aktör skapar flera ärenden på samma underlag. Samma person, samma hyreskontrakt, samma inkomstuppgift — men i två, fem eller tio separata ärenden. Spåret: **datamatchning** (personnummer, bankkonto, adress, ombud).

> OBS: ordet "dubbelregistrering" är missvisande — det handlar inte om exakt två, utan om att samma underlag dyker upp mer än en gång. Bättre att säga *upprepad registrering* eller *samma underlag i flera ärenden*.

### B — Bengtsson: återkommande mönster
Samma person (eller familj) upprepar samma typ av ansökan över tid — till exempel sjukskrivningar med jämna mellanrum utan verklig sjukdom. Spåret: **sekvensanalys** över tid.

### C — Ceders stadsdel: orealistiska volymer
En hel grupp, ett område eller en kategori genererar ärenden i en takt som avviker från sin egen baslinje — utan delat underlag. Varje person kan ha helt egna, korrekta underlag, men kollektivet sticker ut. Spåret: **trend- och tröskelanalys** mot en norm.

> Normen behöver inte vara geografisk. Den kan vara individuell: en läkare (Cedersson) som skriver femhundra intyg istället för femtio. Samma metod, annan referenspunkt.

### Skillnaden mellan A och C
- **A** spårar en tråd genom flera ärenden — samma underlag, flera ärenden.
- **C** mäter en avvikelse mot en norm — många ärenden, inget delat underlag.
- Antalet avgör inte vilken det är. Enheten gör det.

### Den fjärde metoden (nätverksanalys)
Kartlägga kopplingar mellan sökande via adresser, konton, telefonnummer och ombud. En enskild person syns inte — men tio personer som delar infrastruktur gör det. Används när valideringen visar att något är fel men du inte vet om det är tio enskilda misstag eller ett organiserat nätverk.

---

## 2. Korsvalidering — skilja äkta från konstlat

En äkta influensaepidemi ger en äkta topp i sjukskrivningarna och ska inte flaggas. Skillnaden ligger i signaturen:

| | Äkta epidemi | Bedrägerivåg |
|---|---|---|
| Sjukvård/apotek | Ökar i takt | Tyst — ingen motsvarighet |
| Säsong | Följer känd säsong | Ofta utan säsongskoppling |
| Struktur | Sprids i en våg | Koncentrerad till en bidragsform, en läkare, ett nätverk |

Metod: jämför flera oberoende datakällor mot varandra. Ökar sjukskrivningarna men inte apoteken → avvikelse som förtjänar närmare titt.

---

## 3. Övningsfrågor (intervjuträning)

**Fråga 1:** Du har sagt att du är intresserad av produktionsstyrning och att upptäcka missbruk. Kan du ge mig ett konkret exempel på hur du skulle upptäcka bidragsfusk i produktionsdata?

*Bra svar:* Tre former — A, B, C. Andersson (upprepad registrering), Bengtsson (återkommande mönster), Ceders stadsdel (orealistiska volymer). Håll dig till sökandesidan.

**Fråga 2:** Hur skulle du skilja en äkta influensaepidemi från organiserat bedrägeri i samma data?

*Bra svar:* Korsvalidering mot oberoende källor — apotek, vårdcentraler, skolfrånvaro. Äkta epidemi syns i alla; bedrägeri bara i en.

**Fråga 3:** Du upptäcker att tio personer i samma postnummer har ansökt om bostadsbidrag med samma hyreskontrakt. Hur resonerar du?

*Bra svar:* Validera först att det verkligen är tio separata ärenden med samma underlag. Sedan nätverksanalys — finns det kopplingar (telefon, konto, ombud)? Därefter till chef. Skillnaden: det är inte samma ärende, det är tio ärenden som döljer samma underlag.

---

## 4. Källor

**Primär källa — metodhandbok för de tre mönstren:**
Försäkringskassan, *Vägledning 2004:1 Kontrollutredning* (version 18). Har en explicit checklista: finns det en systematik som ökar över tid? Har den enskilde lämnat felaktiga uppgifter i andra ärenden? Har den enskilde lämnat olika uppgifter i olika ärenden?
- https://forsakringskassan.se/download/18.7fc616c01814e179a9f6fb/1781091247031/kontrollutredning-vagledning-2004-1.pdf

**Kompletterande — hur kontrollverksamheten fungerar:**
ISF (Inspektionen för socialförsäkringen), *Rapport 2025:14 Kontrollutredningar vid misstänkta bidragsbrott*. Beskriver strategiska profiler och riktade kontroller; profilerade ärenden leder till åtgärd i 74 % av fallen.
- https://isf.se/download/18.64c0dda619afce1ad7d1cbd5/1768374582621/Rapport%202025-14%20Kontrollutredningar%20vid%20misst%C3%A4nkta%20bidragsbrott.pdf

**Lägesrapport — bidragsbrott inom sjukpenning:**
Försäkringskassan, *Lägesrapport 2026:2*.
- https://www.forsakringskassan.se/download/18.6824ccfb19c0e5392cdea/1772457894135/bidragsbrott-sjukpenning-forsakringskassans-lagesrapport-2026-2.pdf

**Riskprofiler och behandling av personuppgifter:**
- https://www.forsakringskassan.se/om-forsakringskassan/behandling-av-personuppgifter

---

## 5. Rollens kontext

Tjänsten ligger på den nya **Bidragsbrottsavdelningen** (startad februari 2026), inte på den övergripande Ledningsstöd och analys. Produktionsstyrning handlar här om att styra utredningsflöden — kapacitet, beslutstakt, mönster i ärendehanteringen — inte om tillverkning. Samma verktygslåda som myndighetens totala produktionsstyrning, men ett annat organisatoriskt hem och ett annat uppdrag.
