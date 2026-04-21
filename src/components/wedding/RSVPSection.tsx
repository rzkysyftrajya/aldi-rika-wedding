import { useState, useEffect } from "react";
import { useDirectionalAnimation, useScrollAnimation } from "@/hooks/useScrollAnimation";
import ornamentDivider from "@/assets/ornament-divider.webp";
import { Send, MessageCircle, User, Clock, Heart, Sparkles } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

const STORAGE_KEY = "wedding-wishes";

const getWishes = (): Comment[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
};

const RSVPSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible, getTransform: formT } = useDirectionalAnimation<HTMLFormElement>('left');
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Comment[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { setWishes(getWishes()); }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    const newWish: Comment = { id: Date.now().toString(), name: name.trim(), message: message.trim(), timestamp: Date.now() };
    const updated = [newWish, ...wishes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setWishes(updated);
    setName("");
    setMessage("");
    setTimeout(() => setSubmitting(false), 500);
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-cream" />
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div
          ref={titleRef}
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Sparkles className="w-4 h-4 text-gold/50 mx-auto mb-3" />
          <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-4">Wishes</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Ucapan & Doa</h2>
          <img src={ornamentDivider} alt="" className="w-36 mx-auto mb-4 opacity-35" loading="lazy" width={800} height={512} />
          <p className="text-muted-foreground font-sans text-sm mb-10 max-w-md mx-auto leading-relaxed">
            Berikan ucapan dan doa terbaik untuk kedua mempelai
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="glass-card luxe-border rounded-[1.5rem] p-6 space-y-4 text-left"
          style={{
            opacity: formVisible ? 1 : 0,
            transform: formT(formVisible),
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <input type="text" placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-background/60 border border-border/40 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all duration-300" />
          </div>
          <div className="relative">
            <MessageCircle className="absolute left-4 top-4 w-4 h-4 text-primary/50" />
            <textarea placeholder="Tulis ucapan & doa..." value={message} onChange={(e) => setMessage(e.target.value)} required rows={3}
              className="w-full pl-11 pr-5 py-3.5 rounded-xl bg-background/60 border border-border/40 font-sans text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 resize-none transition-all duration-300" />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full py-3.5 bg-gradient-to-r from-primary via-sage-dark to-primary text-primary-foreground font-sans text-[10px] tracking-[0.3em] uppercase rounded-xl transition-all duration-500 flex items-center justify-center gap-2.5 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] shadow-lg hover:shadow-xl shimmer-btn">
            <Send className="w-3.5 h-3.5" />
            {submitting ? "Mengirim..." : "Kirim Ucapan"}
          </button>
        </form>

        {wishes.length > 0 && (
          <div className="mt-10 space-y-3 text-left max-h-[380px] overflow-y-auto pr-1">
            <p className="text-center text-muted-foreground font-sans text-[10px] tracking-[0.3em] uppercase mb-5">
              <Heart className="w-3 h-3 text-primary inline mr-2" />
              {wishes.length} Ucapan
            </p>
            {wishes.map((w, i) => (
              <WishCard key={w.id} wish={w} index={i} formatTime={formatTime} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const WishCard = ({ wish, index, formatTime }: { wish: Comment; index: number; formatTime: (ts: number) => string }) => {
  const direction = index % 2 === 0 ? 'right' : 'left';
  const { ref, isVisible, getTransform } = useDirectionalAnimation(direction);

  return (
    <div
      ref={ref}
      className="glass-card rounded-xl p-4 hover:scale-[1.01]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(isVisible),
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(index * 0.05, 0.3)}s`,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-sage-light flex items-center justify-center shadow-sm">
            <span className="text-primary font-serif text-xs font-bold">{wish.name.charAt(0).toUpperCase()}</span>
          </div>
          <span className="font-sans text-sm font-medium text-foreground">{wish.name}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground/60">
          <Clock className="w-2.5 h-2.5" />
          <span className="font-sans text-[8px]">{formatTime(wish.timestamp)}</span>
        </div>
      </div>
      <p className="text-muted-foreground font-sans text-sm leading-relaxed pl-[42px]">{wish.message}</p>
    </div>
  );
};

export default RSVPSection;
