"use client";

import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PATHWAYS, pathwayById, type PathwayId } from "@/lib/pathways";

export type SignInProfile = {
  id: string;
  name: string;
  phone: string;
  role: string;
  className: string | null;
};

function intentFor(role: string) {
  if (role === "ADMIN" || role === "SUPER_ADMIN") return "ADMIN";
  if (role === "TEACHER") return "TEACHER";
  return "STUDENT";
}

function profileLabel(profile: SignInProfile) {
  const who = profile.name || profile.phone;
  return profile.role === "STUDENT" && profile.className ? `${who} · ${profile.className}` : who;
}

export function SignInForm({ profiles, pathway }: { profiles: SignInProfile[]; pathway?: string }) {
  const [pathwayId, setPathwayId] = useState<PathwayId>(pathwayById(pathway).id);
  const [profileId, setProfileId] = useState("");
  const [phone, setPhone] = useState("");
  const current = pathwayById(pathwayId);
  const visible = profiles.filter((profile) => (current.roles as readonly string[]).includes(profile.role));
  const selected = visible.find((profile) => profile.id === profileId);

  return (
    <form action={loginAction} className="space-y-5 max-w-md">
      <input type="hidden" name="intent" value={selected ? intentFor(selected.role) : "STUDENT"} />
      <div className="grid grid-cols-2 gap-2">
        {PATHWAYS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setPathwayId(item.id);
              setProfileId("");
              setPhone("");
            }}
            className={`rounded-2xl border px-3 py-3 text-left ${item.id === pathwayId ? "bg-primary text-white border-primary" : "bg-white"}`}
          >
            <span className="block text-sm font-bold">{item.label}</span>
            <span className={`block text-xs mt-0.5 ${item.id === pathwayId ? "text-white/80" : "text-muted-foreground"}`}>{item.line}</span>
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile">Profile</Label>
        <select
          id="profile"
          className="w-full h-12 rounded-2xl border bg-white px-3"
          value={profileId}
          onChange={(event) => {
            const next = visible.find((profile) => profile.id === event.target.value);
            setProfileId(event.target.value);
            setPhone(next?.phone ?? "");
          }}
        >
          <option value="">Choose a {current.label.toLowerCase()}</option>
          {visible.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profileLabel(profile)}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          name="phone"
          required
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
            if (selected && event.target.value !== selected.phone) setProfileId("");
          }}
          placeholder="0700000000"
          className="h-12 rounded-2xl"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">PIN or password</Label>
        <Input id="password" name="password" type="password" required className="h-12 rounded-2xl" />
      </div>
      <button type="submit" className="w-full h-12 rounded-2xl text-base font-bold bg-primary text-white">Enter</button>
      <p className="text-sm text-muted-foreground">
        PIN 1234 · Teacher? <Link href="/register/teacher" className="font-bold text-primary">Apply</Link>
      </p>
    </form>
  );
}
