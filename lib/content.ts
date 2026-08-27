import type {
  Benefit,
  Equipment,
  FaqItem,
  FooterColumn,
  NavItem,
  PricingFeature,
  SelectField,
  Service,
  Stat,
  Step,
  Testimonial,
  TrustItem,
} from "./types";

/**
 * ============================================================================
 * Driventa — Site content (the "Model")
 * ----------------------------------------------------------------------------
 * Every section reads from this file. Copy is original and written for a US
 * truck-dispatch audience (owner-operators & small carriers). Statistics,
 * pricing and testimonials are clearly-marked placeholders — see notes inline.
 * ============================================================================
 */

/* ---------------------------------------------------------------------------
 * Navigation (with mega-menus for Services & Equipment)
 * ------------------------------------------------------------------------- */
export const nav: NavItem[] = [
  {
    label: "Services",
    href: "#services",
    menu: {
      heading: "Dispatch Services",
      tagline: "A full back office for your truck — without the overhead.",
      items: [
        { label: "Load Finding", description: "Curated freight matched to your lanes and rate goals.", href: "#services", icon: "search" },
        { label: "Rate Negotiation", description: "We push every load for the rate it's actually worth.", href: "#services", icon: "handshake" },
        { label: "Broker Communication", description: "We handle the calls, emails and check-ins for you.", href: "#services", icon: "headset" },
        { label: "Paperwork & Docs", description: "Rate cons, BOLs and setup packets handled end to end.", href: "#services", icon: "document" },
      ],
    },
  },
  {
    label: "Equipment",
    href: "#equipment",
    menu: {
      heading: "Equipment We Dispatch",
      tagline: "Dedicated dispatch for every trailer type on the road.",
      items: [
        { label: "Dry Van", description: "Consistent freight and steady lanes.", href: "#equipment", icon: "truck" },
        { label: "Reefer", description: "Temperature-controlled loads, managed closely.", href: "#equipment", icon: "snowflake" },
        { label: "Flatbed & Step Deck", description: "Open-deck freight with the right permits.", href: "#equipment", icon: "flatbed" },
        { label: "Hotshot & Power Only", description: "Fast-moving freight for lighter setups.", href: "#equipment", icon: "power" },
      ],
    },
  },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#faq" },
  { label: "FAQ", href: "#faq" },
];

/* ---------------------------------------------------------------------------
 * Hero
 * ------------------------------------------------------------------------- */
export const hero = {
  eyebrow: "Truck Dispatch Services",
  title: "Keep Your Trucks Moving. We'll Handle the Dispatch.",
  subtitle:
    "Driventa is your dedicated dispatch partner — load sourcing, rate negotiation, broker communication, dispatch coordination and admin support, all handled by a dispatcher who knows your business.",
  highlights: [
    "Dedicated dispatcher",
    "Better-paying loads",
    "Less paperwork",
  ],
};

/* ---------------------------------------------------------------------------
 * Trust strip
 * ------------------------------------------------------------------------- */
export const trustItems: TrustItem[] = [
  { icon: "headset", label: "Dedicated Dispatch Support" },
  { icon: "handshake", label: "Rate Negotiation" },
  { icon: "search", label: "Load Finding" },
  { icon: "phone", label: "Broker Communication" },
  { icon: "clock", label: "24/7 Operational Support" },
];

/* ---------------------------------------------------------------------------
 * Services (8)
 * ------------------------------------------------------------------------- */
export const services: Service[] = [
  {
    id: "load-finding",
    icon: "search",
    title: "Load Finding",
    description: "We source freight that fits your equipment, lanes and rate targets — not just whatever is posted first.",
    featured: true,
  },
  {
    id: "rate-negotiation",
    icon: "handshake",
    title: "Rate Negotiation",
    description: "Experienced negotiators work every load to protect your rate-per-mile and your bottom line.",
  },
  {
    id: "broker-communication",
    icon: "headset",
    title: "Broker Communication",
    description: "We manage broker calls, emails and check calls so you're not on the phone between stops.",
  },
  {
    id: "load-booking",
    icon: "clipboard-check",
    title: "Load Booking",
    description: "Once a load is confirmed, we lock it in and send you clean, complete trip details.",
  },
  {
    id: "route-planning",
    icon: "route",
    title: "Route Planning",
    description: "Smart lane and route planning to reduce empty miles and keep your week profitable.",
  },
  {
    id: "paperwork",
    icon: "document",
    title: "Paperwork & Documentation",
    description: "Rate confirmations, carrier packets and broker setups handled accurately, start to finish.",
  },
  {
    id: "detention-layover",
    icon: "clock",
    title: "Detention & Layover Support",
    description: "We document delays and pursue detention, layover and TONU pay you've earned.",
  },
  {
    id: "trip-management",
    icon: "activity",
    title: "Trip Management",
    description: "Active oversight of each trip so problems are handled before they cost you time.",
  },
];

