import type { SVGProps } from "react";
import type { IconName } from "@/lib/types";

/**
 * ============================================================================
 * Icon set — original inline SVGs, 24×24, 1.5px stroke, `currentColor`.
 * One consistent visual language across the whole site (no icon-font / emoji).
 * ============================================================================
 */

type PathProps = { children: React.ReactNode };

const Base = ({ children, ...props }: PathProps & SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const paths: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  handshake: (
    <>
      <path d="M11 17 8.5 14.5a1.8 1.8 0 0 1 2.5-2.6l1.6 1.4" />
      <path d="m12.5 13.3 2.4 2.4a1.8 1.8 0 0 0 2.6-2.5l-3.9-3.9-2.2.6a3 3 0 0 1-2.4-.4L7.5 8" />
      <path d="m3 8 3-1.5 4 1 5-1 3 1.5" />
      <path d="M18 8v5.5M6 6.5V13" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2Z" />
      <path d="M20 13a2 2 0 0 0-2 2v2a2 2 0 0 0 4 0v-2a2 2 0 0 0-2-2Z" />
      <path d="M20 17v1a3 3 0 0 1-3 3h-3" />
    </>
  ),
  "clipboard-check": (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="m9.5 12.5 1.8 1.8 3.4-3.6" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H14a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h.5" transform="translate(0 2)" />
    </>
  ),
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  activity: (
    <>
      <path d="M3 12h4l2.5 6 5-13L17 12h4" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5H18l3 3v3h-7.5" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
      <path d="M8.3 17.5h6.9" />
    </>
  ),
  "steering-wheel": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4.5v5M6.5 17l3-2.7M17.5 17l-3-2.7" />
    </>
  ),
  "calendar-check": (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v3M16 3v3" />
      <path d="m9 15 2 2 4-4" />
    </>
  ),
  "shield-check": (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8 4.5-8 4.5-8-4.5Z" />
      <path d="m4 12 8 4.5L20 12" />
      <path d="m4 16.5 8 4.5 8-4.5" />
    </>
  ),
  bolt: <path d="M13 2 5 13h5l-1 9 8-11h-5Z" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m5 5 4 4M15 15l4 4M19 5l-4 4M9 15l-4 4" />
    </>
  ),
  phone: (
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "arrow-right": <path d="M4 12h15m-6-6 6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17l-5.3 2.6 1-5.8L3.5 9.7l5.9-.9Z" />,
  quote: (
    <path d="M9 6c-3 1-4.5 3.3-4.5 6.5V18h6v-6H7c0-2 .7-3.3 2.5-4Zm10 0c-3 1-4.5 3.3-4.5 6.5V18h6v-6H17c0-2 .7-3.3 2.5-4Z" />
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  spinner: (
    <>
      <path d="M12 3.5v3.5" opacity="1" />
      <path d="M12 17v3.5" opacity="0.35" />
      <path d="M4.9 4.9 7.3 7.3" opacity="0.5" />
      <path d="m16.7 16.7 2.4 2.4" opacity="0.85" />
      <path d="M3.5 12H7" opacity="0.6" />
      <path d="M17 12h3.5" opacity="1" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 3.5v17" />
      <path d="M16 7.5c-1-1.3-2.5-2-4-2-2.2 0-3.8 1.2-3.8 3s1.6 2.6 3.8 3 3.8 1.2 3.8 3-1.6 3-3.8 3c-1.6 0-3.1-.7-4-2" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 3v18M4.2 7.5 19.8 16.5M19.8 7.5 4.2 16.5" />
      <path d="M12 3l-1.8 1.8M12 3l1.8 1.8M12 21l-1.8-1.8M12 21l1.8-1.8" />
    </>
  ),
  box: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  deck: (
    <>
      <path d="M2.5 14h19M2.5 14l3-4h13l3 4M6 14v3M18 14v3" />
      <circle cx="8" cy="18.5" r="1.4" />
      <circle cx="16" cy="18.5" r="1.4" />
    </>
  ),
  flatbed: (
    <>
      <path d="M2.5 15h19" />
      <path d="M2.5 15v-2h13v2M15.5 13h3l3 2" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17.5" cy="17.5" r="1.6" />
    </>
  ),
  power: (
    <>
      <path d="M12 3v8" />
      <path d="M7.5 6a7 7 0 1 0 9 0" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 11v6" />
    </>
  ),
  facebook: (
    <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.5a.5.5 0 0 1 .5-.5Z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.7" fill="currentColor" />
    </>
  ),
  "x-social": <path d="M4 4l16 16M20 4 4 20" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
};

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <Base width={size} height={size} {...props}>
      {paths[name]}
    </Base>
  );
}
