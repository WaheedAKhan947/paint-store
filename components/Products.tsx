"use client";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { categories, formatPKR, productMessage, products, STORE, waLink, type Category, type Product } from "@/lib/data";
import ProductVisual from "./ProductVisual";
import { SectionHeading, Stars, WhatsAppIcon } from "./ui";

export default function Products() {
  const [cat, setCat] = useState<"All" | Category>("All");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Product | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(
      (p) => (cat === "All" || p.category === cat) &&
        (!term || `${p.name} ${p.brand} ${p.category} ${p.tagline}`.toLowerCase().includes(term)),
    );
  }, [cat, q]);

  return (
    <section id="products" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="The catalogue"
          title="Everything you need to paint, in stock."
          text="Tap any product to pick a size, shade and quantity. We'll get your order details straight on WhatsApp."
        />
        <div className="relative w-full lg:w-80">
          <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="6" /><path d="m14 14 4 4" strokeLinecap="round" /></svg>
          <input
            value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search emulsion, enamel, rollers…"
            className="w-full rounded-full border border-navy/10 bg-white/80 py-3 pl-11 pr-4 text-sm text-navy shadow-sm outline-none backdrop-blur transition focus:border-gold focus:ring-4 focus:ring-gold/20"
          />
        </div>
      </div>

      {/* category tabs with sliding pill */}
      <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2">
        {categories.map((c) => (
          <button
            key={c} onClick={() => setCat(c)}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${cat === c ? "text-white" : "text-navy/70 hover:text-navy"}`}
          >
            {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-navy shadow-glow" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            {cat !== c && <span className="absolute inset-0 rounded-full border border-navy/10 bg-white/70" />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => <ProductCard key={p.id} p={p} index={i} onOpen={() => setActive(p)} />)}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="mt-12 text-center text-neutral-500">
          No match for “{q}”. <a className="font-semibold text-navy underline" href={waLink(`Assalam o Alaikum! Do you have ${q}?`)} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp</a>
        </p>
      )}

      <AnimatePresence>{active && <ProductModal p={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}

function ProductCard({ p, index, onOpen }: { p: Product; index: number; onOpen: () => void }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 18 });
  const from = Math.min(...p.sizes.map((s) => s.price));

  return (
    <motion.article
      layout initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/75 p-3 shadow-card backdrop-blur-xl"
    >
      <button onClick={onOpen} className="relative aspect-[4/3.4] overflow-hidden rounded-[1.35rem] text-left" aria-label={`View ${p.name}`}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 50% 0%, ${p.color}33, ${p.color}10 55%, #ffffff00)` }} />
        <div className="absolute -bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-125" style={{ background: `${p.color}55` }} />
        <ProductVisual visual={p.visual} color={p.color} label={p.name} className="relative mx-auto h-full w-[78%] drop-shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-[-3deg] group-hover:scale-105" />
        {p.badge && <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{p.badge}</span>}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy/70">{p.category}</span>
      </button>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="font-semibold uppercase tracking-wider">{p.brand}</span>
          <span className="flex items-center gap-1"><Stars rating={p.rating} />{p.rating}</span>
        </div>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-navy">{p.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{p.tagline}</p>

        {p.shades && (
          <div className="mt-3 flex -space-x-1.5">
            {p.shades.slice(0, 6).map((s) => <span key={s.name} title={s.name} className="h-5 w-5 rounded-full border-2 border-white shadow-sm" style={{ background: s.hex }} />)}
            {p.shades.length > 6 && <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-navy text-[9px] font-bold text-white">+{p.shades.length - 6}</span>}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-500">From</span>
            <div className="font-display text-xl font-bold text-navy">{formatPKR(from)}</div>
          </div>
          <div className="flex gap-2">
            <motion.a
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
              href={waLink(productMessage(p))} target="_blank" rel="noopener noreferrer" aria-label={`Send ${p.name} details on WhatsApp`}
              className="grid h-11 w-11 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_20px_-6px_rgba(37,211,102,.7)]"
            >
              <WhatsAppIcon />
            </motion.a>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} onClick={onOpen} className="h-11 rounded-full bg-navy px-4 text-sm font-semibold text-white">
              Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProductModal({ p, onClose }: { p: Product; onClose: () => void }) {
  const [size, setSize] = useState(p.sizes[0].label);
  const [shade, setShade] = useState(p.shades?.[0]?.name);
  const [qty, setQty] = useState(1);
  const [preview, setPreview] = useState(false);
  const price = p.sizes.find((s) => s.label === size)?.price ?? p.sizes[0].price;
  const message = productMessage(p, { size, shade, qty });
  const shadeHex = p.shades?.find((s) => s.name === shade)?.hex;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-md" onClick={onClose} />
      <motion.div
        role="dialog" aria-modal="true" aria-label={p.name}
        initial={{ y: 60, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem] md:grid-cols-[1fr_1.1fr]"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy shadow transition hover:rotate-90">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" /></svg>
        </button>

        {/* visual side */}
        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden p-8" style={{ background: `linear-gradient(160deg, ${shadeHex ?? p.color}, ${p.color})`, transition: "background .5s" }}>
          <div className="bg-grid-light absolute inset-0 opacity-60" />
          <div className="absolute -right-20 -top-20 h-72 w-72 animate-spin-slow rounded-full border-[30px] border-white/10" />
          <motion.div key={shade} initial={{ scale: 0.9, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="relative w-64 animate-float">
            <ProductVisual visual={p.visual} color={p.color} label={p.name} className="w-full drop-shadow-2xl" />
          </motion.div>
          {shade && <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-navy">{shade}</span>}
        </div>

        {/* detail side */}
        <div className="p-6 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[.2em] text-gold">{p.brand} · {p.category}</span>
          <h3 className="mt-2 font-display text-3xl font-bold text-navy">{p.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500"><Stars rating={p.rating} />{p.rating} rating</div>
          <p className="mt-4 text-neutral-600">{p.description}</p>

          {(p.finish || p.coverage || p.dryTime) && (
            <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[["Finish", p.finish], ["Coverage", p.coverage], ["Drying", p.dryTime]].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-navy/10 bg-white p-3">
                  <dt className="text-[11px] uppercase tracking-wider text-neutral-500">{k}</dt>
                  <dd className="mt-1 text-xs font-semibold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-5 space-y-1.5 text-sm text-neutral-700">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-whatsapp/15 text-whatsapp"><svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3"><path d="m4 10 4 4 8-8" /></svg></span>{f}</li>
            ))}
          </ul>

          <div className="mt-6">
            <h4 className="text-sm font-semibold text-navy">Size</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button key={s.label} onClick={() => setSize(s.label)}
                  className={`rounded-xl border px-3.5 py-2 text-left text-sm transition ${size === s.label ? "border-navy bg-navy text-white" : "border-navy/10 bg-white text-navy hover:border-navy/30"}`}>
                  <span className="block font-semibold">{s.label}</span>
                  <span className={`text-xs ${size === s.label ? "text-white/70" : "text-neutral-500"}`}>{formatPKR(s.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {p.shades && (
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-navy">Shade <span className="font-normal text-neutral-500">· {shade}</span></h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.shades.map((s) => (
                  <motion.button key={s.name} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => setShade(s.name)} aria-label={s.name} title={s.name}
                    className={`h-9 w-9 rounded-full border-[3px] border-white shadow ${shade === s.name ? "ring-2 ring-navy ring-offset-2 ring-offset-cream" : "ring-1 ring-navy/10"}`} style={{ background: s.hex }} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-navy/10 bg-white p-4">
            <div className="flex items-center gap-3">
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-9 w-9 place-items-center rounded-full bg-navy/5 text-lg font-bold text-navy hover:bg-navy/10">−</button>
              <motion.span key={qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-8 text-center font-display text-lg font-bold text-navy">{qty}</motion.span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-navy/5 text-lg font-bold text-navy hover:bg-navy/10">+</button>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-500">Estimated total</span>
              <motion.div key={price * qty} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="font-display text-2xl font-bold text-navy">{formatPKR(price * qty)}</motion.div>
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
            <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={waLink(message)} target="_blank" rel="noopener noreferrer"
              className="relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-whatsapp px-6 py-4 font-semibold text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,.8)]">
              <WhatsAppIcon /> Send details on WhatsApp
              <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </motion.a>
            <a href={`tel:${STORE.phone}`} className="flex items-center justify-center rounded-full border border-navy/15 bg-white px-6 py-4 font-semibold text-navy hover:border-navy/30">Call</a>
          </div>

          <button onClick={() => setPreview((v) => !v)} className="mt-3 text-xs font-semibold text-navy/60 underline-offset-4 hover:underline">
            {preview ? "Hide" : "Preview"} WhatsApp message
          </button>
          <AnimatePresence>
            {preview && (
              <motion.pre initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="mt-2 overflow-hidden whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-[#dcf8c6] p-4 font-sans text-xs leading-relaxed text-neutral-800">
                {message}
              </motion.pre>
            )}
          </AnimatePresence>
          <p className="mt-3 text-[11px] text-neutral-400">Prices are indicative. Final wholesale rate is confirmed on WhatsApp.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
