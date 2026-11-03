'use client';

import { useState } from 'react';
import DrawingCanvas from './DrawingCanvas';
import { DRAWING_DESCRIPTION_PREFIX } from '@/lib/accessibility-settings';

export function DrawingAnswer({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [describe, setDescribe] = useState(value.startsWith(DRAWING_DESCRIPTION_PREFIX));
  const [description, setDescription] = useState(value.startsWith(DRAWING_DESCRIPTION_PREFIX) ? value.slice(DRAWING_DESCRIPTION_PREFIX.length) : '');
  const [drawing, setDrawing] = useState(value.startsWith('data:image') ? value : '');
  function changeMode(next: boolean) {
    setDescribe(next);
    onChange(next ? (description.trim() ? DRAWING_DESCRIPTION_PREFIX + description : '') : drawing);
  }
  return <section aria-label="Drawing or text description answer" className="space-y-4" data-no-read-aloud>
    <div className="flex flex-wrap gap-2"><button type="button" className="a11y-action" aria-pressed={!describe} onClick={() => changeMode(false)}>Draw on the canvas</button><button type="button" className="a11y-action" aria-pressed={describe} onClick={() => changeMode(true)}>Describe in words instead</button></div>
    {describe ? <label className="block space-y-2"><span className="block font-bold">Describe your diagram or drawing</span><span className="block text-sm text-muted-foreground" id="drawing-description-help">Explain the shapes, labels and relationships you would draw. You can use your device’s keyboard dictation. A teacher will review this answer.</span><textarea aria-describedby="drawing-description-help" maxLength={5000} className="min-h-40 w-full rounded-2xl border bg-white p-4" value={description} onChange={event => { setDescription(event.target.value); onChange(event.target.value.trim() ? DRAWING_DESCRIPTION_PREFIX + event.target.value : ''); }} /></label> : <DrawingCanvas defaultValue={drawing} onChange={next => { setDrawing(next); onChange(next); }} />}
  </section>;
}
