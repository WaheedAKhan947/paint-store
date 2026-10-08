"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { generalMessage, waLink } from "@/lib/data";
import ProductVisual from "./ProductVisual";
import { ShinyButton, WhatsAppIcon } from "./ui";

export const heroShades = [
  { n: "Coral Red", c: "#e8473b" }, { n: "Sunny Yellow", c: "#f2b632" }, { n: "Sage Green", c: "#7da07a" },
  { n: "Ocean Blue", c: "#3b78c4" }, { n: "Lavender", c: "#9b86c9" }, { n: "Warm Sand", c: "#d6b98c" },
];
const words = ["every wall", "every door", "every season", "every home"];

export default function Hero() {
  const [shade, setShade] = useState(heroShades[0]);
  const [auto, setAuto] = useState(true);
  const [word, setWord] = useState(0);
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 700], [0, 90]);
  const textY = useTransform(scrollY, [0, 700], [0, 40]);

  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setShade((s) => heroShades[(heroShades.indexOf(s) + 1) % heroShades.length]), 3000);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <section id="top" className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:pt-28">
      <motion.div style={{ y: textY }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="eyebrow">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-whatsapp" /><span className="relative h-2 w-2 rounded-full bg-whatsapp" /></span>
          Authorised Brighto dealer · Swabi
        </motion.div>

        <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl xl:text-7xl">
          {["Premium", "paints", "for"].map((w, i) => (
            <span key={w} className="inline-block overflow-hidden align-bottom">
              <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span>
            </span>
          ))}
          <span className="relative block h-[1.1em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span key={words[word]} className="text-paint absolute left-0 whitespace-nowrap"
                initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                {words[word]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-6 max-w-lg text-lg text-neutral-600">
          Emulsions, weatherproof exteriors, enamels and pro tools at wholesale prices. Pick your product, choose a shade and send your order on WhatsApp in one tap.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-8 flex flex-wrap gap-3">
          <ShinyButton href={waLink(generalMessage)} variant="whatsapp" external icon={<WhatsAppIcon className="relative z-10 h-5 w-5" />}>Order on WhatsApp</ShinyButton>
          <ShinyButton href="#products" variant="outline">Browse products</ShinyButton>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">{heroShades.slice(0, 4).map((s) => <span key={s.n} className="h-8 w-8 rounded-full border-2 border-cream" style={{ background: s.c }} />)}</div>
            <div className="text-sm leading-tight"><b className="block text-navy">★ 5.0 on Google</b><span className="text-neutral-500">Trusted in Swabi</span></div>
          </div>
          <div className="h-8 w-px bg-navy/10" />
          <div className="text-sm leading-tight"><b className="block text-navy">Wholesale rates</b><span className="text-neutral-500">For homes & contractors</span></div>
        </motion.div>
      </motion.div>

      {/* Interactive room scene */}
      <motion.div style={{ y: sceneY }} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative">
        <div className="absolute -inset-6 -z-10 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#e8473b33,#f2b63233,#7da07a33,#3b78c433,#9b86c933,#e8473b33)] blur-3xl" />
        <div className="relative aspect-[1/1.02] overflow-hidden rounded-[2.5rem] border-[6px] border-white shadow-2xl" style={{ background: shade.c, transition: "background .8s cubic-bezier(.22,1,.36,1)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,.45),transparent_55%)]" />
          {/* window */}
          <div className="absolute left-[12%] top-[12%] h-[30%] w-[30%] overflow-hidden rounded-xl border-[6px] border-white/90 bg-gradient-to-b from-sky-200 to-sky-50">
            <div className="absolute inset-x-0 top-1/2 h-[5px] -translate-y-1/2 bg-white/90" /><div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2 bg-white/90" />
            <div className="absolute -right-4 bottom-2 h-10 w-16 rounded-full bg-emerald-300/70" />
          </div>
          {/* frame art */}
          <div className="absolute right-[14%] top-[14%] grid h-[22%] w-[18%] place-items-center rounded-md border-4 border-gold bg-white/90">
            <div className="h-1/2 w-1/2 rounded-full" style={{ background: `conic-gradient(${heroShades.map((s) => s.c).join(",")})` }} />
          </div>
          {/* lamp */}
          <div className="absolute right-[10%] top-[44%] h-[22%] w-[2px] bg-navy/40" />
          <div className="absolute right-[6.5%] top-[40%] h-[7%] w-[9%] rounded-t-full bg-white/90 shadow-[0_20px_40px_10px_rgba(255,240,200,.5)]" />
          {/* floor */}
          <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-b from-[#c9a37a] to-[#a8835b]" />
          {/* sofa */}
          <div className="absolute bottom-[16%] left-[10%] h-[22%] w-[58%]">
            <div className="absolute inset-x-[6%] top-0 h-[60%] rounded-t-3xl bg-navy" />
            <div className="absolute inset-x-0 bottom-[12%] h-[48%] rounded-2xl bg-navy-700" />
            <div className="absolute left-[18%] top-[18%] h-[34%] w-[20%] rotate-[-8deg] rounded-xl bg-gold" />
            <div className="absolute bottom-0 left-[6%] h-[14%] w-[4%] bg-navy-950" /><div className="absolute bottom-0 right-[6%] h-[14%] w-[4%] bg-navy-950" />
          </div>
          {/* plant */}
          <div className="absolute bottom-[16%] right-[14%] h-[10%] w-[10%] rounded-b-xl bg-white" />
          <div className="absolute bottom-[25%] right-[11%] h-[16%] w-[16%] rounded-full bg-emerald-700/80" />

          <AnimatePresence mode="wait">
            <motion.div key={shade.n} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-navy shadow">
              <span className="h-6 w-6 rounded-full ring-2 ring-white" style={{ background: shade.c }} />{shade.n}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* floating cards */}
        <div className="glass absolute -left-4 top-[38%] hidden w-44 animate-float items-center gap-3 rounded-2xl p-3 shadow-glow sm:flex lg:-left-12">
          <ProductVisual visual="bucket" color="#3b78c4" className="h-12 w-12 shrink-0" />
          <div className="text-xs leading-tight"><b className="block text-navy">Super Emulsion</b><span className="text-neutral-500">Best seller</span></div>
        </div>
        <div className="glass absolute -right-3 top-6 hidden animate-float-delay items-center gap-2 rounded-2xl px-3 py-2.5 text-xs font-semibold text-navy shadow-glow sm:flex">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-whatsapp text-white"><WhatsAppIcon className="h-4 w-4" /></span>
          Order in one tap
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {heroShades.map((s) => (
            <motion.button key={s.n} aria-label={`Try ${s.n}`} onClick={() => { setShade(s); setAuto(false); }} whileHover={{ scale: 1.2, y: -4 }} whileTap={{ scale: 0.9 }}
              className={`h-10 w-10 rounded-full border-[3px] border-white shadow-md transition ${shade.n === s.n ? "ring-2 ring-navy ring-offset-2 ring-offset-cream" : ""}`} style={{ background: s.c }} />
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-neutral-500">Tap a swatch to repaint the room</p>
      </motion.div>
    </section>
  );
}
