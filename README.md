# Unplugg Me

**A forever-free, phone-free events platform.** Host and find events for your friends
and the public — a dead-simple way to invite people to real-life things. No accounts,
no feeds, no follower counts. The event is the medium.

> Free forever, independent of private equity, and dedicated to actually bringing
> people together. Licensed AGPL-3.0 so it can never be taken private and closed.

## What it does

- **Create an event** — date, time, a required location (pin it on a map), a short line about it.
- **Share one link** — a public splash page that unfurls nicely in messages. No guest login.
- **RSVP with just a name + email** — you're in, or you're not (no "maybe"); +1s allowed.
  Guests get a confirmation and a calendar invite; the host is notified of each reply.
- **No accounts** — creating an event emails the host a private manage link. That link is the key.
- **Private by design** — no public guest names, no public head-count. Only the host sees who's coming.
- **Free maps** — keyless Leaflet + OpenStreetMap picker, plus an "Open in Google Maps" link.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript, server actions
- [Drizzle ORM](https://orm.drizzle.team) + [Neon](https://neon.tech) serverless Postgres
- [Resend](https://resend.com) for transactional email (+ `.ics` calendar invites)
- [Leaflet](https://leafletjs.com) + OpenStreetMap for the map picker
- Deployed on [Netlify](https://netlify.com); design system is a two-ink Risograph look (Archivo + Archivo Black)

## Local development

```bash
npm install
cp .env.example .env.local     # then fill in DATABASE_URL (and RESEND_API_KEY, optional)
npx drizzle-kit push           # create the tables in your Neon database
npm run dev                    # http://localhost:3000
```

Without `RESEND_API_KEY`, emails are logged to the console instead of sent — handy for local testing.

## Environment variables

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `RESEND_API_KEY` | Resend API key (blank in dev → emails log to console) |
| `EMAIL_FROM` | From address, e.g. `Unplugg Me <hello@unplugg.me>` |
| `NEXT_PUBLIC_BASE_URL` | Base URL for links/emails (`http://localhost:3000` in dev) |

## License

[AGPL-3.0-or-later](LICENSE). If you run a modified version as a network service, you
must release your source. That's intentional — it keeps Unplugg Me open.
