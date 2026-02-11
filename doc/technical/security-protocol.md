# Synto Labs Security Protocol

**Version:** 2.0
**Date:** February 10, 2026
**Purpose:** Defines the technical controls, policies, and procedures to ensure the confidentiality, integrity, and availability of Synto Labs' data and systems.

---

## 1. Security Philosophy & Standards

Synto Labs adopts a **Defense-in-Depth** strategy. We do not rely on a single control but layer security measures to protect against diverse threats. We align our practices with **SOC2 Type II** criteria and **GDPR** regulations.

**Core Tenets:**
*   **Zero Trust:** Never trust, always verify. Every request must be authenticated and authorized.
*   **Privacy by Design:** Data minimization and encryption are architected into the system, not added as an afterthought.
*   **Automated Compliance:** Security controls are defined as code (IaC) and enforced automatically.

---

## 2. Data Security & Lifecycle

### 2.1 Data Classification
All data is tagged upon ingestion to determine handling requirements.

| Level | Label | Examples | Handling Controls |
| :--- | :--- | :--- | :--- |
| **L1** | Public | Marketing copy, Published blog posts | Public CDN, No Auth |
| **L2** | Internal | Slack logs, Non-sensitive metrics | SSO, Internal Network |
| **L3** | Confidential | Customer PII, Leads, Email drafts | Encryption (Rest/Transit), RBAC, Audit Logs |
| **L4** | Restricted | API Keys, Payment Methods, Passwords | Field-level Encryption, MFA for Access, Ephemeral Access |

### 2.2 Encryption Standards
*   **Data in Transit:** Enforced **TLS 1.3** for all internal and external communications. HSTS (HTTP Strict Transport Security) enabled.
*   **Data at Rest:**
    *   **Databases:** Volume-level encryption (AES-256) via cloud provider (AWS KMS / Google Cloud KMS).
    *   **Backups:** Encrypted using separate, rotated keys.
    *   **Sensitive Fields (L4):** Application-level envelope encryption. Data is encrypted before writing to the database using a Key Management Service (KMS).

### 2.3 Key Management
*   Master keys are managed via AWS KMS or HashiCorp Vault.
*   Automatic key rotation every 90 days.
*   Separation of duties: Developers do not have access to production master keys.

### 2.4 Data Retention & Deletion
*   **Policy:** Customer data is retained for the duration of the contract + 30 days grace period.
*   **Deletion:** Hard deletion involves cryptographic erasure (deleting the key) followed by data overwriting.
*   **Backups:** Point-in-time recovery backups are retained for 30 days and then securely purged.

---

## 3. Access Control & Identity

### 3.1 Authentication (AuthN)
*   **Centralized Identity Provider:** All access uses a single IdP (e.g., Auth0, Clerk, or Okta).
*   **MFA:** Multi-Factor Authentication (TOTP or WebAuthn) is **mandatory** for all administrative and production access.
*   **Service Accounts:** Machine-to-machine communication uses short-lived tokens (OAuth2 Client Credentials flow) with automatic rotation.

### 3.2 Authorization (AuthZ)
*   **Role-Based Access Control (RBAC):** Permissions are assigned to roles (e.g., `Admin`, `Editor`, `Viewer`), not individuals.
*   **Row-Level Security (RLS):** Implemented at the database layer (PostgreSQL policies). A tenant/user can *only* query rows where `tenant_id` matches their authenticated token claim.
    *   *Example:* `CREATE POLICY "User Select" ON leads USING (auth.uid() = user_id);`
*   **Principle of Least Privilege:** Users are granted the minimum permissions necessary to perform their job.

---

## 4. Application Security

### 4.1 Secure Development Lifecycle (SDLC)
*   **Code Review:** All code changes require approval from at least one peer. Security-sensitive changes require Security Team review.
*   **SAST (Static Application Security Testing):** Automated scanning (e.g., SonarQube, GitHub Advanced Security) runs on every Pull Request to detect vulnerabilities (OWASP Top 10).
*   **SCA (Software Composition Analysis):** Automated dependency scanning (e.g., Dependabot, Snyk) prevents usage of libraries with known CVEs.
*   **Secret Detection:** Pre-commit hooks and CI scanners prevent committing secrets to repositories.

### 4.2 API Security
*   **Input Validation:** Strict schema validation (Zod/Pydantic) on all API inputs. Reject unexpected fields.
*   **Rate Limiting:** Protects against DoS and brute-force attacks. Configured per IP and per User.
*   **CORS:** Strict Cross-Origin Resource Sharing policies allowing only whitelisted domains.
*   **Output Encoding:** Auto-escaping context-sensitive data to prevent XSS (Cross-Site Scripting).

---

## 5. Infrastructure & Network Security

### 5.1 Cloud Security
*   **Isolation:** Production, Staging, and Development environments are strictly isolated (separate VPCs/projects).
*   **Immutable Infrastructure:** Servers are not patched in place; they are replaced with new, patched images.
*   **Firewalls:** Security Groups/NACLs deny all traffic by default, allowing only whitelisted ports/protocols.

### 5.2 Logging & Auditing
*   **Audit Trails:** All privileged actions (login, data access, config changes) are logged immutably.
*   **Log Storage:** Logs are shipped to a centralized SIEM (Security Information and Event Management) system.
*   **PII Masking:** Automated scrubbing of PII (Personally Identifiable Information) from logs before storage.

---

## 6. Incident Response Plan (IRP)

### 6.1 Phases
1.  **Preparation:** Training, tool setup, runbook creation.
2.  **Detection & Analysis:** Alert triggered via SIEM/Monitoring. Security team triages severity.
3.  **Containment:** Isolate affected systems (e.g., revoke tokens, take offline) to prevent spread.
4.  **Eradication:** Remove the root cause (patch vulnerability, delete malicious artifact).
5.  **Recovery:** Restore systems from clean backups. Verify integrity.
6.  **Post-Incident Activity:** "Blameless Post-Mortem" to identify root cause and improve processes.

### 6.2 SLA Targets
*   **Critical Severity:** Response < 1 hour. Resolution target < 4 hours.
*   **High Severity:** Response < 4 hours. Resolution target < 24 hours.

---

## 7. Compliance & Third-Party Risk

### 7.1 Vendor Management
*   All sub-processors (e.g., OpenAI, Vercel) are vetted for SOC2/ISO27001 compliance.
*   Data Processing Addendums (DPAs) signed with all vendors handling L3/L4 data.

### 7.2 Regular Assessments
*   **Penetration Testing:** Annual third-party penetration test of critical applications.
*   **Vulnerability Scanning:** Weekly automated scans of external and internal assets.

---

## 8. Contacts

*   **Security Officer:** CISO (security@syntolabs.xyz)
*   **Privacy Officer:** DPO (privacy@syntolabs.xyz)
*   **Emergency Hotline:** [Internal Phone Number]

---

**Policy Enforcement:** Violation of this policy may result in disciplinary action, up to and including termination of employment and legal action.
