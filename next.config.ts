import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/baby-tracker" : "";

const nextConfig: NextConfig = {
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
