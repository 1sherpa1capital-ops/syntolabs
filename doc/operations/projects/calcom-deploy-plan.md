# Task Plan: Fix Cal.com + Deploy to Vercel

## Goal
Fix Cal.com booking buttons to work properly and deploy to syntolabs.xyz

## Current Phase
Phase 3

## Phases

### Phase 1: Research & Fix Cal.com
- [x] Research Cal.com embed issues in Next.js 16
- [x] Identify issues: script loading, initialization
- **Status:** complete

### Phase 2: Fix Cal.com Integration
- [ ] Update layout.tsx to use next/script
- [ ] Fix CalProvider initialization
- [ ] Test in development
- **Status:** in_progress

### Phase 3: Deploy to Vercel
- [ ] Build the project
- [ ] Deploy to Vercel
- [ ] Verify syntolabs.xyz works
- **Status:** pending

## Key Findings
- Cal.com embed.js has known issues with Next.js 15/16
- Need to use next/script with proper strategy
- The @calcom/embed-react package should handle this better
- Current approach: script in head + CalProvider initialization

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Use next/script | Proper Next.js script loading |
| Keep existing CAL_LINK | Already configured for discovery call |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| None yet | - | - |
