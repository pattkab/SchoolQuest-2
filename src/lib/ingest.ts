const MAX_BYTES = 15_000_000;

export type SourceKind = "SCAN" | "PDF" | "GITHUB";

export function toRawUrl(input: string) {
  const url = new URL(input.trim());
  if (url.protocol !== "https:") throw new Error("Use an https link.");
  if (url.hostname === "github.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    const blob = parts.indexOf("blob");
    if (blob >= 2) {
      const [user, repo] = parts;
      const rest = parts.slice(blob + 1).join("/");
      return `https://raw.githubusercontent.com/${user}/${repo}/${rest}`;
    }
  }
  return url.toString();
}

export function pdfHasText(buffer: Buffer) {
  const sample = buffer.subarray(0, Math.min(buffer.length, 200_000)).toString("latin1");
  return sample.includes("/Font") || sample.includes(" Tj");
}

function sniffMime(buffer: Buffer, hinted?: string | null) {
  if (buffer.subarray(0, 5).toString() === "%PDF-") return "application/pdf";
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return "image/jpeg";
  if (buffer.subarray(0, 8).toString("hex") === "89504e470d0a1a0a") return "image/png";
  if (hinted && hinted !== "application/octet-stream") return hinted;
  return "application/pdf";
}

export async function loadSource(file: File | null, link: string) {
  if (file && file.size > 0) {
    if (file.size > MAX_BYTES) throw new Error("File is over 15 MB.");
    const buffer = Buffer.from(await file.arrayBuffer());
    const mime = sniffMime(buffer, file.type);
    const kind: SourceKind = mime.startsWith("image/") || !pdfHasText(buffer) ? "SCAN" : "PDF";
    return { buffer, mime, kind, sourceUrl: null as string | null, label: file.name };
  }
  if (!link.trim()) throw new Error("Add a file or a link.");
  const sourceUrl = toRawUrl(link);
  const host = new URL(sourceUrl).hostname;
  const response = await fetch(sourceUrl, { redirect: "follow" });
  if (!response.ok) throw new Error("That link did not open.");
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > MAX_BYTES) throw new Error("File is over 15 MB.");
  const mime = sniffMime(buffer, response.headers.get("content-type"));
  const kind: SourceKind = host.includes("github") ? "GITHUB" : mime.startsWith("image/") || !pdfHasText(buffer) ? "SCAN" : "PDF";
  return { buffer, mime, kind, sourceUrl, label: decodeURIComponent(sourceUrl.split("/").pop() || "paper") };
}
