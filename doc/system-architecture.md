# Synto Labs System Architecture

**Version:** 1.0
**Date:** February 9, 2026
**Status:** Technical Reference

---

## 1. Architecture Overview

### 1.1 System Philosophy

The Synto Labs multi-agent system is built on **Model-First Reasoning (MFR)** principles:

1. **Logic Before Language** - Business rules guide agent behavior, not just LLM generation
2. **Guardrails at Every Layer** - No-hallucination guarantee through validation pipelines
3. **Parallel Agent Swarms** - Independent agents coordinate without blocking
4. **Fail-Safe Defaults** - Graceful degradation when components fail

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Browser  │  │  Gmail   │  │ LinkedIn │  │  Cal.com │  │   CRM    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ API/Webhooks
┌────────────────────────────────────┼────────────────────────────────────┐
│                        ORCHESTRATION LAYER                               │
│  ┌─────────────────────────────────┼─────────────────────────────────┐  │
│  │                     Agent Coordinator                              │  │
│  │  • Task dispatch & routing    • State management                │  │
│  │  • Error recovery             • Monitoring & logging            │  │
│  └─────────────────────────────────┼─────────────────────────────────┘  │
│                                     │                                   │
│  ┌─────────────────────────────────┼─────────────────────────────────┐  │
│  │                    MFR Guardrails Layer                            │  │
│  │  • Business logic validation  • Output verification               │  │
│  │  • Fact checking              • Brand voice enforcement          │  │
│  └─────────────────────────────────┼─────────────────────────────────┘  │
└────────────────────────────────────┼────────────────────────────────────┘
                                     │
┌────────────────────────────────────┼────────────────────────────────────┐
│                          AGENT LAYER                                     │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐│
│  │ Research  │ │   Voice   │ │   Sales   │ │Enrichment │ │  Quality  ││
│  │  Agent    │ │  Agent    │ │  Agent    │ │  Agent    │ │  Agent    ││
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘│
│  ┌───────────┐ ┌───────────┐ ┌──────────────┐                          │
│  │ Knowledge │ │   Video   │ │    Brand     │                          │
│  │  Agent    │ │  Agent    │ │    Agent     │                          │
│  └───────────┘ └───────────┘ └──────────────┘                          │
└────────────────────────────────────┼────────────────────────────────────┘
                                     │
┌────────────────────────────────────┼────────────────────────────────────┐
│                          SERVICES LAYER                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐ │
│  │  Claude  │ │  OpenAI  │ │Composio  │ │Crawl4AI  │ │   Firecrawl  │ │
│  │   API    │ │   API    │ │   MCP    │ │          │ │              │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│  │  Gmail   │ │ LinkedIn │ │  Cal.com │ │  Notion  │                   │
│  │   API    │ │   API    │ │   API    │ │   API    │                   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘                   │
└────────────────────────────────────┼────────────────────────────────────┘
                                     │
┌────────────────────────────────────┼────────────────────────────────────┐
│                        DATA & INFRASTRUCTURE                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────────┐ ┌──────────┐               │
│  │  Qdrant  │ │ Supabase │ │   Vercel     │ │ Railway  │               │
│  │ (Vector) │ │ (SQLite) │ │   (Frontend) │ │(Backend) │               │
│  └──────────┘ └──────────┘ └──────────────┘ └──────────┘               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Agent Architecture

### 2.1 Agent Types & Capabilities

| Agent | Primary Function | Input | Output | Dependencies |
|-------|------------------|-------|--------|--------------|
| **Research Agent** | Web scraping, strategy deck generation | URLs, search queries | Structured data, PDFs | Crawl4AI, Firecrawl |
| **Voice Agent** | Conversational AI, phone qualification | Call triggers, scripts | Call transcripts, intent | Bland AI, Vapi.ai |
| **Sales Agent** | Pipeline management, meeting booking | Lead data, intent scores | CRM updates, calendar bookings | Cal.com, CRM APIs |
| **Enrichment Agent** | Contact discovery, tech stack analysis | Partial lead data | Complete profiles, signals | Multiple APIs |
| **Quality Agent** | Output validation, brand guard | Draft content | Approved/rejected content | Style guides, fact DB |
| **Knowledge Agent** | Context injection, memory retrieval | Queries, context | Relevant passages | Qdrant vector DB |
| **Video Agent** | Avatar generation, script writing | Templates, personalization | Video scripts, avatars | HeyGen, Tavus |
| **Brand Agent** | Voice cloning, style enforcement | Communications | Branded content | Voice models, style DB |

