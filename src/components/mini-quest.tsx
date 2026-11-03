"use client";

import { useRef, useState } from "react";
import { playQuestSound, prepareQuestSound } from "@/lib/quest-sounds";

const questions = [
  { prompt: "What comes next: 2, 4, 6, …?", options: ["7", "8", "10"], answer: "8", hint: "Count in twos. Add two to six." },
  { prompt: "Which word rhymes with rain?", options: ["Train", "Tree", "Book"], answer: "Train", hint: "Say the words aloud and listen to their endings." },
  { prompt: "Which part of a bean plant usually grows down into the soil?", options: ["Flower", "Leaf", "Root"], answer: "Root", hint: "Think about the part that holds the plant in place." },
];

export function MiniQuest() {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  const question = questions[step];
  const correct = choice === question?.answer;

  function move(next: number) {
    setStep(next);
    setChoice("");
    title.current?.focus();
  }

  return (
    <div className="rounded-2xl border bg-background p-4">
      <h3 ref={title} tabIndex={-1} className="font-display text-lg">Kito’s mini quest</h3>
      {!question ? (
        <>
          <p role="status" className="quiz-celebration my-2 font-bold">Quest complete! You solved all three challenges.</p>
          <button type="button" className="quest-button" onClick={() => move(0)}>Play again</button>
        </>
      ) : (
        <>
          <p className="mt-1 text-sm text-muted-foreground">Challenge {step + 1} of {questions.length} · No timer</p>
          <fieldset className="mt-3">
            <legend className="mb-2 font-bold">{question.prompt}</legend>
            <div className="flex flex-wrap gap-2">
              {question.options.map(option => (
                <button type="button" key={option} aria-pressed={choice === option} disabled={correct}
                  className="min-h-11 rounded-xl border px-4 py-2 font-bold aria-pressed:border-primary aria-pressed:bg-primary/10"
                  onClick={() => {
                    setChoice(option);
                    if (option === question.answer) {
                      prepareQuestSound();
                      playQuestSound("correct");
                    }
                  }}>{option}</button>
              ))}
            </div>
          </fieldset>
          <p role="status" className="my-2 min-h-6">{choice && (correct ? "You got it!" : question.hint)}</p>
          {correct && <button type="button" className="quest-button" onClick={() => {
            if (step === questions.length - 1) {
              prepareQuestSound();
              playQuestSound("complete");
            }
            move(step + 1);
          }}>{step === questions.length - 1 ? "Finish quest" : "Next challenge"}</button>}
        </>
      )}
    </div>
  );
}
