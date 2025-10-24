import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface HikeCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

const HikeCard = ({ id, image, title, description, price, difficulty, duration }: HikeCardProps) => {
  const difficultyColors = {
    Beginner: "bg-[hsl(var(--badge-beginner))]",
    Intermediate: "bg-[hsl(var(--badge-intermediate))]",
    Advanced: "bg-[hsl(var(--badge-advanced))]",
  };

  return (
    <Card className="overflow-hidden group hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 border-border bg-gradient-to-b from-card to-muted/30">
      <div className="p-2 pb-1 flex gap-2"> {/* Reduced padding */}
        <span className={`${difficultyColors[difficulty]} text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-sm`}>
          {difficulty}
        </span>
        <span className="bg-[hsl(57,53%,33%)] text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {duration}
        </span>
      </div>
      
      <div className="relative overflow-hidden px-2 pb-1 pt-0"> {/* Reduced padding */}
        <Image 
          src={image} 
          alt={title}
          width={300} // Reduced width
          height={120} // Reduced height
          className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500 rounded-md" // Reduced height from h-36 to h-28
        />
      </div>
      
      <div className="p-3 space-y-2"> {/* Reduced padding from p-4 to p-3 */}
        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors"> {/* Reduced text size */}
          {title}
        </h3>
        
        <p className="text-xs text-muted-foreground line-clamp-2"> {/* Reduced text size */}
          {description}
        </p>
        
        <div className="pt-1 space-y-2">
          <div className="text-lg font-bold text-foreground"> {/* Reduced text size */}
            ${price}
          </div>
          
          <div className="flex gap-2">
            <Link href={`/hikes/${id}`}>
              <Button className="flex-1 bg-[hsl(120,24%,23%)] text-white hover:bg-[hsl(120,24%,19%)] h-8 text-xs"> {/* Reduced height and text size */}
                View Details
              </Button>
            </Link>
            <Link href={``}>
              <Button className="flex-1 bg-[hsl(120,24%,23%)] text-white hover:bg-[hsl(120,24%,19%)] h-8 text-xs"> {/* Reduced height and text size */}
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HikeCard;