---
title: Supermemory
created: 2026-04-16
type: summary
updated: '2026-04-16'
tags: []
---

# Supermemory — 总结

> 来源：[GitHub README](https://github.com/supermemoryai/supermemory) + [Research Paper](https://supermemory.ai/research)
> 抓取日期：2026-04-08

---

## 一、Supermemory 是什么

Supermemory 是一个**AI 记忆引擎 + 消费级应用**，由同名研究实验室（Supermemory Research Lab）开发。

**产品矩阵：**

- **消费 App**：免费个人记忆应用（[app.supermemory.ai](https://app.supermemory.ai)），通过浏览器扩展 + MCP 服务器交付，构建跨对话的持久记忆图谱
- **开发者 API**：`npm install supermemory` / `pip install supermemory`，无需配置向量数据库、嵌入管道或分块策略，可直接对接 Vercel AI SDK、LangChain、LangGraph、Mastra、Agno、n8n
- **官方插件**：OpenClaw、Claude Code、OpenCode、Hermes Agent 均已官方集成

---

## 二、核心能力

| 能力 | 说明 |
|------|------|
| 🧠 **Memory** | 从对话中提取原子事实，处理时序变化与矛盾，自动遗忘过期信息 |
| 👤 **User Profiles** | 自动维护用户上下文（稳定事实 + 近期动态），单次调用 ~50ms |
| 🔍 **Hybrid Search** | RAG + Memory 合二为一，单次查询同时搜索知识库文档和个性化记忆 |
| 🔌 **Connectors** | Google Drive、Gmail、Notion、OneDrive、GitHub 实时 webhook 同步 |
| 📄 **File Processing** | PDF、图片（OCR）、视频（转录）、代码（AST 感知分块）多模态提取 |

---

## 三、架构：五大核心组件

### 1. Chunk-based Ingestion & Contextual Memories

传统 RAG 召回的是脱离上下文的原始文本块，导致语义模糊。Supermemory 的改进：

- 将大型对话会话分解为语义块
- 生成 **memories**（记忆）—— 单一原子信息片段
- 使用改进版 **Contextual Retrieval** 消解歧义指代

### 2. Relational Versioning & Knowledge Chains（关系版本控制）

在新旧记忆之间建立语义关系链：

| 关系类型 | 说明 | 例子 |
|----------|------|------|
| **updates** | 状态变更，处理矛盾 | "我最喜欢的颜色现在是绿色" → 更新 "蓝色" |
| **extends** | 补充，不矛盾 | 在已有信息上追加职位名称 |
| **derives** | 推导，跨记忆推理 | 组合多条记忆得出新结论 |

### 3. Temporal Grounding（时序锚定）

双层时间戳机制：

- **documentDate**：对话发生的实际时间
- **eventDate**：事件本身发生的真实时间戳

这一设计驱动了 Temporal Reasoning、Knowledge Update、Multi-Session 三个类目的高分。

### 4. Hybrid Search Strategy（混合搜索策略）

1. 在 memories 上做语义搜索，定位相关概念
2. memories 本身 = 高信号、低噪声（原子信息）
3. 命中后注入原始 source chunk
4. LLM 可同时依赖原子性的精准度和原始上下文的细节

### 5. Session-Based Ingestion（基于会话的摄取）

区别于 LongMemEval 的逐轮处理，Supermemory 以**会话**为单位进行摄取，提高效率与连贯性。

---

## 四、Benchmark 结果

### LongMemEval_s（LLM-as-Judge）

| 类别 | 全上下文 (gpt-4o) | Zep (gpt-4o) | Supermemory (gpt-4o) | Supermemory (gpt-5) | Supermemory (gemini-3-pro) |
|------|-----------------|--------------|---------------------|--------------------|--------------------------|
| SSU（单会话-用户） | 81.4% | 92.9% | **97.14%** | 97.14% | 98.57% |
| SSA（单会话-助手） | 94.6% | 80.4% | **96.43%** | **100%** | 98.21% |
| SSP（单会话-偏好） | 20.0% | 56.7% | **70.00%** | 76.67% | 70.00% |
| KU（知识更新） | 78.2% | 83.3% | **88.46%** | 87.18% | 89.74% |
| TR（时序推理） | 45.1% | 62.4% | **76.69%** | 81.20% | 81.95% |
| MS（多会话） | 44.3% | 57.9% | **71.43%** | 75.19% | 76.69% |
| **总体** | 60.2% | 71.2% | **81.6%** | **84.6%** | **85.2%** |

**相对 Zep 提升：+14.61%**（gpt-4o）

关键发现：
- Supermemory 在 **Multi-Session（71.43%）** 和 **Temporal Reasoning（76.69%）** 优势最明显——这两个领域是传统向量检索的历史短板
- 全上下文（把所有历史都塞进 context window）仅得 60.2%，说明盲目扩大上下文窗口并非解决方案
- Supermemory + gemini-3-pro 达到 85.2%

---

## 五、API 参考

| 方法 | 用途 |
|------|------|
| `client.add()` | 存储内容：文本、对话、URL、HTML |
| `client.profile()` | 用户画像，支持可选的内部搜索，单次调用 ~50ms |
| `client.search.memories()` | 跨记忆和文档的混合搜索 |
| `client.search.documents()` | 文档搜索，支持元数据过滤 |
| `client.documents.uploadFile()` | 上传 PDF、图片、视频、代码 |
| `client.documents.list()` | 列出和过滤文档 |
| `client.settings.update()` | 配置记忆提取和分块策略 |

---

## 六、与同类系统对比

| 系统 | 方案 |
|------|------|
| **MemPalace** | 记忆宫殿，本地优先，raw verbatim 文本（96.6%）优于 LLM 提取记忆（Mem0 30-45%）；Supermemory 则走 LLM 提取 + 关系版本的路线 |
| **LCM（Lossless Context Management）** | 确定性 DAG 压缩 + 双状态架构；Supermemory 使用 LLM 提取 + 关系版本控制；两者都解决长上下文问题但哲学不同 |
| **Mem0** | LLM 提取记忆；Supermemory 在此基础上增加了**时序锚定**和**知识链版本控制**，处理矛盾和时间推理更系统 |
| **Zep** | 基于向量存储的记忆系统；Supermemory 在 LongMemEval 上领先 Zep 14.61% |

---

## 七、Supermemory 与 RAG 的本质区别

| | RAG | Supermemory |
|---|---|---|
| 检索单位 | 文档块（chunk） | 原子记忆（memory） |
| 状态 | 无状态，所有人结果相同 | 有状态，跟踪用户随时间变化 |
| 矛盾处理 | 不处理 | 自动版本控制（updates 关系） |
| 时间感知 | 无 | 双层时序锚定 |
| 遗忘机制 | 无 | 自动过期临时事实 |

> **核心理念**：RAG 检索的是文档片段；Memory 提取的是关于用户的事实。Supermemory 默认同时运行两者。

---

## 八、自动遗忘机制

Supermemory 知道何时记忆变得无关：

- 临时事实（如"我明天有考试"）在日期过后自动失效
- 矛盾信息自动解析（updates 关系链）
- 噪声不会成为永久记忆

---

## 九、关键引用

> "The ability to accurately recall user details, respect temporal sequences, and update knowledge over time is not a 'feature' — it is a prerequisite for Agentic AI."
>
> — Supermemory Research Paper

---

## 相关页面

- [[lossless-context-management]] — LCM：确定性双状态记忆架构
- [[mempalace-memory-system]] — MemPalace：verbatim 存储 + palace 结构；raw 96.6% LongMemEval；与 Supermemory 不同哲学
- [[lcm-vs-supermemory-comparison]] — LCM vs Supermemory vs MemPalace：三种记忆架构详细对比
- [[llm-agents]] — LLM 智能体

**来源：**
- [GitHub README](https://github.com/supermemoryai/supermemory)
- [Research Paper](https://supermemory.ai/research)
