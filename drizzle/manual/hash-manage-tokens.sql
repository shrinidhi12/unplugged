-- Hash host manage tokens at rest. One-off data migration, safe to re-run.
--
-- Applied to production on 2026-09-11 (14 tokens hashed). Kept for history: the
-- app no longer accepts plaintext tokens, so the only reason to run it again is
-- after restoring data from before that date.
--
-- Run AFTER the code that understands hashed tokens is deployed. That code
-- accepts both hashed and legacy plaintext tokens, but older deployed code only
-- understands plaintext, so running this first would lock hosts out of their
-- manage pages until the new deploy is live.
--
-- Idempotent: plaintext tokens are 32 characters and SHA-256 hex is 64, so rows
-- that are already hashed are skipped.
UPDATE "events"
SET "edit_token" = encode(sha256(convert_to("edit_token", 'UTF8')), 'hex')
WHERE length("edit_token") = 32;
