---
name: ml-llm-kombination
description: Use when combining machine learning artifacts with generative AI or LLMs in controller, analysis or MLOps work. Triggers include ML-artefakt, compound AI, RAG plus prognos, HuggingGPT, predict-then-explain, MLOps LLMOps, tertialkommentar grounded in model output, JFrog Hugging Face models.
metadata:
  type: workflow
  version: "1.0"
  created_via: conversation
  purpose: Ground generative text in versioned ML artifacts instead of letting the LLM invent numbers
  created: 2026-09-28
  last_updated: 2026-09-28 10:20 CEST (Stockholm)
  github_mirror: https://github.com/kentlundgren/Grok/tree/main/ML_LLM
---

## Senaste ändringar

- **2026-09-28 10:20 CEST (Stockholm)**: Skapade skill:et efter dialog om JFrog, Hugging Face, ML-artefakter och skillnaden mellan klassisk ML och generativ AI i budgetuppföljning. Speglat till kentlundgren/Grok/ML_LLM.

# Kombinera ML-artefakt och generativ AI

## Syfte

Gör generativ AI faktabunden genom att låta en versionerad **ML-artefakt** (eller en låst kalkyl) producera tal, klass och flagga — och låta LLM:en **förklara, orkestrera och skriva**, inte räkna.

Kärnregel: **ML gör texten styrbar. Texten gör ML begriplig.** En LLM utan artefakt är både kalkylator och skribent. Det är otillåtet i officiell uppföljning.

## När detta skill ska användas

Använd när frågan handlar om att

- koppla en prognos, klassificerare eller anomalimodell till en tertialkommentar, nämndtext eller konteringsförklaring
- välja mellan klassisk ML, RAG, HuggingGPT-liknande routing eller en ren chatt
- peka ut aktörer och processer som redan limmar ihop ML och LLM (compound AI, MLflow, DSPy, JFrog/Hugging Face)
- granska om en generativ text har hittat på belopp, objekt eller orsak

Använd inte detta skill för ren promptning utan sifferunderlag, eller för att träna en modell från scratch.

## Beslutsträd

1. Finns strukturerad historik och ett mätbart mål (prognos, klass, avvikelse)? → skapa eller återanvänd en **ML-artefakt**.
2. Finns redan en sanning i ekonomisystemet eller en kalkyl? → lås talen **innan** LLM:en får ordet.
3. Ska svaret vara prosa till människa? → LLM med **förbud mot att ändra tal**.
4. Behöver LLM:en era egna dokument (förra tertialet, RKR, model card)? → **RAG**, inte modellens träningsminne.
5. Finns flera specialistmodeller (prognos, kontering, syn/OCR)? → **route-to-specialist** (HuggingGPT-mönster).
6. Saknas data, definition och ägare? → stoppa. Bygg inte agent ovanpå lös sand.

## Tre tillåtna kopplingsmönster

### 1. Predict-then-explain

ML-artefakten ger tal eller klass. LLM:en skriver varför, med citat av artefaktnamn och version.

Controller-exempel: säsongsmodell på konto 3130 ger helårsprognos 980 tkr. LLM:en får inte skriva underskott i T1 bara för att 5/12 av budgeten inte är förbrukad.

### 2. Retrieve-then-write (RAG)

Hämta model card, förra tertialtexten, säsongstabell och policy. Generera därefter. Intern projektdata går före webben. Förklara retrieval-valet (se `rag-agents-policy`).

### 3. Route-to-specialist

LLM:en planerar och väljer verktyg. Siffrefråga anropar prognosfunktion eller SQL. Formulering går till LLM. Klassificering går till tränad konteringsmodell. Mönstret är detsamma som HuggingGPT — LLM som dirigent, ML som händer (Shen et al., 2023).

## Vad en ML-artefakt måste bära

En artefakt är inte "filen någon laddade ner". Kräv minst

