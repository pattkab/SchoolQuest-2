export function ProfileAvatar({ name, image, className }: { name?: string | null; image?: string | null; className?: string }) {
  if (image) {
    return (
      // Google profile photos reject some referrers, so the browser requests them directly.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={image} alt="" referrerPolicy="no-referrer" className={className ? `${className} profile-photo` : "profile-photo"} />
    );
  }
  const initials = (name || "SQ").split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("");
  return <span className={className}>{initials}</span>;
}
