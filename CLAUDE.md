# Synto Labs - Vercel Multi-Project Repository

## Project Structure

This repo contains multiple Vercel projects:
- `landingpage/` - Synto Labs landing page → deployed to **syntolabs.xyz**
- `mypage/` - Personal portfolio → separate Vercel project

## Vercel Deployment

- Root directory linked to `syntolabs` project (has syntolabs.xyz domain)
- Build from subdirectory via `vercel.json`: `cd landingpage && bun run build`
- Deploy: `vercel --prod` from root

## Important

- `syntolabs.xyz` domain is pre-assigned to the `syntolabs` Vercel project
- Git author `agent@antigravity.ai` lacks team access — use GitHub push to trigger deployments
- Three.js imports: use `'three'` not `'../../node_modules/@types/three'`

## Commands

```bash
# Deploy landing page to syntolabs.xyz
vercel --prod

# Check deployment status
vercel ls
```
