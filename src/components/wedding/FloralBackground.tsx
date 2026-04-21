import floralCorner from "@/assets/floral-corner-tl.webp";
import floralBouquet from "@/assets/floral-bouquet.webp";
import scatteredPetals from "@/assets/scattered-petals.webp";

/**
 * Global decorative background layer.
 * Positioned fixed behind all content (z-0) with very low opacity
 * so it never interferes with text or images.
 * Synced across all devices via vw/vh sizing.
 */
const FloralBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* Soft base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-light/30 via-background to-cream/40" />

      {/* Top-left corner floral */}
      <img
        src={floralCorner}
        alt=""
        className="absolute top-0 left-0 w-[40vw] max-w-[280px] opacity-[0.08] mix-blend-multiply"
        style={{ animation: "gentle-sway 14s ease-in-out infinite" }}
      />

      {/* Top-right corner (mirrored) */}
      <img
        src={floralCorner}
        alt=""
        className="absolute top-0 right-0 w-[40vw] max-w-[280px] opacity-[0.08] mix-blend-multiply scale-x-[-1]"
        style={{ animation: "gentle-sway 16s ease-in-out infinite reverse" }}
      />

      {/* Bottom-left bouquet */}
      <img
        src={floralBouquet}
        alt=""
        className="absolute bottom-0 left-0 w-[45vw] max-w-[320px] opacity-[0.07] mix-blend-multiply"
        style={{ animation: "gentle-sway 18s ease-in-out infinite" }}
      />

      {/* Bottom-right bouquet (mirrored) */}
      <img
        src={floralBouquet}
        alt=""
        className="absolute bottom-0 right-0 w-[45vw] max-w-[320px] opacity-[0.07] mix-blend-multiply scale-x-[-1]"
        style={{ animation: "gentle-sway 20s ease-in-out infinite reverse" }}
      />

      {/* Scattered petals tiled — extremely subtle */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${scatteredPetals})`,
          backgroundRepeat: "repeat",
          backgroundSize: "420px 420px",
        }}
      />

      {/* Soft glow orbs to add warmth without clutter */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/[0.04] blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full bg-gold/[0.04] blur-[80px]" />
    </div>
  );
};

export default FloralBackground;
