import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import type { IconName } from "@/lib/types";

type Variant = "primary" | "secondary" | "outline" | "onDark" | "onDarkOutline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[var(--shadow-accent)] hover:bg-accent-strong hover:-translate-y-0.5",
  secondary:
    "bg-white text-navy border border-line-strong shadow-soft hover:border-accent hover:text-accent-strong hover:-translate-y-0.5",
  outline:
    "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
  onDark: "bg-white text-navy hover:bg-white/90 hover:-translate-y-0.5",
  onDarkOutline:
    "border border-white/25 text-white hover:bg-white/10 hover:border-white/50",
  ghost: "text-accent-strong hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  trailingIcon?: IconName;
  leadingIcon?: IconName;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

function Inner({
  children,
  trailingIcon,
  leadingIcon,
}: Pick<CommonProps, "children" | "trailingIcon" | "leadingIcon">) {
  return (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={18} className="shrink-0" />}
      {children}
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={18}
          className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    trailingIcon,
    leadingIcon,
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        <Inner trailingIcon={trailingIcon} leadingIcon={leadingIcon}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <Inner trailingIcon={trailingIcon} leadingIcon={leadingIcon}>
        {children}
      </Inner>
    </button>
  );
}
