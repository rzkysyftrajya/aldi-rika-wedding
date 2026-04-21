import floralTop from "@/assets/floral-top.webp";
import floralBottom from "@/assets/floral-bottom.webp";
import floralWreath from "@/assets/floral-wreath.webp";
import bridePhoto from "@/assets/bride.webp";
import groomPhoto from "@/assets/groom.webp";
import { Heart, Sparkles, ChevronDown, Mail } from "lucide-react";
import { useGuestName } from "@/lib/guest";

interface CoverSectionProps {
  onOpen: () => void;
}

const CoverSection = ({ onOpen }: CoverSectionProps) => {
  const guestName = useGuestName();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-light via-background to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--gold)/0.06)_0%,_transparent_50%)]" />

      {/* Drifting petals */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            left: `${8 + i * 11}%`,
            background: i % 2 === 0
              ? `hsl(var(--primary) / ${0.15 + (i % 3) * 0.05})`
              : `hsl(var(--gold) / ${0.12 + (i % 3) * 0.04})`,
            animation: `petal-drift ${9 + i * 1.5}s linear infinite`,
            animationDelay: `${i * 1.2}s`,
          }}
        />
      ))}

      {/* Breathing glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/8 blur-[80px]" style={{ animation: 'breathe 7s ease-in-out infinite' }} />
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-gold/6 blur-[60px]" style={{ animation: 'breathe 5s ease-in-out infinite 2s' }} />

      {/* Top floral */}
      <img src={floralTop} alt="" className="absolute top-0 left-1/2 -translate-x-1/2 w-72 md:w-96 opacity-35 pointer-events-none" style={{ animation: 'gentle-sway 8s ease-in-out infinite' }} width={800} height={512} />

      {/* Main content */}
      <div className="text-center z-10 px-6" style={{ animation: 'reveal-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
        
        {/* Couple photos */}
        <div className="flex items-center justify-center gap-4 mb-6" style={{ animation: 'reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}>
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg" style={{ animation: 'gentle-sway 6s ease-in-out infinite' }}>
            <img src={groomPhoto} alt="Aldi" className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex flex-col items-center">
            <Heart className="w-5 h-5 text-primary animate-heartbeat" />
          </div>
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg" style={{ animation: 'gentle-sway 6s ease-in-out infinite 0.5s' }}>
            <img src={bridePhoto} alt="Ecaa" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* Wreath + names */}
        <div className="relative inline-block mb-2">
          <img src={floralWreath} alt="" className="absolute -inset-8 md:-inset-12 w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] h-auto opacity-25 pointer-events-none" style={{ animation: 'breathe 8s ease-in-out infinite' }} width={512} height={512} />
          <div className="relative">
            <div className="mb-4" style={{ animation: 'reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' }}>
              <Sparkles className="w-4 h-4 text-gold/60 mx-auto mb-3" />
              <p className="text-muted-foreground font-sans text-[10px] tracking-[0.5em] uppercase">The Wedding of</p>
            </div>
            
            <h1 className="font-script text-5xl md:text-7xl text-primary leading-tight mb-1 drop-shadow-sm" style={{ animation: 'reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both' }}>
              Aldi
            </h1>
            <div className="flex items-center justify-center gap-4 my-2" style={{ animation: 'reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both' }}>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <span className="font-serif text-xl text-gold italic">&</span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>
            <h1 className="font-script text-5xl md:text-7xl text-primary leading-tight mb-3 drop-shadow-sm" style={{ animation: 'reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both' }}>
              Ecaa
            </h1>
          </div>
        </div>

        <div style={{ animation: 'reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-8 h-px bg-primary/30" />
            <p className="text-muted-foreground font-sans text-[10px] tracking-[0.4em]">11 · 05 · 2026</p>
            <div className="w-8 h-px bg-primary/30" />
          </div>
          <p className="text-muted-foreground/60 font-sans text-[9px] tracking-[0.3em] uppercase mb-6">Insya Allah</p>

          {/* Guest greeting */}
          <div className="max-w-xs mx-auto mb-6">
            <p className="text-muted-foreground font-sans text-[10px] tracking-[0.3em] uppercase mb-2">Kepada Yth.</p>
            <div className="glass-card luxe-border rounded-2xl px-5 py-3">
              <p className="font-script text-2xl text-primary leading-tight">
                {guestName || "Tamu Undangan"}
              </p>
            </div>
            <p className="text-muted-foreground/70 font-sans text-[9px] mt-3 leading-relaxed italic px-2">
              Mohon kehadiran Anda untuk memberikan doa restu di hari bahagia kami.
            </p>
          </div>
        </div>

        <button
          onClick={onOpen}
          className="group relative px-14 py-4 bg-gradient-to-r from-primary via-sage-dark to-primary text-primary-foreground font-sans text-[10px] tracking-[0.4em] uppercase rounded-full transition-all duration-700 shadow-xl hover:shadow-2xl hover:scale-105 shimmer-btn overflow-hidden"
          style={{ animation: 'reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1s both, pulse-glow 3.5s ease-in-out infinite 2s' }}
        >
          {/* Ripple on hover */}
          <span className="absolute inset-0 rounded-full bg-primary-foreground/10 scale-0 group-hover:scale-100 transition-transform duration-700 origin-center" />
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="w-3.5 h-3.5 opacity-80" />
            Buka Undangan
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </span>
        </button>
      </div>

      {/* Bottom floral */}
      <img src={floralBottom} alt="" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 md:w-[28rem] opacity-40 pointer-events-none" style={{ animation: 'gentle-sway 10s ease-in-out infinite 1s' }} loading="lazy" width={800} height={512} />
    </div>
  );
};

export default CoverSection;
