import React, { useState, useEffect } from "react";
import { Clock, Sparkles, Heart } from "lucide-react";
import { WEDDING_DETAILS } from "../utils/calendar";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  const targetDate = new Date(WEDDING_DETAILS.dateString).getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "يوم", value: timeLeft.days, max: 365 },
    { label: "ساعة", value: timeLeft.hours, max: 24 },
    { label: "دقيقة", value: timeLeft.minutes, max: 60 },
    { label: "ثانية", value: timeLeft.seconds, max: 60 },
  ];

  return (
    <section id="countdown" className="py-16 px-4 bg-[#F5ECE0]/60 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Kicker */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D4A] tracking-wider uppercase mb-2 font-tajawal">
          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>العد التنازلي لليلة العمر</span>
        </div>

        <h2 className="font-ruqaa text-3xl md:text-5xl text-[#2C2623] mb-3">
          ننتظر لقاءكم بشوق
        </h2>

        <p className="font-amiri text-base md:text-xl text-[#6B5545] max-w-xl mx-auto mb-10">
          كل ثانية تقربنا من أسعد لحظات الحياة، لا تكتمل بهجتنا إلا بوجودكم معنا.
        </p>

        {timeLeft.isPast ? (
          <div className="p-8 bg-[#FFFDF9] rounded-2xl border-2 border-[#D4AF37] max-w-lg mx-auto shadow-md">
            <Heart className="w-10 h-10 text-[#A63A50] fill-[#A63A50] mx-auto mb-3" />
            <h3 className="font-ruqaa text-3xl text-[#2C2623]">
              اليوم يوم الفرح الأكبر!
            </h3>
            <p className="font-amiri text-lg text-[#59473C] mt-2">
              "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {units.map((unit, idx) => (
              <div
                key={idx}
                className="relative bg-[#FFFDF9] rounded-2xl p-5 md:p-6 border border-[#E8DFC8] shadow-sm hover:border-[#D4AF37] hover:shadow-md transition-all group overflow-hidden"
              >
                {/* Subtle top golden accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Big Number */}
                <div className="font-cairo font-extrabold text-4xl md:text-6xl text-[#2C2623] tracking-tight group-hover:text-[#855B1B] transition-colors tabular-nums">
                  {unit.value < 10 ? `0${unit.value}` : unit.value}
                </div>

                {/* Arabic Label */}
                <span className="block font-tajawal text-sm md:text-base font-semibold text-[#8C6D4A] mt-2">
                  {unit.label}
                </span>

                {/* Corner ornament */}
                <div className="absolute bottom-1 right-2 text-[#D4AF37]/30 text-xs select-none">
                  ✦
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Milestone Date Info */}
        <div className="mt-8 inline-flex items-center gap-2 text-xs md:text-sm text-[#7A6453] bg-white/70 py-2 px-5 rounded-full border border-[#E8DFC8]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>الموعد المرتقب: السبت 12 - 12 - 2026 | 07:00 مساءً بتوقيت القاهرة</span>
        </div>
      </div>
    </section>
  );
};
