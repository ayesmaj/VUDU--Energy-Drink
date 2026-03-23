"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FLAVORS, type Flavor } from "@/lib/utils";
import { Zap, ArrowLeft, ShoppingCart } from "lucide-react";

export default function FlavorDetailContent({ flavor }: { flavor: Flavor }) {
  const others = FLAVORS.filter((f) => f.id !== flavor.id);

  return (
    <div className="min-h-screen" style={{ background: "#0A0908" }}>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 70% 50%, ${flavor.glow.replace("0.55", "0.3")} 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
          {/* Back link */}
          <Link
            href="/#flavors"
            className="inline-flex items-center gap-2 font-heading text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase mb-12"
          >
            <ArrowLeft size={14} /> All Flavors
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left — info */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{
                    background: `${flavor.primary}20`,
                    border: `1px solid ${flavor.primary}30`,
                  }}
                >
                  <span>{flavor.fruit}</span>
                  <span className="font-heading text-xs tracking-widest uppercase" style={{ color: flavor.primary }}>
                    {flavor.tagline}
                  </span>
                </div>

                <h1
                  className="font-display font-black text-[clamp(64px,10vw,150px)] leading-none tracking-tight mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${flavor.primary}, ${flavor.secondary})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {flavor.name}
                </h1>

                <p className="font-body text-lg lg:text-xl text-white/55 leading-relaxed max-w-md">
                  {flavor.description}
                </p>
              </motion.div>

              {/* Nutrition facts */}
              <motion.div
                className="grid grid-cols-3 gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                {[
                  { icon: "⚡", label: "Caffeine", value: `${flavor.caffeine}mg` },
                  { icon: "🔥", label: "Calories", value: `${flavor.kcal} kcal` },
                  { icon: "💪", label: "Taurine",  value: "1000mg" },
                  { icon: "✨", label: "B-Vitamins", value: "B3·B6·B12" },
                  { icon: "🌿", label: "Artificial Colors", value: "Zero" },
                  { icon: "🍬", label: "Sugar", value: "Zero" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center text-center p-4 rounded-2xl gap-1"
                    style={{ background: `${flavor.primary}12`, border: `1px solid ${flavor.primary}20` }}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <div className="font-heading font-bold text-sm text-white">{s.value}</div>
                    <div className="font-body text-[10px] text-white/35 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm text-white"
                  style={{
                    background: `linear-gradient(135deg, ${flavor.primary}, ${flavor.secondary})`,
                    boxShadow: `0 12px 40px ${flavor.glow}`,
                  }}
                >
                  <ShoppingCart size={15} /> Order Now — $3.99
                </Link>
              </motion.div>
            </div>

            {/* Right — can */}
            <motion.div
              className="flex items-center justify-center relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow behind can */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "70%", height: "70%",
                  background: `radial-gradient(circle, ${flavor.glow} 0%, transparent 70%)`,
                  filter: "blur(60px)",
                  animation: "pulseGlow 3s ease-in-out infinite",
                }}
              />

              {/* Orbiting ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "90%", height: "90%",
                  border: `1px solid ${flavor.primary}25`,
                  animation: "spin 25s linear infinite",
                  borderStyle: "dashed",
                }}
              />

              <motion.div
                className="relative z-10"
                style={{ width: "clamp(220px,28vw,380px)", height: "clamp(340px,44vw,580px)", position: "relative" }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={flavor.image}
                  alt={`VUDU ${flavor.name} Energy Drink`}
                  fill
                  className="object-contain"
                  style={{
                    filter: `drop-shadow(0 40px 80px ${flavor.glow}) drop-shadow(0 10px 30px rgba(0,0,0,0.5))`,
                  }}
                  priority
                  unoptimized
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other flavors */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-black text-4xl text-white mb-8 text-center">
            Try the others
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {others.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link
                  href={`/flavors/${f.id}`}
                  className="flex items-center gap-5 p-5 rounded-2xl transition-all group"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="relative flex-shrink-0" style={{ width: 70, height: 112 }}>
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      className="object-contain"
                      style={{ filter: `drop-shadow(0 8px 20px ${f.glow})` }}
                      unoptimized
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-black text-2xl text-white mb-1">{f.name}</div>
                    <div className="font-body text-xs text-white/40">{f.tagline}</div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${f.primary}, ${f.secondary})` }}
                  >
                    <Zap size={14} className="fill-white text-white" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
