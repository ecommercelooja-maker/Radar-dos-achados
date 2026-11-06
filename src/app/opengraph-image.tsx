import { ImageResponse } from "next/og";
import { MARCA } from "@/config";

// Prévia de compartilhamento (WhatsApp, Facebook etc.), gerada no build.
export const alt = `${MARCA}: achadinhos no radar, alerta no seu WhatsApp`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Imagem() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          background: "radial-gradient(circle at 82% 50%, #0f3a3a, #071824 62%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#2ee59d", letterSpacing: 6 }}>RADAR DOS ACHADOS</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, lineHeight: 1.05, marginTop: 24 }}>
            <span>Achadinhos no radar.</span>
            <span style={{ color: "#2ee59d" }}>Você só recebe o alerta.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, marginTop: 34, color: "rgba(255,255,255,.8)" }}>
            Curadoria independente e gratuita · Grupo no WhatsApp
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 330,
            height: 330,
            borderRadius: 999,
            border: "6px solid #2ee59d",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginLeft: 40,
          }}
        >
          <div style={{ display: "flex", width: 200, height: 200, borderRadius: 999, border: "4px solid rgba(46,229,157,.5)" }} />
          <div style={{ display: "flex", position: "absolute", width: 26, height: 26, borderRadius: 999, background: "#2ee59d" }} />
          <div style={{ display: "flex", position: "absolute", top: 58, right: 82, width: 36, height: 36, borderRadius: 999, background: "#ff6b3d" }} />
        </div>
      </div>
    ),
    size,
  );
}
