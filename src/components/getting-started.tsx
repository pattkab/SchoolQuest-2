import Link from "next/link";

export function GettingStarted({ title = "Getting started", intro, steps }: {
  title?: string;
  intro?: string;
  steps: ReadonlyArray<{ title: string; detail: string; href?: string }>;
}) {
  return (
    <details open className="rounded-3xl border bg-background p-5">
      <summary className="cursor-pointer font-display text-xl">{title}</summary>
      {intro && <p className="mt-2 text-sm text-muted-foreground">{intro}</p>}
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border p-3">
            <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full bg-muted text-xs font-bold">{index + 1}</span>
            {step.href ? <Link href={step.href} className="font-bold text-primary underline underline-offset-4">{step.title}</Link> : <span className="font-bold">{step.title}</span>}
            <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
          </li>
        ))}
      </ol>
    </details>
  );
}
