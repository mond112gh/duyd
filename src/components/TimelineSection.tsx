import React from "react";
import {
  Clock,
  Wine,
  Sparkles,
  Music2,
  UtensilsCrossed,
  Camera,
  Heart,
} from "lucide-react";

export const TimelineSection: React.FC = () => {
  const events = [
    {
      time: "07:00 مساءً",
      title: "استقبال الضيوف الكرام",
      desc: "فتح أبواب القاعة والترحيب بالأهل والأصدقاء وتناول المشروبات الترحيبية والحلويات الفاخرة.",
      icon: <Wine className="w-5 h-5 text-[#855B1B]" />,
    },
    {
      time: "08:00 مساءً",
      title: "الزفة الملكية ودخول العروسين",
      desc: "وصول موكب العروسين أحمد وجنى على نغمات الزفة المصرية الكلاسيكية مع عروض الأضواء المبهرة.",
      icon: <Music2 className="w-5 h-5 text-[#855B1B]" />,
    },
    {
      time: "09:00 مساءً",
      title: "مراسم الفرح والرقصة الأولى",
      desc: "احتفال العروسين والرقصة الرومانسية الأولى وسط الأهل والأحباب والتقاط الصور المميزة.",
      icon: <Sparkles className="w-5 h-5 text-[#855B1B]" />,
    },
    {
      time: "10:00 مساءً",
      title: "مأدبة العشاء الملكي الفاخر",
      desc: "بوفيه مفتوح فندقي يضم أشهى المأكولات الشرقية والغربية مع باقة من المشروبات والمقبلات.",
      icon: <UtensilsCrossed className="w-5 h-5 text-[#855B1B]" />,
    },
    {
      time: "11:30 مساءً",
      title: "تقطيع كعكة الزفاف والتقاط الصور",
      desc: "مراسم تقطيع كيك الفرح ومشاركة الذكريات والصور التذكارية مع الأهل ورفاق الدرب.",
      icon: <Camera className="w-5 h-5 text-[#855B1B]" />,
    },
    {
      time: "12:30 بعد منتصف الليل",
      title: "وداع الأحباب وختام الحفل",
      desc: "شكر الضيوف الكرام وتوديع العروسين مع خالص الدعوات بحياة مليئة بالمحبة والبركة.",
      icon: <Heart className="w-5 h-5 text-[#855B1B]" />,
    },
  ];

  return (
    <section id="timeline" className="py-20 px-4 bg-[#F5ECE0]/50 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D4A] tracking-wider uppercase mb-2 font-tajawal">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>برنامج ومراسم الليلة</span>
          </div>

          <h2 className="font-ruqaa text-3xl md:text-5xl text-[#2C2623] mb-3">
            جدول ليلة العمر
          </h2>

          <p className="font-amiri text-lg md:text-xl text-[#6B5545] max-w-xl mx-auto">
            خطوة بخطوة، نسعد بوجودكم لمشاركتنا كل تفصيلة في هذه الليلة الاستثنائية.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative border-r-2 border-[#D4AF37]/50 mr-4 md:mr-32 pr-6 md:pr-8 space-y-10">
          {events.map((evt, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot Indicator */}
              <div className="absolute -right-[35px] md:-right-[43px] top-1.5 w-6 h-6 rounded-full bg-[#FAF7F2] border-2 border-[#D4AF37] flex items-center justify-center shadow-xs group-hover:scale-125 group-hover:bg-[#D4AF37] transition-all">
                <div className="w-2 h-2 rounded-full bg-[#855B1B] group-hover:bg-white" />
              </div>

              {/* Event Content Card */}
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] p-5 shadow-xs hover:border-[#D4AF37] hover:shadow-md transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F5EADB] flex items-center justify-center">
                      {evt.icon}
                    </div>
                    <h3 className="font-cairo font-bold text-base md:text-lg text-[#2C2623]">
                      {evt.title}
                    </h3>
                  </div>

                  <span className="font-tajawal text-xs font-bold text-[#855B1B] bg-[#F7F0E6] py-1 px-3 rounded-full border border-[#D4AF37]/30">
                    {evt.time}
                  </span>
                </div>

                <p className="font-tajawal text-xs md:text-sm text-[#6B5545] leading-relaxed mr-10">
                  {evt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
