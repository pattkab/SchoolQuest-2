import LearnHome from "@/components/learn-home";

export default async function LearnPage({ searchParams }: { searchParams: Promise<{ class?: string; subject?: string; term?: string; mode?: string }> }) {
  return <LearnHome query={await searchParams} />;
}
