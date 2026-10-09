"use client";

import { useEffect, useRef, useState } from "react";

const MAX_SIDE = 1600;
const QUALITY = 0.82;

/**
 * Redraws the photo onto a canvas: shrinks big phone photos to something quick
 * to load, and drops EXIF metadata (like the GPS spot it was taken) on the way.
 */
async function shrink(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const encode = (type: string) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, QUALITY));
  // Older Safari can't encode WebP and silently hands back a PNG; use JPEG there.
  let blob = await encode("image/webp");
  if (!blob || blob.type !== "image/webp") blob = await encode("image/jpeg");
  if (!blob) throw new Error("encode failed");

  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  return new File([blob], `cover.${ext}`, { type: blob.type });
}

export default function ImagePicker() {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  // React resets the form after each submit (even one that comes back with an
  // error), which empties the file input; drop the preview to match.
  useEffect(() => {
    const form = input.current?.form;
    const onReset = () => setPreview(null);
    form?.addEventListener("reset", onReset);
    return () => form?.removeEventListener("reset", onReset);
  }, []);

  function clear() {
    if (input.current) input.current.value = "";
    setPreview(null);
    setError(null);
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return setPreview(null);
    setBusy(true);
    try {
      const small = await shrink(file);
      // Swap the shrunk copy into the input so the form submits it as usual.
      const dt = new DataTransfer();
      dt.items.add(small);
      e.target.files = dt.files;
      setPreview(URL.createObjectURL(small));
    } catch {
      clear();
      setError("Couldn't read that image. Try a JPG or PNG.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <input
        ref={input}
        id="image"
        name="image"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif"
        onChange={onChange}
        className={preview ? "sr-only" : "field file:mr-3 file:border-2 file:border-ink file:bg-paper-2 file:px-3 file:py-1 file:font-semibold"}
      />
      {busy && <p className="mt-2 text-xs text-ink-soft">Preparing image…</p>}
      {preview && (
        <div className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
          <img
            src={preview}
            alt="Cover image preview"
            className="max-h-72 w-full border-2 border-ink object-cover"
          />
          <div className="flex gap-4 text-sm">
            <label htmlFor="image" className="cursor-pointer font-medium text-clay hover:text-clay-dark">
              Change
            </label>
            <button type="button" onClick={clear} className="font-medium text-ink-soft hover:text-ink">
              Remove
            </button>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-sm font-medium text-pink">{error}</p>}
    </div>
  );
}
