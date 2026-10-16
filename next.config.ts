import type { NextConfig } from "next";

// Cabeceras de seguridad para todas las páginas.
const securityHeaders = [
  // Nadie puede mostrar el menú dentro de otra web (evita "clickjacking").
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  },
  // Al abrir un enlace externo solo se comparte el dominio, no la página exacta.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // El menú no usa cámara, micrófono ni ubicación: se bloquean.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
  // No anunciar "x-powered-by: Next.js" en cada respuesta.
  poweredByHeader: false,

  // Página 404 propia para cualquier dirección inexistente (app/global-not-found.tsx).
  // Necesaria porque el layout raíz está dentro de [lang].
  experimental: {
    globalNotFound: true,
  },

  // Todas las fotos son locales (src/assets y public): no se permiten imágenes
  // de otros sitios, así nadie puede usar nuestro optimizador para las suyas.

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
