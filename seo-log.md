# RenovateCost.com — SEO Session Log

---

## SEO Session — 2026-07-13 (part 2: indexing cleanup)

**Audited:** Walked through actual GSC and Bing Webmaster Tools data with Ayoub (screen-shared, Ayoub drove all logged-in actions — Claude Code does not and will not hold credentials for either account).

Google Page Indexing report (dated 6/30/26, i.e. before this week's fixes had been crawled):
- 15/18 pages already indexed — much better than the `site:` search operator suggested (that only ever showed 2, confirmed as an unreliable signal, not a real problem)
- 3 not indexed, broken into 2 issues:
  - **Duplicate without user-selected canonical** (1 page: `index.html`) — root cause was GitHub Pages serving identical content at both `renovatecost.com/` and `renovatecost.com/index.html` with no canonical signal before this week's canonical-tag fix
  - **Discovered - currently not indexed** (2 pages: `privacy.html`, `blog-free-home-renovation-estimate.html`) — Google knew about them via sitemap but hadn't prioritized crawling. `privacy.html` likely relates to it being broken HTML until this week; `blog-free-home-renovation-estimate.html` was never broken, so this one is a genuine crawl-budget/low-authority signal, not a code issue.

Bing Webmaster Tools:
- Sitemap already registered and reading successfully (Status: Success) — nothing was broken, just hadn't recrawled since 5/31/26
- `about.html` URL Inspection showed "Discovered but not crawled — URL cannot appear on Bing," consistent with the same broken-HTML theory

**Fixed:**
- Nothing code-side this entry — this was entirely GSC/Bing UI actions performed by Ayoub, guided step-by-step.

**Added:** n/a

**Findings for next session:**
- Confirmed diagnosis: the site's remaining indexing gaps are (a) stale crawl data that should self-resolve now that canonical tags + broken-HTML fixes are live, and (b) one genuine crawl-budget/authority signal (`blog-free-home-renovation-estimate.html` sat un-crawled for 3 months) — this second category is what backlinks actually fix, code changes can't.
- Give it 1-3 weeks before re-checking the Page Indexing report — validation and reindex requests aren't instant.

**Needs Ayoub's input:**
- Actions completed this session: resubmitted Bing sitemap; requested Bing indexing for `about.html`; clicked "Validate Fix" in GSC for the canonical issue and the discovered-not-indexed issue; requested Google indexing directly for `privacy.html`, `about.html`, `blog-garage-conversion-cost.html`, and the homepage. Nothing further needed from Ayoub on indexing until the recrawl window has passed.
- Backlink outreach (see `backlink-outreach.md`) is still the single open, non-automatic item.

---

## SEO Session — 2026-07-13

**Audited:** First real Google Search Console data reviewed (3-month Performance report, screenshot provided by Ayoub): 6.66K impressions, 3 clicks, 0.045% CTR, **average position 73.1**. Confirms the site is being crawled and occasionally surfaced, but ranks far too low (~page 8) to get real clicks — a domain-authority/indexation problem, not an on-page one. Re-checked `site:renovatecost.com` — still only 2/17 pages showing (unchanged from before this session's fixes; expected, indexing takes time to catch up).

**Fixed:**
- Two rounds of image polish on the 7 content images added last session: (1) removed `loading="lazy"` after a persistent favicon-overlay rendering artifact was reported — confirmed via direct pixel inspection that the icon was never actually in the files; (2) discovered and fixed a real, consistent bug in the original graphics: the "renovatecost.com" wordmark text overlapped the headline in all 7 images. Erased the wordmark pixels (redundant anyway — the site nav already shows the logo) rather than cropping, since cropping clipped headline text in several images.
- Colors on all 7 images recolored from their original mixed palette (orange/gold/teal/dark-green/dark-red) to the site's actual blue (#1a56db) / navy (#0f172a) theme, preserving color only where it's semantically meaningful (ROI bar chart ranking, cheap-state vs. expensive-state comparison).

**Added:**
- New page: `blog-garage-conversion-cost.html`. The calculator supports 7 room types (kitchen, bathroom, bedroom, living room, basement, roof, garage) but garage was the only one with zero dedicated content despite having real cost data in `calculator.js`. Covers basic garage renovation vs. full living-space conversion (materially different cost categories — HVAC/permits/egress) plus state variance and resale-value tradeoffs. Wired into the room-calculator's room-grid (was linking to a generic calculator anchor), added as a 4th related-guide on 2 other posts for inbound links, added to sitemap.xml.

**Findings for next session:**
- Garage page is brand new — no ranking data yet, revisit once it's been indexed a few weeks.
- Bedroom and Living Room are the only remaining room types without dedicated blog posts — same content gap pattern as garage, lower priority since they're less commonly searched as standalone renovation projects.
- Still haven't received Queries/Pages/Coverage exports from GSC — the position-73 diagnosis is directional (from the summary graph only), not query-specific. Next session should use those to find which specific queries are closest to breaking onto page 1.

**Needs Ayoub's input:**
- Export GSC Queries, Pages, and Coverage/Indexing reports (still outstanding from last session's ask)
- Backlink outreach — this is now the single biggest lever left for the position-73 problem, and it's manual by design. Can draft outreach/pitch copy on request.
- Confirm sitemap is submitted in Bing Webmaster Tools (separate from Google, unconfirmed)
- Consider using GSC's URL Inspection tool to manually request indexing for the pages fixed this session and last (privacy.html, about.html especially, since they were broken HTML until recently and may have been rejected by Google's indexer)

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
