import Link from 'next/link';
import { BrandMark } from '@/components/shell';
import { ReadAloudButton } from '@/components/accessibility-tools';
import { SUPPORT_EMAIL } from '@/lib/privacy';

export const metadata = { title: 'Learning your way | School Quest accessibility' };
export default function AccessibilityPage() {
  return <div className="min-h-screen px-5 py-8"><div className="mx-auto max-w-3xl space-y-7"><BrandMark /><main className="quest-panel space-y-6" data-reading-content>
    <p className="eyebrow">LEARNING YOUR WAY</p><h1 className="font-display text-3xl">Make School Quest work for you</h1>
    <ReadAloudButton label="Listen to this guide" />
    <p>Open the Accessibility button on any page. You can change text size up to 200%, strengthen contrast, add text spacing, choose a warm reading background, and reduce movement. Preferences are stored on this device when browser storage is available.</p>
    <section><h2 className="font-display text-xl">Listen to lessons and questions</h2><p className="mt-2">Use Listen to this lesson, Listen to this question, or Read this page aloud. Choose a slower or faster reading speed. Audio never starts automatically. Stop it from the audio controls, or by moving to another page. Typed form values and passwords are excluded from page reading.</p><p className="mt-2">Speech uses your device or browser’s English voice. Voices may require downloading or a network connection, depending on your settings. No microphone is recorded. Written lesson text stays available alongside audio.</p></section>
    <section><h2 className="font-display text-xl">Use a screen reader or keyboard</h2><p className="mt-2">School Quest includes a Skip to content link, labelled navigation and form controls, visible keyboard focus, and selected-answer states. You can also use Android TalkBack, Apple VoiceOver, a desktop screen reader, or your device’s zoom and dictation tools. These device tools are separate from School Quest’s read-aloud button.</p></section>
    <section><h2 className="font-display text-xl">Describe a drawing in words</h2><p className="mt-2">On drawing questions, choose Describe in words instead. Explain the shapes, labels and relationships using your keyboard or device dictation. This answer is sent for teacher review; it is not automatically assessed as an image.</p></section>
    <section><h2 className="font-display text-xl">Tell us what still gets in your way</h2><p className="mt-2">Some imported diagrams, scanned papers and external resources do not yet have complete text descriptions. Read-aloud cannot explain a diagram that has no description. Drawing accommodations need an available teacher, and speech support depends on the device. This is an ongoing accessibility effort, not a claim of full WCAG conformance or an independent accessibility certification.</p><p className="mt-2">Email <a className="font-bold text-primary underline" href={`mailto:${SUPPORT_EMAIL}?subject=School%20Quest%20accessibility`}>{SUPPORT_EMAIL}</a> with the page, barrier and accommodation you need. Avoid sending a child’s private records.</p></section>
    <Link className="quest-button" href="/">Back to School Quest</Link>
  </main></div></div>;
}
