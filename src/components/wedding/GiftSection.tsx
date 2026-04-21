import { useState } from "react";
import { useDirectionalAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Copy, Check, Gift, CreditCard, Sparkles } from "lucide-react";
import ornamentDivider from "@/assets/ornament-divider.webp";

const accounts = [
  { bank: "Bank BCA", number: "1234567890", name: "Muhammad Aldi Siagian" },
  { bank: "Bank Mandiri", number: "0987654321", name: "Rikaerscaa" },
];

const GiftSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [copied, setCopied] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-cream" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/[0.04] rounded-full blur-[100px]" />
      
      <div className="max-w-lg mx-auto text-center relative z-10">
        <div
          ref={titleRef}
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Sparkles className="w-4 h-4 text-gold/50 mx-auto mb-3" />
          <Gift className="w-7 h-7 text-primary mx-auto mb-4" />
          <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-4">Wedding Gift</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Amplop Digital</h2>
          <img src={ornamentDivider} alt="" className="w-36 mx-auto mb-4 opacity-35" loading="lazy" width={800} height={512} />
          <p className="text-muted-foreground font-sans text-sm mb-10 max-w-sm mx-auto leading-relaxed">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital.
          </p>
        </div>

        <div className="space-y-4">
          {accounts.map((acc, i) => (
            <GiftCard key={i} account={acc} index={i} copied={copied === i} onCopy={() => copyToClipboard(acc.number, i)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const GiftCard = ({ account, index, copied, onCopy }: { account: typeof accounts[0]; index: number; copied: boolean; onCopy: () => void }) => {
  const direction = index === 0 ? 'left' : 'right';
  const { ref, isVisible, getTransform } = useDirectionalAnimation(direction);

  return (
    <div
      ref={ref}
      className="glass-card luxe-border rounded-2xl p-6 text-left group hover:-translate-y-0.5"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(isVisible),
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-sage-light flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-105">
          <CreditCard className="w-4.5 h-4.5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[10px] text-primary font-medium tracking-[0.2em] uppercase mb-1">{account.bank}</p>
          <p className="font-serif text-lg text-foreground mb-0.5 tracking-wide tabular-nums">{account.number}</p>
          <p className="font-sans text-xs text-muted-foreground">a.n. {account.name}</p>
        </div>
      </div>
      <button
        onClick={onCopy}
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-400 ${
          copied ? "bg-primary/20 text-primary scale-[0.98]" : "bg-primary/[0.06] text-primary hover:bg-primary/[0.12] hover:scale-[1.01]"
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Tersalin!" : "Salin No. Rekening"}
      </button>
    </div>
  );
};

export default GiftSection;
