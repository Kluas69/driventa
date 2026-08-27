import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Driventa — Truck Dispatch Services. Keep your trucks moving, we handle the dispatch.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const domain = site.url.replace(/^https?:\/\//, "");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px",
          background:
            "linear-gradient(135deg, #0a1327 0%, #060c19 55%, #0f1c38 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <svg width="78" height="78" viewBox="0 0 44 44">
            <rect width="44" height="44" rx="12" fill="#2563eb" />
            <path
              d="M13 13l7 7-7 7"
              stroke="#ffffff"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 13l7 7-7 7"
              stroke="#ffffff"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: "48px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Driventa
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "25px",
              letterSpacing: "0.24em",
              color: "#7ea6ff",
              fontWeight: 600,
              marginBottom: "26px",
            }}
          >
            TRUCK DISPATCH SERVICES
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "74px",
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Keep Your Trucks Moving.</span>
            <span style={{ color: "#7ea6ff" }}>We Handle the Dispatch.</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "25px",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "12px",
                height: "12px",
                borderRadius: "9999px",
                background: "#22c55e",
              }}
            />
            24/7 US-Based Dispatch · No Long-Term Contracts
          </div>
          <div style={{ display: "flex", fontSize: "25px", color: "rgba(255,255,255,0.5)" }}>
            {domain}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
