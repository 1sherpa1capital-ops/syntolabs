// Cal.com embed types
declare global {
  interface Window {
    Cal?: {
      (action: string, config?: Record<string, unknown>): void;
    };
  }
}

export {};
