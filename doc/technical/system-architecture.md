# Synto Labs System Architecture

**Version:** 1.0  
**Date:** February 9, 2026  
**Purpose:** Technical blueprint for multi-agent AI automation systems

---

## 1. Architecture Overview

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   CRM    │  │  Email   │  │ Calendar │  │ Database │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
└───────┼────────────┼────────────┼────────────┼────────────────┘
         │            │            │            │
         └────────────┼────────────┼────────────┘
                      │            │
┌─────────────────────┼────────────┼──────────────────────────────┐
│                   INTEGRATION LAYER                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │            API Gateway / Orchestration                │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────┼────────────┼──────────────────────────────┘
                      │            │
┌─────────────────────┼────────────┼──────────────────────────────┐
│                   AGENT LAYER                                │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │ Scout   │→│Research │→│ Writer  │→│ Sender  │ │ Quality ││
│  │ Agent   │ │ Agent   │ │ Agent   │ │ Agent   │ │ Agent   ││
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘│
│       │           │           │           │          │    │
└───────┼───────────┼───────────┼───────────┼──────────┼────┘
        │           │           │           │          │
┌───────┼───────────┼───────────┼───────────┼──────────┼────┐
│              ┌───┴────┐ ┌────┴─────┐ ┌─┴────────┐           │
│              │ MFR    │ │Knowledge │ │  Video   │ (optional)│
│              │Layer   │ │  Agent  │ │  Agent   │           │
│              └────────┘ └──────────┘ └──────────┘           │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Agent Ecosystem

### Core Agents

#### Research Agent
**Purpose:** Web scraping, data extraction, document generation

**Capabilities:**
- Neural web scraping (Crawl4AI, Firecrawl)
- PDF generation
- Hormozi value layer (business logic first)

**Tools:**
- Crawl4AI (primary), Firecrawl (fallback)
- Puppeteer/Playwright for dynamic content
- PDF generation libraries

---

#### Voice Agent
**Purpose:** Phone-based automation, inbound qualification, outbound follow-up

**Capabilities:**
- 0.2s response time
- 50+ concurrent calls
- CRM native integration

**Tools:**
- Bland AI, Vapi.ai (providers)
- Twilio for telephony
- Custom ASR/TTS pipelines

---

#### Sales Agent
**Purpose:** Pipeline management, meeting booking

**Capabilities:**
- Cal.com native integration
- Intent scoring
- Persistence logic (follow-up sequences)

**Tools:**
- Cal.com API
- HubSpot/Salesforce APIs
- Custom scoring models

---

#### Enrichment Agent
**Purpose:** Data enhancement, contact discovery

**Capabilities:**
- Waterfall enrichment (multiple sources)
- Tech stack analysis
- Intent verification

**Tools:**
- Clearbit, Apollo, Hunter (enrichment sources)
- BuiltWith (tech stack)
- Custom APIs

---

#### Quality Agent
**Purpose:** Output validation, brand enforcement

**Capabilities:**
- Brand voice guard
- Fact verification
- Tone analysis

**Tools:**
- Custom validation rules
- Style guide enforcement
- Sentiment analysis APIs

---

#### Knowledge Agent
**Purpose:** Context management, memory

**Capabilities:**
- Vector memory (Qdrant, Supabase)
- Real-time learning
- Context injection

**Tools:**
- Qdrant (vector database)
- OpenAI Embeddings
- Custom context management

---

#### Video Agent
**Purpose:** Video content generation

**Capabilities:**
- Avatar generation
- Script personalization
- HeyGen integration

**Tools:**
- HeyGen API
- Custom avatar systems
- Video editing pipelines

---

#### Brand Agent
**Purpose:** Voice consistency, persona management

**Capabilities:**
- Voice cloning
- Style guide enforcement
- Persona management

**Tools:**
- Custom voice models
- Style guide parsers
- Prompt engineering

---

## 3. MFR Guardrails Layer

### Architecture

```
Agent Output → MFR Validator → Business Rules → Approval/Rejection
                  ↓
           Rejection → Retry with Guardrails → Re-validate
```

### Components

| Component | Purpose | Implementation |
|-----------|---------|----------------|
| **No-Hallucination** | Prevent AI from making things up | Fact verification against source |
| **Business Logic** | Enforce rules | "Don't email competitors" |
| **Brand Voice** | Consistent tone | Style guide matching |
| **Quality Check** | Output quality | Grammar, formatting checks |

### Example Implementation

