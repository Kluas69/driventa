"use client";

import { useState, useRef, type FormEvent } from "react";
import { contact, contactSelects } from "@/lib/content";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { IconName } from "@/lib/types";
import { submitApplication, EQUIPMENT_TYPE_MAP, type EquipmentType } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

interface TextFieldDef {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel";
  wide?: boolean;
}

const textFields: TextFieldDef[] = [
  { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name", placeholder: "Your name", wide: true },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@company.com", inputMode: "email" },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", placeholder: "(555) 000-0000", inputMode: "tel" },
];

const secondaryFields: TextFieldDef[] = [
  { name: "mcdot", label: "MC / DOT number", type: "text", placeholder: "Optional" },
  { name: "lanes", label: "Preferred lanes", type: "text", placeholder: "e.g. TX ↔ Southeast", wide: true },
];

const contactRows: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "phone", label: "Call dispatch", value: site.phone.display, href: site.phone.href },
  { icon: "mail", label: "Email us", value: site.email, href: `mailto:${site.email}` },
  { icon: "clock", label: "Availability", value: site.supportHours },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [apiError, setApiError] = useState<string>("");
  const [applicationNumber, setApplicationNumber] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setApiError("");
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    try {
      const result = await submitApplication({
        fullName: (data.get("name") as string)?.trim() ?? "",
        email: (data.get("email") as string)?.trim() ?? "",
        phone: (data.get("phone") as string)?.trim() ?? "",
        companyName: (data.get("company") as string)?.trim() ?? "",
        equipmentType: (EQUIPMENT_TYPE_MAP[data.get("equipment") as string] ?? 0) as EquipmentType,
        truckCount: Number((data.get("trucks") as string)?.replace(/[^0-9]/g, "").trim()) || 1,
        mcNumber: (data.get("mcdot") as string)?.trim() ?? "",
        dotNumber: (data.get("mcdot") as string)?.trim() ?? "",
        preferredLanes: (data.get("lanes") as string)?.trim() ?? "",
        additionalDetails: (data.get("message") as string)?.trim() ?? "",
      });
      if (result.success) {
        setApplicationNumber(result.data?.applicationNumber ?? "");
        setStatus("success");
        formRef.current?.reset();
      } else {
        const msg = result.errors?.join(" ") ?? result.message ?? "Submission failed. Please try again.";
        setApiError(msg);
        setStatus("error");
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <Section id="contact" tone="paper">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        {/* Info panel */}
        <Reveal className="h-full">
          <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-navy-deep p-8 text-white sm:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="bg-grid-dark absolute inset-0 opacity-40" />
              <div className="glow-accent absolute -right-20 -top-20 h-72 w-72 opacity-40" />
            </div>

            <div className="relative">
              <span className="kicker inline-flex items-center gap-2 text-accent-soft">
                <span className="h-px w-6 bg-accent-soft/60" />
                {contact.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                {contact.title}
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">{contact.description}</p>

              <ul className="mt-8 space-y-4">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-accent-soft">
                      <Icon name={row.icon} size={20} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/60">{row.label}</p>
                      {row.href ? (
                        <a href={row.href} className="font-semibold text-white transition-colors hover:text-accent-soft">
                          {row.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-white">{row.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-start gap-2.5 border-t border-white/10 pt-6 text-sm text-white/55">
                <Icon name="shield-check" size={18} className="mt-0.5 shrink-0 text-accent-soft" />
                <p>{contact.privacyNote}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={100} className="h-full">
          <div className="h-full rounded-3xl border border-line bg-paper p-6 shadow-[var(--shadow-card)] sm:p-8">
            {status === "success" ? (
              <SuccessState appNumber={applicationNumber} onReset={() => { setStatus("idle"); setApiError(""); setApplicationNumber(""); }} />
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* API error banner */}
                {(status === "error") && apiError && (
                  <div className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <Icon name="close" size={16} className="mt-0.5 shrink-0 text-red-500" />
                    <span>{apiError}</span>
                  </div>
                )}
                {textFields.map((f) => (
                    <TextField key={f.name} field={f} />
                  ))}
                  {textFields.length % 2 !== 0 && <div className="hidden sm:block" aria-hidden="true" />}

                  <TextField field={{ name: "company", label: "Company", type: "text", autoComplete: "organization", placeholder: "Optional" }} />

                  {contactSelects.map((s) => (
                    <SelectField key={s.name} name={s.name} label={s.label} options={s.options} required={s.required} />
                  ))}

                  {secondaryFields.map((f) => (
                    <TextField key={f.name} field={f} />
                  ))}

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                      Anything else?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your operation, goals or questions (optional)"
                      className="w-full resize-y rounded-xl border border-line-strong bg-mist/40 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm text-muted">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-line-strong text-accent accent-accent focus:ring-2 focus:ring-accent/30"
                  />
                  <span>I agree to be contacted about dispatch services and understand my information is kept private.</span>
                </label>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={cn(
                    "group inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent text-base font-medium text-white shadow-[var(--shadow-accent)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-accent-strong hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
                  )}
                >
                  {status === "submitting" ? (
                    <>
                      <Icon name="spinner" size={18} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Start My Application
                      <Icon name="arrow-right" size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-muted">
                  Prefer to talk?{" "}
                  <a href={site.phone.href} className="font-medium text-accent-strong hover:underline">
                    Call {site.phone.display}
                  </a>
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function TextField({ field }: { field: TextFieldDef }) {
  const { name, label, type, required, autoComplete, placeholder, inputMode, wide } = field;
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line-strong bg-mist/40 px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required && <span className="ml-0.5 text-accent-strong">*</span>}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          aria-required={required || undefined}
          defaultValue=""
          className="w-full appearance-none rounded-xl border border-line-strong bg-mist/40 px-4 py-3 pr-10 text-sm text-ink transition-colors focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15"
        >
          <option value="" disabled>
            Select…
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}

function SuccessState({ appNumber, onReset }: { appNumber?: string; onReset: () => void }) {
  return (
    <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-positive/10 text-positive">
        <Icon name="check" size={32} strokeWidth={2.5} />
      </span>
      <h3 className="mt-6 font-display text-2xl font-bold text-ink">Application submitted!</h3>
      {appNumber && (
        <div className="mt-4 inline-flex flex-col items-center gap-0.5 rounded-xl border border-accent/20 bg-accent/5 px-6 py-3">
          <span className="text-xs font-medium uppercase tracking-widest text-accent">Application Number</span>
          <span className="font-mono text-lg font-bold text-accent">{appNumber}</span>
        </div>
      )}
      <p className="mt-4 max-w-sm leading-relaxed text-muted">
        Thank you! A Driventa dispatcher will review your application and contact you shortly.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-medium text-accent-strong transition-colors hover:text-accent"
      >
        Submit another application
      </button>
    </div>
  );
}
