import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

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

export function CalProvider({
  children,
  clientId,
  accessToken,
  options,
}: CalProviderProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
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

export function openCalModal(calLink?: string, flow?: BookingFlow) {
  const link = calLink || process.env.NEXT_PUBLIC_CAL_LINK || getCalLink(flow);
  getCalApi().then((cal) => {
    cal("modal", {
      calLink: link,
    });
  });
}

export function getCalLink(flow: BookingFlow = 'discovery'): string {
  const template = "CAL_LINK_" + flow.toUpperCase();
  const envTemplate = process.env[template];
  if (envTemplate) return envTemplate;

  const linkMap: Record<string, string> = {
    'CAL_LINK_DISCOVERY': 'rhigden-sonam-sherpa-624tui/discovery-call',
    'CAL_LINK_SALES_CALL': 'rhigden-sonam-sherpa-624tui/sales-call',
    'CAL_LINK_PRODUCT_CONSULT': 'rhigden-sonam-sherpa-624tui/product-consult',
    'CAL_LINK_PARTNER_UP': 'rhigden-sonam-sherpa-624tui/partner-up',
  };

  return linkMap[template];
}

export { getCalLink };
