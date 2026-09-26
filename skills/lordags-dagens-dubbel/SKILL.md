---
name: lordags-dagens-dubbel
description: Tippa lördagens ATG Dagens Dubbel (DD) i ett litet 35-45 kr-system à 5 kr per rad. Använd när användaren ber om dagens dubbel, DD-tips, lördagstrav, 5-kronors tips, skräll i DD eller utfallslogg efter omgången. Bygger en lärande logg omgång för omgång.
metadata:
  type: workflow
  version: "1.0"
  created_via: conversation
  purpose: Small Saturday DD systems with one value horse and post-race learning log
  created: 2026-09-26
  last_updated: 2026-09-26 10:58 CEST (Stockholm)
---

## Senaste ändringar

- **2026-09-26 10:58 CEST (Stockholm)**: Repo-kopia i kentlundgren/Grok under skills/ plus live-app dagens-dubbel.
- **2026-09-26 10:50 CEST (Stockholm)**: Skapade skill:et efter låsta val — budget 35–45 kr, bara lördags-DD, en skräll i ett lopp, utfallslogg efter varje omgång. Första caset Åby SM-lördag 26 september 2026.

# Lördagens Dagens Dubbel

Tippa **enbart lördagens Dagens Dubbel** hos ATG. Målet är ett litet system på **35–45 kronor** med **5 kronor per rad**, med **en skräll (högoddsare med reell chans) i ett av de två loppen**.

Familjens gemensamma logg och live-sida ligger i samma repo: [dagens-dubbel](https://kentlundgren.github.io/Grok/dagens-dubbel/).

Detta är **inte** ett V85-system och inte Lunchdubbel. Andra veckodagar hör inte hit om användaren inte uttryckligen ber om ett undantag.

## Spelfakta att aldrig blanda ihop

- DD = hitta vinnaren i **två utpekade lopp** (oftast de två sista V85-avdelningarna på lördag).
- Antal rader = hästar i DD-1 × hästar i DD-2.
- Vinst = insats per rad × DD-oddset. En rätt lopp ger noll.
- Struken häst = återbetalning för de kombinationer hästen ingår i.
- Lägsta insats är 5 kr per rad. Standard här är 5 kr.

Tillåtna systemstorlekar: 3×3 = 45 kr, 4×2 eller 2×4 = 40 kr.

## Ansvar

Spela bara med pengar som tål att försvinna. 18+. Länk till ATG:s spelansvar vid varje leverans.

## Arbetsgång varje lördag

1. Identifiera bana, DD-1 och DD-2 via ATG. Anta inte att det alltid är V85-7/8.
2. Hämta startlistor, streck och strykningar.
3. Läs minst tre oberoende källor.
4. Klassificera hästar: tung, motbud, skrällkandidat, bort.
5. Välj exakt en skräll i ett lopp.
6. Bygg 8 eller 9 rader för 40 eller 45 kr.
7. Skriv leveransen. Logga utfall efter omgången i references/utfalls-logg.md och i dagens-dubbel/data/ÅÅMMDD.json.

## Cross-references

- `fraga-forst`, `kent-referens`, `skill-creation-best-practices`
- Live-app: https://kentlundgren.github.io/Grok/dagens-dubbel/
