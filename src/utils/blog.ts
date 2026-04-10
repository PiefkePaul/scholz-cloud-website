import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export async function getPublishedBlogPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (left, right) => right.data.pubDate.valueOf() - left.data.pubDate.valueOf()
  );
}

export function formatBlogDate(date: Date, locale: 'de' | 'en') {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd().replace(/[.,;:!?-]+$/, '')}...`;
}

export function getReadingTime(text: string, wordsPerMinute = 220) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
