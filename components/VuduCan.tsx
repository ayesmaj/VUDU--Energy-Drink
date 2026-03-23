"use client";

import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────
   VuduCan — CSS-based premium energy drink can visual
   REPLACE: Swap the div markup below with your actual
   3D can render / PNG / WebP when final assets are ready.
───────────────────────────────────────────────────────── */

interface CanProps {
  flavor?: "mango" | "citrus" | "berry" | "tropical";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
  rotate?: number; // degrees
}

const FLAVOR_STYLES = {
  mango: {
    body: "linear-gradient(160deg, #FF8C00 0%, #FFD700 55%, #FF6B47 100%)",
    stripe: "rgba(255,220,80,0.5)",
    ring: "linear-gradient(to bottom, #D4AF37, #A0820A)",
    label: "#0A0908",
    glow: "rgba(255,140,0,0.45)",
    accent: "#FFD700",
    name: "MANGO",
    sub: "BLAST",
  },
  citrus: {
    body: "linear-gradient(160deg, #FFD700 0%, #AAFF00 55%, #FFA500 100%)",
    stripe: "rgba(200,255,100,0.5)",
    ring: "linear-gradient(to bottom, #D4C200, #8A9000)",
    label: "#0A0908",
    glow: "rgba(200,220,0,0.45)",
    accent: "#AAFF00",
    name: "CITRUS",
    sub: "STORM",
  },
  berry: {
    body: "linear-gradient(160deg, #FF4D8B 0%, #C2185B 50%, #9C27B0 100%)",
    stripe: "rgba(255,150,200,0.4)",
    ring: "linear-gradient(to bottom, #C0507A, #880030)",
    label: "#FAFAF5",
    glow: "rgba(255,77,139,0.45)",
    accent: "#FF4D8B",
    name: "BERRY",
    sub: "RUSH",
  },
  tropical: {
    body: "linear-gradient(160deg, #00D4FF 0%, #00C9A7 50%, #0077AA 100%)",
    stripe: "rgba(100,240,240,0.4)",
    ring: "linear-gradient(to bottom, #0099BB, #005577)",
    label: "#FAFAF5",
    glow: "rgba(0,200,220,0.45)",
    accent: "#00D4FF",
    name: "TROPICAL",
    sub: "WAVE",
  },
};

const SIZE_MAP = {
  sm:  { w: 80,  h: 190 },
  md:  { w: 110, h: 260 },
  lg:  { w: 150, h: 360 },
  xl:  { w: 200, h: 480 },
};

