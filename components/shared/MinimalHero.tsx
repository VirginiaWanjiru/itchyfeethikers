// components/shared/MinimalHero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

interface MinimalHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
  badge?: string;
  trustElement?: {
    type: "rating" | "feature" | "stat";
    value: string;
    label: string;
  };
  /**
   * backgroundImage should be a path under `public/` (e.g. "/images/hero.jpg"),
   * or a fully qualified external URL if you configured `next.config.js` for that domain.
   */
  backgroundImage?: string;
  theme?: "light" | "dark" | "earth";
}

const MinimalHero: React.FC<MinimalHeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  badge,
  trustElement,
  backgroundImage,
  theme = "light",
}) => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const contentChildren: Element[] = contentRef.current
        ? Array.from(contentRef.current.children)
        : [];

      if (contentChildren.length > 0) {
        tl.fromTo(
          contentChildren,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          }
        ).fromTo(
          imageRef.current,
          { x: 50, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        );
      } else {
        // If there are no content children, still animate the image.
        tl.fromTo(
          imageRef.current,
          { x: 50, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const themeClasses: Record<string, string> = {
    light: "bg-background text-foreground",
    dark: "bg-card text-card-foreground",
    earth: "bg-gradient-earth text-foreground",
  };

  return (
    <section
      ref={heroRef}
      className={`relative min-h-[80vh] flex items-center ${themeClasses[theme]} pt-20`}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Content - 60% */}
          <div ref={contentRef} className="lg:col-span-3 space-y-8">
            {badge && (
              <div>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                  {badge}
                </Badge>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {subtitle}
              </h2>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-medium"
                onClick={primaryCTA.action}
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              {secondaryCTA && (
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-accent hover:text-accent-foreground"
                  onClick={secondaryCTA.action}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>

            {trustElement && (
              <div className="flex items-center gap-3 pt-4">
                {trustElement.type === "rating" && (
                  <>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          aria-hidden
                          /* lucide icons accept className; styling (stroke/fill) depends on CSS */
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      <strong>{trustElement.value}</strong> {trustElement.label}
                    </span>
                  </>
                )}

                {trustElement.type === "feature" && (
                  <>
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">
                      {trustElement.value} {trustElement.label}
                    </span>
                  </>
                )}

                {trustElement.type === "stat" && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm">
                      <strong className="text-primary">{trustElement.value}</strong>{" "}
                      {trustElement.label}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Image - 40% */}
          <div ref={imageRef} className="lg:col-span-2">
            <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-medium">
              {backgroundImage ? (
                // Use next/image for optimization. Ensure backgroundImage is under public/ or allowed external domain.
                <Image
                  src={backgroundImage}
                  alt="Hero visual"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  style={{ objectFit: "cover", objectPosition: "center", transform: "scale(1.05)" }}
                  className="transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-white/20 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/30 rounded-xl" />
                    </div>
                    <p className="text-xs opacity-75 font-medium">Visual Placeholder</p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalHero;
