import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Car,
  Sparkles,
  ShieldCheck,
  Clock,
  Compass,
  Building2,
  ExternalLink,
} from "lucide-react";
import { WEDDING_DETAILS } from "../utils/calendar";

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        `${WEDDING_DETAILS.venueName} - ${WEDDING_DETAILS.address}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  const amenities = [
    {
      icon: <Car className="w-5 h-5 text-[#855B1B]" />,
      title: "مواقف سيارات وفاليه مجاني",
      desc: "ساحة انتظار فندقية مخصصة ومؤمنة لسيارات الضيوف الكرام مع خدمة فاليه مجانية عند المدخل.",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#855B1B]" />,
      title: "قاعة ملكية فاخرة ومكيفة",
      desc: "تصميم فندقي كلاسيكي ساحر بديكورات ملكية وأحدث أنظمة الصوت والإضاءة التفاعلية.",
    },
    {
      icon: <Building2 className="w-5 h-5 text-[#855B1B]" />,
      title: "مدخل خاص واستقبال راقٍ",
      desc: "فريق استقبال متخصص ومشروبات ترحيبية تليق بضيوفنا وأحبابنا.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#855B1B]" />,
      title: "جناح خاص ومرافق متكاملة",
      desc: "أجنحة خاصة وغرف استراحة مجهزة مع أقصى درجات الراحة والخصوصية.",
    },
  ];

  return (
    <section id="venue" className="py-20 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D4A] tracking-wider uppercase mb-2 font-tajawal">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تفاصيل القاعة وموقع الحفل</span>
          </div>

          <h2 className="font-ruqaa text-3xl md:text-5xl text-[#2C2623] mb-3">
            قاعة لؤلؤة الماسة الملكية
          </h2>

          <p className="font-amiri text-lg md:text-xl text-[#6B5545] max-w-2xl mx-auto leading-relaxed">
            تم اختيار هذا الصرح الفندقي الفاخر ليحتضن أجمل ذكرياتنا ويوفر أقصى سبل
            الراحة والبهجة لجميع ضيوفنا الأعزاء.
          </p>
        </div>

        {/* Venue Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F5EADB] text-[#855B1B] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-cairo font-bold text-lg text-[#2C2623]">
                    {WEDDING_DETAILS.venueName}
                  </h3>
                  <p className="font-tajawal text-xs text-[#8C6D4A] mt-0.5">
                    فندق الماسة كابيتال · القاهرة الجديدة
                  </p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="mt-5 p-3.5 bg-[#F7F2EB] rounded-xl border border-[#E4D9C7] text-right font-tajawal">
                <span className="block text-[11px] font-semibold text-[#8C6D4A] mb-1">
                  العنوان بالتفصيل:
                </span>
                <p className="text-xs text-[#3D2D24] leading-relaxed">
                  {WEDDING_DETAILS.address}
                </p>

                <button
                  onClick={handleCopyAddress}
                  className="mt-3 w-full py-2 px-3 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-[#2C2623] transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">تم نسخ العنوان بدقة!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#855B1B]" />
                      <span>نسخ العنوان الكامل للمشاركة أو التوصيل</span>
                    </>
                  )}
                </button>
              </div>

              {/* GPS Action Buttons */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={WEDDING_DETAILS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-[#1E1713] hover:bg-stone-900 text-[#FAF7F2] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>

                <a
                  href={WEDDING_DETAILS.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-[#33CCFF] hover:bg-[#20BCEF] text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Compass className="w-3.5 h-3.5 text-slate-900" />
                  <span>تطبيق Waze</span>
                  <ExternalLink className="w-3 h-3 text-slate-700" />
                </a>
              </div>

              {/* Travel Guidelines */}
              <div className="mt-6 pt-5 border-t border-[#E8DFC8] space-y-2 text-xs font-tajawal text-[#6B5545]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#A77C38] flex-shrink-0" />
                  <span>يبعد 15 دقيقة عن مطار القاهرة الدولي</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-[#A77C38] flex-shrink-0" />
                  <span>مدخل مباشر وسلس من الطريق الدائري الأوسطي ومحور بن زايد</span>
                </div>
              </div>
            </div>

            {/* Dress Code Notice */}
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#D4AF37]/50 p-5 shadow-xs">
              <span className="block text-xs font-semibold text-[#855B1B] uppercase tracking-wider mb-1">
                قواعد الحضور والملابس (Dress Code)
              </span>
              <p className="font-cairo font-bold text-sm text-[#2C2623]">
                ملابس رسمية وأنيقة تليق ببهجة الليلة
              </p>
              <p className="text-xs text-[#7A6453] mt-1 font-tajawal leading-relaxed">
                يسعدنا رؤيتكم بأبهى حلة لمشاركتنا فرحتنا وصورنا التذكارية الخالدة.
              </p>
            </div>
          </div>

          {/* Right Map Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] p-3 shadow-md overflow-hidden">
              {/* Map Container */}
              <div className="relative w-full h-[400px] md:h-[480px] rounded-xl overflow-hidden bg-stone-100">
                <iframe
                  title="موقع قاعة الفرح بدقة"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110532.55169992383!2d31.35334704739504!3d30.01524303378519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145822eb1f7b8cfd%3A0x6b447477ebf928e1!2sAl%20Masa%20Hotel!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 right-4 bg-[#1E1713]/90 backdrop-blur-md text-[#FAF7F2] py-2 px-3.5 rounded-xl border border-[#D4AF37] shadow-lg flex items-center gap-2 pointer-events-none text-xs">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-cairo font-semibold">
                    موقع القاعة المحدد بدقة
                  </span>
                </div>
              </div>

              {/* Bottom Quick Map Link */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs font-tajawal text-[#8C6D4A]">
                <span>إحداثيات الموقع: 30.0152° N, 31.4913° E</span>
                <a
                  href={WEDDING_DETAILS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#855B1B] hover:text-[#5B3E13] font-semibold flex items-center gap-1 underline"
                >
                  <span>تكبير الخريطة في نافذة مستقلة</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Amenities 4-card Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] rounded-xl border border-[#E8DFC8] p-4 text-center hover:border-[#D4AF37] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5EADB] flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <h4 className="font-cairo font-bold text-sm text-[#2C2623] mb-1">
                {item.title}
              </h4>
              <p className="font-tajawal text-xs text-[#7A6453] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
