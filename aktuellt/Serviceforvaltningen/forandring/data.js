/*
 * data.js – allt innehåll i diagrammet ligger här, ingen kopia finns i index.html.
 * Varför: så att text, källor och säkerhetsgrad inte kan glida isär.
 * Filen är JavaScript och inte JSON, så att sidan fungerar även när den öppnas direkt från disk.
 *
 * Säkerhetsgrader (status):
 *   belagt         = står i en primärkälla från Lunds kommun
 *   indikerat      = källorna pekar åt det hållet, men sambandet är en tolkning
 *   ospecificerat  = ingen källa jag har läst säger var verksamheten hamnar
 */

const HAMTAD = '6 oktober 2026';

/* ---------- Källor (alfabetiskt efter organisation, sedan år) ---------- */
const KALLOR = {
  sf: {
    kort: 'Lunds kommun, u.å.',
    titel: 'Serviceförvaltningen',
    url: 'https://lund.se/kommun-och-politik/kommunens-organisation/forvaltningar/serviceforvaltningen',
    notion: 'Förvaltningens egen sida: de sex avdelningarna, stödfunktionerna och att verksamheten tas över av andra förvaltningar och en ny fastighetsförvaltning vid årsskiftet.'
  },
  evp: {
    kort: 'Lunds kommun, 2025a',
    titel: 'Ekonomi- och verksamhetsplan med budget för 2026–2028',
    url: 'https://lund.se/download/18.67b384b819b2bf780548b5/1765985713706/Ekonomi-%20och%20verksamhetsplan%20med%20budget%202026-2028.pdf',
    notion: 'Förhistorien: de fem utredningsuppdragen, kommunstyrelsens beslut 2025 om fastighetsbeståndet och lokalvården, och att kommungemensam service anslagsfinansieras från 2026.'
  },
  kf: {
    kort: 'Lunds kommun, 2026a',
    titel: 'Kommunfullmäktige – aktuella beslut mars 2026',
    url: 'https://lund.se/nyheter/aktuella-beslut/2026-03-26-kommunfullmaktige---aktuella-beslut-mars-2026-',
    notion: 'Själva beslutet den 26 mars att avveckla servicenämnden den 31 december 2026, och vad den nya fastighetsförvaltningen ska ansvara för.'
  },
  ks: {
    kort: 'Lunds kommun, 2026b',
    titel: 'Kommunstyrelsen – aktuella beslut mars 2026',
    url: 'https://lund.se/nyheter/aktuella-beslut/2026-03-04-kommunstyrelsen---aktuella-beslut-mars-2026',
    notion: 'Förslaget till kommunfullmäktige: ny fastighetsförvaltning under kommunstyrelsen, och att övriga serviceverksamheter "behöver utredas" för en framtida placering.'
  },
  nyhet: {
    kort: 'Lunds kommun, 2026c',
    titel: 'Nyhet 30 september 2026 om ledningen för den nya fastighetsförvaltningen [rubriken anger den utsedda direktörens namn]',
    url: 'https://lund.se/nyheter/nyheter/2026-09-30-magnus-procheus-blir-direktor-for-lunds-fastighetsforvaltning',
    notion: 'Vilka fem förvaltningar som tar över övriga verksamheter, att fastighetsförvaltningen rapporterar till kommunstyrelsen och att förändringen inte medför övertalighet.'
  },
  sn_feb: {
    kort: 'Lunds kommun, 2026d',
    titel: 'Servicenämnden – aktuella beslut februari 2026',
    url: 'https://lund.se/nyheter/aktuella-beslut/2026-02-13-servicenamnden---aktuella-beslut-februari-2026',
    notion: 'Belägger att den samlade lokalvården hamnar i serviceförvaltningen den 1 juli 2026, med medarbetare från tre förvaltningar.'
  },
  sn_sep: {
    kort: 'Lunds kommun, 2026e',
    titel: 'Servicenämnden – aktuella beslut i september',
    url: 'https://lund.se/nyheter/aktuella-beslut/2026-09-22-servicenamnden---aktuella-beslut-i-september',
    notion: 'Delårsrapport 2: prognos, årsanalys per 30 november, nämndens sista sammanträde 16 december och att budgeten för 2027 fördelas "i ett senare skede".'
  },
  ey: {
    kort: 'Revisorerna i Lunds kommun (EY), 2024',
    titel: 'Granskning av lokalförsörjning och entreprenadstyrning – Lunds kommun',
    url: 'https://lund.se/download/18.68b7cf2318df2d68cf71c6ae/1710407626669/Granskningsrapport%20lokalf%C3%B6rs%C3%B6rjning%20och%20entreprenadstyrning.pdf',
    notion: 'Cirka 450 fastighetsobjekt hos Lundafastigheter, internhyresmodellen sedan sommaren 2021, ekonomisystemet Raindance och kommunstyrelsens beslut 31 maj 2023.'
  },
  fu: {
    kort: 'Revisorerna i Lunds kommun, 2025',
    titel: 'Granskning av fastighetsunderhåll – Lunds kommun',
    url: 'https://lund.se/download/18.51e91fb719545edbc57c486/1741007059249/Granskning%20av%20fastighetsunderh%C3%A5ll%20Lunds%20kommun.pdf',
    notion: 'Hur internhyran är uppbyggd: självkostnadsprincip, schablon för planerat underhåll och kapitalkostnader.'
  }
};

