import type { Metadata } from "next";
import { CarrierApplicationForm } from "@/components/sections/carrier-application";

export const metadata: Metadata = {
  title: "Carrier Application | Partner with Driventa",
  description:
    "Apply to become a Driventa carrier partner. Tell us about your equipment, lanes and operation — we'll handle the dispatch.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return <CarrierApplicationForm />;
}
