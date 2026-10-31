"use client";

export function PrintButton() {
  return (
    <button type="button" className="no-print h-11 rounded-2xl border px-4 font-bold" onClick={() => window.print()}>
      Print
    </button>
  );
}
