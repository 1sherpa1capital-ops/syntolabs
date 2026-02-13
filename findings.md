# Findings & Decisions

## Requirements
- Send outreach emails from landing page (contact form, demo requests)
- Receive replies and incoming emails
- Use branded email: team@syntolabs.com
- Custom domain: syntolabs.com
- Integrate with React/Vite landingpage on Vercel

## Research Findings

### AgentMail Core Capabilities
- **Inboxes API**: Create, manage, operate email inboxes entirely via API
- **Custom Domains**: Add and verify own domains for sending/receiving (added Oct 2025)
- **Webhooks**: Real-time notifications for email events
- **SDKs**: Python, Node.js/TypeScript available
- **MCP Integration**: Model Context Protocol support
- **Stats**: 20M+ emails delivered, enterprise-grade reliability

### Custom Domain Setup
1. **Add domain** via `POST /domains` API
2. **Get verification records**: TXT, CNAME, MX records
3. **Add DNS records** to domain registrar (Cloudflare)
4. **Verify domain** via `POST /domains/{domain_id}/verify`
5. **Create inboxes** on verified domain

### DNS Records Required
- **TXT**: Domain verification
- **CNAME**: Mail routing
- **MX**: Incoming mail servers
- AgentMail provides zone file export for easy setup

### Webhook Events Available
| Event | Description |
|-------|-------------|
| message.received | New inbound email (most common) |
| message.sent | Outbound message sent |
| message.delivered | Delivery confirmed |
| message.bounced | Bounce with type/recipients |
| message.complained | Spam complaint |
| message.rejected | Rejection (validation) |
| domain.verified | Domain verification succeeded |

### Sending Emails (SDK)
```python
from agentmail import AgentMail
client = AgentMail(api_key="YOUR_KEY")
client.inboxes.messages.send(
    inbox_id="team@syntolabs.com",
    to=["recipient@example.com"],
    subject="Hello",
    text="Plain text body",
    html="<html>HTML body</html>"
)
```

### Receiving Emails (Webhook)
Webhook payload for message.received includes:
- inbox_id, thread_id, message_id
- labels array
- timestamp
- from, to (array)
- Full message content

### API Base URL
- `https://api.agentmail.to/v0/`

### Pricing
- Not explicitly found - need to check console
- Note: AgentMail is for AI agents, not cold outreach (Mailforge is alternative for cold email)

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Use AgentMail | Full inbox + receiving + AI-native vs send-only APIs |
| Custom domain syntolabs.com | Brand consistency |
| Vercel Edge Functions | Already on Vercel, serverless backend |
| Webhook for inbound | Real-time, event-driven |
| TypeScript SDK | Type safety with landingpage stack |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| None yet | - |

## Resources
- AgentMail Console: https://console.agentmail.to
- Docs: https://docs.agentmail.to
- Custom Domains: https://docs.agentmail.to/custom-domains
- Webhooks: https://docs.agentmail.to/webhooks
- Python SDK: https://github.com/agentmail-to/agentmail-python
- Node SDK: https://github.com/agentmail-to/agentmail-node

## Visual/Browser Findings
- Custom domain feature added October 2025
- Webhook verification uses Svix-style headers
- Supports both polling and webhooks for receiving
- Zone file export available for easy DNS setup
- Domain health monitoring via API
