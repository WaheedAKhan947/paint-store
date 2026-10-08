"use client";
import { motion, useInView, animate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type BtnVariant = "solid" | "outline" | "whatsapp" | "gold" | "ghost-light";

const btnStyles: Record<BtnVariant, string> = {
  solid: "bg-navy text-white shadow-glow hover:bg-navy-700",
  outline: "border border-navy/15 bg-white/80 text-navy backdrop-blur hover:border-navy/30 hover:bg-white",
  whatsapp: "bg-whatsapp text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,.7)] hover:brightness-105",
  gold: "bg-gradient-to-r from-gold to-gold-light text-navy-950 shadow-[0_12px_30px_-10px_rgba(200,162,74,.8)]",
  "ghost-light": "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20",
};

/* Pill button with a shine sweep and a subtle magnetic pull towards the cursor */
export function ShinyButton({
  href, children, variant = "solid", external = false, className = "", icon,
}: { href: string; children: React.ReactNode; variant?: BtnVariant; external?: boolean; className?: string; icon?: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 });
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.2);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  return (
    <motion.a
      ref={ref} href={href} style={{ x, y }} onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.96 }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${btnStyles[variant]} ${className}`}
    >
      {icon}
      <span className="relative z-10">{children}</span>
      <svg className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10h12m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      {variant !== "outline" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      )}
    </motion.a>
  );
}

export function Reveal({ children, delay = 0, className = "", y = 28 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className} initial={{ opacity: 0, y, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Splits a heading into words that rise in one by one */
export function WordsReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block" initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, text, light = false, center = false }: { eyebrow: string; title: string; text?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span className={light ? "eyebrow border-white/15 bg-white/10 text-white/80" : "eyebrow"}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />{eyebrow}
        </span>
      </Reveal>
      <h2 className={`mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl ${light ? "text-white" : "text-navy"}`}>
        <WordsReveal text={title} />
      </h2>
      {text && <Reveal delay={0.15}><p className={`mt-4 text-lg ${light ? "text-white/70" : "text-neutral-600"}`}>{text}</p></Reveal>}
    </div>
  );
}

export function Marquee({ items, reverse = false, dark = false }: { items: string[]; reverse?: boolean; dark?: boolean }) {
  const all = [...items, ...items];
  return (
    <div className={`relative overflow-hidden py-5 ${dark ? "bg-navy-950 text-white/80" : "bg-white/70 text-navy/70 backdrop-blur"}`}>
      <div className={`flex w-max gap-12 font-display text-lg font-semibold ${reverse ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"}`}>
        {all.map((t, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            {t}
            <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.43-9.46 9.43zm8.04-17.47A11.32 11.32 0 0 0 12.04.7C5.77.7.67 5.8.67 12.07c0 2 .52 3.96 1.52 5.68L.57 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.34-8.05z" />
    </svg>
  );
}

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`h-3.5 w-3.5 ${i < Math.round(rating) ? "" : "opacity-25"}`} viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" /></svg>
      ))}
    </span>
  );
}
