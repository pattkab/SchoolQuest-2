import type { MetadataRoute } from "next";
import { SHARE_URL } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SHARE_URL}/` }, { url: `${SHARE_URL}/accessibility` }, { url: `${SHARE_URL}/guest` }];
}
