# Landing Page Specification - Synto Labs (Ultra-Minimalist)

## Philosophy: "Anti-AI Slop"
Avoid generic "futuristic" gradients, floating glass orbs, and over-designed 3D assets. The design should feel like a high-end engineering tool: precise, clean, and brutally efficient.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Typography:** Geist Sans (Headings), Geist Mono (Technical metadata)
- **Icons:** Lucide React (Clean, thin stroke)

## Design Identity: "Signal & Noise"
### Color Palette
- **Canvas:** `#000000` (Pure Black)
- **Signal:** `#00FF41` (Matrix Green - Used ONLY for status, critical CTAs, and tiny accents)
- **Guide:** `#18181B` (Zinc-900 - Subtle borders and dividers)
- **Ink:** `#FFFFFF` (Headers), `#A1A1AA` (Body/Mono labels)

### UI Patterns (Inspiration: Airweave)
- **Thin Borders:** Use `border-zinc-900` for structure. No shadows.
- **Monospace Labels:** Use `Geist Mono` for version numbers, tags, and data.
- **Negative Space:** Aggressive use of whitespace to let the type breathe.
- **Dots/Grids:** A very faint 16px dot grid for the background.

## Core Structure
1. **Nav:** Pure text. No background until scroll. 
2. **Hero:** Large, sharp headline. Tiny green status dot: "System: Online".
3. **Features:** A simple list or table. No cards with heavy shadows.
4. **Docs:** Inline code blocks with syntax highlighting.
5. **Footer:** Simple copyright and links in mono font.
