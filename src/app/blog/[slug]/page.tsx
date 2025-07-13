import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string) {
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishedAt,
    body
  }`, { slug });
  return post;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose lg:prose-xl">
        <PortableText value={post.body} />
      </div>
    </div>
  );
}