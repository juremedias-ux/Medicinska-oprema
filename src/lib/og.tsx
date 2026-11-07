import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

/**
 * Shared Open Graph image renderer (1200×630).
 * Uses a bundled copy of Geist (SIL OFL 1.1, see src/assets/fonts/OFL.txt)
 * because the default OG font does not cover Slovenian characters (č, š, ž).
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontsDir = join(process.cwd(), "src/assets/fonts");

// Loaded once at module evaluation so the images can be prerendered at build time.
const [geistRegular, geistSemiBold] = await Promise.all([
  readFile(join(fontsDir, "Geist-Regular.ttf")),
  readFile(join(fontsDir, "Geist-SemiBold.ttf")),
]);

const fonts = [
  { name: "Geist", data: geistRegular, weight: 400 as const, style: "normal" as const },
  { name: "Geist", data: geistSemiBold, weight: 600 as const, style: "normal" as const },
];

type OgImageInput = {
  eyebrow: string;
  title: string;
  description?: string;
  footnote?: string;
};

export function renderOgImage({ eyebrow, title, description, footnote }: OgImageInput) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#06121e",
        backgroundImage:
          "radial-gradient(circle at 88% 18%, rgba(23,156,144,0.45), rgba(6,18,30,0) 45%), radial-gradient(circle at 10% 110%, rgba(56,185,171,0.18), rgba(6,18,30,0) 40%)",
        color: "#ffffff",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <rect width="32" height="32" rx="9" fill="#ffffff" />
          <path
            d="M22.96 11.12A8.5 8.5 0 1 0 22.96 20.88"
            fill="none"
            stroke="#0b1b2b"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="3.2" fill="#179c90" />
        </svg>
        <div style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-0.03em" }}>{siteConfig.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
        <div style={{ fontSize: 24, color: "#73d5c8", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div
          style={{ marginTop: 22, fontSize: 64, fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          {title}
        </div>
        {description ? (
          <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.4, color: "#b9c3ce" }}>{description}</div>
        ) : null}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8a99a9" }}>
        <div>{footnote ?? siteConfig.tagline}</div>
        <div>{siteConfig.contact.location}</div>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}
