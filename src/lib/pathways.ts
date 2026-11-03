export const PATHWAYS = [
  {
    id: "student",
    label: "Learner",
    line: "Find notes for your class, practise, and see your progress.",
    roles: ["STUDENT"],
    home: "/dashboard",
  },
  {
    id: "teacher",
    label: "Teacher",
    line: "Apply to mark work or join your school to take attendance.",
    roles: ["TEACHER"],
    home: "/dashboard/teacher",
  },
  {
    id: "school",
    label: "School administrator",
    line: "Set up a school workspace for enrolment, attendance, and fees.",
    roles: ["SCHOOL_ADMIN"],
    home: "/dashboard/school",
  },
  {
    id: "site",
    label: "Site manager",
    line: "Use your assigned account to manage teacher approvals and content.",
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
