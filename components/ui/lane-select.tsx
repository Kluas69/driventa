"use client";

import { useState, useMemo, useRef, useEffect, useCallback, useId } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const CONTIGUOUS_STATES = [
  "Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
  "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
] as const;

export const ALL_ROUTES: string[] = CONTIGUOUS_STATES.flatMap((origin) =>
  CONTIGUOUS_STATES.filter((dest) => dest !== origin).map(
    (dest) => `${origin} → ${dest}`
  )
);

export function LaneSelectField({
  label,
  name,
  required,
  value,
  onChange,
  error,
  wide,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string[];
  onChange: (routes: string[]) => void;
  error?: string;
  wide?: boolean;
}) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const candidates = q
      ? ALL_ROUTES.filter((route) => route.toLowerCase().includes(q))
      : ALL_ROUTES;

    const unselected = candidates.filter((route) => !value.includes(route));
    // Show search results efficiently: don't display all 2256 at once when not searching
    return q ? unselected : unselected.slice(0, 50);
  }, [query, value]);

  const selectRoute = useCallback(
    (route: string) => {
      if (!value.includes(route)) {
        onChange([...value, route]);
      }
      setQuery("");
      setActiveIndex(-1);
      inputRef.current?.focus();
    },
    [value, onChange]
  );

  const removeRoute = useCallback(
    (route: string) => {
      onChange(value.filter((r) => r !== route));
      inputRef.current?.focus();
    },
    [value, onChange]
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filtered.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filtered.length) {
          selectRoute(filtered[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setQuery("");
        break;
    }
  }

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className={cn(wide ? "sm:col-span-2" : undefined)} {...(error ? { "data-field-error": name } : {})}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>
      <div ref={containerRef} className="relative">
        <div
          className={cn(
            "flex min-h-[46px] w-full flex-wrap items-center gap-1.5 rounded-xl border bg-white px-2.5 py-2 text-sm text-ink shadow-[0_1px_0_rgba(15,23,42,0.02)] transition-all duration-200 focus-within:bg-white focus-within:outline-none focus-within:ring-4",
            error
              ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-200/50"
              : "border-line-strong focus-within:border-accent focus-within:ring-accent/15"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {value.map((route) => (
            <span
              key={route}
              className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/8 px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] text-accent-strong"
            >
              <Icon name="route" size={11} className="shrink-0" />
              {route}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeRoute(route);
                }}
                className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-accent/10"
                aria-label={`Remove ${route}`}
              >
                <Icon name="close" size={9} />
              </button>
            </span>
          ))}
          <div className="relative flex flex-1 items-center min-w-[120px]">
            <Icon
              name="search"
              size={15}
              className="pointer-events-none absolute left-2 shrink-0 text-muted/60"
            />
            <input
              ref={inputRef}
              id={id}
              type="text"
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              aria-controls={`${id}-listbox`}
              aria-activedescendant={
                activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
              }
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => {
                setIsOpen(true);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                value.length === 0
                  ? "Search states or routes…"
                  : "Add more lanes…"
              }
              className="w-full bg-transparent py-1.5 pl-7 pr-2 text-sm text-ink placeholder:text-muted/60 focus:outline-none"
            />
            {/* Hidden input for native forms (like contact.tsx) */}
            <input type="hidden" name={name} value={value.join(", ")} />
          </div>
        </div>

        {isOpen && (
          <ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            aria-label="Available routes"
            className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-line-strong bg-white p-1.5 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-muted">
                No routes match &ldquo;{query || "your search"}&rdquo;
              </li>
            ) : (
              filtered.map((route, i) => {
                const isSelected = value.includes(route);
                return (
                  <li
                    key={route}
                    id={`${id}-option-${i}`}
                    role="option"
                    aria-selected={isSelected || i === activeIndex}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (!isSelected) selectRoute(route);
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                      i === activeIndex && "bg-accent/5 text-accent-strong",
                      isSelected && "text-muted line-through opacity-50"
                    )}
                  >
                    <Icon name="route" size={13} className="shrink-0 text-muted/50" />
                    <span className="flex-1">{route}</span>
                    {isSelected && (
                      <Icon name="check" size={13} className="shrink-0 text-accent" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
