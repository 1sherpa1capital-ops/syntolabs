# Composio Setup & Configuration

## Environment Variables
The integration relies on two critical environment variables in the project's `.env` file:

1. `COMPOSIO_API_KEY`: The API key for authenticating with Composio.
2. `COMPOSIO_ENTITY_ID`: A persistent identifier (e.g., `pg-test-...`) that links specific account authorizations (Gmail, etc.) to this agent instance.

## Authorization Flow
If connections are inactive, they must be authorized via the web.

1. Generate authorization links using the Composio SDK.
2. The user must click the link to authorize the specific app (e.g., Gmail).
3. Once authorized, the connection is permanently linked to the `COMPOSIO_ENTITY_ID`.

## Supported Apps
The current Mercer pipeline requires:
- **Gmail** (`App.GMAIL`): For drafting outreach emails.
- **Google Sheets** (`App.GOOGLESHEETS`): For syncing lead data.
- **Google Maps** (`App.GOOGLE_MAPS`): For fallback lead discovery.
