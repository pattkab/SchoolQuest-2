"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function PullToRefresh() {
  const router = useRouter();
  const [distance, setDistance] = useState(0);
  const startY = useRef(0);
  const pulling = useRef(false);
  const distanceRef = useRef(0);

  useEffect(() => {
    const onStart = (event: TouchEvent) => {
      if (window.scrollY > 4) return;
      pulling.current = true;
      startY.current = event.touches[0].clientY;
    };
    const onMove = (event: TouchEvent) => {
      if (!pulling.current) return;
      const next = Math.max(0, Math.min(64, event.touches[0].clientY - startY.current));
      distanceRef.current = next;
      setDistance(next);
    };
    const onEnd = () => {
      if (pulling.current && distanceRef.current > 52) router.refresh();
      pulling.current = false;
      distanceRef.current = 0;
      setDistance(0);
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };
  }, [router]);

  if (!distance) return null;
  return <div className="pull-indicator" style={{ height: distance }}>Release to refresh</div>;
}
