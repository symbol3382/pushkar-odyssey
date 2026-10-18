# Pushkar Oddessey

A React, Vite, and TypeScript portfolio for pilgrimage, travel, stays, and local experiences. Editors manage published content in Sanity Studio. The public site is a static single-page app intended for Cloudflare Pages.

The visual design and existing pages stay in `web-ui`. Sanity Studio is a separate app in `studio`, so the public site can be built and deployed without Studio.

## A. Prerequisites

- Node.js 22 or newer. This machine may use a newer current release. Cloudflare Pages should use Node 22, which `web-ui/.node-version` requests.
- npm, which is the package manager already used by this repository. Do not replace `package-lock.json`.
- Git.
- A GitHub repository for the project.
- A Cloudflare account for Pages hosting.
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

If `VITE_SANITY_PROJECT_ID` is missing, the site shows the existing bundled demo content so the prototype still runs. Placeholder phone and email values in that demo are not production contact details. After the project ID is set, the site reads published Sanity content only. A failed request shows an error, not the demo catalog.

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
3. Add the local and production website origins to the project's CORS origins, with credentials disabled. Start with `http://localhost:3001`. Add the Cloudflare production URL and any preview URL after the first deploy.
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

6. Deploy hosted Studio when the client should edit content without the source code:

```bash
npm run deploy
```

Sanity hosts Studio at a `*.sanity.studio` address. The client signs in there with their Sanity user. The freelancer should be invited as an editor or developer, not by sharing the client's login.

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

## D. Cloudflare Pages deployment

This repository does not contain a completed Cloudflare project. Connect it yourself:

1. Push the repository to GitHub.
2. In Cloudflare, create a Pages project and import that repository.
3. Set the root directory to `web-ui`.
4. Build command: `npm run build`.
5. Build output directory: `dist`.
6. Production branch: the branch you want to serve, usually `main`.
7. Add the same `VITE_` variables for production and for preview deployments. Preview deployments get their own URLs. Add those origins to Sanity CORS if the preview site should load content.
8. Deploy, then open the Pages URL and check a direct link such as `/tours/some-slug`. `web-ui/public/_redirects` sends unknown paths to `index.html`, so the React app can render the route.
9. To use a custom domain, add it in the Pages project and follow Cloudflare's DNS instructions. Cloudflare provisions HTTPS. If the domain uses Cloudflare DNS, the proxied records should stay orange-cloud. If DNS is hosted elsewhere, create the CNAME or alias Pages shows. Do not disable HTTPS.
10. After the domain works, set `VITE_SITE_URL` to that origin and redeploy so canonical URLs and the sitemap use it.

Pages builds from GitHub. A merge to the production branch builds production. Other branches and pull requests can build preview deployments when that setting is enabled.

The site is static. It does not need a Worker or a custom server to serve files.

## E. Content publishing workflow

Editors publish in Studio. The website requests the published dataset when a visitor opens a page. A new pooja, package, stay, experience, or destination can appear without a new Git deploy. Sanity's CDN may take a short time to refresh.

Draft edits do not appear on the site and do not require a rebuild.

This is a client-rendered React app. The build does not create a separate HTML file for every CMS entry. Search engines that execute JavaScript can read the pages, but the first HTML response is the shared app shell. Titles and descriptions are updated in the browser after the content loads.

A later upgrade, if search listings need HTML for every entry, is to add a Vite prerender step that fetches published slugs at build time and writes one HTML file per route. At that point, a Sanity webhook can call a Cloudflare Pages deploy hook when a document is published. Filter the webhook to published documents, not drafts, and store the deploy hook URL only in Sanity's webhook settings. Do not add a webhook endpoint to this repository that accepts arbitrary deploy commands.

Until that upgrade exists, do not configure a rebuild webhook. Content updates do not need one.

## F. Troubleshooting

- **Missing project ID.** The site shows demo content. Copy `web-ui/.env.example` to `web-ui/.env.local` and set `VITE_SANITY_PROJECT_ID`. Restart `npm run dev`.
- **Wrong dataset.** Listings are empty or unexpected. `VITE_SANITY_DATASET` must match `SANITY_STUDIO_DATASET`.
- **Nothing published.** An empty catalog is shown on purpose. Publish the document in Studio. A draft is not enough.
- **Invalid or old slug.** The detail page shows a not-found message. Check the published slug.
- **Images missing.** Publish the image with alt text, and confirm the dataset is public. The browser requests `cdn.sanity.io`.
- **API error.** The page shows a retry message. Check the project ID, dataset, CORS origin, and that the dataset allows public reads of published content.
- **Cloudflare build failed.** Confirm the root directory is `web-ui`, the command is `npm run build`, the output is `dist`, and Node 22 is selected. Build logs are the source of truth.
- **Direct links 404.** Confirm `dist/_redirects` exists after the build and the Pages project is serving that output.
- **Wrong environment variable.** Preview and production are configured separately in Pages. A value present only on your laptop is not present in Cloudflare.
- **Studio login.** The user needs a Sanity account invited to this project. `studio/.env` needs the project ID. `npm run dev` in `studio` fails with a clear message when that ID is missing.
- **Webhook.** None is configured. You do not need one for the current site. If you add the prerender upgrade later, a failed webhook only means the latest HTML was not rebuilt. The live query path still reads published content.

## G. Costs and free-tier limits

Cloudflare Pages and Sanity both have free plans that can cover a small portfolio, subject to their current eligibility, bandwidth, document, and API quotas. Those quotas can change, and a busy site can exceed them.

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

`VITE_SANITY_API_VERSION` defaults to `2026-02-01`. Sanity's client uses that date to select query behavior. From API date `2025-02-19` onward, the client defaults to the published perspective. This app also sets `perspective: "published"` explicitly. To move forward, change the date in `.env.local`, in the Pages environment, and in this README, then verify listings still match the published documents.
