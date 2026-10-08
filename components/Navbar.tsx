"use client";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { generalMessage, STORE, waLink } from "@/lib/data";
import { WhatsAppIcon } from "./ui";

const links = [["Products", "#products"], ["Shades", "#shades"], ["How it works", "#process"], ["Store", "#gallery"], ["Visit", "#visit"]];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <motion.nav
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${scrolled ? "glass shadow-glow" : "bg-transparent"}`}
      >
        <a href="#top" className="flex items-center gap-2.5 font-display font-extrabold text-navy">
          <Image src="/logo.png" alt="Hafiz Paint Store logo" width={40} height={40} className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
          <span className="leading-tight">Hafiz Paint<span className="block text-[10px] font-semibold uppercase tracking-[.25em] text-gold">Store · Swabi</span></span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="group relative rounded-full px-4 py-2 text-sm font-medium text-navy/70 transition hover:text-navy">
              {l}<span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${STORE.phone}`} className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5 sm:block">{STORE.phoneDisplay}</a>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
            <WhatsAppIcon className="h-4 w-4" /><span className="hidden sm:inline">Order on WhatsApp</span><span className="sm:hidden">Order</span>
          </motion.a>
          <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-navy lg:hidden">
            <div className="relative h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-4 rounded bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </div>
          </button>
        </div>
        <motion.span style={{ scaleX: progress }} className="absolute inset-x-6 bottom-0 h-[2px] origin-left rounded bg-gradient-to-r from-[#e8473b] via-gold to-[#3b78c4]" />
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="glass mx-auto mt-2 max-w-7xl rounded-3xl p-3 shadow-glow lg:hidden">
            {links.map(([l, h], i) => (
              <motion.a key={h} href={h} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="block rounded-2xl px-4 py-3 font-display text-lg font-semibold text-navy hover:bg-white">{l}</motion.a>
            ))}
            <a href={`tel:${STORE.phone}`} className="mt-1 block rounded-2xl bg-navy px-4 py-3 text-center font-semibold text-white">Call {STORE.phoneDisplay}</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