/* ---------- Diagrammet: vänster sida (till 2026-12-31) ---------- */
const VANSTER = {
  rubrik: 'Till och med 31 december 2026',
  nod: {
    id: 'sn',
    namn: 'Servicenämnden',
    under: 'Upphör 2026-12-31',
    status: 'belagt',
    text: 'Bildades 2005 som en del av köp- och säljmodellen. Kommunfullmäktige beslutade den 26 mars 2026 att nämnden avvecklas vid årsskiftet. Nämndens sista sammanträde är flyttat till den 16 december.',
    kallor: ['kf', 'sn_sep']
  },
  forvaltning: {
    namn: 'Serviceförvaltningen',
    under: 'Sex avdelningar och fyra stödfunktioner'
  },
  avdelningar: [
    {
      id: 'fa', namn: 'Fastighetsförvaltning', mal: 'nyfast', status: 'indikerat',
      text: 'Förvaltar lokaler och bostäder för kommunens behov. Att den följer med till den nya fastighetsförvaltningen är en tolkning av att "fastighetsfrågor" samlas där. Källorna namnger inte avdelningen i fördelningen.',
      kallor: ['sf', 'ks', 'kf']
    },
    {
      id: 'fs', namn: 'Fastighetsservice', mal: 'nyfast', status: 'indikerat',
      text: 'Servar, har hand om och optimerar kommunens fastigheter. Kopplingen till den nya fastighetsförvaltningen är en tolkning, se ovan.',
      kallor: ['sf', 'ks', 'kf']
    },
    {
      id: 'fst', namn: 'Fastighetsstyrning', mal: 'nyfast', status: 'indikerat',
      text: 'Planerar, bygger och renoverar för att möta kommunens behov av lokaler. Den nya förvaltningen ska ansvara för lokalförsörjning och byggprojekt, men avdelningen namnges inte i källorna.',
      kallor: ['sf', 'kf']
    },
    {
      id: 'lv', namn: 'Lokalvård och service', mal: 'nyfast', status: 'indikerat', ny: 'Ny 1 juli 2026',
      text: 'Samlad avdelning för lokalvård från 1 juli 2026, med medarbetare från tre förvaltningar. Lokalvård ingår uttryckligen i den nya fastighetsförvaltningens ansvar. Att just den här avdelningen går dit i sin helhet är en tolkning, eftersom avdelningens namn även innehåller "service".',
      kallor: ['sn_feb', 'kf', 'sf']
    },
    {
      id: 'ms', namn: 'Måltidsservice', mal: 'ovriga', status: 'ospecificerat',
      text: 'Tillagar och levererar måltider, främst inom grundskola, gymnasieskola och äldreboenden. Måltidsverksamhet ska organiseras under andra nämnder, men källorna säger inte under vilken av de fem förvaltningarna.',
      kallor: ['sf', 'kf', 'nyhet']
    },
    {
      id: 'ti', namn: 'Transport- och internservice', mal: 'ovriga', status: 'ospecificerat',
      text: 'Består av enheterna Persontransporter samt Mobilitetsservice och verkstad. Mobilitetstjänster och interna servicefunktioner ska organiseras under andra nämnder, men källorna säger inte under vilken.',
      kallor: ['sf', 'kf', 'nyhet']
    }
  ],
  stod: {
    id: 'stod', namn: 'Stödfunktioner', mal: ['nyfast', 'ovriga'], status: 'ospecificerat',
    delar: ['Ekonomi', 'Stöd och utveckling', 'HR', 'Kommunikation'],
    text: 'Serviceförvaltningen har stödfunktioner för ekonomi, stöd och utveckling, HR och kommunikation. Ingen källa jag har läst säger hur de fördelas när förvaltningen upphör. Den nya fastighetsförvaltningen behöver rimligen egna stödfunktioner, men hur de byggs upp är inte offentligt.',
    kallor: ['sf', 'nyhet']
  }
};

