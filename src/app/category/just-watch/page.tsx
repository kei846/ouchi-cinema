'use client';

import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { Post } from '@/sanity/lib/queries';
import Link from 'next/link';

export default function JustWatchPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await client.fetch<Post[]>(`*[_type == "post" && references(*[_type=='category' && name=='Just Watch']._id)] | order(publishedAt desc) {
        ...,
        "slug": slug.current,
        "tags": tags[]->{
          _id,
          name,
          "slug": slug.current
        }
      }`);
      setPosts(res);
    };

    fetchPosts();
  }, []);

  return (
    <main style={{
      padding: '80px 20px',
      background: '#f6f5f2',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: '1.8rem',
        fontFamily: 'Georgia, serif',
        textAlign: 'center'
      }}>
        ただ観たい夜
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
        {posts.map(post => (
          <Link key={post._id} href={`/post/${post.slug}`}>
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)', 
              width: '300px', 
              cursor: 'pointer' 
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{post.title}</h2>
              <p style={{ marginTop: '10px', color: '#555' }}>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
