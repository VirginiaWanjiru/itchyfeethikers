"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import gallery1 from "@/components/assets/mount-kenya-gallery1.jpg";
import gallery2 from "@/components/assets/mount-kenya-gallery2.jpg";
import gallery3 from "@/components/assets/mount-kenya-gallery3.jpg";
import heroImage from "@/components/assets/hero-kenya-mountain.jpg";

const images = [
  { id: 1, src: gallery1, alt: "Mount Kenya Trail View" },
  { id: 2, src: gallery2, alt: "Summit Views" },
  { id: 3, src: gallery3, alt: "Base Camp" },
  { id: 4, src: heroImage, alt: "Sunrise on Mount Kenya" },
];

export const HikeGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(galleryRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div ref={galleryRef} className="mb-8">
      {/* Main Image */}
      <div className="relative mb-4 rounded-2xl overflow-hidden group">
        <Image 
          src={images[currentImage].src} 
          alt={images[currentImage].alt}
          className="w-full h-96 object-cover transition-smooth"
          width={800}
          height={400}
          priority={currentImage === 0}
        />
        
        {/* Navigation Arrows */}
        <Button
          onClick={prevImage}
          size="icon"
          variant="outline"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-smooth"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={nextImage}
          size="icon"
          variant="outline"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-smooth"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentImage(index)}
            className={`relative rounded-lg overflow-hidden aspect-video transition-smooth ${
              currentImage === index 
                ? "ring-2 ring-primary scale-95" 
                : "hover:scale-105 opacity-70 hover:opacity-100"
            }`}
          >
            <Image 
              src={image.src} 
              alt={image.alt}
              className="w-full h-full object-cover"
              width={200}
              height={150}
            />
          </button>
        ))}
      </div>
    </div>
  );
};