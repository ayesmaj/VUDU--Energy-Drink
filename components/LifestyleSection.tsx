"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   ASSET PLACEHOLDER NOTE:
   Replace the colored gradient div blocks below with:
   <Image src="/lifestyle/[photo-name].jpg" ... />
   Use real campaign images: festivals, rooftops, beach clubs,
   creators, athletes, sunsets, movement.
──────────────────────────────────────────────────────────── */

const MOSAIC_ITEMS = [
  {
    id: 1, label: "The Festival People",
    gradient: "linear-gradient(145deg, #FF8C00, #FF4D8B)",
    emoji: "🎪", span: "row-span-2", // tall
    mood: "Where the beat drops",
  },
  {
    id: 2, label: "Golden Hour",
    gradient: "linear-gradient(145deg, #FFD700, #FF8C00)",
    emoji: "🌅", span: "",
    mood: "Rooftop sessions",
  },
  {
    id: 3, label: "Creators",
    gradient: "linear-gradient(145deg, #00D4FF, #00C9A7)",
    emoji: "🎧", span: "",
    mood: "Deep in the zone",
  },
  {
    id: 4, label: "The Athletes",
    gradient: "linear-gradient(145deg, #AAFF00, #00C9A7)",
    emoji: "🏃", span: "col-span-2", // wide
    mood: "Push the limit",
  },
  {
    id: 5, label: "Beach Club",
    gradient: "linear-gradient(145deg, #00D4FF, #FF4D8B)",
    emoji: "🏖️", span: "row-span-2", // tall
    mood: "Summer never ends",
  },
  {
    id: 6, label: "Night Mode",
    gradient: "linear-gradient(145deg, #C2185B, #9C27B0)",
    emoji: "🌙", span: "",
    mood: "After hours",
  },
  {
    id: 7, label: "Morning Run",
    gradient: "linear-gradient(145deg, #FFD700, #AAFF00)",
    emoji: "☀️", span: "",
    mood: "First light",
  },
];

const TESTIMONIALS = [
  { name: "Alex R.", role: "DJ & Producer", text: "VUDU is the only energy drink that doesn't taste like chemicals. I keep Mango Blast in my rider.", star: 5 },
  { name: "Maya K.", role: "Athlete & Coach", text: "Clean energy without the jitters. Berry Rush is my pre-workout and I'm never going back.", star: 5 },
  { name: "Jordan L.", role: "Creative Director", text: "The can alone makes me want to put it in my videos. Tropical Wave is dangerously good.", star: 5 },
];

export default function LifestyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const col1Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-40"
      style={{
        background: "linear-gradient(170deg, #0A0908 0%, #0f0f16 100%)",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,140,0,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(255,77,139,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
            <span className="font-heading text-xs text-white/50 tracking-widest uppercase">
              The VUDU Life
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display font-black text-[clamp(60px,9vw,130px)] leading-none tracking-tight text-white">
              Every moment
              <br />
              <span className="shimmer-text">deserves VUDU.</span>
            </h2>
            <p className="font-body text-lg text-white/45 max-w-sm leading-relaxed lg:text-right">
              From early morning runs to late night sets —
              VUDU shows up wherever you bring the energy.
            </p>
          </div>
        </motion.div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {MOSAIC_ITEMS.map((item, i) => {
            const colAnim = i % 3 === 0 ? col1Y : i % 3 === 1 ? col2Y : col3Y;
            return (
              <Link href="https://instagram.com/drinkvudu" target="_blank" rel="noopener noreferrer" key={item.id}>
              <motion.div
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.span}`}
                style={{
                  y: colAnim,
                  minHeight: item.span.includes("row-span-2") ? 380 : 180,
                }}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                {/* ASSET PLACEHOLDER — replace this div with <Image> */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: item.gradient }}
                >
                  {/* Center emoji as placeholder for photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span style={{ fontSize: 64, opacity: 0.4 }}>{item.emoji}</span>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Card label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <div className="font-body text-xs text-white/50 uppercase tracking-widest mb-1">
                    {item.mood}
                  </div>
                  <div className="font-display font-black text-3xl text-white leading-tight">
                    {item.label}
                  </div>
                </div>

                {/* Hover shine */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                  }}
                />
              </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="glass-dark rounded-2xl p-6 flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.star }).map((_, si) => (
                  <span key={si} className="text-vudu-citrus text-sm">★</span>
                ))}
              </div>

              <p className="font-body text-sm text-white/70 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm text-white"
                  style={{ background: "linear-gradient(135deg, #FF8C00, #FF4D8B)" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-heading font-semibold text-sm text-white/90">{t.name}</div>
                  <div className="font-body text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
