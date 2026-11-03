"use client";

import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";

export function ClearableInput({
  id,
  name,
  placeholder,
  className,
  required,
  inputMode,
  autoComplete,
  type = "text",
  defaultValue = "",
}: {
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  inputMode?: "text" | "tel" | "numeric" | "decimal";
  autoComplete?: string;
  type?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(event) => setValue(event.target.value)}
        onDoubleClick={(event) => event.currentTarget.select()}
        className={`${className || ""} ${value ? "pr-10" : ""}`}
      />
      {value && (
        <button type="button" aria-label={`Clear ${name}`} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-[#5c6b7a]" onClick={() => setValue("")}>
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function PasswordInput({
  id,
  name,
  placeholder,
  className,
  required,
  minLength,
  autoComplete = "current-password",
}: {
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  minLength?: number;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onDoubleClick={(event) => event.currentTarget.select()}
        className={`${className || ""} pr-12`}
      />
      <button type="button" aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full" onClick={() => setVisible((value) => !value)}>
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function MoneyField({ name, placeholder }: { name: string; placeholder: string }) {
  const [digits, setDigits] = useState("");
  const shown = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className="relative">
      <input
        value={shown}
        inputMode="numeric"
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => setDigits(event.target.value.replace(/\D/g, "").slice(0, 12))}
        onDoubleClick={(event) => event.currentTarget.select()}
        className="w-full h-11 rounded-2xl border px-3 pr-10"
      />
      <input type="hidden" name={name} value={digits} />
      {digits && (
        <button type="button" aria-label="Clear amount" className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center" onClick={() => setDigits("")}>
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
