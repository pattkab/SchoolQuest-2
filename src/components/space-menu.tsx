"use client";

import { useRef } from "react";
import { Menu, X } from "lucide-react";
import { AppNavigation, type NavigationItem } from "./app-navigation";

export function SpaceMenu({ label, items }: { label: string; items: NavigationItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" className="space-back" aria-haspopup="dialog" aria-controls="space-menu"
        onClick={() => dialog.current?.showModal()}>
        <Menu aria-hidden="true" className="h-5 w-5 shrink-0" /> Menu
      </button>
      <dialog ref={dialog} id="space-menu" className="space-menu" aria-labelledby="space-menu-title"
        onClick={(event) => { if (event.target === event.currentTarget && event.clientX > event.currentTarget.getBoundingClientRect().right) dialog.current?.close(); }}>
        <div className="mb-4 flex items-start justify-between gap-2">
          <h2 id="space-menu-title" className="space-label">{label} space</h2>
          <button type="button" className="icon-button shrink-0" aria-label="Close menu" onClick={() => dialog.current?.close()}>
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <AppNavigation items={items} desktop onNavigate={() => dialog.current?.close()} />
      </dialog>
    </>
  );
}
