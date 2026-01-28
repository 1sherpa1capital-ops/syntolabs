#!/usr/bin/env python3
"""
Bidirectional sync script for .agent and .claude skills folders.
Skills are organized by category (ai-agents, ai-llm, backend, etc.).
Detects which folder has newer files and syncs accordingly using rsync.
"""

import os
import subprocess
import sys
from pathlib import Path
from datetime import datetime
from typing import Optional

# Project paths
PROJECT_ROOT = Path.cwd()
AGENT_SKILLS = PROJECT_ROOT / ".agent" / "skills"
CLAUDE_SKILLS = PROJECT_ROOT / ".claude" / "skills"

# Category folders (exclude from sync as they are meta-folders)
CATEGORIES = {
    "ai-agents",
    "ai-llm",
    "backend",
    "browser-automation",
    "cloud-devops",
    "content-writing",
    "design-creative",
    "development",
    "documents",
    "frontend",
    "marketing-business",
    "meta",
    "research-strategy",
    "security-dev",
    "security-pentest",
    "testing-quality",
    "web",
    "workflow-dev",
}


def get_folder_mtime(folder: Path) -> float:
    """Get the most recent modification time in a folder."""
    if not folder.exists():
        return 0

    mtime = 0
    for item in folder.rglob("*"):
        if item.is_file():
            item_mtime = item.stat().st_mtime
            if item_mtime > mtime:
                mtime = item_mtime
    return mtime


def run_rsync(source: Path, dest: Path, category: Optional[str] = None) -> bool:
    """
    Run rsync from source to destination.

    Args:
        source: Source folder path
        dest: Destination folder path
        category: Optional category filter (only sync this category folder)
    """
    if category:
        # Sync specific category folder
        source_path = source / category
        dest_path = dest / category
        if not source_path.exists():
            print(f"Warning: Category {category} not found in source", file=sys.stderr)
            return False
    else:
        # Sync all categories
        source_path = source
        dest_path = dest

    cmd = [
        "rsync",
        "-av",  # archive mode, verbose
        "--delete",  # delete files in dest that aren't in source
        f"{source_path}/",
        f"{dest_path}/",
    ]

    print(f"Syncing: {source_path} -> {dest_path}")
    result = subprocess.run(cmd, capture_output=True, text=True)

    if result.returncode != 0:
        print(f"Error: {result.stderr}", file=sys.stderr)
        return False

    # Show what changed
    if result.stdout:
        for line in result.stdout.strip().split("\n"):
            if line and not line.startswith("sending") and not line.startswith("total"):
                print(f"  {line}")

    return True


def sync_skills(direction: str = "auto", category: Optional[str] = None) -> bool:
    """
    Sync skills between .agent and .claude folders.

    Args:
        direction: "agent->claude", "claude->agent", or "auto" (detect by mtime)
        category: Optional category filter (only sync this category)
    """
    if not AGENT_SKILLS.exists():
        print(f"Error: {AGENT_SKILLS} does not exist", file=sys.stderr)
        return False

    if not CLAUDE_SKILLS.exists():
        print(f"Error: {CLAUDE_SKILLS} does not exist", file=sys.stderr)
        return False

    # Determine sync direction
    if direction == "auto":
        if category:
            # Check mtime for specific category
            agent_cat = AGENT_SKILLS / category
            claude_cat = CLAUDE_SKILLS / category
            agent_mtime = get_folder_mtime(agent_cat) if agent_cat.exists() else 0
            claude_mtime = get_folder_mtime(claude_cat) if claude_cat.exists() else 0
        else:
            # Check mtime across all categories
            agent_mtime = get_folder_mtime(AGENT_SKILLS)
            claude_mtime = get_folder_mtime(CLAUDE_SKILLS)

        print(f"Agent skills mtime: {datetime.fromtimestamp(agent_mtime)}")
        print(f"Claude skills mtime: {datetime.fromtimestamp(claude_mtime)}")

        if agent_mtime > claude_mtime:
            direction = "agent->claude"
        elif claude_mtime > agent_mtime:
            direction = "claude->agent"
        else:
            print("Folders are in sync (same mtime)")
            return True

    print(f"Direction: {direction}")
    if category:
        print(f"Category: {category}")

    # Perform sync
    if direction == "agent->claude":
        success = run_rsync(AGENT_SKILLS, CLAUDE_SKILLS, category)
    elif direction == "claude->agent":
        success = run_rsync(CLAUDE_SKILLS, AGENT_SKILLS, category)
    else:
        print(f"Error: Invalid direction '{direction}'", file=sys.stderr)
        return False

    if success:
        print("✓ Sync complete")

    return success


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Sync skills between .agent and .claude (organized by category)"
    )
    parser.add_argument(
        "--direction",
        choices=["auto", "agent->claude", "claude->agent"],
        default="auto",
        help="Sync direction (default: auto-detect by modification time)",
    )
    parser.add_argument(
        "--category",
        choices=sorted(CATEGORIES),
        default=None,
        help="Sync only specific category (default: sync all categories)",
    )
    parser.add_argument(
        "--list-categories",
        action="store_true",
        help="List all available categories and exit",
    )

    args = parser.parse_args()

    if args.list_categories:
        print("Available categories:")
        for cat in sorted(CATEGORIES):
            print(f"  - {cat}")
        sys.exit(0)

    success = sync_skills(args.direction, args.category)
    sys.exit(0 if success else 1)
