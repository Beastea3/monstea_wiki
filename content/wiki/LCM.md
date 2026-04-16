---
title: Lcm
created: 2026-04-16
---

# LCM: Lossless Context Management

> **论文信息**
> - **标题**: LCM: Lossless Context Management
> - **作者**: Clint Ehrlich, Theodore Blackman（Voltropy PBC）
> - **日期**: 2026 年 2 月 14 日
> - **arXiv**: arXiv:submit/7269166 [cs.AI]

---

## 核心贡献：什么是 LCM

LCM（Lossless Context Management）是一种**确定性（deterministic）的 LLM 记忆架构**，在不损失任何历史信息的前提下，实现了比 Claude Code 更强的长上下文推理能力。

传统方法依赖滑动窗口或摘要压缩，缺点是**不可逆**——压缩后的内容无法还原为原始消息。LCM 的核心思路是：将记忆管理的负担从模型转移回引擎，由引擎提供一套确定性的数据库-backed 基础设施，而不是让模型自己"发明"记忆策略。

**一句话总结**：LCM 是一种"架构中心"（Architecture-Centric）的设计，用确定性原语替代模型自举的递归控制流，从而获得可预测的 Termination、零开销的短任务连续性，以及所有历史状态的无损可检索性。

---

## 核心架构

### 1. Immutable Store + Active Context（双状态架构）

LCM 维护两个状态：

| 组件 | 作用 |
|------|------|
| **Immutable Store** | 所有消息（用户、助手、工具结果）**原样持久化**，永不修改，是唯一 source of truth |
| **Active Context** | 实际发送给 LLM 的窗口，由近期原始消息 + 预计算的摘要节点混合组成 |

**关键保证**：每条消息 m 都能通过 `lcm_grep` 或 `lcm_expand` 找到原始内容。摘要节点是"物化视图"，是从 immutable history 派生的缓存——原始消息永远保留，可随时替换摘要。

---

### 2. Hierarchical DAG（分层有向无环图）

这是 LCM 的核心数据结构：

```
Immutable Store（持久化消息）
        ↓  compaction
  Summary Nodes（分层摘要 DAG）
        ↓
  Active Context（发送给 LLM）
```

- 以 PostgreSQL 为 backend（或其他支持事务、引用完整性、索引全文搜索的存储）
- 老消息被压缩为 Summary Node，原始内容保留在 Store 中
- **多分辨率地图**：Summary Node 提供会话历史的多分辨率视图，底层保留完整原始消息用于定向钻取
- **embedding 语义搜索**：可补充，但当前实现中 regex + 分层摘要遍历已足够

**为什么不用简单方案？**
- 纯文件 + grep：要求 agent 已经知道要找什么字符串，对开放式查询（如"目前做了哪些架构决策？"）无效
- embedding RAG：能处理开放式查询，但返回去结构化的片段，丢失了"谁在何时说了什么、为什么做此决定"这类对话上下文
- DAG 层次摘要同时解决了这两个问题

---

### 3. Three-Level Escalation（三级递增压缩）

**问题**：模型被要求摘要一段文本时，可能输出比输入还长——这叫"compaction failure"。

LCM 用三级递增协议保证必收敛：

```
Level 1 (Normal)    → LLM-Summarize(mode="preserve_details", T tokens)
Level 2 (Aggressive)→ LLM-Summarize(mode="bullet_points", T/2 tokens)
Level 3 (Fallback)  → DeterministicTruncate(X, 512)  // 无需 LLM
```

每级检查 `Tokens(S) < Tokens(X)`，不满足则升级到下一级。**Level 3 保证收敛**，因为确定性截断必然减少 token 数。

---

### 4. Zero-Cost Continuity（零开销连续性）

| 场景 | 开销 |
|------|------|
| `\|C\| < τ_soft`（上下文 < 软阈值） | **无任何开销**，引擎只做被动日志记录，用户体验即原始模型延迟 |
| `τ_soft ≤ \|C\| < τ_hard` | 异步压缩，不阻塞用户 |
| `\|C\| ≥ τ_hard` | 阻塞压缩 |

