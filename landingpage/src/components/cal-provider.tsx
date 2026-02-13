import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { MouseEvent } from "react";

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

export function getCalLink(flow: BookingFlow = 'discovery'): string {
  const template = "NEXT_PUBLIC_CAL_LINK_" + flow.toUpperCase();
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

export function openCalModal(calLink?: string, flow?: BookingFlow): void {
  const link = calLink || process.env.NEXT_PUBLIC_CAL_LINK || getCalLink(flow);
  getCalApi({ embedJsUrl: "https://cal.com/embed/embed.js" }).then((cal) => {
    cal("modal", {
      calLink: link,
    });
  }).catch((err) => {
    console.error("Cal.com modal error:", err);
  });
}

export function CalProvider({
  children,
  clientId,
  accessToken,
  options,
}: CalProviderProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ embedJsUrl: "https://cal.com/embed/embed.js" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#22c55e" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return <>{children}</>;
}
