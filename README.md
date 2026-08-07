# thurrsolutions.com

Static site. No build step, no framework. Deploy by pointing Netlify (or Cloudflare Pages) at
this folder — `netlify.toml` already sets `publish = "."`.

## Editing it

**Change words, not markup.** Everything the page says lives in `content.js`. Headlines, the five
stages, the process steps, proof items, the founder copy — all data. `index.html` is scaffolding
and `main.js` renders content into it.

- **Add a proof item** → append to `content.proof.items`
- **Add your photo** → set `content.who.photo` to `"assets/therrance.jpg"`; a correctly-sized
  placeholder shows until then
- **Change the CTA** → `content.book.ctaHref` (currently mailto; swap for a real booking link)

## Brand

Built on `_ControlPlane/BrandKit/STUDIO/DESIGN-SYSTEM.md`. Ink `#16150F` on paper `#FAF9F5`,
Inter at two weights, 8px spacing grid. **Clay `#F36B21` appears exactly three times** — the hero
rule, the active stage number, and the scroll rail. It is an accent, not a theme. Do not add a
fourth.

The header uses the outlined horizontal lockup at 120px minimum width, per the guidelines.

## Motion

Sections arrive once on scroll and stay — no re-animating on scroll-up, which reads as a gimmick.

Three deliberate properties:
1. **Reveal styles are scoped to `.js-motion`**, a class the script adds to `<html>` on start. If
   `main.js` fails to load or throws, the class is never added and **every section stays visible**.
   A scroll effect must never be able to leave the page blank.
2. **A 2.5s failsafe** reveals everything if the IntersectionObserver never delivers — throttled
   background tab, old engine, anything unforeseen.
3. **`prefers-reduced-motion` is fully honoured** — no transitions, no rail.

The progress rail animates `transform: scaleX()`, never `width`, so it does not thrash layout.

## Local preview

```bash
python3 -m http.server 4173 --directory Website
```

Or `preview_start` with the `thurr-website` config in `.claude/launch.json`.

## Booking

The consult page reads `booking.options` in `content.js`. Each length has its own `url`:

```js
booking: {
  availability: "9am to 9pm Central, any day",
  options: [
    { label: "15 min", note: "...", url: null },
    { label: "30 min", note: "...", url: null, recommended: true },
    { label: "45 min", note: "...", url: null },
  ],
}
```

- **No urls set** → the Netlify form. Collects duration, times, name and email; you confirm by hand.
- **Any url set** → the form hides and the page shows the lengths as direct choices. Configured
  lengths link to their Google schedule; unconfigured ones fall back to email rather than showing a
  dead link. So it works half-finished.

### Why three schedules, not one

**A Google appointment schedule holds exactly one duration.** There is no setting for offering
several lengths inside one schedule, and no API for appointment schedules at all — the Calendar
API's `eventType` enum has no value for them. Offering 15 / 30 / 45 means three schedules and three
links.

That is a Google constraint, not a design choice, and the visitor never sees it: they get one page
with three lengths on it.

### Setup, once

For each of 15, 30 and 45 minutes:

1. calendar.google.com → **Create** → **Appointment schedule**
2. Set that duration
3. General availability **9am–9pm, every day**, timezone **Central**
4. Turn on **Google Meet** so each booking generates its own link
5. Add a buffer (15 min is sensible) and a minimum booking notice
6. **Share** → copy the booking link → paste it into the matching `url` in `content.js`

Do the 30-minute one first — it is marked `recommended` and is the length most people pick.
