"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Undo, Trash2, Pencil, Eraser } from "lucide-react";

interface DrawingCanvasProps {
  onChange: (base64Image: string) => void;
  defaultValue?: string;
}

export default function DrawingCanvas({ onChange, defaultValue }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsSubDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [lineWidth, setLineWidth] = useState(4);
  const [undoStack, setUndoStack] = useState<string[]>([]);

  // Setup canvas with touch support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set brush standards
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Load default if exists
    if (defaultValue) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = defaultValue;
    } else {
      // Clear with white background (crucial for OCR/Vision models)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [defaultValue]);

  const saveToUndoStack = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setUndoStack((prev) => [...prev, canvas.toDataURL()]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    saveToUndoStack();

    setIsSubDrawing(true);
    ctx.beginPath();

    const { x, y } = getCoordinates(e, canvas);
    ctx.moveTo(x, y);

    // Prevent scrolling on touch screens
    if (e.cancelable) e.preventDefault();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);
    
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;

    ctx.lineTo(x, y);
    ctx.stroke();

    if (e.cancelable) e.preventDefault();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsSubDrawing(false);
    
    const canvas = canvasRef.current;
    if (canvas) {
      onChange(canvas.toDataURL("image/png"));
    }
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    
    // Scale coordinate mapping based on actual bounding box vs internal canvas width
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: ((e.touches[0].clientX - rect.left) / rect.width) * canvas.width,
        y: ((e.touches[0].clientY - rect.top) / rect.height) * canvas.height,
      };
    } else {
      return {
        x: ((e.clientX - rect.left) / rect.width) * canvas.width,
        y: ((e.clientY - rect.top) / rect.height) * canvas.height,
      };
    }
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prevStates = [...undoStack];
    const prevState = prevStates.pop();
    setUndoStack(prevStates);

    if (prevState) {
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        onChange(canvas.toDataURL("image/png"));
      };
      img.src = prevState;
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    saveToUndoStack();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    onChange("");
  };

  return (
    <div className="space-y-4">
      {/* Tool bar */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 border rounded-lg justify-between">
        <div className="flex items-center gap-2">
          {/* Pencil & Eraser */}
          <Button
            type="button"
            variant={tool === "pencil" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("pencil")}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" /> Draw
          </Button>
          <Button
            type="button"
            variant={tool === "eraser" ? "default" : "outline"}
            size="sm"
            onClick={() => setTool("eraser")}
            className="gap-2"
          >
            <Eraser className="h-4 w-4" /> Eraser
          </Button>
        </div>

        {/* Color Palette */}
        {tool === "pencil" && (
          <div className="flex items-center gap-1">
            {["#000000", "#ef4444", "#3b82f6", "#22c55e", "#f59e0b"].map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => setColor(hex)}
                className={`h-7 w-7 rounded-full border-2 transition-transform ${
                  color === hex ? "scale-110 border-gray-400" : "border-transparent"
                }`}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={handleClear}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="border-4 border-gray-100 rounded-xl overflow-hidden bg-white max-w-full">
        <canvas
          ref={canvasRef}
          width={600}
          height={350}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-auto cursor-crosshair touch-none"
        />
      </div>
    </div>
  );
}
