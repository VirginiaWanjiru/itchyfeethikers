"use client";
import { useState } from "react";
import { Grid, List, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HikeCard from "./HikeCard";

const hikesData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
    title: "Narnia Hills",
    description: "Capture the breathtaking views of Narnia Hills in all its glory with this immersive hiking experience.",
    price: 549,
    difficulty: "Beginner" as const,
    duration: "5-8 hours"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Mt Longonot",
    description: "The perfect hike for catching amazing scenery without the crowds and experience volcanic landscapes.",
    price: 689,
    difficulty: "Intermediate" as const,
    duration: "8-12 hours"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=600&fit=crop",
    title: "Kipsara Hill",
    description: "Located in Kisii County, this hike offers stunning views and a chance to explore local culture.",
    price: 459,
    difficulty: "Beginner" as const,
    duration: "Up to 5 hours"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&h=600&fit=crop",
    title: "Oldari Nyiro Trek",
    description: "Discover the rugged beauty of this challenging trail with experienced guides through mountain terrain.",
    price: 799,
    difficulty: "Advanced" as const,
    duration: "12+ hours"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&h=600&fit=crop",
    title: "Summit Ridge Trail",
    description: "Experience alpine meadows and pristine wilderness on this moderate mountain trail.",
    price: 629,
    difficulty: "Intermediate" as const,
    duration: "8-12 hours"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop",
    title: "Valley View Path",
    description: "A gentle trail perfect for families, featuring waterfalls and diverse wildlife sightings.",
    price: 379,
    difficulty: "Beginner" as const,
    duration: "Up to 5 hours"
  }
];

const HikingGrid = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  return (
    <div className="flex-1 space-y-6">
      {/* Search and View Toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by location, hike or package"
            className="pl-10 bg-background"
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hikes Grid */}
      <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} animate-fade-in`}>
        {hikesData.map((hike) => (
          <HikeCard key={hike.id} {...hike} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-1">
          {[1, 2, 3, "...", totalPages].map((page, index) => (
            <Button
              key={index}
              size="icon"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={typeof page !== "number"}
              className="min-w-10"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HikingGrid;