"use client";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { allShades, generalMessage, STORE, waLink } from "@/lib/data";
import { Counter, Reveal, SectionHeading, ShinyButton, WhatsAppIcon } from "./ui";

/* ---------- Shade wall ---------- */
export function ShadeWall() {
  const [picked, setPicked] = useState(allShades[2]);
  const msg = `Assalam o Alaikum, Hafiz Paint Store! 👋\nI like the shade *${picked.name}* (${picked.hex}).\nWhich Brighto products and sizes is it available in, and what is the rate?`;
  return (
    <section id="shades" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Shade studio" title="Find your colour, then send it to us." text="Pick a shade you love. We'll tell you which Brighto product it comes in and mix it for you." />
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-center gap-5 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-card backdrop-blur-xl">
              <motion.div key={picked.hex} initial={{ scale: 0.6, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 15 }}
                className="h-20 w-20 shrink-0 rounded-2xl shadow-inner ring-1 ring-navy/10" style={{ background: picked.hex }} />
              <div className="min-w-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div key={picked.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                    <div className="font-display text-xl font-bold text-navy">{picked.name}</div>
                    <div className="font-mono text-xs uppercase text-neutral-500">{picked.hex}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={waLink(msg)} target="_blank" rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-semibold text-white">
                <WhatsAppIcon className="h-4 w-4" /><span className="hidden sm:inline">Ask about it</span>
              </motion.a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {allShades.map((s, i) => (
              <motion.button key={s.name} onClick={() => setPicked(s)} title={s.name} aria-label={s.name}
                initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.03, type: "spring", stiffness: 260, damping: 18 }}
                whileHover={{ y: -8, rotate: i % 2 ? 3 : -3 }} whileTap={{ scale: 0.92 }}
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 ${picked.name === s.name ? "ring-4 ring-navy" : ""}`}
                style={{ background: s.hex }}>
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-white/90 px-2 py-1.5 text-left text-[10px] font-semibold text-navy transition-transform group-hover:translate-y-0">{s.name}</span>
                <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
              </motion.button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- How ordering works ---------- */
const steps = [
  { t: "Pick a product", d: "Browse the catalogue and open any product to see sizes, finishes and coverage.", icon: "M4 6h16M4 12h16M4 18h10" },
  { t: "Choose size & shade", d: "Select the pack size, colour and quantity. The estimated total updates instantly.", icon: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-1.5-1.5-1.5-1.5-3S13 14 15 14h2a4 4 0 0 0 4-4c0-3.9-4-7-9-7z" },
  { t: "Send on WhatsApp", d: "One tap sends a ready-made message with every detail. We confirm stock and wholesale rate.", icon: "M21 12a9 9 0 0 1-13.5 7.8L3 21l1.2-4.5A9 9 0 1 1 21 12z" },
  { t: "Pickup or delivery", d: "Collect from Maneri Road or get it delivered across Swabi and nearby areas.", icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-.1M17 19a2 2 0 1 0 0-.1" },
];

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-navy-950 py-24 text-white">
      <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent)]" />
      <div className="absolute -left-40 top-0 h-96 w-96 animate-blob rounded-full bg-[#3b78c4]/30 blur-[100px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 animate-blob-slow rounded-full bg-gold/25 blur-[100px]" />
      <div className="grain absolute inset-0 opacity-20 mix-blend-overlay" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading light center eyebrow="How it works" title="From shelf to your walls in four steps." text="No forms, no checkout. Just a WhatsApp chat with people who know paint." />
        <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-[12%] right-[12%] top-8 hidden h-px origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/0 lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.12}>
              <motion.div whileHover={{ y: -8 }} className="group relative h-full rounded-3xl border border-white/10 bg-white/[.04] p-6 backdrop-blur transition-colors hover:border-gold/40 hover:bg-white/[.07]">
                <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold to-gold-light text-navy-950 shadow-[0_10px_30px_-10px_rgba(200,162,74,.8)]">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-white font-display text-xs font-bold text-navy">{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-white/65">{s.d}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Store gallery with parallax ---------- */
export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.4], ["4rem", "2.5rem"]);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Our store" title="Stacked high with genuine Brighto stock." />
      <motion.div ref={ref} style={{ borderRadius: radius }} className="relative mt-10 aspect-[16/10] overflow-hidden shadow-2xl sm:aspect-[16/8]">
        <motion.div style={{ y, scale }} className="absolute inset-[-12%]">
          <Image src="/store.png" alt="Brighto paint buckets stacked outside Hafiz Paint Store" fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
          <div className="text-white">
            <div className="font-display text-2xl font-bold sm:text-4xl">Maneri Road, Swabi</div>
            <p className="mt-1 text-white/75">Walk in for colour advice, or message us and we'll keep your order ready.</p>
          </div>
          <ShinyButton href={STORE.map} external variant="ghost-light">Get directions</ShinyButton>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Stats band ---------- */
export function Stats() {
  const items = [
    { v: <Counter to={5} decimals={1} />, l: "Google rating" },
    { v: <Counter to={12} suffix="+" />, l: "Product lines" },
    { v: <Counter to={20} suffix="+" />, l: "Ready shades" },
    { v: <Counter to={7} suffix=" PM" />, l: "Open daily until" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/70 bg-navy/10 shadow-card lg:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.08} className="bg-white/80 p-8 text-center backdrop-blur-xl">
            <div className="text-paint font-display text-4xl font-extrabold sm:text-5xl">{s.v}</div>
            <div className="mt-2 text-sm font-medium text-neutral-500">{s.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Big CTA ---------- */
export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-16 text-center text-white sm:px-16 sm:py-24">
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_120%,#e8473b,#f2b632,#7da07a,#3b78c4,#9b86c9,#e8473b)] opacity-40 blur-3xl" />
          <div className="bg-grid-light absolute inset-0" />
          <div className="grain absolute inset-0 opacity-25 mix-blend-overlay" />
          {[["#e8473b", "left-[8%] top-[18%]"], ["#f2b632", "right-[10%] top-[22%]"], ["#3b78c4", "left-[18%] bottom-[14%]"], ["#9b86c9", "right-[16%] bottom-[18%]"]].map(([c, pos], i) => (
            <motion.span key={c} className={`absolute hidden h-12 w-12 rounded-full border-4 border-white/80 shadow-xl sm:block ${pos}`} style={{ background: c }}
              animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }} />
          ))}
          <div className="relative">
            <span className="eyebrow border-white/20 bg-white/10 text-white/80">Ready when you are</span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-6xl">Let&apos;s give your walls a <span className="text-paint">fresh story.</span></h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">Send us your room size and preferred shade. We&apos;ll suggest the right product, quantity and best wholesale rate.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ShinyButton href={waLink(generalMessage)} external variant="whatsapp" icon={<WhatsAppIcon className="relative z-10 h-5 w-5" />}>Chat on WhatsApp</ShinyButton>
              <ShinyButton href={`tel:${STORE.phone}`} variant="ghost-light">Call {STORE.phoneDisplay}</ShinyButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Visit ---------- */
export function Visit() {
  const rows: [string, string, string][] = [
    ["Address", STORE.address, STORE.map],
    ["Phone", STORE.phoneDisplay, `tel:${STORE.phone}`],
    ["WhatsApp", "Message us anytime", waLink(generalMessage)],
    ["Hours", STORE.hours, ""],
  ];
  return (
    <section id="visit" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <SectionHeading eyebrow="Visit us" title="Come say salaam at the store." />
      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="h-full rounded-[2rem] border border-white/70 bg-white/75 p-7 shadow-card backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Hafiz Paint Store" width={72} height={72} className="h-[72px] w-[72px] rounded-2xl object-cover" />
              <div><h3 className="font-display text-xl font-bold text-navy">{STORE.name}</h3><p className="text-sm text-neutral-500">Brighto wholesale dealer</p></div>
            </div>
            <div className="mt-6">
              {rows.map(([k, v, h]) => (
                <div key={k} className="flex items-center justify-between gap-4 border-b border-navy/10 py-4 last:border-0">
                  <span className="text-sm text-neutral-500">{k}</span>
                  {h ? <a href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-right font-semibold text-navy hover:text-brand">{v}</a> : <b className="text-right text-navy">{v}</b>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-full min-h-[340px] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-card">
            <iframe title="Hafiz Paint Store on Google Maps" src="https://www.google.com/maps?q=Hafiz+Paint+Store+Maneri+Road+Swabi&output=embed" className="absolute inset-0 h-full w-full grayscale-[30%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16 text-white/70">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#e8473b] via-gold to-[#3b78c4]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 font-display text-lg font-bold text-white">
            <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />{STORE.name}
          </div>
          <p className="mt-3 max-w-xs text-sm">Authorised Brighto paint wholesale dealer on Maneri Road, Swabi.</p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold text-white">Explore</h4>
          <ul className="mt-3 space-y-2">{[["Products", "#products"], ["Shade studio", "#shades"], ["How it works", "#process"], ["Visit", "#visit"]].map(([l, h]) => <li key={h}><a className="hover:text-gold" href={h}>{l}</a></li>)}</ul>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:text-gold" href={`tel:${STORE.phone}`}>{STORE.phoneDisplay}</a></li>
            <li><a className="hover:text-gold" href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li>{STORE.hours}</li>
          </ul>
        </div>
      </div>
      <div aria-hidden className="text-paint mt-12 select-none text-center font-display text-[17vw] font-extrabold leading-[.8] opacity-90">HAFIZ</div>
      <div className="border-t border-white/10 py-6 text-center text-xs">© {new Date().getFullYear()} {STORE.name}, Swabi · Website by Devologists</div>
    </footer>
  );
}

/* ---------- Floating WhatsApp ---------- */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [200, 400], [0, 1]);
  const scale = useTransform(scrollY, [200, 400], [0.6, 1]);
  const pointerEvents = useTransform(scrollY, (v) => (v > 260 ? "auto" : "none"));
  return (
    <motion.a style={{ opacity, scale, pointerEvents }} href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-4 text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,.9)]">
      <span className="absolute inset-0 animate-ping2 rounded-full bg-whatsapp" />
      <WhatsAppIcon className="relative h-6 w-6" />
      <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-[140px]">Chat with us</span>
    </motion.a>
  );
}
