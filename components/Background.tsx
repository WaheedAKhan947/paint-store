"use client";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/* Fixed, site-wide backdrop: drifting paint-coloured light blobs, a dotted grid,
   a cursor-follow spotlight, flowing paint ribbons and film grain. */
export default function Background() {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(200,162,74,.13), transparent 70%)`;
  const { scrollYProgress } = useScroll();
  const ribbonY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);

  useEffect(() => {
    const move = (e: PointerEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream">
      {/* warm base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#fff_0%,#fbf8f3_45%,#f4eee4_100%)]" />

      {/* paint blobs */}
      <div className="absolute -left-[10%] -top-[10%] h-[45vw] w-[45vw] animate-blob rounded-full bg-[#3b78c4]/25 blur-[90px]" />
      <div className="absolute -right-[8%] top-[5%] h-[38vw] w-[38vw] animate-blob-slow rounded-full bg-[#f2b632]/30 blur-[90px]" />
      <div className="absolute bottom-[-15%] left-[20%] h-[40vw] w-[40vw] animate-blob rounded-full bg-[#e8473b]/20 blur-[100px] [animation-delay:-6s]" />
      <div className="absolute bottom-[5%] right-[10%] h-[30vw] w-[30vw] animate-blob-slow rounded-full bg-[#9b86c9]/25 blur-[90px] [animation-delay:-10s]" />

      {/* flowing paint ribbons */}
      <motion.svg style={{ y: ribbonY, rotate: ribbonRotate }} className="absolute -left-[10%] top-[8%] h-[140vh] w-[120%] opacity-[.55]" viewBox="0 0 1440 1400" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rb1" x1="0" x2="1"><stop offset="0" stopColor="#3b78c4" stopOpacity="0" /><stop offset=".5" stopColor="#3b78c4" stopOpacity=".35" /><stop offset="1" stopColor="#9b86c9" stopOpacity="0" /></linearGradient>
          <linearGradient id="rb2" x1="0" x2="1"><stop offset="0" stopColor="#f2b632" stopOpacity="0" /><stop offset=".5" stopColor="#e8473b" stopOpacity=".28" /><stop offset="1" stopColor="#f2b632" stopOpacity="0" /></linearGradient>
        </defs>
        <motion.path
          d="M-50 260 C 300 120, 520 520, 860 330 S 1300 140, 1500 320" stroke="url(#rb1)" strokeWidth="70" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M-50 820 C 260 980, 600 620, 900 820 S 1280 1040, 1500 860" stroke="url(#rb2)" strokeWidth="56" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, delay: 0.4, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* dotted grid */}
      <div className="bg-dots absolute inset-0" />

      {/* cursor spotlight */}
      <motion.div className="absolute inset-0 hidden md:block" style={{ background: spotlight }} />

      {/* grain */}
      <div className="grain absolute inset-0 opacity-[.18] mix-blend-multiply" />
    </div>
  );
}
