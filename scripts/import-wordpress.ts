import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@portabletext/block-tools';
import Schema from '@sanity/schema';
import { sanityClient } from './sanityClient';

// Define a minimal schema for block content conversion
const defaultSchema = Schema.compile({
  name: 'myBlog',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema.get('blogPost').fields.find((field: { name: string; type: any }) => field.name === 'body')?.type;

if (!blockContentType) {
  throw new Error('Could not find block content type in schema.');
}

interface WordPressPost {
  id: number;
  date_gmt: string;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  tags: number[];
}

interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

interface WordPressTag {
  id: number;
  name: string;
  slug: string;
}

const WP_BASE_URL = 'https://mikomikopipi.com/wp-json/wp/v2';

async function fetchWordPressData<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${WP_BASE_URL}/${endpoint}?per_page=100`); // Fetch up to 100 items per page
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

async function htmlToPortableText(html: string) {
  const dom = new JSDOM(html);
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (htmlString) => new JSDOM(htmlString).window.document,
  });
}

async function importCategories(wpCategories: WordPressCategory[]) {
  const categoryMap: { [wpId: number]: string } = {};
  for (const wpCategory of wpCategories) {
    const doc = {
      _type: 'category',
      _id: `wp-category-${wpCategory.id}`,
      title: wpCategory.name,
      slug: {
        _type: 'slug',
        current: wpCategory.slug,
      },
    };
    await sanityClient.createOrReplace(doc);
    console.log(`Imported category: ${wpCategory.name}`);
    categoryMap[wpCategory.id] = doc._id;
  }
  return categoryMap;
}

async function importTags(wpTags: WordPressTag[]) {
  const tagMap: { [wpId: number]: string } = {};
  for (const wpTag of wpTags) {
    const doc = {
      _type: 'tag', // Assuming you have a 'tag' schema type in Sanity
      _id: `wp-tag-${wpTag.id}`,
      title: wpTag.name,
      slug: {
        _type: 'slug',
        current: wpTag.slug,
      },
    };
    await sanityClient.createOrReplace(doc);
    console.log(`Imported tag: ${wpTag.name}`);
    tagMap[wpTag.id] = doc._id;
  }
  return tagMap;
}

async function importPosts() {
  console.log('Fetching WordPress categories...');
  const wpCategories = await fetchWordPressData<WordPressCategory>('categories');
  const categoryMap = await importCategories(wpCategories);

  console.log('Fetching WordPress tags...');
  const wpTags = await fetchWordPressData<WordPressTag>('tags');
  const tagMap = await importTags(wpTags);

  console.log('Fetching WordPress posts...');
  const wpPosts = await fetchWordPressData<WordPressPost>('posts');

  for (const wpPost of wpPosts) {
    if (wpPost.status !== 'publish') {
      console.log(`Skipping non-published post: ${wpPost.title.rendered}`);
      continue;
    }

    const portableTextBody = await htmlToPortableText(wpPost.content.rendered);

    const categoriesRefs = wpPost.categories.map(catId => ({
      _ref: categoryMap[catId],
      _type: 'reference',
    })).filter(ref => ref._ref); // Filter out any categories not found

    const tagsRefs = wpPost.tags.map(tagId => ({
      _ref: tagMap[tagId],
      _type: 'reference',
    })).filter(ref => ref._ref); // Filter out any tags not found

    const doc = {
      _type: 'post',
      _id: `wp-post-${wpPost.id}`,
      title: wpPost.title.rendered,
      slug: {
        _type: 'slug',
        current: wpPost.slug,
      },
      publishedAt: wpPost.date_gmt,
      body: portableTextBody,
      categories: categoriesRefs.length > 0 ? categoriesRefs : undefined,
      tags: tagsRefs.length > 0 ? tagsRefs : undefined,
    };

    await sanityClient.createOrReplace(doc);
    console.log(`Imported post: ${wpPost.title.rendered}`);
  }
  console.log('WordPress import complete!');
}

importPosts().catch(console.error);
