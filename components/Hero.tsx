"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowDown, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* Floating particle data */
const PARTICLES = [
  { emoji: "🥭", x: "8%",  y: "18%", size: 56, delay: 0,    dur: 5.5, rot: -15 },
  { emoji: "🍋", x: "78%", y: "12%", size: 44, delay: 0.8,  dur: 4.8, rot: 12  },
  { emoji: "🫐", x: "88%", y: "55%", size: 48, delay: 1.5,  dur: 6.2, rot: -8  },
  { emoji: "🍍", x: "5%",  y: "65%", size: 40, delay: 0.4,  dur: 5.1, rot: 20  },
  { emoji: "💧", x: "72%", y: "78%", size: 32, delay: 1.1,  dur: 3.8, rot: 0   },
  { emoji: "⚡", x: "18%", y: "82%", size: 28, delay: 0.6,  dur: 4.2, rot: 10  },
  { emoji: "🥭", x: "92%", y: "28%", size: 36, delay: 2.0,  dur: 5.8, rot: -20 },
  { emoji: "💧", x: "30%", y: "8%",  size: 24, delay: 1.7,  dur: 4.5, rot: 5   },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canRef     = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const canY      = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const canScale  = useTransform(scrollYProgress, [0, 0.6], [1, 0.8]);
  const canRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const titleY    = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const bgOpacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);
  const springY   = useSpring(canY, { stiffness: 80, damping: 20 });

  // GSAP entrance for particles
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-particle",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, stagger: 0.08, ease: "back.out(1.7)", delay: 0.6 }
      );

      gsap.fromTo(".hero-title-word",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.9 }
      );

      gsap.fromTo(".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 1.1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110dvh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(255,140,0,0.18) 0%, rgba(255,215,0,0.08) 40%, transparent 70%), #FAFAF5",
      }}
    >
      {/* ── Animated background orbs ─────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb"
          style={{
            width: "60vw", height: "60vw",
            top: "-20vw", left: "-10vw",
            background: "radial-gradient(circle, rgba(255,140,0,0.22) 0%, transparent 70%)",
            animationDelay: "0s", animationDuration: "14s",
          }}
        />
        <div
          className="orb"
          style={{
            width: "50vw", height: "50vw",
            top: "30%", right: "-15vw",
            background: "radial-gradient(circle, rgba(255,77,139,0.18) 0%, transparent 70%)",
            animationDelay: "4s", animationDuration: "16s",
          }}
        />
        <div
          className="orb"
          style={{
            width: "40vw", height: "40vw",
            bottom: "-10vw", left: "20%",
            background: "radial-gradient(circle, rgba(0,212,255,0.14) 0%, transparent 70%)",
            animationDelay: "8s", animationDuration: "12s",
          }}
        />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,9,8,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,9,8,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Floating particles ───────────────────────── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="hero-particle pointer-events-none absolute select-none"
          style={{
            left: p.x, top: p.y,
            fontSize: p.size,
            animationName: "floatSlow",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            transform: `rotate(${p.rot}deg)`,
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
            zIndex: 1,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* ── Main content ─────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[90dvh] py-24 lg:py-0">

          {/* Left — headline & CTA */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Badge */}
            <motion.div
              className="hero-sub inline-flex self-start items-center gap-2 px-4 py-2 rounded-full glass-dark"
              style={{ opacity: 0 }}
            >
              <Zap size={12} className="text-vudu-mango fill-vudu-mango" />
              <span className="font-heading text-xs text-white/80 tracking-widest uppercase">
                Premium Energy Drink
              </span>
            </motion.div>

            {/* Headline — real logo mark + slogan image
                ASSETS needed in /public/brand/:
                  logo-v.png      → the cyan or red liquid "V" (transparent bg)
                  slogan.png      → the slogan text (white version, transparent bg)
                Text headline shown as fallback / complement below the images.
            */}
            <motion.div
              ref={titleRef}
              style={{ y: titleY }}
              className="flex flex-col gap-1"
            >
              <h1 className="font-display font-black leading-none tracking-tight">
                <span
                  className="hero-title-word block text-[clamp(80px,13vw,180px)]"
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #FF8C00 0%, #FFD700 40%, #FF4D8B 80%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0,
                  }}
                >
                  DO YOU VUDU
                </span>
              </h1>
            </motion.div>

            {/* Sub */}
            <p
              className="hero-sub font-body text-lg lg:text-xl text-vudu-dark/60 max-w-md leading-relaxed"
              style={{ opacity: 0 }}
            >
              Crafted for those who live at full voltage.
              <br />
              <strong className="text-vudu-dark/80 font-semibold">Smooth energy. Bold flavors. Pure VUDU.</strong>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                className="hero-cta btn-primary text-white"
                style={{
                  background: "linear-gradient(135deg, #FF8C00, #FFD700)",
                  boxShadow: "0 8px 40px rgba(255,140,0,0.45), 0 2px 8px rgba(0,0,0,0.1)",
                  opacity: 0,
                }}
                onClick={() => document.querySelector("#flavors")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Zap size={15} className="fill-white" />
                Explore Flavors
              </button>
              <button
                className="hero-cta btn-ghost text-vudu-dark border-vudu-dark/25 hover:border-vudu-dark/50"
                style={{ opacity: 0 }}
                onClick={() => document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" })}
              >
                Our Story
              </button>
            </div>

            {/* Stats row */}
            <motion.div
              className="hero-sub flex gap-8 pt-4 border-t border-vudu-dark/10"
              style={{ opacity: 0 }}
            >
              {[
                { val: "160mg", label: "Natural Caffeine" },
                { val: "3",     label: "Bold Flavors" },
                { val: "Zero",  label: "Artificial Colors" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-display font-black text-5xl text-vudu-dark">{stat.val}</span>
                  <span className="font-body text-xs text-vudu-dark/50 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Can */}
          <div className="flex items-center justify-center relative">
            {/* Radial glow behind can */}
            <div
              className="absolute rounded-full"
              style={{
                width: "70%", height: "70%",
                background: "radial-gradient(circle, rgba(255,140,0,0.35) 0%, rgba(255,215,0,0.2) 40%, transparent 70%)",
                filter: "blur(40px)",
                animation: "pulseGlow 3s ease-in-out infinite",
              }}
            />
            {/* Orbiting ring */}
            <div
              className="absolute rounded-full border border-vudu-mango/20"
              style={{
                width: "85%", height: "85%",
                animation: "spin 20s linear infinite",
                borderStyle: "dashed",
              }}
            />
            <div
              className="absolute rounded-full border border-vudu-pink/15"
              style={{
                width: "105%", height: "105%",
                animation: "spin 35s linear infinite reverse",
              }}
            />

            {/* Can with scroll parallax */}
            <motion.div
              ref={canRef}
              style={{ y: springY, scale: canScale, rotateZ: canRotate }}
              className="relative z-10"
            >
              <Image
                src="/drinks/peach-mango.png"
                alt="VUDU Peach Mango Energy Drink"
                width={420}
                height={600}
                className="object-contain drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 40px 80px rgba(255,140,0,0.35))" }}
                priority
                unoptimized
              />
            </motion.div>

            {/* Floating flavor badges */}
            {[
              { x: "-40px", y: "10%",  flavor: "Peach Mango",    color: "#E8860A", delay: 1.4 },
              { x: "auto",  y: "20%",  flavor: "Green Apple",    color: "#3DBB00", delay: 1.6, right: "-40px" },
              { x: "-50px", y: "72%",  flavor: "Tropical Punch", color: "#E82200", delay: 1.8 },
            ].map((badge, i) => (
              <motion.div
                key={i}
                className="absolute glass-dark rounded-full px-3 py-1.5 flex items-center gap-2 hero-cta"
                style={{
                  left: badge.x !== "auto" ? badge.x : undefined,
                  right: badge.right,
                  top: badge.y,
                  opacity: 0,
                }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { delay: badge.delay, duration: 0.5 },
                  y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: badge.color }} />
                <span className="font-heading text-white/80 text-xs tracking-wide">{badge.flavor}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: bgOpacity }}
      >
        <span className="font-heading text-xs text-vudu-dark/40 tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="text-vudu-dark/40" />
      </motion.div>

      {/* ── Ticker bar ───────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FF8C00, #FF4D8B, #FFD700, #00D4FF, #FF8C00)",
          backgroundSize: "300% 100%",
          animation: "gradientShift 8s ease infinite",
        }}
      >
        <div
          className="flex items-center h-full whitespace-nowrap animate-ticker"
          style={{ width: "200%" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-black text-xl text-white/90 tracking-widest uppercase mx-8"
            >
              VUDU ENERGY DRINK •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
