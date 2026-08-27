import { cn } from "@/lib/utils";

/**
 * Stylized dispatch route: an abstract region grid with an animated dashed
 * line running from an origin node to a destination pin. Decorative — the
 * real city labels are rendered as text alongside it in the dashboard panel.
 */
export function RouteMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 170"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {/* faint region dots */}
      <defs>
        <pattern id="routeDots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="#7ea6ff" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="320" height="170" fill="url(#routeDots)" />

      {/* base route */}
      <path
        d="M46 132 C 120 120, 150 70, 268 44"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* animated dashed route */}
      <path
        className="route-flow"
        d="M46 132 C 120 120, 150 70, 268 44"
        stroke="var(--color-accent-glow)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 12"
      />

      {/* moving-freight marker */}
      <circle cx="168" cy="80" r="6" fill="var(--color-sky)" />
      <circle cx="168" cy="80" r="11" fill="var(--color-sky)" opacity="0.25" />

      {/* origin node */}
      <circle cx="46" cy="132" r="7" fill="var(--color-accent)" />
      <circle cx="46" cy="132" r="7" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />

      {/* destination pin */}
      <g transform="translate(268 44)">
        <path
          d="M0 -14 C 8 -14, 12 -8, 12 -2 C 12 6, 0 16, 0 16 C 0 16, -12 6, -12 -2 C -12 -8, -8 -14, 0 -14 Z"
          fill="var(--color-sky)"
        />
        <circle cx="0" cy="-1" r="4" fill="var(--color-navy-deep)" />
      </g>
    </svg>
  );
}
