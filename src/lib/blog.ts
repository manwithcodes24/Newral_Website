import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getAllBlogs() {
    const blogDir = path.join(process.cwd(), "blogs");

    if (!fs.existsSync(blogDir)) return [];

    const files = fs.readdirSync(blogDir);

    const posts = files
        .filter(file => file.endsWith(".mdx") || file.endsWith(".md"))
        .map((filename) => {
            const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
            const { data } = matter(fileContent);
            
            return {
                // FORCE SLUG TO LOWERCASE HERE
                slug: filename.replace(/\.mdx$|\.md$/, "").toLowerCase(), 
                title: data.title || "Untitled Post",
                description: data.description || "",
                thumbnail: data.thumbnail || "",
                date: data.date || "",
            };
        });

    return posts;
}