# Synto Labs Landing Page

Synto Labs agency website built with Next.js 16 and Tailwind CSS v4.

## Features

- ⚡ Next.js 16 with App Router
- 🎨 Tailwind CSS v4
- 📅 Cal.com booking integration
- 📧 AgentMail contact forms
- 📱 Responsive design
- 🔍 SEO optimized
- 🌙 Dark theme

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Run linter
bun run lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
├── context/          # React context providers
└── types/            # TypeScript type definitions
```

## Key Integrations

### Cal.com
Booking system with 4 event types:
- Discovery Call (15 min)
- Sales Call (30 min)
- Product Consult (60 min)
- Partner Up (45 min)

### AgentMail
Contact form handling with webhook support.

## Deployment

```bash
# Deploy to production
vercel --prod
```

## Environment Variables

Required variables (set in Vercel dashboard):
- `NEXT_PUBLIC_CAL_LINK_DISCOVERY`
- `NEXT_PUBLIC_CAL_LINK_SALES_CALL`
- `NEXT_PUBLIC_CAL_LINK_PRODUCT_CONSULT`
- `NEXT_PUBLIC_CAL_LINK_PARTNER_UP`
- `CAL_API_KEY`

See `.env.example` for full list.

## Documentation

- [Cal.com Setup Guide](./docs/CALCOM_SETUP.md)
- [Code Style Guidelines](../AGENTS.md)
