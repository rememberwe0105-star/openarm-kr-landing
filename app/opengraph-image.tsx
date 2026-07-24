import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OpenArm 2.0 — Open-source bimanual robot for physical AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1000px 500px at 78% 8%, rgba(58,86,255,0.12), rgba(255,255,255,0)), #ffffff",
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#2438C9",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: 10, background: "#3A56FF" }} />
          INTRODUCING · OPENARM 2.0
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 148, fontWeight: 900, letterSpacing: -6, lineHeight: 1 }}>
            <span style={{ color: "#0A0D14" }}>OpenArm&nbsp;</span>
            <span style={{ color: "#3A56FF" }}>2.0</span>
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#52525B", marginTop: 28, fontWeight: 600 }}>
            Open-source bimanual robot for physical AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#52525B",
            borderTop: "1px solid #E6EBF1",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontWeight: 800, color: "#0A0D14", letterSpacing: 1 }}>LIBERTRON</div>
          <div style={{ display: "flex" }}>ROS 2 · MuJoCo · Isaac Sim · CAN-FD · openarm.co.kr</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
