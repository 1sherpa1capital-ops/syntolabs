# Synto Labs Security Protocol

**Version:** 1.0  
**Date:** February 9, 2026  
**Purpose:** Data protection, privacy, and security practices

---

## 1. Security Philosophy

**Principles:**
1. Client data is sacred
2. Encryption everywhere
3. Least privilege access
4. Audit everything
5. Delete when done

---

## 2. Data Classification

### Data Types

| Classification | Definition | Handling |
|---------------|------------|----------|
| **Public** | Publicly available information | No special handling |
| **Internal** | Synto Labs business info | Internal access only |
| **Confidential** | Client business information | Encrypted, access controlled |
| **Restricted** | Sensitive client data | Maximum protection |

### Data Lifecycle

```
Ingest → Classify → Store (Encrypted) → Process → Delete (Securely)
```

---

## 3. Data Handling

### Collection

**What we collect:**
- Business contact info (for projects)
- Access credentials (API keys, tokens)
- Sample data (for training/testing)
- Communication (emails, messages)

**How we collect:**
- Direct from client (encrypted channels)
- Through secure forms
- Via encrypted APIs

**What we DON'T collect:**
- Personal data beyond what's needed
- Data from non-clients
- Data without explicit consent

---

### Storage

**Encryption:**
- At rest: AES-256
- In transit: TLS 1.3+

**Storage Locations:**
| Data Type | Storage | Encryption |
|----------|---------|------------|
| Code | GitHub (private repos) | N/A (not sensitive) |
| Secrets | Environment variables | Encrypted |
| Client Data | Isolated per project | Encrypted |
| Logs | Secure logging service | Encrypted |

**Access Control:**
- Principle of least privilege
- Role-based access control
- Audit trail of all access

---

### Processing

**During agent execution:**
- Data used for processing only
- No data shared with third parties (except used APIs)
- MFR guardrails prevent inappropriate outputs

**After processing:**
- Output delivered to client
- Temporary data cleared
- Logs maintained (no sensitive data)

---

### Deletion

**Automatic Deletion:**
- Client data: 90 days after project end
- Temporary files: 24 hours
- Logs: 90 days (anonymized after 30)

**On Request:**
- Clients can request immediate deletion
- Verify identity first
- Confirm deletion within 48 hours

---

## 4. Access Control

### Authentication

**Multi-factor authentication required for:**
- All admin accounts
- Cloud infrastructure
- Client data access

**Password Requirements:**
- Minimum 12 characters
- Unique per service
- Rotated quarterly
- No password reuse

---

### Authorization

**Roles:**
| Role | Access | Capabilities |
|------|--------|--------------|
| **Owner** | Full access | All permissions |
| **Developer** | Code, infrastructure | Limited client data access |
| **Contractor** | Project-specific | Only assigned project |

**Least Privilege:**
- Grant minimum access needed
- Revoke access when project ends
- Audit access monthly

---

## 5. API & Secret Management

### API Keys

**Storage:**
- Environment variables only
- Never in code repositories
- Encrypted at rest

**Rotation:**
- Every 90 days
- Immediately if compromised
- Document rotation dates

**Usage:**
- Use service accounts where possible
- Limit permissions to minimum needed
- Monitor usage for anomalies

---

### Secrets Management

**Tools:**
- Environment variables (dev)
- AWS Secrets Manager / equivalent (prod)
- 1Password for team secrets

**Best Practices:**
- Never commit secrets to git
- Use different secrets per environment
- Rotate compromised secrets immediately

---

## 6. Incident Response

### Incident Classification

| Severity | Description | Response Time |
|----------|-------------|---------------|
| **Critical** | Data breach, system down | 1 hour |
| **High** | Security control bypass | 4 hours |
| **Medium** | Suspicious activity | 24 hours |
| **Low** | Policy violation | 48 hours |

### Response Process

1. **Identify** — Detect incident
2. **Contain** — Limit damage
3. **Eradicate** - Remove threat
4. **Recover** — Restore systems
5. **Lessons** — Document and improve

### Communication

**To Clients:**
- Notify within 24 hours for data incidents
- Clear explanation of what happened
- Steps we're taking
- How it affects them

**Internal:**
- Post-mortem for all incidents
- Root cause analysis
- Preventive measures

---

## 7. Compliance

