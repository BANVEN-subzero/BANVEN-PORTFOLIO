import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { profile } from "@/config/profile";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-space",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = `${profile.fullName} — Software Engineer & AI Innovator`;
const SITE_DESCRIPTION =
  "Portfolio of Nyuydze Banven Eric Junior — a Cameroonian software engineer exploring full-stack development, artificial intelligence, data analytics and technology entrepreneurship. Building ideas into technology that matters.";

export const metadata: Metadata = {
  metadataBase: new URL("https://banven-subzero.github.io"),
  title: {
    default: SITE_TITLE,
    template: `%s — ${profile.displayName}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Nyuydze Banven Eric Junior",
    "Eric Banven",
    "Software Engineer Cameroon",
    "Full-Stack Developer",
    "AI Developer Africa",
    "University of Buea",
    "CULTIA",
    "Data Analytics Cameroon",
    "BANVEN-subzero",
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: `${profile.displayName} — Portfolio`,
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/profile.jpg", width: 900, height: 1125, alt: "Portrait of Eric Banven" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.displayName,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Yaoundé",
    addressCountry: "CM",
  },
  sameAs: [profile.github.url],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Buea",
  },
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Data Analytics",
    "Full-Stack Web Development",
    "Machine Learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-midnight text-mist`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
