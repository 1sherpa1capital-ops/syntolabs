# Synto Labs - Agent Guidelines

## Build & Development Commands

### Landing Page (Next.js)
```bash
cd landingpage
bun run dev          # Start development server
bun run build        # Production build
bun run start        # Start production server
bun run lint         # Run ESLint
bun run format       # Format with Prettier
bun run format:check # Check formatting
```

### Personal Page (Vite)
```bash
cd mypage
bun run dev          # Start development server
bun run build        # Production build
bun run preview      # Preview production build
bun run lint         # Run ESLint
bun run format       # Format with Prettier
bun run format:check # Check formatting
```

### Deployment
```bash
cd landingpage
vercel --prod        # Deploy to syntolabs project (syntolabs.xyz)
vercel ls            # Check deployment status
```

**Important:** The landingpage directory is linked to the `syntolabs` Vercel project (syntolabs.xyz domain). Always deploy from the landingpage directory.

### Resend Email Integration

#### Environment Variables
Add these to your local `.env.local`:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxx  # Get from https://resend.com/dashboard/api-keys
RESEND_WEBHOOK_SECRET=whsec_xxx # Get from https://resend.com/dashboard/webhooks
```

#### Sending Emails
```typescript
import { sendEmail } from "@/lib/email";

const result = await sendEmail({
  to: "recipient@example.com",
  subject: "Hello",
  text: "Plain text body",
  html: "<h1>HTML body</h1>",
});
```

#### Webhook Endpoint
- **Route:** `/api/webhooks/resend`
- **Events handled:** `email.received`
- **File:** `landingpage/src/app/api/webhooks/resend/route.ts`

#### Domain Configuration
- **Domain:** syntolabs.xyz
- **Status:** Verified (sending & receiving enabled)
- **DNS records:** Configured via Resend dashboard

**Note:** No test suite is currently configured. To add tests, consider Vitest or Jest.

## Code Style Guidelines

### TypeScript & Types
- Strict mode enabled (`strict: true`)
- Target: ES2020
- Use explicit types for function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use `type` for unions, intersections, and mapped types
- Avoid `any`; use `unknown` with type guards when necessary

### Imports & Organization
```typescript
// 1. React/Next imports first
import { useState, useEffect } from "react";

// 2. Third-party library imports
import { ArrowUpRight } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

// 3. Absolute imports (using @/* path alias)
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 4. Relative imports (only when necessary)
import { siblingComponent } from "./sibling";
```

### Naming Conventions
- **Components**: PascalCase (`BookingButton.tsx`)
- **Functions**: camelCase (`openCalModal`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Types/Interfaces**: PascalCase (`BookingFlow`, `UserProfile`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: Tailwind utilities

### React Patterns
- Use functional components with hooks
- Use `"use client"` directive for client components
- Use `useCallback` for functions passed to child components
- Use `useMemo` for expensive computations
- Prefix custom hooks with `use` (`useCalApi`)

### Error Handling
```typescript
// Always handle promise rejections
try {
  const cal = await getCalApi();
} catch (err) {
  console.error("[Cal.com] Error:", err);
  // Provide fallback behavior
  window.open(fallbackUrl, '_blank');
}

// Use console labels for debugging
console.log("[ComponentName] Loading...");
console.error("[ComponentName] Failed:", error);
```

### Prettier Configuration
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Tailwind CSS v4
- Use utility classes directly on elements
- Extract repeated patterns to component classes in `globals.css`
- Use CSS variables for theme values in `:root`
- Prefer `flex` and `grid` layouts

### Component Structure
```typescript
"use client";

import { useState } from "react";

interface Props {
  // Define props interface
}

export function ComponentName({ prop }: Props) {
  // State declarations
  const [state, setState] = useState(false);
  
  // Callbacks/handlers
  const handleClick = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### Environment Variables
- Use `NEXT_PUBLIC_` prefix for client-side variables (landingpage)
- Use `VITE_` prefix for client-side variables (mypage)
- Replace hyphens with underscores: `NEXT_PUBLIC_CAL_LINK_SALES_CALL`
- Never commit secrets to the repository
- API keys should be added to Vercel project settings, not committed

### Performance
- Lazy load 3D components and heavy features
- Use module-level caching for expensive operations
- Memoize API clients and promises
- Optimize images with Next.js Image component

## Project Structure

```
landingpage/          # Next.js 16 App Router
├── src/
│   ├── app/          # App Router pages & API routes
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   ├── context/      # React context providers
│   └── types/        # TypeScript definitions
├── public/           # Static assets
└── docs/             # Documentation

mypage/               # Vite + React
├── src/
│   ├── pages/        # Page components
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   └── hooks/        # Custom hooks
└── public/           # Static assets
```

## Key Dependencies
- **Framework**: React 19.2.3, Next.js 16.1.6 (landingpage), Vite 6 (mypage)
- **Styling**: Tailwind CSS v4, clsx, tailwind-merge
- **UI**: Headless UI, Lucide React, Heroicons
- **Cal.com**: @calcom/embed-react
- **Validation**: Zod
- **Package Manager**: Bun

## Agent Skills

Use available skills when working on specialized tasks. Skills activate automatically based on context.

**Skill Locations (Global):**
- `~/.claude/skills/` - Primary Claude skills (170+ skills, 34 categories)
- `~/.config/opencode/skills/` - OpenCode skills (symlinked to Claude skills)
- `~/.opencode/` - Global symlink for opencode

**Available Skills:**

| Skill | Triggers | Purpose |
|-------|----------|---------|
| **find-skills** | "find skill", "search skill" | Discover and install new skills |
| **vercel-react-best-practices** | "react", "next.js", "performance" | React/Next.js optimization |
| **web-design-guidelines** | "design", "ui", "ux", "accessibility" | Design patterns & a11y |
| **vercel-composition-patterns** | "composition", "component" | React composition |
| **agent-browser** | "browser", "scrape", "test page" | Browser automation |
| **vercel-react-native-skills** | "react native", "mobile" | Mobile development |

**Usage:** Skills work globally from any directory. When working on tasks, let relevant skills activate and follow their guidance. To find more skills: `npx skills find [query]`

## Monorepo Notes
- Each project has its own `package.json` and dependencies
- No shared workspace configuration (projects are independent)
- Both projects use Bun as package manager
- ESLint and Prettier configurations are project-specific
