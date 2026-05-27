import { useDirectionalAnimation } from "@/hooks/useScrollAnimation";
import floralBouquet from "@/assets/floral-bouquet.webp";
import ornamentDivider from "@/assets/ornament-divider.png";
import { Heart, Sparkles } from "lucide-react";


const CoupleSection = () => {
  const { ref: groomRef, isVisible: groomVisible, getTransform: groomT } = useDirectionalAnimation('left');
  const { ref: brideRef, isVisible: brideVisible, getTransform: brideT } = useDirectionalAnimation('right');
  const { ref: titleRef, isVisible: titleVisible } = useDirectionalAnimation('up');

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-cream" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          ref={titleRef}
          className="mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Sparkles className="w-4 h-4 text-gold/50 mx-auto mb-3" />
          <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-3">Bride & Groom</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Mempelai</h2>
          <div className="ornament-line"><Heart className="w-3 h-3 text-primary" /></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Groom */}
          <div
            ref={groomRef}
            className="flex flex-col items-center"
            style={{
              opacity: groomVisible ? 1 : 0,
              transform: groomT(groomVisible),
              transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            <div className="glass-card luxe-border rounded-[2rem] p-6 pb-8 w-full max-w-[280px] group relative overflow-hidden">
              {/* Secondary main photo halo */}
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gold/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-14 w-36 h-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />


              <div className="relative mb-6 mx-auto w-fit">
                <div className="absolute inset-0 rounded-full ring-pulse" />
                <div className="w-40 h-40 rounded-full overflow-hidden border-[3px] border-primary/25 shadow-xl mx-auto transition-all duration-700 group-hover:border-gold/60 group-hover:shadow-2xl group-hover:scale-105 relative">
                  <img
                    src="galeri/galeri-10.webp"
                    alt="Muhammad Aldi Siagian"
                    className="w-full h-full object-cover object-center transition-transform duration-[1.2s] group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <img src={floralBouquet} alt="" className="absolute -bottom-2 -right-2 w-14 opacity-40 rotate-12 pointer-events-none transition-all duration-500 group-hover:opacity-70 group-hover:rotate-[18deg]" loading="lazy" width={512} height={512} />

                <div className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-gold/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
                  <Heart className="w-3 h-3 text-primary" />
                </div>
              </div>
              <h3 className="font-script text-2xl md:text-3xl text-primary mb-2 drop-shadow-sm">Muhammad Aldi Siagian</h3>
              <div className="hairline-divider w-24 mx-auto mb-3" />
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                Putra dari<br />
                <span className="text-foreground font-medium">Bapak Hariman Siagian</span><br />
                & <span className="text-foreground font-medium">Ibu Anis Wati Lubis</span>
              </p>
            </div>
          </div>

          {/* Bride */}
          <div
            ref={brideRef}
            className="flex flex-col items-center"
            style={{
              opacity: brideVisible ? 1 : 0,
              transform: brideT(brideVisible),
              transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
            }}
          >
            <div className="glass-card luxe-border rounded-[2rem] p-6 pb-8 w-full max-w-[280px] group">
              <div className="relative mb-6 mx-auto w-fit">
                <div className="absolute inset-0 rounded-full ring-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="w-44 h-44 rounded-full overflow-hidden border-[3px] border-primary/25 shadow-xl mx-auto transition-all duration-700 group-hover:border-gold/60 group-hover:shadow-2xl group-hover:scale-105 relative">
                  <img
                    src="/foto-mempelai-wanita.webp"
                    alt="Rikaerscaa"
                    className="w-full h-full object-cover object-center transition-transform duration-[1.2s] group-hover:scale-110"
                    loading="lazy"
                  />

                </div>
                <img src={floralBouquet} alt="" className="absolute -bottom-2 -left-2 w-14 opacity-40 -rotate-12 scale-x-[-1] pointer-events-none transition-all duration-500 group-hover:opacity-70 group-hover:-rotate-[18deg]" loading="lazy" width={512} height={512} />
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-gold/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
                  <Heart className="w-3 h-3 text-primary" />
                </div>
              </div>
              <h3 className="font-script text-2xl md:text-3xl text-primary mb-2 drop-shadow-sm">Rikaerscaa</h3>
              <div className="hairline-divider w-24 mx-auto mb-3" />
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                Putri dari<br />
                <span className="text-foreground font-medium">Bapak Sutrimo</span><br />
                & <span className="text-foreground font-medium">Ibu Legini</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
