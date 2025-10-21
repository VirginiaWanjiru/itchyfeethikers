import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface HikeCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

const HikeCard = ({ image, title, description, price, difficulty, duration }: HikeCardProps) => {
  const difficultyColors = {
    Beginner: "bg-[hsl(var(--badge-beginner))]",
    Intermediate: "bg-[hsl(var(--badge-intermediate))]",
    Advanced: "bg-[hsl(var(--badge-advanced))]",
  };

  return (
    <Card className="overflow-hidden group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border-border bg-gradient-to-b from-card to-muted/30">
      <div className="p-3 pb-3 flex gap-2">
        <span className={`${difficultyColors[difficulty]} text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm`}>
          {difficulty}
        </span>
        <span className="bg-[hsl(57,53%,33%)] text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {duration}
        </span>
      </div>
      
      <div className="relative overflow-hidden px-3 pb-3 pt-1">
        <Image 
          src={image} 
          alt={title}
          width={400}
          height={192}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 rounded-md"
        />
      </div>
      
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        <div className="pt-2 space-y-3">
          <div className="text-2xl font-bold text-foreground">
            ${price}
          </div>
          
          <div className="flex gap-2">
            <Button className="flex-1 bg-[hsl(120,24%,23%)] text-white hover:bg-[hsl(120,24%,19%)]">
              View Details
            </Button>
            <Button className="flex-1 bg-[hsl(120,24%,23%)] text-white hover:bg-[hsl(120,24%,19%)]">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HikeCard;