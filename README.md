# School Quest 🇺🇬

School Quest is a modern, digital examination and practice platform built specifically for the Ugandan curriculum (Nursery to University). It is designed with a premium, low-bandwidth, and mobile-first UI/UX for students utilizing low-end Android phones. 

## Features
- **Admin PDF Ingestion Pipeline**: Admins can upload raw, scanned PDF past papers. Gemini 1.5 Flash natively performs OCR, layout segmentation, and outputs fully interactive questions.
- **Interactive Mobile Canvas**: Dedicated HTML5 canvas for drawing questions, specifically scaled and optimized for touch interactions.
- **Instant AI Grading**: Rule-based grading for Multiple Choice/Fill in the Blank, and LLM-assisted semantic and vision grading for short answers and drawings.
- **Student Dashboard & Badges**: Tracks progress, identifies weak areas, and rewards practice streaks.
- **MoMo Subscriptions**: Integrated 3-day free trials transitioning to a UGX 20,000 monthly subscription flow.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Server Actions)
- **Database**: PostgreSQL (via Prisma) — *defaults to SQLite for instant local dev testing*
- **Authentication**: NextAuth.js (Auth.js) custom Phone Provider
- **UI/UX**: Tailwind CSS v4, shadcn/ui, Framer Motion
- **AI Engine**: Google Gen AI (Vertex AI)

## Deploy to Vercel

The easiest way to deploy this project is via Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fschoolquest)

### Required Environment Variables

You must configure the following in your Vercel Project Settings:
```env
# Database Connection (Postgres recommended)
DATABASE_URL="postgresql://username:password@host:5432/schoolquest"

# NextAuth Secret
AUTH_SECRET="generate-a-strong-32-char-random-string"

# Google Cloud Vertex AI (For OCR & AI Grading)
GOOGLE_CLOUD_PROJECT="your-gcp-project-id"
GOOGLE_CLOUD_LOCATION="us-central1"
GOOGLE_GENAI_USE_VERTEXAI="True"
```

## Local Development

1. **Clone and Install**
   ```bash
   git clone https://github.com/your-username/schoolquest.git
   cd schoolquest
   npm install
   ```

2. **Configure Local Database (SQLite by default)**
   We use SQLite by default to make local onboarding instant without requiring Docker.
   ```bash
   # Push schema to SQLite
   npx prisma db push
   # Seed standard Ugandan Levels & subjects
   npx tsx prisma/seed.ts
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Role-Based Access Control

By design, **ONLY Admins** can upload and parse past papers.
To elevate a user to Admin for testing:
1. Open Prisma Studio: `npx prisma studio`
2. Navigate to the `User` table.
3. Change your user`s role from `STUDENT` to `ADMIN` or `SUPER_ADMIN`.
4. Refresh your dashboard to see the **Admin Upload** and **Reports** tabs.

## UI/UX Principles
The UI relies heavily on our tailored `globals.css`. Do not alter the core color palette. 
- *Primary*: Soft Emerald Green (`#10b981`)
- *Secondary*: Sky Blue (`#0ea5e9`)
- Elements use maximum border-radius (`rounded-2xl`, `rounded-3xl`) and soft shadows for a non-intimidating, friendly educational aesthetic.
