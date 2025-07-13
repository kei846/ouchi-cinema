import Link from 'next/link';
import { createClient } from 'next-sanity';

// Define the structure of a post
interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

// Sanity client configuration (using environment variables)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01', // As per requirement
  useCdn: true, // Use CDN for faster reads
});

// Home component as an async React Server Component
export default async function Home() {
  // Fetch posts directly within the server component
  const posts: Post[] = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current
  } | order(publishedAt desc)`); // Order by publishedAt for a logical list

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="mb-4">
              <Link href={`/posts/${post.slug.current}`} className="text-blue-600 hover:underline text-xl">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>記事がありません。</p>
      )}
    </main>
  );
}