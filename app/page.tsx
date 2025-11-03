import Image from "next/image";
import Navbar from "../components/NavBarMain";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 mt-16">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {/* Keep your original content below */}
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* existing footer links */}
      </footer>
    </div>
  );
}
