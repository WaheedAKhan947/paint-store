import type { Visual } from "@/lib/data";

/* Hand-drawn SVG product illustrations, tinted with each product's accent colour. */
export default function ProductVisual({ visual, color, label, className = "" }: { visual: Visual; color: string; label?: string; className?: string }) {
  const id = `g-${visual}-${color.replace("#", "")}`;
  const common = { className, viewBox: "0 0 200 200", fill: "none" as const, role: "img" as const, "aria-label": label };

  if (visual === "brush") {
    return (
      <svg {...common}>
        <defs><linearGradient id={id} x1="0" x2="1"><stop offset="0" stopColor="#8a5a2b" /><stop offset="1" stopColor="#b9814a" /></linearGradient></defs>
        <ellipse cx="100" cy="182" rx="60" ry="7" fill="#14275c" opacity=".12" />
        <g transform="rotate(-28 100 100)">
          <rect x="88" y="18" width="24" height="78" rx="12" fill={`url(#${id})`} />
          <rect x="80" y="92" width="40" height="22" rx="3" fill="#c9ced6" />
          <rect x="80" y="98" width="40" height="3" fill="#9aa3ae" />
          <path d="M80 114h40l4 44c0 6-48 6-48 0z" fill="#3b2a1a" />
          <path d="M76 150c4 16 44 16 48 0l2 14c-6 14-46 14-52 0z" fill={color} />
          <circle cx="100" cy="30" r="4" fill="#fff" opacity=".6" />
        </g>
        <path d="M140 150c10 0 14 8 14 14s-6 10-10 10" stroke={color} strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  if (visual === "roller") {
    return (
      <svg {...common}>
        <ellipse cx="100" cy="182" rx="66" ry="7" fill="#14275c" opacity=".12" />
        <path d="M30 150l40-20h90l-30 30H34z" fill="#d7dbe1" />
        <path d="M60 150c10-6 50-6 70 0" stroke={color} strokeWidth="10" strokeLinecap="round" opacity=".8" />
        <rect x="44" y="40" width="112" height="40" rx="20" fill={color} />
        <rect x="52" y="46" width="96" height="8" rx="4" fill="#fff" opacity=".3" />
        <path d="M156 60h10v40h-62v24" stroke="#5b6472" strokeWidth="6" strokeLinejoin="round" />
        <rect x="96" y="120" width="16" height="44" rx="8" fill="#c8a24a" />
      </svg>
    );
  }

  if (visual === "tub") {
    return (
      <svg {...common}>
        <defs><linearGradient id={id} x1="0" x2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#eef0f4" /><stop offset="1" stopColor="#cfd4dc" /></linearGradient></defs>
        <ellipse cx="100" cy="180" rx="70" ry="8" fill="#14275c" opacity=".12" />
        <path d="M40 70h120l-10 104c-1 6-6 8-12 8H62c-6 0-11-2-12-8z" fill={`url(#${id})`} />
        <rect x="34" y="58" width="132" height="18" rx="6" fill={color} />
        <rect x="50" y="98" width="100" height="50" rx="8" fill={color} opacity=".9" />
        <text x="100" y="128" textAnchor="middle" fontFamily="var(--font-sora)" fontWeight="800" fontSize="16" fill="#fff">BRIGHTO</text>
        <rect x="64" y="136" width="72" height="4" rx="2" fill="#fff" opacity=".7" />
      </svg>
    );
  }

  const isCan = visual === "can";
  return (
    <svg {...common}>
      <defs>
        <linearGradient id={id} x1="0" x2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#f1f2f6" /><stop offset="1" stopColor="#c8ccd6" /></linearGradient>
        <linearGradient id={`${id}-l`} x1="0" x2="1"><stop offset="0" stopColor={color} /><stop offset="1" stopColor={color} stopOpacity=".8" /></linearGradient>
      </defs>
      <ellipse cx="100" cy="182" rx={isCan ? 54 : 64} ry="8" fill="#14275c" opacity=".12" />
      {/* handle */}
      <path d={isCan ? "M54 60 C 54 18, 146 18, 146 60" : "M44 58 C 44 8, 156 8, 156 58"} stroke="#5b6472" strokeWidth="5" fill="none" />
      {/* body */}
      <path d={isCan ? "M52 56h96v118c0 6-4 10-10 10H62c-6 0-10-4-10-10z" : "M38 54h124l-8 120c-.5 6-5 10-11 10H57c-6 0-10.5-4-11-10z"} fill={`url(#${id})`} />
      {/* lid */}
      <rect x={isCan ? 48 : 34} y="46" width={isCan ? 104 : 132} height="16" rx="5" fill="#14275c" />
      {/* drip of paint over the rim */}
      <path d={isCan ? "M70 60h40v16c0 6-4 8-6 8s-4-3-4-7v-4c0-3-2-4-4-4s-4 2-4 5v14c0 5-3 7-6 7s-6-2-6-7v-20c0-3-2-4-4-4s-6 0-6-4z" : "M60 60h60v14c0 6-4 8-6 8s-4-3-4-7v-2c0-3-2-4-4-4s-4 2-4 5v18c0 5-3 7-6 7s-6-2-6-7v-24c0-3-2-4-4-4s-4 2-4 4v6c0 5-3 6-5 6s-5-2-5-6v-8z"} fill={color} />
      {/* label */}
      <rect x={isCan ? 60 : 52} y="98" width={isCan ? 80 : 96} height="54" rx="10" fill={`url(#${id}-l)`} />
      <text x="100" y="126" textAnchor="middle" fontFamily="var(--font-sora)" fontWeight="800" fontSize={isCan ? 14 : 17} fill="#fff" letterSpacing=".5">BRIGHTO</text>
      <rect x="72" y="134" width="56" height="4" rx="2" fill="#fff" opacity=".7" />
      <circle cx="100" cy="144" r="0" />
      <rect x={isCan ? 58 : 46} y="66" width="8" height="100" rx="4" fill="#fff" opacity=".55" />
    </svg>
  );
}