### 2.2 Agent Communication Patterns

**1. Sequential Pipeline (Scout → Research → Writer → Sender)**
```
┌──────┐     ┌──────────┐     ┌───────┐     ┌───────┐
│ Scout │ ──▶ │ Research │ ──▶ │ Writer │ ──▶ │ Sender │
└──────┘     └──────────┘     └───────┘     └───────┘
    │            │                │            │
    ▼            ▼                ▼            ▼
 Leads       Intel           Content        Sent
```

**2. Parallel Swarm (Independent enrichment)**
```
                    ┌─────────────┐
                    │  Coordinator│
                    └──────┬──────┘
         ┌────────┬──┼──┬────────┬────────┐
         ▼        ▼  ▼  ▼        ▼        ▼
    ┌─────┐ ┌─────┐┌────┐┌─────┐ ┌─────┐ ┌─────┐
    │  A  │ │  B  ││ C  ││  D  │ │  E  │ │ ... │
    └─────┘ └─────┘└────┘└─────┘ └─────┘ └─────┘
         │        │     │        │        │
         ▼        ▼     ▼        ▼        ▼
       Merge all results → Coordinator → Next Stage
```

**3. Broadcast (Quality + Brand check on all content)**
```
         ┌──────────┐
         │ Content  │
         └────┬─────┘
              │
      ┌───────┼───────┐
      ▼       ▼       ▼
   ┌──────┐┌──────┐┌──────┐
   │Qualty││Brand ││ Fact │
   │ Check││ Check││Check │
   └───┬──┘└───┬──┘└───┬──┘
       │       │       │
       ▼       ▼       ▼
      [ All must approve → Ship ]
```

### 2.3 Agent State Management

**State Machine for Agent Lifecycle:**
```
IDLE → QUEUED → RUNNING → {SUCCESS | FAILED | RETRY}
                │         │
                │         └──▶ LOGGED
                │
                └──▶ MONITORED (metrics collection)
```

**State Persistence:**
- Agent states stored in Supabase
- Checkpoint/recovery for long-running tasks
- Dead letter queue for failed messages

---

## 3. MFR Guardrails Layer

### 3.1 Model-First Reasoning Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LLM Output Layer                         │
│  (Raw generation from Claude/GPT)                           │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────┐
│              MFR Validation Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Business Logic Validator                         │  │
│  │     • Is this output valid for the business rule?    │  │
│  │     • Are constraints satisfied?                     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  2. Fact Verifier                                     │  │
│  │     • Cross-check against knowledge base             │  │
│  │     • Flag unverified claims                         │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  3. Brand Voice Guard                                │  │
│  │     • Does this match brand guidelines?              │  │
│  │     • Is tone appropriate for channel?               │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  4. Output Formatter                                 │  │
│  │     • Structure output for destination               │  │
│  │     • Add required metadata                          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────┐
│                  Approved Output Layer                     │
│  (Ships to destination: email, CRM, PDF, etc.)              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Guardrails Implementation

**Business Logic Validator:**
```python
class BusinessLogicValidator:
    def validate(self, output: str, context: Dict) -> ValidationResult:
        # Load business rules for client/workflow
        rules = self.get_rules(context['workflow_id'])

        # Check each rule
        for rule in rules:
            if not rule.check(output, context):
                return ValidationResult(
                    valid=False,
                    reason=f"Rule '{rule.name}' violated",
                    suggestion=rule.suggest_fix(output)
                )

        return ValidationResult(valid=True)
```

