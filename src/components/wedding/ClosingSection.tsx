import floralWreath from "@/assets/floral-wreath.webp";
import ornamentDivider from "@/assets/ornament-divider.webp";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Sparkles } from "lucide-react";

const ClosingSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cream/30 to-cream" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className={`max-w-lg mx-auto text-center z-10 relative transition-all duration-[1.2s] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <Sparkles className="w-4 h-4 text-gold/50 mx-auto mb-3" />
        <Heart className="w-6 h-6 text-primary mx-auto mb-6 animate-heartbeat" />
        <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-6">Thank You</p>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Terima Kasih</h2>
        <img src={ornamentDivider} alt="" className="w-36 mx-auto mb-6 opacity-35" loading="lazy" width={800} height={512} />
        <p className="text-muted-foreground font-sans text-sm leading-[1.9] mb-10 max-w-sm mx-auto">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
        </p>

        {/* Quote card with wreath */}
        <div className="relative inline-block mb-10">
          <img src={floralWreath} alt="" className="absolute -inset-8 w-[calc(100%+4rem)] h-auto opacity-18 pointer-events-none" style={{ animation: 'breathe 10s ease-in-out infinite' }} loading="lazy" width={512} height={512} />
          <div className="glass-card luxe-border rounded-2xl p-10 relative">
            <p className="font-serif text-xl text-foreground italic mb-4 leading-relaxed">
              "Mawaddah Wa Rahmah"
            </p>
            <div className="hairline-divider w-32 mx-auto mb-4" />
            <p className="font-script text-3xl text-primary">
              Aldi & Ecaa
            </p>
          </div>
        </div>

        <p className="text-muted-foreground/40 font-sans text-[10px] tracking-[0.4em] uppercase">
          #AldiDanEcaa
        </p>
      </div>

    </section>
  );
};

export default ClosingSection;
