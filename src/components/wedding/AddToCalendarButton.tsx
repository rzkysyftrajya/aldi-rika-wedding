import { useState, useRef, useEffect } from "react";
import { CalendarPlus, Apple, Check } from "lucide-react";
import { buildGoogleCalendarUrl, downloadIcs, type CalendarEvent } from "@/lib/calendar";

interface AddToCalendarButtonProps {
  event: CalendarEvent;
  label?: string;
  filename?: string;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
    <path fill="#4285F4" d="M22.5 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.22-4.74 3.22-8.09Z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.05-3.72 1.05-2.86 0-5.28-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
    <path fill="#FBBC05" d="M5.85 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.35-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.67-2.84Z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.67 2.84C6.72 7.31 9.14 5.38 12 5.38Z"/>
  </svg>
);

const AddToCalendarButton = ({ event, label = "Add to Calendar", filename = "event.ics" }: AddToCalendarButtonProps) => {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleApple = () => {
    downloadIcs(event, filename);
    setSaved(true);
    setOpen(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold/90 to-gold text-foreground font-sans text-[10px] tracking-[0.2em] uppercase shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gold/30"
      >
        {saved ? <Check className="w-3.5 h-3.5" /> : <CalendarPlus className="w-3.5 h-3.5" />}
        {saved ? "Tersimpan" : label}
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 z-30 glass-card luxe-border rounded-2xl p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/[0.06] transition-colors text-left"
          >
            <GoogleIcon />
            <div className="flex flex-col">
              <span className="text-foreground text-xs font-medium">Google Calendar</span>
              <span className="text-muted-foreground text-[9px] tracking-wider uppercase">Buka di tab baru</span>
            </div>
          </a>
          <button
            onClick={handleApple}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/[0.06] transition-colors text-left"
          >
            <Apple className="w-3.5 h-3.5 text-foreground" />
            <div className="flex flex-col">
              <span className="text-foreground text-xs font-medium">Apple Calendar</span>
              <span className="text-muted-foreground text-[9px] tracking-wider uppercase">Unduh .ics</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToCalendarButton;
