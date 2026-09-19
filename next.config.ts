import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Isolated verify runs set ULYSSE_VERIFY_DIST_DIR so `next dev` can start
  // beside an existing preview without taking `.next/dev/lock`.
  distDir: process.env.ULYSSE_VERIFY_DIST_DIR || ".next",
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/site.html" }],
    };
  },
};

export default nextConfig;
