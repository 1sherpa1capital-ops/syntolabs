# Synto Labs Security Protocol

**Version:** 1.0
**Date:** February 9, 2026
**Status:** Security Reference

---

## 1. Security Overview

### 1.1 Security Principles

Synto Labs operates under a **trust-but-verify** security model with zero-trust architecture for client data:

1. **Data Minimization** - Collect only what's necessary
2. **Least Privilege** - Minimum access required for each component
3. **Defense in Depth** - Multiple layers of security controls
4. **Fail Securely** - Default to secure, opt-in to less secure
5. **Transparency** - Clear communication about data handling

### 1.2 Security Posture

| Aspect | Status | Notes |
|--------|--------|-------|
| **Data Encryption** | At rest & in transit | AES-256, TLS 1.3 |
| **Access Control** | Role-based | Admin, developer, viewer |
| **Audit Logging** | Enabled | All actions logged |
| **Penetration Testing** | Quarterly | Internal + external |
| **Compliance** | Self-certified | GDPR, CCPA aware |

---

## 2. Data Handling Policies

### 2.1 Data Classification

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA CLASSIFICATION                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PUBLIC (Green)                                                 │
│  • Marketing materials, website content                         │
│  • Published case studies (with consent)                        │
│  • Publicly available company information                       │
│  • No restrictions on access or sharing                         │
│                                                                 │
│  INTERNAL (Yellow)                                              │
│  • Internal documentation, processes                            │
│  • Non-sensitive project artifacts                              │
│  • General team communications                                  │
│  • Synto Labs team access only                                  │
│                                                                 │
│  CONFIDENTIAL (Orange)                                          │
│  • Client business data (proprietary but not PII)               │
│  • Project specifications, workflows                            │
│  • API keys, credentials (encrypted)                            │
│  • Client + authorized Synto personnel access                   │
│                                                                 │
│  RESTRICTED (Red)                                               │
│  • Personal information (PII): emails, names, phone numbers     │
│  • Financial data, payment information                          │
│  • Authentication credentials in plaintext                      │
│  • Strict access control, audit trail required                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Client Data Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Collect │ ─▶ │   Store  │ ─▶ │ Process  │ ─▶ │  Export  │ ─▶ │  Delete  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
  Consent       Encrypted      MFR           Client        Secure
  + Scope       at Rest        Guardrails    Control       Erasure
                                + Audit
```

**Phase Details:**

| Phase | Actions | Controls |
|-------|---------|----------|
| **Collect** | Data ingestion, web scraping, API pulls | Consent verification, source validation |
| **Store** | Database storage, vector embeddings | Encryption at rest, access controls |
| **Process** | Agent operations, MFR validation | Audit logging, output verification |
| **Export** | Reports, CRM updates, emails | Client approval, format validation |
| **Delete** | Retention expiry, client request | Secure erasure, certificate of deletion |

### 2.3 Data Retention Policy

| Data Type | Retention Period | Post-Retention Action |
|-----------|------------------|-----------------------|
| **Prospect Data** | 90 days after last contact | Secure deletion |
| **Client PII** | Duration of engagement + 3 years | Secure deletion |
| **Project Artifacts** | Duration of engagement + 1 year | Archive then delete |
| **Logs/Audit Trails** | 1 year | Secure deletion |
| **Backups** | 30 days | Secure deletion |
| **Published Case Studies** | Indefinite (with consent) | Keep public |

**Exceptions:**
- Legal holds override retention policies
- Client may request earlier deletion
- Anonymized data may be retained for analytics

---

## 3. Privacy Protection Measures

### 3.1 PII Handling

**Personally Identifiable Information (PII) Definition:**
- Names, email addresses, phone numbers
- Physical addresses, locations
- Job titles, company affiliations
- Social media handles, LinkedIn profiles

**Handling Requirements:**
1. **Collection Limitation** - Only collect PII necessary for the workflow
2. **Purpose Specification** - Document why each PII element is needed
3. **Use Limitation** - Use PII only for stated purposes
4. **Data Quality** - Keep PII accurate and up-to-date
5. **Security Safeguards** - Protect against unauthorized access
6. **Openness** - Inform clients about PII practices
7. **Individual Participation** - Allow clients to access/correct their PII
8. **Accountability** - Maintain compliance records

### 3.2 Anonymization Techniques

**For Analytics and Testing:**
```python
def anonymize_email(email: str) -> str:
    """Return anonymized version for analytics."""
    local, domain = email.split('@')
    return f"{local[0]}***@{domain}"

