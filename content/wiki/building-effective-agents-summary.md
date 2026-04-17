---
title: Building Effective Agents — Summary
tags:
- source
- anthropic
- agents
- llm
created: 2026-04-07
updated: 2026-04-07
sources:
- raw/building-effective-agents.md
type: summary
---

# Building Effective Agents

> **Source:** [Anthropic Engineering Blog](https://www.anthropic.com/engineering/building-effective-agents) | Erik Schluntz & Barry Zhang | 2026-04-07

## Overview

This article distills lessons from Anthropic's work with dozens of teams building LLM agents across industries. The central finding: **the most successful implementations use simple, composable patterns — not complex frameworks.**

## Key Definitions

| Term | Definition |
|---|---|
| **Workflow** | Systems where LLMs and tools are orchestrated through *predefined code paths* |
| **Agent** | Systems where LLMs *dynamically direct* their own processes and tool usage |

Agents and workflows are both "agentic systems" — the distinction is the degree of dynamism and autonomy.

## Core Thesis

> Start with the simplest solution. Only increase complexity when warranted. Often, optimizing single LLM calls with retrieval and in-context examples is enough. [Source: raw/building-effective-agents.md]

## When to Use Agents

- Agents trade **latency and cost** for better task performance — only worth it when that tradeoff makes sense.
- Workflows offer **predictability and consistency** for well-defined tasks.
- Agents are better when **flexibility and model-driven decision-making at scale** are needed.

## The Building Blocks

### Augmented LLM

The foundational unit: an LLM enhanced with:
- **Retrieval** — pulling relevant information
- **Tools** — calling external functions
- **Memory** — retaining information across interactions

The [[augmented-llm]] page covers this in depth.

### Workflow Patterns (in order of increasing complexity)

1. **Prompt Chaining** — sequential decomposition, each LLM call feeds into the next
2. **Routing** — classify input → direct to specialized handler
3. **Parallelization** — simultaneous work (sectioning or voting), results aggregated
4. **Orchestrator-Workers** — central LLM dynamically breaks down and delegates tasks
5. **Evaluator-Optimizer** — iterative loop of generate → evaluate → refine

See [[workflow-patterns]] for details.

### Agents

Agents emerge when LLMs mature in: understanding complex inputs, reasoning/planning, reliable tool use, and error recovery.

Characteristics:
- Begin with human command or discussion
- Operate independently, potentially returning to human for feedback
- Gain "ground truth" from environment (tool results, code execution)
- Include stopping conditions (max iterations, checkpoints)
- **"They're typically just LLMs using tools based on environmental feedback in a loop"**

> 💡 Wiki Agent's note: This downplaying of agent complexity is significant — it reframes agents as *simple loops* rather than mysterious autonomous systems.

## Agent-Computer Interface (ACI)

A key principle from the article: **invest as much effort in agent-computer interfaces as you would in human-computer interfaces.**

Tool design best practices:
- Give models enough tokens to "think" before committing
- Keep formats close to natural internet text
- Minimize formatting overhead (no counting lines, no string-escaping)
- Include example usage, edge cases, input format requirements in tool definitions
- **Poka-yoke tools** — change arguments to make mistakes harder

> Anthropic spent *more time optimizing tools* than the overall prompt when building their SWE-bench agent.

## Frameworks vs Direct API

Frameworks (Claude Agent SDK, Strands, Rivet, Vellum) simplify getting started but add abstraction layers that obscure prompts/responses and can tempt over-engineering.

**Recommendation:** Start with direct LLM API calls. Many patterns need only a few lines of code. Only reach for a framework when you understand what's under the hood.

## Three Core Principles for Agent Design

1. **Maintain simplicity** in agent design
2. **Prioritize transparency** — explicitly show the agent's planning steps
3. **Carefully craft the ACI** — thorough tool documentation and testing

## Use Cases

### Customer Support
- Natural conversation flow + external data access + programmatic actions
- Tools: pull customer data, order history, knowledge base; issue refunds, update tickets
- Measurable success via user-defined resolutions

### Coding Agents
- Code is verifiable via automated tests
- Test results provide feedback for iteration
- Well-defined, structured problem space
-SWE-bench Verified benchmark: agents resolve real GitHub issues from PR descriptions alone

## Key Claims to Watch

- ⚠️ Inference: The article implies agents are "just loops" — this may understate the complexity of reliable tool use at scale, which is a common failure mode in practice.
- ⚠️ The "augmented LLM" framing treats retrieval, tools, and memory as optional augmentations rather than core to how modern frontier models operate — this may be an underselling of their importance.

---

## Related Pages

- [[llm-agents]] — broader concept of LLM agents
- [[workflow-patterns]] — detailed breakdown of the 5 workflow patterns
- [[augmented-llm]] — the foundational building block
- [[agent-computer-interface]] — tool design philosophy
