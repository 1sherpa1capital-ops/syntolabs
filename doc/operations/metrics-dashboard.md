# Synto Labs Operations Metrics Dashboard

**Version:** 1.0  
**Date:** February 9, 2026  
**Purpose:** Track what matters across Sales, Brand, Delivery, and Financial

---

## 1. Overview

**What gets measured gets managed.**

We track metrics across 4 categories to understand business health and make data-driven decisions. This document defines what we track, how we track it, and what targets we're aiming for.

---

## 2. Sales Metrics

### Pipeline Analytics (Sales Operations Framework)

```yaml
pipeline_health:
  volume_metrics:
    total_pipeline: "Sum of all open opportunities"
    new_pipeline: "Created this period"
    pipeline_growth: "(Current - Previous) / Previous"
    target_coverage: "3-4x of monthly quota"

  velocity_metrics:
    formula: "(# Opps × Win Rate × Avg Deal Size) / Sales Cycle"
    target_cycle: "14-21 days from prospect to close"

  conversion_metrics:
    lead_to_opp: "Target: 25%"
    opp_to_proposal: "Target: 50%"
    proposal_to_close: "Target: 20%"
    overall_conversion: "Target: 2.5% end-to-end"

  quality_metrics:
    average_deal_size: "Target: $5k+"
    discount_rate: "Target: <5%"
    sales_cycle: "Target: <21 days"
```

### Forecasting Categories

| Category | Confidence | Criteria | Weighting |
|----------|------------|----------|-----------|
| **Commit** | >90% | Verbal yes, Contract in legal, No blockers | 100% |
| **Best Case** | 60-90% | Proposal accepted, Negotiating terms, Timeline aligned | 70% |
| **Pipeline** | 30-60% | Active evaluation, Budget confirmed, Possible timeline | 40% |
| **Upside** | <30% | Early stage, Timeline uncertain, Budget not confirmed | 10% |

**Forecast Formula:**
```
Forecast = (Commit × 100%) + (Best Case × 70%) + (Pipeline × 40%) + (Upside × 10%)
```

**Target Accuracy:** 90-110% of forecast (acceptable), 95-105% (excellent)

### Leading Indicators (Weekly)

| Metric | Definition | Target | How to Track |
|--------|------------|--------|--------------|
| **Discovery Calls** | Completed qualification calls | 10/week | Cal.com bookings |
| **Proposals Sent** | Custom proposals delivered | 5/week | Proposal tracking in Notion |
| **Cold Emails Sent** | Personalized outbound emails | 50/week | Gmail sent folder |
| **New Prospects Identified** | Qualified leads added to pipeline | 20/week | CRM/Notion database |
| **Pipeline Coverage** | Total Pipeline / Remaining Quota | 3-4x | CRM calculation |

### Lagging Indicators (Monthly)

| Metric | Definition | Month 1 | Month 2 | Month 3 | Month 4 | How to Track |
|--------|------------|---------|---------|---------|---------|--------------|
| **Deals Closed** | Signed contracts | 1 | 3 | 4 | 7 | Contract log |
| **Revenue Generated** | Total revenue (one-time + MRR) | $5k | $12.5k | $12.5k | $22.5k | Stripe + contracts |
| **Forecast Accuracy** | Actual / Forecast | N/A | 85%+ | 90%+ | 95%+ | Forecast vs actual |
| **Win Rate** | Won / (Won + Lost) | 15% | 20% | 22% | 25% | CRM calculation |
| **Average Deal Size** | Total Revenue / Deals Closed | $5k | $4.2k | $3.1k | $3.2k | Revenue / deals |

### Pipeline Stages (Detailed)

| Stage | Probability | Target Count | Target Value | Age Alert | Exit Criteria |
|-------|-------------|--------------|--------------|----------|---------------|
| **Prospecting** | 0% | 50 | $0 | N/A | Meeting scheduled |
| **Discovery** | 10% | 15 | $75k potential | <14 days | Pain quantified, Budget confirmed |
| **Proposal** | 75% | 5 | $25k potential | <7 days | Proposal delivered |
| **Negotiating** | 90% | 3 | $15k potential | <3 days | Terms agreed |
| **Closed Won** | 100% | — | — | — | Deposit received |

### Weekly Scorecard

