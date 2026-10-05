# Skills i repot – så hålls de lika i Grok, Cursor, Claude och andra

Den här filen beskriver hur skills hanteras i `kentlundgren/Grok`: vad som är original, kopia och pekare, vad som är gjort, och steg för steg hur man ändrar och synkar dem. Den är skriven för ägaren (Kent) att läsa nu och senare. Ingen live-sida: mappen är en arbetsmapp för agenter.

Skriven av Claude Code (Sonnet 5.5), 2026-10-05. Ägaren granskar. Där något inte är verifierat står det.

---

## 1. Målet

1. Skills ska säga **samma sak** oavsett vilket verktyg som läser dem: Grok, Cursor, Claude Code och, vid behov, ChatGPT och Gemini.
2. Varje skill ska ha **ett original**. Allt annat är en kopia eller en pekare, och märks så.
3. Ägaren ska kunna **göra processen själv**, utan att gissa var något ligger.

Bakgrund: `AGENTS.md` säger att samma regel inte ska skrivas på flera ställen (avsnittet "Om du tar över mitt i arbetet", punkt 6). Skills som driver isär är det som `ai-minne-formagor-organisation` varnar för.

---

## 2. Tre begrepp

| Begrepp | Vad det är | Exempel |
| --- | --- | --- |
| **Original** | Den enda text som gäller. Ändra den först. | Groks interna skill `controllerrollen-generativ-ai` |
| **Kopia** | En avstämd kopia av originalet, lagd i repot (här i `.agents/skills/`, ett äldre mönster, se avsnitt 3). Märkt som kopia, med avstämningsdatum. | `.agents/skills/controllerrollen-generativ-ai/` |
| **Pekare** | En liten fil som bara säger "läs kopian där". Innehåller ingen regel. | `.claude/skills/controllerrollen-generativ-ai/SKILL.md` |

Regeln: **originalet först, kopian efteråt, pekaren ändras sällan.** Skriv aldrig om en regel i kopian på egen hand.

---

## 3. Var verktygen läser

Enligt `AGENTS.md` (avsnittet "Skills: var de ska ligga") gäller:

| Verktyg | Läser | Kommentar |
| --- | --- | --- |
| Claude Code och Cursor | `.claude/skills/` | Huvudregeln i `AGENTS.md`: skills ligger direkt under repots rot i `.claude/skills/<namn>/`. |
| Grok Build | `.grok/skills/` | Enligt `AGENTS.md` listar xAI:s dokumentation `.grok/skills/`. Vill man att Grok Build ska använda en skill lägger man en tunn pekare där. |
| ChatGPT, Gemini | Ingen automatisk läsning beskriven här | Controller-skillen säger att filen kan läggas i projektinstruktion, Gem eller custom instructions. Rollen för ChatGPT och Gemini är inte beskriven i `AGENTS.md`. Fråga ägaren, gissa inte. |

**Det här repots skills följer ett äldre mönster.** De ligger i `.agents/skills/` med pekare i `.claude/skills/`. `AGENTS.md` säger att det mönstret är äldre, och att det inte är verifierat att Grok hittar `.agents/skills/` på projektnivå. Kontrollera med `grok inspect` innan mönstret kopieras till en ny skill.

Det betyder att pekarna i `.claude/skills/` är det som verkligen läses av Claude Code, medan kopian i `.agents/skills/` är där texten bor. Att Cursor och Claude Code laddar skillsen i en ny session är **inte verifierat** (se AGENTLOGG 2026-10-05).

---

## 4. Läget just nu (2026-10-05)

| Skill | Original | Kopia i `.agents/skills/` | Pekare i `.claude/skills/` | Versioner |
| --- | --- | --- | --- | --- |
| `ai-minne-formagor-organisation` | Grok | Ja, en förkortad egen version, utan `references/` | Ja | Kopia 1.2, originalet 1.1 |
| `controllerrollen-generativ-ai` | Grok | Ja, med `references/` | Ja | Kopia och original 1.6 |
| `kodsatt-agentic-engineering` | Grok | Ja, avstämd 2026-10-05 | Ja | 1.0 |
| `koldioxidlagring-villkor` | Originalet ligger i repot | Är originalet | Ja | Ej genomgången här |
| `generativ-ai-privat-och-professionellt` | Ligger i repot (skriven av Claude Code, version 0.1) | Är originalet | Ja | 0.1 |

