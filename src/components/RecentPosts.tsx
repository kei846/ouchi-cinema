import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function getRecentPosts() {
  const posts = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc)[0...3]{
      title,
      slug,
      mainImage,
      _createdAt
    }`
  );
  return posts;
}

const RecentPosts = async () => {
  const posts = await getRecentPosts();

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">最近の記事</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link key={post.slug.current} href={`/post/${post.slug.current}`} className="group block rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:ring-2 group-hover:ring-purple-500 group-hover:ring-opacity-50 h-full">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(500).url()}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-purple-600">{post.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(post._createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
