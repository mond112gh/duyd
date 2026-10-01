import React from "react";
import { Heart, ArrowUp, Share2, Calendar } from "lucide-react";
import { getWhatsAppShareUrl, getGoogleCalendarUrl } from "../utils/calendar";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1E1713] text-[#FAF7F2] pt-16 pb-24 border-t border-[#D4AF37]/30 relative overflow-hidden">
      {/* Decorative Golden Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#855B1B] p-0.5 mx-auto mb-5 shadow-lg">
          <div className="w-full h-full rounded-full bg-[#1E1713] flex items-center justify-center font-ruqaa text-2xl text-[#E8D8C8]">
            أ & ج
          </div>
        </div>

        {/* Hadith / Blessing */}
        <p className="font-amiri text-2xl md:text-3xl text-[#FFF8ED] leading-relaxed max-w-xl mx-auto mb-2">
          "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ"
        </p>

        <p className="font-ruqaa text-xl text-[#D4AF37] mb-6">
          أحمد & جنى
        </p>

        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8" />

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-tajawal text-[#C5B3A2] mb-8">
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors py-1 px-3 rounded-full bg-white/5 border border-white/10"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة الدعوة مع الأهل</span>
          </a>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors py-1 px-3 rounded-full bg-white/5 border border-white/10"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>حفظ الموعد في التقويم</span>
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors py-1 px-3 rounded-full bg-white/5 border border-white/10"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>العودة للأعلى</span>
          </button>
        </div>

        {/* Copyright & Date */}
        <p className="text-[11px] text-[#8C7A6B] font-tajawal">
          حفل الزفاف المبارك · السبت 12 ديسمبر 2026 · قاعة لؤلؤة الماسة الملكية
        </p>
      </div>
    </footer>
  );
};
