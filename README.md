# Paul Scholz Website

Astro 4 website for `www.scholz-cloud.de` with bilingual pages, blog, SEO metadata, and automated deployment to GitHub Pages.

## Prerequisites

- Node.js 20 or newer
- npm
- GitHub account

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated static site is written to `dist/`.

## Deployment

Push to the `main` branch. GitHub Actions automatically installs dependencies, builds the Astro site, and deploys the output to the `gh-pages` branch.

Workflow file:
- `.github/workflows/deploy.yml`

Custom domain:
- `public/CNAME`

## Post-setup checklist

1. Create a GitHub repository named `paulscholz-website` or `piefkepaul.github.io`.
2. Push this project to the `main` branch.
3. In GitHub: `Settings -> Pages -> Source`, select the `gh-pages` branch.
4. In GitHub Pages settings, set the custom domain to `www.scholz-cloud.de`.
5. Register at `https://formspree.io`, create a form, and replace `FORMSPREE_ID_PLACEHOLDER` in `src/components/Contact.astro`.
6. In Cloudflare, create a DNS `CNAME` record from `www.scholz-cloud.de` to `piefkepaul.github.io` (or the repository Pages host) and disable the proxy for that record (gray cloud).
7. Add the real legal address in `src/pages/impressum/index.astro`.
8. Generate and add `public/apple-touch-icon.png`.

## Notes

- The site uses `@astrojs/sitemap` plus `src/pages/sitemap-custom.xml.ts` for explicit `lastmod` and `priority` hints.
- Legal pages and thank-you pages are set to `noindex`.
- The contact form currently redirects to `/danke/` or `/en/danke/` after a successful Formspree submission.
