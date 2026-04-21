import { useState } from "react";
import CoverSection from "@/components/wedding/CoverSection";
import PetalBurst from "@/components/wedding/PetalBurst";
import HeroSection from "@/components/wedding/HeroSection";
import CoupleSection from "@/components/wedding/CoupleSection";
import QuotesSection from "@/components/wedding/QuotesSection";
import CountdownSection from "@/components/wedding/CountdownSection";
import EventSection from "@/components/wedding/EventSection";
import GallerySection from "@/components/wedding/GallerySection";
import RSVPSection from "@/components/wedding/RSVPSection";
import GiftSection from "@/components/wedding/GiftSection";
import ClosingSection from "@/components/wedding/ClosingSection";
import MusicPlayer from "@/components/wedding/MusicPlayer";
import FloralBackground from "@/components/wedding/FloralBackground";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  const handleOpen = () => {
    setShowPetals(true);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <>
        {showPetals && <PetalBurst onComplete={() => setShowPetals(false)} />}
        <CoverSection onOpen={handleOpen} />
      </>
    );
  }

  return (
    <div className="min-h-screen relative">
      {showPetals && <PetalBurst onComplete={() => setShowPetals(false)} />}
      <FloralBackground />
      <MusicPlayer autoPlay={true} />

      <HeroSection />
      <CoupleSection />
      <QuotesSection />
      <CountdownSection />
      <EventSection />
      <GallerySection />
      <RSVPSection />
      <GiftSection />
      <ClosingSection />
    </div>
  );
};

export default Index;
