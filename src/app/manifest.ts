import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "School Quest",
    short_name: "School Quest",
    description: "Notes and practice for Ugandan primary school.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f8fafb",
    theme_color: "#0c6b56",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
