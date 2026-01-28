import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Ensure we can find the project root for .env
project_root = (
    Path(__file__).resolve().parents[3]
)  # Adjust based on depth (.claude/skills/composio/scripts)
env_path = project_root / ".env"
load_dotenv(env_path)

# Try importing from the virtualenv environment if possible,
# otherwise rely on the agent's runtime environment
try:
    from composio_claude import ComposioToolSet, App
except ImportError:
    print("Error: composio_claude not installed. Run 'pip install composio-claude'")
    sys.exit(1)


def verify_connections():
    """
    Verifies the connection status of the core Mercer integrations:
    Gmail, Google Sheets, and Google Maps.
    """
    print("--- Verifying Composio Connections ---")

    api_key = os.environ.get("COMPOSIO_API_KEY")
    entity_id = os.environ.get("COMPOSIO_ENTITY_ID")

    if not api_key:
        print("❌ Error: COMPOSIO_API_KEY not found in environment")
        return

    if not entity_id:
        print("❌ Error: COMPOSIO_ENTITY_ID not found in environment")
        return

    print(f"Entity ID: {entity_id}")

    try:
        toolset = ComposioToolSet(api_key=api_key, entity_id=entity_id)
        entity = toolset.get_entity()

        apps_to_check = [
            ("Gmail", App.GMAIL),
            ("Google Sheets", App.GOOGLESHEETS),
            ("Google Maps", App.GOOGLE_MAPS),
        ]

        all_active = True
        for name, app_enum in apps_to_check:
            try:
                connection = entity.get_connection(app=app_enum)
                if connection and connection.status == "ACTIVE":
                    print(f"✅ {name}: ACTIVE")
                else:
                    status = (
                        getattr(connection, "status", "Unknown")
                        if connection
                        else "None"
                    )
                    print(f"❌ {name}: INACTIVE (Status: {status})")
                    all_active = False
            except Exception as e:
                print(f"⚠️  {name}: Check failed - {str(e)}")
                all_active = False

        if not all_active:
            print(
                "\nTo fix connections, use the 'setup_integrations' function in the setup script."
            )
            sys.exit(1)

    except Exception as e:
        print(f"Critical Error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    verify_connections()
