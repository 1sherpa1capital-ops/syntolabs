---
name: gemini-cli
description: Delegate tasks to Gemini CLI as a subagent for comparison, second opinions, or alternative model outputs. Use for - (1) User explicitly asks to use Gemini, run gemini command, or get a "second opinion", (2) Benchmarking or comparing model outputs between Gemini and Claude, (3) Testing queries across multiple LLMs, (4) Cross-validating responses for critical tasks. The gemini CLI is located at /home/user/.npm-global/bin/gemini (v0.25.2).
---

# Gemini CLI Subagent

Delegate queries to Gemini as an alternative model for comparison, validation, or second opinions.

## Quick Start

```bash
# Run a query with Gemini (default: gemini-3-flash-preview)
gemini "your query here"

# Specify a different model
gemini --model gemini-2.5-pro "your query"

# Verbose output for debugging
gemini -v "your query"
```

## Delegation Workflow

When a user requests Gemini involvement, follow this pattern:

1. **Provide Claude's response** - Answer the question yourself first
2. **Delegate to Gemini** - Run the query via Bash tool
3. **Compare outputs** - Present both responses side-by-side
4. **Highlight differences** - Note key distinctions in approach, tone, or content

## Available Models

| Model | Use Case |
|-------|----------|
| `gemini-3-flash-preview` | Default, fast responses |
| `gemini-2.5-flash` | Faster, efficient |
| `gemini-2.0-flash` | Maximum speed |
| `gemini-2.5-pro` | Higher quality reasoning |
| `gemini-2.0-pro` | Pro model, complex tasks |

## Output Format

Present comparison using markdown tables:

```markdown
| Model | Answer |
|-------|--------|
| **Claude** | [your response] |
| **Gemini** | [gemini's response] |
```

Add brief analysis below if there are meaningful differences in approach or conclusions.
