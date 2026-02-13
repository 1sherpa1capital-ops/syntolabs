# AgentMail Setup Guide for Synto Labs

This guide walks you through setting up AgentMail to create professional email inboxes for your AI agents using your custom domain `syntolabs.com`.

## Prerequisites

- A Synto Labs account (or the ability to create one)
- Access to your domain registrar/DNS provider (Cloudflare, GoDaddy, Namecheap, etc.)
- Ownership or administrative access to `syntolabs.com`

---

## Step 1: Sign Up at AgentMail Console

1. Navigate to the **AgentMail Console**: [https://console.agentmail.to](https://console.agentmail.to)

2. Click on **Sign Up** or **Get Started** to create a new account

3. Complete the registration process:
   - Enter your email address
   - Create a password (or sign up with Google/GitHub)
   - Verify your email if required

4. Once logged in, you'll see the AgentMail dashboard with options to manage:
   - Inboxes
   - Domains
   - API Keys
   - Analytics

**Note:** The free tier includes 3 inboxes and 3,000 emails per month. For custom domains, you may need to upgrade to a paid plan.

---

## Step 2: Create an API Key

API keys authenticate your requests to the AgentMail API.

### Via the Console

1. In the AgentMail Console, look for **API Keys** in the left sidebar (usually under Settings or Account)

2. Click **Create New API Key** or **Add API Key**

3. Give your key a descriptive name (e.g., `syntolabs-production` or `development-key`)

4. Click **Create** or **Generate**

5. **Important:** Copy the API key immediately and store it securely. It will not be shown again.

### Store Your API Key

Create a `.env` file in your project root:

```bash
# .env
AGENTMAIL_API_KEY=your_api_key_here
```

Or export it in your terminal:

```bash
export AGENTMAIL_API_KEY="your_api_key_here"
```

---

## Step 3: Add Custom Domain (syntolabs.com)

You can add your domain via the Console or the API.

### Option A: Via the Console

1. Go to **Domains** in the left sidebar

2. Click **Add Domain** or **Create Domain**

3. Enter your domain name: `syntolabs.com`

4. Click **Create** to register the domain

5. You will be presented with DNS records to add (see Step 4)

### Option B: Via API

Make the following API call to create your domain:

```bash
curl -X POST https://api.agentmail.to/domains/syntolabs.com \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"
```

**Python Example:**

```python
from agentmail import AgentMail

client = AgentMail(api_key="YOUR_API_KEY")

# Create domain with default settings
domain = client.domains.create("syntolabs.com")

# Or with custom feedback forwarding (optional)
domain = client.domains.create(
    "syntolabs.com",
    feedback_enabled=True  # Receive bounce/complaint notifications
)

print("Domain created:", domain)
print("DNS Records:", domain.records)
```

**TypeScript Example:**

```typescript
import { AgentMailClient } from "agentmail";

const client = new AgentMailClient({
  apiKey: "YOUR_API_KEY",
});

const domain = await client.domains.create("syntolabs.com", {
  feedback_enabled: true
});

console.log("Domain created:", domain);
console.log("DNS Records:", domain.records);
```

**Response Example:**

The API response will include a `records` array with all DNS records you need to add:

```json
{
  "id": "domain_abc123",
  "domain": "syntolabs.com",
  "status": "pending",
  "records": [
    {
      "name": "_dmarc",
      "type": "TXT",
      "value": "v=DMARC1; p=reject; rua=mailto:dmarc-feedback@syntolabs.com"
    },
    {
      "name": "agentmail._domainkey",
      "type": "TXT",
      "value": "v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY..."
    },
    {
      "name": "@",
      "type": "TXT",
      "value": "v=spf1 include:spf.agentmail.to ~all"
    },
    {
      "name": "@",
      "type": "MX",
      "value": "inbound-smtp.us-east-1.amazonaws.com",
      "priority": 10
    }
  ]
}
```

---

## Step 4: DNS Records to Add

After adding your domain, AgentMail provides the specific DNS records you need to configure. Here's what each record type does:

### Record Types

| Record Type | Purpose | Example Name | Example Value |
|-------------|---------|--------------|---------------|
| **TXT (SPF)** | Authorizes AgentMail servers to send email on your behalf | `@` or `syntolabs.com` | `v=spf1 include:spf.agentmail.to ~all` |
| **TXT (DKIM)** | Cryptographic key for email signature verification | `agentmail._domainkey` | `v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY...` |
| **TXT (DMARC)** | Policy for handling authentication failures | `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc-feedback@syntolabs.com` |
| **MX** | Specifies mail servers for receiving email | `@` | `inbound-smtp.us-east-1.amazonaws.com` (priority: 10) |

### Adding Records to Your DNS Provider

#### Option A: BIND Zone File (Recommended)

The easiest method is to download the BIND zone file from the AgentMail Console:

1. In the Console, click **Download BIND Zone File**
2. Upload this file to your DNS provider:

| Provider | How to Import |
|----------|---------------|
| **Cloudflare** | DNS > Records > Import and Export > Upload file |
| **AWS Route 53** | Hosted Zone > Import zone file > Paste contents |
| **Porkbun** | Domain > DNS > Quick upload > Upload file |

#### Option B: Manual Records

Add each record manually:

**For Cloudflare:**
- Go to DNS > Records > Add Record
- Copy the Name and Value directly from AgentMail Console

**For AWS Route 53:**
- Go to Hosted Zone > Create Record
- **Important:** For TXT records over 255 characters, split into two quoted strings: `"firstpart""secondpart"`

**For GoDaddy:**
- Go to DNS Management > Add > TXT Record
- Enter the name and value

---

## Step 5: Verify the Domain

### Automatic Verification

AgentMail automatically checks for DNS records after you add them. This can take:

- **Few minutes** (typically)
- **Up to 48 hours** (full DNS propagation)

### Check Verification Status

1. Go to **Domains** in the AgentMail Console

2. Find `syntolabs.com` in the list

3. Check the **Status** column:

| Status | Meaning |
|--------|---------|
| `Not Started` | Click "Verify Domain" to start |
| `Pending` | Records not found or incorrect |
| `Invalid` | Records are misconfigured |
| `Failed` | Records correct, click verify button |
| `Verifying` | DNS correct, authorizing domain |
| `Verified` | Domain ready for use! |

### Trigger Manual Re-verification

If verification is stuck, click the **Verify Domain** button in the Console to trigger a re-check.

### Via API

Check domain status programmatically:

```bash
curl -X GET https://api.agentmail.to/domains/syntolabs.com \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response includes:**
```json
{
  "id": "domain_abc123",
  "domain": "syntolabs.com",
  "status": "verified",
  "records": [
    {
      "name": "_dmarc",
      "type": "TXT",
      "status": "verified"
    },
    {
      "name": "agentmail._domainkey", 
      "type": "TXT",
      "status": "verified"
    },
    {
      "name": "@",
      "type": "TXT", 
      "status": "verified"
    },
    {
      "name": "@",
      "type": "MX",
      "status": "verified"
    }
  ]
}
```

---

## Step 6: Create Team Inbox (team@ssyntolabs.com)

Once your domain is verified, you can create email inboxes.

### Via API

**Create inbox with custom domain:**

```bash
curl -X POST https://api.agentmail.to/v0/inboxes \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "team",
    "domain": "syntolabs.com",
    "display_name": "Synto Labs Team"
  }'
