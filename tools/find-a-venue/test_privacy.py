"""Fails if anything the Field guide keeps off the site reaches the site's data,
or if reading the sheet from Grist gives different data than an XLSX export.

    npm run venues:test
"""
import calendar, datetime, json, re, shutil, sys, tempfile, unittest
from pathlib import Path

import openpyxl

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import sync  # noqa: E402

SECRET = "SECRET"


def guide():
    return sync.read_field_guide(sync.XlsxSource(sync.SEED))


class FieldGuideMapping(unittest.TestCase):
    def test_only_shown_columns_have_public_keys(self):
        g = guide()
        for col in sync.PUBLIC_KEYS:
            self.assertEqual(g[col]["shown"], "Yes", f"{col} is published but not marked 'Shown on site = Yes'")

    def test_private_contact_columns_stay_private(self):
        g = guide()
        for col in ("Key contact", "Contact email", "Contact phone", "Relationship notes"):
            self.assertEqual(g[col]["shown"], "Collaborators only", col)
            self.assertNotIn(col, sync.PUBLIC_KEYS)


class BuiltData(unittest.TestCase):
    """Run a sync on a copy of the seed with every private cell filled in."""

    @classmethod
    def setUpClass(cls):
        cls.tmp = Path(tempfile.mkdtemp())
        src = cls.tmp / "export.xlsx"
        shutil.copy(sync.SEED, src)
        wb = openpyxl.load_workbook(src)
        ws = wb["Venues"]
        header = [c.value for c in ws[1]]
        g = sync.read_field_guide(sync.XlsxSource(sync.SEED))
        private = [c for c, v in g.items() if v["shown"] != "Yes" and c not in ("Venue ID", "Status")]
        for r in range(2, ws.max_row + 1):
            if not ws.cell(r, 1).value:
                continue
            for c in private:
                ws.cell(r, header.index(c) + 1).value = f"{SECRET}:{c}:{r}"
            b = ws.cell(r, header.index("Borough") + 1)
            b.value = b.value or "Manhattan"
        wb.save(src)
        cls.out = cls.tmp / "venues.json"
        ok, cls.venues = sync.run(src, geocode_on=False, out_path=cls.out, quiet=True)
        assert ok, "sync failed on the test export"
        cls.text = cls.out.read_text("utf-8")

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def test_no_private_values(self):
        leaks = set(re.findall(rf"{SECRET}:([^:\"]+):(\d+)", self.text))
        self.assertEqual(leaks, set(), "private cells reached venues.json")

    def test_relationship_notes_never_published(self):
        self.assertNotIn("Relationship notes", self.text)


class CommittedData(unittest.TestCase):
    """The venues.json the site actually ships."""

    def test_only_known_keys(self):
        data = json.loads(sync.OUT.read_text("utf-8"))
        allowed = {"id", "history", *sync.PUBLIC_KEYS.values()}
        for v in data["venues"]:
            self.assertLessEqual(set(v), allowed, v["id"])


class FakeGrist(sync.GristSource):
    """Serves an .xlsx through the Grist API's shapes: sanitized table and
    column IDs, labels holding the headers, dates as epoch seconds, and empty
    number cells as 0."""

    NUMERIC = {"Latitude", "Longitude", "Capacity (est.)"}

    def __init__(self, path):
        super().__init__("fake-doc", "fake-key", "https://grist.invalid")
        self.wb = openpyxl.load_workbook(path, data_only=True, read_only=True)

    def _type(self, label):
        return "Date" if label == "Last verified" else "Numeric" if label in self.NUMERIC else "Any"

    def _get(self, path, **params):
        table = path.split("/")[1]
        title = next(t for t in self.wb.sheetnames if re.sub(r"\W", "_", t) == table)
        rows = list(self.wb[title].iter_rows(values_only=True))
        header = rows[0]
        ids = [re.sub(r"\W", "_", str(h)) for h in header]
        if path.endswith("/columns"):
            return {"columns": [{"id": cid, "fields": {"label": h, "isFormula": False,
                                                     "type": self._type(h)}}
                                for cid, h in zip(ids, header)]}
        recs = []
        for n, r in enumerate(rows[1:], start=1):
            fields = {}
            for cid, h, v in zip(ids, header, r):
                if hasattr(v, "year"):
                    v = calendar.timegm(v.timetuple())
                if v is None:
                    v = 0 if self._type(h) == "Numeric" else ""
                fields[cid] = v
            recs.append({"id": n, "fields": fields})
        return {"records": recs}


class GristMatchesXlsx(unittest.TestCase):
    def test_same_site_data(self):
        tmp = Path(tempfile.mkdtemp())
        try:
            src = tmp / "export.xlsx"
            shutil.copy(sync.SEED, src)
            wb = openpyxl.load_workbook(src)
            ws = wb["Venues"]
            header = [c.value for c in ws[1]]
            # Fill gaps the seed has, plus a date, so both paths publish.
            for r in range(2, ws.max_row + 1):
                b = ws.cell(r, header.index("Borough") + 1)
                b.value = b.value or "Manhattan"
            ws.cell(2, header.index("Last verified") + 1).value = datetime.date(2026, 10, 1)
            wb.save(src)
            ok1, from_xlsx = sync.run(src, geocode_on=False, out_path=tmp / "a.json", quiet=True)
            ok2, from_grist = sync.run(FakeGrist(src), geocode_on=False, out_path=tmp / "b.json", quiet=True)
            self.assertTrue(ok1 and ok2)
            self.assertEqual(from_xlsx, from_grist)
            self.assertEqual(from_grist[0]["lastVerified"], "2026-10-01")
        finally:
            shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    unittest.main(verbosity=2)
