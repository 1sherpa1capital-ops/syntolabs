---
name: sync-skills
description: Bidirectional sync between .agent/skills/ and .claude/skills/ folders. Skills are organized by category (ai-agents, ai-llm, backend, frontend, etc.) in both locations. Use when: (1) After creating or modifying any skill, (2) Before committing changes to ensure both folders are in sync, (3) When switching between Gemini CLI and Claude CLI to ensure both have latest skills, (4) After pulling skill updates from a remote repository. The skill auto-detects which folder was modified more recently and syncs in the appropriate direction using rsync.
---

# Sync Skills

Keep `.agent/skills/` and `.claude/skills/` synchronized for Gemini CLI and Claude CLI compatibility.

Skills are organized into category folders: `ai-agents`, `ai-llm`, `backend`, `frontend`, `security-pentest`, etc.

## Quick Start

```bash
# Auto-detect which folder has newer changes and sync accordingly
python3 .claude/skills/skills/sync-skills/scripts/sync_skills.py

# Or force specific direction
python3 .claude/skills/skills/sync-skills/scripts/sync_skills.py --direction agent->claude
python3 .claude/skills/skills/sync-skills/scripts/sync_skills.py --direction claude>agent

# Sync only specific category
python3 .claude/skills/skills/sync-skills/scripts/sync_skills.py --category frontend
```

## How It Works

1. **Auto-detect mode (default):** Compares modification times of both folder hierarchies
   - Scans all category subfolders recursively
   - Newer folder → older folder
   - If equal, folders are already in sync

2. **Force mode:** Specify direction explicitly
   - `agent->claude`: Sync .agent → .claude
   - `claude->agent`: Sync .claude → .agent

3. **Category sync:** Optional filter for specific category
   - `--category frontend`: Only sync skills in the `frontend/` category
   - Useful when working on specific domain skills

4. **Uses rsync:** Efficient file transfer with:
   - Archive mode (preserves permissions, times, symlinks)
   - Delete removed files from destination
   - Only transfers changed files
   - Handles category folder structure correctly

## When to Run

| Trigger | Action |
|---------|--------|
| Created/modified a skill | Run sync |
| Switching CLIs | Run sync to update target |
| Before git commit | Ensure both folders match |
| After git pull | Sync incoming changes |
| After skill install/update | Propagate to both folders |

## Git Hook

A pre-commit hook is installed at `.git/hooks/pre-commit` that automatically runs sync before every commit.

To skip the hook if needed:
```bash
git commit --no-verify
```

## Notes

- Requires `rsync` (built-in on Linux/Mac)
- No external dependencies needed
- Works with categorized skill structure (18 category folders)
- Syncs recursively through all category subfolders
- Preserves file permissions and timestamps
- Shows which files changed during sync
- Both `.agent/skills/` and `.claude/skills/` maintain identical category structure
