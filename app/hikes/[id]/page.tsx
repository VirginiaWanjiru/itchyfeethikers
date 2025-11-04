// app/hikes/[id]/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HikeGallery } from "../components/HikeGallery";
import { HikeItinerary } from "../components/HikeItinerary";
import { HikeBookingSidebar } from "../components/HikeSidebar";
//import { Navigation } from "@/components/Navigation";
import { ArrowLeft, Mountain, Clock, Users, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { hikesData } from "../components/HikingGrid";

gsap.registerPlugin(ScrollTrigger);

export default function HikeDetailsPage() {
  const params = useParams();
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Find the hike data based on ID
  const hike = hikesData.find(h => h.id === parseInt(params.id as string));

  useEffect(() => {
    if (!hike) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        }
      );
    }, headerRef);

    return () => ctx.revert();
  }, [hike]);

  // If hike not found, show error
  if (!hike) {
    return (
      <>
        {/* <Navigation /> */}
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Hike Not Found</h1>
            <Link href="/hikes">
              <Button>Back to All Hikes</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-500",
      Intermediate: "bg-yellow-500",
      Advanced: "bg-red-500"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <>
      {/* <Navigation /> */}
      <main className="min-h-screen bg-[hsl(32_20%_96%)]">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/hikes">
            <Button variant="outline" className="mb-6 hover:bg-primary hover:text-primary-foreground transition-smooth">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Hikes
            </Button>
          </Link>

          <div ref={headerRef} className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={`${getDifficultyBadge(hike.difficulty)} text-white`}>
                {hike.difficulty}
              </Badge>
              <Badge variant="outline">{hike.duration}</Badge>
              <Badge variant="outline">Kenya</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground text-sm">(127 reviews)</span>
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              {hike.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                <span>{hike.difficulty} Level</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{hike.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Max 12 People</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Kenya</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Replace the existing gallery with HikeGallery component */}
              <HikeGallery />
              
              {/* Description */}
              <section className="mb-12">
                <h2 className="font-display text-3xl font-bold mb-6">Adventure Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {hike.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Experience the raw beauty of Kenya&apos;s stunning landscapes with this incredible hiking adventure. 
                    Our expert guides ensure your safety while sharing their deep knowledge of the area&apos;s ecology, 
                    geology, and cultural significance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This {hike.difficulty.toLowerCase()} level trek is perfect for {hike.difficulty === "Beginner" ? "first-time hikers and families" : hike.difficulty === "Intermediate" ? "experienced hikers looking for a challenge" : "seasoned adventurers seeking to push their limits"}.
                    The journey rewards you with unforgettable views and the achievement of exploring one of Kenya&apos;s most beautiful locations.
                  </p>
                </div>
              </section>

              {/* Replace with HikeItinerary component */}
              <HikeItinerary />

              {/* Additional Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Weather Info */}
                <section className="bg-card p-6 rounded-2xl shadow-sm border">
                  <h3 className="font-display text-xl font-semibold mb-4">Weather & Climate</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Best Time to Visit:</span>
                      <span>Year-round</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daytime Temperature:</span>
                      <span>18-25°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span>{hike.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{hike.duration}</span>
                    </div>
                  </div>
                </section>

                {/* Packing List Preview */}
                <section className="bg-card p-6 rounded-2xl shadow-sm border">
                  <h3 className="font-display text-xl font-semibold mb-4">Essential Gear</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Comfortable hiking shoes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Water bottle & snacks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Weather-appropriate clothing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Camera & sun protection
                    </li>
                  </ul>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Complete List
                  </Button>
                </section>
              </div>
            </div>

            {/* Sidebar - Replace with HikeBookingSidebar component */}
            <div className="lg:col-span-1">
              <HikeBookingSidebar />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}