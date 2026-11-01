"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Hit = { id: string; name: string; district: string; level: string };

export function SchoolField({ defaultLabel = "" }: { defaultLabel?: string }) {
  const [query, setQuery] = useState(defaultLabel);
  const [hits, setHits] = useState<Hit[]>([]);
  const [picked, setPicked] = useState<Hit | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (picked && query === picked.name) return;
    if (query.trim().length < 2) return;
    const timer = setTimeout(async () => {
      const response = await fetch(`/api/schools?q=${encodeURIComponent(query)}`);
      if (!response.ok) return;
      setHits(await response.json());
      setOpen(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, picked]);

  return (
    <div className="space-y-2">
      <Label htmlFor="school-search">School</Label>
      <Input
        id="school-search"
        value={query}
        autoComplete="off"
        placeholder="Type a school name"
        className="h-12 rounded-2xl"
        onChange={(event) => {
          setQuery(event.target.value);
          if (event.target.value.trim().length < 2) setHits([]);
          setPicked(null);
          setOpen(true);
        }}
        onFocus={() => hits.length && setOpen(true)}
      />
      <input type="hidden" name="emisSchoolId" value={picked?.id || ""} />
      {picked && (
        <p className="text-sm font-semibold text-muted-foreground">
          {picked.district} · {picked.level}
        </p>
      )}
      {open && hits.length > 0 && !picked && (
        <ul className="max-h-56 overflow-auto rounded-2xl border bg-white">
          {hits.map((school) => (
            <li key={school.id}>
              <button
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-muted"
                onClick={() => {
                  setPicked(school);
                  setQuery(school.name);
                  setOpen(false);
                }}
              >
                <span className="block text-sm font-bold">{school.name}</span>
                <span className="block text-xs text-muted-foreground">{school.district} · {school.level}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
