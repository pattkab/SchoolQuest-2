import Link from "next/link";

export function DoorFace({ label }: { label: string }) {
  return (
    <>
      <span className="quest-door-panel" aria-hidden="true"><span className="quest-door-knob" /></span>
      <span className="quest-door-label">{label}</span>
    </>
  );
}

export function QuestDoor({ href, label, tone = 0 }: { href: string; label: string; tone?: number }) {
  const className = `quest-door tone-${tone % 4}`;
  if (href.startsWith("http")) {
    return <a href={href} target="_blank" rel="noreferrer" className={className} title={label}><DoorFace label={label} /></a>;
  }
  return <Link href={href} className={className} title={label}><DoorFace label={label} /></Link>;
}
