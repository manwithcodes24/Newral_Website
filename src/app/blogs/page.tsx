import { getAllBlogs } from "@/lib/blog";
import Link from "next/link";
import { motion } from "framer-motion"; // Use as Client Component if adding animation

export default async function BlogsPage() {
  const posts = await getAllBlogs();

  return (
    <main className="bg-black min-h-screen text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-20 text-center">
          Perspectives
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
              <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-[2rem] border border-white/10">
                <img
                  src={post.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={post.title}
                />
              </div>
              <h3 className="text-3xl font-bold leading-tight mb-3 group-hover:text-blue-500 transition-colors">
                {post.title}
              </h3>
              <p className="text-zinc-500 text-lg line-clamp-2">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}