**Fact Verifier:**
```python
class FactVerifier:
    def verify(self, claims: List[str], context: Dict) -> VerificationResult:
        verified = []
        unverified = []

        for claim in claims:
            # Search vector DB for supporting evidence
            evidence = self.vector_db.search(claim, top_k=3)

            if evidence and self.confidence(evidence) > 0.8:
                verified.append(claim)
            else:
                unverified.append((claim, evidence))

        return VerificationResult(verified, unverified)
```

**Brand Voice Guard:**
```python
class BrandVoiceGuard:
    def check(self, text: str, channel: str) -> BrandResult:
        guidelines = self.load_guidelines(channel)

        issues = []
        # Check word choice
        if self.has_forbidden_words(text, guidelines.forbidden_words):
            issues.append("Contains forbidden language")

        # Check tone
        tone_score = self.analyze_tone(text)
        if not guidelines.tone_range.contains(tone_score):
            issues.append(f"Tone {tone_score} outside {guidelines.tone_range}")

        # Check formatting
        if not guidelines.formatter.validate(text):
            issues.append("Formatting does not match guidelines")

        return BrandResult(
            approved=len(issues) == 0,
            issues=issues
        )
```

### 3.3 No-Hallucination Guarantee

**Techniques:**
1. **Citation Requirements** - All claims must cite sources from knowledge base
2. **Confidence Thresholds** - Low-confidence outputs flagged for review
3. **Deterministic Fallbacks** - Known answers returned when available
4. **Human-in-the-Loop** - Critical outputs require approval

---

## 4. Integration Patterns

### 4.1 External Service Integration

**Gmail API (Email Operations)**
```typescript
interface GmailIntegration {
  sendEmail(params: EmailParams): Promise<string>;
  threadMessage(messageId: string, reply: string): Promise<string>;
  applyLabels(messageIds: string[], labels: string[]): Promise<void>;
  searchInbox(query: string): Promise<Email[]>;
}
```

**Cal.com API (Scheduling)**
```typescript
interface CalComIntegration {
  createBooking(params: BookingParams): Promise<Booking>;
  getAvailability(user: string): Promise<TimeSlot[]>;
  cancelBooking(bookingId: string): Promise<void>;
  rescheduleBooking(bookingId: string, newTime: Date): Promise<Booking>;
}
```

**CRM Integration (HubSpot/Notion/Airtable)**
```typescript
interface CRMIntegration {
  upsertContact(contact: Contact): Promise<Contact>;
  updateDealStage(dealId: string, stage: string): Promise<void>;
  logActivity(objectId: string, activity: Activity): Promise<void>;
  searchContacts(query: string): Promise<Contact[]>;
}
```

### 4.2 Web Scraping Architecture

**Crawl4AI + Firecrawl Fallback:**
```python
class WebScraper:
    def scrape(self, url: str) -> ScrapedContent:
        try:
            # Primary: Crawl4AI (faster, cheaper)
            return self.crawl4ai.scrape(url)
        except ScrapingError as e:
            logger.warning(f"Crawl4AI failed: {e}, falling back to Firecrawl")
            # Fallback: Firecrawl (more robust)
            return self.firecrawl.scrape(url)

    def scrape_batch(self, urls: List[str]) -> List[ScrapedContent]:
        # Parallel scraping with concurrency limits
        return asyncio.gather(*[
            self.scrape(url) for url in urls
        ])
```

**Content Extraction Pipeline:**
```
URL → HTML → Clean → Extract → Structure → Store
 │     │       │        │         │         │
 │     │       │        │         │         └─▶ Supabase (raw)
 │     │       │        │         │
 │     │       │        │         └─▶ Agent Processed
 │     │       │        │
 │     │       │        └─▶ Text, Links, Images
 │     │       │
 │     │       └─▶ Remove scripts, styles
 │     │
 │     └─▶ HTTP request with retries
 │
 └─▶ Input URL
```

### 4.3 API Optimization Strategies

