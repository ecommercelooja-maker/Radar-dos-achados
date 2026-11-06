import { NextResponse, type NextRequest } from "next/server";
import { LINKS_WHATSAPP, TELEGRAM } from "@/config";

// /g/<qualquer-coisa> leva ao grupo de WhatsApp (ou ao Telegram com ?p=telegram).
export function GET(req: NextRequest) {
  const destino = req.nextUrl.searchParams.get("p") === "telegram" ? TELEGRAM : LINKS_WHATSAPP[0];

  // Enquanto o link real não for configurado, volta para a página inicial.
  return NextResponse.redirect(destino || new URL("/#sinais", req.url), 302);
}