Öppet beslut: ska `generativ-ai-privat-och-professionellt` bo kvar i repot, eller även ligga i Groks skill-lager? Grok har enligt egen rapport inte rört den, och tills du beslutar är repots fil originalet.

---

## 5. Vad som har gjorts (kronologiskt)

1. Kopior av Groks skills `kodsatt-agentic-engineering`, `ai-minne-formagor-organisation` och `controllerrollen-generativ-ai` lades i `.agents/skills/`, med pekare i `.claude/skills/` för de två första.
2. Pekaren för `controllerrollen-generativ-ai` saknades. Claude Code såg därför inte skillen. Den lades till.
3. En ny skill, `generativ-ai-privat-och-professionellt`, skrevs för frågan hur generativ AI kan och bör hanteras privat och professionellt, och när rollerna flyter ihop. Den är tunn och pekar på de två andra skillsen i stället för att upprepa dem. Pull request: [kentlundgren/Grok#5](https://github.com/kentlundgren/Grok/pull/5) (ihopslagen).
4. Förslag till ändringar i Groks original skrevs i `generativ-ai-privat-och-professionellt/forslag-till-original.md`.
5. Grok ändrade sina original (controller-skillen till 1.6, enligt Groks egen rapport, inte kontrollerad här) och rapporterade vad kopiorna skulle ändras till.
6. Kopiorna uppdaterades så att de följer originalen: version 1.6, nya cross-referenser och en mening om pro bono i `erfarenheter.md`. Pull request: [kentlundgren/Grok#6](https://github.com/kentlundgren/Grok/pull/6) (ihopslagen).
7. Grenen `claude/focused-pascal-yb1gps` raderades på GitHub och på ägarens dator (se avsnitt 6C, med bilder).
8. Avsnitt 3 i den här filen rättades efter att `AGENTS.md` fått avsnittet "Skills: var de ska ligga".

---

## 6. Så gör du – steg för steg

### A. Ändra en skill (hela kedjan)

1. **Ändra originalet först.** För Groks skills: be Grok (i Grok Build) att ändra sitt original. Be den visa en diff och fråga innan den skriver.
2. **Be om en lista över vad kopian ska få.** Exakt vilka rader, nytt versionsnummer och avstämningsdatum.
3. **Uppdatera kopian i repot** (`.agents/skills/<namn>/`) på en ny gren, inte på `main`. Ändra bara det listan säger.
4. **Pekaren** i `.claude/skills/<namn>/SKILL.md` ändras bara om skillens namn eller beskrivning ändras.
5. **Logga** i `AGENTLOGG.md`: en ny post överst med vad som ändrades, vad som är verifierat och vad som återstår.
6. **Granska och slå ihop** via en pull request (nästa avsnitt).

### B. Pull request, steg för steg (GitHub + Cursor)

En pull request (PR) är en begäran om att slå ihop en gren med `main`. Inget ändras på `main` förrän du själv trycker Merge.

1. Någon (agenten eller du) pushar ändringarna till en **gren**, till exempel `claude/focused-pascal-yb1gps`.
2. Öppna [https://github.com/kentlundgren/Grok/pulls](https://github.com/kentlundgren/Grok/pulls). Klicka på pull requesten, eller på **New pull request** och välj grenen.
3. Fliken **Files changed**: läs exakt vad som läggs till och tas bort. Rött är borttaget, grönt är tillagt.
4. Fliken **Conversation**: klicka **Merge pull request**, sedan **Confirm merge**.
5. Klicka **Delete branch** när GitHub erbjuder det. Allt ligger kvar i `main`.
6. **I Cursor** (PowerShell, i `C:\Users\kentl\OneDrive\AI\Grok`):

```
git switch main
git pull
git fetch --prune
```

7. Kontrollera med Ctrl+P i Cursor att filerna finns.
8. Rensa den lokala grenen om den finns kvar: `git branch -d <grennamn>`. Flaggan `-d` är den säkra varianten. Se avsnitt 6C för ett exempel med bilder.

Om något ser konstigt ut: `git status` visar om du har ändringar som inte är committade, och `git branch -a` visar vilka grenar som finns.

### C. Städa efter en ihopslagen gren (exempel med bilder)

Efter att pull requesten är ihopslagen och grenen raderad på GitHub finns grenen kvar på din dator på två sätt: som en **lokal gren** och som en **anteckning** om GitHub-grenen (`remotes/origin/...`). Båda städas bort med varsitt kommando. Skärmdumparna är från 2026-10-05, när grenen `claude/focused-pascal-yb1gps` städades bort.

**1. Förberedelse.** Instruktionen före städningen:

![Instruktion: git branch -a före städningen](_BILDER/git_branch_-a_bild0.jpg)

**2. Före.** `git branch -a` visar alla grenar. Den lokala grenen står utan `remotes/`. Den röda raden med `remotes/origin/claude/...` är den gamla anteckningen om grenen på GitHub:

![git branch -a före städningen](_BILDER/git_branch_-a_bild1.jpg)

**3. `git fetch --prune`.** Kommandot hämtar nyheter och tar bort anteckningar om grenar som inte finns kvar på GitHub. Här kom ett felmeddelande om att en tom loggmapp inte kunde raderas. Det är ofarligt. Windows (och ibland OneDrive eller Cursor) höll mappen öppen. Svara `y` en gång, och `n` om frågan kommer igen:

![Felmeddelande vid git fetch --prune](_BILDER/git_branch_-a_bild2.jpg)

**4. Efter.** Den röda raden `remotes/origin/claude/...` är borta. Men den **lokala** grenen står kvar, för `--prune` rör inte den. Den tas bort med `git branch -d claude/focused-pascal-yb1gps`:

![git branch -a efter git fetch --prune: den lokala grenen finns kvar](_BILDER/git_branch_-a_bild3.jpg)

**Klart** är det när `git branch -a` bara visar `main`, `remotes/origin/HEAD -> origin/main` och `remotes/origin/main`.

Obs: repot ligger i OneDrive. OneDrive kan låsa filer i `.git`-mappen under synkning. Det är allmän erfarenhet, inte undersökt på din dator.

---

### D. Kontrollista innan du slår ihop

- Står originalet och kopian på samma versionsnummer (utom där kopian medvetet är en egen förkortning, som `ai-minne`)?
- Är bannern i kopian märkt "kopia" med avstämningsdatum?
- Är `description` oförändrad om den inte ska ändras?
- Finns en pekare i `.claude/skills/` för varje skill i `.agents/skills/`?
- Finns en ny post överst i `AGENTLOGG.md`?
- Är inga nycklar, lösenord eller personuppgifter med?

### E. Lägga till en ny skill

1. Skapa `.agents/skills/<namn>/SKILL.md` med frontmatter (`name`, `description`) och märk vem som skrev den.
2. Skapa pekare: `.claude/skills/<namn>/SKILL.md`.
3. Lägg mappen i mappstrukturen i `AGENTS.md`.
4. Logga i `AGENTLOGG.md`.
5. Pull request enligt B.

---

## 7. Vad som återstår

- **Beslut:** var ska originalet av `generativ-ai-privat-och-professionellt` ligga?
- **Beslut:** ordet "controllerarbete" står kvar i kopians beskrivning av `ai-minne-formagor-organisation`, men finns inte i originalets. Ta bort det eller behåll det?
- **Verifiera:** att Cursor och Claude Code laddar skillsen i en ny session.
- **Verifiera med `grok inspect`:** om Grok Build hittar skills i `.agents/skills/`, eller om en tunn pekare i `.grok/skills/` behövs (`AGENTS.md`, avsnittet "Skills: var de ska ligga").
- **Beslut:** ska skillsen i det här repot flyttas till huvudregeln (`.claude/skills/<namn>/` som den enda platsen) i stället för det äldre mönstret med original i `.agents/skills/`?
- **Kontoskill i claude.ai:** ladda upp mappen själv om du vill ha skillen även där. Det kan inte göras från Claude Code i molnet.
- **ChatGPT och Gemini:** deras roll och hur skillsen ska läggas in där är inte beskriven. Bestäm, så kan det skrivas in här.
- **Länkar:** Digg, IMY, SpaceXAI och OpenAI i `controllerrollen-generativ-ai/references/kallkanon.md` kontrollerades senast 2026-10-03. De kunde inte omkontrolleras 2026-10-05 från Claude Code-sessionen (blockerade domäner).

---

## Referenser

Lundgren, K. (2026) *Claude-kompassen*. Tillgänglig på: [https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/](https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/) (Länk hämtad från `AGENTS.md`, ej öppnad i denna session). *(Metod för ytor, styrfiler och roller. Kan vara inaktuell, enligt `AGENTS.md`.)*

Repots egna filer: `AGENTS.md` (mappstruktur, roller, regler för överlämning), `AGENTLOGG.md` (vad som gjorts och verifierats), `ai-minne-formagor-organisation/SKILL.md` (normalform, original och kopia).
