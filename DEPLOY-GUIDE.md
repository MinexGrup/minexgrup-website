# Minex Grup — Deploy Guide (GitHub + Vercel)
Plain-language, click-by-click. Goal: get the website live. No command line needed.
The project folder is already prepared and version-controlled — you just publish and deploy.

---

## Step 1 — Put the code on GitHub (using GitHub Desktop)

GitHub Desktop is a free app that lets you publish this folder without any coding.

1. Download & install **GitHub Desktop**: https://desktop.github.com  → sign in with
   your existing GitHub account.
2. In GitHub Desktop: **File → Add Local Repository** → choose this folder:
   `Web-Site (Claude)`  → click **Add Repository**.
   (It's already a git repo with an initial commit, so it'll be recognized instantly.)
3. Click **Publish repository** (top bar). In the dialog:
   - **Name:** `minexgrup-website`
   - **Keep this code private:** ✅ leave CHECKED (private is right for a business).
   - **Organization:** choose your **minexgrup** organization (NOT your personal account).
   - Click **Publish repository**.
4. Done — the code now lives in GitHub, owned by the business. Both you and your partner
   (org owners) can see it under the minexgrup organization.

---

## Step 2 — Deploy on Vercel

1. Go to https://vercel.com → log in (Continue with GitHub).
2. Click **Add New… → Project**.
3. Find **minexgrup-website** in the list → click **Import**.
   (If it's not listed, click "Adjust GitHub App Permissions" and give Vercel access to
   the minexgrup organization.)
4. Vercel auto-detects **Next.js** — you don't need to change build settings.
5. Before clicking Deploy, open **Environment Variables** and add these three
   (name on the left, value on the right):

   | Name               | Value                                              |
   |--------------------|----------------------------------------------------|
   | RESEND_API_KEY     | (paste your Resend key — starts with `re_`)        |
   | QUOTE_RECIPIENTS   | siraj.t@minexgrup.com,j.talibov@minexgrup.com      |
   | QUOTE_FROM         | quotes@minexgrup.com                               |

   Notes:
   - `QUOTE_FROM` just needs to be on your verified domain — `quotes@minexgrup.com` works
     even though it isn't a real inbox (it's only the "from" label).
   - Replies to quote emails go to the CUSTOMER's address automatically.
6. Click **Deploy**. Wait ~1–2 minutes. Vercel builds it and gives you a live link like
   `minexgrup-website.vercel.app`. Open it — that's your live site.

---

## Step 3 — Test it

1. Open the Vercel link and click through the pages.
2. Go to **Contact / Request a Quote**, fill the form, and submit.
3. Check that a quote email arrives at siraj.t@ and j.talibov@minexgrup.com.
   (If it doesn't: confirm the Resend domain shows "Verified" and the API key is correct.)

---

## Step 4 — Point your domain (minexgrup.com) — do this when you're ready to go public

> Heads up: you currently have a live Squarespace site on minexgrup.com. This step
> replaces it with the new site, so do it only when you're happy with the new one.
> (Optional: point a subdomain like `new.minexgrup.com` first to preview it on the real
> domain without disturbing the current site.)

1. In Vercel: open the project → **Settings → Domains** → add `minexgrup.com`
   (and `www.minexgrup.com`). Vercel shows the DNS records it needs.
2. In Squarespace DNS, add those records (usually an A record and/or CNAME).
   This does NOT affect your email records — only which site the domain shows.
3. Wait for it to verify. Once done, minexgrup.com shows the new site with HTTPS.

---

## After launch — how updates work
- I make any change (photo, text, new page) → it's pushed to GitHub → Vercel rebuilds and
  the live site updates automatically in ~1 minute.
- You never touch code. You just tell me what to change, or drop new photos in the folder.

## What to have ready for Step 2
- Your Resend API key (from the Resend "API keys" page — keep it private).
- That's it. The recipient emails and from-address are in the table above.
