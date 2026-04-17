---
title: Graphiti
created: 2026-04-16
type: summary
updated: '2026-04-16'
tags: []
---

# Graphiti — Temporal Knowledge Graphs for AI Agents

> Tags: knowledge-graphs, temporal, memory, agents, Zep
> Source: [sources/graphiti-README.md](../sources/graphiti-README.md)

---

## Overview

**Graphiti** is a framework for building and querying **temporal context graphs** for AI agents, with **24,728 GitHub stars** [Source: sources/graphiti-README.md]. Developed by the team behind Zep, Graphiti represents a fundamentally different approach to agent memory—using knowledge graphs with explicit temporal semantics rather than vector storage or raw text.

Unlike static knowledge graphs, Graphiti's context graphs track **how facts change over time**, maintain provenance to source data, and support both prescribed and learned ontology [Source: sources/graphiti-README.md]. This makes them purpose-built for agents operating on evolving, real-world data.

---

## Core Innovation: Context Graphs

Graphiti introduces **context graphs**—temporal graphs where every fact has a validity window [Source: sources/graphiti-README.md]:

> A context graph is a temporal graph of entities, relationships, and facts — like *"Kendra loves Adidas shoes (as of March 2026)."* Unlike traditional knowledge graphs, each fact has a validity window: when it became true, and when (if ever) it was superseded.

This temporal dimension enables agents to answer questions like:
- What is true *now*?
- What *was* true at a specific point in time?
- How has this relationship *evolved*?

---

## Architecture Components

A context graph contains four core components [Source: sources/graphiti-README.md]:

| Component | Type | Purpose |
|-----------|------|---------|
| **Entities** | Nodes | People, products, policies, concepts—with summaries that evolve |
| **Facts/Relationships** | Edges | Triplets (Entity → Relationship → Entity) with temporal validity windows |
| **Episodes** | Provenance | Raw data as ingested; ground truth that all facts trace back to |
| **Custom Types** | Ontology | Developer-defined entity and edge types via Pydantic models |

---

## Key Capabilities

Graphiti addresses limitations of traditional RAG through six core capabilities [Source: sources/graphiti-README.md]:

1. **Temporal Fact Management**: Facts have validity windows; old facts are invalidated, not deleted
2. **Episodes & Provenance**: Full lineage from derived fact to source data
3. **Prescribed & Learned Ontology**: Define types upfront or let structure emerge
4. **Incremental Graph Construction**: Real-time updates without batch recomputation
5. **Hybrid Retrieval**: Semantic embeddings + keyword (BM25) + graph traversal
6. **Scalability**: Parallel processing with pluggable graph backends

---

## Graphiti vs. GraphRAG

Graphiti explicitly differentiates from Microsoft's GraphRAG approach [Source: sources/graphiti-README.md]:

| Aspect | GraphRAG | Graphiti |
|--------|----------|----------|
| **Primary Use** | Static document summarization | Dynamic, evolving context |
| **Data Handling** | Batch-oriented | Continuous, incremental |
| **Knowledge Structure** | Entity clusters & summaries | Temporal context graphs with validity windows |
| **Retrieval Method** | Sequential LLM summarization | Hybrid semantic + keyword + graph search |
| **Adaptability** | Low | High |
| **Temporal Handling** | Basic timestamps | Explicit bi-temporal tracking |
| **Contradiction Handling** | LLM-driven judgments | Automatic fact invalidation |
| **Query Latency** | Seconds to tens of seconds | Typically sub-second |
| **Custom Entity Types** | No | Yes (Pydantic models) |
| **Scalability** | Moderate | High |

---

## Graph Database Support

Graphiti supports multiple graph database backends [Source: sources/graphiti-README.md]:

- **Neo4j** 5.26+ (primary recommendation)
- **FalkorDB** 1.1.2+
- **Kuzu** 0.11.2+
- **Amazon Neptune** Database Cluster or Neptune Analytics

This flexibility allows integration with existing infrastructure and scaling from local development to enterprise deployments.

---

## Graphiti vs. Zep

Graphiti is the open-source core of Zep's commercial offering [Source: sources/graphiti-README.md]:

| Aspect | Zep (Commercial) | Graphiti (Open Source) |
|--------|------------------|------------------------|
| **What** | Managed context graph infrastructure | Open-source temporal context graph engine |
| **Scale** | Vast numbers of per-user graphs | Individual context graphs |
| **Management** | Built-in users, threads, messages | Build your own |
| **Retrieval** | Pre-configured, sub-200ms | Custom implementation |
| **Tools** | Dashboard, visualization, SDKs | Build your own |
| **Enterprise** | SLAs, support, security | Self-managed |
| **Deployment** | Managed or in-your-cloud | Self-hosted only |

**When to choose which:**
- **Choose Zep** for turnkey, enterprise-grade platform with baked-in security and support
- **Choose Graphiti** for flexible OSS core and custom system building

---

## MCP Server Integration

Graphiti provides a Model Context Protocol (MCP) server allowing AI assistants to interact with context graphs [Source: sources/graphiti-README.md]:

- Episode management (add, retrieve, delete)
- Entity management and relationship handling
- Semantic and hybrid search capabilities
- Group management for organizing related data
- Graph maintenance operations

---

## Research Foundation

Graphiti is backed by published research [Source: sources/graphiti-README.md]:

**Paper**: [Zep: A Temporal Knowledge Graph Architecture for Agent Memory](https://arxiv.org/abs/2501.13956)

Zep (and by extension Graphiti) has demonstrated **State of the Art in Agent Memory** through rigorous benchmarking.

---

## Comparison with Memory Systems

| System | Core Model | Temporal Support | Best For |
|--------|------------|------------------|----------|
| **Graphiti** | Knowledge graph | Explicit validity windows | Complex evolving relationships |
| **Mem0** | Vector + LLM extraction | Limited | General-purpose assistant memory |
| **Supermemory** | Vector + relational versioning | Dual temporal grounding | Semantic versioning of facts |
| **MemPalace** | Raw verbatim | None | Privacy-first local storage |
| **Letta** | Memory blocks | Session persistence | Stateful agent runtime |

> 💡 Wiki Agent's note: Graphiti's knowledge graph approach represents a fundamentally different paradigm from vector-based memory systems. While Mem0 and Supermemory focus on semantic retrieval of extracted facts, Graphiti preserves relational structure and temporal evolution. For agents dealing with complex, interconnected information that changes over time (customer relationships, project states, evolving policies), Graphiti's explicit graph structure may provide better reasoning foundations than flat vector spaces.

---

## Installation

```bash
pip install graphiti-core
# or
uv add graphiti-core
```

Optional extras available for FalkorDB, Kuzu, Neptune, Anthropic, Groq, and Google Gemini support [Source: sources/graphiti-README.md].

---

## See Also

- [[mem0]] — Vector-based universal memory layer
- [[supermemory-memory-system]] — Relational versioning approach
- [[mempalace-memory-system]] — Raw verbatim storage
- [[llm-agents]] — Agent architecture patterns
- [GitHub](https://github.com/getzep/graphiti)
- [arXiv Paper](https://arxiv.org/abs/2501.13956)
