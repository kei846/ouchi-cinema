import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

// Define the props type for the page component
type PostPageProps = {
  params: { slug: string };
};

// Generate static paths for all posts to pre-render them at build time
export async function generateStaticParams() {
  const posts = await client.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "post" && defined(slug.current)]{ "slug": slug }`
  );
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

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
export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug; // slug is now guaranteed to be a string

  const post = await getPost(slug);

  if (!post) {
    // In a real application, you might want to render a proper 404 page
    return <div>Post not found</div>;
  }

  return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
    <div className="prose lg:prose-xl">
      <PortableText value={post.body} />
    </div>
  </div>
)
;
}
