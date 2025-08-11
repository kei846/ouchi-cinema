import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate static paths for all posts to pre-render them at build time
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) [0...10] { "slug": slug }`
  );
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export const revalidate = 60; // Revalidate every 60 seconds

// Function to fetch a single post by slug
async function getPost(slug: string) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      body
    }`,
    { slug }
  );
  return post;
}

// The main page component for displaying a single post
export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose lg:prose-xl max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">{post.title}</h1>
          <PortableText value={post.body} />
        </article>
      </div>
    </div>
  );
}
