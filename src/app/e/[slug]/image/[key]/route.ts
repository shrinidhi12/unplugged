import { getEvent } from "@/lib/queries";
import { loadImage } from "@/lib/images";

// Serves an event's cover image. Keys are random and change whenever the image
// does, so the response can be cached forever.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; key: string }> }
) {
  const { slug, key } = await params;
  const event = await getEvent(slug).catch(() => null);
  if (!event || event.imageKey !== key) return new Response("Not found", { status: 404 });

  const image = await loadImage(key);
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(image.data, {
    headers: {
      "Content-Type": image.type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
