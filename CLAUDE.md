# Synto Labs - Vercel Multi-Project Repository

**Live URLs:**
- Landing Page: [syntolabs.xyz](https://syntolabs.xyz)
- Personal Portfolio: [rhigden.vercel.app](https://rhigden.vercel.app)

## Project Structure

This monorepo contains multiple Vercel projects:

| Project | Description | Location |
|---------|-------------|----------|
| **landingpage** | Synto Labs agency site | `landingpage/` |
| **mypage** | Personal portfolio | `mypage/` |

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion, GSAP |
| 3D Graphics | Three.js (landingpage only) |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Fonts | Geist |
| Package Manager | Bun |

## Architecture

### Landing Page (`landingpage/`)
```
src/
├── components/     # 35+ React components
│   ├── ThreeHero.tsx, ThreeBackground.tsx, ThreeCard.tsx  # 3D
│   ├── Scroll3DSection.tsx, Data3DVis.tsx, FloatingOrb.tsx
│   └── ...
├── pages/          # Home, Agents, AboutTeam, Privacy, Terms, NotFound
├── hooks/          # useLenis for smooth scrolling
├── lib/            # Utilities
└── context/        # TryNowModalContext
```

### Key Features (Landing Page)
- Multi-Agent Ecosystem page with 8 AI agents
- 3D visualizations (Three.js)
- ROI Calculator, Pricing, Case Studies
- Comparison tables, FAQ section

### Personal Page (`mypage/`)
```
src/
├── components/     # Navbar, Footer, ProjectCard
├── pages/          # Home, Projects, About, Blog, Contact
├── hooks/          # Custom React hooks
└── lib/            # Utilities
```

**Key Features:**
- Personal portfolio and technical showcase
- Project showcase cards
- Blog and contact functionality

## Vercel Deployment

- Root directory linked to `syntolabs` project (has syntolabs.xyz domain)
- Build from subdirectory via `vercel.json`: `cd landingpage && bun run build`
- Deploy: `vercel --prod` from root

## Commands

```bash
# Development (Landing Page)
cd landingpage && bun run dev

# Development (Personal Page)
cd mypage && bun run dev

# Build
cd landingpage && bun run build

# Preview production build locally
cd landingpage && bun run preview

# Deploy to syntolabs.xyz
vercel --prod

# Check deployment status
vercel ls
```

## Key Files

| File | Purpose |
|------|---------|
| `landingpage/src/main.tsx` | Landing page entry point |
| `landingpage/src/App.tsx` | Landing page root component with routing |
| `mypage/src/main.tsx` | Personal page entry point |
| `mypage/src/App.tsx` | Personal page root component with routing |
| `vercel.json` | Vercel build configuration (builds from landingpage/) |

## Current TODOs

See `q1_roadmap/` for roadmap documentation.

## Important Notes

- `syntolabs.xyz` domain is pre-assigned to the `syntolabs` Vercel project
- Git author `agent@antigravity.ai` lacks team access — use GitHub push to trigger deployments
- Three.js imports: use `'three'` not `'../../node_modules/@types/three'`
- **Cal.com Integration**: Flow-based booking system with API v2
  - **Booking Flows**: `discovery` (15 min), `sales-call` (30 min), `product-consult` (60 min), `partner-up` (45 min)
  - **Event Types**: Created via Cal.com API (discovery-call, sales-call, product-consult, partner-up)
  - **Webhook**: `/api/calcom/webhook` endpoint for booking event tracking with HMAC-SHA256 verification
  - **Booking UI**: Toast notifications for booking confirmations via `BookingProvider` and `BookingToasts`
- Copy audit grade: B (see `landingpage/COPY_AUDIT.md`)

## Code Style

- **TypeScript**: Strict mode enabled (`strict: true`)
- **React**: Functional components with hooks (React 19)
- **Styling**: Tailwind CSS v4 utility classes
- **Routing**: React Router v7 with routes defined in `App.tsx`
- **3D Components**: Lazy-loaded via `LazyThreeComponents.tsx` for performance
