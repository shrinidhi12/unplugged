// Pass-through layout: it gives /find-a-venue its own not-found boundary, so
// an unknown venue shows the venue 404 rather than the site-wide event one.
export default function FindAVenueLayout({ children }: { children: React.ReactNode }) {
  return children;
}
