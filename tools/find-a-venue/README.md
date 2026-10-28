# Find a venue: maintainer guide

`/find-a-venue` is built from two sources:

1. **The collaborator sheet**, a [Grist](https://www.getgrist.com) doc.
   Approved collaborators keep venue details there. Ask the site owner for
   access. The doc's address is kept out of this public repo on purpose.
2. **The NYC Off Tech newsletter** ([archive](https://buttondown.com/nycofftech/archive/)).
   `pipeline/` turns every event listing into per-venue history.

A GitHub Action (`.github/workflows/venues-sync.yml`) reads the Grist doc
every morning, or whenever someone clicks **Run workflow**. If an Approved
venue changed, it commits `src/data/venues.json` and Netlify deploys it.
Nothing is ever written back to the sheet.

To run things by hand you need Python 3.10+ and `openpyxl`
(`pip install openpyxl`). Netlify never runs Python: `src/data/venues.json`
is committed.

## Folder map

| Path | What it is |
|---|---|
| `sync.py` | Grist doc (or an XLSX export) → `src/data/venues.json`. Validates, geocodes, merges history, strips private fields. |
| `test_privacy.py` | Fails if any non-public column could reach the site data, or if Grist and XLSX reads disagree. |
| `sheet-export/` | For the XLSX fallback. **Gitignored**, because exports contain contact details. |
| `data/venues_master_seed.xlsx` | The sheet's starting schema and data, including the **Field guide** tab, which is the schema. |
| `data/geocode_cache.json` | Saved address lookups, so each address is geocoded once. |
| `data/off_tech_tabs.xlsx` | Generated **Off Tech history** and **Past events** tabs. Import into the sheet after each new issue. |
| `data/off_tech_history.csv` | The same per-venue history as CSV (plus "All activities"); `sync.py` reads it. |
| `data/venues.geojson`, `venues.kml` | Generated export for uMap and other OSM tools. |
| `data/venue_references.xlsx` | The original research: every listing in issues 1–27, with method notes. |
| `pipeline/data.py` | Every newsletter listing, one line each. |
| `pipeline/activities.py` | The keyword activity tagger. |
| `pipeline/activity_overrides.csv` | Hand corrections to activity tags. |
| `pipeline/venue_ids.csv` | Pipeline venue code → Venue ID on the site. |
| `pipeline/history.py` | Builds the history. Also holds the exclusion list and hand edits. |
| `pipeline/sheet_tabs.py` | Writes the two newsletter tabs for the sheet (`off_tech_tabs.xlsx`). |
| `pipeline/mapdata.py` | Writes the GeoJSON/KML export from the synced data. |
| `reference/prototype-map.html` | The original prototype (UX reference only). |

## What's on the sheet

- **Venues**: one row per venue. Collaborators fill these in.
  - **Venue notes** on the site come from *Notes for hosts* (about the space),
    *Food & drink*, *Alcohol*, and the contact columns. Contact name, role,
    email and phone are only published if *OK to show contact publicly?* is
    Yes; otherwise they stay on the sheet for people with access.
    *Relationship notes* are never published.
- **Off Tech history**: per-venue totals from the newsletter. Generated.
- **Past events**: every event the newsletter listed at each venue (date,
  name, host as listed, activity, and a link to the issue). Generated. Private
  and neighborhood-only addresses are never included.
- **Field guide**: the schema. Every column, its allowed values, and whether
  it's shown on the site.

## Set up Grist (once)

1. Make a free account at [getgrist.com](https://www.getgrist.com) and create
   an empty document.
2. Import `data/venues_master_seed.xlsx` (**Add New → Import from file**). Keep
   all five tabs. Check that the Venues table's column headers came through as
   column labels, e.g. *Capacity, standing (est.)*.
3. Share the doc only with collaborators (**Share → Manage users**). Don't make
   it public: it holds contact details. Optional: use **Access rules** to hide
   the Contact columns from collaborators who don't need them.
4. Get the doc ID from the URL: `https://docs.getgrist.com/<DOC-ID>/...`.
   (If the doc lives on a team site, the server is `https://<team>.getgrist.com`.
   Set that as the repo variable `GRIST_SERVER`.)
5. Create an API key: **Account settings → Developer → API Key → Create**
   (`https://docs.getgrist.com/account/developer`).
6. Give both to GitHub as repository secrets. Each command prompts for the value,
   so it never lands in your shell history:

   ```bash
   gh secret set GRIST_DOC_ID
   ```

   ```bash
   gh secret set GRIST_API_KEY
   ```

7. Netlify already deploys every push to `main`. If that ever changes, the
   Action's commits won't go live until you reconnect it (`netlify init`).
8. Run the workflow once from GitHub's **Actions** tab (**Sync venues from
   Grist → Run workflow**) and read its summary.

The API key can read and edit every doc that account can open. If you'd rather
limit that, create a separate Grist account with view-only access to just this
doc and use its key.

## Publish edits

Collaborators edit the Grist doc. Changes go live at the next morning's run, or
straight away when someone with GitHub access clicks **Run workflow** on the
**Sync venues from Grist** action. Each run's summary lists what changed.

- Only **Approved** rows are published, so new venues stay hidden until a
  maintainer approves them.
- **Problems** fail the run and nothing is published. The run summary lists
  them by row and column, e.g. `Row 11, Borough: required, but blank`. Fix them
  in Grist and run it again. Problems on Pending or Archived rows are only warnings.
- **New Venue IDs** are printed for rows that didn't have one. Paste them into
  the Venue ID column so the venue's web address never changes.
- **Looked-up coordinates** are printed for rows that had an address but no
  Latitude/Longitude. Paste those in too.
- **Moved pins**: a venue whose coordinates moved more than 150 m is flagged
  with `!`. Check it on a map.

To run the same sync on your computer:

```bash
GRIST_DOC_ID=... GRIST_API_KEY=... npm run venues:sync -- --grist
```

### Without Grist: an XLSX export

`npm run venues:sync` with no `--grist` reads the newest `.xlsx` in
`sheet-export/` (or `--input FILE.xlsx`). Commit `src/data/venues.json`
afterwards and deploy. Run `npm run venues:test` first.

### What gets published

- Only rows with **Status = Approved**.
- Only columns the Field guide marks **Shown on site = Yes**, plus the Venue ID
  as the page address. If a column's "Shown on site?" changes to No, it drops off the site
  on the next sync.
- **Contact name, role, email and phone** are published only on rows where
  **OK to show contact publicly? = Yes**, which needs the venue's agreement.
  **Relationship notes**, Verified by and Submitted by are never published.
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

Edit **Latitude / Longitude** in the sheet (decimal degrees) and set
**Location precision** to `exact`, or to `approx` if the pin is only placed by
neighborhood or cross street. The site shows an "approximate location" note
for `approx`. Export and sync. The sync flags the move if it's more than 150 m.

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

   Then in Grist, **Add New → Import from file** with `data/off_tech_tabs.xlsx`,
   and for each tab choose **Update existing table** (Off Tech history, Past
   events) so the tables are replaced rather than duplicated.
6. Commit the pipeline changes. The next Grist sync picks up the new history.

Places that are deliberately left out are listed in `EXCLUDED` in
`pipeline/history.py`: Stuyvesant Park, The Players Club, the 96 St Q station,
Apple Stores, and day trips outside NYC. Private and neighborhood-only addresses
are always skipped.
