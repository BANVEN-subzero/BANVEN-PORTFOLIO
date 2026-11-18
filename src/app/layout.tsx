import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { profile } from "@/config/profile";

/*
 * Typography — Helvetica-family system stack (Atelier style).
 * Deliberately NO webfont/Google-font fetch: builds must succeed on any
 * host (Vercel, Docker, CI) with zero network dependency, and the design
 * calls for the AU Grotesk / Helvetica class of grotesques.
 */

const SITE_TITLE = `${profile.fullName} — Software Engineer & AI Innovator`;
const SITE_DESCRIPTION =
  "Portfolio of Nyuydze Banven Eric Junior — a Cameroonian software engineer exploring full-stack development, artificial intelligence, data analytics and technology entrepreneurship. Building ideas into technology that matters.";

/* Canonical site URL — tolerant of an unset OR empty-string env var. */
const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim() || "https://banven-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  themeColor: "#0d0905",
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
      <body className="antialiased bg-midnight text-mist">
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
