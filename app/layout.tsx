import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { SITE } from "@/data/site";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Imai — Software inteligente para un mundo en expansión",
    template: "%s · Imai",
  },
  description: SITE.description,
  keywords: [
    "Imai",
    "desarrollo de software",
    "inteligencia artificial",
    "software a medida",
    "cloud",
    "DevOps",
    "Chile",
    "Santiago",
  ],
  authors: [{ name: "Imai" }],
  creator: "Imai",
  publisher: "Imai",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: "Imai — Software inteligente para un mundo en expansión",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Imai — Software inteligente para un mundo en expansión",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f8f6f0",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santiago",
    addressCountry: "CL",
  },
  sameAs: ["https://www.linkedin.com", "https://www.github.com"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={SITE.lang}
      className={cn(inter.variable, newsreader.variable, "font-sans")}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