/* ---------- Diagrammet: höger sida (från 2027-01-01) ---------- */
const HOGER = {
  rubrik: 'Från 1 januari 2027',
  ks: {
    id: 'ks', namn: 'Kommunstyrelsen', under: 'Beslutande organ och fastighetsägare', status: 'belagt',
    text: 'Kommunstyrelsen är redan i dag fastighetsägare och fattar de strategiska besluten om beståndet. Den nya fastighetsförvaltningen rapporterar till kommunstyrelsen.',
    kallor: ['nyhet', 'ks']
  },
  nyfast: {
    id: 'nyfast', namn: 'Fastighetsförvaltning', under: 'Ny förvaltning under kommunstyrelsen', status: 'belagt',
    uppdrag: ['Strategiskt fastighetsägande', 'Drift och service', 'Lokalförsörjning', 'Byggprojekt', 'Lokalvård'],
    text: 'Ny förvaltning från 1 januari 2027 för fastighetsfrågor inklusive lokalvård. Servicedirektören blir fastighetsdirektör.',
    kallor: ['kf', 'ks', 'nyhet']
  },
  ovriga: {
    id: 'ovriga', namn: 'Övriga serviceverksamheter', under: 'Fördelas på fem förvaltningar', status: 'ospecificerat',
    mottagare: [
      'Barn- och skolförvaltningen',
      'Samhällsbyggnadsförvaltningen',
      'Arbetsmarknads- och socialförvaltningen',
      'Lunds renhållningsverk',
      'Kommunkontoret'
    ],
    text: 'Kommunen anger vilka fem som tar över, men inte vilken verksamhet som går till vilken. I mars stod att övriga serviceverksamheter "behöver utredas" för en lämplig placering, och att arbetet ska ske i dialog med berörda förvaltningar och fackliga parter.',
    kallor: ['nyhet', 'ks']
  },
  noteringar: ['Förändringen medför ingen övertalighet bland medarbetarna (Lunds kommun, 2026c).']
};

