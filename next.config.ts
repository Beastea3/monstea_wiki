import type { NextConfig } from "next";

/**
 * `output: "export"` makes Next validate every dynamic segment against
 * `generateStaticParams` during dev; Unicode wiki URLs often hit false
 * negatives and surface as HTTP 500 ("missing param ... in generateStaticParams").
 * Only apply static export for production builds (`next build`).
 */
const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
