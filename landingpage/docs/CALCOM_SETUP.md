# Cal.com Integration Setup

Complete guide for the Cal.com booking system integration on syntolabs.xyz.

## Overview

The landing page uses Cal.com for scheduling calls with 4 different event types:
- **Discovery Call** (15 min) - Initial consultation
- **Sales Call** (30 min) - Sales discussion
- **Product Consult** (60 min) - Product consultation
- **Partner Up** (45 min) - Partnership discussion

## Architecture

### Components

| File | Purpose |
|------|---------|
| `src/components/cal-provider.tsx` | Core Cal.com API provider with modal & cache |
| `src/components/inline-booking-button.tsx` | Inline embed booking buttons |
| `src/components/floating-cta.tsx` | Floating CTA with modal trigger |
| `src/app/layout.tsx` | Root layout (no inline Cal script) |

### Key Features

1. **Modal Popup**: Click button → Cal.com modal opens
2. **Inline Embed**: Button renders calendar inline
3. **Fallback**: Opens direct cal.com URL if embed fails
4. **Caching**: Module-level cache prevents double script loading

## Environment Variables

Set these in Vercel dashboard:

```bash
NEXT_PUBLIC_CAL_LINK_DISCOVERY=rhigden-sonam-sherpa/discovery-call
NEXT_PUBLIC_CAL_LINK_SALES_CALL=rhigden-sonam-sherpa/sales-call
NEXT_PUBLIC_CAL_LINK_PRODUCT_CONSULT=rhigden-sonam-sherpa/product-consult
NEXT_PUBLIC_CAL_LINK_PARTNER_UP=rhigden-sonam-sherpa/partner-up
```

## Usage

### Modal Buttons

```typescript
import { openCalModal, getCalLink } from "@/components/cal-provider";

// Open specific flow
<button onClick={() => openCalModal(getCalLink('discovery'))}>
  Book Discovery Call
</button>

// Open with custom link
<button onClick={() => openCalModal('rhigden-sonam-sherpa/custom-event')}>
  Book Custom
</button>
```

### Inline Embed Buttons

```typescript
import { InlineBookingButton } from "@/components/inline-booking-button";

<InlineBookingButton flow="discovery" />
<InlineBookingButton flow="sales-call" />
```

## Implementation Details

### Script Loading Strategy

**Problem**: Double script loading causes race conditions.

**Solution**: 
- Remove inline script from `layout.tsx`
- Use module-level cache in `cal-provider.tsx`

```typescript
// Module-level cache
let calApiPromise: Promise<CalApi> | null = null;

function getCachedCalApi(): Promise<CalApi> {
  if (!calApiPromise) {
    calApiPromise = getCalApi({ embedJsUrl: "https://cal.com/embed/embed.js" })
      .catch((err) => {
        calApiPromise = null;
        throw err;
      });
  }
  return calApiPromise;
}
```

### Environment Variable Key Fix

**Problem**: `sales-call` → `SALES-CALL` but env var uses `SALES_CALL`.

**Solution**: Replace hyphens with underscores:

```typescript
const template = "NEXT_PUBLIC_CAL_LINK_" + flow.toUpperCase().replace(/-/g, '_');
```

### Error Handling & Fallback

```typescript
export function openCalModal(calLink?: string, flow?: BookingFlow): Promise<void> {
  const link = calLink || getCalLink(flow);
  
  return getCachedCalApi().then((cal) => {
    cal("modal", { calLink: link });
  }).catch((err) => {
    console.error("[Cal.com] Modal error:", err);
    // Fallback to direct URL
    window.open(`https://cal.com/${link}`, '_blank');
  });
}
```

## Troubleshooting

### Buttons Not Responding

1. Check browser console for "[Cal.com]" logs
2. Verify environment variables are set in Vercel
3. Check that inline script was removed from layout.tsx
4. Verify cal.com username is correct: `rhigden-sonam-sherpa`

### Inline Buttons Not Rendering

1. Check that `cal("inline")` is called after button mounts
2. Verify the button ref is attached correctly
3. Check for TypeScript errors in config object

### Script Loading Errors

1. Check network tab for embed.js loading
2. Verify no ad blockers are blocking cal.com
3. Check that cache is reset on error:
   ```typescript
   .catch((err) => {
     calApiPromise = null; // Reset cache
     throw err;
   })
   ```

## Testing

Run the integration test:

```bash
node landingpage/scripts/test-cal-integration.js
```

Manual verification:
1. Visit https://syntolabs.xyz
2. Click "Book a free audit" button
3. Verify Cal.com modal opens
4. Scroll to "Two ways to book" section
5. Click inline booking buttons
6. Verify inline embed loads

## Cal.com Account Details

- **Username**: `rhigden-sonam-sherpa`
- **Event Types**: discovery-call, sales-call, product-consult, partner-up
- **Embed URL**: https://cal.com/embed/embed.js

## Related Files

- `src/components/cal-provider.tsx` - Core provider
- `src/components/inline-booking-button.tsx` - Inline buttons
- `src/components/floating-cta.tsx` - Floating CTA
- `scripts/test-cal-integration.js` - Test script