由于原子交换发生在两次 LLM 调用之间，用户感知不到延迟。这是 LCM 相比 RLM"always-on"递归环境的结构优势。

---

### 5. LLM-Map / Agentic-Map（算子级递归）

将**数据并行**任务从模型转移到引擎：

**LLM-Map**：单次工具调用，对 JSONL 输入文件中的每个 item 并行发送 stateless LLM 调用（适合分类、实体抽取、评分等无副作用任务）。引擎管理并发（默认 16）、Schema 验证、重试逻辑。

**Agentic-Map**：每个 item 启动一个完整 sub-agent 会话（可访问文件 I/O、代码执行等工具，适合多步推理）。

```
# RLM 风格（模型自举循环）
for chunk in large_file:
    response = llm.query(chunk)

# LCM 风格（确定性算子）
tool_call("llm_map",
    input_path="large_file.jsonl",
    prompt="Extract entities...",
    output_schema={...},
    concurrency=16)
```

**关键设计**：
- **数据库-backed 执行**：悲观锁实现 exactly-once 语义
- **文件-based I/O 隔离**：输入输出都是磁盘上的 JSONL 文件，不污染 Active Context
- **Schema 验证**：每次 per-item 调用后验证输出结构，失败则注入类型错误消息重试

---

### 6. Large File Handling（大文件处理）

**阈值**：文件 > τ_tokens（约 25k tokens）时，引擎不加载内容到 Active Context，而是：
- 在磁盘存储文件路径
- 生成一个 **Exploration Summary**（类型感知探索摘要）：结构化文件（JSON/CSV/SQL）提取 schema 和 shape；代码文件提取函数签名/类层次；非结构化文本用 LLM 生成摘要
- Active Context 中仅插入一个引用（文件 ID + 路径 + 摘要）

**文件 ID 传播**：当引用文件的消息被压缩时，Summary Node 保留文件 ID，确保多轮压缩后模型仍能 re-read 任何早期遇到的文件。

---

### 7. 防无限委托守卫（Scope-Reduction Invariant）

**问题**：sub-agent 可以把整个任务委托给下一个 sub-agent，产生永不干活的无限委托链。

**LCM 方案**：当 sub-agent（非 root）调用 `Task` 时，必须声明：
- `delegated_scope`：交接的具体工作范围
- `kept_work`：自己保留的工作

如果 caller 说不清自己保留了什么（即全部委托），引擎**拒绝调用**，要求直接执行。

**效果**：每层委托必须代表严格减少的责任，最终必然落到直接执行，不需要固定递归深度限制。

---

## 基准测试结果（OOLONG Benchmark）

### 测试设置
- **基准**：OOLONG benchmark（trec_coarse split），测试长上下文推理和聚合能力
- **对比对象**：Claude Code v2.1.4（OpenCode fork，使用 Opus 4.6）
- **两者均使用 Opus 4.6 + Haiku 4.5 辅助模型**（保证比较反映架构差异而非模型资源差异）
- **去污染处理**：排除模型表现出参数记忆的痕迹

### 核心数据

| 上下文长度 | Volt + LCM | Claude Code | 差值 |
|-----------|-----------|-------------|------|
| 8K        | +11.2     | +13.1       | -1.9 |
| 16K       | +25.0     | +26.3       | -1.3 |
| 32K       | **>** Claude Code | — | **正差值** |
| 131K      | —         | —           | —    |
| 256K      | +18.5     | +8.5        | **+10.0** |
| 512K      | +42.4     | +29.8       | **+12.6** |
| 1M        | +51.3     | +47.0       | **+4.3** |

- **平均绝对分数**：Volt 74.8 vs Claude Code 70.3（差 +4.5）
- **相对 Raw Opus 4.6 的提升**：Volt +29.2 vs Claude Code +24.7

### 分析

**32K 以下**：两者表现相近，Claude Code 略有优势（+13.1 vs +11.2 @ 8K）。原因是此时输入可完整放入上下文，Claude Code 的原生文件系统访问足以应付，LCM 的确定性 machinery 不带来额外优势（但也不受惩罚，Zero-Cost Continuity 保证）。

