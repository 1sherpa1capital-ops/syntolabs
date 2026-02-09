# Synto Labs Delivery Playbook

**Version:** 1.0
**Date:** February 9, 2026
**Status:** Operational Reference

---

## 1. Delivery Philosophy

### 1.1 Core Principles

**Move Fast, Break Things**
- Speed beats perfection
- Ship the 80% solution, iterate on the last 20%
- Fail fast, learn faster
- 48-hour final sprint to deployment

**Client-First Iteration**
- Client feedback drives roadmap
- Weekly check-ins during builds
- Prototype before building production systems
- No scope creep without explicit approval

**Technical Excellence**
- MFR guardrails on every agent
- No-hallucination guarantee
- Battle-tested patterns, not experimental code
- Documentation as we build

### 1.2 Delivery Timeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                     STANDARD DELIVERY TIMELINE                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Week 0                    Week 1-2              Week 3            │
│  ┌────────┐              ┌──────────┐          ┌────────┐          │
│  │Discovery│ ──────────▶  │   Build   │ ────────▶│ Deploy │          │
│  └────────┘              └──────────┘          └────────┘          │
│      │                        │                     │              │
│      ▼                        ▼                     ▼              │
│  30 min call            Daily updates       48-hour sprint       │
│  Qualify fit           Agent development   Integration + docs     │
│  Understand pain       MFR implementation   Training + handoff    │
│  Propose solution      Client feedback      Go live              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Agent Development Workflow

### 2.1 Agent Types & Development Patterns

| Agent | Development Time | Complexity | Dependencies | Common Use Cases |
|-------|------------------|------------|---------------|------------------|
| **Research Agent** | 1-2 days | Medium | Crawl4AI, Firecrawl | Prospect research, strategy decks |
| **Voice Agent** | 2-3 days | High | Bland AI, Vapi.ai | Inbound qualification, outbound calls |
| **Sales Agent** | 1-2 days | Medium | Cal.com, CRM | Pipeline management, meeting booking |
| **Enrichment Agent** | 1-2 days | Medium | Multiple APIs | Contact discovery, tech stack analysis |
| **Quality Agent** | 1 day | Low | Style guides, fact DB | Output validation, brand guard |
| **Knowledge Agent** | 1 day | Low | Qdrant | Context injection, memory retrieval |
| **Video Agent** | 2-3 days | High | HeyGen, Tavus | Avatar generation, script writing |
| **Brand Agent** | 1 day | Low | Voice models, style DB | Voice cloning, style enforcement |

### 2.2 Agent Development Process

**Phase 1: Specification (4-8 hours)**
```
┌─────────────────────────────────────────────────────────────────┐
│                     AGENT SPECIFICATION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Define Input Schema                                         │
│     • What data does this agent receive?                        │
│     • What are the required vs optional fields?                 │
│     • What are the data types and constraints?                  │
│                                                                 │
│  2. Define Output Schema                                        │
│     • What does this agent produce?                             │
│     • What is the output format (JSON, PDF, email)?            │
│     • What are the success criteria?                            │
│                                                                 │
│  3. Define Business Rules                                       │
│     • What constraints must be enforced?                        │
│     • What are the edge cases to handle?                        │
│     • What are the fallback behaviors?                          │
│                                                                 │
│  4. Define MFR Guardrails                                       │
│     • What validations are required?                            │
│     • What facts must be verified?                              │
│     • What brand rules apply?                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Phase 2: Implementation (8-16 hours)**
```
┌─────────────────────────────────────────────────────────────────┐
│                    AGENT IMPLEMENTATION                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Core Agent Class                                            │
│     ```python                                                   │
│     class ResearchAgent:                                        │
│         def __init__(self, config: AgentConfig):               │
│             self.llm = ClaudeClient()                           │
│             self.scraper = WebScraper()                         │
│             self.mfr = MFRGuardrails()                          │
│                                                                 │
│         async def run(self, input: ResearchInput) -> Output:   │
│             # 1. Validate input                                │
│             # 2. Execute core logic                            │
│             # 3. Apply MFR guardrails                          │
│             # 4. Return validated output                       │
│     ```                                                          │
│                                                                 │
│  2. MFR Validation Layer                                        │
│     • Business logic validator                                  │
│     • Fact verifier                                             │
│     • Brand voice guard                                         │
│     • Output formatter                                          │
│                                                                 │
│  3. Error Handling                                              │
│     • Retry with exponential backoff                            │
│     • Graceful fallbacks                                        │
│     • Dead letter queue                                         │
│     • Comprehensive logging                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Phase 3: Testing (4-8 hours)**
```
┌─────────────────────────────────────────────────────────────────┐
│                        AGENT TESTING                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Unit Tests                                                     │
│  • Input validation                                             │
│  • Business logic enforcement                                   │
│  • MFR guardrails                                               │
│  • Error handling                                               │
│                                                                 │
│  Integration Tests                                              │
│  • API integrations (Gmail, LinkedIn, etc.)                    │
│  • Database operations                                          │
│  • External service calls                                       │
│                                                                 │
│  End-to-End Tests                                               │
│  • Full workflow execution                                      │
│  • Error recovery                                               │
│  • Performance benchmarks                                       │
│                                                                 │
│  MFR Validation Tests                                           │
│  • Hallucination detection                                     │
│  • Brand voice compliance                                       │
│  • Fact verification accuracy                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Phase 4: Deployment (4 hours)**
```
┌─────────────────────────────────────────────────────────────────┐
│                      AGENT DEPLOYMENT                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Configuration                                               │
│     • Set environment variables                                 │
│     • Configure API keys and credentials                        │
│     • Set rate limits and quotas                               │
│                                                                 │
│  2. Infrastructure                                             │
│     • Deploy to Railway (backend)                              │
│     • Update Vercel (frontend if applicable)                   │
│     • Configure monitoring and alerts                          │
│                                                                 │
│  3. Integration                                                 │
│     • Connect to client systems (CRM, email, etc.)             │
│     • Test end-to-end with real data                           │
│     • Verify monitoring and logging                            │
│                                                                 │
│  4. Documentation                                              │
│     • Update API documentation                                 │
│     • Create runbook for operations                            │
│     • Document any known issues or limitations                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Agent Coordination Patterns