/* ---------------------------------------------------------------------------
 * Equipment (7)
 * ------------------------------------------------------------------------- */
export const equipment: Equipment[] = [
  { id: "dry-van", name: "Dry Van", description: "Steady, high-volume freight with dependable lanes and consistent weekly miles.", illustration: "dry-van" },
  { id: "reefer", name: "Reefer", description: "Temperature-controlled loads managed with close attention to appointments and specs.", illustration: "reefer" },
  { id: "flatbed", name: "Flatbed", description: "Open-deck freight matched to your securement capability and preferred regions.", illustration: "flatbed" },
  { id: "step-deck", name: "Step Deck", description: "Taller and specialized loads booked with the right permits and requirements.", illustration: "step-deck" },
  { id: "box-truck", name: "Box Truck", description: "Local and regional freight that keeps smaller operations running full.", illustration: "box-truck" },
  { id: "hotshot", name: "Hotshot", description: "Expedited, time-sensitive loads sized for your setup and turned fast.", illustration: "hotshot" },
  { id: "power-only", name: "Power Only", description: "Drop-and-hook power-only freight to maximize your tractor's uptime.", illustration: "power-only" },
];

/* ---------------------------------------------------------------------------
 * Why choose us (8 benefits)
 * ------------------------------------------------------------------------- */
export const benefits: Benefit[] = [
  { icon: "headset", title: "A Dedicated Dispatcher", description: "One point of contact who learns your truck, your lanes and how you like to run." },
  { icon: "target", title: "Better Load Opportunities", description: "Access to freight matched to your goals — not the leftovers nobody else booked." },
  { icon: "handshake", title: "Professional Rate Negotiation", description: "We negotiate like it's our own truck, because your rate is how we both win." },
  { icon: "layers", title: "Less Administrative Work", description: "Setups, rate cons and paperwork move off your plate and onto ours." },
  { icon: "bolt", title: "Faster Broker Communication", description: "Quicker responses and cleaner coordination keep your wheels turning." },
  { icon: "eye", title: "A Transparent Process", description: "You always see the rate, the lane and the plan before anything is booked." },
  { icon: "lifebuoy", title: "Operational Support", description: "When something goes sideways on the road, you have a team in your corner." },
  { icon: "phone", title: "Reliable Communication", description: "Consistent updates and real answers — no chasing, no guesswork." },
];

/* ---------------------------------------------------------------------------
 * How it works (5 steps)
 * ------------------------------------------------------------------------- */
export const steps: Step[] = [
  { number: "01", title: "Tell Us About Your Truck", description: "Share your equipment, home base, preferred lanes and rate goals. Onboarding is quick and paperwork-light.", icon: "truck" },
  { number: "02", title: "We Find the Right Loads", description: "Your dispatcher sources freight that matches your setup and the way you want to run.", icon: "search" },
  { number: "03", title: "We Negotiate the Rate", description: "We push every load for a rate that respects your miles, your time and your equipment.", icon: "handshake" },
  { number: "04", title: "We Book & Coordinate", description: "We confirm the load, handle the broker and send you clean, complete trip details.", icon: "calendar-check" },
  { number: "05", title: "You Drive. We Handle the Rest.", description: "You focus on the road while we manage communication, paperwork and the next load.", icon: "steering-wheel" },
];

/* ---------------------------------------------------------------------------
 * Stats
 * ⚠️  PLACEHOLDER METRICS — these are illustrative labels, not verified company
 *     figures. Replace with real, audited numbers before launch.
 * ------------------------------------------------------------------------- */
export const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Loads Managed" },
  { value: 100, suffix: "+", label: "Carrier Partners" },
  { value: 48, label: "States Covered" },
  { value: 24, suffix: "/7", label: "Dispatch Support" },
];
export const statsNote = "Figures shown are placeholders for demonstration and should be replaced with verified company metrics.";

