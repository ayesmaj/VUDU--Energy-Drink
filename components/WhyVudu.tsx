"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Leaf, Droplets, Heart, Star, Shield } from "lucide-react";

const BENEFITS = [
  {
    icon: Zap,
    title: "Clean Energy Rush",
    body: "160mg of caffeine from green coffee — no crash, no jitters. Just smooth, sustained energy that lasts.",
    gradient: "from-orange-400 to-yellow-400",
    glow: "rgba(255,140,0,0.3)",
    accent: "#FF8C00",
    bg: "rgba(255,140,0,0.07)",
    size: "large",
  },
  {
    icon: Leaf,
    title: "Naturally Sourced",
    body: "Every ingredient has a purpose. Real fruit extracts. Zero artificial colors or flavors. Clean from first sip.",
    gradient: "from-lime-400 to-green-400",
    glow: "rgba(170,255,0,0.3)",
    accent: "#AAFF00",
    bg: "rgba(170,255,0,0.07)",
    size: "normal",
  },
  {
    icon: Droplets,
    title: "Hydration Boosted",
    body: "Packed with electrolytes and B-vitamins for real hydration that supports performance and focus.",
    gradient: "from-cyan-400 to-teal-400",
    glow: "rgba(0,212,255,0.3)",
    accent: "#00D4FF",
    bg: "rgba(0,212,255,0.07)",
    size: "normal",
  },
  {
    icon: Heart,
    title: "Built for Life",
    body: "Low calorie. No sugar crash. VUDU fits your lifestyle whether you're training, creating, or just living.",
    gradient: "from-pink-400 to-rose-500",
    glow: "rgba(255,77,139,0.3)",
    accent: "#FF4D8B",
    bg: "rgba(255,77,139,0.07)",
    size: "large",
  },
  {
    icon: Star,
    title: "Flavor First",
    body: "Over 2 years of flavor development. Because great taste isn't a luxury — it's the minimum standard.",
    gradient: "from-yellow-400 to-orange-400",
    glow: "rgba(255,215,0,0.3)",
    accent: "#FFD700",
    bg: "rgba(255,215,0,0.07)",
    size: "normal",
  },
  {
    icon: Shield,
    title: "Lab Tested",
    body: "Third-party tested. Fully transparent. Every batch verified for quality, purity, and consistency.",
    gradient: "from-purple-400 to-indigo-400",
    glow: "rgba(130,100,255,0.3)",
    accent: "#8264FF",
    bg: "rgba(130,100,255,0.07)",
    size: "normal",
  },
];

export default function WhyVudu() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="why-vudu"
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-40"
      style={{
        background: "linear-gradient(170deg, #0A0908 0%, #111218 60%, #0A0908 100%)",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,140,0,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,77,139,0.08) 0%, transparent 50%)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
            <span className="font-heading text-xs text-white/50 tracking-widest uppercase">
              Why VUDU Hits Different
            </span>
          </div>
          <h2
            className="font-display font-black text-[clamp(60px,9vw,130px)] leading-none tracking-tight text-white"
          >
            Not just energy.
            <br />
            <span className="shimmer-text">A whole experience.</span>
          </h2>
          <p className="font-body text-lg text-white/50 max-w-xl mx-auto mt-6 leading-relaxed">
            Every can of VUDU is engineered to taste incredible and perform beautifully.
            No trade-offs. No excuses.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} index={i} />
          ))}
        </div>

        {/* Bottom stat bar */}
        <motion.div
          className="mt-16 rounded-3xl p-8 glass-dark grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { val: "160mg", label: "Clean Caffeine", sub: "Per Can" },
            { val: "0g",    label: "Added Sugar",    sub: "Guilt Free" },
            { val: "4",     label: "Bold Flavors",   sub: "Craft Made" },
            { val: "3rd",   label: "Party Tested",   sub: "Every Batch" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <span className="font-display font-black text-6xl lg:text-8xl shimmer-text">
                {stat.val}
              </span>
              <span className="font-heading font-semibold text-sm text-white/70">{stat.label}</span>
              <span className="font-body text-xs text-white/35 uppercase tracking-widest">{stat.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[number];
  index: number;
}) {
  const Icon = benefit.icon;

  return (
    <motion.div
      className="relative rounded-2xl p-7 overflow-hidden group cursor-default"
      style={{
        background: `${benefit.bg}, rgba(255,255,255,0.03)`,
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 60px ${benefit.glow}`,
        borderColor: `${benefit.accent}35`,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${benefit.glow} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${benefit.accent}30, ${benefit.accent}15)`,
            border: `1px solid ${benefit.accent}25`,
          }}
        >
          <Icon
            size={22}
            style={{ color: benefit.accent }}
            strokeWidth={2}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-black text-4xl text-white/90 leading-tight">
            {benefit.title}
          </h3>
          <p className="font-body text-sm text-white/50 leading-relaxed">
            {benefit.body}
          </p>
        </div>

        {/* Accent line */}
        <div
          className="h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-16"
          style={{ background: `linear-gradient(to right, ${benefit.accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}
