"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseUploadedPDF, saveParsedPaper } from "./actions";
import { FileText, Loader2, Plus, Trash2, CheckCircle } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  levelId: string;
}

interface Level {
  id: string;
  name: string;
  subjects: Subject[];
}

interface UploadFormProps {
  levels: Level[];
}

interface EditableQuestion {
  type: string;
  prompt: string;
  options: string[] | null;
  correctAnswer: any;
  points: number;
}

export default function UploadForm({ levels }: UploadFormProps) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [questions, setQuestions] = useState<EditableQuestion[]>([]);

  const activeLevel = levels.find((l) => l.id === selectedLevelId);
  const subjects = activeLevel ? activeLevel.subjects : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleExtract = async () => {
    if (!pdfFile) return alert("Please select a PDF file first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const res = await parseUploadedPDF(formData);
      setQuestions(res.questions);
      setPdfUrl(res.pdfUrl);
    } catch (err: any) {
      alert(err.message || "Failed to parse PDF questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePaper = async () => {
    if (!title) return alert("Please provide a paper title.");
    if (!selectedSubjectId) return alert("Please select a subject.");
    if (questions.length === 0) return alert("No questions to save.");

    setSaving(true);
    try {
      await saveParsedPaper({
        title,
        year: Number(year),
        subjectId: selectedSubjectId,
        pdfUrl,
        questions,
      });
    } catch (err: any) {
      alert(err.message || "Failed to save paper.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateQuestion = (index: number, updatedFields: Partial<EditableQuestion>) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === index ? { ...q, ...updatedFields } : q))
    );
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddQuestion = () => {
    const newQ: EditableQuestion = {
      type: "MULTIPLE_CHOICE",
      prompt: "New Question",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      points: 1,
    };
    setQuestions((prev) => [...prev, newQ]);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Upload & Parse Exam PDF</CardTitle>
          <CardDescription>
            Import papers directly via PDF. Gemini extracts questions into interactive forms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Paper Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Paper Title</Label>
              <Input
                id="title"
                placeholder="e.g., PLE Mathematics 2024"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="py-5"
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="py-5"
              />
            </div>

            {/* Level Selector */}
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <select
                id="level"
                value={selectedLevelId}
                onChange={(e) => {
                  setSelectedLevelId(e.target.value);
                  setSelectedSubjectId("");
                }}
                className="w-full border rounded-lg p-3 bg-white text-base h-[50px]"
              >
                <option value="">-- Select Level --</option>
                {levels.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                value={selectedSubjectId}
                disabled={!selectedLevelId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full border rounded-lg p-3 bg-white text-base h-[50px] disabled:bg-gray-100"
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PDF File Picker */}
          <div className="border-2 border-dashed rounded-xl p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
            <input
              type="file"
              accept=".pdf"
              id="pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="pdf" className="cursor-pointer space-y-3 block">
              <FileText className="h-12 w-12 text-primary mx-auto" />
              <div className="space-y-1">
                <span className="font-bold text-lg text-primary block">
                  {pdfFile ? pdfFile.name : "Select past paper PDF"}
                </span>
                <span className="text-gray-500 text-sm block">
                  Supports clean or scanned/scraped PDF past papers
                </span>
              </div>
            </label>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            size="lg"
            onClick={handleExtract}
            disabled={loading || !pdfFile}
            className="w-full md:w-auto text-base font-bold py-6 gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Analyzing PDF with Gemini OCR...
              </>
            ) : (
              "Extract Questions"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Extracted / Editable Questions List */}
      {questions.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Review Questions ({questions.length})
            </h3>
            <Button variant="outline" onClick={handleAddQuestion} className="gap-2">
              <Plus className="h-4 w-4" /> Add Question
            </Button>
          </div>

          <div className="space-y-4">
            {questions.map((q, qIdx) => (
              <Card key={qIdx} className="border-2 border-gray-100">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-primary">Question {qIdx + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveQuestion(qIdx)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Prompt */}
                  <div className="space-y-2">
                    <Label>Question Text</Label>
                    <Input
                      value={q.prompt}
                      onChange={(e) => handleUpdateQuestion(qIdx, { prompt: e.target.value })}
                      className="py-4"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Type Selector */}
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <select
                        value={q.type}
                        onChange={(e) => {
                          const newType = e.target.value;
                          handleUpdateQuestion(qIdx, {
                            type: newType,
                            options: newType === "MULTIPLE_CHOICE" ? ["Option A", "Option B", "Option C", "Option D"] : null,
                            correctAnswer: newType === "MULTIPLE_CHOICE" ? "Option A" : "",
                          });
                        }}
                        className="w-full border rounded-lg p-2.5 bg-white text-sm"
                      >
                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                        <option value="FILL_BLANK">Fill in the blank</option>
                      </select>
                    </div>

                    {/* Points */}
                    <div className="space-y-2">
                      <Label>Points</Label>
                      <Input
                        type="number"
                        value={q.points}
                        onChange={(e) => handleUpdateQuestion(qIdx, { points: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  {/* MCQ Options */}
                  {q.type === "MULTIPLE_CHOICE" && q.options && (
                    <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
                      <Label className="font-bold">Multiple Choice Options</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-400">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <Input
                              value={opt}
                              onChange={(e) => {
                                const newOpts = [...(q.options || [])];
                                newOpts[oIdx] = e.target.value;
                                handleUpdateQuestion(qIdx, { options: newOpts });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Correct Answer */}
                  <div className="space-y-2">
                    <Label className="font-bold text-green-600">Correct Answer</Label>
                    {q.type === "MULTIPLE_CHOICE" && q.options ? (
                      <select
                        value={q.correctAnswer}
                        onChange={(e) => handleUpdateQuestion(qIdx, { correctAnswer: e.target.value })}
                        className="w-full border rounded-lg p-2.5 bg-white text-sm"
                      >
                        {q.options.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        placeholder="Acceptable answers (use commas for options: e.g. three, 3)"
                        value={Array.isArray(q.correctAnswer) ? q.correctAnswer.join(", ") : q.correctAnswer}
                        onChange={(e) => {
                          const val = e.target.value;
                          const mappedAns = val.includes(",")
                            ? val.split(",").map((s) => s.trim())
                            : val.trim();
                          handleUpdateQuestion(qIdx, { correctAnswer: mappedAns });
                        }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            size="lg"
            onClick={handleSavePaper}
            disabled={saving}
            className="w-full py-7 text-lg font-bold gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Saving Exam Paper...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" /> Approve & Publish Paper
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
