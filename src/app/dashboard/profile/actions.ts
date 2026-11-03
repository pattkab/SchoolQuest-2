"use server";

import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { avatars, uploadedPhotoPrefix } from "@/components/avatar-options";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { requireUser } from "@/lib/session";

export async function saveProfilePicture(_state: { error: string; message: string }, data: FormData) {
  const user = await requireUser();
  const choice = data.get("picture");
  let avatarSeed: string | null;
  if (choice === "upload") {
    if (!rateLimit(`profile-photo:${user.id}`, 8, 60_000).ok) {
      return { error: "Wait a minute before uploading another photo.", message: "" };
    }
    const file = data.get("photo");
    if (!(file instanceof File) || file.size === 0 || file.size > 5 * 1024 * 1024) {
      return { error: "Choose a JPEG, PNG or WebP photo up to 5 MB.", message: "" };
    }
    try {
      const picture = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 24_000_000 });
      const { format } = await picture.metadata();
      if (format !== "jpeg" && format !== "png" && format !== "webp") {
        return { error: "Choose a JPEG, PNG or WebP photo.", message: "" };
      }
      const thumbnail = await picture.rotate().resize(192, 192, { fit: "cover", withoutEnlargement: true }).webp({ quality: 78 }).toBuffer();
      avatarSeed = uploadedPhotoPrefix + thumbnail.toString("base64");
    } catch {
      return { error: "This photo could not be read. Try a smaller JPEG, PNG or WebP.", message: "" };
    }
  } else if (choice === "google") {
    if (!user.image) return { error: "Your account has no Google photo.", message: "" };
    avatarSeed = null;
  } else if (choice === "initials" || avatars.some(({ id }) => id === choice)) {
    avatarSeed = String(choice);
  } else {
    return { error: "Choose a profile picture option.", message: "" };
  }
  await db.user.update({ where: { id: user.id }, data: { avatarSeed } });
  revalidatePath("/dashboard", "layout");
  return { error: "", message: "Profile picture saved." };
}
