import { ImageResponse } from "next/og";
import { getEvent } from "@/lib/queries";
import { formatEventDate, formatEventTime } from "@/lib/datetime";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "An invitation on Unplugged";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug).catch(() => null);

  const title = event?.title ?? "Unplugged";
  const date = event ? formatEventDate(event) : "";
  const time = event ? formatEventTime(event) : null;
  const place = event
    ? [event.locationName, event.address].filter(Boolean).join(" · ")
    : "";
  const when = time ? `${date}  ·  ${time}` : date;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f2ecdd",
          color: "#17182a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#ff4f8b",
            fontWeight: 700,
          }}
        >
          Unplugged · You&apos;re invited
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1,
              maxWidth: 1000,
              fontWeight: 800,
              color: "#2637c9",
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: 220,
              height: 12,
              background: "#ff4f8b",
              marginTop: 24,
            }}
          />
          {when && (
            <div style={{ fontSize: 34, marginTop: 26, color: "#17182a" }}>
              {when}
            </div>
          )}
          {place && (
            <div style={{ fontSize: 28, marginTop: 8, color: "#565566" }}>
              {place}
            </div>
          )}
        </div>

        <div style={{ fontSize: 24, color: "#2637c9", fontWeight: 700 }}>
          A forever-free events platform.
        </div>
      </div>
    ),
    size
  );
}
