import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0c0e11",
      }}
    >
      <svg width="132" height="132" viewBox="0 0 32 32">
        <path
          d="M22.96 11.12A8.5 8.5 0 1 0 22.96 20.88"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="3.2" fill="#34bfd4" />
      </svg>
    </div>,
    size,
  );
}
