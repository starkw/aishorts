/**
 * 生成结果只存在用户浏览器里，服务端不留档。
 * 图片以 Blob 形式写入 IndexedDB，读取时再转 object URL。
 */

const DB_NAME = "aishorts-gallery";
const DB_VERSION = 1;
const STORE = "images";
const MAX_ITEMS = 200;

export interface GalleryRecord {
  id: string;
  blob: Blob;
  prompt: string;
  aspectRatio: string;
  model: string;
  createdAt: number;
}

export interface GalleryItem extends Omit<GalleryRecord, "blob"> {
  objectUrl: string;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const request = run(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      })
  );
}

export async function saveImage(input: {
  dataUrl: string;
  prompt: string;
  aspectRatio: string;
  model: string;
}): Promise<GalleryItem> {
  const blob = await fetch(input.dataUrl).then((r) => r.blob());
  const record: GalleryRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    blob,
    prompt: input.prompt,
    aspectRatio: input.aspectRatio,
    model: input.model,
    createdAt: Date.now(),
  };

  await tx("readwrite", (s) => s.put(record));
  void pruneOldest();

  const { blob: _blob, ...meta } = record;
  return { ...meta, objectUrl: URL.createObjectURL(blob) };
}

export async function listImages(): Promise<GalleryItem[]> {
  const records = await tx<GalleryRecord[]>("readonly", (s) => s.getAll());
  return records
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(({ blob, ...meta }) => ({ ...meta, objectUrl: URL.createObjectURL(blob) }));
}

export async function deleteImage(id: string): Promise<void> {
  await tx("readwrite", (s) => s.delete(id));
}

export async function clearImages(): Promise<void> {
  await tx("readwrite", (s) => s.clear());
}

/** 超出上限时按时间淘汰最旧的，避免占满用户磁盘配额 */
async function pruneOldest(): Promise<void> {
  const records = await tx<GalleryRecord[]>("readonly", (s) => s.getAll());
  if (records.length <= MAX_ITEMS) return;
  const stale = records.sort((a, b) => a.createdAt - b.createdAt).slice(0, records.length - MAX_ITEMS);
  await Promise.all(stale.map((r) => tx("readwrite", (s) => s.delete(r.id))));
}
