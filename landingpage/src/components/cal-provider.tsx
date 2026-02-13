import { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef } from "react";

interface CalProviderProps {
  children: React.ReactNode;
  clientId?: string;
  accessToken?: string;
  options?: {
    apiUrl?: string;
    refreshUrl?: string;
  };
}

type BookingFlow = 'discovery' | 'sales-call' | 'product-consult' | 'partner-up';
type CalApi = Awaited<ReturnType<typeof getCalApi>>;

// Module-level cache for Cal API promise
let calApiPromise: Promise<CalApi> | null = null;

function getCachedCalApi(): Promise<CalApi> {
  if (!calApiPromise) {
    calApiPromise = getCalApi({ embedJsUrl: "https://cal.com/embed/embed.js" }).catch((err) => {
      // Reset cache on error so next call can retry
      calApiPromise = null;
      throw err;
    });
  }
  return calApiPromise;
}

export function getCalLink(flow: BookingFlow = 'discovery'): string {
  const template = "NEXT_PUBLIC_CAL_LINK_" + flow.toUpperCase().replace(/-/g, '_');
  const envTemplate = process.env[template];
  if (envTemplate) return envTemplate;

  const templates: Record<string, string> = {
    'NEXT_PUBLIC_CAL_LINK_DISCOVERY': 'rhigden-sonam-sherpa/discovery-call',
    'NEXT_PUBLIC_CAL_LINK_SALES_CALL': 'rhigden-sonam-sherpa/sales-call',
    'NEXT_PUBLIC_CAL_LINK_PRODUCT_CONSULT': 'rhigden-sonam-sherpa/product-consult',
    'NEXT_PUBLIC_CAL_LINK_PARTNER_UP': 'rhigden-sonam-sherpa/partner-up',
  };

  return templates[template];
}

export function openCalModal(calLink?: string, flow?: BookingFlow): Promise<void> {
  console.log("[Cal.com] Opening modal for", calLink || flow);
  const link = calLink || process.env.NEXT_PUBLIC_CAL_LINK || getCalLink(flow);

  return getCachedCalApi().then((cal) => {
    console.log("[Cal.com] API loaded, opening modal for:", link);
    cal("modal", {
      calLink: link,
    });
  }).catch((err) => {
    console.error("[Cal.com] Modal error:", err);
    // Fallback: open in new tab
    console.log("[Cal.com] Falling back to direct URL:", `https://cal.com/${link}`);
    window.open(`https://cal.com/${link}`, '_blank');
  });
}

export function CalProvider({
  children,
  clientId,
  accessToken,
  options,
}: CalProviderProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    (async function () {
      console.log("[Cal.com] Loading embed API...");
      try {
        const cal = await getCachedCalApi();
        console.log("[Cal.com] API loaded successfully");
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#22c55e" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("[Cal.com] Failed to initialize CalProvider:", err);
      }
    })();
  }, []);

  return <>{children}</>;
}
