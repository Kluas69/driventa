import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import "./globals.css";

/* Fonts — exposed as CSS variables consumed by the @theme tokens in globals.css.
   All three are variable fonts, so no explicit weights are needed. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Driventa | Truck Dispatch Services for Owner-Operators & Fleets",
    template: "%s | Driventa",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "truck dispatch services",
    "truck dispatcher",
    "dispatch service for owner operators",
    "freight dispatching",
    "load finding",
    "rate negotiation",
    "reefer dispatch",
    "flatbed dispatch",
    "dry van dispatch",
    "hotshot dispatch",
    "power only dispatch",
    "trucking back office",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "Driventa | Truck Dispatch Services",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Driventa | Truck Dispatch Services",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "logistics",
  formatDetection: {
    telephone: true,
    address: false,
    email: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060c19" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        {/* Progressive enhancement: opts into scroll-reveal animations only when
            JS is available. Without this class, all content is visible by default
            (SEO- and no-JS-safe). Runs during HTML parse to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
