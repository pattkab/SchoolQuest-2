-- Timed exams can be paused. Progress events stay with the attempt.
ALTER TABLE "Attempt" ADD COLUMN "pausedAt" TIMESTAMP(3);
ALTER TABLE "Attempt" ADD COLUMN "timerRemainingMs" INTEGER;
ALTER TABLE "Attempt" ADD COLUMN "durationMs" INTEGER;

CREATE TABLE "AttemptLog" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AttemptLog_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AttemptLog_attemptId_createdAt_idx" ON "AttemptLog"("attemptId", "createdAt");

ALTER TABLE "AttemptLog" ADD CONSTRAINT "AttemptLog_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
