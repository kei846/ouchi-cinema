import { createClient } from './src/sanity/lib/client'; // .ts 拡張子を削除

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Make sure you have a write token with appropriate permissions
});

const updateArticle = async () => {
  const docId = 'wp-post-804';
  const newSlug = 'escape';
  const authorInfo = 'けいちゃん - おうちシネマを運営しています。';
  const contactLink = 'https://mikomikopipi.com/contact';
  const copyrightNotice = '© 2025 おうちシネマ All rights reserved';

  try {
    await client
      .patch(docId)
      .set({
        'slug.current': newSlug,
        author_info: authorInfo,
        contact_link: contactLink,
        copyright_notice: copyrightNotice,
      })
      .commit();
    console.log(`Article ${docId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating article ${docId}:`, error.message);
  }
};

updateArticle();
