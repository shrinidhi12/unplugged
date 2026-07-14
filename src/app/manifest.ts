import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unplugg Me — phone-free events",
    short_name: "Unplugg Me",
    description:
      "A free, phone-free way to host and find event. Get off big tech and into public spaces!",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1ea",
    theme_color: "#f5f1ea",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
