import { ImageResponse } from "next/og";

export const alt = "Hitts Homes & Properties";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #071426 0%, #0B1F3A 55%, #17385e 100%)",
        color: "white",
      }}
    >
      <div style={{ display: "flex", color: "#C8A45D", fontSize: 28, fontWeight: 700, letterSpacing: 4 }}>
        HITTS HOMES &amp; PROPERTIES
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          Find a place to call home.
        </div>
        <div style={{ display: "flex", marginTop: 28, color: "#d8e1ed", fontSize: 34 }}>
          Verified homes for rent and sale across the United States.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 24, color: "#C8A45D" }}>
        hittshomes.com
      </div>
    </div>,
    size
  );
}
