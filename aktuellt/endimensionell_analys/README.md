# Endimensionell analys

- **Live:** [https://kentlundgren.github.io/Grok/aktuellt/endimensionell_analys/](https://kentlundgren.github.io/Grok/aktuellt/endimensionell_analys/)

Startsida med kort intro och **quiz** (lätt, medel, svår — tre frågor per nivå om medelvärde, mellanliggande värden och extremvärde). Därefter den interaktiva visualiseringen i [app.html](app.html).

Satserna följer första matematikkursen *endimensionell analys* på LTH:

- medelvärdessatsen
- satsen om mellanliggande värden
- extremvärdessatsen

I visualiseringen: dra i ändpunkterna a och b, byt kurva, eller välj motexempel (språng, öppet intervall). Quizlänkar öppnar rätt flik, t.ex. `app.html?tab=ivt&mode=jump`.

Filer:

| Fil | Roll |
| --- | --- |
| `index.html` | Intro, quiz, Open Graph |
| `framsida.css`, `quiz.js`, `intro-carousel.js` | Stil, quiz och växlande satsbilder på startsidan |
| `bilder/intro-*.svg` | Tre förhandsbilder (medelvärde, mellanvärde, extremvärde) |
| `app.html` | SVG-visualisering (tidigare enda `index.html`) |
| `og-bild.jpg` | Förhandsvisning vid delning av länk |
