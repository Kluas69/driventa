import { siteJsonLd } from "@/lib/jsonld";
import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Services } from "@/components/sections/services";
import { Equipment } from "@/components/sections/equipment";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Operations } from "@/components/sections/operations";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { About } from "@/components/sections/about";
import { Faq } from "@/components/sections/faq";
import { OnTheRoad } from "@/components/sections/on-the-road";
import { FinalCta } from "@/components/sections/final-cta";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      {/* Structured data — Organization, WebSite, Service & FAQPage in one graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
      />

      <Hero />
      <TrustStrip />
      <Services />
      <Equipment />
      <WhyChooseUs />
      <HowItWorks />
      <Operations />
      <Stats />
      <Testimonials />
      <Pricing />
      <About />
      <Faq />
      {/* Scroll-driven truck drive-in — a dedicated "On the Road" band */}
      <OnTheRoad />
      <FinalCta />
      <Contact />
    </>
  );
}