**Sequential Pipeline (Scout → Research → Writer → Sender)**
```python
class SequentialPipeline:
    def __init__(self):
        self.scout = ScoutAgent()
        self.research = ResearchAgent()
        self.writer = WriterAgent()
        self.sender = SenderAgent()

    async def execute(self, target_url: str):
        # Stage 1: Scout finds leads
        leads = await self.scout.run(target_url)

        results = []
        for lead in leads:
            # Stage 2: Research gathers intelligence
            intel = await self.research.run(lead)

            # Stage 3: Writer creates content
            content = await self.writer.run(intel)

            # Stage 4: Sender delivers
            sent = await self.sender.run(content)

            results.append(sent)

        return results
```

**Parallel Swarm (Independent enrichment)**
```python
class ParallelSwarm:
    def __init__(self):
        self.agents = [
            EmailEnrichmentAgent(),
            LinkedInEnrichmentAgent(),
            TechStackAgent(),
            CompanyDataAgent(),
        ]

    async def execute(self, lead: Lead):
        # Run all enrichment agents in parallel
        results = await asyncio.gather(*[
            agent.run(lead) for agent in self.agents
        ])

        # Merge all results
        return self.merge_results(lead, results)
```

**Broadcast (Quality + Brand check on all content)**
```python
class BroadcastValidator:
    def __init__(self):
        self.quality_agent = QualityAgent()
        self.brand_agent = BrandAgent()
        self.fact_checker = FactChecker()

    async def validate(self, content: str) -> ValidationResult:
        # Run all validators in parallel
        quality, brand, facts = await asyncio.gather(
            self.quality_agent.check(content),
            self.brand_agent.check(content),
            self.fact_checker.verify(content)
        )

        # All must approve
        return ValidationResult(
            approved=quality.passed and brand.passed and facts.verified,
            issues=[*quality.issues, *brand.issues, *facts.issues]
        )
```

---

## 3. Integration Guides

### 3.1 Gmail Integration

**Setup:**
```python
# 1. Create Google Cloud Project
# 2. Enable Gmail API
# 3. Create OAuth credentials
# 4. Configure consent screen
# 5. Download credentials.json

import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

class GmailClient:
    def __init__(self, token_path: str = 'token.json'):
        self.creds = self._load_credentials(token_path)
        self.service = build('gmail', 'v1', credentials=self.creds)

    async def send_email(self, to: str, subject: str, body: str) -> str:
        message = {
            'to': to,
            'subject': subject,
            'body': body
        }
        result = self.service.users().messages().send(
            userId='me',
            body=self._create_message(message)
        ).execute()
        return result['id']

    async def thread_reply(self, message_id: str, reply: str) -> str:
        thread = self.service.users().messages().get(
            userId='me',
            id=message_id
        ).execute()

        message = {
            'threadId': thread['threadId'],
            'body': reply
        }
        result = self.service.users().messages().send(
            userId='me',
            body=self._create_message(message)
        ).execute()
        return result['id']
```

**Rate Limits:**
- 250 quota units per day
- Sending an email: ~5-10 quota units
- Implement exponential backoff for rate limit errors

### 3.2 Cal.com Integration

