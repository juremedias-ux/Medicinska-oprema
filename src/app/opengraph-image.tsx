import { siteConfig } from "@/config/site";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = siteConfig.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Medicinske in fizioterapevtske tehnologije",
    title: "Vrhunske medicinske tehnologije za hitrejše celjenje in natančnejšo diagnostiko.",
  });
}
