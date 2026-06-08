import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/baby-tracker",
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
