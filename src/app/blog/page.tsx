import { client } from "@/sanity/lib/client";
import Link from "next/link";

async function getPosts() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt
  }`);
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {posts.map((post: any) => (
          <Link key={post._id} href={`/blog/${post.slug}`}>
            <div className="p-4 border rounded-lg hover:bg-gray-100">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}