**Request Batching:**
```python
class APIBatcher:
    def __init__(self, batch_size: int = 10, window_ms: int = 100):
        self.batch_size = batch_size
        self.window_ms = window_ms
        self.queue = []

    async def add(self, request):
        self.queue.append(request)
        if len(self.queue) >= self.batch_size:
            await self.flush()
        else:
            asyncio.create_task(self.flush_after_delay())

    async def flush_after_delay(self):
        await asyncio.sleep(self.window_ms / 1000)
        await self.flush()

    async def flush(self):
        if not self.queue:
            return

        batch = self.queue[:self.batch_size]
        self.queue = self.queue[self.batch_size:]

        # Process batch
        results = await self.process_batch(batch)
        return results
```

**Response Caching:**
```python
class CachedAPI:
    def __init__(self, ttl_seconds: int = 3600):
        self.cache = {}
        self.ttl = ttl_seconds

    async def call(self, endpoint: str, params: dict):
        cache_key = f"{endpoint}:{hash(json.dumps(params))}"

        if cache_key in self.cache:
            cached, timestamp = self.cache[cache_key]
            if time.time() - timestamp < self.ttl:
                return cached

        result = await self.api.call(endpoint, params)
        self.cache[cache_key] = (result, time.time())
        return result
```

**Concurrency Control:**
```python
class ConcurrencyLimiter:
    def __init__(self, max_concurrent: int = 50):
        self.semaphore = asyncio.Semaphore(max_concurrent)

    async def run(self, coro):
        async with self.semaphore:
            return await coro

    async def run_many(self, coros):
        return await asyncio.gather(*[
            self.run(coro) for coro in coros
        ])
```

---

## 5. Error Handling & Resilience

### 5.1 Retry Strategies

**Exponential Backoff:**
```python
async def retry_with_backoff(
    func,
    max_retries: int = 3,
    base_delay: float = 1.0,
    max_delay: float = 60.0
):
    for attempt in range(max_retries + 1):
        try:
            return await func()
        except RetryableError as e:
            if attempt == max_retries:
                raise

            delay = min(base_delay * (2 ** attempt), max_delay)
            logger.warning(f"Attempt {attempt + 1} failed, retrying in {delay}s")
            await asyncio.sleep(delay)
```

**Circuit Breaker:**
```python
class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, timeout: int = 60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.state = "closed"  # closed, open, half-open
        self.last_failure_time = None

    async def call(self, func):
        if self.state == "open":
            if time.time() - self.last_failure_time > self.timeout:
                self.state = "half-open"
            else:
                raise CircuitBreakerOpenError()

        try:
            result = await func()
            if self.state == "half-open":
                self.state = "closed"
                self.failure_count = 0
            return result
        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()

            if self.failure_count >= self.failure_threshold:
                self.state = "open"
            raise
```

### 5.2 Dead Letter Queue

```python
class DeadLetterQueue:
    def __init__(self, max_size: int = 1000):
        self.queue = []
        self.max_size = max_size

    def add(self, failed_task: FailedTask):
        if len(self.queue) >= self.max_size:
            # Archive oldest
            self.archive(self.queue.pop(0))

        self.queue.append({
            'task': failed_task,
            'error': failed_task.error,
            'timestamp': time.time(),
            'retries': failed_task.retries
        })

    def retry_eligible(self) -> List[FailedTask]:
        now = time.time()
        return [
            item for item in self.queue
            if now - item['timestamp'] > self.get_retry_delay(item['retries'])
        ]
```

### 5.3 Graceful Degradation

**Feature Flags:**
```python
class FeatureFlags:
    def __init__(self):
        self.flags = {
            'voice_agent': True,
            'video_generation': True,
            'advanced_enrichment': False,
        }

    def is_enabled(self, feature: str) -> bool:
        return self.flags.get(feature, False)

    def disable(self, feature: str):
        self.flags[feature] = False
        logger.warning(f"Feature '{feature}' disabled due to errors")
```

**Fallback Responses:**
```python
class FallbackHandler:
    def handle(self, agent_type: str, error: Exception) -> Response:
        if agent_type == 'research':
            return Response(
                success=False,
                message="Research temporarily unavailable",
                cached_results=self.get_cached_results()
            )
        elif agent_type == 'voice':
            return Response(
                success=False,
                message="Voice agent unavailable",
                alternative="Please use our form instead"
            )
        else:
            return Response(
                success=False,
                message="Service temporarily unavailable",
                retry_after=60
            )
```

