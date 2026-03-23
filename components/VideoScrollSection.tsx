"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { FLAVORS } from "@/lib/utils";

export default function VideoScrollSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0); // 0=peach-mango  1=green-apple  2=tropical-punch

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress → 3 phases
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v < 0.34)      setPhase(0);
      else if (v < 0.67) setPhase(1);
      else               setPhase(2);
    });
    return unsub;
  }, [scrollYProgress]);

  const canScale   = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.7, 1.1, 1.1, 0.7]);
  const bgOpacity  = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const springScale = useSpring(canScale, { stiffness: 80, damping: 20 });

  const currentFlavor = FLAVORS[phase];

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Dark background with animated color tint */}
        <motion.div className="absolute inset-0" style={{ opacity: bgOpacity }}>
          <div className="absolute inset-0" style={{ background: "#08070A" }} />
          <motion.div
            key={phase}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% 50%,
                ${currentFlavor.glow.replace("0.55", "0.3")} 0%,
                rgba(8,7,10,0.92) 65%
              )`,
            }}
          />
          <SplashParticles flavor={phase} />
        </motion.div>

        {/* Center can photo */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <motion.div style={{ scale: springScale }}>
            <motion.div
              key={phase}
              initial={{ rotateY: -20, opacity: 0, scale: 0.9 }}
              animate={{ rotateY: 0,   opacity: 1, scale: 1   }}
              exit={{   rotateY: 20,   opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: 900, width: "clamp(180px,22vw,300px)", height: "clamp(280px,34vw,460px)", position: "relative" }}
            >
              <Image
                src={currentFlavor.image}
                alt={`VUDU ${currentFlavor.name}`}
                fill
                className="object-contain"
                style={{
                  filter: `drop-shadow(0 0 60px ${currentFlavor.glow}) drop-shadow(0 20px 40px rgba(0,0,0,0.5))`,
                }}
                unoptimized
              />
            </motion.div>
          </motion.div>

          {/* Flavor name */}
          <motion.div
            key={`label-${phase}`}
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{ y: -20,   opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              className="font-display font-black text-[clamp(40px,7vw,100px)] leading-none tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${currentFlavor.primary}, ${currentFlavor.secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {currentFlavor.name}
            </div>
            <div className="font-heading text-sm text-white/50 tracking-widest uppercase mt-2">
              {currentFlavor.tagline}
            </div>
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {FLAVORS.map((f, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: phase === i ? 40 : 12,
                background: phase === i
                  ? `linear-gradient(to right, ${f.primary}, ${f.secondary})`
                  : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <span
            className="font-heading text-xs text-white/30 tracking-widest uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll to explore
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        </div>

        {/* Label pill */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-dark rounded-full px-5 py-2">
          <span className="font-heading text-xs text-white/40 tracking-widest uppercase">
            Flavor Journey
          </span>
        </div>
      </div>
    </section>
  );
}

/* Particle background — deterministic, no Math.random() */
function SplashParticles({ flavor }: { flavor: number }) {
  const flavorColors = [
    ["#E8860A", "#FFD000", "#FF6B47"],   // peach mango
    ["#3DBB00", "#A8FF00", "#00AA44"],   // green apple
    ["#E82200", "#FF6200", "#FF9900"],   // tropical punch
  ];

  const colors = flavorColors[flavor] ?? flavorColors[0];
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (i * 137.508) % 100,
    y: (i * 97.321) % 100,
    size: 4 + (i % 5) * 3.2,
    opacity: 0.12 + (i % 5) * 0.06,
    dur: 3 + (i % 6) * 0.8,
    delay: (i % 5) * 0.8,
    color: colors[i % colors.length],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color,
            opacity: p.opacity,
            filter: `blur(${p.size * 0.5}px)`,
            animation: `floatSlow ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: "30vw", height: "30vw",
            left: `${20 + i * 25}%`, top: `${30 + i * 15}%`,
            background: `radial-gradient(circle, ${colors[i % colors.length]}55 0%, transparent 70%)`,
            filter: "blur(60px)",
            animation: `orb-drift ${8 + i * 3}s ease-in-out ${i * 2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
