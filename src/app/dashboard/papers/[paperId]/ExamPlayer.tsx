"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, CheckCircle2, RefreshCw, Loader2 } from "lucide-react";
import { submitExam } from "./actions";
import DrawingCanvas from "@/components/DrawingCanvas";
import Link from "next/link";

interface Question {
  id: string;
  type: string;
  prompt: string;
  options: string | null; // JSON string array of options
  points: number;
}

interface ExamPlayerProps {
  paperId: string;
  paperTitle: string;
  questions: Question[];
}

export default function ExamPlayer({ paperId, paperTitle, questions }: ExamPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    totalQuestions: number;
    maxPoints: number;
    attemptId: string;
  } | null>(null);

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-lg border border-dashed max-w-lg mx-auto my-12">
        <p className="text-gray-500">This paper does not have any questions yet.</p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Display results if submitted
  if (results) {
    return (
      <div className="max-w-2xl mx-auto my-8 space-y-6 animate-fade-in">
        <Card className="border-green-200 bg-green-50/30 text-center py-8 px-4">
          <CardHeader>
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <CardTitle className="text-3xl font-extrabold text-green-800 mt-4">
              Exam Submitted!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Great job completing {paperTitle}!</p>
            <div className="inline-block bg-white border border-green-200 px-8 py-4 rounded-xl shadow-sm">
              <span className="text-5xl font-black text-green-600">{results.score}</span>
              <span className="text-gray-400 text-xl"> / {results.maxPoints} pts</span>
            </div>
            <p className="text-sm text-green-700 font-medium">
              You answered {results.totalQuestions} questions.
            </p>
          </CardContent>
          <CardFooter className="justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Back to Dashboard
              </Button>
            </Link>
            <Button size="lg" onClick={() => {
              setAnswers({});
              setResults(null);
              setCurrentIdx(0);
            }} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Practice Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  // Parse options for multiple choice
  let parsedOptions: string[] = [];
  if (currentQuestion.options) {
    try {
      parsedOptions = JSON.parse(currentQuestion.options);
    } catch {
      parsedOptions = [];
    }
  }

  const handleAnswer = (val: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitExam({
        paperId,
        answers,
      });
      setResults(res);
    } catch (err: any) {
      alert(err.message || "Something went wrong submitting your paper.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputArea = () => {
    switch (currentQuestion.type) {
      case "MULTIPLE_CHOICE":
        return (
          <div className="grid grid-cols-1 gap-3">
            {parsedOptions.map((opt, i) => {
              const isSelected = answers[currentQuestion.id] === opt;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-semibold text-lg transition-all flex items-center justify-between active:scale-[0.98] ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-primary bg-primary" : "border-gray-300"
                  }`}>
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case "DRAWING":
        return (
          <div className="space-y-2">
            <span className="text-sm font-semibold text-gray-500 block mb-2">Draw inside the canvas:</span>
            <DrawingCanvas
              onChange={handleAnswer}
              defaultValue={answers[currentQuestion.id]}
            />
          </div>
        );

      case "COMPREHENSION":
      case "SHORT_ANSWER":
        return (
          <div className="space-y-2">
            <span className="text-sm font-semibold text-gray-500 block mb-2">Write your complete answer below:</span>
            <Textarea
              placeholder="Start typing your response..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="min-h-[120px] text-lg p-4 border-2 font-medium"
            />
          </div>
        );

      default: // FILL_BLANK & standard fallback
        return (
          <div className="space-y-2 max-w-md">
            <span className="text-sm font-semibold text-gray-500 block mb-2">Write your answer below:</span>
            <Input
              type="text"
              placeholder="Type answer here..."
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="py-7 px-4 text-xl font-semibold border-2"
            />
          </div>
        );
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "MULTIPLE_CHOICE": return "Multiple Choice";
      case "FILL_BLANK": return "Fill in the Blank";
      case "SHORT_ANSWER": return "Short Answer";
      case "COMPREHENSION": return "Comprehension";
      case "DRAWING": return "Drawing Question";
      default: return "Question";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header & Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-500">
          <span>{paperTitle}</span>
          <span>Question {currentIdx + 1} of {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <Card className="shadow-lg border-2 border-gray-100 min-h-[350px] flex flex-col justify-between">
        <CardHeader>
          <span className="text-xs font-black tracking-wider uppercase text-gray-400">
            {getQuestionTypeLabel(currentQuestion.type)} ({currentQuestion.points} pt)
          </span>
          <CardTitle className="text-2xl font-bold text-gray-800 leading-snug mt-2">
            {currentQuestion.prompt}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 py-4">
          {renderInputArea()}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-gray-50/50 py-4 px-6 rounded-b-lg">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={currentIdx === 0 || isSubmitting}
            className="gap-2 text-md py-6"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </Button>

          {currentIdx === questions.length - 1 ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 text-md font-bold py-6 gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Grading Paper with AI...
                </>
              ) : (
                "Submit Paper"
              )}
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              disabled={isSubmitting}
              className="gap-2 text-md py-6 px-6"
            >
              Next <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
