import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getStore } from "@netlify/blobs";
import { customAlphabet } from "nanoid";

// Event cover images. In production they live in Netlify Blobs (free, no extra
// account); in local dev, where there's no Netlify context, they go to disk.

export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

const TYPES = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
} as const;
type Ext = keyof typeof TYPES;

const STORE = "event-images";
const LOCAL_DIR = path.join(process.cwd(), ".blobs", STORE);
const useLocal = process.env.NODE_ENV === "development";
const newImageId = customAlphabet("23456789abcdefghjkmnpqrstuvwxyz", 12);

/** Identify the format from the file's first bytes; never trust the browser's label. */
function sniff(b: Uint8Array): Ext | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return "gif";
  const ascii = (from: number, to: number) =>
    String.fromCharCode(...b.subarray(from, to));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp";
  return null;
}

export type ImageCheck =
  | { ok: true; bytes: Uint8Array; ext: Ext }
  | { ok: false; error: string };

/** Validates an uploaded file. An empty/missing field is "no image", not an error. */
export async function readImage(file: FormDataEntryValue | null): Promise<ImageCheck | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAX_IMAGE_BYTES)
    return { ok: false, error: "That image is too big. Try one under 3 MB." };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = sniff(bytes);
  if (!ext) return { ok: false, error: "Use a JPG, PNG, WebP, or GIF image." };
  return { ok: true, bytes, ext };
}

/** Stores the image and returns its key (e.g. "ab12cd34-k3m9...webp"). */
export async function saveImage(eventId: string, bytes: Uint8Array, ext: Ext) {
  const key = `${eventId}-${newImageId()}.${ext}`;
  if (useLocal) {
    await mkdir(LOCAL_DIR, { recursive: true });
    await writeFile(path.join(LOCAL_DIR, key), bytes);
  } else {
    const data = bytes.buffer.slice(
      bytes.byteOffset,
      bytes.byteOffset + bytes.byteLength
    ) as ArrayBuffer;
    await getStore({ name: STORE, consistency: "strong" }).set(key, data);
  }
  return key;
}

export async function loadImage(
  key: string
): Promise<{ data: ArrayBuffer; type: string } | null> {
  const ext = key.split(".").pop() as Ext;
  const type = TYPES[ext];
  if (!type || !/^[a-z0-9-]+\.[a-z]+$/.test(key)) return null;
  if (useLocal) {
    try {
      const buf = await readFile(path.join(LOCAL_DIR, key));
      return { data: new Uint8Array(buf).buffer, type };
    } catch {
      return null;
    }
  }
  const data = await getStore(STORE).get(key, { type: "arrayBuffer" });
  return data ? { data, type } : null;
}

export function imageUrl(slug: string, key: string) {
  return `/e/${slug}/image/${key}`;
}
