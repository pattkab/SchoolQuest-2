"use client";

import { useState } from "react";
import { avatars, uploadedPhotoPrefix } from "./avatar-options";

export function ProfileAvatar({ name, image, avatar, className }: {
  name?: string | null;
  image?: string | null;
  avatar?: string | null;
  className?: string;
}) {
  const [failed, setFailed] = useState<string | null>(null);
  const character = avatars.find(({ id }) => id === avatar);
  const photo = avatar?.startsWith(uploadedPhotoPrefix) ? avatar : !character && avatar !== "initials" ? image : null;
  if (photo && photo !== failed) {
    return (
      // Google profile photos can reject requests that send a referrer.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photo} alt="" referrerPolicy="no-referrer" onError={() => setFailed(photo)} className={`${className || ""} profile-photo`} />
    );
  }
  const initials = (name || "SQ").trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("");
  return <span aria-hidden="true" className={className}>{character?.icon || initials || "SQ"}</span>;
}