export default function VuduCan({
  flavor = "mango",
  size = "md",
  className,
  animate = false,
  rotate = 0,
}: CanProps) {
  const s = FLAVOR_STYLES[flavor];
  const { w, h } = SIZE_MAP[size];

  const fontSize = {
    sm:  { brand: 10, flavor: 7,  sub: 6,  energy: 5 },
    md:  { brand: 14, flavor: 9,  sub: 8,  energy: 7 },
    lg:  { brand: 20, flavor: 13, sub: 10, energy: 9 },
    xl:  { brand: 26, flavor: 17, sub: 13, energy: 11 },
  }[size];

  const capH = Math.round(h * 0.09);
  const rimH = Math.round(h * 0.04);

  return (
    /* ASSET PLACEHOLDER — replace this entire div with:
       <Image src="/cans/vudu-mango.png" width={w} height={h} alt="VUDU Mango Blast" />
       or your Three.js / React Three Fiber canvas component */
    <div
      className={cn("relative select-none", animate && "can-3d", className)}
      style={{
        width: w,
        height: h,
        transform: rotate ? `rotateY(${rotate}deg)` : undefined,
        filter: `drop-shadow(0 ${h * 0.1}px ${h * 0.2}px ${s.glow})
                 drop-shadow(0 ${h * 0.03}px ${h * 0.04}px rgba(0,0,0,0.4))`,
      }}
    >
      {/* ── Top dome ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "4%",
          right: "4%",
          height: capH,
          background: "linear-gradient(to bottom, #D8D8D8, #B0B0B0)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          zIndex: 3,
          boxShadow: "inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -2px 4px rgba(0,0,0,0.2)",
        }}
      />
      {/* Tab on top */}
      <div
        style={{
          position: "absolute",
          top: capH * 0.1,
          left: "50%",
          transform: "translateX(-50%)",
          width: w * 0.18,
          height: capH * 0.6,
          background: "linear-gradient(to bottom, #E0E0E0, #999)",
          borderRadius: "4px 4px 8px 8px",
          zIndex: 4,
        }}
      />

      {/* ── Can body ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: capH * 0.85,
          left: 0,
          right: 0,
          bottom: capH * 0.85,
          background: s.body,
          overflow: "hidden",
        }}
      >
        {/* Left shadow edge */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "14%",
          background: "linear-gradient(to right, rgba(0,0,0,0.35), transparent)",
        }} />
        {/* Right shadow edge */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "14%",
          background: "linear-gradient(to left, rgba(0,0,0,0.3), transparent)",
        }} />
        {/* Primary highlight reflection */}
        <div style={{
          position: "absolute", left: "12%", top: "5%", bottom: "5%",
          width: "14%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%)",
          borderRadius: "50%",
          filter: "blur(4px)",
        }} />
        {/* Secondary thin highlight */}
        <div style={{
          position: "absolute", left: "28%", top: "8%", bottom: "8%",
          width: "5%",
          background: "rgba(255,255,255,0.2)",
          borderRadius: "50%",
          filter: "blur(2px)",
        }} />

        {/* Label area */}
        <div style={{
          position: "absolute",
          left: "15%", right: "15%",
          top: "22%", bottom: "22%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}>
          {/* VUDU logo */}
          <div style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 800,
            fontSize: fontSize.brand,
            color: s.label,
            letterSpacing: "0.15em",
            lineHeight: 1,
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}>
            VUDU
          </div>
          {/* Flavor name */}
          <div style={{
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 700,
            fontSize: fontSize.flavor,
            color: s.label,
            letterSpacing: "0.1em",
            lineHeight: 1,
            opacity: 0.9,
          }}>
            {s.name}
          </div>
          <div style={{
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 700,
            fontSize: fontSize.sub,
            color: s.label,
            letterSpacing: "0.15em",
            lineHeight: 1,
            opacity: 0.75,
          }}>
            {s.sub}
          </div>
          {/* Divider */}
          <div style={{
            width: "60%", height: 1,
            background: `rgba(${s.label === "#FAFAF5" ? "255,255,255" : "0,0,0"},0.3)`,
            margin: "3px 0",
          }} />
          {/* Energy Drink text */}
          <div style={{
            fontFamily: "var(--font-space), sans-serif",
            fontWeight: 400,
            fontSize: fontSize.energy,
            color: s.label,
            letterSpacing: "0.2em",
            opacity: 0.6,
            textTransform: "uppercase",
          }}>
            ENERGY DRINK
          </div>
        </div>

        {/* Bottom accent stripe */}
        <div style={{
          position: "absolute",
          bottom: "15%", left: 0, right: 0,
          height: "8%",
          background: s.stripe,
          opacity: 0.6,
        }} />
      </div>

      {/* ── Rim (top) ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: capH * 0.85 - rimH * 0.5,
          left: "2%", right: "2%",
          height: rimH,
          background: "linear-gradient(to bottom, #C0C0C0, #888)",
          borderRadius: 2,
          zIndex: 2,
        }}
      />
      {/* ── Rim (bottom) ──────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: capH * 0.85 - rimH * 0.5,
          left: "2%", right: "2%",
          height: rimH,
          background: "linear-gradient(to top, #C0C0C0, #888)",
          borderRadius: 2,
          zIndex: 2,
        }}
      />

      {/* ── Bottom dome ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "4%", right: "4%",
          height: capH,
          background: s.ring,
          borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          zIndex: 3,
          boxShadow: "inset 0 -2px 6px rgba(255,255,255,0.3), inset 0 2px 4px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}
