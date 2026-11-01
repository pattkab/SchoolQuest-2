export const PATHWAYS = [
  {
    id: "student",
    label: "Student",
    line: "Read, practice, and see marks.",
    roles: ["STUDENT"],
    home: "/dashboard",
  },
  {
    id: "teacher",
    label: "Teacher",
    line: "Take attendance and mark work.",
    roles: ["TEACHER"],
    home: "/dashboard/teacher",
  },
  {
    id: "school",
    label: "School manager",
    line: "Enrol learners, fees, and attendance.",
    roles: ["SCHOOL_ADMIN"],
    home: "/dashboard/school",
  },
  {
    id: "site",
    label: "Site administrator",
    line: "Users, content, and the syllabus.",
    roles: ["ADMIN", "SUPER_ADMIN"],
    home: "/dashboard/admin",
  },
] as const;

export type PathwayId = (typeof PATHWAYS)[number]["id"];

export function pathwayById(id?: string | null) {
  return PATHWAYS.find((pathway) => pathway.id === id) ?? PATHWAYS[0];
}

export function pathwayForRole(role?: string | null) {
  return PATHWAYS.find((pathway) => (pathway.roles as readonly string[]).includes(role || "")) ?? PATHWAYS[0];
}
