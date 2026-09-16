# School Quest – Phase 2 PDF Intelligence Report

This document details the PDF ingestion, OCR, layout extraction pipelines, and Admin / Teacher Review Dashboard added in Phase 2.

---

## 1. Modern Architectural Innovation: Multi-Modal Gemini Extraction

Standard OCR pipelines require:
1.  **PDF Splitting / Image Conversion**: Converting PDF pages to high-resolution JPEG/PNG files.
2.  **Tesseract / Google Vision OCR**: Extracting raw string blocks.
3.  **Layout Analysis**: Heuristically identifying margins and columns.
4.  **Heuristic Segmentation**: Regex parsing to break questions apart.
5.  **Data Modeling**: Parsing segment text into structured JSON models.

This traditional approach is highly fragile, failing easily on scanned, skewed, or dirty papers typical of Ugandan school records.

### The School Quest Solution
We bypassed this fragile pipeline entirely by employing **Gemini 1.5/2.0 Flash (via Google Cloud Vertex AI)**. 
Gemini natively supports **direct PDF multi-modal reading**. We transmit the raw PDF buffer as base64 alongside a specialized curriculum-aligned engineering prompt. Gemini executes OCR, corrects spelling errors, performs layout segmentation, maps answers, and returns a direct structured JSON conformant array.

---

## 2. API & Server Actions

### `parseUploadedPDF` (Server Action)
Executes extraction of questions on the fly.
*   **Payload**: `FormData` containing the file field `pdf`.
*   **Response**: `Array<ExtractedQuestion>` (the raw schema before manual correction).

### `saveParsedPaper` (Server Action)
Persists the approved paper details and final corrected questions to PostgreSQL/SQLite.
*   **Payload**: `{ title: string, year: number, subjectId: string, questions: Array<EditableQuestion> }`
*   **Redirects**: Takes the teacher back to the Subject Paper list screen upon completion.

---

## 3. Review Interface Features (Teacher Panel)

The `/dashboard/teacher/upload` panel is highly interactive:
1.  **Paper Meta Settings**: Set Title, Exam Year, Curriculum Level, and Subject.
2.  **Multimodal File Dropzone**: Accepts files up to 20MB. Includes a full loading state while Gemini reviews the PDF.
3.  **Visual Question Builder**: Once extracted, it displays fully-rendered card forms for every question.
    *   **Question Text Input**: Change or correct spelling on the fly.
    *   **Points Selector**: Directly change standard points allocation.
    *   **Question Type Dropdown**: Swap seamlessly between MCQ and Fill-In-The-Blank types.
    *   **Interactive MCQ Choice List**: Add or modify option values instantly.
    *   **Fuzzy Correct Answer Config**: Specify single exact strings or comma-separated arrays of acceptable spelling varieties.

---

## 4. End-to-End Testing Phase 2

1.  Log in as any registered user.
2.  In the header navigation bar, click on **Teacher Panel**.
3.  Provide paper metadata:
    *   **Paper Title**: `PLE English 2024`
    *   **Year**: `2024`
    *   **Level**: `Primary`
    *   **Subject**: `English`
4.  Select a valid PDF exam paper (either a clean digital paper or a low-quality scanned paper) and click **Extract Questions**.
5.  Observe the processing spinner. Within seconds, you will see a detailed visual layout of all parsed questions!
6.  Modify the prompts, correct the answers, and adjust the option lists.
7.  Click **Approve & Publish Paper**.
8.  You are redirected back to the English papers listing where your newly generated, fully interactive past paper is immediately ready to be practiced!