```

**Python:**

```python
from agentmail import AgentMail

client = AgentMail(api_key="YOUR_API_KEY")

# Create inbox with custom domain
inbox = client.inboxes.create(
    username="team",
    domain="syntolabs.com", 
    display_name="Synto Labs Team"
)

print("Inbox created:", inbox)
# Output: team@syntolabs.com
```

**TypeScript:**

```typescript
import { AgentMailClient } from "agentmail";

const client = new AgentMailClient({
  apiKey: "YOUR_API_KEY",
});

const inbox = await client.inboxes.create({
  username: "team",
  domain: "syntolabs.com",
  displayName: "Synto Labs Team"
});

console.log("Inbox:", inbox.inboxId);  // team@syntolabs.com
```

**Request Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | The part before @ (e.g., "team") |
| `domain` | string | Yes | Your verified domain (e.g., "syntolabs.com") |
| `display_name` | string | No | Friendly name for the inbox |
| `client_id` | string | No | Client-provided ID for idempotency |

### Via Console

1. Go to **Inboxes** in the AgentMail Console

2. Click **Create Inbox**

3. Fill in:
   - **Username:** `team`
   - **Domain:** `syntolabs.com` (select from dropdown)
   - **Display Name:** Synto Labs Team

4. Click **Create**

---

## Sending Your First Email

Once the inbox is created, send a test email:

```python
client.inboxes.messages.send(
    inbox_id="team@syntolabs.com",
    to="your-email@example.com", 
    subject="Test from Synto Labs",
    text="This is a test email from team@syntolabs.com!"
)
```

```typescript
await client.inboxes.messages.send("team@syntolabs.com", {
  to: "your-email@example.com",
  subject: "Test from Synto Labs",
  text: "This is a test email from team@syntolabs.com!"
});
```

---

## Next Steps

- **Set up webhooks** to receive incoming emails programmatically
- **Create additional inboxes** for different agents (e.g., support@, sales@)
- **Configure IMAP/SMTP** if you need to access emails from other clients
- **Monitor deliverability** via the AgentMail dashboard
- **Warm up your domain** gradually when sending high volumes

---

## Troubleshooting

### DNS Records Not Verifying

1. Double-check the records were added correctly
2. Wait up to 48 hours for propagation
3. Use [dnschecker.org](https://dnschecker.org) to verify records exist
4. Click "Verify Domain" in Console to re-trigger checks

### Emails Going to Spam

- Ensure SPF, DKIM, and DMARC are all verified
- Start with low volume and gradually increase
- Use proper subject lines (avoid spam trigger words)
- Ensure your domain has a positive reputation

### Route 53 TXT Record Issue

If using AWS Route 53 and the DKIM record is over 255 characters, split it:

```
# Wrong (will create 2 separate records):
"first-part" "second-part"

# Correct:
"first-part""second-part"
```

---

## Support

- **Email:** support@agentmail.cc
- **Docs:** https://docs.agentmail.to
- **Discord:** Check their website for the community link
