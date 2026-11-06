// Endereço do site: NEXT_PUBLIC_SITE_URL (domínio próprio) ou, sem ela, o endereço de produção da Vercel.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "http://localhost:3000");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Vídeos, fotos e emojis mudam raramente: cache longo no navegador e na CDN.
        source: "/:dir(video|fotos|anim|ofertas)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
