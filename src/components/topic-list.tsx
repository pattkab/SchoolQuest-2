import Link from "next/link";
import type { LinkedTopic } from "@/lib/topics";

function TopicTitle({ topic }: { topic: LinkedTopic }) {
  const items = [
    ...topic.notes.map((note) => ({ ...note, href: `/dashboard/notes/${note.id}` })),
    ...topic.papers.map((paper) => ({ ...paper, href: `/dashboard/papers/${paper.id}` })),
  ];
  const [first, ...rest] = items;
  return (
    <div className="py-2.5 border-b last:border-0">
      {first ? (
        <Link href={first.href} className="font-bold text-primary">
          {topic.name}
        </Link>
      ) : (
        <span className="font-semibold">{topic.name}</span>
      )}
      {rest.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {rest.map((item) => (
            <Link key={item.id} href={item.href} className="text-sm font-bold text-primary">
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopicList({ topics }: { topics: LinkedTopic[] }) {
  const terms = [1, 2, 3].filter((term) => topics.some((topic) => topic.term === term));
  const groups = terms.map((term) => ({
    label: `Term ${term}`,
    items: topics.filter((topic) => topic.term === term),
  }));
  const other = topics.filter((topic) => topic.term !== 1 && topic.term !== 2 && topic.term !== 3);
  if (other.length) groups.push({ label: "Topics", items: other });

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section key={group.label}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{group.label}</h3>
          <div className="mt-1 rounded-3xl border bg-white px-4">
            {group.items.map((topic) => (
              <TopicTitle key={topic.id} topic={topic} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
