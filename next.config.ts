import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Event cover images ride along with the create form. The browser shrinks
    // them first; the action itself caps files at 3 MB (src/lib/images.ts).
    serverActions: { bodySizeLimit: "4mb" },
  },
};

export default nextConfig;
