import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MoveLeft, Clock, Calendar, Hash } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

const slugify = (text: string) => 
    text.toLowerCase()
        .replace(/[0-9]+\.\s+/, "") // Removes "1. " or "2. " from the start
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const blogDir = path.join(process.cwd(), "blogs");
    const files = fs.readdirSync(blogDir);
    const fileName = files.find(f => f.toLowerCase().replace(/\.mdx$|\.md$/, "") === slug.toLowerCase());

    if (!fileName) {
        return (
            <div className="bg-black text-white h-screen flex flex-col items-center justify-center font-sans">
                <h1 className="text-4xl font-bold mb-4 tracking-tighter">Post Not Found</h1>
                <Link href="/blogs" className="text-blue-500 hover:underline">Back to blogs</Link>
            </div>
        );
    }

    const filePath = path.join(blogDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);

    // 1. GENERATE SIDEBAR HEADINGS
    const headings = content.split('\n')
        .filter(line => line.startsWith('## ') && !line.includes('Table of Contents'))
        .map(line => line.replace('## ', '').trim());

    // 2. CLEAN CONTENT: Remove the manual "Table of Contents" section from the body
    // This looks for "## Table of Contents" and removes everything until the next Heading
    const cleanedContent = content.replace(/## Table of Contents[\s\S]*?(?=## )/, "");

    // 3. Calculate Reading Time
    const wordsPerMinute = 200;
    const readingTime = Math.ceil(content.split(/\s+/).length / wordsPerMinute);

    return (
        <main className="bg-black text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
         

            <div className="max-w-7xl mx-auto px-6 mt-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-24 items-start">
                    
                    {/* MAIN CONTENT COLUMN */}
                    <article className="w-full">
                        <header className="mb-12 lg:mb-20">
                            <div className="flex flex-wrap items-center gap-4 text-zinc-500 text-xs md:text-sm mb-6 uppercase tracking-[0.15em] font-bold">
                                <span className="flex items-center gap-1.5"><Calendar size={14} /> {data.date}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                <span className="flex items-center gap-1.5"><Clock size={14} /> {readingTime} MIN READ</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-12 text-white">
                                {data.title}
                            </h1>

                            <div className="relative aspect-[21/9] rounded-[2rem] lg:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                                <img 
                                    src={data.thumbnail} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                    alt={data.title} 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>
                        </header>

                        {/* RENDERED CONTENT */}
                        <div className="
                            prose prose-invert max-w-none 
                            prose-lg md:prose-xl 
                            prose-headings:text-white prose-headings:tracking-tighter prose-headings:font-bold
                            prose-p:text-zinc-300 prose-p:leading-relaxed md:prose-p:leading-loose
                            prose-strong:text-white prose-strong:font-bold
                            prose-li:text-zinc-300
                            prose-hr:border-zinc-800 prose-hr:my-16
                            prose-blockquote:border-l-blue-600 prose-blockquote:bg-zinc-900/30 prose-blockquote:rounded-r-2xl prose-blockquote:py-1 prose-blockquote:px-8 prose-blockquote:not-italic
                        ">
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h2: ({ children }) => {
                                        const id = slugify(String(children));
                                        return <h2 id={id} className="text-3xl md:text-4xl pt-8 scroll-mt-12 border-t border-zinc-900 mt-16 pb-4">{children}</h2>;
                                    },
                                    h3: ({ children }) => <h3 className="text-2xl text-white/90 pt-4">{children}</h3>,
                                    blockquote: ({ children }) => (
                                        <div className="my-12 border-l-4 border-blue-600 bg-blue-600/5 p-8 rounded-r-3xl">
                                            <p className="text-xl md:text-2xl font-medium text-white m-0 leading-relaxed italic">
                                                {children}
                                            </p>
                                        </div>
                                    ),
                                    hr: () => <hr className="border-zinc-800 my-20" />
                                }}
                            >
                                {cleanedContent}
                            </ReactMarkdown>
                        </div>
                    </article>

                    {/* STICKY SIDEBAR (For 16" and 21" Monitors) */}
                    <aside className="hidden lg:block sticky top-12 space-y-10 py-4">
                        <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[2rem] backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-6 text-blue-500">
                                <Hash size={16} />
                                <h4 className="text-xs uppercase tracking-[0.2em] font-black">Outline</h4>
                            </div>
                            <nav className="flex flex-col gap-5">
                                {headings.map((heading) => (
                                    <a 
                                        key={heading} 
                                        href={`#${slugify(heading)}`}
                                        className="text-sm text-zinc-500 hover:text-white transition-all hover:translate-x-1 inline-block leading-snug"
                                    >
                                        {heading}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="text-sans text-xs ">
                            <p className=" text-center text-zinc-600 uppercase tracking-widest leading-loose font-medium">
                                Published by Newral Engineering Team
                            </p>
                            <p className="text-center text-zinc-600 uppercase tracking-widest leading-loose font-medium"> All rights reserved 2026.</p>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}