/* ---------- Tidslinje ---------- */
const TIDSLINJE = [
  { datum: '2023-05-31', text: 'Kommunstyrelsen beslutar att tydliggöra ansvar och organisering av kommunkoncernens fastighetsbestånd.', kallor: ['ey'] },
  { datum: '2025-01-01', text: 'Samlad samhällsbyggnadsförvaltning bildas.', kallor: ['evp'] },
  { datum: '2025-06-04', text: 'Kommunstyrelsen beslutar om förändrad ansvarsfördelning och styrning av fastighetsbeståndet.', kallor: ['evp'] },
  { datum: '2025-08-20', text: 'Kommunstyrelsens inriktningsbeslut: kommunens lokalvård ska samlas i en organisation.', kallor: ['evp'] },
  { datum: '2026-01-01', text: 'Kommungemensam service (bland annat ekonomiservice) anslagsfinansieras under kommunstyrelsen, för att lämna det interna köp/sälj-förfarandet.', kallor: ['evp'] },
  { datum: '2026-03-26', text: 'Kommunfullmäktige beslutar att servicenämnden avvecklas den 31 december 2026.', kallor: ['kf'] },
  { datum: '2026-07-01', text: 'Den samlade lokalvården blir en avdelning i serviceförvaltningen.', kallor: ['sn_feb'] },
  { datum: '2026-09-16', text: 'Servicenämnden fastställer delårsrapport 2: prognos om 9,7 miljoner kronor i underskott för helåret.', kallor: ['sn_sep'] },
  { datum: '2026-09-30', text: 'Kommunstyrelsen utser direktör för den nya fastighetsförvaltningen.', kallor: ['nyhet'] },
  { datum: '2026-11-30', text: 'Årsanalysen för nämnden baseras på läget denna dag.', kallor: ['sn_sep'] },
  { datum: '2026-12-16', text: 'Servicenämndens sista sammanträde (flyttat från 2 december).', kallor: ['sn_sep'] },
  { datum: '2026-12-31', text: 'Servicenämnden upphör.', kallor: ['kf'] },
  { datum: '2027-01-01', text: 'Ny fastighetsförvaltning under kommunstyrelsen. Övriga verksamheter fördelas på fem förvaltningar. Nämndens budget fördelas "i ett senare skede".', kallor: ['nyhet', 'sn_sep'] }
];

/* ---------- Öppna frågor i ekonomistrukturen ---------- */
const OPPNA = [
  {
    rubrik: 'Vad ersätter internhyran?',
    status: 'ospecificerat',
    text: 'Internhyresmodellen är ny sedan sommaren 2021 och bygger på självkostnad, med schablon för planerat underhåll och kapitalkostnader. Ett av kommunens utredningsuppdrag är att ta fram en styrmodell som kan ersätta köp/sälj-förfarandet. För kommungemensam service har kommunen redan gått över till anslag från 2026. Inget beslut om hur det blir för fastigheterna från 2027 har hittats i de källor som lästs.',
    kallor: ['ey', 'fu', 'evp']
  },
  {
    rubrik: 'Hur många objekt berörs?',
    status: 'belagt',
    text: 'Lundafastigheter, den del av serviceförvaltningen som förvaltar fastigheter, förvaltar cirka 450 fastighetsobjekt. Det är revisionens uppgift från 2024. Om objekten byter ansvarsställe eller bara kvarstår under en ny förvaltning är inte offentligt.',
    kallor: ['ey']
  },
  {
    rubrik: 'Hur ser objektnumreringen ut?',
    status: 'ospecificerat',
    text: 'Kommunen använder ekonomisystemet Raindance. Hur fastighetsobjekten är numrerade hos ägarsidan respektive hyresgästsidan framgår inte av de öppna källorna.',
    kallor: ['ey']
  },
  {
    rubrik: 'Vem gör själva ändringen i ekonomisystemet?',
    status: 'ospecificerat',
    text: 'Ekonomiservice ingår i den kommungemensamma servicen under kommunstyrelsen från 2026. Hur arbetet fördelas mellan ekonomiservice och controllers vid ändringar av ansvarsstruktur framgår inte av de öppna källorna.',
    kallor: ['evp']
  },
  {
    rubrik: 'Budgeten för 2027',
    status: 'belagt',
    text: 'Eftersom servicenämnden upphör vid nyår ska dess budget "i ett senare skede" fördelas på de nämnder och förvaltningar som tar över verksamheterna.',
    kallor: ['sn_sep']
  },
  {
    rubrik: 'Den nya förvaltningens ekonomifunktion',
    status: 'ospecificerat',
    text: 'Hur ekonomifunktionen byggs upp i den nya fastighetsförvaltningen beskrivs inte i de öppna källorna.',
    kallor: ['sf', 'nyhet']
  }
];

const STATUS_TEXT = {
  belagt: 'Belagt',
  indikerat: 'Indikerat',
  ospecificerat: 'Ospecificerat'
};
