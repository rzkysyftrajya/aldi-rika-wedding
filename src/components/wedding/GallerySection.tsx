import { useDirectionalAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";
import ornamentDivider from "@/assets/ornament-divider.webp";
import { Camera, Heart, Sparkles } from "lucide-react";

const placeholders = [
  // Story layout (no akad emphasis): highlight wedding moments first
  { span: "col-span-2 row-span-2", photo: "/galeri/galeri-10.webp", label: "Mempelai Pria" },
  { span: "", photo: "/foto-kedua-mempelai(2).webp", label: "Kedua Mempelai" },
  { span: "", photo: "/foto-mempelai-wanita.webp", label: "Mempelai Wanita" },

  // Pre-wedding / formal moments
  { span: "", photo: "/galeri/galeri-1.webp", label: "Pre-wedding" },
  { span: "col-span-2", photo: "/galeri/galeri-2.webp", label: "Formal Moment" },
  { span: "", photo: "/galeri/galeri-3.webp", label: "Our Memories" },

  // Blessing / celebration (still using your existing set)
  { span: "", photo: "/galeri/galeri-4.webp", label: "Blessing" },
  { span: "", photo: "/galeri/galeri-6.webp", label: "Wedding Day" },
  { span: "col-span-2", photo: "/galeri/galeri-5.webp", label: "Celebration" },
];


const GallerySection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-cream/30 to-cream" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/[0.04] rounded-full blur-[80px]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          ref={titleRef}
          style={{
        opacity: titleVisible ? 1 : 0,
        transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Sparkles className="w-4 h-4 text-gold/50 mx-auto mb-3" />
      <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-4">Our Moments</p>
      <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Galeri Foto</h2>
      <img src={ornamentDivider} alt="" className="w-36 mx-auto mb-12 opacity-35" loading="lazy" width={800} height={512} />
    </div>

        <div className="space-y-8">
          <div className="columns-2 md:columns-3 gap-4">
            {placeholders.slice(0, 4).map((item, i) => (
              <GalleryItem key={`a-${i}`} item={item} index={i} />
            ))}
          </div>
          <div className="columns-2 md:columns-3 gap-4 -ml-4 md:-ml-6">
            {placeholders.slice(4, 8).map((item, i) => (
              <GalleryItem key={`b-${i}`} item={item} index={i + 4} />
            ))}
          </div>
          <div className="columns-2 md:columns-3 gap-4">
            {placeholders.slice(8).map((item, i) => (
              <GalleryItem key={`c-${i}`} item={item} index={i + 8} />
            ))}
          </div>
        </div>
  </div>
</section>
  );
};

const GalleryItem = ({ item, index }: { item: typeof placeholders[0]; index: number }) => {
  const direction = index % 2 === 0 ? 'left' : 'right';
  const { ref, isVisible, getTransform } = useDirectionalAnimation(direction);

  return (
    <div
      ref={ref}
      className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer relative border border-border/15 mb-4 transition-all duration-500 hover:mb-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(isVisible),
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
      }}
    >
      {item.photo ? (
        <>
          <img src={item.photo} alt={item.label} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span className="font-sans text-[9px] tracking-wider uppercase text-primary-foreground/90">{item.label}</span>
          </div>
        </>
      ) : (
        <div className="w-full aspect-[4/3] bg-gradient-to-br from-sage-light/60 to-cream flex items-center justify-center group-hover:from-sage-light/80 transition-all duration-500">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/30 group-hover:text-primary/50 transition-all duration-500 group-hover:scale-110">
            <Camera className="w-5 h-5" />
            <span className="font-sans text-[8px] tracking-wider uppercase">{item.label}</span>
          </div>
        </div>
      )}
      {index === 0 && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Heart className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
    </div>
  );
};

export default GallerySection;
