---
name: kent-paverka-ai-verktyg
description: Kents arbetssätt för att vara med och påverka hur AI-verktyg som Claude utformas — hitta befintligt önskemål på GitHub, rösta (👍) på rätt ställe, kommentera med konkret användning, skapa nytt ärende vid behov, och logga vad som gjorts. Använd när Kent saknar en funktion eller blir irriterad på ett beteende i Claude/Claude Code/Cursor eller annat AI-verktyg, när han nämner "rösta", "feature request", "issue", "önskemål till Anthropic", eller vill följa upp ett tidigare önskemål. Läs LOGG.md för vad som redan gjorts.
---

> **KOPIA.** Originalet ligger i `C:\Users\kentl\.claude\skills\kent-paverka-ai-verktyg\`. Den här filen är en kopia, uppdaterad 2026-10-02, så att innehållet syns i den här mappen. Ändra originalet, inte kopian. Kopian laddas inte som skill och uppdateras inte automatiskt.

# Påverka utvecklingen av AI-verktyg

Kent vill vara delaktig i hur AI-verktygen utformas, inte bara användare av dem. Den här skillen är både arbetsgången och minnet av vad han redan gjort, så att han blir bättre på det för varje gång.

Bakgrund: 2026-10-02 röstade och kommenterade Kent för första gången på GitHub, på önskemålet om att Enter inte ska skicka meddelandet i Claude-appens Code-flik. Se `LOGG.md`.

## Arbetsgång

1. **Formulera problemet i en mening, och det önskade beteendet i en annan.** Konkret, utan lösningsförslag som är viktigare än problemet. Exempel: "Jag skickar halvfärdiga meddelanden av misstag när jag trycker Enter" och "Enter ska ge ny rad, skicka sker med klick eller Ctrl+Enter".
2. **Sök efter befintliga ärenden först.** För Claude Code och Claude-appens Code-flik: `https://github.com/anthropics/claude-code/issues`. Sök på flera ord, på engelska. Det finns ofta flera ärenden om samma sak.
3. **Rösta på ett ärende: lägg 👍 på det första inlägget** (smileyn nere till vänster i ärendets första ruta). En kommentar räknas inte som röst. Det räcker att rösta på ett av flera närliggande ärenden.
4. **Kommentera bara om du har något att tillföra.** Skriv hur och varför du drabbas, konkret och kort, på engelska. "Jag vill också ha den" ger mindre än en mening om den egna situationen. Kents första kommentar är ett bra mått på längd.
5. **Finns inget ärende:** skapa ett nytt med problem, önskat beteende, nuläge (vad som går att göra idag) och miljö (app, version, operativsystem).
6. **Logga i `LOGG.md`** direkt: datum, ärende, vad Kent gjorde och status.
7. **Följ upp.** Fråga Kent efter någon vecka eller månad om ärendet har fått svar eller stängts, och uppdatera loggen.

## Vad Claude får och inte får göra

- Claude hjälper till att söka, formulera och logga.
- **Claude röstar, kommenterar och skapar ärenden aldrig åt Kent** utan att han uttryckligen ber om det i just den stunden. Det är publicering i hans namn. Normalt gör Kent det själv.
- Skriv aldrig in i en kommentar eller i loggen att Kent har gjort eller testat något som han inte har gjort. Se Regel 13 i `kent-meta-regler-for-code`.
- Antalet röster visar intresse, men säger inget om att eller när Anthropic bygger funktionen. Lova det aldrig.

## Lärdomar hittills

- Kommentar är inte röst. 👍 på första inlägget är den röst som räknas i reaktionsantalet och kostar en sekund. En kommentar ger sammanhang. Hur Anthropic väger dem mot varandra är inte känt, så skriv inte att det ena är viktigare. Gör gärna båda när det finns något konkret att tillägga.
- **Läs de senaste kommentarerna innan du rekommenderar ett ärende.** Ett öppet ärende kan redan vara delvis löst (som #20697, där kommentarer säger att synk av skills delvis finns). Då är en kommentar om vad som återstår värd mer än en ren 👍.
- Att reaktionsantalet har gått upp med ett och knappen är blåmarkerad på en skärmbild räcker som belägg för att röstningen gick igenom.
- Rösta på ett ärende per önskemål, inte på alla närliggande.
- **Kontrollera status innan du rekommenderar ett ärende.** Tidigare önskemål om samma sak (#33034 och #54433) var stängda som "not planned" och låsta, så varken röst eller kommentar går att lägga där. Det går att se med `gh issue view <nummer> --repo anthropics/claude-code --json state,stateReason`. Ett stängt ärende betyder inte att önskemålet är dött: #95125 öppnades senare och är öppet.
- Skriv kommentaren med egna ord om den egna situationen. Kents första kommentar blev ordagrant lika med en annan användares kommentar dagen före, vilket tillför mindre än en egen mening om hur han arbetar.
- För Claude-appens Code-flik fanns, enligt ärendetexterna (inte testat av oss), ingen synlig inställning för tangentbordsbeteende, och `keybindings.json` verkar ignoreras där även om den fungerar i terminalversionen.
- Skriv inte under ett skärmklipp eller en bild av en kommentar som bevis. Länka ärendet.

## Synk-not

Skillen finns bara i `C:\Users\kentl\.claude\skills\kent-paverka-ai-verktyg\` (Claude Code). Det finns ingen kopia i Cowork (AppData) eller på kontonivå (claude.ai). Se Regel 4 i `kent-meta-regler-for-code`.

## Uppdateringslogg

- 2026-10-02 (v1): Skapad efter att Kent röstat och kommenterat på `anthropics/claude-code#95125`.
- 2026-10-02 (v2): Andra posten i loggen, `#20697` (skills mellan Claude Code och Cowork). Lärdomar justerade: påstå inte att en röst väger tyngre än en kommentar, och läs de senaste kommentarerna innan ett ärende rekommenderas.
