import { mobileClasses } from "@/lib/mobile-api";

export async function GET() {
  return Response.json(await mobileClasses());
}
