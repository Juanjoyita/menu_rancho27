import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de los productos alojadas en Cloudinary.
    // Cuando tengamos la cuenta, se puede limitar a "/<cloud-name>/**".
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" }],
  },
};

export default nextConfig;
