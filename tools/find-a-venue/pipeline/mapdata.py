"""Export the published venues as GeoJSON + KML, for uMap or other OSM-based tools.

    python tools/find-a-venue/pipeline/mapdata.py

Reads src/data/venues.json (written by sync.py), so it only ever contains
Approved venues and public fields. Writes ../data/venues.geojson and
../data/venues.kml.

The original version of this script also drew hand-made borough outlines for
the prototype map; the site now uses a real basemap, so that part is gone.
Venue coordinates live in the collaborator sheet (Latitude / Longitude).
"""
import json
from pathlib import Path
from xml.sax.saxutils import escape as e

HERE = Path(__file__).resolve().parent
SRC = HERE.parent.parent.parent / "src" / "data" / "venues.json"
OUT = HERE.parent / "data"


def main():
    venues = json.loads(SRC.read_text("utf-8"))["venues"]
    feats = []
    for v in venues:
        h = v["history"] or {}
        feats.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [v["lng"], v["lat"]]},
            "properties": {
                "id": v["id"],
                "name": v["name"],
                "type": v["type"],
                "area": ", ".join(x for x in (v["neighborhood"], v["borough"]) if x),
                "listings": h.get("listings", 0),
                "issues": h.get("issues", 0),
                "first_issue": h.get("firstIssue"),
                "latest_issue": h.get("latestIssue"),
                "latest_event": h.get("latestEvent"),
                "top_host": h.get("topHost"),
                "recent_events": "; ".join(h.get("recentEvents", [])),
            },
        })
    (OUT / "venues.geojson").write_text(
        json.dumps({"type": "FeatureCollection", "features": feats}, indent=1, ensure_ascii=False) + "\n", "utf-8")

    kml = ['<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>NYC Off Tech Venues</name>']
    for f in feats:
        p = f["properties"]
        desc = (f"{p['listings']} listings in {p['issues']} issues. Most recent issue: {p['latest_issue']}. "
                f"Most common host: {p['top_host'] or 'none named'}."
                if p["listings"] else "No Off Tech listings yet.")
        lng, lat = f["geometry"]["coordinates"]
        kml.append(f"<Placemark><name>{e(p['name'])}</name><description>{e(desc)}</description>"
                   f"<Point><coordinates>{lng},{lat}</coordinates></Point></Placemark>")
    kml.append("</Document></kml>")
    (OUT / "venues.kml").write_text("".join(kml), "utf-8")
    print(f"Wrote {len(feats)} venues to {OUT / 'venues.geojson'} and venues.kml")


if __name__ == "__main__":
    main()
