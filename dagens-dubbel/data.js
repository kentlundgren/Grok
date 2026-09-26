/* Snapshot av data/ så index.html fungerar både på GitHub Pages och som lokal fil.
 * Källa att redigera: data/weeks.json + data/ÅÅMMDD.json.
 * När du ändrar JSON: uppdatera även denna fil, annars ser file:// den gamla snapshoten.
 */
window.DD_INDEX = {
  title: "Familjens lördags-DD",
  stakeDefault: 5,
  budgetMin: 35,
  budgetMax: 45,
  tipsters: ["Kent", "Lotta", "Benita", "Bengt"],
  weeks: ["260926"]
};

window.DD_WEEKS = [
  {
    id: "260926",
    date: "2026-09-26",
    weekday: "lördag",
    track: "Åby",
    start: "17:13",
    comment: "SM-lördag. 6 Epic Kronos struken i DD-2 (hovböld).",
    races: {
      dd1: { label: "V85-7 / DD-1", distance: "2140 m volt", startApprox: "17:13" },
      dd2: { label: "V85-8 / DD-2 Svenskt Mästerskap", distance: "2640 m auto", startApprox: "17:35" }
    },
    result: { status: "pending", dd1Winner: null, dd2Winner: null, ddOdds: null, updated: null },
    tips: [
      {
        person: "Kent",
        status: "inlämnad",
        submitted: "2026-09-26 10:45",
        cost: 45,
        stake: 5,
        rows: 9,
        system: "3x3",
        dd1: [2, 12, 15],
        dd2: [1, 2, 10],
        names: {
          dd1: { "2": "Monnier Mearas", "12": "Just for Show", "15": "Halina S.H." },
          dd2: { "1": "Boscha Diablo", "2": "Kentucky River", "10": "A Fair Day" }
        },
        scratch: "15 Halina S.H. i DD-1",
        coupon: "260926/kupong-kent.png",
        note: "Samma system som skill:et lordags-dagens-dubbel föreslog."
      },
      {
        person: "Lotta",
        status: "saknas",
        submitted: null,
        cost: null,
        stake: 5,
        rows: null,
        system: null,
        dd1: [],
        dd2: [],
        names: {},
        scratch: null,
        coupon: null,
        note: "Fylls i när tipset kommer."
      },
      {
        person: "Benita",
        status: "saknas",
        submitted: null,
        cost: null,
        stake: 5,
        rows: null,
        system: null,
        dd1: [],
        dd2: [],
        names: {},
        scratch: null,
        coupon: null,
        note: "Fylls i när tipset kommer."
      },
      {
        person: "Bengt",
        status: "saknas",
        submitted: null,
        cost: null,
        stake: 5,
        rows: null,
        system: null,
        dd1: [],
        dd2: [],
        names: {},
        scratch: null,
        coupon: null,
        note: "Kompis som också tippar lördagens DD. Hästar fylls i när tipset kommer."
      }
    ]
  }
];
