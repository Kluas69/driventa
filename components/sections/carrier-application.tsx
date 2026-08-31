"use client";

import { useState, useId, useMemo, useRef, useEffect, useCallback, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import {
  submitApplication,
  EQUIPMENT_TYPE_MAP,
  type EquipmentType,
} from "@/lib/api";

/* --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  equipmentType: string;
  truckCount: string;
  mcNumber: string;
  dotNumber: string;
  preferredLanes: string[];
  additionalDetails: string;
}

interface FieldErrors {
  [key: string]: string;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  companyName: "",
  equipmentType: "",
  truckCount: "",
  mcNumber: "",
  dotNumber: "",
  preferredLanes: [],
  additionalDetails: "",
};

const EQUIPMENT_OPTIONS = [
  { label: "Dry Van", value: "Dry Van" },
  { label: "Reefer", value: "Reefer" },
  { label: "Flatbed", value: "Flatbed" },
  { label: "Step Deck", value: "Step Deck" },
  { label: "Box Truck", value: "Box Truck" },
  { label: "Hotshot", value: "Hotshot" },
  { label: "Power Only", value: "Power Only" },
];

/* --------------------------------------------------------------------------
 * 48 Contiguous US States & Route Generation
 * ------------------------------------------------------------------------- */
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

const ALL_ROUTES: string[] = CONTIGUOUS_STATES.flatMap((origin) =>
  CONTIGUOUS_STATES.filter((dest) => dest !== origin).map(
    (dest) => `${origin} → ${dest}`
  )
);

/* --------------------------------------------------------------------------
 * Client-side validation
 * ------------------------------------------------------------------------- */
function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required.";
  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  if (!form.companyName.trim()) errors.companyName = "Company name is required.";
  if (!form.equipmentType) errors.equipmentType = "Please select an equipment type.";
  if (!form.truckCount) {
    errors.truckCount = "Number of trucks is required.";
  } else if (isNaN(Number(form.truckCount)) || Number(form.truckCount) < 1) {
    errors.truckCount = "Please enter a valid number of trucks.";
  }
  if (!form.mcNumber.trim()) errors.mcNumber = "MC Number is required.";
  if (!form.dotNumber.trim()) errors.dotNumber = "DOT Number is required.";
  if (form.preferredLanes.length === 0) errors.preferredLanes = "Preferred lanes are required.";

  return errors;
}

/* --------------------------------------------------------------------------
 * Main component
 * ------------------------------------------------------------------------- */
