import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  body: any; // PortableText content
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: true,
});

// Function to fetch a single post by slug
async function getPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    body
  }`, { slug });
  return post;
}

// Function to generate static params for all posts (for static generation)
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// Page component for displaying a single post
export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound(); // If post not found, trigger Next.js notFound
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose lg:prose-xl">
        <PortableText value={post.body} />
      }
    </div>
  );
}