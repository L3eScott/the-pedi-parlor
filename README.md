# The Pedi Parlor Experience — Preview Website

Static preview site for **A Pamper Me Prettie, LLC** — mobile nail & footcare for seniors, East Baton Rouge.
Design matched to the business card (blush cream · deep wine · rose gold).

## Pages
- `index.html` — Home (hero, services, values, pricing, CTA)
- `about.html` — About / owner story
- `reviews.html` — Happy Clients (SAMPLE reviews — replace before launch)
- `booking.html` — Book a Visit (working calendar + request form)

## Structure
```
index.html about.html reviews.html booking.html
css/styles.css
js/main.js        (mobile nav)
js/calendar.js    (booking calendar — front-end demo, no backend yet)
images/           (owner.jpg, logo.png, customers/*.jpg)
```
Everything is relative-path and self-contained. No build step. Fonts load from Google Fonts CDN.

## Deploy — GitHub Pages
1. Create a repo, push these files to `main`.
2. Repo → Settings → Pages → Source = `main` / root → Save.
3. Live at `https://<user>.github.io/<repo>/` in ~1 min.

## Deploy — GoDaddy
- **Managed WordPress/website builder:** not a drop-in; use cPanel/File Manager hosting instead.
- **cPanel hosting:** File Manager → upload the whole folder's contents into `public_html/` (keep the `css/ js/ images/` structure). Done.
- Point the domain (e.g. `thepediparlor.com`) at the hosting in GoDaddy DNS.

## BEFORE IT GOES LIVE (must-do)
- [ ] Replace the **sample reviews + stock customer photos** with her real reviews/photos. (Fake testimonials can't be published as real.)
- [ ] Confirm final **pricing** with her (current numbers are researched estimates).
- [ ] Set up the real **contact@thepediparlor.com** inbox (or her preferred email).
- [ ] Wire the **booking form** to email/Formspree/scheduler (currently a front-end demo).
- [ ] Add real **social links** (FB/IG/TikTok/YouTube — currently `#` placeholders).
- [ ] Remove the **"Preview site" banner** (`.demo-flag`) once approved.
- [ ] Add real photos of her work / mobile setup if available.

## Notes
- Owner photo & logo were cropped from the business card for the preview.
- Customer portraits are free-to-use placeholders (randomuser.me).
