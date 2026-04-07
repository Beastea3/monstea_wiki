# MemPalace — AI 记忆宫殿系统

## 概述

MemPalace 是一个基于「记忆宫殿」（Method of Loci）原理构建的 AI 长期记忆系统，核心理念是**存储一切，让结构使其可检索**。它不需要 AI 来决定什么值得记忆——所有对话、所有代码、所有决策过程都原样保存，通过层级化的物理结构（wings / halls / rooms / closets / drawers）实现精准检索。

**一句话定位**：史上测评分数最高的 AI 记忆系统，且完全免费、离线运行。

---

## 核心架构：Palace Structure

MemPalace 借用了古希腊演说家用「记忆宫殿」背诵演讲稿的方法，将信息按层级结构组织：

| 层级 | 含义 |
|------|------|
| **Wing**（翼） | 按人物或项目划分，每个项目/每个人都有独立的 wing |
| **Hall**（厅） | 记忆类型（如决策、偏好、里程碑、问题） |
| **Room**（房间） | 特定主题，一个 wing 下的不同主题房间 |
| **Closet**（柜子） | 属于某个 room，内含总结（未来还有 AAAK 编码内容） |
| **Drawer**（抽屉） | closet 内部，存放原始 verbatim 文件 |

这种层级结构本身就能带来 **+34% 的检索提升**——不需要任何 LLM 判断，纯粹靠结构分类就能改善检索效果。

> 架构设计经历了 6 个版本的迭代（Palace v1 → Wings v3 → Hybrid v5），从最初的 34.2% 逐步提升到 96.6%（raw）和 100%（+ rerank）。

---

## AAAK Dialect — 30 倍无损压缩

AAAK（A Lossless All-purpose Abstractive Keystroke-shorthand）是一种专为 AI agent 设计无损简写方言：

- **30 倍无损压缩**，不丢失任何信息
- 设计初衷是给 AI 快速阅读，不是给人类阅读
- **无需解码器，无需微调，无需云端 API**
- 任何能读取文本的模型都能用（Claude、GPT、Gemini、Llama、Mistral）
- 完全离线运行

未来版本中，closet 将直接使用 AAAK 编码，大幅减少存储占用和 AI 读取时间。

---

## 核心洞察：Raw Verbatim Text > Extracted Memory

这是 MemPalace 最重要的发现，也是它与其他所有记忆系统的根本区别：

> **其他系统（Mem0、Mastra、Supermemory）都假设「需要 AI 来决定什么值得记住」，然后提取、摘要、丢弃其余内容。MemPalace 直接存原始文本，用 ChromaDB 默认 embeddings 搜索，零提取，零摘要，零 LLM 判断。**

**为什么这更有效？**

当一个 LLM 提取出「用户偏好 PostgreSQL」时，它丢弃了：
- 为什么讨论过 PostgreSQL
- 考虑过哪些替代方案
- 权衡过程和反对意见
- 最终决策的具体背景

MemPalace 把这些全部保留，搜索模型能找到它们。

---

## 核心 Benchmark 数据

### LongMemEval R@5（行业标准基准）

| 模式 | R@5 | 是否需要 LLM | 查询成本 |
|------|-----|-------------|---------|
| **MemPal raw（纯本地）** | **96.6%** | ❌ 无需 | $0 |
| **MemPal Hybrid v4 + Haiku rerank** | **100%** | ✅ 可选（Haiku） | ~$0.001/次 |
| Supermemory ASMR | ~99% | ✅ 是 | — |
| Mastra | 94.87% | ✅ GPT-5-mini | — |
| Hind sight | 91.4% | ✅ Gemini-3 | — |
| Supermemory（生产版） | ~85% | ✅ 是 | — |
| Mem0 (RAG) | 30–45% | ✅ 是 | — |
| Gemini（长上下文） | 70–82% | — | — |

### LoCoMo Benchmark

| 系统 | 得分 | 说明 |
|------|------|------|
| **MemPal + Sonnet rerank** | **100%** | 所有 5 类问题达 100% |
| MemPal（纯本地） | 92.9% | verbatim + 语义搜索 |
| Gemini（长上下文） | 70–82% | 全量历史在 context window |
| Block extraction | 57–71% | LLM 处理过的块 |
| Mem0 (RAG) | 30–45% | LLM 提取的记忆 |

MemPalace 在 LoCoMo 上比 Mem0 高出 **2 倍以上**。

---

