# Aktörer och processer som kopplar ML-artefakt och LLM

Använd denna fil när användaren vill ha namn, organisationer och länkar. Kontrollera länken före leverans om uppgiften är äldre än några månader.

## Paraply

**Compound AI systems** — system med flera interagerande delar (retriever, ML-modell, verktyg, LLM) i stället för en ensam modell.

- BAIR-inlägg: https://bair.berkeley.edu/blog/2024/02/18/compound-ai-systems/
- Survey: https://arxiv.org/abs/2506.04565
- IBM-översikt: https://www.ibm.com/think/topics/compound-ai-systems

## Mönster och ramverk

| Namn | Vad det kopplar | Länk |
|---|---|---|
| RAG | Extern/intern kunskap + generation | https://arxiv.org/abs/2005.11401 |
| HuggingGPT / JARVIS | LLM planerar, HF-modeller kör | https://arxiv.org/abs/2303.17580 · https://github.com/microsoft/JARVIS |
| DSPy | Deklarativ kedja som optimeras mot mått | https://dspy.ai/ · https://github.com/stanfordnlp/dspy · https://arxiv.org/abs/2310.03714 |
| ReAct / function calling / MCP | LLM anropar kalkyl och API | https://modelcontextprotocol.io/ |
| LangGraph | Explicit graf för verktygssteg | https://www.langchain.com/ |
| LlamaIndex | Dataindex + LLM | https://docs.llamaindex.ai/ |
| Semantic Kernel | Microsofts orkestrering | https://learn.microsoft.com/en-us/semantic-kernel/overview/ |
| Medprompt | Nearest neighbor + LLM + ensembling | sök Microsoft Research Medprompt |
| AlphaGeometry | LLM föreslår, symbolisk motor bevisar | https://deepmind.google/discover/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/ |

## Plattformar och register

| Aktör | ML-sidan | LLM-sidan | Länk |
|---|---|---|---|
| Databricks | Feature store, Unity Catalog, klassisk träning | MLflow 3, Agent Bricks, AI Gateway | https://www.databricks.com/product/artificial-intelligence |
| MLflow (öppen källkod) | Experiment, model registry | Tracing, prompt registry, LLM-as-judge | https://mlflow.org/ · https://www.databricks.com/blog/mlflow-30-unified-ai-experimentation-observability-and-governance |
| Hugging Face | Hub för modeller, dataset, Spaces | Inference, agents, community-RAG | https://huggingface.co/ |
| JFrog | Artifactory som ML-register, Xray-skanning | Konsumeras av appar/agenter som hämtar godkänd version | https://jfrog.com/ml-model-management/ · https://huggingface.co/blog/jfrog |
| Azure Databricks | MLOps Stacks | LLMOps-guide | https://learn.microsoft.com/en-us/azure/databricks/machine-learning/mlops/llmops |
| Google Vertex + BigQuery ML | Tabell-ML och prognos | Gemini ovanpå låsta prediktioner | https://cloud.google.com/vertex-ai |
| Amazon SageMaker + Bedrock | Träning och registry | Foundation models | https://aws.amazon.com/sagemaker/ |
| IBM watsonx | Governance över modeller | Generativ lager med samma kontroll | https://www.ibm.com/watsonx |

## Processnamn att använda i svar

- **MLOps** — versionera data, modell och kod; registrera; övervaka drift.
- **LLMOps** — samma kedja plus promptversion, tracing och kvalitetsdomare.
- **Model registry** — en sanning för vilken artefakt som får anropas.
- **Curation / proxy** — publik Hub → intern kopia (Artifactory-mönstret).
- **Predict-then-explain** — tal först, prosa sedan.
- **Retrieve-then-write** — källa först, generation sedan.
- **Route-to-specialist** — LLM dirigerar, specialistmodell utför.

## Controller-översättning

| Process | Tal | Text |
|---|---|---|
| Tertial bad 3130 | Säsongsmodell eller låst kalkyl | LLM skriver varför T1 inte är linjärt underskott |
| Kontering / investering-drift | Klassificerare + RKR-regler | LLM förklarar förslaget, godkänner inte själv |
| Museum egenfinansiering | Två kvotdefinitioner i kalkyl | LLM skriver politikerpunkt utifrån låsta procent |
| Kassaavvikelse BRP | Anomalimodell på dagrader | LLM sammanfattar flaggade dagar |

## Relaterade interna sidor

- Grok-repo-spegel: https://github.com/kentlundgren/Grok/tree/main/ML_LLM
- RAG i AI-teknik: https://kentlundgren.github.io/AI-teknik/RAG/
