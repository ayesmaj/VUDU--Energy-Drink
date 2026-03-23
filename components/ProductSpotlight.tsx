"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DETAIL_POINTS = [
  {
    x: "18%", y: "20%",
    title: "Premium Lid",
    desc: "Aerospace-grade aluminum",
    align: "left",
  },
  {
    x: "76%", y: "32%",
    title: "Label Art",
    desc: "Full-wrap premium print",
    align: "right",
  },
  {
    x: "20%", y: "65%",
    title: "Cold-Grip Body",
    desc: "Embossed grip zones",
    align: "left",
  },
  {
    x: "74%", y: "72%",
    title: "Zero-Leak Seal",
    desc: "Dual-stage pressure seal",
    align: "right",
  },
];

export default function ProductSpotlight() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canRef       = useRef<HTMLDivElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const canY      = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const canRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const canScale  = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.85, 1.05, 0.9]);
  const glowSize  = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["40%", "80%", "40%"]);

  const springY      = useSpring(canY, { stiffness: 60, damping: 18 });
  const springRotate = useSpring(canRotate, { stiffness: 60, damping: 18 });
  const springScale  = useSpring(canScale, { stiffness: 80, damping: 20 });

  // GSAP detail point reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".detail-point", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: false,
        },
      });

      // Can spotlight reveal
      gsap.from(".can-spotlight", {
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          scrub: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-40"
      style={{
        background: "linear-gradient(170deg, #FAFAF5 0%, #FFF8EE 50%, #FFF0F5 100%)",
      }}
    >
      {/* Soft ambient orbs */}
      <div
        className="orb"
        style={{
          width: "60vw", height: "60vw",
          top: "-10%", left: "-10%",
          background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
          animationDuration: "18s",
        }}
      />
      <div
        className="orb"
        style={{
          width: "50vw", height: "50vw",
          bottom: "-10%", right: "-5%",
          background: "radial-gradient(circle, rgba(255,77,139,0.12) 0%, transparent 70%)",
          animationDuration: "20s", animationDelay: "6s",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vudu-dark/6 mb-6">
            <span className="font-heading text-xs text-vudu-dark/60 tracking-widest uppercase">
              Crafted to Perfection
            </span>
          </div>
          <h2 className="font-display font-black text-[clamp(60px,9vw,130px)] leading-none tracking-tight text-vudu-dark">
            The can itself
            <br />
            <span className="text-gradient-mango">is art.</span>
          </h2>
        </motion.div>

        {/* Main spotlight */}
        <div className="relative flex items-center justify-center min-h-[600px] lg:min-h-[700px]">
          {/* Multi-layer glow */}
          <motion.div
            ref={glowRef}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: glowSize, height: glowSize,
              background:
                "radial-gradient(circle, rgba(255,140,0,0.4) 0%, rgba(255,215,0,0.25) 40%, rgba(255,77,139,0.15) 70%, transparent 100%)",
              filter: "blur(40px)",
              left: "50%", top: "50%",
              x: "-50%", y: "-50%",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "50%", height: "50%",
              background:
                "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              animation: "pulseGlow 3s ease-in-out infinite",
            }}
          />

          {/* Orbiting rings */}
          {[1, 1.3, 1.6].map((scale, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${scale * 340}px`, height: `${scale * 340}px`,
                border: `1px solid rgba(255,140,0,${0.12 - i * 0.03})`,
                left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                animation: `spin ${20 + i * 8}s linear ${i % 2 === 0 ? "normal" : "reverse"} infinite`,
              }}
            />
          ))}

          {/* The Can — real product photo */}
          <motion.div
            className="can-spotlight relative z-10"
            ref={canRef}
            style={{
              y: springY, rotate: springRotate, scale: springScale,
              width: "clamp(200px,26vw,340px)",
              height: "clamp(320px,42vw,540px)",
              position: "relative",
            }}
          >
            <Image
              src="/drinks/peach-mango.png"
              alt="VUDU Peach Mango Energy Drink"
              fill
              className="object-contain"
              style={{
                filter: "drop-shadow(0 40px 80px rgba(232,134,10,0.45)) drop-shadow(0 10px 30px rgba(0,0,0,0.2))",
              }}
              unoptimized
            />
          </motion.div>

          {/* Detail callout points */}
          {DETAIL_POINTS.map((point, i) => (
            <div
              key={i}
              className="detail-point absolute pointer-events-none"
              style={{ left: point.x, top: point.y }}
            >
              <div
                className={`flex items-center gap-3 ${
                  point.align === "right" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #FF8C00, #FFD700)",
                      boxShadow: "0 0 12px rgba(255,140,0,0.6)",
                    }}
                  />
                  <div
                    className="absolute inset-0 w-3 h-3 rounded-full border border-vudu-mango/40"
                    style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
                  />
                </div>
                {/* Label */}
                <div
                  className={`glass-dark rounded-xl px-4 py-2.5 hidden md:block ${
                    point.align === "right" ? "text-right" : ""
                  }`}
                >
                  <div className="font-heading font-bold text-sm text-white">{point.title}</div>
                  <div className="font-body text-xs text-white/50">{point.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom copy */}
        <motion.div
          className="max-w-3xl mx-auto text-center mt-16 grid lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {[
            { icon: "🏆", title: "Premium Materials", desc: "Aerospace-grade aluminum with food-safe lining." },
            { icon: "🎨", title: "Full-Wrap Print",   desc: "4-color process with UV-cured coating for lasting vibrancy." },
            { icon: "♻️", title: "100% Recyclable",  desc: "Because premium shouldn't cost the planet." },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl"
              style={{ background: "rgba(10,9,8,0.04)", border: "1px solid rgba(10,9,8,0.07)" }}
            >
              <span className="text-3xl">{item.icon}</span>
              <h4 className="font-display font-black text-2xl text-vudu-dark">{item.title}</h4>
              <p className="font-body text-sm text-vudu-dark/55 leading-relaxed text-center">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