**Setup:**
```python
import httpx

class CalComClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.cal.com/v1"
        self.client = httpx.AsyncClient(
            headers={"Authorization": f"Bearer {api_key}"}
        )

    async def get_availability(self, user: str) -> list[TimeSlot]:
        response = await self.client.get(
            f"{self.base_url}/availability",
            params={"userId": user}
        )
        return response.json()

    async def create_booking(
        self,
        event_type_id: int,
        start: datetime,
        email: str,
        name: str
    ) -> Booking:
        response = await self.client.post(
            f"{self.base_url}/bookings",
            json={
                "eventTypeId": event_type_id,
                "start": start.isoformat(),
                "email": email,
                "name": name,
                "timezone": "UTC"
            }
        )
        return response.json()
```

### 3.3 CRM Integration (HubSpot/Notion/Airtable)

**Generic CRM Interface:**
```python
from abc import ABC, abstractmethod

class CRMIntegration(ABC):
    @abstractmethod
    async def upsert_contact(self, contact: Contact) -> Contact:
        pass

    @abstractmethod
    async def update_deal_stage(self, deal_id: str, stage: str) -> None:
        pass

    @abstractmethod
    async def log_activity(self, object_id: str, activity: Activity) -> None:
        pass

class HubSpotIntegration(CRMIntegration):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.client = httpx.AsyncClient(
            headers={"Authorization": f"Bearer {api_key}"}
        )

    async def upsert_contact(self, contact: Contact) -> Contact:
        # Implementation for HubSpot
        pass

class NotionIntegration(CRMIntegration):
    def __init__(self, api_key: str, database_id: str):
        self.api_key = api_key
        self.database_id = database_id

    async def upsert_contact(self, contact: Contact) -> Contact:
        # Implementation for Notion
        pass
```

---

## 4. Testing & Iteration Process

### 4.1 Testing Pyramid

```
                    ┌──────────────┐
                    │   E2E Tests  │  (10% - Critical paths)
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            │                              │
     ┌──────┴──────┐                ┌─────┴─────┐
     │Integration  │                │  Unit     │
     │   Tests     │                │  Tests    │  (70% - Business logic)
     │  (20%)      │                │           │
     └─────────────┘                └───────────┘
```

### 4.2 MFR Testing

**Hallucination Detection Tests:**
```python
def test_no_hallucination():
    agent = ResearchAgent()
    input = ResearchInput(url="https://example.com")

    output = agent.run(input)

    # Verify all claims have citations
    for claim in output.claims:
        assert claim.citation is not None
        assert claim.citation.source in input.sources

    # Verify no unverified statistics
    for stat in output.statistics:
        assert stat.verified is True
        assert stat.source_url is not None
```

**Brand Voice Compliance Tests:**
```python
def test_brand_voice_compliance():
    agent = WriterAgent()
    input = WriterInput(topic="Test")

    output = agent.run(input)

    # Check against brand guidelines
    brand_guard = BrandVoiceGuard()
    result = brand_guard.check(output.content, channel="email")

    assert result.approved is True
    assert len(result.issues) == 0
```

### 4.3 Iteration Process

**Weekly Build Cycle:**
```
Day 1 (Monday):        Plan + Start Development
Day 2 (Tuesday):       Core Agent Development
Day 3 (Wednesday):     MFR Implementation + Testing
Day 4 (Thursday):      Integration Testing + Bug Fixes
Day 5 (Friday):        Client Demo + Feedback Collection

Weekend:              Client tests, team plans next week
```

**Feedback Loop:**
1. **Client Demo** - Show working prototype
2. **Collect Feedback** - Document reactions and requests
3. **Prioritize** - Categorize as P0, P1, P2
4. **Implement** - Start with P0, work down
5. **Repeat** - Weekly demos until signoff

---

## 5. Quality Standards

### 5.1 Code Quality

**Standards:**
- Type hints on all functions
- Docstrings on all public methods
- Error handling on all external calls
- Logging on all agent actions
- Tests for all business logic

**Linting:**
```bash
# Python
uv run ruff check .
uv run mypy .

# TypeScript
bun run lint
bun run type-check
```

### 5.2 MFR Quality Standards

**No-Hallucination Requirements:**
- All factual claims must cite sources
- Statistics must be verified against original data
- Quotes must be exact with attribution
- Uncertain information must be flagged

**Brand Voice Requirements:**
- All output checked against brand guidelines
- Tone appropriate for channel
- No forbidden words or phrases
- Formatting matches style guide

**Business Logic Requirements:**
- All constraints validated before output
- Edge cases handled gracefully
- Fallback behavior defined
- Error messages helpful and actionable

### 5.3 Documentation Standards

**Every Agent Must Have:**
1. **README** - Purpose, inputs, outputs, usage
2. **API Documentation** - All endpoints documented
3. **MFR Documentation** - Guardrails explained
4. **Runbook** - Operational procedures
5. **Test Documentation** - Test coverage explained

