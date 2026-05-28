import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Plus, Trash2, MessageCircle, Download, Sparkles, ArrowLeft } from "lucide-react";
import { buildInvitationUrl } from "@/lib/guest";

const DEFAULT_GUESTS = [
  // List 1 (18.55, 28/4/2026)
  "riska & partner",
  "tika & suami",
  "aldino & partner",
  "yoga & partner",
  "junita & partner",
  "nazwa & partner",
  "aulia & gusti",
  "dwiki & partner",
  "dwi & suami",
  "agus & partner",
  "ridho & partner",
  "tia & suami",
  "chintiya & partner",
  "muliani & partner",
  "amel & partner",
  "nazwa olivia & partner",
  "irsyad & istri",
  "naina azahra",
  "alex & jesica",
  "said agil & partner",
  // List 2
  "lili & partner",
  "rendi & partner",
  "dia novianti & partner",
  "tiara nabila & partner",
  "zilla & partner",
  "dwi & partner",
  "della & partner",
  "aisyah & partner",
  "amoy & partner",
  "alifia & partner",
  "aulia & partner",
  "nadia & suami",
  "nadia putri & partner",
  "nazwa & partner",
  "sasi & suami",
  "iqbal & partner",
  "sofianti & partner",
  "zamik & partner",
  "arfan & partner",
  "habibi & partner",
  "sevyka & partner",
  "novita & partner",
  "andika & partner",
  "tegar & partner",
  "sahrul & partner",
  "aref & partner",
  "bayu & partner",
  "akbar & partner",
  // List 3 (18.55, 28/4/2026)
  "hanis & partner",
  "viona & partner",
  "zora & partner",
  "efri & partner",
  "slebew & partner",
  "kak nurul & partner",
  "alya & suami",
  "rama & bg diki",
  "jihan & partner",
  "sasa & suami",
  "sabrina & partner",
  "dek cindy & partner",
  "safa & partner",
  "nurul hasanah & partner",
  "khairani & suami",
  "finkan & partner",
  "dilla & partner",
  "ridho asa & partner",
  "bagus & partner",
  "nayla & partner",
  "nazwa aqillah & partner",
  "reza & partner",
  "lanteng & partner",
  "loleng & partner",
  "buk inur & suami",
  "cindy amanda & partner",
  "kak lilis j mode & partner",
  // Additional Guests
"MAMANK FAMILY",
"Aditya Rafly",
"Indra",
"Agum Ridho prananda",
"Didi ahmad fazli",
"Ali zidan",
"diva maturi",
"Ella Wahyuni",
"Feby",
"Adriani sinaga",
"Afrian Pradipta",
"Tunismen",
"Rendy",
"baginda",
"Azizan",
"Imam",
"Rangga",
"Dinda",
"Nabila Safitri",
"Praza akbar",
"Rifky",
"Oka",
"Andika",
"Zidan",
"Khairunisa",
"Nazwa",
"Era",
"Nahya",
"Febiola",
"Amanda",
"Karina",

// List Tambahan Aldi
"alex",
"fery",
"kenzo",
"cupung",
"pakde",
"samuel sgn",
"bg radit",
"riski pohan",
"caca",
"arya lubis",
"bg faiz",
"raden",
"ropek",
"bg rangga momon",
"gomble",
"ahmad hafis",
"reyhan",
"tara sng",
"rehan harahap",
"bagus trihafiz",
"tegar",
"dony lesmana",
"black",
"naufal",
"bagus kara",
"nafa rzky",
"bg rahman",
"imam harahap",
"rivaldo",
"agus",
"tama",
"rafly adek",
"gabe",
"ain",
"dio",
"atas halomoan",
"raja bangga harahap",
"habib",
"jhon",
"vina pane",
"bg otoy",
"oka angga",
"fahrozi",
"fadli",
"sawal",
"natan",
"izy",
"bg ega prayoga",
"bg ryan",
"ryan gendut",
"ahmad syukri pohan",
"rizky pohan",
"nurul hasana & partner",
"nayla & partner",
"aldino & partner",
];