```python
class MFRGuardrails:
    def validate(self, agent_output, context):
        # 1. Check for hallucinations
        if not self.fact_verify(agent_output, context):
            return ValidationResult.REJECT
        
        # 2. Check business rules
        if not self.business_rules(agent_output, context):
            return ValidationResult.REJECT
        
        # 3. Check brand voice
        if not self.brand_voice(agent_output, context):
            return ValidationResult.REJECT_RETRY
        
        return ValidationResult.APPROVE
```

---

## 4. Integration Patterns

### CRM Integration

**Supported CRMs:**
- HubSpot (primary)
- Salesforce
- Notion (as database)
- Airtable (as database)

**Integration Pattern:**
```
Agent → CRM API → Webhook/Queue → Agent Processing → Update CRM
```

**Error Handling:**
- Retry with exponential backoff
- Queue for offline processing
- Dead letter queue for manual review

---

### Email Integration

**Platforms:**
- Gmail API (primary)
- SendGrid (bulk sending)
- Outlook (via Graph API)

**Pattern:**
```
Writer Agent → Email Queue → Sending Service → BCC → Tracking
```

**Rate Limiting:**
- Respect provider limits
- Throttle sending during peak hours
- Distribute across multiple accounts

---

### Calendar Integration

**Platforms:**
- Cal.com (primary)
- Google Calendar
- Outlook Calendar

**Pattern:**
```
Sales Agent → Cal.com API → Book Meeting → Update CRM
```

---

## 5. Error Handling & Resilience

### Error Categories

| Error Type | Handling Strategy |
|------------|-------------------|
| **API Failure** | Retry with exponential backoff (3 attempts) |
| **Data Missing** | Log and skip, notify client |
| **Rate Limit** | Queue and throttle |
| **Invalid Output** | MFR catches and retries |
| **Timeout** | Increase timeout, retry once |

### Fallback Cascade

```
Primary Tool → Fails → Secondary Tool → Fails → Manual Notification
```

### Monitoring

**Track:**
- API success rates
- Agent output quality
- System response times
- Error rates by type

**Alert On:**
- Success rate < 95%
- Response time > 5s
- Error rate spike

---

## 6. Security Architecture

### Data Flow

```
Client Data → Encrypted at Rest → Encrypted in Transit → Processed → Deleted
```

### Security Measures

| Layer | Implementation |
|-------|----------------|
| **Data at Rest** | AES-256 encryption |
| **Data in Transit** | TLS 1.3+ |
| **Access Control** | Principle of least privilege |
| **Audit Logging** | All actions logged |
| **Secrets Management** | Environment variables, never in code |

### Data Lifecycle

1. **Ingestion:** Client data received via secure channels
2. **Processing:** Data used for agent execution only
3. **Storage:** Encrypted, isolated per client
4. **Deletion:** Automatic deletion after 90 days (or on request)

---

## 7. Performance Optimization

### Optimization Strategies

**API Calls:**
- Batch requests where possible
- Cache frequently accessed data
- Parallel independent requests

**Agent Execution:**
- Lazy loading of agent capabilities
- Connection pooling for databases
- Async processing where possible

**Monitoring:**
- Track API usage and costs
- Optimize based on real data
- Implement caching for expensive operations

---

## 8. Technology Stack

### Core

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Agent Framework** | Claude Code, OpenAI API | LLM orchestration |
| **Tool Integration** | Composio | External API connections |
| **Web Scraping** | Crawl4AI, Firecrawl | Data extraction |
| **Database** | Qdrant, Supabase | Vector storage, relational data |
| **Hosting** | Vercel, Railway | Application hosting |

### Development

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Language** | Python 3.11+, TypeScript | Agent development |
| **Version Control** | Git + GitHub | Code management |
| **Project Mgmt** | Linear | Task tracking |
| **Documentation** | Markdown | All docs in MD format |

---

## 9. Deployment Architecture

### Environments

```
Development → Staging → Production
```

### Deployment Process

1. **Development:** Local development, test with sample data
2. **Staging:** Deploy to staging, client testing
3. **Production:** Deploy to production, monitoring enabled

### CI/CD (Future)

When team scales:
- Automated testing on push
- Staging deployment on merge to main
- Production deployment after approval

---

## 10. Monitoring & Observability

### Metrics to Track

| Category | Metric | Target |
|----------|--------|--------|
| **Performance** | Agent response time | <5s |
| **Reliability** | API success rate | >95% |
| **Quality** | MFR pass rate | >98% |
| **Cost** | API cost per execution | Track and optimize |

### Logging Strategy

```
[INFO] Agent X started with input: {input}
[DEBUG] Intermediate result: {result}
[ERROR] API call failed: {error}
[INFO] Agent X completed: {output}
```

---

**Document End**

*Architecture evolves. Principles stay the same.*
