const AFFILIATIONS = [
  "Ministry of Education (in progress)",
  "Ministry of Gender, Labour and Social Development (in progress)",
  "Fresh Teacher GitHub repository (in progress)",
];

export function SiteFooter() {
  const loop = [...AFFILIATIONS, ...AFFILIATIONS];
  return (
    <footer className="mt-8 border-t bg-[rgba(247,241,230,0.92)]">
      <p className="px-4 pt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
        GitHub files open on Fresh Teacher’s site. Permission to reuse them is in progress.
      </p>
      <div className="overflow-hidden py-3">
        <div className="marquee-track">
          {loop.map((item, index) => (
            <span key={`${item}-${index}`} className="px-8 text-sm font-bold whitespace-nowrap text-foreground/70">
              {item}
              <span className="mx-8 text-muted-foreground" aria-hidden>·</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
