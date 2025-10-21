import { BlogHero } from "@/components/BlogHero";
import { BlogGrid } from "@/components/BlogGrid";
import { CommunityForum } from "@/components/CommunityForum";

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen">
        <BlogHero />
        <BlogGrid />
        <CommunityForum />
      </main>
    </>
  );
}
