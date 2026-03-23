"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const STORY_PANELS = [
  {
    id: 1,
    headline: "Born from the juice.",
    body: "VUDU started with one obsession: make an energy drink that actually tastes like the real fruit on the label. No artificial shortcuts. No compromise.",
    accent: "#FF8C00",
    bg: "linear-gradient(145deg, #FF8C00 0%, #FFD700 60%, #FF6B47 100%)",
    canImage: "/drinks/peach-mango.png",
    align: "left",
  },
  {
    id: 2,
    headline: "Energy, but make it smooth.",
    body: "160mg of clean caffeine from green coffee extract. No crash. No jitters. Just a clean, steady rise — the kind that lets you own the moment.",
    accent: "#00D4FF",
    bg: "linear-gradient(145deg, #0A0908 0%, #1A1A2E 60%, #0077AA 100%)",
    canImage: "/drinks/tropical.png",
    align: "right",
    dark: true,
  },
  {
    id: 3,
    headline: "Made for the makers.",
    body: "Creators. Athletes. Night owls. Early risers. VUDU is the drink for people who refuse to settle — and refuse to be boring.",
    accent: "#FF4D8B",
    bg: "linear-gradient(145deg, #FF4D8B 0%, #C2185B 50%, #9C27B0 100%)",
    canImage: "/drinks/apple.png",
    align: "left",
    dark: true,
  },
];

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative"
      style={{ background: "#0A0908" }}
    >
      {/* Angled entry from hero */}
      <div
        className="absolute -top-[4vw] left-0 right-0 h-[8vw] z-10"
        style={{ background: "#0A0908", clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32">
        {/* Section intro */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
            <span className="font-heading text-xs text-white/50 tracking-widest uppercase">The VUDU World</span>
          </div>
          <h2
            className="font-display font-black text-[clamp(60px,10vw,140px)] leading-none tracking-tight"
            style={{ color: "#FAFAF5" }}
          >
            Enter the
            <br />
            <span className="shimmer-text">VUDU Universe</span>
          </h2>
        </motion.div>

        {/* Story panels */}
        <div className="flex flex-col gap-6 lg:gap-4">
          {STORY_PANELS.map((panel, i) => (
            <StoryPanel key={panel.id} panel={panel} index={i} />
          ))}
        </div>
      </div>

      {/* Angled bottom exit */}
      <div
        className="absolute -bottom-[4vw] left-0 right-0 h-[8vw] z-10"
        style={{ background: "#FAFAF5", clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </section>
  );
}

function StoryPanel({
  panel,
  index,
}: {
  panel: (typeof STORY_PANELS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: panel.bg,
        minHeight: "clamp(320px, 40vw, 480px)",
        transformOrigin: panel.align === "left" ? "right center" : "left center",
      }}
      initial={{
        opacity: 0,
        x: panel.align === "left" ? -80 : 80,
        rotateZ: panel.align === "left" ? -2 : 2,
      }}
      whileInView={{ opacity: 1, x: 0, rotateZ: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className={`relative z-10 h-full flex items-center gap-8 lg:gap-16 p-8 lg:p-14 ${
          panel.align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        {/* Text content */}
        <div className="flex-1 flex flex-col gap-6">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: panel.accent }}
          />
          <h3
            className="font-display font-black text-[clamp(48px,7vw,100px)] leading-none tracking-tight"
            style={{ color: panel.dark ? "#FAFAF5" : "#0A0908" }}
          >
            {panel.headline}
          </h3>
          <p
            className="font-body text-base lg:text-lg leading-relaxed max-w-md"
            style={{ color: panel.dark ? "rgba(250,250,245,0.65)" : "rgba(10,9,8,0.65)" }}
          >
            {panel.body}
          </p>

          <Link href="/story">
            <motion.button
              className="self-start btn-ghost text-sm"
              style={{
                color: panel.dark ? "rgba(250,250,245,0.8)" : "rgba(10,9,8,0.8)",
                borderColor: panel.dark ? "rgba(250,250,245,0.25)" : "rgba(10,9,8,0.2)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.button>
          </Link>
        </div>

        {/* Can visual */}
        <motion.div
          className="flex-shrink-0 hidden sm:flex items-center justify-center"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative" style={{ width: 160, height: 256 }}>
            <Image
              src={panel.canImage}
              alt="VUDU Energy Drink"
              fill
              className="object-contain"
              style={{ filter: `drop-shadow(0 20px 40px ${panel.accent}55) drop-shadow(0 4px 16px rgba(0,0,0,0.3))` }}
              unoptimized
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative number */}
      <div
        className="absolute bottom-6 right-8 font-display font-black text-[120px] leading-none select-none pointer-events-none"
        style={{
          color: panel.dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
          lineHeight: 1,
        }}
      >
        0{panel.id}
      </div>
    </motion.div>
  );
}
