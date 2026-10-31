export type TrendPoint = { label: string; value: number };

function monday(date: Date) {
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  const offset = (day.getDay() + 6) % 7;
  day.setDate(day.getDate() - offset);
  return day;
}

export function weeklyCounts(dates: Date[], weeks = 8): TrendPoint[] {
  const start = monday(new Date());
  start.setDate(start.getDate() - (weeks - 1) * 7);
  return Array.from({ length: weeks }, (_, index) => {
    const from = new Date(start);
    from.setDate(start.getDate() + index * 7);
    const to = new Date(from);
    to.setDate(from.getDate() + 7);
    return {
      label: from.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      value: dates.filter((date) => date >= from && date < to).length,
    };
  });
}

export function monthlyCounts(dates: Date[], months = 6): TrendPoint[] {
  const now = new Date();
  return Array.from({ length: months }, (_, index) => {
    const from = new Date(now.getFullYear(), now.getMonth() - (months - 1 - index), 1);
    const to = new Date(from.getFullYear(), from.getMonth() + 1, 1);
    return {
      label: from.toLocaleDateString("en-GB", { month: "short" }),
      value: dates.filter((date) => date >= from && date < to).length,
    };
  });
}
