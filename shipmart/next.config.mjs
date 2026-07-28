/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === "1";

const nextConfig = {
  reactStrictMode: true,
  // `npm run export` emits a fully static site into out/ — used for cheap
  // static hosting and for bundling into the Android WebView shell.
  ...(isExport
    ? { output: "export", images: { unoptimized: true }, trailingSlash: true }
    : {}),
};

export default nextConfig;
