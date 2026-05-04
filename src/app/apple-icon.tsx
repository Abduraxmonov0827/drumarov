import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const size = {
  width: 180,
  height: 180,
};
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
        background: "linear-gradient(165deg, #ffffff 0%, #eef2f8 100%)",
        borderRadius: 42,
        border: "2px solid rgba(0,32,91,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 58,
            height: 118,
            borderRadius: 14,
            background: "#00205b",
          }}
        />
        <div
          style={{
            width: 58,
            height: 118,
            borderRadius: 14,
            background: "#660000",
          }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  );
}
