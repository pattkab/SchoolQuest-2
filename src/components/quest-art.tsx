import { BookOpen, Sparkles, Pencil, GraduationCap, Star } from 'lucide-react';

export function QuestArt({ compact = false }: { compact?: boolean }) {
  return <div className={`quest-art ${compact ? 'quest-art-compact' : ''}`} aria-hidden="true">
    <div className="quest-orbit quest-orbit-outer" /><div className="quest-orbit quest-orbit-inner" />
    <div className="quest-book"><BookOpen strokeWidth={1.4} /><span className="quest-book-star"><Star fill="currentColor" /></span></div>
    <span className="quest-float quest-float-one"><Pencil /></span>
    <span className="quest-float quest-float-two"><GraduationCap /></span>
    <span className="quest-float quest-float-three"><Sparkles /></span>
    <span className="quest-dot quest-dot-one" /><span className="quest-dot quest-dot-two" />
    {!compact && <div className="quest-art-caption"><span>✦</span> A little curiosity. A big future.</div>}
  </div>;
}
