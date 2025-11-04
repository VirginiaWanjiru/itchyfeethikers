"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

gsap.registerPlugin(ScrollTrigger);

const included = [
  "Professional mountain guide",
  "All park fees and permits", 
  "Accommodation (huts/camping)",
  "All meals during trek",
  "Safety equipment",
  "Emergency rescue insurance",
  "Transport to/from trailhead"
];

const notIncluded = [
  "Personal hiking gear",
  "Travel insurance",
  "Tips for guides",
  "Personal expenses",
  "Accommodation before/after trek"
];

export const HikeBookingSidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sidebarRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sidebarRef} className="space-y-6">
      {/* What's Included */}
      <Card className="shadow-medium">
        <CardContent className="p-6">
          <h3 className="font-display text-lg font-semibold mb-4">
            What's Included
          </h3>
          <ul className="space-y-2">
            {included.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <h4 className="font-semibold mb-3 text-sm">Not Included</h4>
          <ul className="space-y-2">
            {notIncluded.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 border border-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="shadow-medium bg-[linear-gradient(45deg,_hsl(25_30%_80%)_0%,_hsl(35_25%_75%)_100%)]">
        <CardContent className="p-6 text-center">
          <h3 className="font-display text-lg font-semibold mb-3">Have Questions?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Speak with our adventure specialists
          </p>
          <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-smooth">
            Contact Expert
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
