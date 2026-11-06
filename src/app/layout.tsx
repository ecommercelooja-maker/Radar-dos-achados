import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Sans, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { ADS_ID, CHAVE_COOKIES, GA_ID, MARCA, SITE_URL } from "@/config";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--f-titulo" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--f-texto" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--f-mono" });

const titulo = `${MARCA} — Achadinhos no radar, alerta no seu WhatsApp`;
const descricao =
  "Curadoria independente e gratuita de achadinhos de casa, cozinha, beleza e eletrônicos, divulgados em grupo no WhatsApp. Não vendemos produtos e podemos receber comissão de afiliado.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: titulo,
  description: descricao,
  robots: { index: true, follow: true },
  openGraph: { title: titulo, description: descricao, locale: "pt_BR", type: "website", siteName: MARCA },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
};

export const viewport: Viewport = { themeColor: "#071824" };

// Google tag com Consent Mode v2. Roda antes da tag carregar: tudo começa "denied" e, se a pessoa já aceitou
// em uma visita anterior, o update "granted" é aplicado antes de qualquer evento.
const consentimentoGoogle = `
window.dataLayer = window.dataLayer || [];
window.gtag = function(){ window.dataLayer.push(arguments); };
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
try {
  if (localStorage.getItem(${JSON.stringify(CHAVE_COOKIES)}) === 'sim') {
    gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', ${JSON.stringify(ADS_ID)});
${GA_ID ? `gtag('config', ${JSON.stringify(GA_ID)});` : ""}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${dmSans.variable} ${mono.variable}`}>
      <body>
        {children}
        {ADS_ID && (
          <>
            <Script id="google-consent" strategy="beforeInteractive">
              {consentimentoGoogle}
            </Script>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />
          </>
        )}
      </body>
    </html>
  );
}