export function CarrierApplicationForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [apiError, setApiError] = useState<string>("");
  const [applicationNumber, setApplicationNumber] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear per-field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Scroll to first error
      const firstErrorEl = document.querySelector("[data-field-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setFieldErrors({});
    setApiError("");
    setStatus("submitting");

    try {
      const result = await submitApplication({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        companyName: form.companyName.trim(),
        equipmentType: EQUIPMENT_TYPE_MAP[form.equipmentType] as EquipmentType,
        truckCount: Number(form.truckCount),
        mcNumber: form.mcNumber.trim(),
        dotNumber: form.dotNumber.trim(),
        preferredLanes: form.preferredLanes.join(", "),
        additionalDetails: form.additionalDetails.trim(),
      });

      if (result.success) {
        setApplicationNumber(result.data?.applicationNumber ?? "");
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        // Surface API validation errors
        const msgs = result.errors?.join(" ") ?? result.message ?? "Submission failed. Please try again.";
        setApiError(msgs);
        setStatus("error");
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  function handleReset() {
    setStatus("idle");
    setApiError("");
    setApplicationNumber("");
    setFieldErrors({});
  }

  return (
    <>
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden bg-navy-deep py-24 md:py-32">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="bg-grid-dark absolute inset-0 opacity-40" />
          <div className="glow-accent absolute -left-20 top-0 h-[32rem] w-[32rem] opacity-30 mix-blend-screen blur-[80px]" />
          <div className="glow-sky absolute -right-32 bottom-0 h-[24rem] w-[24rem] opacity-20 mix-blend-screen blur-[60px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-mist to-transparent" />
        </div>

        <div className="container-page relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <span className="kicker inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-glow pulse-dot-blue" />
              Carrier Partner Application
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-[3.5rem]">
              Become a Driventa Partner
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-[1.05rem] leading-relaxed text-white/70">
              Submit your details below. Our dispatch team will reach out within 24 hours to complete your onboarding and start finding loads.
            </p>
            {/* Quick trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {[
                { icon: "shield-check" as const, label: "No long-term contract" },
                { icon: "clock" as const, label: "24/7 dedicated support" },
                { icon: "handshake" as const, label: "Carrier-first negotiation" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/55"
                >
                  <Icon name={b.icon} size={15} className="text-accent-soft" strokeWidth={2.5} />
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <Section id="carrier-application" tone="mist" className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          {status === "success" ? (
            <SuccessState applicationNumber={applicationNumber} onReset={handleReset} />
          ) : (
            <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-[var(--shadow-lift)]">
              {/* Form header */}
              <div className="border-b border-line px-8 py-6 sm:px-10">
                <h2 className="font-display text-xl font-bold text-ink">
                  Application Details
                </h2>
                <p className="mt-1 text-sm text-muted">
                  All fields marked <span className="text-accent-strong">*</span> are required.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="px-8 py-8 sm:px-10">
                {/* API error banner */}
                {status === "error" && apiError && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <Icon name="close" size={18} className="mt-0.5 shrink-0 text-red-500" />
                    <span>{apiError}</span>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <FormField
                    label="Full Name"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    autoComplete="name"
                    error={fieldErrors.fullName}
                    wide
                  />

                  {/* Email */}
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    autoComplete="email"
                    error={fieldErrors.email}
                  />

                  {/* Phone */}
                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    autoComplete="tel"
                    error={fieldErrors.phone}
                  />

                  {/* Company Name */}
                  <FormField
                    label="Company Name"
                    name="companyName"
                    type="text"
                    required
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Smith Trucking LLC"
                    autoComplete="organization"
                    error={fieldErrors.companyName}
                    wide
                  />

                  {/* Equipment Type */}
                  <SelectField
                    label="Equipment Type"
                    name="equipmentType"
                    required
                    value={form.equipmentType}
                    onChange={handleChange}
                    options={EQUIPMENT_OPTIONS}
                    error={fieldErrors.equipmentType}
                  />

                  {/* Truck Count */}
                  <FormField
                    label="Number of Trucks"
                    name="truckCount"
                    type="number"
                    required
                    value={form.truckCount}
                    onChange={handleChange}
                    placeholder="e.g. 3"
                    error={fieldErrors.truckCount}
                    min={1}
                  />

                  {/* MC Number */}
                  <FormField
                    label="MC Number"
                    name="mcNumber"
                    type="text"
                    required
                    value={form.mcNumber}
                    onChange={handleChange}
                    placeholder="MC-123456"
                    error={fieldErrors.mcNumber}
                  />

                  {/* DOT Number */}
                  <FormField
                    label="DOT Number"
                    name="dotNumber"
                    type="text"
                    required
                    value={form.dotNumber}
                    onChange={handleChange}
                    placeholder="DOT-789012"
                    error={fieldErrors.dotNumber}
                  />

                  {/* Preferred Lanes */}
                  <LaneSelectField
                    label="Preferred Lanes"
                    name="preferredLanes"
                    required
                    value={form.preferredLanes}
                    onChange={(routes) => {
                      setForm((prev) => ({ ...prev, preferredLanes: routes }));
                      if (fieldErrors.preferredLanes) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.preferredLanes;
                          return next;
                        });
                      }
                    }}
                    error={fieldErrors.preferredLanes}
                  />

                  {/* Additional Details */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="additionalDetails"
                      className="mb-1.5 block text-sm font-medium text-navy"
                    >
                      Additional Details
                      <span className="ml-1.5 text-xs font-normal text-muted">(optional)</span>
                    </label>
                    <textarea
                      id="additionalDetails"
                      name="additionalDetails"
                      rows={4}
                      value={form.additionalDetails}
                      onChange={handleChange}
                      placeholder="Tell us about your operation, specializations, or anything else that would help us find the right loads for you."
                      className="w-full resize-y rounded-xl border border-line-strong bg-mist/40 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15"
                    />
                  </div>
                </div>

                {/* Privacy note */}
                <div className="mt-6 flex items-start gap-2.5 text-xs text-muted">
                  <Icon name="shield-check" size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    Your information is kept private and used only to contact you about dispatch services.
                  </span>
                </div>

                {/* Submit */}
                <button
                  id="submit-application-btn"
                  type="submit"
                  disabled={status === "submitting"}
                  className={cn(
                    "group mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent text-base font-semibold text-white shadow-[var(--shadow-accent)] transition-[transform,background-color,box-shadow] duration-200",
                    "hover:bg-accent-strong hover:-translate-y-0.5",
                    "disabled:pointer-events-none disabled:opacity-70"
                  )}
                >
                  {status === "submitting" ? (
                    <>
                      <Icon name="spinner" size={18} className="animate-spin" />
                      Submitting Application…
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Icon
                        name="arrow-right"
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

/* --------------------------------------------------------------------------
 * Field helpers
 * ------------------------------------------------------------------------- */
function FormField({
  label,
  name,
  type,
  required,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  wide,
  min,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  wide?: boolean;
  min?: number;
}) {
  const id = useId();
  return (
    <div
      className={cn(wide ? "sm:col-span-2" : undefined)}
      {...(error ? { "data-field-error": name } : {})}
    >
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        className={cn(
          "w-full rounded-xl border bg-mist/40 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:bg-paper focus:outline-none focus:ring-4",
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-200/50"
            : "border-line-strong focus:border-accent focus:ring-accent/15"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  required,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  error?: string;
}) {
  const id = useId();
  return (
    <div {...(error ? { "data-field-error": name } : {})}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          aria-required={required || undefined}
          aria-invalid={!!error || undefined}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full appearance-none rounded-xl border bg-mist/40 px-4 py-3 pr-10 text-sm text-ink transition-colors focus:bg-paper focus:outline-none focus:ring-4",
            !value && "text-muted/60",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-200/50"
              : "border-line-strong focus:border-accent focus:ring-accent/15"
          )}
        >
          <option value="" disabled>
            Select equipment type…
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function LaneSelectField({
  label,
  name,
  required,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string[];
  onChange: (routes: string[]) => void;
  error?: string;
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

    return candidates.filter((route) => !value.includes(route)).slice(0, 24);
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
    <div className="sm:col-span-2" {...(error ? { "data-field-error": name } : {})}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>
      <div ref={containerRef} className="relative">
        <div
          className={cn(
            "flex min-h-[46px] w-full flex-wrap items-center gap-1.5 rounded-2xl border bg-white px-2.5 py-2 text-sm text-ink shadow-[0_1px_0_rgba(15,23,42,0.02)] transition-all duration-200 focus-within:bg-white focus-within:outline-none focus-within:ring-4",
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

/* --------------------------------------------------------------------------
 * Success state
 * ------------------------------------------------------------------------- */
function SuccessState({
  applicationNumber,
  onReset,
}: {
  applicationNumber: string;
  onReset: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-[var(--shadow-lift)]">
      <div className="flex flex-col items-center px-8 py-16 text-center sm:px-16 sm:py-20">
        {/* Animated checkmark */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-positive/20" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-positive/10">
            <Icon name="check" size={36} className="text-positive" strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="mt-8 font-display text-3xl font-bold text-ink">
          Application Submitted!
        </h2>

        <p className="mt-4 max-w-lg leading-relaxed text-muted">
          Thank you! Your application has been submitted successfully.
        </p>

        {applicationNumber && (
          <div className="mt-6 inline-flex flex-col items-center gap-1 rounded-2xl border border-accent/20 bg-accent/5 px-8 py-4">
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Application Number
            </span>
            <span className="font-mono text-2xl font-bold text-accent">
              {applicationNumber}
            </span>
          </div>
        )}

        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
          Our team will review your application and contact you shortly to complete onboarding.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-white shadow-[var(--shadow-accent)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accent-strong"
          >
            Submit Another Application
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-line-strong px-6 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-accent-strong"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
