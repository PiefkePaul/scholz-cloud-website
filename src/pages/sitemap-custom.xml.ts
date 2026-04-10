import type { APIRoute } from 'astro';
import { getPublishedBlogPosts } from '../utils/blog';

const site = 'https://www.scholz-cloud.de';

function withTrailingSlash(pathname: string) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function formatDate(date: Date) {
  return date.toISOString();
}

export const GET: APIRoute = async () => {
  const posts = await getPublishedBlogPosts();
  const buildDate = new Date();
  const latestPostDate =
    posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate ?? buildDate;

  const staticUrls = [
    { path: '/', priority: '1.0', lastmod: buildDate },
    { path: '/en/', priority: '0.9', lastmod: buildDate },
    { path: '/blog/', priority: '0.8', lastmod: latestPostDate },
    { path: '/en/blog/', priority: '0.7', lastmod: latestPostDate }
  ];

  const blogUrls = posts.flatMap((post) => [
    {
      path: `/blog/${post.slug}/`,
      priority: '0.7',
      lastmod: post.data.updatedDate ?? post.data.pubDate
    },
    {
      path: `/en/blog/${post.slug}/`,
      priority: '0.6',
      lastmod: post.data.updatedDate ?? post.data.pubDate
    }
  ]);

  const urls = [...staticUrls, ...blogUrls];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${site}${withTrailingSlash(entry.path)}</loc>
    <lastmod>${formatDate(entry.lastmod)}</lastmod>
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
