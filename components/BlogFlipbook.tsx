// components/BlogFlipbook.tsx
"use client";

import React, { useRef, useState, useEffect, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { X, ChevronLeft, ChevronRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

interface BlogFlipbookProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

// Page wrapper with enhanced styling
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn("page shadow-xl", className)}>
      {children}
    </div>
  )
);
Page.displayName = "Page";

const splitContentIntoPages = (htmlContent: string, post: BlogPost, wordsPerPage = 150): string[] => {
  const sections = htmlContent.split(/(<h2[^>]*>.*?<\/h2>)/gi);
  const pages: string[] = [];
  let currentPage = "";
  let wordCount = 0;

  // Enhanced intro page
  const introPage = `
    <div class="page-content h-full flex flex-col justify-center p-8">
      <div class="hero-image-container mb-6 rounded-xl overflow-hidden border-4 border-accent/30 shadow-2xl">
        <img src="${post.image}" alt="${post.title}" class="page-hero-image w-full h-64 object-cover" />
      </div>
      <div class="intro-content bg-accent/5 p-6 rounded-xl border-2 border-accent/20">
        <p class="lead-paragraph text-base leading-relaxed">Welcome to this guide on ${post.title}. Let's explore the essentials for your next adventure.</p>
      </div>
    </div>
  `;
  pages.push(introPage);

  sections.forEach((section) => {
    if (!section.trim()) return;

    const sectionWords = section.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;

    if (wordCount + sectionWords > wordsPerPage && currentPage.trim()) {
      pages.push(`<div class="page-content">${currentPage}</div>`);
      currentPage = section;
      wordCount = sectionWords;
    } else {
      currentPage += section;
      wordCount += sectionWords;
    }
  });

  if (currentPage.trim()) {
    pages.push(`<div class="page-content">${currentPage}</div>`);
  }

  return pages.length > 1 ? pages : [`<div class="page-content">${htmlContent}</div>`];
};

const BlogFlipbook: React.FC<BlogFlipbookProps> = ({ post, isOpen, onClose }) => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const pages = React.useMemo(() => {
    if (!post?.content) return [];
    return splitContentIntoPages(post.content, post, 120);
  }, [post]);

  useEffect(() => {
    setTotalPages(pages.length + 2);
  }, [pages.length]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.4)" }
      );
    }
  }, [isOpen]);

  const handleFlip = (e: any) => {
    if (typeof e?.data === "number") {
      setCurrentPage(e.data);
    }
  };

  const nextPage = () => {
    if (bookRef.current?.getPageFlip) {
      const pf = bookRef.current.getPageFlip();
      if (pf && typeof pf.flipNext === "function") pf.flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current?.getPageFlip) {
      const pf = bookRef.current.getPageFlip();
      if (pf && typeof pf.flipPrev === "function") pf.flipPrev();
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.25,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative max-w-7xl w-full max-h-[95vh] bg-gradient-to-br from-background via-background to-muted/30 rounded-3xl overflow-hidden shadow-2xl border-4 border-accent/30"
      >
        {/* Enhanced Header with Borders */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-background/95 via-background/90 to-transparent backdrop-blur-lg border-b-2 border-accent/30 p-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-2 bg-accent/20 rounded-xl border-2 border-accent/40">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              
              <Badge className="bg-accent text-accent-foreground font-bold px-4 py-2 border-2 border-accent shadow-lg">
                {post.category}
              </Badge>
              
              <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground px-4 py-2 bg-muted/30 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span>{post.date}</span>
                </div>
                <div className="w-px h-4 bg-accent/30" />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleClose} 
              className="bg-background/90 hover:bg-accent hover:text-accent-foreground border-2 border-accent/40 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Flipbook Container with Enhanced Styling */}
        <div className="relative w-full h-[85vh] flex items-center justify-center bg-gradient-to-br from-muted/10 via-muted/5 to-accent/5 p-8 pt-24">
          {/* Decorative Corner Borders */}
          <div className="absolute top-20 left-4 w-16 h-16 border-t-4 border-l-4 border-accent/40 rounded-tl-2xl" />
          <div className="absolute top-20 right-4 w-16 h-16 border-t-4 border-r-4 border-accent/40 rounded-tr-2xl" />
          <div className="absolute bottom-20 left-4 w-16 h-16 border-b-4 border-l-4 border-accent/40 rounded-bl-2xl" />
          <div className="absolute bottom-20 right-4 w-16 h-16 border-b-4 border-r-4 border-accent/40 rounded-br-2xl" />
          
          <HTMLFlipBook
            ref={bookRef}
            width={420}
            height={620}
            size="stretch"
            minWidth={340}
            maxWidth={520}
            minHeight={500}
            maxHeight={720}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={handleFlip}
            className="flipbook"
            style={{}}
            drawShadow={true}
            startZIndex={0}
            startPage={0}
            flippingTime={600}
            usePortrait={true}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {/* Enhanced Cover */}
            <Page className="bg-card border-4 border-accent/30 flex flex-col overflow-hidden">
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-gradient-to-br from-accent/20 via-primary/10 to-accent/20 relative overflow-hidden rounded-t-xl">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 border-t-4 border-accent/50">
                    <h1 className="font-display text-3xl font-black mb-3 leading-tight text-white drop-shadow-lg">
                      {post.title}
                    </h1>
                    <div className="h-1 w-24 bg-accent rounded-full" />
                  </div>
                </div>
              </div>
            </Page>

            {/* Enhanced Content Pages */}
            {pages.map((pageContent, idx) => (
              <Page key={idx} className="bg-card border-4 border-accent/20 p-8 relative">
                <div
                  className="h-full overflow-hidden prose prose-sm max-w-none text-foreground magazine-layout"
                  dangerouslySetInnerHTML={{ __html: pageContent }}
                />
                <div className="absolute bottom-4 right-6 px-3 py-1 bg-accent/20 rounded-full border-2 border-accent/40">
                  <span className="text-sm text-accent font-bold">{idx + 2}</span>
                </div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
              </Page>
            ))}

            {/* Enhanced Back Cover */}
            <Page className="bg-gradient-to-br from-card via-accent/5 to-card border-4 border-accent/30 flex flex-col items-center justify-center p-10 text-center">
              <div className="space-y-6 max-w-sm">
                <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center border-4 border-accent/40">
                  <BookOpen className="w-8 h-8 text-accent" />
                </div>
                
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Thanks for Reading!
                </h3>
                
                <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
                
                <p className="text-muted-foreground leading-relaxed">
                  Discover more stories and expert guides for your next Kenya mountain expedition.
                </p>
                
                <Button 
                  onClick={handleClose} 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground border-2 border-accent shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Explore More Stories
                </Button>
              </div>
            </Page>
          </HTMLFlipBook>
        </div>

        {/* Enhanced Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-6 bg-background/95 backdrop-blur-lg rounded-2xl px-6 py-4 border-4 border-accent/30 shadow-2xl">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={prevPage} 
            disabled={currentPage === 0} 
            className="h-10 w-10 p-0 border-2 border-accent/40 hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3 px-6 py-2 bg-accent/10 rounded-lg border-2 border-accent/30">
            <span className="text-sm font-bold text-accent">{currentPage + 1}</span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">{totalPages}</span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            className="h-10 w-10 p-0 border-2 border-accent/40 hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogFlipbook;