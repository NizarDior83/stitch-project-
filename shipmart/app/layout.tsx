import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shipmart.example.com"),
  title: {
    default: "Shipmart — every border, handled",
    template: "%s | Shipmart",
  },
  description:
    "Cross-border parcel shipping for eCommerce merchants. Print one label; we clear customs, prepay the duties and deliver to the door.",
  openGraph: {
    type: "website",
    siteName: "Shipmart",
    title: "Shipmart — every border, handled",
    description:
      "Cross-border parcel shipping for eCommerce merchants. Landed cost before you commit.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#f9f9ff" />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:bg-primary focus:text-on-primary focus:px-4 focus:py-3 focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
