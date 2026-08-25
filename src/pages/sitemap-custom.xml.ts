import type { APIRoute } from 'astro';

const site = 'https://www.scholz-cloud.de';

function withTrailingSlash(pathname: string) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export const GET: APIRoute = async () => {
  const buildDate = new Date();

  const urls = [
    { path: '/', priority: '1.0', lastmod: buildDate },
    { path: '/en/', priority: '0.9', lastmod: buildDate }
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${site}${withTrailingSlash(entry.path)}</loc>
    <lastmod>${entry.lastmod.toISOString()}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
