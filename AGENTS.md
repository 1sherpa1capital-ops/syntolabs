# Synto Labs - Agent Guidelines

## Build & Development Commands

```bash
# Development (Landing Page)
cd landingpage && bun run dev

# Development (Personal Page)
cd mypage && bun run dev

# Production Build
cd landingpage && bun run build

# Linting
cd landingpage && bun run lint

# Deploy to Production
vercel --prod

# Check Deployment Status
vercel ls
```

## Code Style Guidelines

### TypeScript & Types
- Strict mode enabled (`strict: true` in tsconfig.json)
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
- **CSS Classes**: Tailwind utilities with consistent ordering

### React Patterns
- Use functional components with hooks
- Use `"use client"` directive for client components
- Use `useCallback` for functions passed to child components
- Use `useMemo` for expensive computations
- Use `useRef` with callback refs when dynamic initialization needed
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

### Tailwind CSS v4
- Use utility classes directly on elements
- Extract repeated patterns to component classes in `globals.css`
- Use CSS variables for theme values in `:root`
- Prefer `flex` and `grid` layouts
- Use `transition-all duration-200` for hover states

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
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Replace hyphens with underscores in env var names: `NEXT_PUBLIC_CAL_LINK_SALES_CALL`
- Provide fallback values for optional configuration
- Never commit secrets to the repository

### Performance
- Lazy load 3D components and heavy features
- Use module-level caching for expensive operations
- Memoize API clients and promises
- Optimize images with Next.js Image component

## Project Structure

```
landingpage/
├── src/
│   ├── components/     # Reusable React components
│   ├── app/           # Next.js App Router pages
│   ├── lib/           # Utility functions
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React context providers
│   └── types/         # TypeScript type definitions
├── docs/              # Documentation
├── scripts/           # Build/util scripts
└── public/            # Static assets
```

## Key Dependencies
- **Framework**: Next.js 16.1.6, React 19.2.3
- **Styling**: Tailwind CSS v4, clsx, tailwind-merge
- **UI**: Headless UI, Lucide React
- **3D**: Three.js (lazy-loaded)
- **Cal.com**: @calcom/embed-react, @calcom/embed-core
- **Package Manager**: Bun
