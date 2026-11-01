import { searchSchools } from "@/lib/ug-schools";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") || "";
  const schools = searchSchools(query).map((school) => ({
    id: school.id,
    name: school.name,
    district: school.district,
    level: school.level,
  }));
  return Response.json(schools);
}
