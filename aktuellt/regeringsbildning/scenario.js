// Enda datakällan för sidan. index.html och app.js innehåller ingen kopia av detta.
// Filen är JavaScript och inte ren JSON, så att sidan fungerar även när index.html öppnas som file://.
//
// Tre nivåer:
//   meta, mandates, axes  – gäller alla körningar
//   scenarios             – det som inte ändras mellan körningar (rutans titel och etikett, mandatmatematik, vilka som måste avstå)
//   snapshots             – en post per körning: procent, hinder, tecken att bevaka, omprövning och förlopp
//
// Ny körning = ny post sist i `snapshots`, med eget `asOf`. Skriv aldrig över en tidigare post.
window.SCENARIO = {
  meta: {
    caseId: "regeringsbildning-2026",
    title: "Fyra sätt Sverige kan få en regering",
    electionDay: "2026-09-13",
    resultEstablished: "2026-09-19",
    thesis: "Generativ AI kan tvinga fram fyra åtskilda, källbelagda regeringsutfall och därefter ompröva dem. Sidan visar styrda analyser vid olika tidpunkter, inte ett mätresultat och inte en prognos som gäller efter nya besked.",
    probabilityNote: "Procenten är analytiska uppskattningar. De togs fram av AI-modellen vid den tidpunkt som står vid varje körning, summerar till 100 och är inte en objektiv mätning."
  },

  mandates: {
    total: 349,
    rejectAt: 175,
    rule: "Ett statsministerförslag är godkänt om färre än 175 ledamöter röstar nej. Avstående och frånvaro är inte nej.",
    left: { label: "S, V, MP och C", seats: 176, parties: { S: 99, V: 30, MP: 22, C: 25 } },
    tido: { label: "M, SD, KD och L", seats: 173, parties: { M: 70, SD: 62, KD: 22, L: 19 } }
  },

  axes: {
    x: { name: "Röda linjer", left: "Kompromissvilja", right: "Låsning" },
    y: { name: "Regeringsunderlag", top: "Tydlig koalition", bottom: "Lösare underlag eller institutionell osäkerhet" }
  },

  scenarios: [
    {
      id: "s1",
      quadrant: "kompromiss-koalition",
      quadrantLabel: "Kompromiss · koalition",
      title: "S, MP och C i regeringen, V utanför med avtal",
      primeMinister: "Magdalena Andersson (S)",
      inGovernment: ["S", "MP", "C"],
      governmentSeats: 146,
      mustTolerate: "V avstår eller röstar ja. Tidösidans 173 nej räcker då inte.",
      math: "Tidö kan ensamt samla 173 nej, två under spärren. V behöver alltså inte rösta ja, bara låta bli att rösta nej.",
      concession: "V lägger kravet på statsrådsposter åt sidan. C accepterar ett organiserat stöd från V.",
      faces: [
        { src: "bilder/andersson.jpg", name: "Magdalena Andersson", party: "S" },
        { src: "bilder/mp-sprakror.jpg", name: "Amanda Lind och Daniel Helldén", party: "MP" },
        { src: "bilder/thand-ringqvist.jpg", name: "Elisabeth Thand Ringqvist", party: "C" }
      ]
    },
    {
      id: "s2",
      quadrant: "lasning-koalition",
      quadrantLabel: "Låsning · koalition",
      title: "Tidö åter som koalition",
      primeMinister: "Ulf Kristersson (M)",
      inGovernment: ["M", "KD", "L", "SD"],
      governmentSeats: 173,
      // Rättat 2026-10-02: stod "Minst 24 ledamöter". Med 173 ja och 176 möjliga nej räcker det att två ledamöter avstår.
      mustTolerate: "Minst 2 av de 176 möjliga nej-rösterna i S, V, MP och C måste utebli, genom avstående eller ja-röst. S, V och MP har 151, så i praktiken är det C som avgör.",
      math: "S, V och MP har 151 mandat. Tillsammans med C finns 176 möjliga nej-röster, en över spärren på 175. Därför räcker det rent matematiskt att två ledamöter inte röstar nej.",
      concession: "C skulle behöva acceptera SD i regeringen, trots att C utesluter SD-inflytande.",
      faces: [
        { src: "bilder/kristersson.jpg", name: "Ulf Kristersson", party: "M", note: "illustration" },
        { src: "bilder/akesson.jpg", name: "Jimmie Åkesson", party: "SD" },
        { src: "bilder/busch.jpg", name: "Ebba Busch", party: "KD" },
        { src: "bilder/mohamsson.jpg", name: "Simona Mohamsson", party: "L" }
      ]
    },
    {
      id: "s3",
      quadrant: "kompromiss-lost",
      quadrantLabel: "Kompromiss · löst underlag",
      title: "M, KD och L i minoritet, C avstår, SD utanför",
      primeMinister: "Ulf Kristersson (M)",
      inGovernment: ["M", "KD", "L"],
      governmentSeats: 111,
      mustTolerate: "C avstår. SD röstar ja eller avstår, utan givna ministerposter.",
      math: "S, V och MP har 151 nej. Det är under 175 om C inte röstar nej.",
      concession: "C går från processbesked till att inte fälla. SD accepterar att stå utanför trots vallöftet om ministerposter.",
      faces: [
        { src: "bilder/kristersson.jpg", name: "Ulf Kristersson", party: "M", note: "illustration" },
        { src: "bilder/busch.jpg", name: "Ebba Busch", party: "KD" },
        { src: "bilder/mohamsson.jpg", name: "Simona Mohamsson", party: "L" }
      ]
    },
    {
      id: "s4",
      quadrant: "lasning-osakerhet",
      quadrantLabel: "Låsning · osäkerhet",
      title: "Låsning, skarpa prövningar och väg mot extra val",
      primeMinister: "Ingen kandidat tolereras i detta utfall",
      inGovernment: [],
      governmentSeats: 0,
      mustTolerate: "Inget parti behöver byta linje. Det är själva låsningen.",
      math: "Andersson faller om V röstar nej tillsammans med Tidösidan, 203 nej. Kristersson faller om C röstar nej tillsammans med S, V och MP, 176 nej.",
      concession: "Ingen eftergift krävs för att utfallet ska inträffa. Extra val följer först efter fyra förkastade statsministerförslag, enligt regeringsformen 6 kap. 5 §.",
      faces: []
    }
  ],

  snapshots: [
    {
      id: "2026-10-02-0819",
      asOf: "2026-10-02T08:19:00+02:00",
      asOfLabel: "2 oktober 2026 kl 08:19",
      asOfShort: "2 okt kl 08:19",
      context: "före talmannens pressträff klockan 11",
      model: "Grok (xAI)",
      promptFile: "prompt2.md",
      firstPromptFile: "prompt1.md",
      video: "video/261002_parlamentarisk_fyrfaltare.mp4",
      originalImage: "bilder/Hur_löser_sig_parlamentariska_läget_02_fyrfältare.jpg",
      scenarios: {
        s1: {
          probability: 28,
          obstacles: "Den 18–25 september sade båda nej till just detta. V upprepade regeringskravet, C uteslöt V från regeringen.",
          watch: "Gemensam pressträff, skriftligt stödavtal, eller att V slutar kräva statsrådsposter."
        },
        s2: {
          probability: 12,
          obstacles: "Ingen öppning för SD i regeringen var belagd på morgonen den 2 oktober. C:s offentliga linje och en möjlig nej-majoritet på 176. Före valet lovade M och L SD ministerposter, men det skapar inte egna mandat.",
          watch: "C säger att SD kan tolereras, eller enskilda C-ledamöter aviserar att de inte röstar nej."
        },
        s3: {
          probability: 30,
          obstacles: "C utesluter SD-inflytande även utifrån. Åkesson ville den 29 september pröva Andersson, inte sondera en försvagad Tidö.",
          watch: "Kristersson får sonderingsuppdraget och C talar om passivt stöd."
        },
        s4: {
          probability: 30,
          obstacles: "Hindret mot en regering är de linjer som ligger kvar. Hindret mot extra val är att ett avstående är billigare än ett val.",
          watch: "Första nej-omröstningen, att Åkesson upprepar att extra val vore bra, eller att talmannen närmar sig fjärde försöket."
        }
      },
      review: {
        chosenId: "s4",
        interval: "30–40 %",
        point: "30 %",
        why: "Ingen belagd öppning räckte till de tre andra utfallen på morgonen den 2 oktober. Närmaste verifierade linjen var Tidösidans krav på en skarp omröstning om Andersson. Den faller om V gör som partiet har sagt.",
        objection: "Svenska partier fullföljer sällan ett extra val när ett avstående räcker. V kan låta bli att fälla Andersson utan att sitta i regeringen. C kan låta bli att fälla Kristersson. Därför var ruta 3 och ruta 4 i praktiken jämnstarka tills någon röst aviseras.",
        wouldChange: [
          "Talmannen ger ett sonderingsuppdrag med ett uttalat underlag.",
          "V säger att partiet kan tolerera en regering utan egna statsråd.",
          "C säger att partiet inte tänker rösta nej till Kristersson.",
          "SD avstår skriftligt från ministerposter."
        ]
      },
      process: [
        { date: "2026-09-13", text: "Valdag." },
        { date: "2026-09-18", text: "Talmannen ger Magdalena Andersson sonderingsuppdrag." },
        { date: "2026-09-19", text: "Valmyndigheten fastställer resultatet: 176 mot 173." },
        { date: "2026-09-28", text: "Andersson lämnar tillbaka uppdraget. Norlén omväljs till talman med stöd av V och Tidösidan." },
        { date: "2026-09-30", text: "Ny samtalsserie. Inget nytt sonderingsuppdrag." },
        { date: "2026-10-02", text: "Analysen görs på morgonen. Pressträff med talmannen är utsatt till klockan 11 och har inte hållits." }
      ]
    }
  ]
};
