/**
 * ============================================================================
 * Driventa — Global site configuration
 * ----------------------------------------------------------------------------
 * Single source of truth for brand, contact, and SEO defaults.
 *
 * ⚠️  PLACEHOLDERS: phone, email, social links and the production domain are
 *     placeholders (US "555" phone numbers are intentionally non-dialable).
 *     Replace the values marked `REPLACE:` before launch.
 * ============================================================================
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.driventa.com"; // REPLACE: production domain

export const site = {
  name: "Driventa",
  legalName: "Driventa Dispatch Services",
  tagline: "Your trucks keep moving. We handle the dispatch.",

  /** Used as the default meta description and og:description. */
  description:
    "Driventa is a US truck dispatch service for owner-operators and small fleets. We find loads, negotiate rates, handle broker communication and paperwork — so you stay focused on driving.",

  url: rawSiteUrl,

  // REPLACE: contact details ---------------------------------------------------
  phone: {
    display: "(555) 018-2340",
    href: "tel:+15550182340",
  },
  email: "dispatch@driventa.com",
  supportHours: "24/7 dispatch support",
  areaServed: "United States",

  /** REPLACE: social profiles (used in the footer + Organization schema). */
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/driventa", icon: "linkedin" },
    { label: "Facebook", href: "https://www.facebook.com/driventa", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/driventa", icon: "instagram" },
    { label: "X", href: "https://x.com/driventa", icon: "x-social" },
  ] as const,

  /** Primary + secondary conversion actions, reused across sections. */
  cta: {
    primary: { label: "Get Started", href: "#contact" },
    secondary: { label: "See How It Works", href: "#how-it-works" },
    call: { label: "Call Us", href: "tel:+15550182340" },
    apply: { label: "Start My Application", href: "#contact" },
  },
} as const;

export type Site = typeof site;