---

## 6. Deployment Process

### 6.1 Pre-Deployment Checklist

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRE-DEPLOYMENT CHECKLIST                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Code Quality                                                   │
│  [ ] All tests passing                                         │
│  [ ] Linting clean                                              │
│  [ ] Type checking passed                                       │
│  [ ] Code reviewed                                              │
│                                                                 │
│  MFR Validation                                                 │
│  [ ] Business logic enforced                                    │
│  [ ] Fact verification working                                  │
│  [ ] Brand voice guard active                                   │
│  [ ] Output format validated                                    │
│                                                                 │
│  Integration                                                    │
│  [ ] API keys configured                                        │
│  [ ] External integrations tested                               │
│  [ ] Database migrations run                                    │
│  [ ] Environment variables set                                  │
│                                                                 │
│  Monitoring                                                     │
│  [ ] Logging configured                                         │
│  [ ] Error tracking enabled                                     │
│  [ ] Performance monitoring set up                              │
│  [ ] Alerts configured                                          │
│                                                                 │
│  Documentation                                                  │
│  [ ] README updated                                             │
│  [ ] API documentation current                                  │
│  [ ] Runbook created                                            │
│  [ ] Client documentation ready                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 48-Hour Final Sprint

**Day 1: Integration & Testing**
```
Hour 0-4:   Integration testing
Hour 4-8:   Client system integration
Hour 8-12:  End-to-end testing
Hour 12-16: Bug fixes
Hour 16-24: Client demo + feedback
```

**Day 2: Polish & Deploy**
```
Hour 24-28:  Address client feedback
Hour 28-32:  Final bug fixes
Hour 32-36:  Documentation
Hour 36-40:  Training materials
Hour 40-44:  Final verification
Hour 44-48:  Deploy + handoff
```

### 6.3 Deployment Steps

```bash
# 1. Create deployment branch
git checkout -b deploy/[project-name]

# 2. Update version numbers
# Update package.json, pyproject.toml, etc.

# 3. Run final tests
bun run test
uv run pytest

# 4. Build and deploy
# Backend to Railway
railway up

# Frontend to Vercel
vercel --prod

# 5. Verify deployment
# Run smoke tests against production

# 6. Monitor for issues
# Check logs, metrics, alerts for first 24 hours
```

---

## 7. Client Handoff

### 7.1 Handoff Deliverables

**Documentation Package:**
1. **User Guide** - How to use the system
2. **Admin Guide** - How to manage the system
3. **API Documentation** - Integration reference
4. **Troubleshooting Guide** - Common issues and fixes
5. **Runbook** - Operational procedures

**Training Session:**
- 1-hour live walkthrough
- Q&A session
- Recording of session
- Follow-up support contact

### 7.2 Ongoing Support

**First 30 Days (Included):**
- Unlimited bug fixes
- Minor adjustments
- Response within 24 hours

**Retainer (Optional):**
- Monthly optimization
- New workflow development
- Priority support (4-hour response)
- Quarterly review

---

## 8. Common Patterns & Anti-Patterns

### 8.1 Patterns to Follow

**DO:**
- Start with specification before coding
- Implement MFR guardrails from the start
- Test with real data early
- Deploy incrementally
- Document as you build
- Handle errors gracefully
- Monitor everything
- Iterate based on feedback

### 8.2 Anti-Patterns to Avoid

**DON'T:**
- Skip testing for speed
- Hardcode configuration
- Ignore error handling
- Deploy without monitoring
- Over-engineer simple problems
- Skip documentation
- Ignore client feedback
- Over-promise and under-deliver

---

## 9. Tools & Resources

### 9.1 Development Tools

| Tool | Purpose | Documentation |
|------|---------|---------------|
| **Claude Code** | Agent development | docs.anthropic.com |
| **OpenAI API** | LLM fallback | platform.openai.com |
| **Composio MCP** | Tool integrations | composio.dev |
| **Crawl4AI** | Web scraping | github.com/unclecode/crawl4ai |
| **Firecrawl** | Scraping fallback | firecrawl.dev |
| **Qdrant** | Vector database | qdrant.tech |
| **Supabase** | Database | supabase.com |

### 9.2 Monitoring & Debugging

| Tool | Purpose | Use For |
|------|---------|---------|
| **Railway Logs** | Application logs | Debugging errors |
| **Vercel Analytics** | Frontend metrics | Performance tracking |
| **Custom Dashboard** | Business metrics | ROI tracking |
| **Error Tracking** | Exception monitoring | Alert on issues |

---

**Document End**

*This delivery playbook is a living reference. Update as processes evolve and new patterns emerge.*
