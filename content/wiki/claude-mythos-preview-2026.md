---
title: Claude Mythos Preview 技术报告
authors: Nicholas Carlini, Newton Cheng, Keane Lucas, Michael Moore, Milad Nasr, Vinay Prabhushankar, Winnie Xiao et al.
date: 2026-04-07
source: claude-mythos-preview-2026
tags: [ai-security, vulnerability-research, claude, anthropic, zero-day, exploit-development]
created: 2026-04-09
updated: 2026-04-09
---

# Claude Mythos Preview 技术报告摘要

> 原文：[Claude Mythos Preview](https://red.anthropic.com/2026/mythos-preview/) — Anthropic Research Blog, 2026-04-07

## 基本信息

- **发布机构：** Anthropic
- **作者：** Nicholas Carlini, Newton Cheng, Keane Lucas, Michael Moore, Milad Nasr, Vinay Prabhushankar, Winnie Xiao 等
- **发布日期：** 2026 年 4 月 7 日
- **同期发布：** [Project Glasswing](https://anthropic.com/glasswing)
- **类型：** 研究博客 / 技术报告

## 核心贡献

Claude Mythos Preview 是 Anthropic 发布的新一代通用大语言模型，在计算机安全任务上表现尤为突出。Anthropic 同时启动了 **Project Glasswing** 计划，旨在利用该模型帮助保护全球最关键的软件系统，并推动整个行业在网络攻击持续演进的背景下加强防御能力。

**核心主张：** 该模型无需专门训练，即可在定向用户的引导下，自主发现并利用主流操作系统和浏览器中的零日（zero-day）漏洞。

## 关键技术发现

### 1. 零日漏洞发现与利用

Mythos Preview 被证明能够：
- 在**所有主流操作系统**和**所有主流 Web 浏览器**中发现并利用零日漏洞
- 发现的漏洞往往**隐蔽且难以检测**，许多已有 10～20 年历史
- 发现了 OpenBSD 中一个**已存在 27 年的漏洞**（现已修复），该漏洞与 SACK（Selective Acknowledgment）机制有关

### 2. 复杂漏洞利用链

Mythos Preview 构造的漏洞利用不限于简单的栈溢出：

- **Web 浏览器漏洞利用：** 将 4 个漏洞串联，构建复杂的 JIT 堆喷（JIT heap spray），实现渲染进程和操作系统沙箱的双重逃逸
- **本地权限提升：** 利用竞态条件和 KASLR 绕过技术，在 Linux 等操作系统上自主获取本地权限提升漏洞
- **FreeBSD NFS 远程代码执行：** 将 20-gadget 的 ROP 链拆分成多个数据包，在无需身份验证的情况下获取完整 root 访问权限

### 3. 自主性与可扩展性

- Anthropic **无安全培训经验的工程师**，仅需让 Mythos Preview 夜间寻找远程代码执行漏洞，次日早上即可获得完整的可工作漏洞
- 研究人员可开发脚手架（scaffold），实现**无需人工干预**的漏洞到漏洞利用的自动化转化

### 4. 基准测试对比

| 模型 | Tier 1-2 崩溃 | Tier 3 | Tier 4 | Tier 5（完整控制流劫持） |
|------|-------------|--------|--------|----------------------|
| Sonnet 4.6 | 150–175 | — | — | — |
| Opus 4.6 | 150–175 | 1 | — | — |
| **Mythos Preview** | **595** | **若干** | **若干** | **10**（全部已打补丁目标） |

- Opus 4.6 在 Mozilla Firefox 148 JavaScript 引擎上，将已发现漏洞转化为 JavaScript shell 漏洞的成功率为 **2/数百次**
- Mythos Preview 在相同漏洞集上：成功 **181 次**，另有 29 次实现寄存器控制

### 5. 漏洞发现数量

- 在约 **1000 个** OSS-Fuzz 仓库中进行测试，每个仓库约 **7000 个入口点**
- 超过 **99%** 的漏洞**尚未修补**，无法详细披露（遵循协调漏洞披露流程）
- 可披露的漏洞仅约 **1%**

### 6. 能力涌现

这些安全能力并非专门训练的结果，而是代码、推理和自主性等通用能力提升的**下游涌现（emerged）**。这意味着：能够更有效修补漏洞的模型，同样也会更有效地利用漏洞。

## 与既有 Wiki 条目的关系

- **AI 安全主题：** 本次发布是 AI 安全领域（AI Security）的重要里程碑，建议补充相关主题页
- **协调漏洞披露（Coordinated Vulnerability Disclosure）：** 本次发布遵循 CVD 流程，是该流程的典型实践案例
- **零日漏洞（Zero-day Vulnerability）：** 核心研究对象
- **漏洞利用技术：** ROP chain、KASLR bypass、JIT heap spray、memory corruption 均为具体技术手段

## 行业影响与建议

- **短期：** 攻击者可能比防御者更快利用这些工具
- **长期：** 强大的语言模型将更多惠及防御者，提高整个软件生态系统的安全性
- **当前行动：** 通过 Project Glasswing 向关键行业合作伙伴和开源开发者**限量发布**模型，在类似能力广泛开放之前先行保护最重要的系统

## 相关页面

- [[claude-mythos-preview]] — 实体页
- [[project-glasswing]] — 实体页
- [[anthropic]] — 实体页
- [[zero-day-vulnerability]] — 概念页
- [[rop-chain]] — 概念页
- [[kaslr-bypass]] — 概念页
- [[jit-heap-spray]] — 概念页
- [[memory-corruption]] — 概念页
- [[sack-vulnerability]] — 概念页
- [[coordinated-vulnerability-disclosure]] — 概念页
