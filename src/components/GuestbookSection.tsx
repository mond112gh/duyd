import React, { useState, useEffect } from "react";
import {
  MessageSquareHeart,
  Heart,
  Send,
  Sparkles,
  Smile,
  Flower2,
} from "lucide-react";
import { WishComment } from "../types/wedding";

export const GuestbookSection: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [relationship, setRelationship] = useState("محب ومهنئ");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💍");
  const [wishes, setWishes] = useState<WishComment[]>([]);

  const emojiOptions = ["💍", "💐", "🕊️", "✨", "❤️", "🥂", "🌸", "👑"];

  const relationshipOptions = [
    "محب ومهنئ",
    "عائلة العريس",
    "عائلة العروس",
    "صديق العريس",
    "صديقة العروس",
    "زميل عمل",
  ];

  // Load stored wishes or use charming defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wedding_wishes_data");
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        const defaultWishes: WishComment[] = [
          {
            id: "wish-1",
            author: "خالد السعيد وأسرته",
            relationship: "عائلة العريس",
            message:
              "ألف ألف مبارك يا أغلى عريس! بارك الله لكما وبارك عليكما وجمع بينكما في خير وسعادة دائمة، ليلة 12/12 ستكون بإذن الله أحلى الليالي.",
            emoji: "💍",
            likes: 18,
            timestamp: "اليوم",
          },
          {
            id: "wish-2",
            author: "مروة طارق ورفيقات الجامعة",
            relationship: "صديقة العروس",
            message:
              "أجمل وأرق عروسة في الكون حبيبتي جنى! ربنا يسعد قلبك ويجعل كل أيامك القادمة هناء ورضا وحب مع أحمد الغالي 🤍✨",
            emoji: "💐",
            likes: 24,
            timestamp: "اليوم",
          },
          {
            id: "wish-3",
            author: "م. كريم النجار",
            relationship: "صديق العريس",
            message:
              "فرحة العمر يا أبو حميد! من أيام الكلية وإحنا مستنيين اليوم دا. ربنا يتمم لكم على ألف خير وتكون بداية أجمل حياة مشتركة.",
            emoji: "🕊️",
            likes: 12,
            timestamp: "أمس",
          },
        ];
        setWishes(defaultWishes);
        localStorage.setItem("wedding_wishes_data", JSON.stringify(defaultWishes));
      }
    } catch {
      // fallback
    }
  }, []);

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newWish: WishComment = {
      id: "wish-" + Date.now(),
      author: author.trim(),
      relationship,
      message: message.trim(),
      emoji: selectedEmoji,
      likes: 1,
      timestamp: "الآن",
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem("wedding_wishes_data", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setAuthor("");
    setMessage("");
  };

  const handleLike = (id: string) => {
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, likes: w.likes + 1 } : w
    );
    setWishes(updated);
    try {
      localStorage.setItem("wedding_wishes_data", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="guestbook" className="py-20 px-4 bg-[#F5ECE0]/60 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6D4A] tracking-wider uppercase mb-2 font-tajawal">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>سجل التهاني والمباركات</span>
          </div>

          <h2 className="font-ruqaa text-3xl md:text-5xl text-[#2C2623] mb-3">
            كلماتكم تسعد قلوبنا
          </h2>

          <p className="font-amiri text-lg md:text-xl text-[#6B5545] max-w-xl mx-auto">
            اتركوا بصمتكم وأطيب دعواتكم لأحمد وجنى لتبقى ذكرى غالية نحتفظ بها مدى
            العمر.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Post Comment Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl border border-[#E8DFC8] p-6 shadow-sm">
            <h3 className="font-cairo font-bold text-base text-[#2C2623] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>كتابة تهنئة جديدة للعروسين</span>
            </h3>

            <form onSubmit={handlePostWish} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 font-tajawal">
                  اسمك الكريم *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="مثال: يوسف العبدالله"
                  className="w-full py-2.5 px-3 bg-[#FAF7F2] border border-[#DCD3C3] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl text-xs text-[#2C2623] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 font-tajawal">
                  صلة القرابة أو الصداقة
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FAF7F2] border border-[#DCD3C3] focus:border-[#D4AF37] rounded-xl text-xs text-[#2C2623] outline-hidden cursor-pointer"
                >
                  {relationshipOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Emoji Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1.5 font-tajawal">
                  اختر رمز التهنئة:
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${
                        selectedEmoji === emoji
                          ? "bg-[#D4AF37]/30 border border-[#D4AF37] scale-110"
                          : "bg-[#FAF7F2] hover:bg-stone-100"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 font-tajawal">
                  رسالة التهنئة والدعاء *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="بارك الله لهما وبارك عليهما... أسأل الله لكم السعادة والتوفيق"
                  className="w-full p-3 bg-[#FAF7F2] border border-[#DCD3C3] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 rounded-xl text-xs text-[#2C2623] outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#855B1B] hover:bg-[#6D4913] text-white rounded-xl text-xs font-bold font-cairo flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>نشر التهنئة في السجل</span>
              </button>
            </form>
          </div>

          {/* Comments List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-[#8C6D4A] font-tajawal">
                إجمالي المباركات ({wishes.length})
              </span>
              <span className="text-[11px] text-stone-500 font-tajawal">
                تظهر التهاني تلقائياً للجميع
              </span>
            </div>

            <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] p-4 shadow-xs hover:border-[#D4AF37] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#FAF3E8] border border-[#E8DFC8] flex items-center justify-center text-lg flex-shrink-0">
                        {item.emoji}
                      </div>
                      <div>
                        <h4 className="font-cairo font-bold text-sm text-[#2C2623]">
                          {item.author}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-[#8C6D4A] font-tajawal">
                          <span>{item.relationship}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(item.id)}
                      className="py-1 px-2.5 rounded-full bg-[#FAF7F2] hover:bg-rose-50 border border-stone-200 hover:border-rose-200 text-stone-600 hover:text-rose-600 transition-colors flex items-center gap-1.5 text-xs group"
                    >
                      <Heart className="w-3.5 h-3.5 group-hover:fill-rose-500 text-rose-500 transition-transform group-hover:scale-110" />
                      <span className="font-mono text-[11px]">{item.likes}</span>
                    </button>
                  </div>

                  <p className="font-amiri text-base text-[#4A3B32] leading-relaxed pr-11">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
