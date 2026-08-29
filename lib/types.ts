/**
 * ============================================================================
 * Driventa — Domain types (the "Model" contracts for the MVVM structure)
 * ----------------------------------------------------------------------------
 * All site content is authored as typed data in `lib/content.ts` and rendered
 * by presentational components. These types are the shared vocabulary.
 * ============================================================================
 */

/** Names of the inline SVG icons available via <Icon name="…" />. */
export type IconName =
  | "search"
  | "handshake"
  | "headset"
  | "clipboard-check"
  | "route"
  | "document"
  | "clock"
  | "activity"
  | "truck"
  | "steering-wheel"
  | "calendar-check"
  | "shield-check"
  | "target"
  | "layers"
  | "bolt"
  | "eye"
  | "lifebuoy"
  | "phone"
  | "mail"
  | "map-pin"
  | "menu"
  | "close"
  | "chevron-down"
  | "arrow-right"
  | "arrow-up-right"
  | "star"
  | "quote"
  | "check"
  | "spinner"
  | "dollar"
  | "snowflake"
  | "box"
  | "deck"
  | "flatbed"
  | "power"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "x-social"
  | "sun"
  | "moon";

export interface NavLink {
  label: string;
  href: string;
}

/** A column within a mega-menu panel. */
export interface MegaMenuItem {
  label: string;
  description: string;
  href: string;
  icon: IconName;
}

export interface NavItem {
  label: string;
  href: string;
  /** When present, renders as a mega-menu trigger. */
  menu?: {
    heading: string;
    tagline: string;
    items: MegaMenuItem[];
  };
}

export interface TrustItem {
  icon: IconName;
  label: string;
}

export interface Service {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  /** Highlight one service as the "featured" card. */
  featured?: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  description: string;
  /** Key that maps to a custom SVG truck illustration. */
  illustration:
    | "dry-van"
    | "reefer"
    | "flatbed"
    | "step-deck"
    | "box-truck"
    | "hotshot"
    | "power-only";
}

export interface Benefit {
  icon: IconName;
  title: string;
  description: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Stat {
  /** Numeric portion used for the count-up animation. */
  value: number;
  /** Suffix appended after the number, e.g. "+", "/7". */
  suffix?: string;
  /** Optional prefix, e.g. "$". */
  prefix?: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  equipment: string;
  rating: number;
  /** Initials shown in place of a stock profile photo. */
  initials: string;
}

export interface PricingFeature {
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface SelectField {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}
