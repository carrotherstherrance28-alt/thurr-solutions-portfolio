# thurrsolutions.com

Static site; no framework or build step. `Website/` is the editable source. Production is a scoped flat copy in `/Users/thurr/Documents/thurr-solutions-portfolio`.

## Current files

- `index.html`: the offer-led homepage with the original folded-arrow hero. Its copy and metadata are native HTML.
- `direction.css` and `direction.js`: homepage styling and optional decorative motion. The stylesheet URL in `index.html` includes a content fingerprint.
- `consult.html`, `consult.js` and `content.js`: consultation choices and booking configuration.
- `styles.css`: consultation and thanks-page styling; retain it when changing homepage styles.
- `consult-thanks.html`, `assets/` and `card/`: existing routes and assets retained by this release.
- `main.js`: retained legacy homepage renderer; the current homepage does not load it.

The original review stays in `review-2026-10-04-offer/`. It is a local, `noindex` preview rather than the production entry point. Production `index.html` uses root asset paths, a canonical URL and Open Graph metadata; it has no preview `noindex` directive. Editing the root homepage does not automatically change the preserved review.

## Hosting and release

| Setting | Value |
|---|---|
| Live domain | https://thurrsolutions.com |
| Host | Vercel, not Netlify |
| Vercel project | `right-thurr` |
| Vercel organization | `thurrenterprise-6341s-projects` |
| Deploy repo | `git@github.com:carrotherstherrance28-alt/thurr-solutions-portfolio.git` |
| Production branch | `main` |
| Root / framework | `.` / Other; static files |

Therrance authorized pushing this homepage release on October 8, 2026. That authorization covers this release, not unrelated changes or future releases.

**Do not use the current `ship.sh` for this release.** Its root allowlist omits `direction.css` and `direction.js`; its `rsync --delete` removes files, and its `git add -A` can stage unrelated changes. Its five-file check also misses the new homepage resources and consultation modules. It has not been revised here.

Use the following scoped procedure after local QA. First inspect the deploy repo's status and branch. Stop and reconcile any existing changes or an unexpected branch before copying; do not sweep them into this release.

```bash
SITE_SOURCE=/Users/thurr/Documents/ThurrSolutions/Website
SITE_DEPLOY=/Users/thurr/Documents/thurr-solutions-portfolio

git -C "$SITE_DEPLOY" status --short
git -C "$SITE_DEPLOY" branch --show-current

for site_file in index.html direction.css direction.js consult.html consult.js content.js README.md; do
  cp "$SITE_SOURCE/$site_file" "$SITE_DEPLOY/$site_file"
done

git -C "$SITE_DEPLOY" diff --check
git -C "$SITE_DEPLOY" diff --stat
git -C "$SITE_DEPLOY" diff -- index.html consult.html consult.js content.js README.md

git -C "$SITE_DEPLOY" add -- index.html direction.css direction.js consult.html consult.js content.js README.md
git -C "$SITE_DEPLOY" diff --cached --name-only
git -C "$SITE_DEPLOY" diff --cached --check
```

Review the staged diff, including the two new files. Only those seven paths belong in this release. Existing `styles.css`, card files, assets and Vercel headers remain in the deploy repo; no directory synchronization or deletion is needed. Never stage `.env` files or `.vercel/`, and do not stage the separate ThurrSolutions parent repo.

Once the staged diff and required QA pass:

```bash
git -C "$SITE_DEPLOY" commit -m "SITE: publish offer-led folded-arrow homepage and resilient booking"
git -C "$SITE_DEPLOY" push origin main
```

A successful push or a Vercel Ready status does not prove the domain is current. Fetch `/`, `/index.html`, `/direction.css`, `/direction.js`, `/consult.html`, `/consult.js`, `/content.js`, `/styles.css`, `/card/` and every referenced local asset. Confirm HTTP status, compare each shipped resource's SHA256 with the deploy copy, and render the real HTTPS homepage. Verify the consultation module URLs including their `?v=` fingerprints. Check `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` and the configured Referrer-Policy.

If the domain still serves stale bytes after checking deployment status, inspect the linked `right-thurr` project. A production deployment from the deploy repo using `vercel --prod --yes` is a fallback within this release's authorization. Repeat domain byte and browser checks afterward; do not report the site as live while those checks fail.

## Booking

`consult.html` contains three real anchor links before JavaScript runs: a configured 30-minute Google schedule and email alternatives for 15 and 45 minutes. `consult.js` enhances those choices from `content.js`, building the complete replacement before inserting it. Empty configuration, a blocked module or disabled JavaScript leaves the native choices available.

The parked form has no working submission handler. It stays hidden in HTML and JavaScript; do not expose or rely on it. Checking booking means inspecting links and the schedule destination, not submitting a booking or email.

The stylesheet and consultation modules have content fingerprints in their URLs. After editing `direction.css`, update `/direction.css?v=...` in `index.html` with the first 12 SHA256 characters of that CSS file. `consult.html` loads `consult.js?v=...`, which imports `content.js?v=...`: use the first 12 SHA256 characters of `content.js` in its import URL, then hash the resulting `consult.js` and update its URL in `consult.html`. Copy the matching resource and referencing HTML/module together so source and deploy stay synchronized. This prevents cached resources from being paired with new markup.

## Design, motion and checks

Ink `#16150f`, paper `#faf9f5` and clay `#d9552b`; Archivo, Instrument Sans and JetBrains Mono. The homepage uses an original folded-arrow SVG, without client proof, portfolio imagery or a founder-photo placeholder. Clay-filled buttons use ink labels for contrast.

The homepage content, navigation and native service disclosures work without JavaScript. Motion is optional and pauses through its visible control, on hover, offscreen and in background tabs. Mobile and reduced-motion preferences receive a static arrow. Before release, check desktop and narrow mobile layouts, horizontal overflow, keyboard focus, service disclosures, motion pause and reduced motion, and booking with JavaScript disabled or modules blocked.

## Local preview

```bash
python3 -m http.server 4175 --bind 127.0.0.1 --directory /Users/thurr/Documents/ThurrSolutions/Website
```

Current root: http://127.0.0.1:4175/

Preserved design review: http://127.0.0.1:4175/review-2026-10-04-offer/
