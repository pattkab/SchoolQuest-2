import Link from "next/link";
import { ArrowUpRight, Calculator, Clapperboard, Gamepad2, Leaf, Play, Tv } from "lucide-react";
import { MiniQuest } from "./mini-quest";

const videos = [
  { title: "Count to ten", creator: "Numberblocks", level: "Early primary · Maths", id: "k4i6fu0bTQ8", icon: Play },
  { title: "How does a seed become a plant?", creator: "SciShow Kids", level: "Primary · Science", id: "tkFPyue5X3Q", icon: Leaf },
  { title: "Fractions are parts", creator: "Math Antics", level: "Upper primary · Maths", id: "CA9XLJpQp3c", icon: Calculator },
];

export function LearnerExtras({ quizId }: { quizId?: string }) {
  return (
    <>
      <section id="educational-videos" className="quest-panel scroll-mt-24 space-y-4" aria-labelledby="educational-videos-title">
        <div>
          <h2 id="educational-videos-title" className="flex items-center gap-2 font-display text-2xl"><Tv aria-hidden="true" /> Educational videos</h2>
          <p className="mt-1 text-sm text-muted-foreground">Watch a lesson on YouTube with a grown-up or teacher.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {videos.map(({ title, creator, level, id, icon: Icon }) => (
            <li key={id}>
              <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer"
                className="learner-activity tone-lilac h-full">
                <Icon aria-hidden="true" className="h-6 w-6" />
                <strong>{title}</strong>
                <span>{creator} · {level}</span>
                <span className="inline-flex items-center gap-1 font-bold">Opens YouTube <ArrowUpRight aria-hidden="true" size={14} /></span>
              </a>
            </li>
          ))}
          <li className="learner-activity tone-peach">
            <Clapperboard aria-hidden="true" className="h-6 w-6" />
            <strong>School Quest on YouTube</strong>
            <span>Coming soon · School Quest’s own learning videos</span>
          </li>
        </ul>
      </section>

      <section id="edutainment" className="quest-panel scroll-mt-24 space-y-4" aria-labelledby="edutainment-title">
        <div>
          <h2 id="edutainment-title" className="flex items-center gap-2 font-display text-2xl"><Gamepad2 aria-hidden="true" /> Edutainment</h2>
          <p className="mt-1 text-sm text-muted-foreground">Learn through play with quick puzzles and quizzes.</p>
        </div>
        <MiniQuest />
        {quizId && <Link href={`/dashboard/papers/${quizId}`} className="quest-button quest-button-secondary">Try a class quiz</Link>}
      </section>
    </>
  );
}
