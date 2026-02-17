import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import localFont from 'next/font/local';
import { Analytics } from "@vercel/analytics/next"

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
    default: "Newral - Cutting-Edge Tech Solutions for Scalable Growth",
    template: "%s | Newral"
  },
  description: "Newral specializes in full-stack development, AI, cybersecurity & DevOps. We build scalable, secure, and high-impact digital solutions.",
  openGraph: {
    title: "Newral - Cutting-Edge Tech Solutions for Scalable Growth",
    description: "Newral specializes in full-stack development, AI, cybersecurity & DevOps. We build scalable, secure, and high-impact digital solutions.",
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
  },
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

      </head>
      <body
        className={`${satoshi.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
