# Unplugg Me — Website Copy

All user-facing text on the site, in one place, so you can edit the words without
digging through code.

**How to use this:** edit any text below, then tell me to apply it — I'll sync your
changes into the code. This file is a copy deck; editing it does **not** change the
site automatically (the strings live in the components noted under each section).

`{curly braces}` = dynamic values filled in at runtime (event title, date, guest name,
etc.) — leave the braces in place, edit the words around them.

---

## Global / brand

- **Wordmark:** Unplugg Me
- **Tagline:** A community events platform
- **Browser tab title (home):** Unplugg Me 
- **Site description (SEO / link previews):** Social infrastructure outside big tech

_Source: `src/app/layout.tsx`, `src/app/manifest.ts`_

---

## Landing page (`/`)

_Source: `src/app/page.tsx`_

- **Nav link (top right):** Create an event
- **Eyebrow:** Social infrastructure outside big tech
- **Headline:** Host and find events for your community
- **Sub-headline:** A simple way to host events
- **Primary button:** Create an event →

**How it works:**

- **01 — Plan the event
- **02 — Invite others
- **03 — Hang up, hang out :)

- **Footer:** The event is the medium

---

## Create an event (`/create`)

_Source: `src/app/create/page.tsx`, `src/components/CreateForm.tsx`, `src/components/MapPicker.tsx`_

- **Page title:** Create an event
- **Page subtitle:** (No account needed)

**Form fields:**

- **Title label:** What's the plan?
  - _Placeholder:_ Something silly
- **Date label:** Date
- **Time label:** Time
- **Timezone helper:** Times shown in {timezone}.
- **Description label:** Describe the event
  - _Placeholder:_ Put important details your guests need to know here
- **Place label:** Place _(required)_
  - _Placeholder:_ e.g. Tompkins Square Park??
- **Map label:** Pin it on the map
- **Map search placeholder:** Search an address or place…
- **Map search button:** Find
- **Map helper:** Tap the map to drop a pin, or drag it to fine-tune.
- **Address placeholder:** Address (guests get an 'Open in Google Maps' link)
- **Host name label:** Your name
- **Host email label:** Your email
- **Host email helper:** We'll email you a private link to manage the event. No account, no password.

**Buttons:**

- **Submit:** Create event
- **Submit (while saving):** Creating…
- **Cancel link:** Cancel

**Validation messages:**

- Your event needs a name.
- Pick a date.
- Add a location.
- Add your name.
- Add a real email — that's where your host link goes.

_Validation source: `src/app/actions.ts`_

---

## Public invite / splash page (`/e/{link}`)

_Source: `src/app/e/[slug]/page.tsx`_

- **Eyebrow:** You're invited!
- **Canceled banner:** The host has called this event off. Stay tuned for new details...
- **Map link:** Open in Maps app →
- **Footer:** Made with Unplugg Me — a free events platform. Host your own events! →

### RSVP form (on the splash page)

_Source: `src/components/RsvpForm.tsx`_

- **Heading:** Let us know if you're coming!
- **Sub-text:** Just add your name and email. Only the host sees your reply.
- **Name placeholder:** Your name
- **Email placeholder:** you@email.com
- **Plus-ones label:** Bringing anyone?
- **Plus-ones (none):** Just me
- **Plus-ones (some):** +{number}
- **Note placeholder:** A note for the host (optional)
- **Primary button:** I'm in →
- **Primary button (submitting):** …
- **Decline button:** Can't make it

**After you say you're in:**

- **Heading:** You're in.
- **Body:** We've sent a confirmation and a calendar invite to your inbox. See you there!

**After you decline:**

- **Heading:** Maybe next time.
- **Body:** Thanks for letting the host know. No hard feelings.

**RSVP validation messages:**

- Add your name.
- Add a real email.
- This event no longer exists.
- This event has been canceled.

---

## Host manage page (`/e/{link}/manage/{secret}`)

_Source: `src/app/e/[slug]/manage/[token]/page.tsx`, `src/components/ShareLink.tsx`, `src/components/EditEventForm.tsx`_

- **Eyebrow:** Host view
- **Just-created banner:** Your event is live. We've emailed you this link too. Bookmark it! It's the only way back in.

**Share section:**

- **Heading:** Share this link to invite people
- **Sub-text:** Guests see the plan and RSVP. They never see the guest list.
- **Copy button:** Copy
- **Copy button (after click):** Copied!

**Guest list:**

- **Headcount heading:** {number} coming
- **Headcount detail (when plus-ones):** ({number} RSVPs + plus-ones)
- **Can't-make-it count:** {number} can't
- **Empty state:** No replies yet. Share the link above to get the first yes.
- **Guest "can't" tag:** · can't make it
- **Remove guest button:** Remove

**Edit event:**

- **Toggle:** Edit event details
- **Field labels:** Title / Date / Time / Description / Place / Pin
- **Address placeholder:** Address
- **Save button:** Save changes
- **Save button (saving):** Saving…
- **Close button:** Close
- **Saved confirmation:** Saved.

**Cancel event:**

- **Toggle:** Cancel this event
- **Warning:** This calls the event off and emails everyone who said they're coming. It can't be undone.
- **Confirm button:** Yes, cancel the event

---

## "Not found" page (404)

_Source: `src/app/not-found.tsx`_

- **Eyebrow:** Nothing here
- **Heading:** This event isn't around anymore.
- **Body:** The link might be mistyped, or the host called the event off and it's been cleared away.
- **Button:** Make your own event →

---

## Link preview card (the image shown when a link is shared)

_Source: `src/app/e/[slug]/opengraph-image.tsx`_

- **Eyebrow:** Unplugg Me · You're invited
- **Title:** {event title}
- **When:** {date · time}
- **Where:** {place}
- **Footer line:** A forever-free events platform.

---

## Emails

_Source: `src/lib/email.ts`_

Every email footer reads: **Sent with Unplugg Me — a forever-free events platform.**

### 1. Host manage link (sent to the host when they create an event)

- **Subject:** You're hosting: {event title}
- **Heading:** Your event is live: {event title}
- **Body:** All set — {event title} is on for {date · time}.
- **Button:** Manage your event
- **Note:** This link is your only way back in to see who's coming and edit the details. Keep it to yourself.
- **Share prompt:** Invite people by sharing this link: {link}

### 2. Guest confirmation (sent to a guest who says they're in)

- **Subject:** You're in: {event title}
- **Heading:** You're in: {event title}
- **Body:** See you there{, and your +N}.
- _(then the event date/time and location)_
- **Button:** See the details
- **Note:** We've attached a calendar invite so it's already on your calendar.

### 3. Host RSVP notice (sent to the host on each new RSVP)

- **Subject:** {guest name} {is in / can't make it}: {event title}
- **Heading:** {guest name} {is in / can't make it}{ +N}
- **Body:** {guest name} {is in / can't make it}{ +N} for {event title}.
- _(guest's note, if they left one)_
- **Button:** See your guest list

### 4. Cancellation notice (sent to guests if the host cancels)

- **Subject:** Canceled: {event title}
- **Heading:** Canceled: {event title}
- **Body:** Sorry — {event title} ({date · time}) has been called off by the host.

---

## App install name (PWA / home-screen)

_Source: `src/app/manifest.ts`_

- **Full name:** Unplugg Me — phone-free events
- **Short name:** Unplugg Me
- **Description:** A free, phone-free way to host and find event. Get off big tech and into public spaces!
