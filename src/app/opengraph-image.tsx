import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = siteConfig.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Tehnologije za rehabilitacijo",
    title: "Napredna tehnologija. Nove možnosti za vaše okrevanje.",
  });
}