| Metric | Target | Actual | Variance | Status |
|--------|--------|--------|----------|--------|
| Prospects Added | 50 | ___ | ___ | ⚪/🔴/🟢 |
| Discovery Calls | 10 | ___ | ___ | ⚪/🔴/🟢 |
| Proposals Sent | 5 | ___ | ___ | ⚪/🔴/🟢 |
| Deals Closed | 2 | ___ | ___ | ⚪/🔴/🟢 |
| Pipeline Coverage | 3x | ___ | ___ | ⚪/🔴/🟢 |
| Forecast Accuracy | 90-110% | ___ | ___ | ⚪/🔴/🟢 |

🟢 = On Track | ⚪ = At Risk | 🔴 = Behind

---

## 3. Brand Metrics

### Audience Growth (Monthly)

| Platform | Month 1 | Month 2 | Month 3 | Month 4 | Target |
|----------|---------|---------|---------|---------|--------|
| **Twitter Followers** | 200 | 500 | 800 | 1,000+ | 1,000+ |
| **LinkedIn Connections** | 100 | 300 | 600 | 1,000+ | 1,000+ |
| **Email Subscribers** | 25 | 50 | 75 | 100 | 100 |

### Engagement Metrics (Weekly)

| Metric | Definition | Target | How to Track |
|--------|------------|--------|--------------|
| **Tweets Published** | Original content posted | 10+/week | Twitter Analytics |
| **LinkedIn Posts** | Original content posted | 2+/week | LinkedIn Analytics |
| **Content Engagement Rate** | (Likes + replies + shares) ÷ impressions | >3% Twitter, >5% LinkedIn | Platform analytics |
| **Profile Visits** | People viewing profile | 50+/week | Platform analytics |

### Content Performance

Track top-performing content monthly:

| Content Type | Views | Engagement | Leads Generated | ROI |
|--------------|-------|------------|-----------------|-----|
| [Case Study X] | | | | |
| [Thread Y] | | | | |
| [Post Z] | | | | |

---

## 4. Delivery Metrics

### Project Delivery (Per Project)

| Metric | Definition | Target | How to Track |
|--------|------------|--------|--------------|
| **48-Hour Delivery Hit Rate** | % delivered on time | 95%+ | Project timestamps |
| **Client Satisfaction (NPS)** | Net Promoter Score | >50 | Day 30 survey |
| **Bugs Reported (First 30 Days)** | Issues filed | <5 per project | Support tracking |
| **Client Retention Rate** | Clients continuing after 30 days | >80% | Client roster |

### Project Pipeline

| Status | Count | Next Action |
|--------|-------|-------------|
| **Kickoff Scheduled** | X | Complete kickoff |
| **In Build** | X | Daily updates |
| **In Support Period** | X | Check-ins per schedule |
| **Completed (30+ days)** | X | Retainer discussion |

### Time Tracking (Optional)

If tracking time:

| Project | Hours Budgeted | Hours Spent | Hours Remaining | % Complete |
|---------|----------------|--------------|-----------------|------------|
| [Project A] | 40 | 25 | 15 | 63% |

---

## 5. Financial Metrics

### Revenue Breakdown (Monthly)

| Category | Month 1 | Month 2 | Month 3 | Month 4 | Target |
|----------|---------|---------|---------|---------|--------|
| **One-Time Projects** | $5,000 | $10,000 | $5,000 | $10,000 | $10k+/mo |
| **Monthly Retainers** | $0 | $2,500 | $7,500 | $12,500 | $25k/mo by Month 6 |
| **Total Revenue** | $5,000 | $12,500 | $12,500 | $22,500 | $50k/mo by Month 7 |

### Unit Economics

| Metric | Target | Actual | Notes |
|--------|--------|--------|-------|
| **Average Project Value** | $5,000-$15,000 | | |
| **Average Retainer** | $2,500/mo | | |
| **Project Margin** | ~60% | | |
| **Retainer Margin** | ~75% | | |
| **CAC Target** | <$1,500 | | |
| **LTV (12 mo) Target** | $30,000+ | | |
| **LTV:CAC Target** | >20:1 | | |

### Expense Tracking (Monthly)

| Category | Budget | Actual | Variance |
|----------|--------|--------|----------|
| **Subcontractors** | $2,000-4,000 | | |
| **API/Infrastructure** | $300-700 | | |
| **Software Tools** | $200-300 | | |
| **Marketing** | $0-500 | | |
| **Payment Processing** | ~3% | | |
| **Legal/Admin** | $100-200 | | |
| **TOTAL** | $3,000-6,000 | | |

---

## 6. Dashboard Setup

### Recommended Tools