### GDPR Compliance (EU Clients)

| Right | How We Honor |
|------|--------------|
| **Right to Access** | Export all client data on request |
| **Right to Rectification** | Correct inaccurate data promptly |
| **Right to Erasure** | Delete within 48 hours of request |
| **Right to Portability** | Export in machine-readable format |
| **Right to Object** | Stop processing if requested |

### CCPA Compliance (California Clients)

| Right | How We Honor |
|------|--------------|
| **Right to Know** | Disclose data collection at onboarding |
| **Right to Delete** | Delete within 48 hours of request |
| **Right to Opt-Out** | No sale of data (ever) |
| **Right to Non-Discrimination** | No discrimination for exercising rights |

### SOC2 (When Applicable)

For clients requiring SOC2:
- Annual SOC2 Type II audit
- Access controls documentation
- Incident response procedures
- Monitoring and logging

---

## 8. Third-Party Services

### Vetting Process

Before using any third-party service:
1. Review security documentation
2. Check data handling practices
3. Verify compliance certifications
4. Assess data processing locations

### Approved Services

| Service | Data Location | Certifications |
|---------|--------------|----------------|
| **OpenAI** | US | SOC2, GDPR |
| **Claude** | US | GDPR |
| **Vercel** | US | SOC2, GDPR |
| **Qdrant** | EU | GDPR |

### Data Processing Addendums

Maintain DPAs with all third-party processors:
- Specify data processing purposes
- Limit data to what's necessary
- Require equal or greater protection
- Right to audit

---

## 9. Employee & Contractor Security

### Onboarding

All team members:
- Sign NDA before access
- Complete security training
- Acknowledge security policy
- Receive principle access only

### During Engagement

- Annual security awareness training
- Phishing simulations
- Access reviews quarterly
- Offboarding within 24 hours of engagement end

### Offboarding

When team member leaves:
- Revoke all access immediately
- Collect company devices
- Change shared passwords
- Audit data access logs

---

## 10. Security Monitoring

### What We Monitor

| Category | Metrics | Alerts |
|----------|---------|--------|
| **Access** | Failed logins, unusual access | Immediate |
| **API Usage** | Rate limits, unusual patterns | Daily |
| **System** | Uptime, response times | Real-time |
| **Data** | Access to client data | Weekly |

### Alert Thresholds

| Alert Type | Threshold | Action |
|------------|----------|--------|
| **Failed Login** | 5 attempts | Account lockout |
| **API Anomaly** | 2x normal usage | Investigate |
| **Data Access** | Unusual pattern | Review |

---

## 11. Client Data Responsibilities

### What We Ask of Clients

- **Secure Credentials:** Don't share passwords, use service accounts
- **Access Levels:** Grant minimum access needed
- **Data Minimization:** Only share what's necessary
- **Prompt Notification:** Tell us of security incidents

### What Clients Should Expect From Us

- **Transparency:** Clear data handling practices
- **Security:** Industry-standard protection
- **Compliance:** GDPR, CCPA adherence
- **Notification:** Prompt incident reporting

---

## 12. Security Checklist

### For Every Project

- [ ] NDA signed before access
- [ ] Service accounts created (not personal accounts)
- [ ] Access documented in secure notes
- [ ] MFR guardrails implemented
- [ ] Data retention schedule set
- [ ] Deletion date scheduled

### Monthly

- [ ] Access review (revoke unnecessary access)
- [ ] API key rotation (if due)
- [ ] Security metrics review
- [ ] Update documentation

---

## 13. Breach Notification Process

### If Breach Occurs

1. **Immediate** (0-1 hour)
   - Identify scope
   - Contain breach
   - Preserve evidence

2. **Assessment** (1-24 hours)
   - Determine what was accessed
   - Identify affected clients
   - Assess impact

3. **Notification** (24-72 hours)
   - Notify affected clients
   - Document breach details
   - Provide remediation steps

4. **Post-Mortem** (7-14 days)
   - Root cause analysis
   - Process improvements
   - Preventive measures

---

## 14. Contact for Security Issues

**Security Team:** security@syntolabs.xyz  
**Response Time:** 24 hours  
**For:** Vulnerability reports, security questions, incidents

---

**Document End**

*Security is everyone's responsibility. Vigilance is mandatory.*
