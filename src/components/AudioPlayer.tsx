import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Music,
  FileAudio,
  Sparkles,
  ChevronUp,
  ChevronDown,
  X,
  Check,
  Disc,
  Download,
  RotateCcw,
} from "lucide-react";
import {
  RomanticMelodyEngine,
  SONG_INFO,
  saveCustomAudio,
  getCustomAudio,
  removeCustomAudio,
} from "../utils/audioSynth";

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

const DEFAULT_AUDIO_PATH = "/audio/wedding-song.mp3";

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showLyricsModal, setShowLyricsModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [hasCustomTrack, setHasCustomTrack] = useState<boolean>(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const synthRef = useRef<RomanticMelodyEngine | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentAudioSrc = customAudioUrl || DEFAULT_AUDIO_PATH;

  // Initialize synth and check for stored custom audio
  useEffect(() => {
    synthRef.current = new RomanticMelodyEngine();

    const loadPersistedAudio = async () => {
      try {
        const storedBlob = await getCustomAudio();
        if (storedBlob) {
          const url = URL.createObjectURL(storedBlob);
          setCustomAudioUrl(url);
          setHasCustomTrack(true);
        }
      } catch (err) {
        console.error("Failed to load stored audio:", err);
      }
    };

    loadPersistedAudio();

    return () => {
      if (synthRef.current) {
        synthRef.current.stop();
      }
      if (customAudioUrl) {
        URL.revokeObjectURL(customAudioUrl);
      }
    };
  }, []);

  // Sync volume
  useEffect(() => {
    const effectiveVol = isMuted ? 0 : volume;
    if (audioElRef.current) {
      audioElRef.current.volume = effectiveVol;
    }
    if (synthRef.current) {
      synthRef.current.setVolume(effectiveVol);
    }
  }, [volume, isMuted]);

  // Handle autoPlay trigger when envelope is opened
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      handlePlay();
    }
  }, [autoPlayTrigger]);

  const handlePlay = async () => {
    try {
      if (audioElRef.current) {
        await audioElRef.current.play();
        setIsPlaying(true);
      } else if (synthRef.current) {
        synthRef.current.play();
        setIsPlaying(true);
      }
    } catch {
      // In case browser blocks autoplay without direct interaction or audio fails
      if (synthRef.current) {
        try {
          synthRef.current.play();
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    }
  };

  const handlePause = () => {
    if (audioElRef.current) {
      audioElRef.current.pause();
    }
    if (synthRef.current) {
      synthRef.current.stop();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (audioElRef.current) {
      setCurrentTime(audioElRef.current.currentTime);
      setDuration(audioElRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioElRef.current) {
      audioElRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Upload handling
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await saveCustomAudio(file);
      if (customAudioUrl) {
        URL.revokeObjectURL(customAudioUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setCustomAudioUrl(newUrl);
      setHasCustomTrack(true);
      setShowUploadModal(false);

      if (synthRef.current) {
        synthRef.current.stop();
      }

      setTimeout(() => {
        if (audioElRef.current) {
          audioElRef.current.currentTime = 0;
          audioElRef.current.play().then(() => setIsPlaying(true));
        }
      }, 200);

      showToast("تم حفظ وتفعيل ملف الصوت بنجاح في الموقع 🎶");
    } catch (err) {
      console.error(err);
      showToast("حدث خطأ أثناء حفظ الملف الصوتي");
    }
  };

  const handleResetToDefault = async () => {
    await removeCustomAudio();
    if (customAudioUrl) {
      URL.revokeObjectURL(customAudioUrl);
    }
    setCustomAudioUrl(null);
    setHasCustomTrack(false);
    if (audioElRef.current) {
      audioElRef.current.currentTime = 0;
      audioElRef.current.src = DEFAULT_AUDIO_PATH;
      audioElRef.current.play().then(() => setIsPlaying(true));
    }
    setShowUploadModal(false);
    showToast("تم استعادة الموسيقى المحفوظة الأساسية");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <>
      {/* Permanent HTML5 Audio Element */}
      <audio
        ref={audioElRef}
        src={currentAudioSrc}
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          // If mp3 cannot play for any reason, fallback to web audio synth
          if (isPlaying && synthRef.current) {
            synthRef.current.play();
          }
        }}
      />

      {/* Floating Audio Bar (Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-40 max-w-sm">
        <div
          className={`bg-[#1E1713]/95 backdrop-blur-md text-[#FAF7F2] rounded-2xl border border-[#D4AF37]/60 shadow-2xl p-3 transition-all duration-300 ${
            isExpanded ? "w-80 md:w-88" : "w-auto"
          }`}
        >
          {/* Main Bar */}
          <div className="flex items-center gap-3">
            {/* Spinning Vinyl Record Icon */}
            <div
              onClick={togglePlay}
              className="relative w-12 h-12 rounded-full bg-[#120E0C] border-2 border-[#D4AF37]/80 flex items-center justify-center cursor-pointer shadow-lg flex-shrink-0 group"
            >
              <div
                className={`w-full h-full rounded-full flex items-center justify-center ${
                  isPlaying ? "animate-spin-slow" : ""
                }`}
              >
                {/* Vinyl Grooves */}
                <div className="absolute inset-1 rounded-full border border-[#D4AF37]/20" />
                <div className="absolute inset-2.5 rounded-full border border-[#D4AF37]/20" />
                <div className="w-4 h-4 rounded-full bg-[#A63A50] border border-[#D4AF37] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#120E0C]" />
                </div>
              </div>

              {/* Play/Pause Overlay Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] ml-0.5" />
                )}
              </div>
            </div>

            {/* Song Meta */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1">
                  <span>✓ الموسيقى محفوظة</span>
                </span>
                {isPlaying && (
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-[#D4AF37] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#D4AF37] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[#D4AF37] animate-pulse delay-150" />
                  </div>
                )}
              </div>
              <h4 className="text-xs font-semibold text-[#FFF8ED] truncate">
                {SONG_INFO.title}
              </h4>
              <p className="text-[11px] text-[#C5B3A2] truncate">
                أحمد & جنى · 12/12/2026
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-[#D4AF37] hover:bg-[#E5BE4A] text-[#1E1713] flex items-center justify-center transition-transform hover:scale-105"
                title={isPlaying ? "إيقاف مؤقت" : "تشغيل الموسيقى"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-[#C5B3A2] hover:text-[#FFF8ED] rounded-lg transition-colors"
                title={isExpanded ? "طي المشغل" : "توسيع خيارات الصوت"}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Controls Panel */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-[#D4AF37]/20 space-y-2.5">
              {/* Progress Bar & Time */}
              {duration > 0 && (
                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.5"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full accent-[#D4AF37] h-1.5 bg-[#3B2E26] rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#A69584] font-mono" dir="ltr">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-[#C5B3A2] hover:text-[#D4AF37] transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-full accent-[#D4AF37] h-1.5 bg-[#3B2E26] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#A69584] w-6 text-left">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>

              {/* Action Buttons: Lyrics */}
              <div className="pt-1">
                <button
                  onClick={() => setShowLyricsModal(true)}
                  className="w-full py-2 px-3 rounded-lg bg-[#2E241E] hover:bg-[#3B2E26] text-xs text-[#E8D8C8] flex items-center justify-center gap-1.5 transition-colors border border-[#D4AF37]/30"
                  title="عرض كلمات الأغنية"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>كلمات الأغنية المهداة</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lyrics Modal */}
      {showLyricsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] text-[#2C2623] w-full max-w-lg rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowLyricsModal(false)}
              className="absolute top-4 left-4 p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-semibold text-[#A77C38] tracking-widest uppercase">
                الأغنية المهداة لحفل الزفاف
              </span>
              <h3 className="font-ruqaa text-2xl md:text-3xl text-[#2C2623] mt-1">
                {SONG_INFO.title}
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                أحمد & جنى · 12 ديسمبر 2026
              </p>
            </div>

            <div className="space-y-3 bg-[#F4EDE2] p-5 rounded-xl border border-[#D4AF37]/30 font-amiri text-base md:text-lg text-center leading-relaxed">
              {SONG_INFO.lyrics.map((line, idx) => (
                <p
                  key={idx}
                  className={`py-1 transition-colors ${
                    idx === 4
                      ? "text-[#A63A50] font-bold text-xl scale-105"
                      : "text-stone-800"
                  }`}
                >
                  {line.text}
                </p>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowLyricsModal(false);
                  if (!isPlaying) handlePlay();
                }}
                className="py-2.5 px-6 rounded-full bg-[#1E1713] text-[#D4AF37] font-semibold text-sm hover:bg-stone-900 transition-colors flex items-center gap-2 shadow-md"
              >
                <Play className="w-4 h-4 fill-[#D4AF37]" />
                <span>تشغيل الموسيقى أثناء القراءة</span>
              </button>

              <a
                href={currentAudioSrc}
                download="Wedding_Ahmed_and_Jana_Song.mp3"
                className="py-2.5 px-5 rounded-full border border-[#D4AF37] bg-white text-[#855B1B] font-semibold text-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>تحميل الأغنية MP3</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Upload/Change Custom Audio Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] text-[#2C2623] w-full max-w-md rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 left-4 p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 text-[#A77C38] flex items-center justify-center mx-auto mb-2">
                <FileAudio className="w-6 h-6" />
              </div>
              <h3 className="font-cairo text-lg font-bold text-[#2C2623]">
                إدارة ملف الموسيقى في الويبسايت
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                ملف الموسيقى الحالي محفوظ في مجلد المشروع <code className="bg-stone-200 px-1 rounded">/audio/wedding-song.mp3</code> ويعمل تلقائياً.
              </p>
            </div>

            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-[#D4AF37] hover:border-[#A77C38] rounded-xl bg-[#F8F4EE] hover:bg-[#F2ECE0] transition-colors flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <Music className="w-7 h-7 text-[#A77C38] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-stone-800">
                  رفع ملف صوتي جديد وتثبيته في المتصفح
                </span>
                <span className="text-[11px] text-stone-500">
                  يدعم صيغ MP3, WAV, M4A, OGG
                </span>
              </button>

              {hasCustomTrack && (
                <button
                  onClick={handleResetToDefault}
                  className="w-full py-2 px-3 text-xs text-stone-700 hover:bg-stone-100 rounded-lg transition-colors border border-stone-300 flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استعادة الملف الأساسي المحفوظ في الموقع</span>
                </button>
              )}

              <div className="pt-2">
                <a
                  href={currentAudioSrc}
                  download="Wedding_Ahmed_and_Jana_Song.mp3"
                  className="w-full py-2.5 bg-[#1E1713] text-white hover:bg-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  <span>تحميل الملف الصوتي الحالي إلى هاتفك / جهازك</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1E1713] text-[#FAF7F2] border border-[#D4AF37] py-2.5 px-5 rounded-full shadow-2xl text-xs md:text-sm font-medium flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};
