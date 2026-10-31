"use client";

import { useEffect, useRef, useState } from "react";
import { markAttendanceAction } from "@/app/actions/school";

type Detector = { detect: (source: CanvasImageSource) => Promise<{ rawValue: string }[]> };

export function QrScan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  async function submit(code: string) {
    const result = await markAttendanceAction(code);
    setMessage(result.message);
  }

  async function start() {
    setScanning(true);
    setMessage("");
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).catch(() => null);
    const video = videoRef.current;
    if (!stream || !video) {
      setScanning(false);
      setMessage("Camera blocked. Type the ID.");
      return;
    }
    video.srcObject = stream;
    await video.play();
    const DetectorCtor = (window as unknown as { BarcodeDetector?: new (opts: { formats: string[] }) => Detector }).BarcodeDetector;
    if (!DetectorCtor) {
      stream.getTracks().forEach((track) => track.stop());
      setScanning(false);
      setMessage("This browser cannot scan. Type the ID.");
      return;
    }
    const detector = new DetectorCtor({ formats: ["qr_code"] });
    let alive = true;
    stopRef.current = () => {
      alive = false;
      stream.getTracks().forEach((track) => track.stop());
      setScanning(false);
    };
    const tick = async () => {
      if (!alive) return;
      const codes = await detector.detect(video).catch(() => []);
      const value = codes[0]?.rawValue;
      if (value) {
        stopRef.current?.();
        await submit(value);
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button type="button" onClick={start} className="h-12 rounded-2xl bg-primary px-5 text-white font-bold">
          {scanning ? "Scanning…" : "Scan QR"}
        </button>
        {scanning && (
          <button type="button" onClick={() => stopRef.current?.()} className="h-12 rounded-2xl border px-5 font-bold">
            Stop
          </button>
        )}
      </div>
      <video ref={videoRef} className={`w-full max-w-sm rounded-3xl bg-black ${scanning ? "" : "hidden"}`} muted playsInline />
      <form
        className="flex gap-2 max-w-md"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          void submit(String(data.get("code") || ""));
          event.currentTarget.reset();
        }}
      >
        <input name="code" placeholder="Student ID" className="h-12 flex-1 rounded-2xl border px-3" />
        <button type="submit" className="h-12 rounded-2xl border px-4 font-bold">Mark</button>
      </form>
      {message && <p className="font-bold">{message}</p>}
    </div>
  );
}
