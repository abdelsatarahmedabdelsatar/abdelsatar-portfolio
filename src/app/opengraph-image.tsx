import { ImageResponse } from "next/og";
import { personal } from "@/lib/content";

export const alt = `${personal.name}, ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        color: "#f1f5f4",
        background: "linear-gradient(135deg, #0f1a1f 0%, #10302f 100%)",
      }}
    >
      <div style={{ fontSize: 32, color: "#5eead4" }}>{personal.role}</div>
      <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16 }}>{personal.shortName}</div>
      <div style={{ fontSize: 36, marginTop: 24, color: "#b6c4c2" }}>
        {personal.specialties.join(" · ")}
      </div>
    </div>,
    size,
  );
}
