import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synto Labs | Custom AI Automation in 48 Hours",
  description: "Stop paying people to do robot work. We build custom AI agents in 48 hours. Pay once, save forever.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function (C, A, L) {
                let p = function (a, ar) {
                  a.q.push(ar);
                };
                let d = C.document;
                C.Cal = C.Cal || function () {
                  let cal = C.Cal;
                  let ar = arguments;
                  if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = [];
                    cal.ready = function (fn) {
                      p('ready', fn);
                    };
                    let s = d.createElement('script');
                    s.src = A;
                    s.async = true;
                    s.type = 'text/javascript';
                    (d.head || d.body).appendChild(s);
                    cal.loaded = true;
                  }
                  if (ar[0] === L) {
                    const api = function () {
                      p(api, ar);
                    };
                    const namespace = 'cal';
                    api.q = api.q || [];
                    if (typeof window['Cal'] === 'function') {
                      window['Cal'] = window['Cal'];
                    } else {
                      window['Cal'] = api;
                    }
                  }
                };
              })(window, 'https://cal.com/embed/embed.js', 'init');
              Cal('init');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
