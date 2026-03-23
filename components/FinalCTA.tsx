"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Zap, ShoppingBag, Instagram, Twitter } from "lucide-react";
import { FLAVORS } from "@/lib/utils";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const canY1 = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const canY2 = useTransform(scrollYProgress, [0, 1], [120, -10]);
  const canY3 = useTransform(scrollYProgress, [0, 1], [60, -50]);
  const canY4 = useTransform(scrollYProgress, [0, 1], [100, -20]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-40"
      style={{
        background: "#0A0908",
      }}
    >
      {/* Animated gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(255,140,0,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 80% 20%, rgba(255,77,139,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,215,0,0.08) 0%, transparent 60%)
          `,
          animation: "gradientShift 12s ease infinite",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating cans in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLAVORS.map((f, i) => {
          const y = [canY1, canY2, canY3][i];
          const positions = [
            { left: "5%",  top: "8%"  },
            { left: "76%", top: "4%"  },
            { left: "82%", top: "55%" },
          ][i];
          return (
            <motion.div
              key={f.id}
              className="absolute"
              style={{ ...positions, y, opacity: 0.15, width: 120, height: 192 }}
            >
              <Image
                src={f.image}
                alt={f.name}
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark">
            <div className="w-2 h-2 rounded-full bg-vudu-mango animate-pulse-glow" />
            <span className="font-heading text-xs text-white/60 tracking-widest uppercase">
              Available Now
            </span>
          </div>

          <h2
            className="font-display font-black text-[clamp(80px,13vw,200px)] leading-none tracking-tight"
            style={{ color: "#FAFAF5" }}
          >
            Ready to feel
            <br />
            <span className="shimmer-text">the VUDU?</span>
          </h2>

          <p className="font-body text-lg lg:text-xl text-white/50 max-w-lg leading-relaxed">
            Join the VUDU family. Order online, find us in stores,
            or connect with us on social for drops and giveaways.
          </p>
        </motion.div>

        {/* Can row showcase */}
        <motion.div
          className="flex items-end justify-center gap-2 sm:gap-6 my-16 px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {FLAVORS.map((f, i) => (
            <motion.div
              key={f.id}
              className="flex flex-col items-center gap-3"
              animate={{ y: [0, -10 - i * 3, 0] }}
              transition={{
                duration: 3.5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              whileHover={{ scale: 1.08, y: -16 }}
            >
              <div
                className="relative"
                style={{ width: "clamp(90px,14vw,160px)", height: "clamp(144px,22vw,256px)" }}
              >
                <Image
                  src={f.image}
                  alt={`VUDU ${f.name}`}
                  fill
                  className="object-contain"
                  style={{
                    filter: `drop-shadow(0 20px 40px ${f.glow}) drop-shadow(0 4px 12px rgba(0,0,0,0.4))`,
                  }}
                  unoptimized
                />
              </div>
              <div
                className="font-heading text-xs tracking-widest uppercase"
                style={{ color: f.primary }}
              >
                {f.fruit} {f.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/shop">
            <motion.div
              className="btn-primary text-white text-base px-10 py-5 cursor-pointer inline-flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #E8860A, #FFD000)",
                boxShadow: "0 12px 48px rgba(232,134,10,0.5), 0 4px 16px rgba(0,0,0,0.2)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag size={18} />
              Shop Now
            </motion.div>
          </Link>

          <Link href="/contact#stores">
            <motion.div
              className="btn-ghost text-white/70 border-white/20 text-base px-8 py-5 cursor-pointer inline-flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Zap size={16} />
              Find a Store
            </motion.div>
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-8 mt-16 pt-12 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <span className="font-heading text-sm text-white/30 tracking-widest uppercase">
            Follow VUDU
          </span>
          {[
            { Icon: Instagram, label: "@vuduenergy", href: "https://instagram.com/drinkvudu" },
            { Icon: Twitter,   label: "@vududrink",  href: "https://twitter.com/vududrink"    },
          ].map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
              whileHover={{ y: -2 }}
            >
              <Icon size={18} />
              <span className="font-heading text-sm tracking-wide">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Premium tagline */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="font-display font-black text-7xl lg:text-9xl text-white/5 tracking-widest uppercase select-none">
            FEEL THE VUDU
          </div>
        </motion.div>
      </div>
    </section>
  );
}
