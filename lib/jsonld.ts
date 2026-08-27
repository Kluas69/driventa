import { site } from "./site";
import { faqs, services } from "./content";

/**
 * ============================================================================
 * Structured data (JSON-LD) builders for rich results & stronger SEO.
 * ----------------------------------------------------------------------------
 * Organization + WebSite establish the brand; Service describes the offering;
 * FAQPage is eligible for expandable FAQ rich results in Google search.
 * Rendered as <script type="application/ld+json"> in the layout / page.
 * ============================================================================
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    email: site.email,
    telephone: site.phone.href.replace("tel:", ""),
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone.href.replace("tel:", ""),
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English"],
    },
    sameAs: site.socials.map((s) => s.href),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "en-US",
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/#service`,
    serviceType: "Truck Dispatch Services",
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    description: site.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dispatch Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** Combined @graph — a single script tag with all entities linked by @id. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      serviceSchema(),
      faqSchema(),
    ],
  };
}
