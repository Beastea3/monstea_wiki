# Principles of Building AI Agents (2nd Edition)

**Author:** Sam Bhagwat | **Published:** May 2025 (2nd Edition) | **Source:** [sources/principles_2nd_edition_updated.pdf](sources/principles_2nd_edition_updated.pdf)

---

## Overview

Written by the founder of Mastra (open-source JavaScript agent framework) and co-founder of Gatsby, this book is a practitioner's guide to building AI agents without hype. The 2nd edition (May 2025) adds new chapters on MCP, image generation, voice, A2A, web browsing/computer use, workflow streaming, code generation, agentic RAG, and deployment.

---

## Key Themes

### 1. Agents Are Just LLMs Using Tools in a Loop
The book demystifies agents: they are not a magical new paradigm but a composition of primitives — LLMs + retrieval + tools + memory. Agency exists on a spectrum:
- **Low autonomy:** binary choices in a decision tree
- **Medium autonomy:** memory + tool calls + retry
- **High autonomy:** planning + task decomposition + queue management

### 2. Tool Design Is the Most Important Step
> "Think like an analyst. Break your problem into clear, reusable operations. Write each as a tool."

The book gives a detailed case study: Alana's book recommendation agent. First attempt (drop all books into context) failed. Breaking the problem into specific tools (by investor, by genre, by recommendation type) succeeded. **Key insight:** how you decompose operations into tools determines agent capability.

### 3. Memory Is Hierarchical
Memory systems combine:
- **Working memory:** recent messages (sliding window via `lastMessages`)
- **Long-term memory:** semantic recall via RAG (`semanticRecall`)
- **Memory processors:** `TokenLimiter` (prune by token budget), `ToolCallFilter` (remove verbose tool calls)

### 4. MCP = USB-C for AI
Anthropic's Model Context Protocol (MCP, proposed Nov 2024) standardizes tool definitions. Hit critical mass March 2025 after Shopify CEO advocacy. April 2025: OpenAI + Google Gemini announced MCP support, making it a de facto standard. Similar to USB-C: protocol standardizes, ecosystem provides adapters. Open-source registries: Smithery, PulseMCP, mcp.run.

### 5. A2A for Multi-Agent Communication
Google's Agent-to-Agent protocol (A2A, spring 2025) handles communication with "untrusted" external agents. Uses `/.well-known/agent.json` for discovery, JSON-RPC 2.0 over HTTP, SSE for streaming. Still early; OpenAI/Anthropic haven't adopted.

### 6. Workflows > Pure Agents When Predictability Matters
Graph-based workflows add structure where agents alone are too unpredictable. Primitives: **branching** (parallel LLM calls), **chaining** (sequential), **merging** (converge), **conditions** (decision-based). Best practice: one LLM call per step maximum.

### 7. RAG Alternatives Exist — Start Simple
The book's controversial take: **full context loading** (Gemini 2M token window) should be the first approach. Only build RAG pipelines if that fails. Then try **agentic RAG** (tools over docs). Then full RAG pipeline with chunking/embedding/reranking.

### 8. Evals Are CI for AI
Unlike binary pass/fail tests, evals return 0-1 scores. Categories:
- **Textual:** hallucination, faithfulness, completeness, answer relevancy
- **Classification:** sentiment, topics, entity extraction
- **Agent tool usage:** did the agent call the right tools?
- **A/B testing:** live experiments with real users (Perplexity, Replit's primary quality signal)

### 9. Multimodal: Ghibli Moment Happened
March 2025 "Ghibli-core" moment showed consumer-grade image generation crossed into viral cultural phenomenon. Video generation hasn't reached that milestone yet. Voice: STT→LLM→TTS pipeline still dominant; realtime voice-to-voice models struggle with turn-taking (voice activity detection).

### 10. Deployment Is Still Heroku-Era
Most teams: agent in Docker → deploy to auto-scaling container service. Serverless not ready for long-running agent workloads (timeout issues, bundle size). Teams using EC2/DigitalOcean with B2B use cases (predictable traffic) sleep best.

---

## Key Contrasts with Other Wiki Sources

| Topic | This Book | Other Sources |
|---|---|---|
| Agent definition | LLM + tools/memory loop | Varies widely |
| Memory approach | Hierarchical (working + long-term) | MemPalace: verbatim; Supermemory: LLM extraction |
| RAG | Last resort after context loading | Varies |
| MCP | USB-C analogy, standards story | Anthropic paper focuses on protocol mechanics |
| Multi-agent | Supervisor pattern, workflows as tools | Various frameworks |

---

## Notable Quotes

> "You should think of reasoning models as 'report generators' — you need to give them lots of context up front via many-shot prompting." (Ch. 3)

> "The most important thing you should do is think carefully about your tool design... Write this out clearly before you start coding." (Ch. 6)

> "We're engineers. And engineers can over-engineer things. With RAG, you should fight that tendency. Start simple, check quality, get complex." (Ch. 20)

---

## Relationship to Other Wiki Content

- **[[llm-agents]]:** This book provides concrete implementation patterns (autonomy levels, tool design, memory) that extend the conceptual framework
- **[[augmented-llm]]:** The book's "augmented LLM" (retrieval + tools + memory) directly maps to the Augmented LLM concept
- **[[agent-computer-interface]]:** Tool design principles in Ch. 6 align with ACI poka-yoke philosophy
- **[[workflow-patterns]]:** Graph-based workflows (Ch. 12-16) extend the 5 workflow patterns with branching/chaining/merging/conditions
- MCP (Ch. 11): USB-C for AI; not yet a standalone concept page; see summary Ch. 11
- MemPalace: verbatim vs LLM extraction memory — **live tension in the field**; no concept page yet

> ⚠️ Inference: The book's treatment of memory (LLM extraction) aligns more with Supermemory than MemPalace's verbatim approach. This creates a live tension in the field between "extraction loses context" (MemPalace) vs "versioning+grounding compensates" (Supermemory + this book).

---

## Limitations Noted

- MCP ecosystem: discovery fragmented, quality inconsistent, config schemas vary per provider
- A2A: OpenAI/Anthropic haven't adopted; may not win standards war
- Realtime voice: still no production-ready solution due to turn-taking problems
- Video generation: hasn't crossed "Ghibli moment" threshold
- Security: MCP server vulnerabilities already demonstrated (GitHub MCP server leak); expect more incidents as agent deployment 10x

_End of summary._
