"use server";

// Backwards-compatible entry point: never use a separate grading or billing gate.
// All paper submissions must go through the same audited, atomic entitlement flow.
export { submitExam } from "@/app/actions/marking";