| Metric Category | Tool | Cost |
|----------------|------|------|
| **Sales** | Notion/Airtable | $0-20/mo |
| **Social Media** | Native analytics | $0 |
| **Projects** | Linear | $0 |
| **Finance** | Spreadsheet + Stripe | $0 |
| **Overall** | Custom dashboard (optional) | $0-50/mo |

### Notion Database Structure

**Sales Pipeline:**
```
| Company | Contact | Stage | Value | Last Contact | Next Action |
|----------|---------|-------|-------|--------------|-------------|
```

**Project Tracker:**
```
| Project | Client | Start Date | Status | 48h Hit? | NPS |
|---------|--------|------------|--------|----------|-----|
```

**Content Library:**
```
| Title | Type | Platform | Published | Views | Engagement | Leads |
|-------|------|----------|-----------|-------|------------|-------|
```

---

## 7. Reporting Cadence

### Weekly Review (Every Friday)

**What to review:**
- Sales metrics (calls, proposals, deals)
- Brand metrics (followers, engagement)
- Delivery status (active projects)
- Financial snapshot (revenue, expenses)

**Template:**
```
## Week of [Date]

### Sales
- Discovery calls: X/10 (Y%)
- Proposals: Y/5 (Z%)
- Deals closed: Z
- Revenue: $X

### Brand
- Twitter: X followers (+Y this week)
- LinkedIn: X connections (+Y this week)
- Content: X posts, Y% engagement

### Delivery
- Active projects: X
- On track: Y
- At risk: Z

### Financial
- Revenue: $X
- Expenses: $Y
- Net: $Z

### Key Wins
- [Win 1]
- [Win 2]

### Blockers
- [Blocker 1]
- [Blocker 2]

### Next Week Focus
- [Priority 1]
- [Priority 2]
```

### Monthly Review (Last Friday of Month)

**What to review:**
- Monthly targets vs actual
- Trends (improving, declining, stable)
- Key learnings
- Adjustments needed

**Template:**
```
## [Month] Review

### Targets vs Actual

| Metric | Target | Actual | % |
|--------|--------|--------|---|
| Discovery calls | 40 | X | Y% |
| Deals closed | 8 | X | Y% |
| Revenue | $X | $Y | Y% |
| Twitter followers | 1,000 | X | Y% |

### Trends
- Sales: [Improving/Stable/Declining]
- Brand: [Improving/Stable/Declining]
- Delivery: [Improving/Stable/Declining]

### Key Learnings
- [Learning 1]
- [Learning 2]

### Adjustments for Next Month
- [Change 1]
- [Change 2]
```

---

## 8. Alert Thresholds

### When to Take Action

| Metric | Yellow Flag | Red Flag | Action |
|--------|-------------|----------|--------|
| **Discovery calls/week** | <8 | <5 | Increase outreach |
| **Proposal-to-call rate** | <30% | <20% | Review proposal quality |
| **Call-to-deal rate** | <15% | <10% | Review discovery quality |
| **Content engagement** | <2% | <1% | Review content strategy |
| **48h delivery hit** | <90% | <80% | Review scoping/process |
| **Client NPS** | <40 | <20 | Immediate client reach-out |

---

## 9. Benchmark Targets

### 4-Month Path to $50k MRR

| Metric | Month 1 | Month 2 | Month 3 | Month 4 |
|--------|---------|---------|---------|---------|
| **Discovery Calls** | 10 | 20 | 30 | 40 |
| **Proposals** | 5 | 10 | 12 | 15 |
| **Deals Closed** | 1 | 3 | 4 | 7 |
| **Retainers** | 0 | 1 | 3 | 5 |
| **MRR** | $0 | $2,500 | $7,500 | $12,500 |
| **One-Time Revenue** | $5,000 | $10,000 | $5,000 | $10,000 |
| **Total Revenue** | $5,000 | $12,500 | $12,500 | $22,500 |
| **Twitter Followers** | 200 | 500 | 800 | 1,000 |
| **LinkedIn Connections** | 100 | 300 | 600 | 1,000 |

---

## 10. Tools & Integration

### Connecting Data Sources

| Source | How to Connect | Updates |
|--------|----------------|---------|
| **Cal.com** | Webhook or API export | Real-time |
| **Gmail** | Label tracking | Daily |
| **Stripe** | Dashboard export | Weekly |
| **Twitter** | Analytics export | Weekly |
| **LinkedIn** | Manual entry (no API) | Weekly |

### Automation Options

- **Zapier/Make:** Connect tools, auto-populate dashboards
- **Google Sheets:** Import from CSV exports
- **Custom scripts:** Python to pull from APIs

---

**Document End**

*Data drives decisions. Track what matters.*
