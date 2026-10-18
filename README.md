# Pushkar Oddessey

A React, Vite, and TypeScript portfolio for pilgrimage, travel, stays, and local experiences. Editors manage published content in Sanity Studio. The public site is a static single-page app deployed as Cloudflare Workers static assets.

The visual design and existing pages stay in `web-ui`. Sanity Studio is a separate app in `studio`, so the public site can be built and deployed without Studio.

## A. Prerequisites

- Node.js 22 or newer. This machine may use a newer current release. Cloudflare should use Node 22, which `web-ui/.node-version` requests.
- npm, which is the package manager already used by this repository. Do not replace `package-lock.json`.
- Git.
- A GitHub repository for the project.
- A Cloudflare account for hosting.
- A Sanity account. The client should own the Sanity organization, the Cloudflare account, the domain, and the GitHub repository. Give the developer member access rather than sharing owner passwords.

There is no Sanity project, dataset, hosted Studio, or Cloudflare site in this repository yet. Those are created with the steps below.

## B. Local frontend setup

From `web-ui`:

```bash
cd web-ui
npm install
cp .env.example .env.local
npm run dev
```

The dev server runs at `http://localhost:3001`.

Set these values in `web-ui/.env.local`:

| Variable                  | Purpose                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `VITE_SANITY_PROJECT_ID`  | Public project ID from [sanity.io/manage](https://www.sanity.io/manage). Not a token.           |
| `VITE_SANITY_DATASET`     | Dataset name. Use `production` unless you created another one.                                  |
| `VITE_SANITY_API_VERSION` | Sanity query API date. This app pins `2026-02-01`.                                              |
| `VITE_SITE_URL`           | Public site origin, such as `https://example.com`. Leave it unset until the real domain exists. |

`VITE_` values are embedded in the public JavaScript bundle. They are safe only when they are not secrets. Never put a Sanity write token, robot token, or management token in a `VITE_` variable.

The site reads published Sanity content only. If `VITE_SANITY_PROJECT_ID` is missing, listings, detail pages, works, history, and contact details stay empty. A failed request shows an error. It does not fill the page with sample tours, stays, or phone numbers.

Other commands, from `web-ui`:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`npm run build` writes `dist`. When `VITE_SITE_URL` is set, the build also writes `dist/sitemap.xml` and adds that sitemap to `dist/robots.txt`. It does not invent a domain.

## C. Sanity project setup

1. Create a Sanity account and a new project at [sanity.io/manage](https://www.sanity.io/manage). Choose the Free plan if it is available. A public dataset is required so the website can read published documents without a token.
2. Create a dataset named `production` if the project does not already have one. In the project API settings, allow public read access for published documents. Do not turn off access control, and do not add a token to the frontend to compensate for a private dataset.
3. Add the local and production website origins to the project's CORS origins, with credentials disabled. Start with `http://localhost:3001`. Add the Cloudflare production URL and any preview URL after the first deploy. The Studio origin is separate: add it with credentials allowed, because editors sign in through Studio.
4. In `studio`, install dependencies and link the project:

```bash
cd studio
npm install
cp .env.example .env
```

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` in `studio/.env`. These identify the project. They are not secrets, and this file must not contain a token.

5. Start Studio locally:

```bash
npm run dev
```

Studio prints a local URL. Sign in with the Sanity account that belongs to the project.

6. Host Studio on Cloudflare so editors can use it without the source code. In the Cloudflare project whose root directory is `studio`:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Environment variables: `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET`, the same values as `studio/.env`. Do not add a Sanity token.

`npm run build` and `npm run deploy` both write the static Studio to `dist`. Neither one logs into Sanity. `studio/wrangler.jsonc` publishes that folder as the Worker `pushkar-oddessey-studio`. After the first deploy, add that Studio URL to Sanity CORS with credentials allowed.

Leave the Cloudflare build command as `npm run deploy` if it is already set. Set the deploy command to `npx wrangler deploy`.

`npm run deploy:sanity` is only for a machine where `sanity login` has already been run. It publishes a `*.sanity.studio` address instead of the Cloudflare Worker. The client signs in with their Sanity user. The freelancer should be invited as an editor or developer, not by sharing the client's login.

7. Create content from the Studio desk: Site, Offerings, Places, and Stories. Publish each document when it is complete. Drafts stay private. Site settings, the home page, and history are single documents, so Studio hides duplicate and delete for those three.

8. Confirm the website shows the published item. With the frontend env vars set, refresh `http://localhost:3001`. Publishing does not require a frontend rebuild, because the browser requests published content.

### Roles

Use the least access that still lets the client work. An editor can create and publish content. A developer can change the Studio schema. Avoid sharing the organization owner role. Do not create an API token for the public website.

### How the client edits content

- Add a pooja, travel package, stay, guide or riding experience, or destination from the matching list. Fill the English fields, generate the slug, add an image with alt text, and publish.
- Other languages are optional fields on the same document. An empty translation shows the English text. Do not leave English blank.
- Prices are optional. Leave the price empty when the offer is enquiry-only. A number is a starting price, not a confirmed quote.
- Link a pooja, package, stay, or experience to a destination. The destination page lists those links automatically.
- Slugs become the public URL, such as `/tours/pushkar-sacred-circuit`. Change a slug only when you accept that older links will stop working.
- Testimonials and FAQs appear only after you publish real entries. Do not invent guest names, quotes, or ratings.
- Works appear in the gallery. General pages are published at `/pages/your-slug`.
- To unpublish, use Unpublish in the document menu. To avoid publishing a half-finished entry, keep it as a draft until the title, slug, and image are ready.
- Image alt text is required once an image is uploaded.

## D. Cloudflare deployment

The public site is the Worker `pushkar-oddessey`, configured in `web-ui/wrangler.jsonc`. It serves the Vite build from `dist` and, for any path that is not a real file, returns `index.html` so React Router can render the route.

Connect the Git repository in Cloudflare with these settings:

1. Root directory: `web-ui`.
2. Build command: `npm run build`.
3. Deploy command: `npx wrangler deploy`.
4. Production branch: the branch you want to serve, usually `main`.
5. Add the same `VITE_` variables for production and for preview deployments. Preview deployments get their own URLs. Add those origins to Sanity CORS if the preview site should load content.
6. Deploy, then open a direct link such as `/tours/some-slug`. That request is not a file in `dist`. `assets.not_found_handling` is `single-page-application`, so Cloudflare serves `index.html` and the app renders the route.
7. To use a custom domain, add it on the Worker and follow Cloudflare's DNS instructions. Cloudflare provisions HTTPS. If the domain uses Cloudflare DNS, the proxied records should stay orange-cloud. If DNS is hosted elsewhere, create the CNAME or alias Cloudflare shows. Do not disable HTTPS.
8. After the domain works, set `VITE_SITE_URL` to that origin and redeploy so canonical URLs and the sitemap use it.

Do not add `web-ui/public/_redirects` with `/* /index.html 200`. Workers strips `.html` and `/index` from that target, the catch-all matches again, and the deploy fails with error 100324.

A merge to the production branch builds production. There is no custom Worker script. Static files are the whole site.

## E. Content publishing workflow

Editors publish in Studio. The website requests the published dataset when a visitor opens a page. A new pooja, package, stay, experience, or destination can appear without a new Git deploy. Sanity's CDN may take a short time to refresh.

Draft edits do not appear on the site and do not require a rebuild.

This is a client-rendered React app. The build does not create a separate HTML file for every CMS entry. Search engines that execute JavaScript can read the pages, but the first HTML response is the shared app shell. Titles and descriptions are updated in the browser after the content loads.

A later upgrade, if search listings need HTML for every entry, is to add a Vite prerender step that fetches published slugs at build time and writes one HTML file per route. At that point, a Sanity webhook can call a Cloudflare deploy hook when a document is published. Filter the webhook to published documents, not drafts, and store the deploy hook URL only in Sanity's webhook settings. Do not add a webhook endpoint to this repository that accepts arbitrary deploy commands.

Until that upgrade exists, do not configure a rebuild webhook. Content updates do not need one.

## F. Troubleshooting

- **Missing project ID.** Listings and contact details stay empty. Copy `web-ui/.env.example` to `web-ui/.env.local`, set `VITE_SANITY_PROJECT_ID`, and restart `npm run dev`.
- **Wrong dataset.** Listings are empty or unexpected. `VITE_SANITY_DATASET` must match `SANITY_STUDIO_DATASET`.
- **Nothing published.** An empty catalog is shown on purpose. Publish the document in Studio. A draft is not enough.
- **Invalid or old slug.** The detail page shows a not-found message. Check the published slug.
- **Images missing.** Publish the image with alt text, and confirm the dataset is public. The browser requests `cdn.sanity.io`.
- **API error.** The page shows a retry message. Check the project ID, dataset, CORS origin, and that the dataset allows public reads of published content.
- **Cloudflare build failed.** Confirm the root directory is `web-ui`, the build command is `npm run build`, the deploy command is `npx wrangler deploy`, and Node 22 is selected. Build logs are the source of truth.
- **Deploy fails on `_redirects` error 100324.** Remove `public/_redirects`. The SPA fallback is `not_found_handling` in `web-ui/wrangler.jsonc`.
- **Direct links 404.** Confirm `web-ui/wrangler.jsonc` sets `assets.not_found_handling` to `single-page-application` and `assets.directory` to `./dist`.
- **Wrong environment variable.** Preview and production are configured separately in Cloudflare. A value present only on your laptop is not present in Cloudflare.
- **Studio login.** The user needs a Sanity account invited to this project. `studio/.env` needs the project ID. `npm run dev` in `studio` fails with a clear message when that ID is missing. The hosted Studio origin must be in Sanity CORS with credentials allowed.
- **Cloudflare Studio build says you must login.** The deployed `studio/package.json` still has `"deploy": "sanity deploy"`. Push the version whose `deploy` script is `sanity build`, and set the Cloudflare deploy command to `npx wrangler deploy`. Set `SANITY_STUDIO_PROJECT_ID` in that project's environment.
- **Webhook.** None is configured. You do not need one for the current site. If you add the prerender upgrade later, a failed webhook only means the latest HTML was not rebuilt. The live query path still reads published content.

## G. Costs and free-tier limits

Cloudflare Workers static assets and Sanity both have free plans that can cover a small portfolio, subject to their current eligibility, bandwidth, document, and API quotas. Those quotas can change, and a busy site can exceed them.

Costs that this project does not include, and that may not be free:

- A custom domain and its renewal.
- Email delivery beyond a normal mailbox.
- A form provider, if you later replace the WhatsApp enquiry path.
- Sanity or image-bandwidth overages.
- Payments, live hotel inventory, or a booking database.

This repository does not guarantee that the production system will remain free.

## What the site does

Visitors can browse tours, stays, poojas, services, destinations, works, history, and contact details. Enquiry buttons open WhatsApp or a phone call when the business has published those numbers. Sending a prefilled WhatsApp message does not confirm a booking. The contact form does not store the visitor's message. It opens WhatsApp, or it explains that WhatsApp is not configured.

There is no payment processing and no live room availability.

## SEO limits

The app sets a page title, description, Open Graph and Twitter tags, and JSON-LD for published CMS entries. Canonical URLs are added only when `VITE_SITE_URL` is a real origin. Structured data omits reviews, ratings, availability, and prices. A `robots.txt` file allows crawling. The sitemap lists fixed routes, plus published slugs when the Sanity variables are present at build time.

## API version

`VITE_SANITY_API_VERSION` defaults to `2026-02-01`. Sanity's client uses that date to select query behavior. From API date `2025-02-19` onward, the client defaults to the published perspective. This app also sets `perspective: "published"` explicitly. To move forward, change the date in `.env.local`, in the Cloudflare environment, and in this README, then verify listings still match the published documents.
