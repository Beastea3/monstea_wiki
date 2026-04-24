---
title: "Recursive Language Models (GitHub Summary)"
tags: [github, code, mit, recursive-language-models, python, repl]
type: summary
created: 2026-04-24
updated: 2026-04-24
---

# Recursive Language Models — GitHub Repository Summary

> **Repository**: https://github.com/alexzhang13/rlm
> - **Stars**: 3,569 | **Forks**: 650 | **Issues**: 77
> - **License**: MIT
> - **Language**: Python
> - **Maintainer**: MIT OASYS lab

---

## Overview

The official implementation of Recursive Language Models (RLMs) provides an **extensible inference engine** that wraps standard API-based and local LLMs with recursive REPL-based context handling. Installable via `pip install rlms` [Source: sources/rlm-github.md].

---

## Key Features

### Drop-in API

```python
from rlm import RLM

rlm = RLM(
    backend="openai",
    backend_kwargs={"model_name": "gpt-5-nano"},
    verbose=True,
)
print(rlm.completion("Print me the first 100 powers of two, each on a newline.").response)
```

### Multiple REPL Environments

| Environment | Type | Isolation | Notes |
|-------------|------|-----------|-------|
| `local` (default) | Non-isolated | Host process | Uses Python `exec`; shares venv; safe for benchmarking |
| `docker` | Semi-isolated | Container | Default `python:3.11-slim` image |
| `modal` | Isolated | Cloud | Modal Sandboxes |
| `prime` | Isolated | Cloud | Prime Intellect Sandboxes (beta) |
| `daytona` | Isolated | Cloud | Daytona Sandboxes |
| `e2b` | Isolated | Cloud | E2B Sandboxes [Source: sources/rlm-github.md] |

### Model Provider Support

- OpenAI, Anthropic
- Router platforms: OpenRouter, Portkey
- Local models via vLLM (OpenAI-compatible client) [Source: sources/rlm-github.md]

### Logging & Visualization

- **In-memory metadata**: `completion.metadata` holds full trajectory (config + iterations + sub-calls)
- **Disk logging**: `RLMLogger(log_dir="./logs")` writes JSONL for the visualizer
- **Visualizer**: Node.js/shadcn/ui app to inspect code, sub-LM, and root-LM call trajectories [Source: sources/rlm-github.md]

---

## Related Repositories

- **Minimal implementation**: https://github.com/alexzhang13/rlm-minimal — stripped-down reference for building on top of RLMs [Source: sources/rlm-github.md]

---

## Citation

```bibtex
@misc{zhang2026recursivelanguagemodels,
      title={Recursive Language Models},
      author={Alex L. Zhang and Tim Kraska and Omar Khattab},
      year={2026},
      eprint={2512.24601},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2512.24601},
}
```

---

## Related Pages

- [[recursive-language-models]] — Main concept page
- [[rlm-paper]] — arXiv paper summary
- [[alex-l-zhang]] — Lead author / maintainer
