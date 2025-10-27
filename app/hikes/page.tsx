//import HikingHeader from "@/components/HikingHeader";
//import HikingHero from "@/components/HikingHero";
import HikingFilters from "./components/HikingFilters";
import HikingGrid from "./components/HikingGrid";
//import HikingFooter from "@/components/HikingFooter";

const HikesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <HikingHeader /> */}
      {/* <HikingHero /> */}

      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <HikingFilters />
          <HikingGrid />
        </div>
      </main>

      {/* <HikingFooter /> */}
    </div>
  );
};

export default HikesPage;