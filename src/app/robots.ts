import type { MetadataRoute } from "next";
import { SHARE_URL } from "@/lib/company";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${SHARE_URL}/sitemap.xml`,
  };
}
