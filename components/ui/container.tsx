import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Centered content column with the site's standard gutters + max width. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-page", className)}>{children}</div>;
}
