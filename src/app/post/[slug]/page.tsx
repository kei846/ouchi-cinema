import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Function to generate static paths for all posts
export async function generateStaticParams() {
  const posts = await client.fetch<Array<{ slug: { current: string } }>>(`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) [0...10] { "slug": slug }`);
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export const revalidate = 60; // Revalidate every 60 seconds

// Function to fetch a single post by slug
async function getPost(slug: string) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    body,
    author_info,
    contact_link,
    copyright_notice
  }`, { slug });
  return post;
}

// Main page component for displaying a single post
export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose lg:prose-xl">
        <PortableText value={post.body} />
      </div>

      {(post.author_info || post.contact_link || post.copyright_notice) && (
        <div className="mt-12 pt-8 border-t border-gray-700 text-gray-400 text-sm">
          {post.author_info && <p className="mb-2">{post.author_info}</p>}
          {post.contact_link && (
            <p className="mb-2">
              Contact: <a href={post.contact_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{post.contact_link}</a>
            </p>
          )}
          {post.copyright_notice && <p>{post.copyright_notice}</p>}
        </div>
      )}
    </div>
  );
}