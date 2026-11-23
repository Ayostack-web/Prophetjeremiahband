import { Hero } from "@/components/hero";
import { MainSections } from "@/components/main-sections";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <MainSections />
      <SiteFooter />
    </main>
  );
}
