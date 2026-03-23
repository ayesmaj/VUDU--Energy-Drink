"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FLAVORS } from "@/lib/utils";
import { Zap } from "lucide-react";

export default function FlavorExperience() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  useTransform(scrollYProgress, [0, 1], [0, -40]); // keep scroll linked

  const flavor = FLAVORS[active];

  return (
    <section
      id="flavors"
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-40"
      style={{ background: "#FAFAF5" }}
    >
      {/* Animated BG gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={flavor.id}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: `radial-gradient(ellipse 70% 50% at 60% 40%, ${flavor.glow} 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vudu-dark/6 mb-6">
            <Zap size={12} className="text-vudu-mango fill-vudu-mango" />
            <span className="font-heading text-xs text-vudu-dark/60 tracking-widest uppercase">
              The Lineup
            </span>
          </div>
          <h2 className="font-display font-black text-[clamp(60px,9vw,130px)] leading-none tracking-tight text-vudu-dark">
            Pick Your
            <br />
            <span className="text-gradient-mango">Flavor World</span>
          </h2>
        </motion.div>

        {/* Flavor selector tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {FLAVORS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className="relative px-6 py-3 rounded-full font-heading font-semibold text-sm tracking-wide transition-all duration-300 overflow-hidden"
              style={{
                color: active === i ? "#FAFAF5" : "#0A0908",
                background: active === i
                  ? `linear-gradient(135deg, ${f.primary}, ${f.secondary})`
                  : "rgba(10,9,8,0.07)",
                boxShadow: active === i
                  ? `0 8px 32px ${f.glow}, 0 2px 8px rgba(0,0,0,0.1)`
                  : "none",
                transform: active === i ? "scale(1.05)" : "scale(1)",
              }}
            >
              <span className="mr-2">{f.fruit}</span>
              {f.name}
            </button>
          ))}
        </motion.div>

        {/* Main flavor display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left — Real can photo */}
            <div className="flex items-center justify-center relative min-h-[480px]">
              {/* Glow blob behind can */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: "70%", height: "70%",
                  background: `radial-gradient(circle, ${flavor.glow} 0%, transparent 70%)`,
                  filter: "blur(50px)",
                  animation: "pulseGlow 3s ease-in-out infinite",
                }}
              />

              {/* Floating fruit particles */}
              {[
                { emoji: flavor.fruit, x: "-12%", y: "8%",   size: 60, delay: 0 },
                { emoji: flavor.fruit, x: "78%",  y: "-4%",  size: 40, delay: 0.5 },
                { emoji: flavor.fruit, x: "82%",  y: "72%",  size: 50, delay: 0.9 },
                { emoji: flavor.fruit, x: "-8%",  y: "74%",  size: 34, delay: 0.3 },
                { emoji: "💧",         x: "38%",  y: "-8%",  size: 26, delay: 0.7 },
                { emoji: "⚡",         x: "88%",  y: "38%",  size: 22, delay: 1.1 },
              ].map((p, pi) => (
                <motion.div
                  key={pi}
                  className="absolute pointer-events-none select-none"
                  style={{ left: p.x, top: p.y, fontSize: p.size }}
                  animate={{ y: [0, -14, 0], rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 3.5 + pi * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: p.delay,
                  }}
                >
                  {p.emoji}
                </motion.div>
              ))}

              {/* Real can photo */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "clamp(200px,28vw,340px)", height: "clamp(320px,42vw,520px)" }}
              >
                <Image
                  src={flavor.image}
                  alt={`VUDU ${flavor.name} Energy Drink`}
                  fill
                  className="object-contain"
                  style={{
                    filter: `drop-shadow(0 30px 60px ${flavor.glow}) drop-shadow(0 8px 24px rgba(0,0,0,0.18))`,
                  }}
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Right — Flavor info */}
            <div className="flex flex-col gap-8">
              {/* Flavor badge */}
              <div
                className="inline-flex self-start items-center gap-3 px-5 py-3 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${flavor.primary}22, ${flavor.secondary}22)`,
                  border: `1px solid ${flavor.primary}33`,
                }}
              >
                <span className="text-3xl">{flavor.fruit}</span>
                <div>
                  <div
                    className="font-display font-black text-4xl tracking-wide"
                    style={{ color: flavor.primary }}
                  >
                    {flavor.name}
                  </div>
                  <div className="font-heading text-xs text-vudu-dark/50 tracking-widest uppercase">
                    {flavor.tagline}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-lg lg:text-xl text-vudu-dark/65 leading-relaxed">
                {flavor.description}
              </p>

              {/* Nutrition pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Caffeine",   value: `${flavor.caffeine}mg`, icon: "⚡" },
                  { label: "Calories",   value: `${flavor.kcal} kcal`,  icon: "🔥" },
                  { label: "Taurine",    value: "1000mg",               icon: "💪" },
                  { label: "B-Vitamins", value: "B3 B6 B12",            icon: "✨" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                    style={{
                      background: `${flavor.primary}14`,
                      border: `1px solid ${flavor.primary}25`,
                    }}
                  >
                    <span>{stat.icon}</span>
                    <div>
                      <div className="font-heading font-bold text-sm text-vudu-dark">{stat.value}</div>
                      <div className="font-body text-[10px] text-vudu-dark/45 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Link href="/shop">
                  <button
                    className="btn-primary text-white"
                    style={{
                      background: `linear-gradient(135deg, ${flavor.primary}, ${flavor.secondary})`,
                      boxShadow: `0 8px 32px ${flavor.glow}`,
                    }}
                  >
                    <Zap size={14} className="fill-white" />
                    Order {flavor.name}
                  </button>
                </Link>
                <Link href={`/flavors/${flavor.id}`}>
                  <button
                    className="btn-ghost"
                    style={{ color: flavor.primary, borderColor: `${flavor.primary}50` }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Flavor cards row */}
        <div className="grid grid-cols-3 gap-4 mt-20">
          {FLAVORS.map((f, i) => (
            <motion.button
              key={f.id}
              onClick={() => setActive(i)}
              className="relative rounded-2xl p-5 text-left overflow-hidden group transition-all duration-300"
              style={{
                background: active === i
                  ? `linear-gradient(145deg, ${f.primary}30, ${f.secondary}20)`
                  : "rgba(10,9,8,0.04)",
                border: `1px solid ${active === i ? f.primary + "40" : "transparent"}`,
                boxShadow: active === i ? `0 12px 40px ${f.glow}` : "none",
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <span className="text-4xl">{f.fruit}</span>
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${f.primary}, ${f.secondary})` }}
                    animate={active === i ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap size={12} className="fill-white text-white" />
                  </motion.div>
                </div>
                <div>
                  <div className="font-display font-black text-2xl text-vudu-dark leading-tight">
                    {f.name}
                  </div>
                  <div className="font-body text-xs text-vudu-dark/45 mt-0.5">{f.tagline}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
