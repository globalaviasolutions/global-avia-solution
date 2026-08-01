import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Africa Security Solutions — Securing Africa. Protecting global business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(125deg, #050505 0%, #17110a 55%, #2b1d0e 100%)",
        color: "#f7f7f7",
        fontFamily: "Arial, sans-serif",
        padding: "72px 78px",
      }}
    >
      <div style={{ position: "absolute", width: 560, height: 560, borderRadius: 560, border: "1px solid rgba(210,170,98,.28)", right: -80, top: 80 }} />
      <div style={{ position: "absolute", width: 380, height: 380, borderRadius: 380, background: "rgba(210,170,98,.08)", right: 20, top: 170 }} />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 92, height: 92, border: "3px solid #d2aa62", borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, color: "#f3d38f" }}>✓</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, letterSpacing: 5, fontWeight: 700 }}>AFRICA</div>
            <div style={{ fontSize: 20, letterSpacing: 4, color: "#d2aa62" }}>SECURITY SOLUTIONS</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ color: "#d2aa62", fontSize: 20, letterSpacing: 5, marginBottom: 24 }}>AFRICAN EXPERTISE · INTERNATIONAL STANDARDS</div>
          <div style={{ fontSize: 70, lineHeight: 1.05, fontWeight: 600 }}>Securing Africa.<br />Protecting global business.</div>
          <div style={{ fontSize: 24, color: "#c9c9c9", marginTop: 28 }}>Executive protection · Secure transportation · Risk management</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 20, color: "#d2aa62" }}>
          <span>security-solutions.africa</span>
          <span>24/7 Operations Support</span>
        </div>
      </div>
    </div>,
    size
  );
}
