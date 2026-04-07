---
title: Getting started
description: How the static wiki is structured and how to add pages.
order: 1
---

## Adding a page

1. Create a `.md` file under `content/wiki/`.
2. Use a relative path for nested URLs: `guides/setup.md` becomes `/wiki/guides/setup`.
3. Run `npm run build` to verify the site compiles.

## Stack

- Next.js App Router with `output: 'export'` (fully static output).
- MDX via `next-mdx-remote` with GitHub-flavored Markdown and syntax highlighting.
