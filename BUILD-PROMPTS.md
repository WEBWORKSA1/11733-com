# 11733.com — Phase-wise Build Prompts

Use these prompts in order to rebuild or extend **11733 Home Hub**, an independent home, real-estate and local-life hub for ZIP 11733 (Setauket and East Setauket, NY). Each phase ends with a check before you move on.

---

## Phase 0 — Guardrails (paste first in every session)
> You are building **11733.com — 11733 Home Hub**, a static, Jekyll-compatible site hosted free on GitHub Pages (repo WEBWORKSA1/11733-com, main branch, root). Rules:
> - Every page loads in `<head>`: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>`. Auto ads only. Never add fake ad boxes or place ads to look like form buttons.
> - A top bar on every page reads "Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership". The whole sentence links to https://web.works/contact. The text "web.works" is never visible.
> - All forms post to one private inbox through FormSubmit's AJAX endpoint. The address is assembled at runtime from an XOR-obfuscated char array in main.js and never appears in HTML, text or the README. Every form has a honeypot and a consent checkbox.
> - Real estate content: Fair Housing compliant, no steering, no ranking areas by who lives there, referral relationships disclosed, "not a brokerage/lender/law firm" disclaimers.
> - No fabricated statistics, reviews, testimonials, listings or businesses. Every number names its source and date.
> - Trademark: claim nothing in "11733"; state no affiliation with USPS, the Town of Brookhaven, Suffolk County, Stony Brook University, BNL, school districts or historical societies.
> - Vanilla HTML, CSS and JS only. Mobile-first, accessible (labels, focus states, reduced motion), with light and dark themes.

## Phase 1 — Foundation
> Create `_config.yml` (url https://11733.com), `CNAME` (11733.com), `ads.txt` (`google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`), `robots.txt`, a Liquid `sitemap.xml`, `site.webmanifest`, an SVG favicon (house roof + "11733") and OG image, and `_data/build.yml` with an `updated` date. Build `_layouts/default.html` with SEO meta, canonical, OG/Twitter, WebSite JSON-LD plus optional page `schema`, the AdSense script, the contact top bar, a sticky header (badge "⌂ 11·7·33" + "Home Hub", nav: Home Value, Find Pros, Buy, Calculators, 11733 Data, Living Here, Guides, Community, gold CTA "Free value report"), a site-wide lead band, a footer with a newsletter form, four link columns, the trademark disclosure and a Fair Housing line, a mobile sticky CTA bar, a once-per-session lead nudge (not on lead pages) and a cookie notice. Add `_layouts/guide.html` (hero, article, sources list, not-advice callout, sticky lead sidebar).
> **Check:** every page shows the top bar, footer disclosure and AdSense script.

## Phase 2 — Design system
> Write `assets/css/style.css`. Coastal palette: navy #0f2a43, teal #1f8a8a, gold #e9b44c, brick #c2502e, sand #f6f1e7, with a dark-theme override. Fonts: Fraunces (headings) and Inter (body). Components: buttons, cards, stat tiles, hero with a wave edge, calculator split layout, canvas chart box, stacked payment bar, sticky-header tables, pill tabs, multi-step form (progress bar, choice tiles, live preview), trust row, tiers, fund bars, video facade, article and sidebar, FAQ details, event date blocks, timeline, directory "open slot" cards, cookie and nudge overlays, and a reveal animation.
> **Check:** no horizontal scroll at 360, 768 and 1280px in both themes. The nav collapses to a burger below 1240px.

## Phase 3 — Engine (`assets/js/main.js`)
> Theme toggle, active nav, burger, reveal, cookie notice, nudge, fund bars, YouTube nocookie click-to-load facades, a tiny canvas line chart, a `pmt()` helper, the multi-step form controller (per-step validation, auto-advance on tile pick, Back/Next, no scroll on load), and FormSubmit AJAX submission with a mailto fallback that also uses the obfuscated inbox. Calculators:
> - **Quick value** (hero): sq ft × $379 (Redfin Oct 2025 11733 median $/sq ft) × condition factor, ±10% range. Passes values to /home-value.html.
> - **Mortgage**: PITI, PMI at 0.6% below 20% down, HOA, extra principal, amortization table and balance/interest chart.
> - **Affordability**: min(28% of income, 36% minus debts) solved for price by bisection, compared with the $773K median.
> - **Property tax**: value × effective rate − credits, a 1.6–2.4% comparison table and a cumulative projection.
> - **NY closing costs**: buyer (1% mansion tax at ≥ $1M, recording tax share, title, attorney, lender) and seller (0.4% transfer tax, commission, attorney, misc.) with net proceeds or cash to close.
> - **Rent vs buy**: net cost of buying (payments + tax + maintenance − equity after 6% selling costs) vs renting (rent − growth on invested down payment and savings).
> **Check:** $773K, 20% down, 7.28%, 30 yrs → P&I $4,231, total $5,720 at 2% tax and $2,400 insurance.

## Phase 4 — Lead generation (highest priority for revenue)
> `/home-value.html`: 4-step seller form (goal tiles → address, area, type, sq ft → condition and upgrades with a **live ballpark** → contact, consent, optional agent intro). Hidden fields: lead_type and estimate_preview. Sidebar listing "what's in your report".
> `/get-quotes.html`: 3-step home-services form (14 service tiles → timing, budget, ZIP, description → contact, number of quotes, consent).
> `/buyers.html`: 3-step buyer match (stage → budget, beds, timeline, must-haves → contact, lender quotes) plus a 6-step buyer path.
> Feed these from the hero estimator, the lead band, the nudge, the mobile bar, every calculator's next-step card and guide sidebars.
> **Check:** submissions arrive in the inbox; no step can be skipped; the preview updates live.

## Phase 5 — Core content pages
> `index` (hero estimator, three paths, tools grid, four-number market band, guides, living teaser, community cards, FAQ with FAQPage JSON-LD), `tools`, `data` (sourced people, market and cost stats plus a "why sources disagree" callout), `living` (location, timeline, anchors, outdoors, transport, housing, fair-housing note, sources), `events` (verified organizer events plus a submission form), `directory` (filterable "open" category slots and a pro application form), `videos` (verified YouTube IDs: 12_LSZUTUs8, Y3sJ5IDTjKI, y-1Gh4ewklY, vy_pvstdBhg, plus history links).

## Phase 6 — Monetisation & community
> `/support.html`: tiers $11 / $7.33 per month / $117 / $1,173+, a use-of-funds chart (operations 35%, hiring 30%, contests 20%, promotion 15%), and a pledge form that sends a secure payment link (no card fields; not tax-deductible).
> `/contest.html` and `/rules.html`: North Shore Photo & Story Contest, four categories, skill-based, 18+, no purchase necessary, sponsor-funded $1,173 pool goal.
> `/careers.html`: six paid roles plus an application and talent-pool form. `/advertise.html`: category sponsor, pay-per-lead, calculator sponsor, newsletter and contest packages, ad standards, and a media-kit form with domain/website acquisition and partnership options. `/community.html` links them all.

## Phase 7 — AdSense-approval content
> `/guides/` with 8 original, sourced Markdown guides: selling in 11733; buying checklist; Brookhaven tax grievance (RP-524, Grievance Day, SCAR); NY closing costs (mansion, transfer and recording taxes, worked example); hiring contractors in Suffolk (county license, insurance, contract, 3-day cancellation); flood and insurance on the North Shore; cost of living in 11733 (full monthly math); the Culper Spy Ring. Add about, contact, privacy (AdSense cookie and opt-out language, FormSubmit, CCPA/GDPR/PIPEDA/Law 25), cookies, terms, disclaimer (referral disclosure, Fair Housing), editorial policy, trademark and 404.
> **Check:** rerun every number in Python; no unsourced figures.

## Phase 8 — Automation & deploy
> Add `.github/workflows/auto-refresh.yml` (weekly cron rewrites `_data/build.yml`, commits and triggers a Pages rebuild). Push to `WEBWORKSA1/11733-com` on `main`. In Settings → Pages: Source "Deploy from a branch", main / (root), custom domain 11733.com, Enforce HTTPS. DNS: A records 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, plus `www` CNAME → webworksa1.github.io. Then submit one form and click FormSubmit's one-time activation email.

## Phase 9 — Launch & growth
> Verify in Google Search Console and submit the sitemap; apply to AdSense with 11733.com. Sign the first 3 category sponsors (roofing, HVAC, cesspool), one listing agent and one lender. Publish a monthly "11733 Market Pulse". Post Shorts for each guide linking back to the matching calculator. Expand to sister ZIP pages (11790 Stony Brook, 11777 Port Jefferson, 11776 Port Jefferson Station) using the same templates, plus an embeddable property-tax widget for backlinks.