## 与其他系统对比

| 系统 | 核心方法 | LLM 依赖 | 本地化 | 主要弱点 |
|------|---------|---------|--------|---------|
| **MemPalace** | 纯原文存储 + 层级结构 | ❌（raw 模式无需） | ✅ 完全本地 | 新兴项目，生态待成熟 |
| **Mem0** | LLM 提取 facts 并存储 | ✅ 必须 | ❌ 需要云端 | 提取错误=记忆丢失 |
| **Mastra** | GPT-5-mini 观察对话 | ✅ 必须 | ❌ | 闭源依赖 |
| **Supermemory** | LLM agentic 搜索 | ✅ 必须 | ❌ | 生产版仅 85% |

MemPalace 的 raw 模式是**目前已发布的 LongMemEval 最高分方案，同时不需要任何 API key、不需要云端、不需要任何 LLM 介入**。

---

## 本地化与隐私

- **100% 本地运行**：ChromaDB local + AAAK 压缩，零云端调用
- **无订阅**：免费永久使用
- **开源**：GitHub 公开
- **完全离线**：基础模式不需要任何外部 API
- 数据全在本地，没有任何第三方访问

---

## 使用方式

```bash
# 安装
pip install mempalace

# 初始化
mempalace init ~/projects/myapp

# 挖掘数据
mempalace mine ~/projects/myapp          # 代码/文档
mempalace mine ~/chats/ --mode convos   # 对话
mempalace mine ~/chats/ --mode convos --extract general  # 自动分类

# 搜索
mempalace search "为什么我们切换到 GraphQL"

# MCP Server（接入 Claude Desktop）
claude mcp add mempalace -- python -m mempalace.mcp_server
```

接入 MCP 后，Claude Desktop 自动获得 19 个工具，直接提问即可：
> 「上个月关于认证我们做了什么决定？」

Claude 自动调用 `mempalace_search`，返回 verbatim 结果并回答。

---

## 成本对比

| 方案 | 加载 Token 数 | 年度成本 |
|------|-------------|---------|
| 粘贴全部历史 | 19.5M（装不下） | 不可能 |
| LLM 摘要 | ~650K | ~$507/年 |
| MemPalace wake-up | ~170 tokens | ~$0.70/年 |
| MemPalace + 5 次搜索 | ~13,500 tokens | ~$10/年 |

---

## 版本演进

| 版本 | 架构 | R@10 | 关键创新 |
|------|------|------|---------|
| Palace v1 | 全局 LLM 路由 | 34.2% | 失败：分类不匹配 |
| Wings v1 | WHERE 过滤 | 58.0% | 说话人过滤丢弃证据 |
| Palace v2 | 3 rooms | 84.8% | 索引时即分配 room |
| Wings v2 | 概念 closet | 75.6% | 按类别路由 |
| Wings v3 | 说话人私有 closet | 85.7% | 对抗测试 92.8% |
| Hybrid v5 | bge-large hybrid | 88.9% | 比 All-MiniLM 高 3.5pp |
| Hybrid v5 + Sonnet | top-50 rerank | **100%** | 结构保证 |

---

## 与 Wiki 中其他主题的关系

- **RLM（Recurrent Language Models）**：MemPalace 不是 RLM，而是一个外部记忆层，可与任何 LLM 配合
- **LCM（Long Context Models）**：与 LCM 不同——LCM 用更长的 context window，MemPalace 用外部存储 + 精准检索，效率更高（170 tokens vs 70-82% recall）
- **llm-wiki**：作为 AI 记忆基础设施，MemPalace 可能是 llm-wiki 系统中值得引用的技术选项

---

## 待验证声明

以下数据来自 GitHub README 和 benchmarks 文档，尚未经独立验证：

1. LongMemEval R@5 raw 96.6%（无 LLM）
2. Hybrid v4 + Haiku rerank 达到 100%
3. LoCoMo 比 Mem0 高 2 倍
4. AAAK 30 倍无损压缩
5. 纯本地模式零 API 调用

arXiv 论文（标题：「Raw Text Beats Extracted Memory: A Zero-API Baseline for Conversational Memory Retrieval」）尚未正式发表，需关注 GitHub 仓库更新。

---

## 链接

- GitHub: https://github.com/milla-jovovich/mempalace
- Discord: https://discord.com/invite/ycTQQCu6kn
- pip: `pip install mempalace`

---

*摘要生成时间：2026-04-07*