| Fält | Varför |
|---|---|
| Namn + version | t.ex. `besoks-intakt-prognos-3130-v2026-t2` |
| Indata och period | vilken huvudbok, vilka objekt, vilket intervall |
| Utdatakontrakt | tal, intervall, klass, sannolikhet — inte fri text |
| Mått | MAE, precision eller residual mot utfall |
| Licens och skanning | särskilt vid vikter från Hugging Face |
| Ägare | vilken funktion som får ta in den i kedjan |

Typiska filer i ett Hugging Face- eller Artifactory-paket: vikter (`safetensors`/`onnx`), `config.json`, tokenizer, model card, ev. datasetpekare. Pickle-format behandlas som körbar kod tills skanning säger annat.

## Arbetsordning i controlling

```
1. Sanning i ekonomisystemet
2. Regler och nyckeltal (säsong, två egenfinansieringsdefinitioner)
3. ML-artefakt (prognos, anomali, konteringsförslag)
4. RAG över egna texter och model cards
5. LLM skriver — får inte ändra talen
6. Controller låser
```

Officiell avvikelse i tertial kommer från kalkyl eller artefakt, aldrig från chatten.

## Aktörer som redan kopplar ML och LLM

Läs detaljer och länkar i `references/aktorer-processer.md`. Kort karta

| Aktör / namn | Roll i kedjan |
|---|---|
| Compound AI systems (BAIR / Zaharia) | Paraply — flera komponenter slår en ensam modell |
| RAG (Lewis et al., Meta) | Hämta fakta, sedan generera |
| HuggingGPT / JARVIS (Microsoft Research) | LLM väljer och kör HF-modeller |
| Databricks + MLflow 3 | Samma register för klassisk ML och GenAI |
| DSPy (Stanford NLP) | Programmera och optimera kedjan mot ett mått |
| Hugging Face Hub | Publik modell- och datasetartefakt |
| JFrog Artifactory / Xray | Proxy, skanning, intern version av samma artefakt |
| LangGraph, LlamaIndex, Semantic Kernel, MCP | Verktygsanrop så att LLM:en inte räknar själv |
| Vertex AI + BigQuery ML, SageMaker + Bedrock, IBM watsonx | Molnplattformar med ML-lager under LLM |

När användaren frågar "vem gör så här på riktigt?" — börja i tabellen ovan och öppna referensfilen. Hitta inte på nya produktnamn.

## Anti-mönster

- LLM räknar budgetavvikelse från inklistrad tabell utan att talen är låsta.
- "Vi har en agent" utan prognosfunktion, SQL-verktyg eller artefaktregister.
- Hugging Face-modell i produktion utan skanning, licens och intern version.
- Tertialtext som blandar modellens träningskunskap med kommunens utfall.
- Att kalla en chattlogg för artefakt.

## Så svarar du när skill:et är aktivt

1. Separera **tal** (ML/kalkyl) från **text** (LLM).
2. Namnge artefakt eller säg tydligt att den saknas.
3. Välj ett av de tre mönstren och säg vilket.
4. Peka på relevant aktör/process med fungerande länk.
5. Lämna sista ordet åt controllern eller annan ansvarig funktion.
6. Använd Harvardstil enligt `kent-referens` när externa påståenden görs.

## Referensmaterial

Följande filer finns under `references/`:

- `aktorer-processer.md` — utökad katalog över aktörer, processer, mönster och länkar.

## Cross-references

