'use client';

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const PriceSlider = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Price Range</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            ${priceRange[0]}
          </span>
          <span className="text-xs text-muted-foreground">-</span>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            ${priceRange[1]}
          </span>
        </div>
      </div>
      
      <div className="px-2">
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        <span>$0</span>
        <span>$1000+</span>
      </div>
    </div>
  );
};

export default PriceSlider;