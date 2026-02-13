# Task Plan: AgentMail Integration for Synto Labs Landing Page

## Goal
Integrate AgentMail with the Synto Labs landing page to enable sending and receiving emails via team@syntolabs.com using custom domain syntolabs.com.

## Current Phase
Phase 3

## Phases

### Phase 1: Requirements & Discovery
- [x] Research AgentMail API, custom domains, webhooks, SDKs
- [x] Understand pricing and constraints
- [x] Document findings in findings.md
- **Status:** complete

### Phase 2: Planning & Architecture
- [x] Design system architecture
- [x] Define integration approach for React/Vite landingpage
- [x] Create API backend structure (Edge function or serverless)
- [x] Document decisions with rationale
- **Status:** complete

### Phase 3: Implementation - Domain Setup
- [ ] Create AgentMail account and get API key
- [ ] Add custom domain syntolabs.com via API
- [ ] Configure DNS records (TXT, CNAME, MX)
- [ ] Verify domain
- [ ] Create team inbox
- **Status:** pending

### Phase 4: Implementation - Backend
- [ ] Set up API route for sending emails
- [ ] Set up webhook handler for receiving emails
- [ ] Create Vercel Edge function or API route
- [ ] Configure environment variables
- **Status:** pending

### Phase 5: Implementation - Frontend Integration
- [ ] Update contact form to use AgentMail API
- [ ] Add email sending functionality
- [ ] Add webhook endpoint for incoming emails
- [ ] Test end-to-end flow
- **Status:** pending

### Phase 6: Testing & Verification
- [ ] Test sending outbound emails
- [ ] Test receiving inbound emails
- [ ] Verify DNS/email deliverability
- [ ] Document test results
- **Status:** pending

## Key Questions
1. Does AgentMail support custom domain syntolabs.com? (Yes - verified in docs)
2. What DNS records are needed? (TXT, CNAME, MX records)
3. How to integrate with Vercel/React? (Edge functions or API routes)
4. What webhook events are available? (message.received, message.sent, etc.)

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Use AgentMail over Resend/SendGrid | Full inbox + receiving + AI agent native - better for our use case |
| Use custom domain syntolabs.com | Brand consistency, professional appearance |
| Use Vercel Edge Functions | Already deployed on Vercel, easy serverless backend |
| Use webhook for inbound | Real-time email receiving, event-driven architecture |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| None yet | - | - |

## Notes
- AgentMail custom domains added Oct 2025 - this is a newer feature
- Webhook events include: message.received, message.sent, message.delivered, message.bounced, message.complained, domain.verified
- Need to check if domain syntolabs.com is already configured somewhere
- AgentMail vs Mailforge: AgentMail is for AI agents, Mailforge is for cold outreach - we need AgentMail