- `controller-orchestrator` — kedja budgetuppföljning + analys + text; använd lagerprincipen Classical AI → ML → GenAI → agent.
- `bad-uppfoljning-controller` och `museet-egenfinansiering` — säsong och egenfinansiering är exempel där predict-then-explain passar.
- `kommun-kontering-controller` och `investering-drift-faktura-bedomning` — klassificeringsartefakt får föreslå, inte besluta.
- `rag-agents-policy` och `rag-retrieval-skills` — retrieve-then-write med obligatorisk förklaring av retrieval.
- `ai-agent-workflow-patterns` — harness, guardrails och varför agenten inte får uppfinna egen kalkyl.
- `ai-verktyg-bedomning` — när plattform (Databricks, HF, JFrog) ska väljas.
- `linkedin-ai-feedback-generator` och `x-ai-feedback-generator` — kortare formuleringar om samma rollfördelning.
- `kent-referens` — källstandard för länkar i svar som detta skill producerar.
- `fraga-forst` — fråga om artefaktnamn, dataägare och mottagare innan kedjan byggs.

Spegel i GitHub: [kentlundgren/Grok/ML_LLM](https://github.com/kentlundgren/Grok/tree/main/ML_LLM).

## Referenser

Chen, J., Ye, J. & Wang, G. (2025) 'From Standalone LLMs to Integrated Intelligence: A Survey of Compound AI Systems', *arXiv*, 2506.04565. Tillgänglig på: [https://arxiv.org/abs/2506.04565](https://arxiv.org/abs/2506.04565) (Hämtad: 28 september 2026). *(Survey som ramar in RAG, agenter och orkestrering som compound systems.)*

Databricks (2025) 'MLflow 3.0: Build, Evaluate, and Deploy Generative AI with Confidence', *Databricks Blog*, 11 juni. Tillgänglig på: [https://www.databricks.com/blog/mlflow-30-unified-ai-experimentation-observability-and-governance](https://www.databricks.com/blog/mlflow-30-unified-ai-experimentation-observability-and-governance) (Hämtad: 28 september 2026). *(Visar ett gemensamt register för klassisk ML och GenAI.)*

Hugging Face (2025) 'Hugging Face and JFrog partner to make AI Security more transparent', *Hugging Face Blog*, 4 mars. Tillgänglig på: [https://huggingface.co/blog/jfrog](https://huggingface.co/blog/jfrog) (Hämtad: 28 september 2026). *(Industriell kedja där ML-artefakter på Hubben skannas innan användning.)*

Khattab, O. et al. (2024) 'DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines', *ICLR*. Tillgänglig på: [https://arxiv.org/abs/2310.03714](https://arxiv.org/abs/2310.03714) (Hämtad: 28 september 2026). *(Programmera LLM-kedjor mot ett mått i stället för att bara prompta.)*

Lewis, P. et al. (2020) 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', *NeurIPS*. DOI: [https://doi.org/10.48550/arXiv.2005.11401](https://doi.org/10.48550/arXiv.2005.11401). Tillgänglig på: [https://arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401) (Hämtad: 28 september 2026). *(Originalartikel för retrieve-then-write.)*

Shen, Y. et al. (2023) 'HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face', *NeurIPS*. Tillgänglig på: [https://arxiv.org/abs/2303.17580](https://arxiv.org/abs/2303.17580). Kod: [https://github.com/microsoft/JARVIS](https://github.com/microsoft/JARVIS) (Hämtad: 28 september 2026). *(LLM som dirigent över specialist-ML på Hubben.)*

Zaharia, M. et al. (2024) 'The Shift from Models to Compound AI Systems', *Berkeley Artificial Intelligence Research Blog*, 18 februari. Tillgänglig på: [https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/](https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/) (Hämtad: 28 september 2026). *(Paraplybegreppet för att sätta ihop ML, retrieval och LLM.)*

## Framtida optimering med SkillOpt (när du sitter vid dator)

När en dator med Python-miljö och LLM API-nycklar finns tillgänglig, använd **Microsoft SkillOpt** ([https://github.com/microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)) för trajectory-driven edits av detta skill.

**Snabbstart:** klona SkillOpt, installera, definiera uppgifter (t.ex. "skriv tertialkommentar utan att ändra låsta tal") och kör rollout → reflect → edit → validate. Deploya bara `best_skill.md` efter granskning.