const InvitationGenerator = () => {
  const [guests, setGuests] = useState<string[]>(DEFAULT_GUESTS);
  const [newGuest, setNewGuest] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [baseUrl, setBaseUrl] = useState<string>(
    typeof window !== "undefined" ? `${window.location.origin}/` : ""
  );

  const links = useMemo(
    () => guests.map((g) => ({ name: g, url: buildInvitationUrl(g, baseUrl) })),
    [guests, baseUrl]
  );

  const normalizeGuest = (name: string) => {
    const v = name.trim();
    if (!v) return v;
    // Jika sudah mengandung '&' (mis. "tika & suami"), biarkan.
    if (v.includes("&")) return v;
    // Jika sudah merupakan nama keluarga semuanya (ALL CAPS), biarkan.
    if (v === v.toUpperCase() && v.replace(/[^A-Z]/g, "").length >= 2) return v;
    return `${v} & partner`;
  };

  const addGuest = () => {
    const v = normalizeGuest(newGuest);
    if (!v) return;
    setGuests((g) => [...g, v]);
    setNewGuest("");
  };

  const removeGuest = (i: number) => setGuests((g) => g.filter((_, idx) => idx !== i));

  const copyLink = async (url: string, i: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIdx(i);
      setTimeout(() => setCopiedIdx(null), 1800);
    } catch {
      // ignore
    }
  };

  const waMessage = (name: string, url: string) =>
    `*Walimatul 'Urs*\n\nAssalamu'alaikum Warahmatullahi Wabarakatuh\n\nKepada Yth.\n*${name}*\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:\n\n*Muhammad Aldi Siagian*\n&\n*Rikaerscaa*\n\nBerikut link undangan kami, untuk info lengkap dari acara bisa kunjungi:\n${url}\n\nMerupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh\n\nHormat Kami,\nKedua Mempelai`;

  const sendWA = (name: string, url: string) => {
    const text = encodeURIComponent(waMessage(name, url));
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const exportCsv = () => {
    const rows = [["Nama Tamu", "Link Undangan"], ...links.map((l) => [l.name, l.url])];
    const csv = rows
      .map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "undangan-tamu.csv";
    a.click();
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-b from-cream/40 via-background to-sage-light/30">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-xs tracking-wider uppercase mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Undangan
        </Link>

        <div className="text-center mb-10">
          <Sparkles className="w-5 h-5 text-gold mx-auto mb-3" />
          <p className="text-primary font-sans text-[10px] tracking-[0.5em] uppercase mb-3">Admin · Mempelai</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">Generator Link Undangan</h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            Buat link personal untuk setiap tamu. Nama mereka akan muncul otomatis di halaman undangan.
          </p>
        </div>

        {/* Base URL */}
        <div className="glass-card luxe-border rounded-2xl p-5 mb-6">
          <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Base URL Undangan
          </label>
          <input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="w-full bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="https://undangan-aldi-ecaa.com/"
          />
        </div>

        {/* Add guest */}
        <div className="glass-card luxe-border rounded-2xl p-5 mb-6">
          <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Tambah Nama Tamu
          </label>
          <div className="flex gap-2">
            <input
              value={newGuest}
              onChange={(e) => setNewGuest(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addGuest()}
              className="flex-1 bg-background/50 border border-border/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="cth. Bapak/Ibu Surya Sekeluarga"
            />
            <button
              onClick={addGuest}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Tambah
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground text-xs">
            <span className="text-foreground font-semibold">{links.length}</span> tamu siap dikirim
          </p>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 text-foreground text-xs hover:bg-primary/[0.06] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>

        {/* Guest list */}
        <div className="space-y-3">
          {links.map((l, i) => (
            <div
              key={`${l.name}-${i}`}
              className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 group hover:shadow-md transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <p className="font-sans text-base text-foreground truncate tracking-[0.01em]">{l.name}</p>
                <p className="text-muted-foreground text-[11px] truncate font-sans mt-0.5">{l.url}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => copyLink(l.url, i)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-[10px] tracking-wider uppercase hover:bg-primary/20 transition-colors"
                  title="Salin link"
                >
                  {copiedIdx === i ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedIdx === i ? "Disalin" : "Salin"}
                </button>
                <button
                  onClick={() => sendWA(l.name, l.url)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366]/15 text-[#128C7E] text-[10px] tracking-wider uppercase hover:bg-[#25D366]/25 transition-colors"
                  title="Kirim via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
                <button
                  onClick={() => removeGuest(i)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {links.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Belum ada tamu. Tambahkan nama di atas.
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-[10px] text-muted-foreground/70 tracking-wider">
          Tip: Buka <span className="font-mono text-foreground">{baseUrl}?to=NamaTamu</span> untuk preview.
        </div>
      </div>
    </div>
  );
};

export default InvitationGenerator;
