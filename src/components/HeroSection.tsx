import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Heart,
  Sparkles,
  Download,
  Share2,
  Check,
} from "lucide-react";
import {
  WEDDING_DETAILS,
  getGoogleCalendarUrl,
  downloadIcsFile,
  getWhatsAppShareUrl,
} from "../utils/calendar";

export const HeroSection: React.FC = () => {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 overflow-hidden"
    >
      {/* Background Decorative Rings / Radial Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-[#F5E6D3]/60 via-[#F7ECE1]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        {/* Bismillah Calligraphy */}
        <div className="mb-6 inline-block">
          <p className="font-amiri text-2xl md:text-3xl text-[#996515] tracking-widest font-normal">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
        </div>

        {/* Quranic Verse */}
        <div className="max-w-2xl mx-auto mb-8 px-4 py-3 bg-[#F6EFE5]/70 border-y border-[#D4AF37]/30 rounded-xl shadow-xs">
          <p className="font-amiri text-base md:text-xl text-[#4A3B32] leading-relaxed italic">
            "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
          </p>
          <span className="block text-[11px] text-[#8C6D4A] mt-1 font-tajawal">
            [سورة الروم: الآية 21]
          </span>
        </div>

        {/* Heraldic Monogram Crest */}
        <div className="relative inline-flex items-center justify-center my-4">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F2E4CE] p-1.5 shadow-xl border-2 border-[#D4AF37]">
            <div className="w-full h-full rounded-full border border-[#D4AF37]/50 flex flex-col items-center justify-center relative overflow-hidden bg-[#FAF7F2]">
              {/* Corner leaves/filigree */}
              <span className="text-[10px] text-[#A77C38] tracking-widest uppercase mb-0.5">
                WEDDING
              </span>
              <div className="flex items-center gap-1">
                <span className="font-ruqaa text-4xl md:text-5xl text-[#855B1B] font-bold">
                  أ
                </span>
                <span className="font-amiri text-2xl text-[#D4AF37] italic">&</span>
                <span className="font-ruqaa text-4xl md:text-5xl text-[#855B1B] font-bold">
                  ج
                </span>
              </div>
              <span className="text-[10px] font-tajawal text-[#8C6D4A] mt-0.5 font-medium">
                12 · 12 · 2026
              </span>
            </div>
          </div>
        </div>

        {/* Headline & Couple Names */}
        <div className="mt-6 mb-4">
          <p className="text-xs md:text-sm font-tajawal tracking-widest text-[#8C6D4A] uppercase mb-2">
            دعوة لحضور حفل الزفاف المبارك
          </p>

          <h1 className="font-ruqaa text-5xl md:text-7xl lg:text-8xl text-[#2C2623] tracking-normal mb-3">
            <span className="inline-block hover:text-[#A77C38] transition-colors">
              أحمد
            </span>
            <span className="inline-block font-amiri text-3xl md:text-5xl text-[#D4AF37] mx-3 md:mx-6 font-normal">
              &
            </span>
            <span className="inline-block hover:text-[#A77C38] transition-colors">
              جنى
            </span>
          </h1>

          <p className="font-amiri text-lg md:text-2xl text-[#59473C] max-w-xl mx-auto leading-relaxed mt-4">
            تكتمل فرحتنا وسعادتنا بوجودكم ومشاركتكم أسعد وأغلى لحظات العمر في ليلة
            زفافنا المبارك بإذن الله.
          </p>
        </div>

        {/* Golden Foil Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-[1px] w-20 md:w-36 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="flex items-center gap-1.5 text-[#D4AF37]">
            <span className="text-xs">✦</span>
            <Heart className="w-4 h-4 fill-[#D4AF37]" />
            <span className="text-xs">✦</span>
          </div>
          <div className="h-[1px] w-20 md:w-36 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Date & Location Pill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {/* Date Card */}
          <div className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-2xl p-5 shadow-sm hover:border-[#D4AF37] transition-colors text-center">
            <div className="w-10 h-10 rounded-full bg-[#F5EADB] text-[#996515] flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-cairo font-bold text-lg text-[#2C2623]">
              السبت، 12 ديسمبر 2026
            </h3>
            <p className="text-xs text-[#7A6453] mt-1 font-tajawal">
              الساعة السابعة مساءً (07:00 PM)
            </p>
          </div>

          {/* Location Card */}
          <div className="bg-[#FFFDF9] border border-[#E8DFC8] rounded-2xl p-5 shadow-sm hover:border-[#D4AF37] transition-colors text-center">
            <div className="w-10 h-10 rounded-full bg-[#F5EADB] text-[#996515] flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-cairo font-bold text-lg text-[#2C2623]">
              {WEDDING_DETAILS.venueName}
            </h3>
            <p className="text-xs text-[#7A6453] mt-1 font-tajawal">
              {WEDDING_DETAILS.city} - مصر
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 relative">
          {/* RSVP Button */}
          <a
            href="#rsvp"
            className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#996515] hover:from-[#DFC056] hover:to-[#B3791B] text-white font-cairo font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-100" />
            <span>تأكيد الحضور (RSVP)</span>
          </a>

          {/* Venue Details Button */}
          <a
            href="#venue"
            className="py-3.5 px-6 rounded-full bg-[#FFFDF9] hover:bg-[#F9F4EB] text-[#4A3B32] border border-[#D4AF37]/60 font-cairo font-semibold text-sm transition-colors flex items-center gap-2 shadow-xs"
          >
            <MapPin className="w-4 h-4 text-[#A77C38]" />
            <span>تفاصيل وموقع القاعة</span>
          </a>

          {/* Add to Calendar Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
              className="py-3.5 px-5 rounded-full bg-[#FFFDF9] hover:bg-[#F9F4EB] text-[#4A3B32] border border-[#D4AF37]/60 font-cairo font-semibold text-sm transition-colors flex items-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4 text-[#A77C38]" />
              <span>حفظ الموعد بالتقويم</span>
            </button>

            {calendarMenuOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-20 text-right font-tajawal text-xs">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-stone-50 text-stone-800 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>إضافة إلى تقويم Google</span>
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile();
                    setCalendarMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-stone-50 text-stone-800 transition-colors text-right"
                >
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>تحميل ملف تقويم (Apple / Outlook)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
