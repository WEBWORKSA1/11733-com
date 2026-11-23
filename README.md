# 11733.com — 11733 Home Hub

An independent home, real-estate and local-life hub for **ZIP 11733 (Setauket & East Setauket, NY)**: free home-value reports, buyer matching, local pro quotes, Long Island calculators, sourced ZIP data, guides and community features. Monetized with Google AdSense, lead generation, sponsorships, directory listings and reader pledges.

- **Stack:** static HTML/CSS/vanilla JS with Jekyll layouts, built natively by GitHub Pages (no build step)
- **Hosting:** GitHub Pages, `main` branch, root, custom domain `11733.com`
- **Forms:** FormSubmit AJAX to a private inbox (obfuscated in `assets/js/main.js`)
- **Automation:** `.github/workflows/auto-refresh.yml` re-stamps `_data/build.yml` weekly
- **Docs:** `RESEARCH.md` (findings and concept), `BUILD-PROMPTS.md` (phase-wise build prompts)

## Go-live checklist
1. Settings → Pages → Deploy from a branch → `main` / `(root)`.
2. DNS for 11733.com: A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` CNAME → `webworksa1.github.io`. Then Enforce HTTPS.
3. Submit any form once and confirm FormSubmit's activation email.
4. Search Console: verify and submit `/sitemap.xml`. Apply to AdSense (ads.txt is in place).

© 11733.com. "11733" is used only as a domain name and as the public ZIP Code it represents. See `/trademark.html`.
