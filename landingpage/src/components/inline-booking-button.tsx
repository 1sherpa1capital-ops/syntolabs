"use client";

import { ArrowUpRight, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { getCalApi } from "@calcom/embed-react";

interface InlineBookingButtonProps {
  flow?: 'discovery' | 'sales-call' | 'product-consult' | 'partner-up';
  namespace?: string;
  className?: string;
}

const DEFAULT_CONFIG = {
  theme: "dark" as const,
  styles: { branding: { brandColor: "#22c55e" } },
  layout: "month_view" as const,
};

// Module-level cache
let calApiPromise: ReturnType<typeof getCalApi> | null = null;

function getCachedCalApi() {
  if (!calApiPromise) {
    calApiPromise = getCalApi({ embedJsUrl: "https://cal.com/embed/embed.js" }).catch((err) => {
      calApiPromise = null;
      throw err;
    });
  }
  return calApiPromise;
}

export function InlineBookingButton({
  flow = 'discovery',
  namespace = 'syntolabs',
  className = '',
}: InlineBookingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const buttonRef = useCallback((node: HTMLButtonElement | null) => {
    if (node !== null && !isInitialized) {
      initializeButton(node);
    }
  }, [isInitialized, flow, namespace]);

  const initializeButton = async (buttonElement: HTMLButtonElement) => {
    setIsLoading(true);
    try {
      const cal = await getCachedCalApi();
      const calLink = getCalLink();
      
      // Initialize inline embed on this button
      cal("inline", {
        elementOrSelector: buttonElement,
        calLink: calLink,
        config: {
          ...DEFAULT_CONFIG,
          name: namespace,
        },
      });
      
      setIsInitialized(true);
    } catch (err) {
      console.error("[Cal.com] Inline embed error:", err);
      // Fallback: redirect to Cal.com
      window.open(`https://cal.com/${getCalLink()}`, '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  const getCalLink = () => {
    const envKey = `NEXT_PUBLIC_CAL_LINK_${flow.toUpperCase().replace(/-/g, '_')}`;
    const envLink = process.env[envKey];
    if (envLink) return envLink;
    
    const templates: Record<string, string> = {
      'discovery': 'rhigden-sonam-sherpa/discovery-call',
      'sales-call': 'rhigden-sonam-sherpa/sales-call',
      'product-consult': 'rhigden-sonam-sherpa/product-consult',
      'partner-up': 'rhigden-sonam-sherpa/partner-up',
    };
    return templates[flow];
  };

  return (
    <button
      ref={buttonRef}
      disabled={isLoading}
      className={`flex items-center gap-2 bg-white text-black px-6 py-3 text-sm font-medium hover:bg-zinc-200 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all duration-200 rounded-full cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          Book (Inline {flow})
          <ArrowUpRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

export function InlineBookingDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500 mb-4">Alternative: Inline embed (no modal)</p>
      <div className="flex flex-wrap gap-3">
        <InlineBookingButton flow="discovery" />
        <InlineBookingButton flow="sales-call" />
      </div>
    </div>
  );
}
