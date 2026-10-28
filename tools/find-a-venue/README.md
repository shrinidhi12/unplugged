# Find a venue: maintainer guide

`/find-a-venue` is built from two sources:

1. **The collaborator sheet**, a Proton Sheet (end-to-end encrypted).
   Approved collaborators keep venue details there. Ask the site owner for
   access. Its link is kept out of this public repo on purpose.
2. **The NYC Off Tech newsletter** ([archive](https://buttondown.com/nycofftech/archive/)).
   `pipeline/` turns every event listing into per-venue history.

Proton Sheets has no API, so nothing reads the sheet automatically. To
publish, a maintainer exports it as XLSX and runs one command (below), then
commits `src/data/venues.json`; Netlify deploys every push to `main`.
Nothing is ever written back to the sheet.

You need Python 3.10+ and `openpyxl` (`pip install openpyxl`). Netlify never
runs Python: `src/data/venues.json` is committed.

## Folder map

| Path | What it is |
|---|---|
| `sync.py` | XLSX export → `src/data/venues.json`. Validates, geocodes, merges history, strips private fields. |
| `test_privacy.py` | Fails if any non-public column could reach the site data. |
| `sheet-export/` | Drop exports here. **Gitignored**, because exports contain contact details. |
| `field_guide.csv` | **The schema**: every Venues column, whether it's shown on the site, and its allowed values. The sync reads it. |
| `data/venues_master_seed.xlsx` | The shared sheet's starting data: one **Venues** tab. Import it to create a new sheet. |
| `data/geocode_cache.json` | Saved address lookups, so each address is geocoded once. |
| `data/off_tech_tabs.xlsx` | Private reference workbook (not shared): **Off Tech history**, **Past events** and **Field guide**. Regenerated after each new issue. |
| `data/off_tech_history.csv` | The same per-venue history as CSV (plus "All activities"); `sync.py` reads it. |
| `data/venues.geojson`, `venues.kml` | Generated export for uMap and other OSM tools. |
| `data/venue_references.xlsx` | The original research: every listing in issues 1–27, with method notes. |
| `pipeline/data.py` | Every newsletter listing, one line each. |
| `pipeline/activities.py` | The keyword activity tagger. |
| `pipeline/activity_overrides.csv` | Hand corrections to activity tags. |
| `pipeline/venue_ids.csv` | Pipeline venue code → Venue ID on the site. |
| `pipeline/history.py` | Builds the history. Also holds the exclusion list and hand edits. |
| `pipeline/sheet_tabs.py` | Writes the private reference workbook (`off_tech_tabs.xlsx`). |
| `pipeline/mapdata.py` | Writes the GeoJSON/KML export from the synced data. |
| `reference/prototype-map.html` | The original prototype (UX reference only). |

## What's on the sheet

The **shared Proton Sheet has one tab, Venues**, one row per venue, in the
same order as the venue page. Hover a header for what to enter.

| Group | Columns | On the site? |
|---|---|---|
| Admin | Venue ID, Status | No (ID is the page address) |
| Venue details | Venue name, Venue type, Address, Neighborhood, Borough, Indoor / outdoor, Capacity (est.), Cost | Yes |
| Venue notes (freeform) | How to book, Contact, Food & drink, Accessibility, A/V equipment, Other notes | Yes. *Contact* is for an events email or booking form only. |
| Private | Private notes | **Never.** Personal contacts and anything sensitive go here. |
| Upkeep | Last verified, Latitude, Longitude | Yes (coordinates place the map pin) |

Everything else stays private, out of the shared sheet: the schema in
`field_guide.csv`, and the newsletter history in `data/off_tech_tabs.xlsx`.

## Set up the sheet (once)

1. In Proton Drive, upload `data/venues_master_seed.xlsx` and open it as a
   Proton Sheet (**File → Import**).
2. Share it with collaborators as editors. Everyone with access can read the
   Private notes column, so share it only with people you trust with it.

To change the columns, edit `field_guide.csv`, add the column to the sheet,
and map it in `PUBLIC_KEYS` in `sync.py` if it's shown on the site.

## Publish edits

1. In the Proton Sheet: **File → Download → XLSX**.
2. Save the file into `tools/find-a-venue/sheet-export/` (any name; the newest
   file is used), or hand it to whoever runs the sync.
3. Run:

   ```bash
   npm run venues:sync
   ```

   - **Problems** are listed by row and column, e.g.
     `Row 11, Borough: required, but blank`. Nothing is written until the
     Approved rows are clean. Fix them in the sheet, export again, re-run.
     Problems on Pending or Archived rows are only warnings.
   - **New Venue IDs** are printed for rows that didn't have one. Paste them
     into the Venue ID column so the venue's web address never changes.
   - **Looked-up coordinates** are printed for rows that had an address but no
     Latitude/Longitude. Paste those in too.
   - **Moved pins**: a venue whose coordinates moved more than 150 m is
     flagged with `!`. Check it on a map.
   - A **change summary** lists venues added, removed, and fields changed.
4. Run the privacy test, check the page locally, then commit
   `src/data/venues.json` and push. Netlify deploys it.

   ```bash
   npm run venues:test
   ```

5. Delete the export from `sheet-export/` when you're done.

Only **Approved** rows are published, so new venues stay hidden until a
maintainer approves them.

### What gets published

- Only rows with **Status = Approved**.
- Only columns the Field guide marks **Shown on site = Yes**, plus the Venue ID
  as the page address. If a column's "Shown on site?" changes to No, it drops off the site
  on the next sync.
- The collaborator-only columns (key contact, email, phone, relationship
  notes) and Verified by / Submitted by are never published. A public contact
  belongs in the freeform *Contact* note instead.
- If the Field guide marks a *new* column as shown, the sync stops and asks for
  it to be added to `PUBLIC_KEYS` in `sync.py`. Then add it to the venue page.

### Geocoding

Rows with an address and no coordinates are looked up on
[Nominatim](https://nominatim.org/release-docs/latest/api/Search/) (OpenStreetMap)
at most once a second, with a User-Agent naming this project, per Nominatim's
[usage policy](https://operations.osmfoundation.org/policies/nominatim/).
Results are cached in `data/geocode_cache.json`.

## Approve a new venue

Collaborators add a row with **Status = Pending review**, and the public send
suggestions through `/find-a-venue/suggest` (emailed to `SUGGESTIONS_TO`).
To approve one:

1. Check it's a **public** place: never a private home, or an address an organizer only
   shares by email or RSVP.
2. Make sure it has at least a name, venue type, borough, and an address or coordinates.
3. Set **Status = Approved**, then export and sync. The sync prints its new
   Venue ID; paste that back into the sheet.
4. If the venue appears in the newsletter, add its pipeline code to
   `pipeline/venue_ids.csv` (see below) so it gets its Off Tech history.

## Correct a coordinate

Edit **Latitude / Longitude** in the sheet (decimal degrees), then export and
sync. The sync flags the move if it's more than 150 m.

To re-geocode from the address instead, clear both coordinate cells. If the
cached lookup was wrong, delete that address's entry from `data/geocode_cache.json`.

## Correct an activity tag

Events are tagged by keyword (`pipeline/activities.py`), which sometimes gets it
wrong. Add a line to `pipeline/activity_overrides.csv`:

```csv
event,activity
Druid School,"Walks, hikes & nature"
```

`event` matches the listing's name or its series name (e.g. `Druid School`
matches `Druid School (twice weekly)`), ignoring case. `activity` must be one
of the tags in `activities.py`. Then rebuild:

```bash
npm run venues:history
```

`npm run venues:history` also compares the result with the seed sheet's Off Tech
history tab, so you can see exactly what a change moved.

## Add a newsletter issue

New issues come out about twice a month. For now this is a manual append.

1. In `pipeline/data.py`, add the issue to `ISSUES`:
   `"I28": ("2026-11-01", "NYC Off Tech — NOVEMBER (2026)", "<buttondown slug>"),`
2. Add one line per event listing to `RAW`:
   `I28|Event name as listed|YYYY-MM-DD|VENUECODE|Host as listed`
   - A recurring series counts once per issue, dated to its last listed occurrence.
   - Private, neighborhood-only or RSVP-only addresses use `N:<Neighborhood>`.
     They're never shown as venues.
   - A new place needs a code in `V`; a new host shorthand goes in `H`.
     Write hosts exactly as the newsletter does.
3. Rebuild and review:

   ```bash
   npm run venues:history
   ```

   It prints places with several listings that aren't on the sheet yet. They're
   candidates to add.
4. For a new venue that's been approved on the sheet, add `CODE,venue-id,Name`
   to `pipeline/venue_ids.csv`.
5. Refresh the sheet's newsletter tabs:

   ```bash
   npm run venues:tabs
   ```

   This also refreshes the private reference workbook `data/off_tech_tabs.xlsx`.
6. Commit the pipeline changes. The next the sheet sync picks up the new history.

Places that are deliberately left out are listed in `EXCLUDED` in
`pipeline/history.py`: Stuyvesant Park, The Players Club, the 96 St Q station,
Apple Stores, and day trips outside NYC. Private and neighborhood-only addresses
are always skipped.
