"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";

const MILESTONES = [
  { year: "2021", title: "The Obsession Begins", body: "Two friends refuse to accept that energy drinks have to taste artificial. One garage. One mission. Real fruit. Real energy." },
  { year: "2022", title: "First Batch, First Believers", body: "500 cans. Hand-delivered. Sold out in 48 hours. VUDU wasn't just a drink — it was a movement in the making." },
  { year: "2023", title: "Born in LA", body: "From the garage to Los Angeles. VUDU hits 200 stores, gets picked up by 3 distribution partners, and drops its first national campaign." },
  { year: "2024", title: "Three Flavors, One Family", body: "Peach Mango, Green Apple, Tropical Punch — the lineup is complete. VUDU crosses $1M in sales and the community keeps growing." },
  { year: "2025", title: "Going Global", body: "Available in 30+ countries. Zero artificial colors. Still the same obsession that started it all — make something that actually tastes like the label says." },
];

const VALUES = [
  { icon: "🌿", title: "Real Ingredients", desc: "Every flavor is built on real fruit extracts. Zero artificial colors, zero shortcuts." },
  { icon: "⚡", title: "Clean Energy", desc: "160mg from green coffee extract. No crash. No jitters. Just a clean, steady rise." },
  { icon: "♻️", title: "Planet First", desc: "100% recyclable cans. Carbon-neutral shipping by 2026. The planet comes with the drink." },
  { icon: "🤝", title: "Community Driven", desc: "Built by drinkers, for drinkers. VUDU ambassadors shape every new flavor and campaign." },
];

export default function StoryContent() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0908" }}>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,140,0,0.2) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Zap size={12} className="text-vudu-mango fill-vudu-mango" />
            <span className="font-heading text-xs text-white/60 tracking-widest uppercase">Our Story</span>
          </motion.div>

          <motion.h1
            className="font-display font-black text-[clamp(56px,9vw,130px)] leading-none tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Born from the
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #E8860A 0%, #FFD000 50%, #FF6B47 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              juice.
            </span>
          </motion.h1>

          <motion.p
            className="font-body text-lg lg:text-xl text-white/50 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            VUDU started with one obsession: make an energy drink that actually tastes like the real fruit on the label. No artificial shortcuts. No compromise.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6" id="ingredients">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="p-6 rounded-2xl flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <span className="text-3xl">{v.icon}</span>
                <div className="font-display font-black text-2xl text-white">{v.title}</div>
                <p className="font-body text-sm text-white/45 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-display font-black text-[clamp(48px,7vw,100px)] leading-none text-white mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            The Journey
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[88px] top-0 bottom-0 w-px hidden md:block"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />

            <div className="flex flex-col gap-12">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex gap-8 items-start"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                >
                  <div className="flex-shrink-0 w-20 text-right">
                    <span
                      className="font-display font-black text-2xl"
                      style={{
                        background: "linear-gradient(135deg, #E8860A, #FFD000)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {m.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="flex-shrink-0 relative hidden md:flex">
                    <div
                      className="w-3 h-3 rounded-full mt-2"
                      style={{
                        background: "linear-gradient(135deg, #E8860A, #FFD000)",
                        boxShadow: "0 0 12px rgba(232,134,10,0.6)",
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-black text-2xl text-white mb-2">{m.title}</h3>
                    <p className="font-body text-base text-white/50 leading-relaxed">{m.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 px-6" id="sustainability">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display font-black text-[clamp(48px,7vw,100px)] leading-none text-white mb-6">
              Built to last — <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #3DBB00, #A8FF00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                for the planet.
              </span>
            </h2>
            <p className="font-body text-lg text-white/45 max-w-xl mx-auto leading-relaxed mb-12">
              100% recyclable aluminum cans. Carbon-neutral shipping by 2026. Every VUDU you drink is one step toward a cleaner world.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm"
                style={{
                  background: "linear-gradient(135deg, #E8860A, #FFD000)",
                  boxShadow: "0 8px 32px rgba(232,134,10,0.4)",
                }}
              >
                <Zap size={14} className="fill-white" /> Shop Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white/70 text-sm"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