def anonymize_name(name: str) -> str:
    """Return first initial + last name anonymized."""
    parts = name.split()
    if len(parts) >= 2:
        return f"{parts[0][0]}. *** {parts[-1]}"
    return "***"

def hash_pii(text: str) -> str:
    """One-way hash for PII matching."""
    return hashlib.sha256(text.encode()).hexdigest()
```

### 3.3 Consent Management

**Consent Types:**
1. **Explicit Consent** - For PII processing, case studies, marketing
2. **Implied Consent** - For business-provided contact info in B2B context
3. **Opt-Out Consent** - For communications that can be declined

**Consent Tracking:**
```python
class ConsentManager:
    def __init__(self):
        self.consents = {}  # client_id -> ConsentRecord

    def record_consent(self, client_id: str, consent_type: str,
                      source: str, timestamp: datetime):
        self.consents[client_id] = ConsentRecord(
            type=consent_type,
            source=source,  # email, contract, web_form
            timestamp=timestamp,
            status='active'
        )

    def check_consent(self, client_id: str, action: str) -> bool:
        consent = self.consents.get(client_id)
        if not consent:
            return False
        return consent.permits(action)

    def revoke_consent(self, client_id: str):
        if client_id in self.consents:
            self.consents[client_id].status = 'revoked'
            self.consents[client_id].revoked_at = datetime.now()
```

---

## 4. API Key Management

### 4.1 Key Storage

**Environment Variables (Never Commit):**
```bash
# .env.local (local development)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
COMPOSIO_API_KEY=...
GMAIL_CREDENTIALS=...
```

**Production Secrets:**
- Use platform secret management (Vercel Env, Railway Secrets)
- Never hardcode in source code
- Rotate keys quarterly
- Use different keys per environment

### 4.2 Key Rotation Procedure

1. **Generate new keys** for all services
2. **Update production environment** with new keys
3. **Test all integrations** with new keys
4. **Deprecate old keys** (keep active for 48 hours for rollback)
5. **Delete old keys** from provider dashboards
6. **Document rotation** in audit log

**Rotation Schedule:**
| Service | Rotation Frequency | Last Rotation |
|---------|-------------------|---------------|
| OpenAI | Quarterly | TBD |
| Anthropic | Quarterly | TBD |
| Composio | Quarterly | TBD |
| Gmail | As needed | TBD |

### 4.3 Key Access Control

**Role-Based Access:**
| Role | Can View Keys | Can Rotate Keys | Can Use Keys |
|------|--------------|-----------------|--------------|
| Founder/Admin | Yes | Yes | Yes |
| Developer | No | No | Yes (via app) |
| Subcontractor | No | No | No |

**Usage Monitoring:**
```python
class APIKeyMonitor:
    def __init__(self):
        self.usage = {}  # key_id -> UsageStats

    def log_usage(self, key_id: str, service: str,
                  endpoint: str, status: str):
        if key_id not in self.usage:
            self.usage[key_id] = UsageStats()

        self.usage[key_id].record_call(service, endpoint, status)

    def check_anomalies(self) -> List[Alert]:
        alerts = []
        for key_id, stats in self.usage.items():
            if stats.error_rate > 0.15:
                alerts.append(Alert(
                    type='high_error_rate',
                    key_id=key_id,
                    message=f"Error rate {stats.error_rate:.1%}"
                ))
            if stats.unusual_patterns():
                alerts.append(Alert(
                    type='unusual_usage',
                    key_id=key_id,
                    message=f"Unusual usage pattern detected"
                ))
        return alerts
```

---

## 5. Access Controls

### 5.1 Authentication

**Developer Access:**
```python
# Required for admin/developer access
ADMIN_API_KEYS = [
    os.getenv('ADMIN_KEY_1'),
    os.getenv('ADMIN_KEY_2'),
]

def authenticate_admin(request: Request) -> bool:
    key = request.headers.get('X-API-Key')
    return key in ADMIN_API_KEYS
```

**Client Access:**
```python
# Client-specific API keys for their workflows
def authenticate_client(request: Request, client_id: str) -> bool:
    key = request.headers.get('X-Client-Key')
    stored_hash = get_client_key_hash(client_id)
    return verify_hash(key, stored_hash)
