import React, { useState } from "react";
import {
  Share2,
  Calendar,
  Sparkles,
  Flower2,
  Check,
  Menu,
  X,
  Volume2,
} from "lucide-react";
import { getWhatsAppShareUrl, getGoogleCalendarUrl } from "../utils/calendar";

interface HeaderNavProps {
  petalsActive: boolean;
  onTogglePetals: () => void;
  onOpenEnvelope: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  petalsActive,
  onTogglePetals,
  onOpenEnvelope,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const navLinks = [
    { label: "الدعوة", href: "#hero" },
    { label: "العد التنازلي", href: "#countdown" },
    { label: "القاعة والموقع", href: "#venue" },
    { label: "برنامج الحفل", href: "#timeline" },
    { label: "تأكيد الحضور", href: "#rsvp" },
    { label: "سجل التهاني", href: "#guestbook" },
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#996515] p-[1.5px] shadow-sm">
            <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center font-ruqaa text-lg text-[#855B1B] font-bold group-hover:bg-[#FAF0E6] transition-colors">
              أ & ج
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="block font-ruqaa text-lg text-[#2C2623] leading-none">
              أحمد & جنى
            </span>
            <span className="text-[10px] text-[#8C6D4A] tracking-wider">
              12 ديسمبر 2026
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A3B32]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#A77C38] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D4AF37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Toggle Petals */}
          <button
            onClick={onTogglePetals}
            className={`p-2 rounded-full border transition-all ${
              petalsActive
                ? "bg-[#F3E5D8] border-[#D4AF37] text-[#8C6D4A]"
                : "bg-white/60 border-stone-200 text-stone-400 hover:text-stone-600"
            }`}
            title={petalsActive ? "إيقاف تساقط الورد" : "تشغيل تساقط الورد"}
          >
            <Flower2 className="w-4 h-4" />
          </button>

          {/* Re-open Envelope */}
          <button
            onClick={onOpenEnvelope}
            className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-[#D4AF37]/60 bg-[#FFFDF9] hover:bg-[#FDF6EC] text-xs font-semibold text-[#855B1B] transition-colors shadow-xs"
            title="إعادة فتح ظرف الدعوة الملكية"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ظرف الدعوة</span>
          </button>

          {/* Share on WhatsApp */}
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة الدعوة</span>
          </a>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-full border border-stone-200 bg-white/70 hover:bg-stone-50 text-stone-700 transition-colors"
            title="نسخ رابط الدعوة"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#2C2623] hover:bg-stone-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFC8] bg-[#FAF7F2] px-4 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-center text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg bg-[#F4EDE2] text-[#3D2D24] hover:bg-[#EADDCF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-3 rounded-lg bg-[#128C7E] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة عبر واتساب</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnvelope();
              }}
              className="py-2 px-3 rounded-lg border border-[#D4AF37] text-xs font-semibold text-[#855B1B]"
            >
              فتح الظرف
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
