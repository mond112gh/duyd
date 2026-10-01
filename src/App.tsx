import React, { useState } from "react";
import { HeaderNav } from "./components/HeaderNav";
import { HeroSection } from "./components/HeroSection";
import { CountdownTimer } from "./components/CountdownTimer";
import { VenueSection } from "./components/VenueSection";
import { TimelineSection } from "./components/TimelineSection";
import { RSVPSection } from "./components/RSVPSection";
import { GuestbookSection } from "./components/GuestbookSection";
import { CoupleStory } from "./components/CoupleStory";
import { Footer } from "./components/Footer";
import { AudioPlayer } from "./components/AudioPlayer";
import { EnvelopeModal } from "./components/EnvelopeModal";
import { PetalsEffect } from "./components/PetalsEffect";

export default function App() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [petalsActive, setPetalsActive] = useState(true);
  const [hasTriggeredAudio, setHasTriggeredAudio] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setHasTriggeredAudio(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2623] relative selection:bg-[#E8D8C8] selection:text-[#5B4028] overflow-x-hidden font-cairo">
      {/* Falling Rose Petals Effect */}
      <PetalsEffect active={petalsActive} />

      {/* Royal Wax-Sealed Envelope Intro */}
      <EnvelopeModal
        isOpen={!envelopeOpen}
        onOpen={handleOpenEnvelope}
      />

      {/* Persistent Audio Player with Vinyl Animation & Custom MP3 Support */}
      <AudioPlayer autoPlayTrigger={hasTriggeredAudio} />

      {/* Top Header Navigation */}
      <HeaderNav
        petalsActive={petalsActive}
        onTogglePetals={() => setPetalsActive(!petalsActive)}
        onOpenEnvelope={() => setEnvelopeOpen(false)}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero & Formal Invitation */}
        <HeroSection />

        {/* 2. Live Countdown Timer to 12/12/2026 */}
        <CountdownTimer />

        {/* 3. Venue Details, Coordinates & Interactive Map */}
        <VenueSection />

        {/* 4. Wedding Day Program & Timeline */}
        <TimelineSection />

        {/* 5. RSVP Attendance Confirmation & Personalized Pass */}
        <RSVPSection />

        {/* 6. Romantic Story & Song Tribute */}
        <CoupleStory />

        {/* 7. Guestbook & Congratulations Comments */}
        <GuestbookSection />
      </main>

      {/* Royal Footer */}
      <Footer />
    </div>
  );
}
