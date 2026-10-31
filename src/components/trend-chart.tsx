import type { TrendPoint } from "@/lib/trends";

export function TrendChart({ title, points }: { title: string; points: TrendPoint[] }) {
  const width = 640;
  const height = 160;
  const pad = 16;
  const max = Math.max(1, ...points.map((point) => point.value));
  const step = points.length > 1 ? (width - pad * 2) / (points.length - 1) : 0;
  const coords = points.map((point, index) => ({
    x: pad + index * step,
    y: height - pad - (point.value / max) * (height - pad * 2),
  }));
  let line = "";
  coords.forEach((point, index) => {
    if (index === 0) {
      line += `M ${point.x} ${point.y}`;
      return;
    }
    const prev = coords[index - 1];
    const mid = (prev.x + point.x) / 2;
    line += ` C ${mid} ${prev.y}, ${mid} ${point.y}, ${point.x} ${point.y}`;
  });
  const area = `${line} L ${coords.at(-1)?.x ?? pad} ${height - pad} L ${pad} ${height - pad} Z`;

  return (
    <figure className="rounded-3xl border bg-white p-4">
      <figcaption className="text-sm font-bold">{title}</figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-2 w-full h-40" role="img" aria-label={title}>
        <path d={area} fill="rgba(20,107,74,0.12)" />
        <path d={line} fill="none" stroke="#146b4a" strokeWidth="4" strokeLinecap="round" />
        {coords.map((point, index) => (
          <circle key={points[index].label} cx={point.x} cy={point.y} r="4" fill="#146b4a" />
        ))}
      </svg>
      <div className="grid text-[11px] text-muted-foreground" style={{ gridTemplateColumns: `repeat(${points.length}, minmax(0, 1fr))` }}>
        {points.map((point) => (
          <span key={point.label} className="text-center">
            {point.label}
            <span className="block font-bold text-foreground">{point.value}</span>
          </span>
        ))}
      </div>
    </figure>
  );
}
