/**
 * Calendar and Sharing Utilities for Ahmed & Jana's Wedding
 * Date: December 12, 2026 at 19:00 (7:00 PM) EET
 */

export const WEDDING_DETAILS = {
  groom: "أحمد",
  bride: "جنى",
  dateString: "2026-12-12T19:00:00",
  dateArabic: "السبت، 12 ديسمبر 2026",
  timeArabic: "الساعة 7:00 مساءً",
  venueName: "قاعة لؤلؤة الماسة الملكية (Al Masa Royal Ballroom)",
  city: "القاهرة الجديدة",
  address: "فندق الماسة كابيتال - الحي الدبلوماسي / التجمع الخامس، القاهرة، مصر",
  mapsUrl: "https://maps.google.com/?q=Al+Masa+Hotel+Cairo",
  wazeUrl: "https://waze.com/ul?q=Al+Masa+Hotel+Cairo",
  coordinates: {
    lat: 30.0152,
    lng: 31.4913
  }
};

export function getGoogleCalendarUrl(): string {
  // Wedding from 2026-12-12 19:00 to 2026-12-13 01:00 UTC+2 (Cairo time)
  // UTC time: 20261212T170000Z to 20261212T230000Z
  const title = encodeURIComponent(`حفل زفاف ${WEDDING_DETAILS.groom} & ${WEDDING_DETAILS.bride}`);
  const details = encodeURIComponent(
    `يسعدنا ويشرفنا حضوركم ومشاركتنا فرحتنا الكبرى بحفل زفاف ${WEDDING_DETAILS.groom} & ${WEDDING_DETAILS.bride}.\nالمكان: ${WEDDING_DETAILS.venueName}\nالعنوان: ${WEDDING_DETAILS.address}`
  );
  const location = encodeURIComponent(`${WEDDING_DETAILS.venueName}, ${WEDDING_DETAILS.address}`);
  const dates = "20261212T170000Z/20261212T230000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ahmed and Jana Wedding//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "SUMMARY:حفل زفاف أحمد وجنى",
    "DESCRIPTION:يسعدنا ويشرفنا حضوركم حفل زفاف أحمد وجنى بقاعة الماسة الملكية.",
    `LOCATION:${WEDDING_DETAILS.venueName}, ${WEDDING_DETAILS.address}`,
    "DTSTART:20261212T170000Z",
    "DTEND:20261212T230000Z",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Wedding_Ahmed_and_Jana.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getWhatsAppShareUrl(): string {
  const text = encodeURIComponent(
    `🕊️ دعوة زفاف خاصة 💍\n\nيتشرف *${WEDDING_DETAILS.groom}* و *${WEDDING_DETAILS.bride}* بدعوتكم لحضور حفل زفافهما المبارك.\n\n📅 الموعد: ${WEDDING_DETAILS.dateArabic} - ${WEDDING_DETAILS.timeArabic}\n📍 المكان: ${WEDDING_DETAILS.venueName}\n\nلمشاهدة بطاقة الدعوة وتأكيد الحضور:\n${window.location.href}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}
