import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ornamentDivider from "@/assets/ornament-divider.webp";
import { Sparkles, Quote } from "lucide-react";

const quotes = [
  {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
    source: "QS. Ar-Rum: 21",
  },
  {
    text: "Cinta sejati bukan tentang menemukan seseorang yang sempurna, tetapi tentang melihat seseorang dengan sempurna.",
    source: "Sam Keen",
  },
  {
    text: "Pernikahan adalah dua jiwa yang berjanji untuk tumbuh bersama, saling menguatkan dalam setiap langkah kehidupan.",
    source: "Anonim",
  },
  {
    text: "Dialah yang menjadikan kamu berpasang-pasangan, agar kamu merasa tenang kepadanya.",
    source: "QS. Al-A'raf: 189",
  },
];

const QuotesSection = () => {
  // Quotes section tidak dipakai (data tidak digunakan), jadi dirender kosong agar tidak mengganggu layout.
  return null;

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [active, setActive] = useState(0);


  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Soft local accent only — global florals live in FloralBackground */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/[0.04] rounded-full blur-[100px]" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div
          ref={titleRef}
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Sparkles className="w-4 h-4 text-gold/50 mx-auto mb-3" />
          <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-4">
            Words of Love
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Pesan Cinta
          </h2>
          <img
            src={ornamentDivider}
            alt=""
            className="w-36 mx-auto mb-12 opacity-35"
            loading="lazy"
            width={800}
            height={512}
          />
        </div>

        {/* Quote stage */}
        <div
          className="relative glass-card luxe-border rounded-3xl px-8 py-14 md:px-14 md:py-16 min-h-[280px] flex items-center justify-center overflow-hidden"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(40px)",
            transition: "all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/15" />
          <Quote className="absolute bottom-6 right-6 w-8 h-8 text-primary/15 scale-x-[-1] scale-y-[-1]" />

          {quotes.map((q, i) => (
            <div
              key={i}
              className="absolute inset-0 px-8 md:px-14 flex flex-col items-center justify-center"
              style={{
                opacity: active === i ? 1 : 0,
                transform:
                  active === i
                    ? "translateY(0) scale(1)"
                    : "translateY(20px) scale(0.98)",
                transition: "all 1.1s cubic-bezier(0.16, 1, 0.3, 1)",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <p className="font-serif italic text-base md:text-lg text-foreground/85 leading-[1.9] mb-6">
                "{q.text}"
              </p>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-primary/40" />
                <p className="text-primary/70 font-sans text-[10px] tracking-[0.35em] uppercase">
                  {q.source}
                </p>
                <span className="w-8 h-px bg-primary/40" />
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Quote ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: active === i ? 28 : 8,
                background:
                  active === i
                    ? "hsl(var(--primary) / 0.7)"
                    : "hsl(var(--primary) / 0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
