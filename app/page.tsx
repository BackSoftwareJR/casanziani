import { Hero } from '@/components/sections/Hero';
import { WhoWeHelp } from '@/components/sections/WhoWeHelp';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { DailyRoutine } from '@/components/sections/DailyRoutine';
import { Garden } from '@/components/sections/Garden';
import { GalleryPreview } from '@/components/sections/GalleryPreview';
import { InvitoVisita } from '@/components/sections/InvitoVisita';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeHelp />
      <About />
      <Services />
      <DailyRoutine />
      <Garden />
      <GalleryPreview />
      <InvitoVisita />
      <FAQ />
      <Contact />
    </>
  );
}