**32K 以上**：Volt 全面超越 Claude Code，且差距随上下文增大而扩大。

原因：Claude Code 依赖模型自行设计 chunking 策略——每次 rollout 都有方差，且需要在自身上下文窗口内维护跨 chunk 的连贯状态。LCM 将迭代和聚合完全委托给 LLM-Map，模型从不直接看到原始数据集，只指定 per-item prompt 和输出 schema，引擎在外部处理并行和聚合，**消除了上下文饱和作为聚合任务的失败模式**。

---

## 与 RLM 和 Claude Code 的关系

### RLM（Recursive Language Models）

| | RLM | LCM |
|--|-----|-----|
| **哲学** | Model-Centric：模型拥有完全自主的记忆管理权 | Architecture-Centric：引擎提供确定性原语，模型使用之 |
| **控制流** | 模型自己写循环代码（symbolic recursion） | 引擎管理结构化算子（LLM-Map 等） |
| **终止保证** | 依赖固定递归深度限制 | 依赖 scope-reduction invariant（结构性保证） |
| **短任务开销** | always-on REPL 初始化有固定开销 | 低于软阈值时零开销 |
| **灵活性** | 最大（可发明任意策略） | 受限但可靠 |

论文做了一个精妙的类比：**GOTO vs 结构化控制流**。RLM 相当于给模型 GOTO 级的自由（最大灵活但难以推理）；LCM 相当于 for/while/if-else 级别的结构化原语（理论上表达能力受限，但实践中远更可靠）。

**两者并不互斥**：未来系统可以默认使用 LCM 的确定性算子，同时在特殊场景下保留 RLM 风格的符号递归作为后备（就像现代语言保留 GOTO 一样）。

### Claude Code

Claude Code 是当前生产级 CLI agent 的 SOTA，拥有原生文件系统和工具调用能力。LCM 在 OOLONG 上的胜利说明：**递归上下文处理架构不仅优于原始 base model，也优于前沿生产 agent**，因为后者的 chunking 策略仍是模型自举的（每次 rollout 不稳定），而非引擎确定性的。

---

## 关键洞察

1. **主动上下文管理（Active Context Management）的范式价值**：Zhang et al. 的 RLM 揭示了"上下文管理可以是主动过程而非被动输入"这一基础性洞察。LCM 在此基础上扩展了设计空间——从"完全模型自主"到"引擎管理确定性原语"。

2. **结构化控制流 > 符号递归**：编程语言的历史（从 GOTO 到结构化编程）正在 AI 系统中重演。可预测性、终止保证、可调试性比最大灵活性更重要。

3. **零开销连续性是结构性优势**：LCM 在短任务上不损失性能，在长任务上确定性扩展。这是 always-on 递归架构无法获得的结构特性。

4. **损失无损性解锁了强大的检索能力**：Dual-state（Immutable Store + Active Context）使得任何历史状态都可恢复，Agent 可以定向钻取任意早期上下文。

5. **数据并行任务应当外化到引擎**：LLM-Map 和 Agentic-Map 让单次工具调用处理任意大规模数据集，而不让模型管理循环或上下文窗口。这是一种正交分解：模型表达意图，引擎处理执行。

6. **基准测试的脆弱性**：静态数据集（OOLONG）终将进入前沿模型的训练数据，导致污染。需要程序化生成的评估框架（参数化模板 + 动态上下文合成）来跟随上下文长度 scale。

---

## 实现：Volt

LCM 集成在 **Volt** 中——一个基于 OpenCode fork 的生产级终端编程 agent（开源研究预览）。Volt 替换了 OpenCode 的默认会话管理，LCM 的上下文控制循环和三级递增协议运行在 Volt 的消息处理管道中，无需修改模型的工具定义或提示格式。

**工具接口**（暴露给模型）：
- `lcm_grep`：正则搜索完整 immutable 历史
- `lcm_describe`：返回任意 LCM ID 的元数据
- `lcm_expand`：展开摘要节点为原始消息（仅限 sub-agent，防止主循环失控）
- `llm_map` / `agentic_map`：算子级并行处理
- `Task` / `Tasks`：sub-agent 委托（含无限递归守卫）
