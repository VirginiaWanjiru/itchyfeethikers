"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export const BlogHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation context
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
    <section ref={heroRef} className="relative h-[60vh] overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/logo.svg" 
          alt="Adventure Blog Hero"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white" ref={contentRef}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            Adventure
            <span className="block text-accent">Blog</span>
          </h1>

          <p className="text-lg md:text-xl mt-4 opacity-90 max-w-2xl mx-auto">
            Stories, tips, and inspiration from Kenya&apos;s peaks and trails
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
