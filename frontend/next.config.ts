import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/neurochunk-trainer" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
