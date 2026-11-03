'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Accessibility, Volume2, Square, X } from 'lucide-react';
import { defaultAccessibility } from '@/lib/accessibility-settings';
import { updateAccessibility, useAccessibility } from '@/lib/accessibility-store';
import { readablePageText, startReadAloud, stopReadAloud, useReadAloud } from '@/lib/read-aloud';

export function SkipToContent() {
  return <a href="#main-content" className="skip-link" onClick={event => {
    const main = document.querySelector('main');
    if (main) { event.preventDefault(); main.tabIndex = -1; main.focus(); main.scrollIntoView({ block: 'start' }); }
  }}>Skip to content</a>;
}

export function ReadAloudButton({ label = 'Read aloud' }: { label?: string }) {
  const preferences = useAccessibility();
  const speech = useReadAloud();
  return <div data-no-read-aloud><button type="button" className="a11y-action" onClick={() => speech.speaking ? stopReadAloud() : void startReadAloud(readablePageText(), preferences.speechRate)}>
    {speech.speaking ? <Square aria-hidden="true" size={18} /> : <Volume2 aria-hidden="true" size={18} />}{speech.speaking ? 'Stop reading' : label}
  </button>{speech.message && <p className="mt-2 text-sm text-muted-foreground">{speech.message}</p>}</div>;
}

export function AccessibilityTools() {
  const details = useRef<HTMLDetailsElement>(null);
  const preferences = useAccessibility();
  const speech = useReadAloud();
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    let textSize = preferences.textSize;
    try {
      const saved = JSON.parse(localStorage.getItem('schoolquest.accessibility.v1') || '{}');
      if (saved.textSize) textSize = Number(saved.textSize);
    } catch { /* Keep the in-memory size if storage cannot be read. */ }
    root.style.fontSize = `${textSize}%`;
    root.dataset.a11yContrast = String(preferences.highContrast);
    root.dataset.a11ySpacing = String(preferences.spaciousText);
    root.dataset.a11yCalm = String(preferences.calmDisplay);
    root.dataset.a11yPaper = String(preferences.readingPaper);
    root.dataset.a11yScaled = String(preferences.textSize > 100);
  }, [preferences]);
  useEffect(() => {
    if (details.current) details.current.open = false;
    return () => stopReadAloud();
  }, [pathname]);
  useEffect(() => {
    const show = () => { if (details.current) details.current.open = true; };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && details.current) details.current.open = false; };
    window.addEventListener('schoolquest:accessibility', show);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('schoolquest:accessibility', show);
      window.removeEventListener('keydown', onKey);
    };
  }, []);
  useEffect(() => {
    const main = document.querySelector('main');
    if (main && !main.id) { main.id = 'main-content'; main.tabIndex = -1; }
    const observer = new ResizeObserver(() => {
      const root = document.documentElement;
      root.style.setProperty('--a11y-top-gap', `${document.querySelector('.mobile-app-bar')?.getBoundingClientRect().height || 0}px`);
      root.style.setProperty('--a11y-bottom-gap', `${document.querySelector('.mobile-bottom-nav')?.getBoundingClientRect().height || 0}px`);
    });
    document.querySelectorAll('.mobile-app-bar, .mobile-bottom-nav').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);
  return <>
    <div className="a11y-launcher no-print" data-no-read-aloud>
      {speech.speaking && <button type="button" className="a11y-stop" onClick={stopReadAloud}><Square aria-hidden="true" size={16} /> Stop audio</button>}
      <details ref={details} className="a11y-details">
        <summary className="a11y-open" aria-label="Accessibility"><Accessibility aria-hidden="true" size={22} /><span>Accessibility</span></summary>
        <div className="a11y-layer no-print" onClick={() => { if (details.current) details.current.open = false; }}>
      <div id="accessibility-dialog" role="dialog" aria-modal="true" aria-labelledby="accessibility-title" className="a11y-dialog" data-no-read-aloud onClick={event => event.stopPropagation()}>
        <div className="a11y-dialog-heading"><div><p className="eyebrow">LEARNING YOUR WAY</p><h2 id="accessibility-title">Accessibility</h2></div><button type="button" className="a11y-action" aria-label="Close accessibility settings" onClick={() => { if (details.current) details.current.open = false; }}><X aria-hidden="true" size={22} /></button></div>
        <p className="a11y-intro">Choose what makes learning easier. Preferences stay on this device when browser storage is available.</p>
        <fieldset className="a11y-group"><legend>Listen to learning</legend><p>Read the current lesson or page in English. Typed form answers and passwords are excluded.</p><ReadAloudButton label="Read this page aloud" /><label className="a11y-select">Reading speed<select value={preferences.speechRate} onChange={event => updateAccessibility({ speechRate: Number(event.target.value) })}>{[[0.75, 'Slower'], [1, 'Normal'], [1.25, 'Faster'], [1.5, 'Fastest']].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><p>Device voices may need an internet connection or a voice download. No microphone is used.</p></fieldset>
        <fieldset className="a11y-group"><legend>Make text comfortable</legend><label className="a11y-select">Text size<select value={preferences.textSize} onChange={event => updateAccessibility({ textSize: Number(event.target.value) })}>{[100, 125, 150, 175, 200].map(value => <option key={value} value={value}>{value}%{value === 100 ? ' (standard)' : ''}</option>)}</select></label>
          <label className="a11y-toggle"><input type="checkbox" checked={preferences.highContrast} onChange={event => updateAccessibility({ highContrast: event.target.checked })} /><span><strong>Stronger contrast</strong><small>Dark text, clear borders and visible links.</small></span></label>
          <label className="a11y-toggle"><input type="checkbox" checked={preferences.spaciousText} onChange={event => updateAccessibility({ spaciousText: event.target.checked })} /><span><strong>Extra text spacing</strong><small>More room between letters, words and lines.</small></span></label>
          <label className="a11y-toggle"><input type="checkbox" checked={preferences.readingPaper} onChange={event => updateAccessibility({ readingPaper: event.target.checked })} /><span><strong>Gentle reading background</strong><small>A warm paper colour for lesson notes.</small></span></label>
        </fieldset>
        <fieldset className="a11y-group"><legend>A calmer experience</legend><label className="a11y-toggle"><input type="checkbox" checked={preferences.calmDisplay} onChange={event => updateAccessibility({ calmDisplay: event.target.checked })} /><span><strong>Always reduce motion</strong><small>Stop decorative animation and smooth scrolling. Your device’s reduced-motion preference is also respected.</small></span></label></fieldset>
        <div className="a11y-footer"><button type="button" className="a11y-action" onClick={() => { stopReadAloud(); updateAccessibility(defaultAccessibility); }}>Reset preferences</button><Link href="/accessibility" onClick={() => { if (details.current) details.current.open = false; }}>Accessibility help</Link></div>
      </div>
        </div>
      </details>
    </div>
    <p role="status" aria-live="polite" className="sr-only">{speech.message}</p>
  </>;
}
