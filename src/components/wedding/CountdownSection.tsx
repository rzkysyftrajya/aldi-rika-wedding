import { useEffect, useState } from "react";
import { useDirectionalAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, Sparkles } from "lucide-react";
import ornamentDivider from "@/assets/ornament-divider.webp";

const AKAD_DATE = new Date("2026-05-11T08:00:00+07:00").getTime();
const RESEPSI_DATE = new Date("2026-05-30T08:00:00+07:00").getTime();

const useCountdown = (target: number) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="glass-card luxe-border rounded-2xl p-3 md:p-4 text-center group hover:scale-105 hover:-translate-y-0.5 transition-all duration-500">
    <span className="font-serif text-2xl md:text-3xl text-foreground block group-hover:text-primary transition-colors duration-300 tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-muted-foreground font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase mt-1 block">
      {label}
    </span>
  </div>
);

const CountdownSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: akadRef, isVisible: akadVisible, getTransform: akadT } = useDirectionalAnimation('left');
  const { ref: resepsiRef, isVisible: resepsiVisible, getTransform: resepsiT } = useDirectionalAnimation('right');
  const akadTime = useCountdown(AKAD_DATE);
  const resepsiTime = useCountdown(RESEPSI_DATE);
  const unitLabels = ["Hari", "Jam", "Menit", "Detik"];

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-primary/[0.07] to-primary/[0.04]" />
      
      {/* Decorative rings */}
      <div className="absolute top-16 left-8 w-20 h-20 border border-primary/[0.07] rounded-full" />
      <div className="absolute bottom-16 right-8 w-28 h-28 border border-primary/[0.07] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/[0.04] rounded-full blur-[100px]" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div
          ref={titleRef}
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Sparkles className="w-4 h-4 text-gold/50 mx-auto mb-3" />
          <Heart className="w-5 h-5 text-primary mx-auto mb-4 animate-heartbeat" />
          <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-4">Counting Down To</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Hari Bahagia</h2>
          <img src={ornamentDivider} alt="" className="w-36 mx-auto mb-12 opacity-35" loading="lazy" width={800} height={512} />
        </div>

        {/* Akad */}
        <div
          ref={akadRef}
          className="glass-card rounded-[1.5rem] p-6 md:p-8 mb-6"
          style={{
            opacity: akadVisible ? 1 : 0,
            transform: akadT(akadVisible),
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <p className="font-script text-2xl text-primary mb-1">Akad Nikah</p>
          <p className="text-muted-foreground font-sans text-[10px] mb-5 tracking-[0.3em] uppercase">Senin, 11 Mei 2026</p>
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
            {[akadTime.days, akadTime.hours, akadTime.minutes, akadTime.seconds].map((val, i) => (
              <CountdownUnit key={`a-${i}`} value={val} label={unitLabels[i]} />
            ))}
          </div>
        </div>

        <div className="hairline-divider max-w-[180px] mx-auto my-8" />

        {/* Resepsi */}
        <div
          ref={resepsiRef}
          className="glass-card rounded-[1.5rem] p-6 md:p-8"
          style={{
            opacity: resepsiVisible ? 1 : 0,
            transform: resepsiT(resepsiVisible),
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <p className="font-script text-2xl text-primary mb-1">Resepsi Pernikahan</p>
          <p className="text-muted-foreground font-sans text-[10px] mb-5 tracking-[0.3em] uppercase">Sabtu, 30 Mei 2025</p>
          <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
            {[resepsiTime.days, resepsiTime.hours, resepsiTime.minutes, resepsiTime.seconds].map((val, i) => (
              <CountdownUnit key={`r-${i}`} value={val} label={unitLabels[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
