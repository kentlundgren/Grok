---
name: kodsatt-agentic-engineering
description: Kopia av Groks interna skill med samma namn. Använd när någon ber om kod, vibe coding, Claude Code, Cursor, Supabase, frontend, databas, auth, RLS eller publicering i kentlundgren/Grok. Originalet i Groks skill-lager gäller om kopian och originalet glider isär.
metadata:
  type: workflow
  version: "1.0"
  created_via: conversation
  purpose: repo copy of Grok internal coding-practice skill
  source: Grok intern skill kodsatt-agentic-engineering
  copy_date: 2026-10-05
  last_updated: 2026-10-05 10:50 CEST (Stockholm)
---

> Kopia av Groks interna skill `kodsatt-agentic-engineering`, avstämd 2026-10-05. Originalet ligger i Groks skill-lager, inte i det här repot. Ändra originalet först och uppdatera den här kopian efteråt. Regeln ska inte skrivas om här på egen hand.

## Senaste ändringar

- **2026-10-05 10:50 CEST (Stockholm)**: Lade kopian i `.agents/skills/` så att Cursor och Grok Build hittar den. Märkt som kopia av den interna skillen.

# Kodsätt — vibe coding och agentic engineering

Prototyp får vara vibe coding. Så fort det rör data, behörighet eller publicering gäller agentic engineering: agenten skriver, ägaren granskar diff och tester.

## Nyanserad regel

| Läge | När | Vem skriver | Vem läser |
| --- | --- | --- | --- |
| Vibe coding | Kastbar prototyp, demo, personligt experiment utan delad data | Agenten, från en beskrivning | Ingen djupläsning krävs |
| Agentic engineering | Allt som ska leva, pushas, delas eller röra data | Agenten, över flera filer | Ägaren, på diff och tester |

Växla till agentic engineering så fort något av detta ingår:

- Auth, sessioner, API-nycklar eller andra hemligheter
- Databas, schema, migrationer eller Row Level Security (RLS)
- Delad eller riktig data, inte bara lokal mock
- Publicering (GitHub Pages, Vercel, push till delad gren)

Auth, RLS och hemligheter hör inte hemma i den ogranskade loopen. Isolera agenten i egen git-worktree och, vid Supabase, ett eget lokalt projekt så att den inte skriver i fel databas.

## Arbetsloop

1. Frontend först i Cursor eller Claude Code. Lägg en designskill (Anthropic frontend-design, vid behov Impeccable) så att gränssnittet inte blir generiskt.
2. Backend som Postgres via Supabase när data behövs. Koppla agenten med MCP, Agent Skills eller plugin — inte bara en README.
3. Låt agenten föreslå schema och RLS. Granska migrationen innan den når delad data.
4. Ägaren äger diff, tester och push. Commit och push bara vid uttrycklig begäran.
5. Statiska sidor (GitHub Pages) är default om inget annat begärts. Peka på närmaste `AGENTS.md` eller `CLAUDE.md`.

## När skillen används

- Beskriv kodsättet med tabellen ovan. Kalla inte all kodning för vibe coding.
- Vid kodförslag: säg vilket läge som gäller och varför.
- Vid auth, RLS eller hemligheter: stanna och visa diffen som ska granskas. Skriv inte in nycklar i kod eller skills.
- Vid osäkerhet om mål, fil eller publicering: fråga innan filer skrivs.

## Referensmaterial

- `references/verifieringsregeln-2026-10-05.md` — den låsta formuleringen från 5 oktober 2026, med källspår. Också en kopia.

## Cross-references

- Internt i Grok: `ekosystem-analys-claude-kompassen` och `utbildning-matchning-programmering-ai` pekar hit. De upprepar inte regeln.
- Repots rot: `AGENTS.md` pekar hit och ska inte innehålla regeltexten.

## Referenser

The AI Rankings (2026) 'What Is Vibe Coding? A Plain-English 2026 Guide', *The AI Rankings*. Tillgänglig på: https://theairankings.com/guides/vibe-coding/ (Hämtad: 2026-10-05). *Sekundärkälla för Karpathys skillnad i februari 2026 mellan vibe coding och agentic engineering, och för uppgiften att Veracodes GenAI Code Security Report 2026 fann att modeller missade 44 procent av säkerhetsrelevanta koduppgifter.*

Supabase (2026) 'AI Tools', *Supabase Docs*. Tillgänglig på: https://supabase.com/docs/guides/ai-tools (Hämtad: 2026-10-05). *MCP, Agent Skills och plugin som kopplar kodagenten till Postgres, migrationer och Edge Functions.*

BenchLM (2026) 'Best Frontend & App Dev Models (October 2026)', *BenchLM.ai*. Tillgänglig på: https://benchlm.ai/best/frontend-app-dev (Hämtad: 2026-10-05). *Frontendranking per 2 oktober 2026. GPT-5.5 och Claude Opus 4.7 ligger tätt. Valet är verktyg och loop, inte en ensam modell.*
