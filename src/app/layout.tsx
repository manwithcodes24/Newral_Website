import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import localFont from 'next/font/local';
import { Analytics } from "@vercel/analytics/next"
import UIWrapper from "@/components/ui-wrapper";

const satoshi = localFont({
  src: [
    { path: '../../public/fonts/satoshi/Satoshi-Light.woff2', weight: '300' },
    { path: '../../public/fonts/satoshi/Satoshi-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/satoshi/Satoshi-Medium.woff2', weight: '500' },
    { path: '../../public/fonts/satoshi/Satoshi-Bold.woff2', weight: '700' },
    { path: '../../public/fonts/satoshi/Satoshi-Black.woff2', weight: '900' },
    { path: '../../public/fonts/satoshi/Satoshi-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../../public/fonts/satoshi/Satoshi-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://newral.in"),

  title: {
    default: "Newral — Product Engineering & AI Systems for Scalable Growth",
    template: "%s | Newral"
  },

  description:
    "Newral builds scalable SaaS products, high-performance systems, and AI-powered platforms. We help startups design, develop, and scale real-world digital products.",

  keywords: [
    "Newral",
    "product engineering",
    "SaaS development",
    "startup development agency",
    "AI development company",
    "Next.js development",
    "full-stack development",
    "DevOps",
    "cloud architecture",
    "software development India"
  ],

  authors: [{ name: "Newral", url: "https://newral.in" }],
  creator: "Newral",
  publisher: "Newral",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Newral — Product Engineering & AI Systems",
    description:
      "We design, build, and scale high-performance digital products for startups and growing companies.",
    url: "https://newral.in",
    siteName: "Newral",
    images: [
      {
        url: "https://res.cloudinary.com/dyktjldc4/image/upload/v1771327086/Screenshot_20260217-164603_vqpgcu.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Newral — Product Engineering & AI Systems",
    description:
      "Build, scale, and optimize real-world digital products with Newral.",
    images: [
      "https://res.cloudinary.com/dyktjldc4/image/upload/v1771327086/Screenshot_20260217-164603_vqpgcu.png"
    ]
  },

  alternates: {
    canonical: "https://newral.in",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="shortcut icon" href="https://res.cloudinary.com/dyktjldc4/image/upload/v1771327086/Screenshot_20260217-164603_vqpgcu.png" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="alternate" type="text/plain" href="/llm.txt" />
      </head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Newral",
            url: "https://newral.in",
            logo: "https://res.cloudinary.com/dyktjldc4/image/upload/v1771327086/Screenshot_20260217-164603_vqpgcu.png",
            sameAs: [],
            description:
              "Newral is a product engineering and AI systems company building scalable digital platforms for startups.",
            founder: {
              "@type": "Person",
              name: "Yash Rajan Shukla"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Newral",
            url: "https://newral.in",
            address: {
              "@type": "PostalAddress",
              addressCountry: "India"
            },
            areaServed: ["India", "Delhi", "United States"],
            sameAs: []
          })
        }}
      />
      <body
        className={`${satoshi.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UIWrapper>
            {children}
          </UIWrapper>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