---

## 6. Data Architecture

### 6.1 Vector Database (Qdrant)

**Collection Structure:**
```python
# Knowledge collection
{
    "collection": "knowledge",
    "vectors": {
        "size": 1536,  # OpenAI embedding size
        "distance": "Cosine"
    },
    "payload": {
        "client_id": "string",
        "document_id": "string",
        "chunk_index": "integer",
        "source": "string",
        "created_at": "datetime"
    }
}

# Brand voice collection
{
    "collection": "brand_examples",
    "vectors": {
        "size": 1536,
        "distance": "Cosine"
    },
    "payload": {
        "client_id": "string",
        "channel": "string",  # email, web, social
        "approved": "boolean",
        "tone_score": "float"
    }
}
```

### 6.2 Relational Database (Supabase/SQLite)

**Schema Overview:**
```sql
-- Clients
CREATE TABLE clients (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    settings JSONB
);

-- Workflows
CREATE TABLE workflows (
    id UUID PRIMARY KEY,
    client_id UUID REFERENCES clients(id),
    name TEXT NOT NULL,
    config JSONB NOT NULL,
    status TEXT DEFAULT 'active'
);

-- Agent Runs
CREATE TABLE agent_runs (
    id UUID PRIMARY KEY,
    workflow_id UUID REFERENCES workflows(id),
    agent_type TEXT NOT NULL,
    input JSONB,
    output JSONB,
    status TEXT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    error TEXT
);

-- Tasks (individual agent tasks)
CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    agent_run_id UUID REFERENCES agent_runs(id),
    status TEXT DEFAULT 'pending',
    input JSONB,
    output JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);
```

### 6.3 Data Flow Diagram

```
External Data
     │
     ▼
┌─────────────┐
│ Ingestion   │ (Web scraping, API calls, file uploads)
└──────┬──────┘
       │
       ├─▶ Raw Data Store (Supabase)
       │
       ▼
┌─────────────┐
│ Processing  │ (Agent execution, MFR validation)
└──────┬──────┘
       │
       ├─▶ Vector Embeddings (Qdrant)
       │
       ├─▶ Structured Data (Supabase)
       │
       ▼
┌─────────────┐
│ Output      │ (Emails, PDFs, CRM updates, reports)
└─────────────┘
```

---

## 7. Security Considerations

### 7.1 API Key Management

**Environment Variables:**
```bash
# Never commit these to git
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
COMPOSIO_API_KEY=...
GMAIL_CREDENTIALS=...
CRAWL4AI_API_KEY=...
FIRECRAWL_API_KEY=...
```

**Key Rotation:**
- Rotate API keys quarterly
- Use different keys for dev/staging/prod
- Monitor usage for anomalies

### 7.2 Data Isolation

**Client Data Segregation:**
```python
class ClientDataStore:
    def get_client_db(self, client_id: str) -> Database:
        # Each client gets isolated data namespace
        return self.databases[f"client_{client_id}"]

    def query_with_acl(self, client_id: str, query: str):
        # All queries automatically scoped to client
        db = self.get_client_db(client_id)
        return db.execute(f"""
            SELECT * FROM data
            WHERE client_id = '{client_id}'
            AND {query}
        """)
```

### 7.3 Request Validation

**Input Sanitization:**
```python
class InputValidator:
    def validate_url(self, url: str) -> bool:
        try:
            parsed = urlparse(url)
            return parsed.scheme in ['http', 'https'] and parsed.netloc
        except:
            return False

    def validate_email(self, email: str) -> bool:
        return re.match(r'^[^@]+@[^@]+\.[^@]+$', email) is not None

    def sanitize_input(self, text: str) -> str:
        # Remove potential injection attempts
        return text.replace('<script>', '').replace('javascript:', '')
```

---

## 8. Monitoring & Observability

