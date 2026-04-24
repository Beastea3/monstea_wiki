---
title: "Recursive Language Models (Blog Summary)"
tags: [blog, mit, long-context, recursive-language-models]
type: summary
created: 2026-04-24
updated: 2026-04-24
---

# Recursive Language Models — Blog Post Summary

> **Source**: Alex L. Zhang's personal blog (October 2025)
> - **URL**: https://alexzhang13.github.io/blog/2025/rlm/
> - **Author**: Alex L. Zhang

---

## Overview

This blog post introduces Recursive Language Models (RLMs) as an **inference strategy** where language models recursively call themselves or other LLMs before producing a final answer. The goal is to enable processing of **essentially unbounded input context** and mitigate **"context rot"** — the degradation in model quality as conversations or contexts grow long [Source: sources/rlm-blog-alexzhang.md].

---

## Context Rot: The Motivation

The author describes "context rot" as a well-known but hard-to-characterize phenomenon: as Claude Code histories bloat or ChatGPT conversations lengthen, the model seems to get "dumber." Needle-in-haystack benchmarks like RULER don't capture this — frontier models score 90%+ there. The rot is more subtle: semantic drift, compounding errors, and degraded reasoning over long interactions. RLMs address this by ensuring **no single model call ever sees the entire huge context** [Source: sources/rlm-blog-alexzhang.md].

---

## The RLM Design

### API-Level Replacement

`rlm.completion(messages)` is a direct replacement for `gpt5.completion(messages)`. The user sees no difference.

### Context-Centric Decomposition

Unlike agents that decompose a *task*, RLMs decompose the *context*. The root LM decides how to chunk, search, or summarize the context — not a human-designed workflow.

### REPL Environment

The prompt is stored as a Python variable. The root LM:
1. Receives only the query + knowledge that a context variable exists
2. Writes code to inspect the context (peek, grep, partition)
3. Can call a recursive LM inside the REPL to process sub-contexts
4. Returns a final answer via `FINAL()` or `FINAL_VAR()` [Source: sources/rlm-blog-alexzhang.md]

---

## Benchmark Highlights

### OOLONG (trec_coarse)

| Method | 132k Score | 263k Score | Cost |
|--------|-----------|-----------|------|
| GPT-5 | Baseline | Baseline | Baseline |
| GPT-5-mini | Lower | Lower | Lower |
| RLM(GPT-5-mini) | **+34 pts (~114%)** | **+15 pts (~49%)** | ~Same |
| RLM w/o recursion | -10% | - | - |

### BrowseComp-Plus (up to 1,000 docs / 10M+ tokens)

- RLM(GPT-5): **Perfect performance at 1,000 documents**
- RLM w/o recursion: ~90%
- Base GPT-5: Significant dropoff as docs increase
- ReAct + BM25: Outperformed by RLM [Source: sources/rlm-blog-alexzhang.md]

---

## Philosophy: Agents vs RLMs

> "Agents are designed based on human / expert intuition on how to break down a problem to be digestible for an LM. RLMs are designed based on the principle that fundamentally, LMs should decide how to break down a problem to be digestible for an LM."

This context-centric vs problem-centric framing is the core conceptual distinction [Source: sources/rlm-blog-alexzhang.md].

---

## Related Pages

- [[recursive-language-models]] — Main concept page
- [[rlm-paper]] — arXiv paper summary
- [[alex-l-zhang]] — Author entity
