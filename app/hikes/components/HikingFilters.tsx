

import { Calendar as CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PriceSlider from "./PriceSlider";

const HikingFilters = () => {
  return (
    <aside className="w-full lg:w-64 bg-card rounded-lg border border-border p-6 space-y-6 h-fit sticky top-20">
      {/* Difficulty */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Difficulty</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="beginner" defaultChecked />
            <Label htmlFor="beginner" className="text-sm font-normal cursor-pointer">
              Beginner
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="intermediate" />
            <Label htmlFor="intermediate" className="text-sm font-normal cursor-pointer">
              Intermediate
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="advanced" />
            <Label htmlFor="advanced" className="text-sm font-normal cursor-pointer">
              Advanced
            </Label>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Duration</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="duration1" />
            <Label htmlFor="duration1" className="text-sm font-normal cursor-pointer">
              Up to 5 hours
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="duration2" />
            <Label htmlFor="duration2" className="text-sm font-normal cursor-pointer">
              5-8 hours
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="duration3" />
            <Label htmlFor="duration3" className="text-sm font-normal cursor-pointer">
              8-12 hours
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="duration4" />
            <Label htmlFor="duration4" className="text-sm font-normal cursor-pointer">
              12+ hours
            </Label>
          </div>
        </div>
      </div>

      {/* Group Type */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Group Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="private" />
            <Label htmlFor="private" className="text-sm font-normal cursor-pointer">
              Private
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="small" />
            <Label htmlFor="small" className="text-sm font-normal cursor-pointer">
              Small Group
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="large" />
            <Label htmlFor="large" className="text-sm font-normal cursor-pointer">
              Large Group
            </Label>
          </div>
        </div>
      </div>

      {/* Specialty */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Specialty</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="hiking" defaultChecked />
            <Label htmlFor="hiking" className="text-sm font-normal cursor-pointer">
              Hiking
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="backpacking" />
            <Label htmlFor="backpacking" className="text-sm font-normal cursor-pointer">
              Backpacking
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="climbing" />
            <Label htmlFor="climbing" className="text-sm font-normal cursor-pointer">
              Rock climbing
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="wildlife" />
            <Label htmlFor="wildlife" className="text-sm font-normal cursor-pointer">
              Wildlife Viewing
            </Label>
          </div>
        </div>
      </div>

      {/* Price Range - Premium Slider */}
      <PriceSlider />

      {/* Date */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Date</h3>
        <div className="flex gap-2">
          <Input type="date" className="flex-1 bg-background" />
          <Button size="icon" variant="default">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default HikingFilters;