```

### 5.2 Authorization Matrix

| Resource | Admin | Developer | Client | Public |
|----------|-------|-----------|--------|--------|
| `/admin/*` | Read/Write | None | None | None |
| `/workflows/*` | Read/Write | Read | Read (own) | None |
| `/agents/*` | Read/Write | Read (docs) | None | None |
| `/health` | Read | Read | Read | Read |
| `/api/v1/*` | Read/Write | Read/Write | Read (own) | None |

### 5.3 Rate Limiting

```python
class RateLimiter:
    def __init__(self):
        self.limits = {
            'admin': RateLimit(requests=1000, window=60),
            'client': RateLimit(requests=100, window=60),
            'public': RateLimit(requests=10, window=60),
        }

    def check_rate_limit(self, role: str, client_id: str) -> bool:
        limit = self.limits.get(role, self.limits['public'])

        key = f"{role}:{client_id}"
        current = redis.get(key) or 0

        if current >= limit.requests:
            return False

        redis.incr(key)
        redis.expire(key, limit.window)
        return True
```

---

## 6. Encryption Standards

### 6.1 Encryption at Rest

**Database Encryption:**
- Supabase: AES-256 encryption by default
- Qdrant: Supports encryption at rest

**Field-Level Encryption for Sensitive Data:**
```python
from cryptography.fernet import Fernet

class FieldEncryption:
    def __init__(self, key: bytes):
        self.cipher = Fernet(key)

    def encrypt(self, plaintext: str) -> str:
        return self.cipher.encrypt(plaintext.encode()).decode()

    def decrypt(self, ciphertext: str) -> str:
        return self.cipher.decrypt(ciphertext.encode()).decode()

# Usage
encryptor = FieldEncryption(os.getenv('ENCRYPTION_KEY'))

# Encrypt API keys before storing
encrypted_key = encryptor.encrypt(api_key)
db.store('api_key', encrypted_key)

# Decrypt when needed
api_key = encryptor.decrypt(db.get('api_key'))
```

### 6.2 Encryption in Transit

**Requirements:**
- All API communications over HTTPS (TLS 1.3)
- No plaintext credentials in URLs
- Secure WebSocket (WSS) for real-time

**Certificate Management:**
- Let's Encrypt for automatic renewal
- Vercel/Railway handle certificate provisioning
- Regular certificate monitoring

---

## 7. Audit Logging

### 7.1 What to Log

| Event Category | Examples | Retention |
|----------------|----------|-----------|
| **Authentication** | Logins, logouts, failed attempts | 1 year |
| **Authorization** | Access granted/denied to resources | 1 year |
| **Data Access** | Records viewed, exported, modified | 1 year |
| **Agent Actions** | Agent start, completion, errors | 1 year |
| **API Calls** | External API requests, responses | 90 days |
| **Admin Actions** | Configuration changes, key rotation | Indefinite |
| **Security Events** | Suspicious activity, blocked attempts | Indefinite |

### 7.2 Log Format

```json
{
  "timestamp": "2026-02-09T14:23:15.123Z",
  "level": "INFO",
  "event_type": "agent.completed",
  "actor": {
    "type": "service",
    "id": "research_agent"
  },
  "client_id": "client_abc123",
  "workflow_id": "workflow_xyz789",
  "details": {
    "agent_type": "research",
    "input_url": "https://example.com",
    "output_records": 42,
    "duration_ms": 1234
  },
  "status": "success",
  "ip_address": "192.168.1.1",
  "request_id": "req_123456"
}
```

### 7.3 Log Access & Review

**Access Controls:**
- Only admin role can view raw logs
- Clients can view filtered logs for their workflows
- Logs exported only for security investigations

**Review Schedule:**
- Daily: Automated anomaly detection
- Weekly: Security team review of critical events
- Monthly: Full audit log review
- Quarterly: External audit (optional)

---

## 8. Incident Response

### 8.1 Incident Classification

| Severity | Description | Response Time | Examples |
|----------|-------------|---------------|----------|
| **P0 - Critical** | System compromise, data breach | <1 hour | Unauthorized data access, ransomware |
| **P1 - High** | Service outage, data exposure | <4 hours | Database breach, API leak |
| **P2 - Medium** | Partial outage, security issue | <24 hours | Rate limit bypass, authentication bug |
| **P3 - Low** | Minor issue, policy question | <72 hours | Suspicious activity, policy question |

### 8.2 Incident Response Procedure

```
┌─────────────────────────────────────────────────────────────────┐
│                    INCIDENT RESPONSE LIFECYCLE                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. DETECT                                                     │
│     • Automated monitoring alerts                               │
│     • User reports                                              │
│     • Anomaly detection                                         │
│         │                                                       │
│         ▼                                                       │
│  2. TRIAGE                                                     │
│     • Classify severity (P0-P3)                                │
│     • Assign incident responder                                │
│     • Initial containment                                       │
│         │                                                       │
│         ▼                                                       │
│  3. INVESTIGATE                                                │
│     • Determine scope and impact                               │
│     • Identify root cause                                      │
│     • Preserve evidence                                         │
│         │                                                       │
│         ▼                                                       │
│  4. CONTAIN                                                    │
│     • Stop the bleeding                                        │
│     • Isolate affected systems                                 │
│     • Prevent further damage                                   │
│         │                                                       │
│         ▼                                                       │
│  5. ERADICATE                                                  │
│     • Remove threat                                            │
│     • Patch vulnerabilities                                    │
│     • Verify removal                                           │
│         │                                                       │
│         ▼                                                       │
│  6. RECOVER                                                    │
│     • Restore systems                                          │
│     • Validate functionality                                   │
│     • Monitor for recurrence                                   │
│         │                                                       │
│         ▼                                                       │
│  7. POST-MORTEM                                                │
│     • Document incident                                        │
│     • Identify lessons learned                                 │
│     • Update procedures                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.3 Incident Response Team

| Role | Responsibilities | Contact |
|------|------------------|---------|
| **Incident Commander** | Overall coordination, decision-making | Founder |
| **Technical Lead** | Investigation, containment, recovery | Lead Developer |
| **Communications** | Client notification, public statements | Founder |
| **Legal** | Compliance, liability assessment | External Counsel |

### 8.4 Notification Requirements

**Data Breach Notification:**
- **Clients**: Within 72 hours of discovery (GDPR, CCPA)
- **Regulators**: As required by jurisdiction
- **Public**: If significant impact or required by law

**Notification Template:**
```
Subject: Important Security Notice - [Incident Title]

Dear [Client Name],

We are writing to inform you of a security incident that may have
involved your data.

[What happened]
[When it happened]
[What data was affected]
[What we are doing]
[What you should do]

We sincerely apologize for any inconvenience or concern this may cause.
We are committed to protecting your data and have taken steps to
prevent similar incidents in the future.

For questions, contact: [Security Contact]
```

---

## 9. Compliance Considerations

### 9.1 GDPR (General Data Protection Regulation)

**Key Principles:**
1. **Lawful Basis** - Consent or legitimate interest for processing
2. **Purpose Limitation** - Collect for specific, explicit purposes
3. **Data Minimization** - Only necessary data
4. **Accuracy** - Keep data accurate and up-to-date
5. **Storage Limitation** - Retain only as long as necessary
6. **Integrity & Confidentiality** - Appropriate security
7. **Accountability** - Demonstrate compliance

**Data Subject Rights:**
- Right to access
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability
- Right to object

### 9.2 CCPA (California Consumer Privacy Act)

**Consumer Rights:**
- Right to know what data is collected
- Right to know if data is sold/disclosed
- Right to say no to sale of data
- Right to access/delete data
- Right to non-discrimination for exercising rights

**Business Requirements:**
- Privacy policy disclosure
- "Do Not Sell My Info" link (if applicable)
- Data access requests within 45 days
- Verification of requestor identity

### 9.3 Compliance Checklist

| Requirement | Status | Notes |
|-------------|--------|-------|
| Privacy Policy | Drafted | Needs legal review |
| Data Processing Agreement | Template ready | Per-client customization |
| Cookie Policy | Not applicable | No tracking cookies |
| Data Breach Response | Documented | Section 8 of this doc |
| Data Access Requests | Process defined | Manual handling |
| Data Deletion Requests | Process defined | 30-day turnaround |
| Data Export Requests | Process defined | Common format |

---

## 10. Client Data Separation

### 10.1 Multi-Tenant Architecture

**Data Isolation Strategy:**
```python
class ClientDataStore:
    def __init__(self):
        self.databases = {}  # client_id -> isolated connection

    def get_client_db(self, client_id: str) -> Database:
        if client_id not in self.databases:
            # Create isolated namespace/DB per client
            self.databases[client_id] = self._create_isolated_db(client_id)
        return self.databases[client_id]

    def _create_isolated_db(self, client_id: str) -> Database:
        # Options:
        # 1. Separate schema in PostgreSQL
        # 2. Separate collection in Qdrant
        # 3. Namespace prefix in keys
        return Database(
            schema=f"client_{client_id}",
            access_policy=f"client_{client_id}_only"
        )
```

### 10.2 Cross-Client Prevention

```python
class AccessControl:
    def validate_access(self, client_id: str, resource_id: str) -> bool:
        # Ensure client can only access their own resources
        resource_owner = self.get_resource_owner(resource_id)
        return resource_owner == client_id

    def inject_client_filter(self, client_id: str, query: str) -> str:
        # Automatically inject client_id filter into queries
        return f"{query} AND client_id = '{client_id}'"
```

### 10.3 Data Ownership

**Data Rights:**
- Clients own all data they provide
- Clients own all outputs generated from their data
- Synto Labs retains reusable patterns/processes
- Shared ownership on collaboratively developed IP

**Data Export:**
```python
class DataExporter:
    def export_client_data(self, client_id: str) -> ExportPackage:
        return ExportPackage(
            config=self.get_client_config(client_id),
            workflows=self.get_client_workflows(client_id),
            results=self.get_client_results(client_id),
            format="standard"  # Standard format for portability
        )
```

---

## 11. Security Training

### 11.1 Team Training Requirements

| Role | Training Frequency | Topics |
|------|-------------------|--------|
| **All Personnel** | Onboarding + annual | Phishing, password security, data handling |
| **Developers** | Quarterly | Secure coding, API security, incident response |
| **Admin** | Monthly | Security review, threat intelligence |

### 11.2 Security Awareness

**Monthly Security Briefings:**
- Recent security incidents in the industry
- New threats and vulnerabilities
- Reminders on security best practices
- Q&A session

**Phishing Simulations:**
- Quarterly simulated phishing campaigns
- Track and report click rates
- Additional training for repeat offenders

---

## 12. Security Metrics & Monitoring

### 12.1 Key Security Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Mean Time to Detect (MTTD)** | <24 hours | Time from incident to detection |
| **Mean Time to Respond (MTTR)** | <4 hours | Time from detection to containment |
| **Vulnerability Remediation** | <30 days | Time from patch to deployment |
| **Security Training Completion** | 100% | Annual training completion rate |
| **Failed Authentications** | <5% | Monthly failed auth rate |

### 12.2 Continuous Monitoring

**Security Monitoring Stack:**
```python
class SecurityMonitor:
    def __init__(self):
        self.alerts = []

    def check_all_metrics(self):
        self.check_failed_auths()
        self.check_rate_limit_exceeded()
        self.check_unusual_access_patterns()
        self.check_api_errors()
        self.check_data_export_volume()

    def check_failed_auths(self):
        failed_count = self.get_failed_auth_count(hours=1)
        if failed_count > 10:
            self.alerts.append(Alert(
                severity='high',
                message=f'{failed_count} failed auth attempts in last hour'
            ))
```

---

## 13. Third-Party Risk Management

### 13.1 Vendor Assessment

**Security Criteria for Vendors:**
- SOC 2 Type II certification (preferred)
- GDPR/CCPA compliance commitment
- Data processing agreement available
- Incident response procedure documented
- Security questionnaire completed

**Vendor Tiers:**
| Tier | Description | Examples | Assessment |
|------|-------------|----------|------------|
| **Critical** | Core infrastructure, data storage | Vercel, Railway, Supabase | Annual review |
| **Important** | APIs, integrations | OpenAI, Anthropic | Annual review |
| **Standard** | Tools, utilities | Composio, Crawl4AI | Onboarding only |

### 13.2 Data Processing Agreements

**Minimum DPA Requirements:**
- Data classification and handling
- Security measures description
- Breach notification commitments
- Data deletion procedures
- Audit rights provision

---

**Document End**

*This security protocol is a living document. Update as regulations change and new threats emerge.*
