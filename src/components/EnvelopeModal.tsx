import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";

interface EnvelopeModalProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({ onOpen, isOpen }) => {
  const [opening, setOpening] = useState(false);

  if (!isOpen) return null;

  const handleOpenEnvelope = () => {
    if (opening) return;
    setOpening(true);

    // Trigger golden rose confetti
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F5D061", "#E6AF2E", "#F8E9A1", "#C5A059"],
      });
    } catch {
      // fallback
    }

    // Delay slightly to let the flap unfold smoothly
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1713]/80 backdrop-blur-md transition-opacity duration-700">
      <div className="relative max-w-lg w-full text-center">
        {/* Decorative Top Verse */}
        <div className="mb-6 space-y-2 text-[#F5EBE6]">
          <p className="font-amiri text-lg tracking-widest text-[#D4AF37]">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <h2 className="font-ruqaa text-3xl md:text-4xl text-[#FFF8ED]">
            دعوة زفاف أحمد وجنى
          </h2>
          <p className="text-xs md:text-sm text-[#D8C2B0] font-light">
            12 ديسمبر 2026 · قاعة لؤلؤة الماسة الملكية
          </p>
        </div>

        {/* The Envelope */}
        <div
          onClick={handleOpenEnvelope}
          className="relative mx-auto w-full max-w-[380px] h-[260px] bg-[#FAF6F0] rounded-xl shadow-2xl border border-[#D4AF37]/40 cursor-pointer overflow-hidden transform hover:scale-[1.02] transition-all duration-500 group"
          style={{
            backgroundImage: "radial-gradient(#E8D8C8 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Inner Golden Foil Border */}
          <div className="absolute inset-3 border border-[#C5A059]/60 rounded-lg pointer-events-none flex flex-col justify-between p-4">
            {/* Corner Arabesque Ornaments */}
            <div className="flex justify-between text-[#B38738]/70 text-xs">
              <span>✦</span>
              <span>✦</span>
            </div>
            <div className="flex justify-between text-[#B38738]/70 text-xs">
              <span>✦</span>
              <span>✦</span>
            </div>
          </div>

          {/* Envelope Flap Triangles */}
          <div
            className={`absolute top-0 inset-x-0 h-32 bg-[#F3ECE1] border-b-2 border-[#D4AF37]/50 shadow-md origin-top transition-transform duration-700 ease-in-out ${
              opening ? "-scale-y-100 opacity-20" : ""
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />

          {/* Golden Monogram Crest in Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative">
              {/* Wax Seal */}
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br from-[#A63A50] via-[#851D33] to-[#5C1021] shadow-xl border-2 border-[#D4AF37] flex items-center justify-center transform transition-all duration-700 ${
                  opening ? "scale-125 opacity-0" : "group-hover:scale-110"
                }`}
              >
                <div className="w-16 h-16 rounded-full border border-[#E8B4B8]/40 flex flex-col items-center justify-center text-center">
                  <span className="font-ruqaa text-2xl text-[#FFF0E6] font-bold leading-none">
                    أ & ج
                  </span>
                  <span className="text-[9px] text-[#F3C5CE] tracking-wider mt-0.5">
                    12·12·2026
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm font-medium text-[#7D5A2B] flex items-center gap-1.5 transition-colors group-hover:text-[#4A3212]">
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span>انقر لفتح الدعوة الملكية</span>
              <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            </p>
          </div>

          {/* Bottom Flap accents */}
          <div
            className="absolute bottom-0 inset-x-0 h-16 bg-[#EDE3D3]/40 pointer-events-none"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 50% 0)",
            }}
          />
        </div>

        {/* Direct Skip Button */}
        <div className="mt-6">
          <button
            onClick={onOpen}
            className="text-xs text-[#EAD8C7] hover:text-[#FFF8ED] transition-colors underline underline-offset-4 py-2 px-4"
          >
            تخطي الظرف والدخول مباشرة إلى تفاصيل الحفل ←
          </button>
        </div>
      </div>
    </div>
  );
};
