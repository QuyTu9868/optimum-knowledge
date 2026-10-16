import type { NextConfig } from "next";

const config: NextConfig = {
  // /api/ask reads the knowledge base files at request time, so Vercel must ship ./content with that function.
  outputFileTracingIncludes: { "/api/ask": ["./content/**/*", "./data/**/*"] },
};

export default config;
