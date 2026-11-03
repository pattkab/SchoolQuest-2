"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export const DATA_SAVER_KEY = "schoolquest.dataSaver";

export function dataSaverEnabled() {
  try { return localStorage.getItem(DATA_SAVER_KEY) === "1"; } catch { return false; }
}

export function StudentsPhoto({ className, priority = false }: { className?: string; priority?: boolean }) {
  const [saver, setSaver] = useState(false);
  useEffect(() => {
    const read = () => setSaver(dataSaverEnabled());
    read();
    window.addEventListener("schoolquest:data-saver", read);
    return () => window.removeEventListener("schoolquest:data-saver", read);
  }, []);
  if (saver) return <p className={className}>Photo hidden to save data.</p>;
  return (
    <Image
      src="/hero-students.jpg"
      alt="Two learners smiling together in their classroom"
      width={960}
      height={768}
      priority={priority}
      sizes="(min-width: 64rem) 50vw, 100vw"
      className={className}
    />
  );
}
