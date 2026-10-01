import React from "react";
import { Heart, Sparkles, Quote } from "lucide-react";
import { SONG_INFO } from "../utils/audioSynth";

export const CoupleStory: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D4A] tracking-wider uppercase mb-2 font-tajawal">
          <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
          <span>رحلة العمر والحب</span>
        </div>

        <h2 className="font-ruqaa text-3xl md:text-5xl text-[#2C2623] mb-4">
          حكاية أحمد وجنى
        </h2>

        {/* Romantic Featured Lyrics Banner */}
        <div className="my-8 max-w-2xl mx-auto p-6 bg-gradient-to-r from-[#FAF3E8] via-[#FFFDF9] to-[#FAF3E8] border border-[#D4AF37]/50 rounded-3xl shadow-xs relative">
          <Quote className="w-8 h-8 text-[#D4AF37]/40 absolute top-4 right-4" />
          <p className="font-amiri text-xl md:text-2xl text-[#855B1B] font-semibold leading-relaxed pt-2">
            "اه ولا عاش ولا كان اللي يبكيك .. ده انا أبيع الناس ولا أفرط فيك"
          </p>
          <span className="block text-xs font-tajawal text-[#8C6D4A] mt-2">
            من كلمات أغنية حفل الزفاف الخاصة
          </span>
        </div>

        {/* 3 Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right mt-12">
          {/* Card 1 */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] p-6 shadow-xs hover:border-[#D4AF37] transition-colors relative overflow-hidden group">
            <div className="w-10 h-10 rounded-full bg-[#F5EADB] text-[#855B1B] flex items-center justify-center mb-4">
              <span className="font-bold text-sm">٠١</span>
            </div>
            <h3 className="font-cairo font-bold text-lg text-[#2C2623] mb-2">
              بداية الحكاية
            </h3>
            <p className="font-tajawal text-xs text-[#6B5545] leading-relaxed">
              تلاقت القلوب بنقاء وصدق، وكانت كل خطوة تؤكد أن الأقدار تجمع القلوب
              المتحابة في أبهى صورة.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] p-6 shadow-xs hover:border-[#D4AF37] transition-colors relative overflow-hidden group">
            <div className="w-10 h-10 rounded-full bg-[#F5EADB] text-[#855B1B] flex items-center justify-center mb-4">
              <span className="font-bold text-sm">٠٢</span>
            </div>
            <h3 className="font-cairo font-bold text-lg text-[#2C2623] mb-2">
              الوعد والرباط المقدس
            </h3>
            <p className="font-tajawal text-xs text-[#6B5545] leading-relaxed">
              تعلّمت القلوب أن تبني مستقبلاً بالوفاء والود، وأن يكون كل منهما
              سنداً وملاذاً لرفيق دربه في كل حين.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] p-6 shadow-xs hover:border-[#D4AF37] transition-colors relative overflow-hidden group">
            <div className="w-10 h-10 rounded-full bg-[#F5EADB] text-[#855B1B] flex items-center justify-center mb-4">
              <span className="font-bold text-sm">٠٣</span>
            </div>
            <h3 className="font-cairo font-bold text-lg text-[#2C2623] mb-2">
              12 / 12 / 2026
            </h3>
            <p className="font-tajawal text-xs text-[#6B5545] leading-relaxed">
              اليوم الذي نحتفل فيه مع أغلى الأهل والأحباب بانطلاقة بيتنا الجديد،
              سائلين الله دوام البركة والهناء.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
