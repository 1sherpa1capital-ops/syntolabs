"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface InlineBookingButtonProps {
  flow?: 'discovery' | 'sales-call' | 'product-consult' | 'partner-up';
  namespace?: string;
  className?: string;
}

const DEFAULT_CONFIG = {
  theme: "dark",
  styles: { branding: { brandColor: "#22c55e" } },
  layout: "month_view",
};

export function InlineBookingButton({
  flow = 'discovery',
  namespace = 'e2ePrerenderLightTheme',
  className = '',
}: InlineBookingButtonProps) {
  const [config] = useState(DEFAULT_CONFIG);

  // Generate config JSON for data-cal-config
  const configJson = JSON.stringify({
    ...config,
    // Pre-fill email for discovery flow
    ...(flow === 'discovery' && { email: process.env.NEXT_PUBLIC_DEFAULT_EMAIL || 'hello@syntolabs.xyz' }),
  });

  // Get cal link for the flow
  const getCalLink = () => {
    const templates: Record<string, string> = {
      'discovery': 'rhigden/discovery',
      'sales-call': 'rhigden/sales-call',
      'product-consult': 'rhigden/product-consult',
      'partner-up': 'rhigden/partner-up',
    };
    return templates[flow];
  };

  return (
    <button
      data-cal-namespace={namespace}
      data-cal-config={configJson}
      data-cal-link={getCalLink()}
      className={`flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-zinc-200 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all duration-200 rounded-full cursor-pointer ${className}`}
    >
      Book (Inline {flow})
      <ArrowUpRight className="w-4 h-4" />
    </button>
  );
}

export function InlineBookingDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500 mb-4">Alternative: Inline embed (no modal)</p>
      <div className="flex flex-wrap gap-3">
        <InlineBookingButton flow="discovery" namespace="e2ePrerenderLightTheme" />
        <InlineBookingButton flow="sales-call" namespace="popupRescheduleWithReschedulePath" />
      </div>
    </div>
  );
}
