# Synto Labs System Architecture

**Version:** 2.0
**Date:** February 10, 2026
**Purpose:** Comprehensive technical blueprint for the scalable, multi-agent AI automation platform.

---

## 1. Architecture Overview

This document outlines the system architecture for Synto Labs' autonomous agent platform. The architecture follows a **Microservices-based, Event-Driven** pattern designed for high scalability, fault tolerance, and observability.

### 1.1 High-Level Design

```mermaid
graph TD
    User[Client / Dashboard] -->|REST/GraphQL| Gateway[API Gateway / Load Balancer]
    
    subgraph "Orchestration Layer"
        Gateway --> Orchestrator[Workflow Orchestrator (Temporal/LangGraph)]
        Orchestrator --> StateMgr[State Manager (Redis)]
    end
    
    subgraph "Agent Service Mesh"
        Orchestrator -->|Task Queue| Scout[Scout Agent]
        Orchestrator -->|Task Queue| Research[Research Agent]
        Orchestrator -->|Task Queue| Writer[Writer Agent]
        Orchestrator -->|Task Queue| Sender[Sender Agent]
        Orchestrator -->|Task Queue| Quality[Quality Agent]
    end
    
    subgraph "Data & Memory Layer"
        Scout & Research & Writer & Sender & Quality --> VectorDB[(Vector DB - Qdrant)]
        Scout & Research & Writer & Sender & Quality --> RelationalDB[(Relational DB - Postgres)]
        Scout & Research & Writer & Sender & Quality --> Cache[(Cache - Redis)]
    end
    
    subgraph "External Integrations"
        Scout -->|HTTP| Web[Web Sources]
        Sender -->|API| Email[Email Providers]
        Sales[Sales Agent] -->|API| CRM[CRM Systems]
    end

    subgraph "Guardrails & Observability"
        AgentOutput --> MFR[MFR Validator]
        MFR -->|Log| Observability[Observability (OpenTelemetry)]
    end
```

### 1.2 Core Design Principles

1.  **Event-Driven Communication:** Agents communicate asynchronously via message queues (e.g., RabbitMQ, Redis Streams) to decouple execution and handle backpressure.
2.  **Stateless Agents:** Agents are stateless compute units. Execution context and history are stored in the State Manager and Vector Database.
3.  **Idempotency:** All agent actions (especially side effects like sending emails or updating CRMs) are designed to be idempotent to allow safe retries.
4.  **Observability First:** Every step of the agent execution chain emits structured logs and traces to enable full visibility into decision-making paths.

---

## 2. Orchestration & Workflow

We utilize a durable execution framework (e.g., Temporal or a persistent State Machine) to manage complex, multi-step agent workflows.

### 2.1 Workflow Patterns

#### A. The "Outbound" Pipeline (Linear with Feedback)
1.  **Scout:** Identifies potential targets based on ICP (Ideal Customer Profile).
2.  **Enrichment:** Aggregates data from multiple sources (Clearbit, Apollo, Web).
3.  **Research:** Performs deep-dive analysis on specific targets (Web scraping, PDF analysis).
4.  **Drafting:** Generates personalized content.
5.  **Review (MFR):** Automated quality checks. *Feedback Loop:* If rejected, returns to Drafting with specific critique.
6.  **Dispatch:** Sends via appropriate channel (Email, DM).

#### B. The "Inbound" Pipeline (Event-Triggered)
1.  **Trigger:** Webhook from CRM or Form Submit.
2.  **Triage:** Intent classification.
3.  **Routing:** Dispatched to specialized handler (Sales Agent, Support Agent).
4.  **Action:** Booking, Answering, or Escalating.

### 2.2 State Management
-   **Hot State:** Current execution step, retries, temporary variables (Redis).
-   **Cold State:** Completed workflows, audit logs, billing records (PostgreSQL).
-   **Semantic State:** Agent memory, document embeddings, past interactions (Qdrant).

---

## 3. Agent Ecosystem & Specifications

### 3.1 Scout Agent
*   **Role:** Discovery and Qualification.
*   **Input:** ICP definition (Industry, Role, Tech Stack).
*   **Process:** Queries search indices, LinkedIn, and directories.
*   **Output:** List of verified leads with metadata.
*   **Tech:** Custom search adaptors, SerpApi, specialized scrapers.

### 3.2 Research Agent
*   **Role:** Deep Intelligence Gathering.
*   **Input:** Domain URL or Company Name.
*   **Process:**
    *   **Crawl:** Navigates sitemaps, "About Us", "News".
    *   **Analyze:** Extracts value propositions, pain points, decision makers.
    *   **Synthesize:** Creates a structured "Company Dossier".
*   **Tech:** Crawl4AI (Headless browsing), LLM for extraction, PDF parsers.

