---
name: composio-integration
description: Manage and verify Composio integrations for external tools (Gmail, Google Sheets, Google Maps). Use this skill when the user asks to check connection status, troubleshooting integration errors, or verify if external tools are authorized.
---

# Composio Integration

This skill manages the connection between the agent and external services via Composio.

## Verify Connections
To check if the required tools (Gmail, Sheets, Maps) are connected and active:

```bash
python .agent/skills/composio-integration/scripts/verify_connections.py
```

This script checks the status against the configured `COMPOSIO_ENTITY_ID` in the `.env` file.

## Setup & Configuration
If connections are missing or the entity ID is unknown, refer to [SETUP.md](references/setup.md) for configuration details and authorization flows.

## Usage in Code
When initializing the `ComposioToolSet` in Python code, ALWAYS provide the `entity_id` to ensure access to the authorized accounts:

```python
from composio_claude import ComposioToolSet

# Always load from env
entity_id = os.environ.get("COMPOSIO_ENTITY_ID")
toolset = ComposioToolSet(entity_id=entity_id)
```
