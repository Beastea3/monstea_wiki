---
title: "Recursive Language Models (Paper Summary)"
tags: [paper, mit, long-context, recursive-language-models, inference-time-scaling]
type: summary
created: 2026-04-24
updated: 2026-04-24
---

# Recursive Language Models — Paper Summary

> **Paper Info**
> - **Title**: Recursive Language Models
> - **Authors**: Alex L. Zhang, Tim Kraska, Omar Khattab (MIT CSAIL)
> - **arXiv**: 2512.24601 [cs.AI]
> - **Date**: December 2025 / January 2026
> - **Code**: https://github.com/alexzhang13/rlm

---

## Core Contribution

Recursive Language Models (RLMs) are a general **inference-time scaling paradigm** that enables LLMs to process **arbitrarily long prompts** by treating the prompt as part of an external environment. The LLM can programmatically examine, decompose, and recursively call itself over snippets of the prompt — extending effective context by up to **two orders of magnitude** beyond the model's native context window [Source: sources/rlm-paper.md].

**Key insight**: Instead of forcing the entire context into the model's input window, RLMs offload it to a REPL environment where the model interacts with it via code, spawning recursive sub-calls only when needed. No single model call ever sees the full huge context.

---

## Architecture

### RLM as Drop-in Replacement

RLMs replace the standard `llm.completion(prompt, model)` with `rlm.completion(prompt, model)`. To the user, the API is identical; under the hood, the root LM (depth=0) interacts with an environment storing the full context [Source: sources/rlm-github.md].

### Python REPL Environment

The chosen environment is a Python REPL Notebook (similar to Jupyter) where:
- The input context `C` is loaded as a variable in memory
- The root LM outputs code blocks to peek, grep, partition, or transform the context
- The root LM can launch recursive LM calls (depth=1) inside the REPL as if they were functions
- Final answers are returned via `FINAL(answer)` or `FINAL_VAR(var_name)` tags [Source: sources/rlm-blog-alexzhang.md]

### Two-Model Architecture (Typical)

| Role | Model | Purpose |
|------|-------|---------|
| **Root LM** | Strong frontier model (e.g., GPT-5, Gemini 3) | Orchestrator: plans, interacts with user, issues REPL commands |
| **Recursive LM** | Smaller, faster model (e.g., GPT-5-mini, Qwen3-8B) | Worker: processes chunks/snippets summoned by root LM [Source: sources/rlm-techtalks.md] |

---

## Key Results

### 1. OOLONG Benchmark (Context Rot)

On the challenging `trec_coarse` split of OOLONG (evaluating fine-grained long-context reasoning):

- **132k context**: RLM(GPT-5-mini) outperforms GPT-5 by **>34 points (~114% increase)** at roughly the same API cost
- **263k context**: RLM(GPT-5-mini) outperforms GPT-5 by **>15 points (~49% increase)** and is cheaper per query
- Ablating recursion (REPL without sub-calls) degrades performance by ~10%, confirming the value of recursive decomposition [Source: sources/rlm-blog-alexzhang.md]

### 2. BrowseComp-Plus (Ridiculously Large Contexts)

On a Deep Research-style task with up to 1,000 documents (~10M+ tokens):

- **RLM(GPT-5)** achieves and maintains **perfect performance at 1,000 documents**
- Without recursion, performance is still strong at ~90%
- Base GPT-5 approaches show clear performance dropoff as document count increases
- Cost per query scales reasonably with context length [Source: sources/rlm-blog-alexzhang.md]

### 3. Post-Trained Recursive Model

The authors post-trained **RLM-Qwen3-8B**, the first natively recursive language model:
- Outperforms underlying Qwen3-8B by **28.3% on average**
- Approaches vanilla GPT-5 quality on three long-context tasks [Source: sources/rlm-paper.md]

---

## Emergent Strategies

The blog post documents several strategies that emerge from RLMs operating in the REPL environment [Source: sources/rlm-blog-alexzhang.md]:

1. **Peeking** — Root LM samples a small prefix of the context to understand structure
2. **Grepping** — Uses regex/keyword search to narrow search space without semantic retrieval
3. **Partition + Map** — Chunks context and launches parallel recursive LM calls over chunks
4. **Summarization** — Summarizes subsets of context for the outer LM to make decisions
5. **Programmatic long-output** — One-shots tasks like diff-tracking via code rather than generation

---

## Limitations & Future Work

- **Speed**: Recursive calls are blocking; no prefix caching or asynchrony yet. Queries can range from seconds to minutes.
- **Cost control**: No strong guarantees on total API cost or runtime per call.
- **Recursive depth**: Current experiments use depth=1; deeper recursion is left for future work.
- **Model requirements**: Needs "coding" or "reasoning" grade models (GPT-5, Claude Sonnet, Qwen-Coder) to navigate the Python REPL reliably [Source: sources/rlm-blog-alexzhang.md]

---

## Relationship to Other Work

- **MemGPT**: Also defers context management to the model, but builds on a single context window.
- **MemWalker**: Imposes a tree-like summarization structure.
- **LADDER**: Decomposes from a problem-centric view, not context-centric.
- **CoT / ReAct**: RLMs represent a new axis of test-time compute scaling, complementary to chain-of-thought reasoning and agentic ReAct loops [Source: sources/rlm-blog-alexzhang.md]

---

## Related Pages

- [[recursive-language-models]] — Main concept page
- [[alex-l-zhang]] — Lead author
- [[tim-kraska]] — Co-author
- [[omar-khattab]] — Co-author
- [[lossless-context-management]] — LCM, another lossless long-context approach
- [[mempalace-memory-system]] — MemPalace, another memory architecture
- [[supermemory-memory-system]] — Supermemory, SOTA memory system
