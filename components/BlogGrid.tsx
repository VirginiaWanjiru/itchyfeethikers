// components/BlogGrid.tsx
"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import blogPost1 from "@/public/logo.png";
import blogPost2 from "@/public/logo.png";
import blogPost3 from "@/public/logo.png";

// Lazy load the BlogFlipbook component (default export) with no SSR
const BlogFlipbook = dynamic(
  () => import("./BlogFlipbook").then((mod) => mod.default),
  { ssr: false }
);

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  image: StaticImageData | string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Essential Gear for Your First Kenya Mountain Adventure",
    excerpt:
      "Everything you need to know about packing for high-altitude hiking in Kenya's diverse climate conditions.",
    image: blogPost3,
    category: "Gear Guide",
    author: "Mark Thompson",
    date: "August 12, 2024",
    readTime: "6 min read",
    content: `...`
  },
  {
    id: 2,
    title: "Hidden Gems: 5 Lesser-Known Hiking Trails in Kenya",
    excerpt: "Discover secret paths and untouched wilderness areas that most tourists never see.",
    image: blogPost1,
    category: "Trail Guide",
    author: "Lisa Kamau",
    date: "August 10, 2024",
    readTime: "10 min read",
    content: `...`
  },
  {
    id: 3,
    title: "Building Community: Stories from the Trail",
    excerpt: "How hiking brings people together and creates lifelong friendships in Kenya's mountains.",
    image: blogPost2,
    category: "Community",
    author: "James Ochieng",
    date: "August 8, 2024",
    readTime: "4 min read",
    content: `...`
  }
];

const categories = ["All", "Gear Guide", "Trail Guide", "Community", "Planning", "Safety", "Photography"];

export const BlogGrid: React.FC = () => {
  // refs for scroll/entrance animations
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  // filter + pagination + modal state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const pageSize = 3; // posts per page
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);

  // derive filtered posts and paginated slice
  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory);

  const displayedPosts = filteredPosts.slice(0, page * pageSize);
  const allLoaded = displayedPosts.length >= filteredPosts.length;

  // register ScrollTrigger and initial entrance animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (categoriesRef.current) {
        gsap.fromTo(
          categoriesRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 80, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // animate grid items on category change (fade out -> change -> fade in)
  useEffect(() => {
    if (!gridRef.current) return;

    const items = Array.from(gridRef.current.children) as HTMLElement[];
    if (items.length === 0) return;

    const tl = gsap.timeline();
    tl.to(items, { y: 20, opacity: 0, duration: 0.25, stagger: 0.02, ease: "power1.in" })
      .call(() => {
        setPage(1);
      })
      .to(items, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const openFlipbook = (post: BlogPost) => {
    setSelectedPost(post);
    setIsFlipbookOpen(true);
  };

  const closeFlipbook = () => {
    setIsFlipbookOpen(false);
    setSelectedPost(null);
  };

  const handleBadgeClick = (category: string) => {
    setSelectedCategory(category);
  };

  const loadMore = () => {
    setPage((p) => p + 1);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Section with Border */}
        <div className="text-center mb-16 pb-8 border-b-2 border-gradient-to-r from-transparent via-accent/30 to-transparent">
          <div className="inline-block mb-4">
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          
          <h2 
            ref={titleRef} 
            className="font-display text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent mb-4"
          >
            Adventure Stories
          </h2>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent to-accent" />
            <div className="w-2 h-2 bg-accent rounded-full" />
            <div className="h-px w-16 bg-gradient-to-r from-accent via-accent to-transparent" />
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-6 py-3 bg-muted/30 rounded-full border border-accent/20">
            Real experiences, expert advice, and inspiring stories from Kenya's hiking community
          </p>
        </div>

        {/* Categories with Enhanced Styling */}
        <div 
          ref={categoriesRef} 
          className="flex flex-wrap justify-center gap-3 mb-16 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border-2 border-accent/20 shadow-lg"
        >
          {categories.map((category) => {
            const active = selectedCategory === category;
            return (
              <Badge
                key={category}
                variant={active ? "default" : "outline"}
                className={`px-5 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300 ${
                  active 
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/50 scale-105 border-2 border-accent" 
                    : "hover:bg-accent/10 hover:border-accent hover:scale-105 border-2 border-muted-foreground/20"
                }`}
                onClick={() => handleBadgeClick(category)}
              >
                {category}
              </Badge>
            );
          })}
        </div>

        {/* Blog Grid with Enhanced Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              className="group relative bg-card rounded-2xl overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:-translate-y-3 cursor-pointer"
              onClick={() => openFlipbook(post)}
            >
              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/30 to-transparent rounded-bl-3xl z-10" />
              
              {/* Image with Border Effect */}
              <div className="relative overflow-hidden h-64 border-b-2 border-accent/30">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <Badge className="bg-accent text-accent-foreground font-bold px-4 py-1.5 border-2 border-accent shadow-lg shadow-accent/50">
                    {post.category}
                  </Badge>
                </div>
              </div>

              {/* Content Section with Borders */}
              <div className="p-6 bg-gradient-to-b from-card to-card/80">
                <h3 className="font-display text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2 border-l-4 border-accent/50 pl-3">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed px-3 py-2 bg-muted/20 rounded-lg border border-muted-foreground/10">
                  {post.excerpt}
                </p>

                {/* Meta Info with Border */}
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground px-3 py-2 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    <span>{post.date}</span>
                  </div>
                  <div className="w-px h-4 bg-accent/30" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex justify-end pt-2 border-t border-accent/20">
                  <Button
                    type="button"
                    size="sm"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 group/btn shadow-md hover:shadow-lg hover:shadow-accent/30 border-2 border-accent/50"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      openFlipbook(post);
                    }}
                  >
                    Read More
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          {!allLoaded ? (
            <div className="inline-block p-8 bg-card/50 backdrop-blur-sm rounded-2xl border-2 border-accent/30 shadow-xl">
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 h-auto transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-accent/30 hover:scale-105"
                onClick={loadMore}
              >
                Load More Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="inline-block px-8 py-4 bg-muted/40 rounded-full border-2 border-muted-foreground/20 text-sm text-muted-foreground font-medium">
              You've reached the end — check back later for more stories.
            </div>
          )}
        </div>
      </div>

      {/* Flipbook Modal (lazy loaded) */}
      {selectedPost && isFlipbookOpen && (
        <BlogFlipbook post={selectedPost as any} isOpen={isFlipbookOpen} onClose={closeFlipbook} />
      )}
    </section>
  );
};

export default BlogGrid;