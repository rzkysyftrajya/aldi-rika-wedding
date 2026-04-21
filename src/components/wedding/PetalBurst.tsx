import { useEffect, useState } from "react";

interface PetalBurstProps {
  onComplete?: () => void;
  duration?: number;
}

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  drift: number;
  color: string;
  shape: number;
}

const PetalBurst = ({ onComplete, duration = 4500 }: PetalBurstProps) => {
  const [petals] = useState<Petal[]>(() => {
    const colors = [
      "hsl(var(--primary) / 0.85)",
      "hsl(var(--primary) / 0.7)",
      "hsl(var(--gold) / 0.75)",
      "hsl(var(--sage-light))",
      "hsl(var(--cream-dark))",
      "hsl(38 70% 75% / 0.8)",
      "hsl(99 40% 70% / 0.8)",
    ];
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 3 + Math.random() * 2.5,
      size: 10 + Math.random() * 18,
      rotation: Math.random() * 720 - 360,
      drift: (Math.random() - 0.5) * 200,
      color: colors[i % colors.length],
      shape: i % 3,
    }));
  });

  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(t);
  }, [onComplete, duration]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute -top-10 block"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            background: `radial-gradient(ellipse at 30% 30%, ${p.color}, transparent 70%)`,
            borderRadius: p.shape === 0
              ? "50% 10% 50% 10%"
              : p.shape === 1
                ? "10% 50% 10% 50%"
                : "50% 50% 50% 50% / 60% 60% 40% 40%",
            filter: "blur(0.3px) drop-shadow(0 2px 3px hsl(var(--primary) / 0.15))",
            // @ts-expect-error CSS custom props
            "--drift": `${p.drift}px`,
            "--rot": `${p.rotation}deg`,
            animation: `petal-fall ${p.duration}s cubic-bezier(0.35, 0, 0.45, 1) ${p.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default PetalBurst;
