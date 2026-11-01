export type ReadinessStatus = "VERIFIED" | "PARTIALLY VERIFIED" | "MISSING" | "NEEDS REVIEW";

export type ReadinessRow = {
  domain: string;
  status: ReadinessStatus;
  evidence: string;
  missing: string;
  owner: string;
  reference: string;
  next: string;
  updated: string;
};

export function readinessRows(input: {
  realUsers: number;
  activeLearners: number;
  receipts: number;
  grossUgx: number;
  pairs: number;
  updated: string;
}): ReadinessRow[] {
  const users = input.realUsers > 0
    ? "PARTIALLY VERIFIED" as const
    : "MISSING" as const;
  const learners = input.activeLearners > 0 ? "PARTIALLY VERIFIED" as const : "MISSING" as const;
  const paid = input.receipts > 0 ? "NEEDS REVIEW" as const : "MISSING" as const;
  const outcomes = input.pairs > 0 ? "PARTIALLY VERIFIED" as const : "MISSING" as const;
  return [
    row("Working product", "PARTIALLY VERIFIED", "Sign-in, lessons, practice, and school tools run in the current app.", "Production writes still sit on a temporary database.", "Keep the pilot on a hosted database before school use.", input.updated),
    row("Verified users", users, input.realUsers > 0 ? `${input.realUsers} accounts are marked real, excluding demonstration logins.` : "No real accounts in this database.", "Phone ownership is not confirmed with a one-time code.", "Add phone confirmation before counting a user as verified.", input.updated),
    row("Active learners", learners, input.activeLearners > 0 ? `${input.activeLearners} real learners finished an activity in the last 30 days.` : "Not yet measured.", "Activity is not yet tied to a named pilot cohort.", "Run a baseline and record completed attempts.", input.updated),
    row("Paying customers", paid, input.receipts > 0 ? `${input.receipts} verified receipts.` : "Not yet measured. No payment provider is connected.", "A pay button must not create a receipt.", "Connect Yo Payments and store the provider reference.", input.updated),
    row("Revenue", paid, input.receipts > 0 ? `UGX ${input.grossUgx} gross from verified receipts.` : "Not yet measured.", "Fees, refunds, and settlement are not recorded.", "Reconcile provider statements before reporting revenue.", input.updated),
    row("Institutional partnerships", "MISSING", "Not yet measured.", "A school name on a profile is not a partnership agreement.", "Record a confirmed agreement before counting a school.", input.updated),
    row("Learning outcomes", outcomes, input.pairs > 0 ? `${input.pairs} real baseline and endline pairs.` : "Not yet measured.", "A change in score is not proof that SchoolQuest caused it.", "Use the same objectives for baseline and endline.", input.updated),
    row("Accessibility", "PARTIALLY VERIFIED", "Text size, focus outlines, and reduced-motion support are in the interface.", "No external accessibility audit, and diagram questions lack a full non-visual alternative.", "Test one P7 paper with a screen reader on a low-cost Android phone.", input.updated),
    row("Safeguarding", "MISSING", "Not yet measured.", "No adopted safeguarding procedure or confidential case record.", "Approve a procedure and a restricted reporting path before a child pilot.", input.updated),
    row("Data protection", "MISSING", "Not yet measured.", "PDPO registration is not recorded in this system.", "Enter the registration only after the certificate is in hand.", input.updated),
    row("Content quality", "NEEDS REVIEW", "New extracts stay unpublished until a site administrator approves them.", "Older seeded papers have no rights record or expert review.", "Review the P6–P7 mathematics and science set before a pilot.", input.updated),
    row("Technical reliability", "PARTIALLY VERIFIED", "The site can be built and deployed. Security checks cover passwords, links, and payments.", "A cold start can drop new production records.", "Move the pilot database off the temporary file.", input.updated),
    row("Commercial sustainability", "MISSING", "Not yet measured.", "There is no verified income, cost, or renewal record.", "Keep price targets separate from actual receipts.", input.updated),
  ];
}

function row(domain: string, status: ReadinessStatus, evidence: string, missing: string, next: string, updated: string): ReadinessRow {
  return {
    domain,
    status,
    evidence,
    missing,
    owner: "Unassigned",
    reference: "Internal record. Not a Hive Colab or Mastercard Foundation assessment.",
    next,
    updated,
  };
}
