# School Quest – Phase 1 Foundation Report

This document details the architectural decisions, database design, API structures, frontend components, deployment, and testing instructions for Phase 1 of School Quest.

---

## 1. Architectural Decisions & Rationale

*   **Framework: Next.js 15+ (React 19)**: Leverages Server Components (RSC) to serve initial pages directly from the edge. This provides rapid loading times on Ugandan 3G/4G networks, as minimal JavaScript is sent to the browser.
*   **Database: SQLite (Dev) / PostgreSQL (Prod)**: A highly structured relational database fits our strict academic level → subject → paper hierarchy perfectly. I designed the production schema with native Postgres types (`Json`, `Enum`) and fell back gracefully to SQLite (`String` mappings) for local ease-of-use.
*   **Auth: NextAuth (Auth.js v5)**: Replaced standard email auth with **Phone Number Credentials**. Phone numbers are the primary identifier in Uganda, mapping directly to Mobile Money accounts. 
*   **Payments: Simulated Mobile Money Webhooks**: Integrated a subscription status check that restricts exam execution if the 3-day trial is over and the user has not subscribed for **UGX 20,000 / month**. The payment simulator models the actual delay of a MoMo network request before persisting the extended date.
*   **UI/UX**: Large-touch, high-contrast, step-by-step wizard targets tailored for mobile devices and low-spec screens.

---

## 2. Database Schema (Prisma)

The structured relational data model maps out standard entity definitions:
```prisma
model User {
  id                 String    @id @default(cuid())
  phone              String?   @unique
  email              String?   @unique
  name               String?
  role               String    @default("STUDENT")
  trialStartsAt      DateTime?
  trialEndsAt        DateTime?
  subscriptionEndsAt DateTime?
  attempts           Attempt[]
}

model Level {
  id        String    @id @default(cuid())
  name      String    @unique // e.g. "Primary", "University"
  order     Int       @default(0)
  subjects  Subject[]
}

model Subject {
  id        String   @id @default(cuid())
  name      String
  levelId   String
  level     Level    @relation(fields: [levelId], references: [id], onDelete: Cascade)
  papers    Paper[]
}

model Paper {
  id        String     @id @default(cuid())
  title     String     
  year      Int?
  subjectId String
  subject   Subject    @relation(fields: [subjectId], references: [id], onDelete: Cascade)
  questions Question[]
  attempts  Attempt[]
}

model Question {
  id            String       @id @default(cuid())
  paperId       String
  paper         Paper        @relation(fields: [paperId], references: [id], onDelete: Cascade)
  type          String       // MULTIPLE_CHOICE, FILL_BLANK
  prompt        String
  options       String?      // Stringified JSON array of choices
  correctAnswer String       // Stringified JSON
  points        Int          @default(1)
  order         Int
}

model Attempt {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  paperId     String
  paper       Paper     @relation(fields: [paperId], references: [id], onDelete: Cascade)
  score       Int       @default(0)
  completedAt DateTime?
  answers     Answer[]
}

model Answer {
  id            String   @id @default(cuid())
  attemptId     String
  attempt       Attempt  @relation(fields: [attemptId], references: [id], onDelete: Cascade)
  questionId    String
  question      Question @relation(fields: [questionId], references: [id], onDelete: Cascade)
  studentAnswer String?  
  isCorrect     Boolean? 
  pointsAwarded Int?     
}
```

---

## 3. API & Server Actions Design

### `submitExam` (Server Action)
Processes a student's fully answered paper.
*   **Payload**: `{ paperId: string, answers: Record<string, string> }`
*   **Response**: `{ attemptId: string, score: number, totalQuestions: number, maxPoints: number }`
*   **Marking Rule**:
    *   *Multiple Choice*: Evaluates exact case-insensitive value.
    *   *Fill blank*: Performs trimmed case-insensitive matches against direct values or any string within a correct answers array (e.g., `["3", "three"]` both score points).

### `processMoMoPayment` (Server Action)
Simulates payment confirmation callback from Ugandan telecom operators.
*   **Payload**: `{ phone: string, provider: "MTN" | "AIRTEL" }`
*   **Operation**: Sleeps 1000ms, then advances `subscriptionEndsAt` by 30 days.

---

## 4. Frontend Component Structure

*   `/login`: Pure credential submission page.
*   `/dashboard`: Protected root showing `Level` card grid.
*   `/dashboard/levels/[levelId]`: Protected view showing `Subject` list under the selected level.
*   `/dashboard/subjects/[subjectId]`: Protected view showing available exam `Paper` cards.
*   `/dashboard/papers/[paperId]`: Main exam entrypoint checking active subscription, hosting `ExamPlayer`.
*   `/dashboard/papers/[paperId]/ExamPlayer.tsx`: Step-by-step wizard UI featuring:
    *   Progress indicator & current index labels.
    *   Large-touch multiple-choice selector buttons.
    *   Big-input text controls.
    *   Dynamic review view with total scores upon submission.
*   `/dashboard/subscribe`: Standard paywall triggered if trial is expired. Shows UGX 20,000 price point and MTN / Airtel radio selector.

---

## 5. End-To-End Testing Steps

1.  Start development server inside `/web`:
    ```bash
    npm run dev
    ```
2.  Navigate to `http://localhost:3000`. You will be automatically redirected to `/login`.
3.  Enter a phone number (e.g., `0772123456`) and any password. Click **Login / Start Free Trial**.
    *   *Note: This automatically provisions your user account and awards a 3-day free trial.*
4.  You are redirected to `/dashboard`. You will see our seeded Ugandan levels: `Nursery`, `Primary`, `Secondary O-Level`, `Secondary A-Level`, and `University`.
5.  Click on **Primary**.
6.  You will see two subjects: **Mathematics** and **English**. Click on **Mathematics**.
7.  Click on the past paper: **PLE Mathematics 2022**.
8.  The **Exam Player** loads:
    *   *Question 1*: `Work out: 24 + 13`. Choose `37` (Multiple Choice) and click Next.
    *   *Question 2*: Choose `Hundreds` and click Next.
    *   *Question 3*: `Complete the sentence: A triangle has _____ sides.` Fill in `3` or `three` (Fill-in-the-blank) and click Next.
    *   *Question 4*: Fill in `20` and click **Submit Paper**.
9.  Observe the clean results summary page showing your instant score.

---

## 6. How to Test Subscription Paywall

To test the payment wall, you can simulate an expired trial:
1.  Open the SQLite database (e.g., using any database viewer or via Prisma Studio):
    ```bash
    npx prisma studio
    ```
2.  Edit your user record: set `trialEndsAt` to a past date (e.g., yesterday). Ensure `subscriptionEndsAt` is empty or also in the past.
3.  Refresh `/dashboard`. Try clicking on **Primary** -> **Mathematics** -> **PLE Mathematics 2022**.
4.  You will be automatically blocked and redirected to `/dashboard/subscribe`.
5.  Confirm that the paywall is displayed, enter a test MTN/Airtel phone number, and click **Pay UGX 20,000**.
6.  Once approved, you are redirected back to the dashboard, and subscription access is fully restored!

---

## 7. Known Limitations & Next Steps

*   **Security**: Password hashing is bypassed in this rapid Phase 1 prototype but will be enabled before public launch.
*   **Database**: SQLite is used for instant local verification but will be mapped to production PostgreSQL in Phase 4.
*   **OCR & AI Ingestion (Phase 2)**: Currently utilizing seeded mock JSON questions. The complete ingestion pipeline will be established next.
