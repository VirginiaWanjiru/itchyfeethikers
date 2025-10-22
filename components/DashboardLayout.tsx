import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
// import { Footer } from "./Footer";
import { ProfileBanner } from "./ProfileBanner";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <ProfileBanner />
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12">
          {children}
        </div>
      {/* <Footer /> */}
      </main>
    </div>
  );
};
