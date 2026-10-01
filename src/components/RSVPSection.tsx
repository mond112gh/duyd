import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  Users,
  Send,
  Sparkles,
  QrCode,
  Download,
  Share2,
  Eye,
  Check,
  Phone,
  User,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { RSVPData } from "../types/wedding";
import { WEDDING_DETAILS, getWhatsAppShareUrl } from "../utils/calendar";

export const RSVPSection: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState("");

  const [submittedPass, setSubmittedPass] = useState<RSVPData | null>(null);
  const [allRSVPs, setAllRSVPs] = useState<RSVPData[]>([]);
  const [showAdminModal, setShowAdminModal] = useState(false);

  // Load existing RSVPs
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wedding_rsvps_data");
      if (stored) {
        setAllRSVPs(JSON.parse(stored));
      } else {
        // Pre-seed with couple's initial close family confirmed RSVP
        const initialSeed: RSVPData[] = [
          {
            id: "seed-1",
            name: "م. محمد الشريف (عائلة العريس)",
            phone: "+20 100 123 4567",
            attending: "yes",
            guestCount: 3,
            message: "ألف مبارك لأحمد وجنى، جعل الله أيامكم كلها فرحاً وسروراً!",
            timestamp: "منذ يومين",
          },
          {
            id: "seed-2",
            name: "د. هبة عبد المنعم (صديقة جنى)",
            phone: "+20 109 876 5432",
            attending: "yes",
            guestCount: 2,
            message: "أجمل عروس في الدنيا! متشوقين جداً لليلة 12/12 🤍",
            timestamp: "منذ يوم",
          },
        ];
        setAllRSVPs(initialSeed);
        localStorage.setItem("wedding_rsvps_data", JSON.stringify(initialSeed));
      }
    } catch {
      // fallback
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newRSVP: RSVPData = {
      id: "rsvp-" + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      attending,
      guestCount: attending === "yes" ? guestCount : 0,
      message: message.trim() || undefined,
      timestamp: "الآن",
    };

    const updated = [newRSVP, ...allRSVPs];
    setAllRSVPs(updated);
    try {
      localStorage.setItem("wedding_rsvps_data", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setSubmittedPass(newRSVP);

    // Celebratory confetti if attending
    if (attending === "yes") {
      try {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#E8B4B8", "#FAF7F2", "#855B1B"],
        });
      } catch {
        // fallback
      }
    }
  };

  const totalAttendingGuests = allRSVPs
    .filter((r) => r.attending === "yes")
    .reduce((sum, r) => sum + (r.guestCount || 1), 0);

  return (
    <section id="rsvp" className="py-20 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D4A] tracking-wider uppercase mb-2 font-tajawal">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تأكيد الحضور وتنسيق الدعوات</span>
          </div>

          <h2 className="font-ruqaa text-3xl md:text-5xl text-[#2C2623] mb-3">
            تأكيد حضوركم الكريم
          </h2>

          <p className="font-amiri text-lg md:text-xl text-[#6B5545] max-w-xl mx-auto">
            يسعدنا تأكيد حضوركم لمساعدتنا في ترتيب أماكنكم وحسن ضيافتكم بما يليق
            بمكانتكم في قلوبنا.
          </p>
        </div>

        {/* If Pass is already generated after submission */}
        {submittedPass ? (
          <div className="max-w-md mx-auto bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] p-6 shadow-xl text-center relative overflow-hidden animate-fade-in">
            {/* Top Pass Ribbon */}
            <div className="bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#996515] -mx-6 -mt-6 p-4 text-white mb-6">
              <span className="font-tajawal text-xs uppercase tracking-widest font-semibold block">
                بطاقة دخول معتمدة
              </span>
              <h3 className="font-ruqaa text-2xl mt-0.5">
                حفل زفاف أحمد & جنى
              </h3>
            </div>

            <div className="space-y-4 text-right font-tajawal">
              <div>
                <span className="text-xs text-[#8C6D4A] block">الضيف الكريم</span>
                <p className="text-lg font-bold text-[#2C2623]">
                  {submittedPass.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 border-y border-[#E8DFC8]">
                <div>
                  <span className="text-xs text-[#8C6D4A] block">حالة الحضور</span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold mt-1 ${
                      submittedPass.attending === "yes"
                        ? "text-emerald-700"
                        : "text-stone-500"
                    }`}
                  >
                    {submittedPass.attending === "yes" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>مؤكد الحضور ({submittedPass.guestCount} أفراد)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>معتذر عن الحضور</span>
                      </>
                    )}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-[#8C6D4A] block">التاريخ والوقت</span>
                  <span className="text-xs font-bold text-[#2C2623] block mt-1">
                    12/12/2026 · 07:00 PM
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-[#8C6D4A] block">القاعة المحددة</span>
                <p className="text-xs font-semibold text-[#2C2623]">
                  {WEDDING_DETAILS.venueName}
                </p>
              </div>

              {/* Decorative QR Code */}
              <div className="pt-3 text-center">
                <div className="w-28 h-28 mx-auto bg-white p-2 rounded-xl border border-stone-300 shadow-xs flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-[#1E1713]"
                    fill="currentColor"
                  >
                    {/* SVG Stylized QR code representation */}
                    <rect x="5" y="5" width="25" height="25" rx="3" />
                    <rect x="10" y="10" width="15" height="15" fill="white" />
                    <rect x="13" y="13" width="9" height="9" />
                    <rect x="70" y="5" width="25" height="25" rx="3" />
                    <rect x="75" y="10" width="15" height="15" fill="white" />
                    <rect x="78" y="13" width="9" height="9" />
                    <rect x="5" y="70" width="25" height="25" rx="3" />
                    <rect x="10" y="75" width="15" height="15" fill="white" />
                    <rect x="13" y="78" width="9" height="9" />
                    {/* Data matrix dots */}
                    <rect x="36" y="10" width="6" height="6" />
                    <rect x="46" y="10" width="6" height="6" />
                    <rect x="56" y="10" width="6" height="6" />
                    <rect x="36" y="24" width="6" height="6" />
                    <rect x="56" y="24" width="6" height="6" />
                    <rect x="10" y="38" width="6" height="6" />
                    <rect x="24" y="38" width="6" height="6" />
                    <rect x="38" y="38" width="8" height="8" rx="2" fill="#D4AF37" />
                    <rect x="52" y="38" width="6" height="6" />
                    <rect x="66" y="38" width="6" height="6" />
                    <rect x="80" y="38" width="6" height="6" />
                    <rect x="36" y="52" width="6" height="6" />
                    <rect x="48" y="52" width="6" height="6" />
                    <rect x="60" y="52" width="6" height="6" />
                    <rect x="36" y="70" width="6" height="6" />
                    <rect x="48" y="70" width="6" height="6" />
                    <rect x="60" y="70" width="6" height="6" />
                    <rect x="74" y="70" width="6" height="6" />
                    <rect x="74" y="84" width="6" height="6" />
                    <rect x="86" y="84" width="6" height="6" />
                  </svg>
                </div>
                <span className="text-[10px] text-stone-500 mt-1 block">
                  رمز تأكيد الحضور الإلكتروني للتحقق السريع
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>إرسال التأكيد للعروسين عبر واتساب</span>
              </a>

              <button
                onClick={() => setSubmittedPass(null)}
                className="text-xs text-[#8C6D4A] hover:underline py-1"
              >
                تعديل بيانات الحضور أو تسجيل اسم آخر
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <div className="max-w-xl mx-auto bg-[#FFFDF9] rounded-3xl border border-[#E8DFC8] p-6 md:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Guest Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5 font-tajawal">
                  الاسم بالكامل (أو اسم العائلة الكريمة) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد منصور أو عائلة الشريف"
                    className="w-full py-3 pr-10 pl-4 bg-[#FAF7F2] border border-[#DCD3C3] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl text-sm text-[#2C2623] outline-hidden transition-all"
                  />
                  <User className="w-4 h-4 text-[#8C6D4A] absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5 font-tajawal">
                  رقم الهاتف أو واتساب *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    className="w-full py-3 pr-10 pl-4 bg-[#FAF7F2] border border-[#DCD3C3] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl text-sm text-[#2C2623] outline-hidden transition-all text-right"
                    dir="ltr"
                  />
                  <Phone className="w-4 h-4 text-[#8C6D4A] absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-2 font-tajawal">
                  هل ستشرفنا بالحضور؟ *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      attending === "yes"
                        ? "bg-[#F3E5D8] border-[#D4AF37] text-[#855B1B] shadow-xs"
                        : "bg-[#FAF7F2] border-[#E4D9C7] text-stone-600 hover:bg-white"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        attending === "yes" ? "text-[#855B1B]" : "text-stone-400"
                      }`}
                    />
                    <span>يشرفني وسأحضر بكل سرور 💍</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      attending === "no"
                        ? "bg-rose-50 border-rose-300 text-rose-800 shadow-xs"
                        : "bg-[#FAF7F2] border-[#E4D9C7] text-stone-600 hover:bg-white"
                    }`}
                  >
                    <XCircle
                      className={`w-4 h-4 ${
                        attending === "no" ? "text-rose-600" : "text-stone-400"
                      }`}
                    />
                    <span>للأسف أعتذر لظروف خاصة 🤍</span>
                  </button>
                </div>
              </div>

              {/* Guest Count (only if attending) */}
              {attending === "yes" && (
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFC8]">
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-2 font-tajawal">
                    إجمالي عدد الأفراد الحاضرين (مع حضرتك):
                  </label>
                  <div className="flex items-center justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                          guestCount === num
                            ? "bg-[#D4AF37] text-[#1E1713] shadow-xs scale-105"
                            : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        {num === 1 ? "فرد واحد" : `${num} أفراد`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special message or blessing */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5 font-tajawal">
                  رسالة خاصة أو أمنية للعروسين (اختياري)
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب كلمة طيبة أو أمنية من قلبك للعروسين..."
                    className="w-full p-3 pr-10 bg-[#FAF7F2] border border-[#DCD3C3] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl text-sm text-[#2C2623] outline-hidden transition-all resize-none"
                  />
                  <MessageSquare className="w-4 h-4 text-[#8C6D4A] absolute right-3.5 top-3.5" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#996515] hover:from-[#DFC056] hover:to-[#B3791B] text-white font-cairo font-bold text-sm md:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال وتأكيد الحضور فوراً</span>
              </button>
            </form>
          </div>
        )}

        {/* Guest Stats Summary Bar (for Couple) */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 bg-[#FAF3E8] border border-[#E8DFC8] rounded-2xl py-3 px-5 text-xs text-[#7A6453]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-[#855B1B]" />
              <span>إجمالي الحضور المسجل حتى الآن:</span>
              <strong className="text-[#2C2623] font-bold">
                {totalAttendingGuests} فرد
              </strong>
            </span>
          </div>

          <button
            onClick={() => setShowAdminModal(true)}
            className="text-xs font-semibold text-[#855B1B] hover:text-[#5B3E13] flex items-center gap-1 hover:underline"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>عرض قائمة المدعوين المسجلين ({allRSVPs.length})</span>
          </button>
        </div>

        {/* Modal: View Confirmed Guests List */}
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#FAF7F2] text-[#2C2623] w-full max-w-2xl rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 relative max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DFC8]">
                <h3 className="font-cairo font-bold text-lg text-[#2C2623] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#855B1B]" />
                  <span>قائمة الحضور المسجلين لحفل الزفاف</span>
                </h3>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="p-1 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto flex-1 my-4 space-y-3 pr-1">
                {allRSVPs.map((rsvp) => (
                  <div
                    key={rsvp.id}
                    className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs font-tajawal flex flex-wrap items-center justify-between gap-2"
                  >
                    <div>
                      <p className="font-bold text-stone-900 text-sm">
                        {rsvp.name}
                      </p>
                      <span className="text-stone-500 font-mono" dir="ltr">
                        {rsvp.phone}
                      </span>
                      {rsvp.message && (
                        <p className="text-stone-600 mt-1 italic">
                          "{rsvp.message}"
                        </p>
                      )}
                    </div>

                    <div className="text-left">
                      <span
                        className={`inline-block py-1 px-2.5 rounded-full font-bold text-[11px] ${
                          rsvp.attending === "yes"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {rsvp.attending === "yes"
                          ? `حاضر (${rsvp.guestCount} أفراد)`
                          : "معتذر"}
                      </span>
                      <span className="block text-[10px] text-stone-400 mt-0.5">
                        {rsvp.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E8DFC8] flex justify-between items-center text-xs">
                <span className="text-stone-600">
                  إجمالي المسجلين: {allRSVPs.length} | مؤكد الحضور: {totalAttendingGuests} فرد
                </span>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="py-1.5 px-4 bg-[#1E1713] text-white rounded-lg text-xs font-semibold"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
