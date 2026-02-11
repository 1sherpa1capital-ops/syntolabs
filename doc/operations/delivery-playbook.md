# Synto Labs Delivery Playbook

**Version:** 2.0
**Philosophy:** Move Fast. Break Things. Fix Faster. (Kaizen)
**Core Mandate:** 48-Hour Prototype. No Excuses.

---

## 1. Delivery Philosophy (Kaizen)

We don't just "deliver." We **iterate**. Every project is an opportunity to refine our process and your operations.

**The Loop:**
1.  **Build (MVP):** Get a working prototype in front of the client in 48 hours.
2.  **Verify (Data):** Use real client data immediately. Fail fast on edge cases.
3.  **Refine (MFR):** Tighten the guardrails based on failures. Zero hallucinations allowed.
4.  **Optimize (Speed):** Reduce latency and cost per execution.

---

## 2. Multi-Agent System Architecture

We build composable, specialized agents. Think lego blocks, not monoliths.

### Agent Types
| Agent | Role | Capability |
|-------|------|------------|
| **Scout** | Source | Scrapes web, finds leads, monitors inputs. |
| **Research** | Context | Enriches data, verifies facts (MFR check). |
| **Logic** | Decision | Filters, scores, routes based on rules. |
| **Action** | Execution | Writes emails, updates CRM, schedules meetings. |
| **Guard** | Quality | Validates output against brand voice/facts. |

### Core Workflows
1.  **Sales:** Scout → Research → Logic → Action (Outreach)
2.  **Triage:** Scout (Inbox) → Logic (Classify) → Action (Draft/Route)
3.  **Qualify:** Research (Enrich) → Logic (Score) → Action (Update CRM)

---

## 3. The 48-Hour Build Sprint (Actionable)

**Goal:** Working prototype in client hands.

### Day 1: Foundation (Hours 0-24)
*   **Hour 0-2 (Critical Setup):**
    *   [ ] Verify ALL access credentials (CRM, API keys). Test immediately.
    *   [ ] Clone repo template.
    *   [ ] Set up local dev environment.
    *   [ ] **Validation:** Run "Hello World" test for each integration.
*   **Hour 2-8 (Core Logic):**
    *   [ ] Implement Scout agent (Input processing).
    *   [ ] Implement basic Logic/Research agent.
    *   [ ] **Validation:** Verify data extraction accuracy > 90%.
*   **Hour 8-16 (Integration):**
    *   [ ] Connect Action agent to *sandbox* tools (or draft mode).
    *   [ ] Run end-to-end flow with synthetic data.
    *   [ ] **Validation:** Confirm data flows correctly through all steps.
*   **Hour 16-24 (Buffer/Fixes):**
    *   [ ] Address immediate blockers.
    *   [ ] Refine prompts based on initial outputs.

### Day 2: Refinement (Hours 24-48)
*   **Hour 24-32 (MFR Implementation):**
    *   [ ] Add "No-Hallucination" checks.
    *   [ ] Implement specific business rule guardrails.
    *   [ ] **Validation:** Run adversarial tests (try to break it).
*   **Hour 32-40 (Client Data Test):**
    *   [ ] Run batch test with ~10 real client records.
    *   [ ] Manually verify every output.
    *   [ ] Fix logic errors immediately.
*   **Hour 40-48 (Polish & Demo):**
    *   [ ] Prepare demo script/video.
    *   [ ] Ensure error handling is graceful (no crashes).
    *   [ ] **Deliverable:** Working prototype link/video sent to client.

---

## 4. MFR Guardrails (Model-First Reasoning)

**The Rule:** No agent output reaches a client without passing MFR.

**Implementation Checklist:**
1.  **Fact Check:** Does the output reference specific data points? Verify against source.
2.  **Tone Check:** Does the output match the brand voice guidelines? (Use `Brand Guard` agent).
3.  **Logic Check:** Does the action violate any business rules (e.g., "Don't email competitors")?
4.  **Fallback:** If MFR fails, *do not send*. Route to human review or retry.

---

## 5. Deployment & Handoff

**Pre-Flight:**
*   [ ] All API keys rotated to production (if applicable).
*   [ ] Logging/Monitoring enabled (sentry/logs).
*   [ ] Rate limits configured.
*   [ ] Client sign-off received on prototype.

**Post-Deployment (The First Week):**
*   **Daily Monitor:** Review logs every morning.
*   **Fast Fixes:** Address bugs within 4 hours.
*   **Feedback Loop:** Ask client for friction points.

---

## 6. Continuous Improvement (Kaizen)

**Weekly Review:**
1.  **Metric:** What is the success rate? (Executions vs. Errors)
2.  **Bottleneck:** Which agent is slowest/most expensive?
3.  **Action:** Optimize one component. (e.g., Switch model for simpler task, improve prompt).

**Retrospective:**
After every project, ask:
*   What slowed us down?
*   What tool was missing?
*   How can we shave 4 hours off the next build?

---

*Build. Measure. Learn. Repeat.*