/* ---------------------------------------------------------------------------
 * Operations dashboard (conceptual demo — not a real financial dashboard)
 * ------------------------------------------------------------------------- */
export const operations = {
  eyebrow: "Live Operations",
  title: "A Clear View of Every Load in Motion",
  description:
    "From pickup to delivery, your dispatcher tracks the details that matter — origin, destination, miles, rate and status — so nothing slips and you always know what's next.",
  load: {
    status: "Booked",
    reference: "Load #DV-4821",
    origin: { city: "Dallas, TX", label: "Pickup", time: "Tomorrow · 08:00 AM" },
    destination: { city: "Atlanta, GA", label: "Delivery", time: "Friday · 04:00 PM" },
    metrics: [
      { label: "Miles", value: "781" },
      { label: "Rate", value: "$2,950" },
      { label: "RPM", value: "$3.77" },
      { label: "Equipment", value: "Dry Van" },
    ],
  },
  note: "Illustrative dispatch overview for demonstration only — not a financial or accounting record.",
};

/* ---------------------------------------------------------------------------
 * Testimonials
 * ⚠️  PLACEHOLDER TESTIMONIALS — clearly-labeled samples with no stock photos.
 *     Replace with verified customer reviews (initials shown instead of images).
 * ------------------------------------------------------------------------- */
export const testimonials: Testimonial[] = [
  {
    quote: "Placeholder review — replace with a verified customer quote. Space is reserved here for a real carrier's words about working with your dispatch team.",
    name: "Carrier Name",
    role: "Owner-Operator",
    equipment: "Dry Van",
    rating: 5,
    initials: "CN",
  },
  {
    quote: "Placeholder review — replace with a verified customer quote describing the difference a dedicated dispatcher made to their weekly revenue and time.",
    name: "Carrier Name",
    role: "Small Fleet Owner",
    equipment: "Reefer",
    rating: 5,
    initials: "CN",
  },
  {
    quote: "Placeholder review — replace with a verified customer quote about rate negotiation, communication or the loads booked on their behalf.",
    name: "Carrier Name",
    role: "Owner-Operator",
    equipment: "Flatbed",
    rating: 5,
    initials: "CN",
  },
];
export const testimonialsNote = "Testimonials above are placeholders. Replace with verified customer reviews before publishing.";

/* ---------------------------------------------------------------------------
 * Pricing
 * ⚠️  PLACEHOLDER PRICING — do not present as a real quoted rate.
 * ------------------------------------------------------------------------- */
export const pricing = {
  planName: "Dispatch Service",
  priceLabel: "Custom",
  priceCaption: "Pricing tailored to your equipment and lanes",
  priceNote: "Pricing shown is a placeholder. Replace with your published rate or quote structure.",
  features: [
    { text: "Dedicated dispatcher for your truck" },
    { text: "Unlimited load sourcing" },
    { text: "Professional rate negotiation" },
    { text: "Broker communication & check calls" },
    { text: "Rate confirmations & carrier setups" },
    { text: "Detention, layover & TONU support" },
    { text: "Route & lane planning" },
    { text: "Transparent, no long-term lock-in" },
  ] as PricingFeature[],
};

/* ---------------------------------------------------------------------------
 * About
 * ------------------------------------------------------------------------- */
export const about = {
  eyebrow: "About Driventa",
  title: "Built Around Your Business.",
  paragraphs: [
    "Driventa exists to give owner-operators and small carriers the kind of professional dispatch support that used to belong only to large fleets. We handle the calls, the negotiations and the paperwork so you can do what you do best — drive.",
    "We take a carrier-first approach. That means clear communication, honest rates and decisions made in your interest, load after load. We'd rather build a long-term relationship than book a quick, forgettable one.",
    "Efficiency is the goal on every trip: fewer empty miles, less idle time and a back office that runs quietly in the background while your wheels keep turning.",
  ],
  pillars: [
    { title: "Carrier-First", description: "Your goals set the direction — every load is booked with your business in mind." },
    { title: "Clear Communication", description: "Straight answers, steady updates and a dispatcher who actually picks up." },
    { title: "Long-Term Relationships", description: "We measure success in the miles we run together, not one-off loads." },
  ],
};

/* ---------------------------------------------------------------------------
 * FAQ (8) — also powers FAQPage structured data
 * ------------------------------------------------------------------------- */
