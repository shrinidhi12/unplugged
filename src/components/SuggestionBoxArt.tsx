import { SUGGESTION_KINDS, type SuggestionKind } from "@/lib/suggestions";

// Box faces, shared by the ink print and its off-register pink copy.
const FRONT = "70,150 260,150 260,280 70,280";
const LID = "70,150 110,110 300,110 260,150";
const SIDE = "260,150 300,110 300,240 260,280";

function star(x: number, y: number, r: number): string {
  return `M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`;
}

function heart(x: number, y: number): string {
  return `M${x} ${y + 7}C${x - 13} ${y - 3} ${x - 7} ${y - 14} ${x} ${y - 6}C${x + 7} ${y - 14} ${x + 13} ${y - 3} ${x} ${y + 7}Z`;
}

/**
 * A riso-printed suggestion box with a face. The note poking out of the slot
 * shows the chosen kind; once `fed`, the note drops in, the box gulps, and
 * hearts float up. All motion lives in globals.css (.sb-*).
 */
export default function SuggestionBoxArt({
  kind,
  fed = false,
}: {
  kind: SuggestionKind;
  fed?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 360 320"
      className={`sb-art h-auto w-full ${fed ? "sb-fed" : ""}`}
      role="img"
      aria-label={
        fed
          ? "The suggestion box happily gulping down your note"
          : "A smiling suggestion box with a note sticking out of its slot"
      }
    >
      <defs>
        <pattern id="sb-dots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.5" className="fill-pink" />
        </pattern>
        {/* Everything below the slot is "inside" the box. */}
        <clipPath id="sb-slot-clip">
          <rect x="0" y="0" width="360" height="130" />
        </clipPath>
      </defs>

      <path d={star(46, 72, 13)} className="sb-twinkle fill-pink" />
      <path
        d={star(326, 56, 9)}
        className="sb-twinkle fill-blue"
        style={{ animationDelay: "0.6s" }}
      />
      <path
        d={star(330, 206, 7)}
        className="sb-twinkle fill-pink"
        style={{ animationDelay: "1.1s" }}
      />
      <path
        d={star(34, 214, 8)}
        className="sb-twinkle fill-blue"
        style={{ animationDelay: "1.6s" }}
      />

      <ellipse cx="185" cy="293" rx="140" ry="10" className="fill-paper-2" />

      <g className="sb-box">
        <g transform="translate(9 7)" className="fill-pink">
          <polygon points={FRONT} />
          <polygon points={LID} />
          <polygon points={SIDE} />
        </g>

        <g className="stroke-ink" strokeWidth="3" strokeLinejoin="round">
          <polygon points={SIDE} className="fill-blue-dark" />
          <polygon points={SIDE} fill="url(#sb-dots)" opacity="0.55" />
          <polygon points={FRONT} className="fill-blue" />
          <polygon points={LID} className="fill-card" />
        </g>

        <polygon points="145,135 225,135 235,125 155,125" className="fill-ink" />

        <g clipPath="url(#sb-slot-clip)">
          <g className="sb-note">
            <g transform="rotate(-6 190 130)">
              <rect
                x="155"
                y="42"
                width="72"
                height="94"
                className="fill-card stroke-ink"
                strokeWidth="2.5"
              />
              <line x1="164" y1="58" x2="218" y2="58" className="stroke-line" strokeWidth="2" />
              <line x1="164" y1="68" x2="206" y2="68" className="stroke-line" strokeWidth="2" />
              <text
                key={kind}
                x="191"
                y="108"
                textAnchor="middle"
                fontSize="30"
                className="sb-pop"
              >
                {SUGGESTION_KINDS[kind].emoji}
              </text>
            </g>
          </g>
        </g>

        <g className="sb-eyes-open">
          <circle cx="140" cy="180" r="12" className="fill-card stroke-ink" strokeWidth="2.5" />
          <circle cx="190" cy="180" r="12" className="fill-card stroke-ink" strokeWidth="2.5" />
          {/* Pupils glance up at the note. */}
          <circle cx="143" cy="175" r="5" className="fill-ink" />
          <circle cx="193" cy="175" r="5" className="fill-ink" />
        </g>
        <g
          className="sb-eyes-happy stroke-card"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M128 184Q140 168 152 184" />
          <path d="M178 184Q190 168 202 184" />
        </g>
        <ellipse cx="114" cy="198" rx="9" ry="5" className="fill-pink" />
        <ellipse cx="216" cy="198" rx="9" ry="5" className="fill-pink" />
        <path
          d="M155 198Q165 208 175 198"
          className="stroke-card"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        <g transform="rotate(-3 165 239)">
          <rect
            x="105"
            y="218"
            width="120"
            height="42"
            className="fill-card stroke-ink"
            strokeWidth="2.5"
          />
          <text
            x="165"
            y="248"
            textAnchor="middle"
            fontSize="24"
            className="font-display fill-ink"
          >
            IDEAS
          </text>
        </g>
      </g>

      {fed &&
        [
          { x: 168, delay: "0.55s" },
          { x: 212, delay: "0.75s" },
          { x: 190, delay: "0.95s" },
        ].map((h) => (
          <path
            key={h.x}
            d={heart(h.x, 104)}
            className="sb-heart fill-pink stroke-ink"
            strokeWidth="1.5"
            style={{ animationDelay: h.delay }}
          />
        ))}
    </svg>
  );
}
