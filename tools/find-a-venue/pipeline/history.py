"""Build the per-venue Off Tech history, keyed by Venue ID.

    python tools/find-a-venue/pipeline/history.py           # write data/off_tech_history.csv
    python tools/find-a-venue/pipeline/history.py --check   # also diff against the seed sheet's tab

Inputs (all in this folder):
  data.py                 every listing from every newsletter issue
  activities.py           keyword activity tagger (+ activity_overrides.csv)
  venue_ids.csv           pipeline venue code -> Venue ID on the site
Output:
  ../data/off_tech_history.csv   one row per Venue ID: the sheet's "Off Tech
                                 history" tab columns plus "All activities".
                                 Paste it into that tab; sync.py merges it.
"""
import collections, csv, datetime, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from data import ISSUES, V, rows  # noqa: E402
from activities import series, summarize  # noqa: E402

OUT = HERE.parent / "data" / "off_tech_history.csv"
SEED = HERE.parent / "data" / "venues_master_seed.xlsx"

COLUMNS = ["Venue ID", "Off Tech listings", "Issues mentioning", "First issue",
           "Latest issue", "Latest event", "Top activities", "Signature events",
           "Most common host"]
# Not on the sheet tab. "All activities" feeds activity counts; "Recent
# events" is the venue page's "events held here" line.
EXTRA = ["All activities", "Recent events"]
RECENT_EVENTS = 8

# Places that show up in listings but aren't venues a host can book or reuse.
# They never get a history row, even if someone adds them to venue_ids.csv.
EXCLUDED = {
    "STUY": "Stuyvesant Park: removed by hand",
    "PLAYERS": "The Players Club: private members' club",
    "Q96": "96 St Q station: a subway platform",
    "APPLE": "Apple Store Fifth Ave: protest site",
    "APPLES": "Apple Stores (various): protest sites",
    "HUDSON": "Hudson Highlands: day trip outside NYC",
    "DENIZEN": "Denizen Theatre: day trip outside NYC",
}
# Listings with vcode "N:<neighborhood>" are private or RSVP-only addresses
# and are always skipped.

# Hand corrections to the venue table in data.py.
V_EDITS = {
    "PEACE": ("Peace Cafe", "23 Marcus Garvey Blvd, Bed-Stuy, Brooklyn", "Cafe / bar / restaurant"),
}
V.update(V_EDITS)

# Venues with at least this many listings that aren't mapped are reported as
# candidates to add to the sheet.
CANDIDATE_MIN = 3


def fmt_date(iso):
    d = datetime.date.fromisoformat(iso)
    return f"{d:%b} {d.day}, {d.year}"


def top_host(rs):
    """Most-listed host as the newsletter named them. On a tie, the one listed
    with the latest event in the latest issue, marked "(tied, N hosts)"."""
    hosts = collections.Counter(r["host"] for r in rs if r["host"])
    if not hosts:
        return "— (no host named)"
    best = max(hosts.values())
    tied = [h for h, n in hosts.items() if n == best]
    if len(tied) == 1:
        return tied[0]
    last = max((ISSUES[r["issue"]][0], r["date"], -i, r["host"]) for i, r in enumerate(rs) if r["host"] in tied)[-1]
    return f"{last} (tied, {len(tied)} hosts)"


def recent_events(rs):
    """Distinct event series at a venue, newest first ("Crafternoon", not
    "Crafternoon (weekly)" three times)."""
    out, seen = [], set()
    for r in sorted(rs, key=lambda r: r["date"], reverse=True):
        name = series(r["event"]).replace(";", ",")
        if name.lower() not in seen:
            seen.add(name.lower())
            out.append(name)
        if len(out) == RECENT_EVENTS:
            break
    return out


def load_ids():
    with open(HERE / "venue_ids.csv", encoding="utf-8", newline="") as f:
        return {r["code"]: r["venue_id"] for r in csv.DictReader(f)}


def build():
    ids = load_ids()
    acts, _ = summarize()
    by_code = collections.defaultdict(list)
    for r in rows():
        if not r["vcode"].startswith("N:"):
            by_code[r["vcode"]].append(r)

    out = []
    for code, vid in ids.items():
        if code in EXCLUDED:
            sys.exit(f"venue_ids.csv maps {code} to {vid}, but {code} is excluded ({EXCLUDED[code]})")
        rs = by_code.get(code, [])
        if not rs:
            print(f"  note: {vid} has no listings")
            continue
        issue_dates = sorted({ISSUES[r["issue"]][0] for r in rs})
        # Latest event: from the latest issue, the listing with the latest event
        # date; on a tie, the one listed first.
        latest = max(enumerate(rs), key=lambda p: (ISSUES[p[1]["issue"]][0], p[1]["date"], -p[0]))[1]
        a = acts.get(V[code][0], {"acts": [], "series": [], "all": {}})
        out.append({
            "Venue ID": vid,
            "Off Tech listings": len(rs),
            "Issues mentioning": len(issue_dates),
            "First issue": fmt_date(issue_dates[0]),
            "Latest issue": fmt_date(issue_dates[-1]),
            "Latest event": latest["event"],
            "Top activities": ", ".join(f"{t} ({n})" for t, n in a["acts"]),
            "Signature events": ", ".join(s for s, _ in a["series"]),
            "Most common host": top_host(rs),
            "All activities": "; ".join(f"{t} ({n})" for t, n in sorted(a["all"].items(), key=lambda x: -x[1])),
            "Recent events": "; ".join(recent_events(rs)),
        })
    out.sort(key=lambda r: -r["Off Tech listings"])

    candidates = [(c, V[c][0], len(rs)) for c, rs in by_code.items()
                  if c not in ids and c not in EXCLUDED and len(rs) >= CANDIDATE_MIN]
    return out, sorted(candidates, key=lambda x: -x[2])


def write(out):
    with open(OUT, "w", encoding="utf-8", newline="") as f:
        # Plain \n so the file is identical whether it's built on Windows or Linux.
        w = csv.DictWriter(f, fieldnames=COLUMNS + EXTRA, lineterminator="\n")
        w.writeheader()
        w.writerows(out)


def check(out):
    """Compare against the seed sheet's Off Tech history tab. Returns # of differences."""
    import openpyxl
    ws = openpyxl.load_workbook(SEED, read_only=True)["Off Tech history"]
    it = ws.iter_rows(values_only=True)
    header = next(r for r in it if r and r[0] == "Venue ID")
    # Skip the explanatory note row(s): real IDs are slugs, never sentences.
    seed = {r[0]: dict(zip(header, r)) for r in it if r and r[0] and " " not in r[0]}
    mine = {r["Venue ID"]: r for r in out}
    diffs = 0
    for vid in sorted(set(seed) | set(mine)):
        if vid not in mine or vid not in seed:
            print(f"  {vid}: only in {'seed' if vid in seed else 'rebuild'}")
            diffs += 1
            continue
        for col in COLUMNS[1:]:
            a, b = seed[vid].get(col), mine[vid][col]
            if str(a if a is not None else "") != str(b):
                print(f"  {vid} / {col}:\n      seed:    {a}\n      rebuild: {b}")
                diffs += 1
    return diffs


if __name__ == "__main__":
    out, candidates = build()
    write(out)
    print(f"Wrote {len(out)} venues to {OUT.relative_to(HERE.parent.parent.parent)}")
    if candidates:
        print("Venues with several listings that aren't on the sheet yet:")
        for c, name, n in candidates:
            print(f"  {n:>3}  {name}  (code {c})")
    if "--check" in sys.argv:
        n = check(out)
        print(f"{n} difference(s) from the seed sheet's Off Tech history tab")
