import fs from "fs";
import path from "path";

export type UgSchool = {
  id: string;
  name: string;
  district: string;
  level: string;
  status: string;
};

type Cache = { key: string; schools: UgSchool[]; byId: Map<string, UgSchool> };

let cache: Cache | null = null;

function catalogFile() {
  const json = path.join(process.cwd(), "data", "ug-schools.json");
  const jsonl = path.join(process.cwd(), "data", "ug-schools.jsonl");
  if (fs.existsSync(json)) return json;
  if (fs.existsSync(jsonl)) return jsonl;
  return null;
}

export function loadSchools() {
  const file = catalogFile();
  if (!file) return [];
  const stat = fs.statSync(file);
  const key = `${file}:${stat.mtimeMs}:${stat.size}`;
  if (cache?.key === key) return cache.schools;
  const schools: UgSchool[] = [];
  if (file.endsWith(".jsonl")) {
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try {
        schools.push(JSON.parse(line) as UgSchool);
      } catch {
        continue;
      }
    }
  } else {
    schools.push(...(JSON.parse(fs.readFileSync(file, "utf8")).schools as UgSchool[]));
  }
  cache = { key, schools, byId: new Map(schools.map((school) => [school.id, school])) };
  return schools;
}

export function schoolById(id: string) {
  loadSchools();
  return cache?.byId.get(id) || null;
}

export function searchSchools(query: string, limit = 12) {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];
  const starts: UgSchool[] = [];
  const contains: UgSchool[] = [];
  for (const school of loadSchools()) {
    const name = school.name.toLowerCase();
    const district = school.district.toLowerCase();
    if (name.startsWith(needle)) starts.push(school);
    else if (name.includes(needle) || district.includes(needle)) contains.push(school);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}
