export type StoredPack = {
  paperId: string;
  title: string;
  version: string;
  savedAt: string;
  pass: { userId: string; paperId: string; version: string; expiresAt: string; token: string };
  paper: { id: string; title: string; kind: string; subject: string; className: string; topic: string | null; durationMinutes: number | null; backHref: string };
  questions: unknown[];
  answers: Record<string, string>;
  versions: Record<string, number>;
};

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("schoolquest-offline", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("packs");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveOfflinePack(pack: StoredPack) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction("packs", "readwrite");
    tx.objectStore("packs").put(pack, pack.paperId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function readOfflinePack(paperId: string) {
  const db = await openDb();
  const pack = await new Promise<StoredPack | undefined>((resolve, reject) => {
    const tx = db.transaction("packs", "readonly");
    const request = tx.objectStore("packs").get(paperId);
    request.onsuccess = () => resolve(request.result as StoredPack | undefined);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return pack;
}
