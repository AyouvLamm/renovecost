# RenovateCost.com — SEO Session Log

---

## SEO Session — 2026-07-10

**Audited:**
- Live site pulled via HTTP (headers, robots.txt, sitemap.xml) and full repo clone
- Every page checked for: title/meta description length, h1 count, canonical tag, JSON-LD presence, viewport tag, broken internal links, broken images, tag balance (div/section/footer/nav/body/html), internal cross-linking between blog posts
- `site:renovatecost.com` and a core keyword search ("kitchen remodel cost calculator free tool by state") to gauge current visibility — site did not appear against Home Depot/Houzz/Lowe's/KraftMaid and smaller competitors; only 2 of 17 sitemap URLs surfaced via `site:` search

**Fixed:**
- **Two pages were broken on the live site**: `privacy.html` and `about.html` were both truncated mid-tag (`© 2024 Renova` / `<div class="`) with no closing `</body></html>` — repaired both, matching the working footer templates from other pages
- Stale/inconsistent data-vintage claims: `cost-guide.html` said "2024" while the rest of the site is dated 2026; `index.html` claimed "2024 national averages" while `calculator.js`'s own header comment says the data is 2025 vintage — corrected both to be internally consistent (did not fabricate a 2026 data refresh that hasn't actually happened)
- `robots.txt` Sitemap directive pointed at the www subdomain while every sitemap URL is non-www
- Added canonical tags to all 17 pages (none existed before)
- Trimmed title tags on 3 pages (72–74 chars) and meta descriptions on 10 pages (up to 185 chars) that were getting truncated in search results
- `privacy.html` had no meta description at all — added one
- 9 of 10 blog posts had zero internal links to other blog posts — added a 3-link "Related Guides" block to each, matched thematically
- Expanded `about.html` (~223 words → ~430) with real methodology detail (how scope/quality-tier/state-adjustment inputs work, client-side-only data handling) and an editorial-independence statement — did not invent a founder bio/credentials since none exist to report
- `sitemap.xml` lastmod dates bumped from 2026-04-23 to 2026-07-10 to reflect this session's changes

**Added:**
- `WebApplication` + `FAQPage` JSON-LD on the homepage (FAQPage mirrors the visible FAQ content exactly)
- `Article` JSON-LD on all 10 blog posts (headline/description/dates/author/publisher)
- `BreadcrumbList` JSON-LD on all 16 non-homepage pages
- Open Graph + Twitter Card meta tags on all 17 pages (previously only the homepage had partial og:title/og:description, no page had og:image or any twitter:* tags)
- Real content images on 7 blog posts: the repo had 7 unused branded infographic jpgs (`day1`–`day7-*.jpg`, leftovers from an Instagram/TikTok content pipeline) that matched blog post topics almost exactly. Inserted each into its matching post with descriptive alt text, and reused them as og:image/twitter:image for those posts + Article schema `image` field
- Custom branded `404.html` (GitHub Pages was serving its generic default) with links back to the calculator, cost guide, and 4 popular guides; `noindex,follow`
- Refreshed "Updated April 2026" bylines and `dateModified` to July 2026 on all 10 blog posts to match the actual edit date

**Findings for next session:**
- 3 blog posts still have no content image (`blog-basement-finishing-cost.html`, `blog-free-home-renovation-estimate.html`, `blog-room-renovation-cost-calculator.html`) — no matching asset existed; would need new graphics
- Site-wide og:image fallback currently reuses `day1-kitchen-states.jpg` for pages without a dedicated image (homepage, about, contact, legal pages) — works but isn't purpose-built; a proper 1200×630 landscape brand image would render better in Facebook/LinkedIn link previews than a 1080×1080 square crop
- `calculator.js`'s cost data is dated "2025" internally — if the underlying numbers have actually been refreshed since, update that header comment and the on-page disclaimer text to match (did not touch `calculator.js` itself per the no-product-changes guardrail)
- `contact.html`'s form has no backend — `submitForm()` just shows a static "thanks" message and never sends anything. Not an SEO issue, but worth flagging since it silently fails to deliver messages
- Backlinks: none pursued or evaluated this session (requires manual outreach per guardrails) — still the single biggest lever for actually outranking Home Depot/Houzz-tier competitors, since on-page technical debt is now mostly cleared
- No GSC/Bing performance data was available this session (no CSV export provided) — next session should pull Queries + Pages report to find high-impression/low-CTR titles worth testing, and confirm indexing status directly rather than inferring from `site:` search

**Needs Ayoub's input:**
- Confirm whether `calculator.js` cost data should be refreshed to true 2026 figures (separate from this SEO pass — flagged, not touched)
- Export GSC Performance + Coverage reports (see SEO_AGENT.md §3) so the next session can work from real query/indexing data instead of inference
- Decide on backlink outreach targets (home-improvement forums, guest posts) — agent can draft pitch content but won't submit anything itself
- `git push` required manual auth (GCM browser prompt) — could not be completed non-interactively from this session
