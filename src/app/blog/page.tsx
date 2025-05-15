"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming trends and technologies shaping the future of web development.",
    content: "Web development is constantly evolving, with new frameworks, tools, and methodologies emerging regularly. In this article, we'll explore the latest trends and technologies that are shaping the future of web development...",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "Web Development"]
  },
  {
    id: 2,
    title: "Optimizing React Performance",
    excerpt: "Best practices and techniques for building high-performance React applications.",
    content: "Performance optimization is crucial for React applications. Learn about code splitting, lazy loading, and other techniques to improve your app's performance...",
    date: "March 10, 2025",
    readTime: "7 min read",
    category: "React",
    tags: ["React", "Performance", "JavaScript"]
  },
  {
    id: 3,
    title: "Cloud Security Best Practices",
    excerpt: "Essential security measures for protecting your cloud infrastructure.",
    content: "Cloud security is more important than ever. Discover the best practices for securing your cloud infrastructure and protecting your data...",
    date: "March 5, 2025",
    readTime: "6 min read",
    category: "Security",
    tags: ["Cloud", "Security", "AWS"]
  },
  {
    id: 4,
    title: "Building Scalable Microservices",
    excerpt: "A comprehensive guide to designing and implementing scalable microservices architecture.",
    content: "Microservices architecture offers great scalability and flexibility. Learn how to design and implement microservices that can scale with your business...",
    date: "February 28, 2025",
    readTime: "8 min read",
    category: "Architecture",
    tags: ["Microservices", "Architecture", "Scalability"]
  },
  {
    id: 5,
    title: "The Rise of TypeScript",
    excerpt: "Why TypeScript is becoming the preferred choice for modern web development.",
    content: "TypeScript has gained immense popularity in recent years. Explore why developers are choosing TypeScript and how it can improve your development workflow...",
    date: "February 20, 2025",
    readTime: "6 min read",
    category: "TypeScript",
    tags: ["TypeScript", "JavaScript", "Web Development"]
  },
  {
    id: 6,
    title: "DevOps Best Practices",
    excerpt: "Essential DevOps practices for modern software development teams.",
    content: "DevOps has revolutionized software development. Learn about the best practices that can help your team deliver better software faster...",
    date: "February 15, 2025",
    readTime: "7 min read",
    category: "DevOps",
    tags: ["DevOps", "CI/CD", "Automation"]
  }
];

const categories = [
  "All",
  "Web Development",
  "React",
  "Security",
  "Architecture",
  "TypeScript",
  "DevOps"
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Latest Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Stay updated with our latest thoughts and industry insights
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-background/50 border border-primary/20 hover:border-primary/40 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                    <Clock className="h-4 w-4 ml-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button asChild variant="ghost" className="group-hover:bg-primary/10">
                    <Link href={`/blog/${post.id}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 