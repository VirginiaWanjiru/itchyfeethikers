"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export const BlogHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;
      gsap.fromTo(
        contentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative h-[60vh] overflow-hidden pt-20 border-b-4 border-accent"
    >
      {/* Background Image with Frame */}
      <div className="absolute inset-0">
        <Image
          src="/logo.svg" 
          alt="Adventure Blog Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-purple-900/30 to-black/80" />
        
        {/* Decorative Corner Borders */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-accent/60" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-accent/60" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-accent/60" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-accent/60" />
      </div>

      {/* Content Card */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div 
          className="text-center text-white backdrop-blur-md bg-black/30 border-2 border-white/20 rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl w-full"
          ref={contentRef}
        >
          {/* Title Card */}
          <div className="inline-block mb-6">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-accent/20 to-purple-600/20 border-2 border-accent rounded-xl shadow-lg">
                Adventure
              </span>
              <span className="block mt-4 text-accent drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                Blog
              </span>
            </h1>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="mx-4 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50" />
            <div className="h-px w-16 bg-gradient-to-r from-accent via-accent to-transparent" />
          </div>

          {/* Description Card */}
          <div className="inline-block">
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto px-6 py-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
              Stories, tips, and inspiration from Kenya&apos;s peaks and trails
            </p>
          </div>

          {/* Bottom Accent Line */}
          <div className="mt-8 h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent rounded-full shadow-lg shadow-accent/30" />
        </div>
      </div>

      {/* Animated Particles/Dots Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/40 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-150" />
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-accent/30 rounded-full animate-pulse delay-300" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-500" />
      </div>
    </section>
  );
};

export default BlogHero;