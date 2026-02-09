# Synto Labs Delivery Playbook

**Version:** 1.0  
**Date:** February 9, 2026  
**Philosophy:** Move Fast, Break Things | 48-Hour Delivery | Build in Public

---

## 1. Delivery Philosophy

### Core Principles

| Principle | What It Means | How We Apply It |
|-----------|---------------|-----------------|
| **48-Hour Prototype** | Working demo within 48 hours | MVP-first, aggressive scoping |
| **Move Fast, Break Things** | Ship imperfect solutions, iterate quickly | Test in production, fix fast |
| **Custom, Not Cookie-Cutter** | Every solution is tailored | No templates, no one-size-fits-all |
| **MFR Guardrails** | Business logic enforced in every agent | No hallucinations, consistent output |

---

## 2. Multi-Agent System Architecture

### Agent Ecosystem

We have 8+ specialized agents that can be combined into custom workflows:

| Agent | Purpose | Key Capabilities |
|-------|---------|------------------|
| **Research Agent** | Web scraping, data extraction | Neural web scraping, PDF generation, Hormozi value layer |
| **Voice Agent** | Phone-based automation | 0.2s response time, 50+ concurrent calls, CRM native |
| **Sales Agent** | Pipeline management | Cal.com native, intent scoring, persistence logic |
| **Enrichment Agent** | Data enhancement | Waterfall enrichment, tech stack analysis, intent verification |
| **Quality Agent** | Output validation | Brand voice guard, fact verification, tone analysis |
| **Knowledge Agent** | Context management | Vector memory, real-time learning, context injection |
| **Video Agent** | Video content | Avatar generation, script personalization, HeyGen integration |
| **Brand Agent** | Voice enforcement | Voice cloning, style guide enforcement, persona management |

### Agent Coordination Patterns

**Sequential Workflow:**
```
Scout → Research → Writer → Sender
```

**Parallel Workflow:**
```
         → Enrichment →
Scout →              → Quality → Output
         → Research →
```

**Conditional Workflow:**
```
Scout → Research → [Score > 7?] → YES: Writer → NO: Archive
```

---

## 3. The 48-Hour Build Sprint

### Hour-by-Hour Breakdown

```
Hour 0-2:   Access verification + environment setup
Hour 2-8:   Core agent development (MVP functionality)
Hour 8-16:  Integration with client tools
Hour 16-24: Testing + bug fixes
Hour 24-32: Refinement + edge cases
Hour 32-40: MFR guardrails implementation
Hour 40-48: Final polish + demo prep
```

### Day-by-Day View

**Day 1: Foundation**
- Verify all access works
- Set up dev environment
- Build core agent logic
- Test with sample data

**Day 2: Integration**
- Connect to client's CRM, email, calendar
- Test end-to-end flows
- Handle edge cases
- Add error handling

---

## 4. MFR Guardrails Layer

### What is MFR?

**Model-First Reasoning (MFR)** is our proprietary guardrail system that ensures every agent output follows business logic before reaching the client.

### MFR Components

| Component | Purpose | Example |
|-----------|---------|---------|
| **No-Hallucination Guarantee** | Prevent AI from making things up | Fact verification against source data |
| **Adaptive Outcome Logic** | Business rules enforced | "Don't email competitors" |
| **Deep Context Retention** | Remembers across sessions | Client preferences, brand voice |
| **Brand Voice Guard** | Consistent communication | Tone, style, formatting enforced |

### MFR Implementation

```
User Request → Agent → MFR Layer → Validation → Output
                              ↓
                         Fails validation
                              ↓
                         Retry with guardrails
```

---

## 5. Tool Stack

### Core Technologies

| Category | Tools | Purpose |
|----------|-------|---------|
| **Agent Development** | Claude Code, OpenAI API | LLM orchestration |
| **Tool Integration** | Composio | External API connections |
| **Web Scraping** | Crawl4AI, Firecrawl | Data extraction |
| **Email** | Gmail API, SendGrid | Outreach automation |
| **Calendar** | Cal.com API | Scheduling |
| **CRM** | HubSpot, Notion, Airtable | Data storage |
| **Project Mgmt** | Linear, GitHub | Task tracking |

### Infrastructure

| Component | Tool | Cost/Month |
|-----------|------|------------|
| Hosting | Vercel, Railway | $50-100 |
| Database | Qdrant, Supabase | $25-50 |
| APIs | OpenAI, Claude, Composio | $200-500 |
| Monitoring | Custom dashboards | $0 |

---

## 6. Common Workflow Patterns

### Pattern 1: Sales Outreach Automation

**Agents:** Scout → Research → Writer → Sender

**Flow:**
1. Scout finds leads matching ICP
2. Research enriches each lead (30 seconds)
3. Writer personalizes outreach
4. Sender sends at optimal times

**Timeline:** 48 hours to prototype, 2 weeks to production

---

### Pattern 2: Lead Qualification

**Agents:** Research → Scoring → Router

**Flow:**
1. Research analyzes lead data
2. Scoring assigns qualification score
3. Router routes to appropriate owner

**Timeline:** 48 hours to prototype, 1 week to production

---

### Pattern 3: Inbox Triage

**Agents:** Classifier → Draft → Router

**Flow:**
1. Classifier categorizes incoming emails
2. Draft prepares response
3. Router sends to right team member

**Timeline:** 48 hours to prototype, 1 week to production

---

## 7. Testing & Quality Assurance

### Testing Pyramid

```
                    /\
                   /  \
                  / E2E \
                 /______\
                /        \
               /Unit      \
              /            \
             /Integration \
            /______________\
```

### Test Types

| Type | What It Tests | Frequency |
|------|---------------|----------|
| **Unit** | Individual agent functions | Every build |
| **Integration** | Agent-to-agent communication | Every build |
| **E2E** | Full workflow with live tools | Before demo |
| **MFR** | Guardrail effectiveness | Every build |

### Testing Checklist

- [ ] Each agent works independently
- [ ] Agents pass data correctly
- [ ] MFR guardrails trigger appropriately
- [ ] Integrations work with live tools
- [ ] Error handling works
- [ ] Output matches expected format

---

## 8. Error Handling

### Error Categories

| Category | Example | Handling Strategy |
|----------|---------|-------------------|
| **API Failure** | Gmail API down | Retry with exponential backoff |
| **Data Missing** | Lead missing email | Log and skip with notification |
| **Rate Limit** | Too many API calls | Queue and throttle |
| **Invalid Output** | Agent hallucinates | MFR catches and retries |

### Fallback Strategies

```python
# Pseudocode for error handling
try:
    result = agent.execute(input_data)
except APIError:
    # Retry with backoff
    result = retry_with_backoff(agent.execute, input_data)
except DataError:
    # Log and skip
    log_error(input_data)
    return None
except OutputError:
    # MFR validation failed
    result = mfr_validate(agent.execute, input_data)
```

---

## 9. Security Best Practices

### Data Protection

| Practice | Implementation |
|----------|----------------|
| **API Keys** | Environment variables, never in code |
| **Client Data** | Isolated per project, deleted after 90 days |
| **Access Control** | Principle of least privilege |
| **Logging** | No sensitive data in logs |

### Compliance Considerations

- **GDPR:** Data residency, right to deletion
- **CCPA:** Data transparency, opt-out requirements
- **SOC2:** Audit logging, access controls (when required)

---

## 10. Deployment Process

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Client sign-off on functionality
- [ ] Production environment ready
- [ ] Monitoring configured
- [ ] Rollback plan documented

### Deployment Steps

1. **Staging Deployment**
   - Deploy to staging environment
   - Run full test suite
   - Client testing

2. **Production Deployment**
   - Deploy to production
   - Verify live functionality
   - Monitor first 100 executions

3. **Post-Deployment**
   - Daily check-ins for first week
   - Weekly check-ins for month 1
   - Monthly check-ins after

---

## 11. Client Communication

### Daily Updates (During Build)

Send daily during active development:

```
Subject: [Company] Automation — Day [X] Update

**Today's Progress:**
- [Completed task 1]
- [Completed task 2]

**Blockers:**
- [Any blockers, or "None"]

**Tomorrow's Plan:**
- [Planned task 1]
- [Planned task 2]

**ETA:**
- Prototype demo: [Date/Time]

Questions? Just reply.

— Rhigden
```

### Demo Script

```
"Remember the problem we discussed: [their pain point]?

Here's what we built in 48 hours:

[DEMO — show the workflow in action]

Let me walk you through each piece:

1. [Agent 1]: [Show it working]
2. [Agent 2]: [Show it working]
3. [Agent 3]: [Show it working]

And here's the output: [Show final result]

Ready to see it run live?"
```

---

## 12. Handoff & Documentation

### Deliverables Package

Every project includes:

- [ ] Working system (deployed)
- [ ] User guide (how to use)
- [ ] Troubleshooting guide (common issues)
- [ ] Technical documentation (code, APIs)
- [ ] Video walkthrough (if applicable)

### Documentation Template

```markdown
# [Workflow Name] — User Guide

## Overview
[Brief description]

## How to Use
[Step-by-step instructions]

## Troubleshooting

| Issue | Solution |
|-------|----------|
| [Problem] | [Fix] |

## Technical Details

### Agents
- [Agent 1]: [Purpose]
- [Agent 2]: [Purpose]

### Integrations
- [Tool 1]: [Purpose]

## Support
Email: rhigden@syntolabs.xyz
Response time: 24 hours (included for 30 days)
```

---

## 13. Optimization & Iteration

### Week 1 Post-Delivery

- Monitor execution logs
- Fix bugs immediately
- Optimize for speed
- Gather client feedback

### Month 1 Post-Delivery

- Weekly optimization calls
- Performance tuning
- Feature requests (for phase 2)
- ROI measurement

---

**Document End**

*Move fast, break things. Fix faster.*
