"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Mountain, Sunrise, Camera, Tent } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const itinerary = [
  {
    day: 1,
    title: "Naro Moru Gate to Met Station",
    elevation: "3,050m",
    distance: "10km",
    duration: "4-5 hours",
    difficulty: "Moderate",
    highlights: [
      "Dense montane forest",
      "Wildlife spotting (buffalo, elephant)",
      "First glimpse of the peaks"
    ],
    description: "Begin your adventure through lush montane forest. The trail is well-marked and gradually ascends through beautiful indigenous forest. Keep an eye out for wildlife and enjoy the cooling shade of the forest canopy.",
    accommodation: "Met Station Bunkhouse",
    meals: "Lunch, Dinner"
  },
  {
    day: 2,
    title: "Met Station to Mackinder's Camp",
    elevation: "4,200m", 
    distance: "12km",
    duration: "6-7 hours",
    difficulty: "Challenging",
    highlights: [
      "Vertical bog crossing",
      "Alpine moorland ecosystem",
      "Spectacular mountain views"
    ],
    description: "Cross the challenging vertical bog and enter the stunning alpine moorland. The landscape transforms dramatically as you gain altitude. Mackinder's Camp offers breathtaking views of the main peaks.",
    accommodation: "Mackinder's Camp",
    meals: "Breakfast, Lunch, Dinner"
  },
  {
    day: 3,
    title: "Summit Attempt - Point Lenana",
    elevation: "4,985m",
    distance: "8km",
    duration: "8-10 hours", 
    difficulty: "Very Challenging",
    highlights: [
      "Summit of Point Lenana",
      "Sunrise over Africa",
      "Glacial valleys",
      "Technical rock sections"
    ],
    description: "Pre-dawn start for the summit attempt. Navigate through rocky terrain and scree slopes to reach Point Lenana, Kenya's third-highest peak. Experience unforgettable sunrise views across the African continent.",
    accommodation: "Mackinder's Camp",
    meals: "Early Breakfast, Packed Lunch, Dinner"
  },
  {
    day: 4,
    title: "Mackinder's Camp to Met Station",
    elevation: "3,050m",
    distance: "12km", 
    duration: "5-6 hours",
    difficulty: "Moderate",
    highlights: [
      "Descent through moorland",
      "Different perspective of landscapes",
      "Rest at Met Station"
    ],
    description: "Descend through the alpine moorland with fresh eyes, appreciating the journey from a new perspective. The descent is easier on the lungs but requires careful footing on loose terrain.",
    accommodation: "Met Station Bunkhouse",
    meals: "Breakfast, Lunch, Dinner"
  },
  {
    day: 5,
    title: "Met Station to Naro Moru Gate",
    elevation: "2,400m",
    distance: "10km",
    duration: "3-4 hours",
    difficulty: "Easy",
    highlights: [
      "Forest descent",
      "Wildlife encounters",
      "Completion celebration"
    ],
    description: "Final descent through the beautiful montane forest back to Naro Moru Gate. Celebrate your successful summit with the team and enjoy the lush green environment after days in the alpine zone.",
    accommodation: "N/A - End of trek",
    meals: "Breakfast, Lunch"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-500 text-white";
    case "Moderate": return "bg-yellow-500 text-white";
    case "Challenging": return "bg-orange-600 text-white";
    case "Very Challenging": return "bg-red-600 text-white";
    default: return "bg-muted text-white";
  }
};


const getIcon = (day: number) => {
  switch (day) {
    case 1: return <Tent className="h-5 w-5" />;
    case 2: return <Mountain className="h-5 w-5" />;
    case 3: return <Sunrise className="h-5 w-5" />;
    case 4: return <Camera className="h-5 w-5" />;
    case 5: return <MapPin className="h-5 w-5" />;
    default: return <MapPin className="h-5 w-5" />;
  }
};

export const HikeItinerary = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current?.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mb-12">
      <h2 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
        <Mountain className="h-8 w-8 text-primary" />
        5-Day Itinerary
      </h2>

      <Accordion type="single" collapsible className="space-y-4">
        {itinerary.map((day) => (
          <AccordionItem 
            key={day.day} 
            value={`day-${day.day}`}
            className="border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-smooth"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline bg-gradient-to-r from-card to-muted/30">
              <div className="flex items-center gap-4 w-full">
                <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                  {getIcon(day.day)}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display text-lg font-semibold">
                      Day {day.day}: {day.title}
                    </h3>
                    <Badge className={getDifficultyColor(day.difficulty)}>
                      {day.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mountain className="h-4 w-4" />
                      <span>{day.elevation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{day.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{day.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="px-6 pb-6 bg-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {day.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Highlights:</h4>
                    <ul className="space-y-1">
                      {day.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Accommodation</h4>
                    <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Meals Included</h4>
                    <p className="text-sm text-muted-foreground">{day.meals}</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};