### 8.1 Metrics to Track

**Agent Performance:**
- Tasks completed per agent type
- Average task duration
- Error rate by agent
- MFR validation pass rate

**System Health:**
- API response times
- Queue depths
- Database query performance
- Cache hit rates

**Business Metrics:**
- Client active workflows
- Hours saved (calculated)
- ROI delivered (estimated)

### 8.2 Logging Strategy

```python
class StructuredLogger:
    def log_agent_event(self, event: AgentEvent):
        log_entry = {
            'timestamp': time.time(),
            'agent_type': event.agent_type,
            'workflow_id': event.workflow_id,
            'client_id': event.client_id,
            'event_type': event.event_type,
            'status': event.status,
            'duration_ms': event.duration_ms,
            'metadata': event.metadata
        }
        logger.info(json.dumps(log_entry))
```

### 8.3 Alerting Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Error Rate | >5% | >15% | Investigate, scale up |
| API Latency | >2s | >5s | Check provider status |
| Queue Depth | >1000 | >5000 | Scale workers |
| MFR Failures | >10% | >25% | Review guardrails |

---

## 9. Deployment Architecture

### 9.1 Hosting Infrastructure

| Component | Platform | Cost/Month | Notes |
|-----------|----------|------------|-------|
| Frontend | Vercel | $20-50 | Edge deployment, auto-scaling |
| Backend API | Railway | $20-40 | Container-based, easy deploys |
| Vector DB | Qdrant Cloud | $25-50 | 1GB free tier, then scales |
| Database | Supabase | $25 | Free tier sufficient for MVP |

**Total Infrastructure Budget: ~$100-200/month**

### 9.2 CI/CD Pipeline

```
Git Push
    │
    ▼
┌─────────────┐
│ Lint & Test │ (Ruff, Pytest, ESLint)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Build       │ (Docker images, static assets)
└──────┬──────┘
       │
       ├─▶ Deploy Frontend → Vercel
       │
       └─▶ Deploy Backend → Railway
              │
              ▼
         ┌─────────────┐
         │ Smoke Tests │ (Health checks)
         └──────┬──────┘
                │
                ▼
            [LIVE]
```

---

## 10. Technology Stack Reference

### 10.1 Core Technologies

| Category | Technology | Purpose | Version |
|----------|------------|---------|---------|
| **LLM** | Claude 3.5 Sonnet | Primary reasoning | Latest |
| **LLM** | GPT-4o | Fallback, specialized tasks | Latest |
| **Agent Framework** | Claude Code | Development environment | Latest |
| **Integration** | Composio MCP | Tool integrations | Latest |
| **Scraping** | Crawl4AI | Fast web scraping | Latest |
| **Scraping** | Firecrawl | Robust fallback | Latest |
| **Vector DB** | Qdrant | Semantic search | Latest |
| **Database** | Supabase (PostgreSQL) | Relational data | Latest |
| **Hosting** | Vercel | Frontend | Latest |
| **Hosting** | Railway | Backend | Latest |

### 10.2 External APIs

| Service | Purpose | Rate Limits |
|---------|---------|-------------|
| Gmail API | Email operations | 250 quota units/day |
| LinkedIn API | Social outreach | Varies by tier |
| Cal.com API | Scheduling | Custom |
| Notion API | Knowledge base | 3 requests/sec |
| Airtable API | Data management | 5 requests/sec |
| HeyGen | Video generation | Credits-based |
| Bland AI | Voice calls | Minutes-based |

---

## 11. Evolution Roadmap

### Phase 1: Current (MVP)
- 8 core agents
- Basic MFR guardrails
- Single-client isolation
- Manual deployment

### Phase 2: Q2 2026
- Enhanced MFR with adaptive learning
- Multi-tenant architecture
- Auto-scaling infrastructure
- Advanced monitoring dashboard

### Phase 3: Q3 2026
- Agent marketplace (reusable patterns)
- Client self-service portal
- Advanced analytics & reporting
- White-label options

---

**Document End**

*This architecture document is a living reference. Update as the system evolves and new patterns emerge.*