export const faqs: FaqItem[] = [
  {
    question: "What does a truck dispatcher actually do?",
    answer:
      "A dispatcher acts as your back office on the road. Driventa finds and books loads that fit your equipment and lanes, negotiates rates with brokers, handles the paperwork and setups, and keeps communication moving — so you can stay focused on driving and delivering.",
  },
  {
    question: "What types of trucks and trailers do you dispatch?",
    answer:
      "We dispatch for dry van, reefer, flatbed, step deck, box truck, hotshot and power-only setups. Whatever you run, you're matched with a dispatcher familiar with the freight and requirements for your equipment.",
  },
  {
    question: "How does the process work to get started?",
    answer:
      "It starts with a short onboarding: tell us about your truck, your home base, preferred lanes and rate goals. From there your dispatcher begins sourcing loads, negotiating rates and coordinating with brokers on your behalf.",
  },
  {
    question: "Do you negotiate rates for me?",
    answer:
      "Yes. Rate negotiation is central to what we do. We treat your rate-per-mile like it's our own truck's, working every load to protect your revenue rather than accepting the first number a broker offers.",
  },
  {
    question: "How do you handle broker communication?",
    answer:
      "We manage broker calls, emails, check calls and updates for you. That keeps you off the phone between stops and ensures brokers get quick, professional responses that keep your loads moving.",
  },
  {
    question: "Who handles the paperwork?",
    answer:
      "We do. Rate confirmations, carrier packets and broker setups are handled accurately from start to finish. We keep your documentation organized so nothing slows down a booking or a payment.",
  },
  {
    question: "How much does dispatch service cost?",
    answer:
      "Pricing is tailored to your equipment and lanes. Reach out through the application form and we'll walk you through how our dispatch service is structured and what to expect — with no long-term lock-in.",
  },
  {
    question: "How do I get started with Driventa?",
    answer:
      "Fill out the application form with a few details about your operation and preferred lanes. A dispatcher will follow up to complete a quick onboarding and start finding loads that keep your truck moving.",
  },
];

/* ---------------------------------------------------------------------------
 * "On the Road" band — scroll-driven truck moment (decorative visual)
 * ------------------------------------------------------------------------- */
export const onTheRoad = {
  eyebrow: "Coast to Coast",
  title: "Your Freight Keeps Moving — Day and Night.",
  subtitle:
    "From the first pickup to the final mile, we keep your truck loaded, negotiated and rolling — so the wheels never stop earning.",
};

/* ---------------------------------------------------------------------------
 * Final CTA
 * ------------------------------------------------------------------------- */
export const finalCta = {
  title: "Ready to Keep Your Truck Moving?",
  description:
    "Partner with a dispatch team that finds better loads, negotiates harder and handles the back office — so every mile counts.",
};

/* ---------------------------------------------------------------------------
 * Contact / application form
 * ------------------------------------------------------------------------- */
export const contact = {
  eyebrow: "Get Started",
  title: "Start Your Dispatch Application",
  description:
    "Tell us about your operation and preferred lanes. A dispatcher will follow up to complete a quick onboarding.",
  privacyNote:
    "Your information is kept private and used only to contact you about dispatch services.",
  equipmentOptions: [
    "Dry Van",
    "Reefer",
    "Flatbed",
    "Step Deck",
    "Box Truck",
    "Hotshot",
    "Power Only",
    "Other",
  ],
  fleetOptions: ["1 truck", "2–3 trucks", "4–9 trucks", "10+ trucks"],
};

export const contactSelects: SelectField[] = [
  { label: "Equipment Type", name: "equipment", options: contact.equipmentOptions, required: true },
  { label: "Number of Trucks", name: "trucks", options: contact.fleetOptions, required: true },
];

/* ---------------------------------------------------------------------------
 * Footer
 * ------------------------------------------------------------------------- */
export const footerColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Why Driventa", href: "#why" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Load Finding", href: "#services" },
      { label: "Rate Negotiation", href: "#services" },
      { label: "Broker Communication", href: "#services" },
      { label: "Paperwork & Docs", href: "#services" },
    ],
  },
  {
    heading: "Equipment",
    links: [
      { label: "Dry Van", href: "#equipment" },
      { label: "Reefer", href: "#equipment" },
      { label: "Flatbed & Step Deck", href: "#equipment" },
      { label: "Hotshot & Power Only", href: "#equipment" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "Get Started", href: "#contact" },
    ],
  },
];
