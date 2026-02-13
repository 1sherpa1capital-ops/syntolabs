# Synto Labs Service Level Agreement (SLA)

**Effective Date:** February 12, 2026
**Version:** 1.0

---

## 1. Agreement Overview

This Service Level Agreement ("SLA") outlines the performance commitments, support policies, and remedies for clients of Synto Labs ("Service Provider") on **Active Retainer Plans**.

This SLA does not apply to "Discovery Prototype" or "One-Time Project" clients unless explicitly stated in the Statement of Work (SOW).

---

## 2. Service Availability

### 2.1 Uptime Commitment
Synto Labs guarantees that our deployed Agent Automation Interfaces will be available **99.0%** of the time during any monthly billing cycle.

**Exclusions:**
*   Scheduled maintenance (with 48h notice).
*   Third-party API outages (e.g., OpenAI, AirTable, Gmail API downtimes).
*   Client-side issues (i.e., you changing your CRM password and breaking the connection).

### 2.2 Third-Party Dependency Policy
Our agents rely on external APIs (OpenAI, Anthropic, LinkedIn, etc.).
*   **Critical Failure:** If a core provider (e.g., OpenAI) goes down, we will pause agent execution to prevent errors. This is not considered "Downtime."
*   **Breaking Changes:** If a provider changes their API/DOM (e.g., LinkedIn UI update breaks scraping), Synto Labs commits to a **patch applied within 72 hours** of detection.

---

## 3. Support & Incident Response

### 3.1 Support Channels
*   **Email:** support@syntolabs.xyz
*   **Slack/discord:** Shared channel (for Tier 2/3 clients)

### 3.2 Response Time Objectives (RTO)

| Severity Level | Definition | Response Time | Resolution Target |
| :--- | :--- | :--- | :--- |
| **Critical (P0)** | Agent completely completely stopped; Revenue impact high. (e.g., "Leads not being sent to CRM") | < 4 Business Hours | < 24 Hours |
| **High (P1)** | Core feature degraded; Workaround available. (e.g., "Enrichment missing data") | < 1 Business Day | < 3 Days |
| **Normal (P2)** | Minor bug; Cosmetic issue; Question. | < 2 Business Days | < 5 Days |
| **Feature Request** | New capabilities or changes to scope. | N/A | Discussed in Monthly Review |

*Business Hours: Monday - Friday, 9:00 AM - 5:00 PM EST (US).*

---

## 4. Maintenance & Updates

### 4.1 Optimization
Retainer clients receive continuous optimization mechanisms:
*   **Prompt Tuning:** We adjust prompts based on agent output quality.
*   **Model Upgrades:** We upgrade to new models (e.g., GPT-5) if they offer better performance/cost, at no extra implementation fee.

### 4.2 Security Updates
Security patches (e.g., library vulnerabilities) are applied within **24 hours** of release.

---

## 5. Remedies (Service Credits)

If Synto Labs fails to meet the Uptime Commitment (excluding third-party outages), the Client is eligible for Service Credits:

| Monthly Uptime | Service Credit |
| :--- | :--- |
| > 99.0% | N/A |
| 95.0% - 98.9% | 10% of Monthly Retainer |
| < 95.0% | 20% of Monthly Retainer |

*Credits are applied to the next month's invoice. Credits cannot exceed 20% of the monthly fee.*

---

## 6. Client Responsibilities

To ensure SLA adherence, the Client must:
1.  **Maintain Access:** Keep API keys and credentials valid.
2.  **Report Issues:** Notify Synto Labs immediately of suspected issues.
3.  **No Unapproved Changes:** Do not alter the underlying data schemas or connected tool settings without notifying Synto Labs.

---

**Synto Labs**
*Automating the Repetitive.*
