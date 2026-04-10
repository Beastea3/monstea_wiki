# Letta — Stateful Agent Platform (formerly MemGPT)

> Tags: agents, memory, stateful, self-improvement, MCP
> Source: [sources/letta-README.md](sources/letta-README.md)

---

## Overview

**Letta** (formerly known as MemGPT) is a stateful agent platform with **21,981 GitHub stars** designed for building AI agents with advanced memory that can learn and self-improve over time [Source: sources/letta-README.md]. Unlike simple memory systems, Letta provides a complete infrastructure for running stateful agents both locally and in production environments.

The core philosophy: Agents should maintain persistent state across interactions, enabling true long-term learning and adaptation rather than stateless request-response patterns.

---

## Key Capabilities

Letta differentiates itself through three core capabilities [Source: sources/letta-README.md]:

1. **Advanced Memory**: Multi-layer memory architecture with explicit memory blocks
2. **Learning**: Agents that improve through interaction and experience
3. **Self-Improvement**: Continuous adaptation of behavior and capabilities

---

## Two-Mode Architecture

Letta provides complementary interfaces for different use cases [Source: sources/letta-README.md]:

### Letta Code (CLI)
Local-first agent execution for development and personal use:
- Run agents locally in your terminal
- Supports skills and subagents
- Pre-built skills for advanced memory and continual learning
- Fully model-agnostic (recommend Opus 4.5 and GPT-5.2 for best performance)

```bash
npm install -g @letta-ai/letta-code
letta  # Launch interactive agent
```

### Letta API
Production-ready API for building stateful agents into applications:
- Full-featured agents API
- Python and TypeScript SDKs
- Cloud-hosted infrastructure
- Enterprise-grade reliability

---

## Memory Block Architecture

Letta's memory system uses labeled memory blocks that provide explicit structure to agent memory [Source: sources/letta-README.md]:

```typescript
memory_blocks: [
  {
    label: "human",
    value: "Name: Timber. Status: dog. Occupation: building Letta..."
  },
  {
    label: "persona", 
    value: "I am a self-improving superintelligence. Timber is my best friend..."
  }
]
```

**Key insight**: By labeling memory blocks ("human", "persona", etc.), Letta enables agents to maintain distinct memory contexts and retrieve them appropriately during reasoning. This goes beyond simple key-value storage to provide semantic organization of agent state.

---

## Model Agnostic Design

Letta is designed to work with multiple LLM providers [Source: sources/letta-README.md]:

- **Recommended**: Opus 4.5, GPT-5.2
- **Supported**: Multiple model families via unified interface
- **Leaderboard**: [leaderboard.letta.com](https://leaderboard.letta.com/) ranks model performance for agent tasks

This flexibility allows developers to choose the best model for their specific use case while maintaining consistent agent behavior through Letta's abstraction layer.

---

## Tool Integration

Agents can be equipped with tools at creation time [Source: sources/letta-README.md]:

```typescript
tools: ["web_search", "fetch_webpage"]
```

Letta handles tool execution and result integration into agent memory, creating a seamless loop of reasoning, tool use, and memory updates.

---

## Evolution from MemGPT

Letta represents the evolution of MemGPT, expanding beyond the original research project into a comprehensive agent platform [Source: sources/letta-README.md]:

| Aspect | MemGPT (Original) | Letta (Current) |
|--------|-------------------|-----------------|
| **Focus** | Research prototype | Production platform |
| **Deployment** | Local only | Local + Cloud API |
| **Interface** | Python library | CLI + API + SDKs |
| **Community** | Academic/research | Developer/enterprise |

---

## Comparison with Related Systems

| System | Focus | Memory Approach | Best For |
|--------|-------|-----------------|----------|
| **Letta** | Stateful agents | Labeled memory blocks | Interactive agents with persistent state |
| **Mem0** | Universal memory layer | Multi-level user/session/agent memory | General AI assistant enhancement |
| **Graphiti** | Temporal knowledge graphs | Entity-relationship with validity windows | Complex evolving relationships |
| **OpenViking** | Context database | Filesystem paradigm | Structured resource management |

> 💡 Wiki Agent's note: Letta's focus on "stateful agents" versus Mem0's "memory layer" positioning reflects a meaningful architectural distinction. Mem0 provides memory as a service that any agent can use; Letta provides a complete agent runtime with built-in state management. The choice depends on whether you need a memory component (Mem0) or a complete agent infrastructure (Letta).

---

## Community & Resources

Letta is an open-source project built by over a hundred contributors worldwide [Source: sources/letta-README.md]:

- **Discord**: [discord.gg/letta](https://discord.gg/letta) — Chat with developers
- **Forum**: [forum.letta.com](https://forum.letta.com/) — Developer discussions
- **Social**: [Twitter/X](https://twitter.com/Letta_AI), [LinkedIn](https://www.linkedin.com/in/letta), [YouTube](https://www.youtube.com/@letta-ai)
- **Documentation**: [docs.letta.com](https://docs.letta.com)
- **API Reference**: [docs.letta.com/api](https://docs.letta.com/api)
- **Website**: [letta.com](https://www.letta.com)

---

## See Also

- [[llm-agents]] — Agent architecture and design patterns
- [[mem0]] — Universal memory layer (complementary approach)
- [[graphiti]] — Temporal knowledge graphs (alternative memory model)
- [GitHub](https://github.com/letta-ai/letta)
