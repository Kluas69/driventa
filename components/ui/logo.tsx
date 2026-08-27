import { cn } from "@/lib/utils";

/**
 * Driventa brand mark: an accent-blue badge with forward "motion" chevrons
 * (a nod to "keep moving") + wordmark. The accent badge reads well on both
 * light and dark surfaces; pass `variant="light"` to switch the wordmark to
 * white for dark backgrounds.
 */
export function Logo({
  variant = "default",
  withWordmark = true,
  className,
  markSize = 38,
}: {
  variant?: "default" | "light";
  withWordmark?: boolean;
  className?: string;
  markSize?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="40" height="40" rx="11" fill="var(--color-accent)" />
        {/* subtle top highlight for depth */}
        <rect width="40" height="20" rx="11" fill="#fff" opacity="0.10" />
        <g stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 13l7 7-7 7" />
          <path d="M21 13l7 7-7 7" />
        </g>
      </svg>
      {withWordmark && (
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold tracking-tight",
            variant === "light" ? "text-white" : "text-ink"
          )}
        >
          Driventa
        </span>
      )}
    </span>
  );
}