### 3.3 Writer Agent
*   **Role:** Content Generation & Personalization.
*   **Input:** Company Dossier + Campaign Template + Goal.
*   **Process:**
    *   Selects tone/voice.
    *   Injects research findings into template hooks.
    *   Generates subject lines and body copy.
*   **Tech:** LLM (Claude 3.5 Sonnet / GPT-4o), Prompt Engineering templates.

### 3.4 Quality (MFR) Agent
*   **Role:** Guardrails and Validation.
*   **Process:** Runs a deterministic checklist against generated content.
    *   *Hallucination Check:* Verifies claims against Research data.
    *   *Safety Check:* PII removal, sentiment analysis.
    *   *Formatting:* JSON schema validation.
*   **Tech:** Lightweight LLM (Haiku/GPT-3.5) + Rule-based Logic (Python).

---

## 4. Integration & Data Layer

### 4.1 Data Pipeline
*   **Ingestion:** Webhooks (Stripe, Typeform), API Polling (CRM), File Uploads.
*   **Normalization:** All incoming data is mapped to a unified internal schema (Zod schemas).
*   **Storage Strategy:**
    *   *Structured:* PostgreSQL (Supabase) for relational data (Users, Campaigns, Logs).
    *   *Unstructured:* S3-compatible storage for raw HTML, PDFs, screenshots.
    *   *Vector:* Qdrant for semantic search (e.g., "Find companies similar to Stripe").

### 4.2 API Gateway
*   **Rate Limiting:** Token bucket algorithm per user/tenant.
*   **Authentication:** JWT verification via Clerk/Supabase Auth.
*   **Routing:** Directs traffic to appropriate microservices or serverless functions.

---

## 5. Resilience & Error Handling

### 5.1 Circuit Breaker Pattern
Implemented at the Integration Layer to prevent cascading failures.
*   **State: Closed (Normal):** Requests pass through.
*   **State: Open (Failed):** Fast fail for a timeout period if error threshold reached (e.g., 50% failures in 1 min).
*   **State: Half-Open:** Allow test requests to check if upstream service recovered.

### 5.2 Retry Logic
*   **Transient Errors (Network, 503):** Exponential backoff with jitter.
    *   `delay = min(cap, base * 2 ** attempt + jitter)`
*   **Terminal Errors (401, 400, Validation):** Immediate failure, routed to Dead Letter Queue (DLQ).

### 5.3 Dead Letter Queue (DLQ)
Messages that fail processing after max retries are moved to a DLQ.
*   **Recovery:** Admin dashboard allows inspection and manual "Replay" of DLQ messages after fixing the root cause.

---

## 6. Scalability & Performance

### 6.1 Horizontal Scaling
*   **Agents:** Containerized (Docker) and deployed on Kubernetes/ECS. Auto-scaled based on Queue Depth (KEDA).
*   **Database:** Read replicas for heavy query loads. Connection pooling (PgBouncer).

### 6.2 Caching Strategy
*   **L1 Cache (In-Memory):** Agent config, prompt templates.
*   **L2 Cache (Redis):** API responses (e.g., repeated scrapes of the same URL within 24h), user sessions.

### 6.3 Optimization
*   **Batch Processing:** Embeddings and classification tasks are batched to maximize GPU utilization and reduce API costs.
*   **Streaming:** UI receives token streams from Writer Agent for perceived latency reduction.

---

## 7. Technology Stack

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | React, TypeScript, Tailwind | Component reuse, type safety. |
| **Backend API** | Node.js / Python (FastAPI) | Async capabilities, rich ML ecosystem. |
| **Orchestration** | Temporal / Inngest | Durable execution, reliable retries. |
| **LLM Interface** | Vercel AI SDK / LangChain | Model agnosticism, streaming support. |
| **Vector DB** | Qdrant / Pinecone | Scalable similarity search. |
| **Database** | PostgreSQL (Supabase) | Reliable, relational + JSON support. |
| **Queue** | Redis / RabbitMQ | High-throughput message passing. |
| **Browser** | Playwright / Puppeteer | Robust headless browsing. |
| **Monitoring** | OpenTelemetry, Sentry | Full stack observability. |

---

## 8. Deployment Strategy

### 8.1 Environments
*   **Dev:** Local Docker Compose or Minikube.
*   **Staging:** Mirror of production, connects to sandbox external APIs.
*   **Production:** Multi-AZ deployment for high availability.

### 8.2 CI/CD Pipeline
1.  **Lint & Test:** Code formatting, Unit Tests, Integration Tests.
2.  **Build:** Docker image creation, Security Scan (Trivy).
3.  **Deploy:** Blue/Green deployment to ensure zero downtime.
4.  **Smoke Test:** Automated E2E verification of critical paths.

---

**Architecture is a living document.** This blueprint represents our current best practices and will evolve with our capabilities and scale.
