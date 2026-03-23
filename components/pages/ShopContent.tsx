"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FLAVORS } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { Zap, ShoppingCart, Check, ArrowRight } from "lucide-react";

export default function ShopContent() {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const [qty, setQty] = useState<Record<string, number>>({});

  function handleAdd(flavor: typeof FLAVORS[number]) {
    addItem(flavor, qty[flavor.id] ?? 1);
    setAdded(flavor.id);
    setTimeout(() => { setAdded(null); openCart(); }, 900);
  }

  return (
    <div
      className="min-h-screen pt-28 pb-24"
      style={{
        background:
          "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,140,0,0.12) 0%, transparent 60%), #FAFAF5",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vudu-dark/6 mb-6">
            <ShoppingCart size={12} className="text-vudu-mango" />
            <span className="font-heading text-xs text-vudu-dark/60 tracking-widest uppercase">
              Order Online
            </span>
          </div>
          <h1 className="font-display font-black text-[clamp(56px,8vw,120px)] leading-none tracking-tight text-vudu-dark">
            Get Your
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #E8860A, #FFD000)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              VUDU
            </span>
          </h1>
          <p className="font-body text-lg text-vudu-dark/55 mt-4 max-w-md mx-auto">
            160mg natural caffeine. Zero artificial colors. Three bold flavors.
          </p>
        </motion.div>

        {/* Pack options */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {["Single Can", "12-Pack", "24-Pack", "Variety Pack"].map((pack, i) => (
            <button
              key={pack}
              className="px-5 py-2.5 rounded-full font-heading text-sm tracking-wide transition-all"
              style={{
                background: i === 1 ? "linear-gradient(135deg, #E8860A, #FFD000)" : "rgba(10,9,8,0.07)",
                color: i === 1 ? "#fff" : "#0A0908",
                boxShadow: i === 1 ? "0 8px 24px rgba(232,134,10,0.35)" : "none",
              }}
            >
              {pack}
            </button>
          ))}
        </motion.div>

        {/* Flavor cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {FLAVORS.map((f, i) => (
            <motion.div
              key={f.id}
              className="rounded-3xl overflow-hidden flex flex-col"
              style={{
                background: "#fff",
                border: `1px solid rgba(10,9,8,0.07)`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${f.glow}` }}
            >
              {/* Can image */}
              <div
                className="relative flex items-center justify-center py-10"
                style={{
                  background: `radial-gradient(circle at 50% 60%, ${f.glow} 0%, transparent 70%)`,
                  minHeight: 280,
                }}
              >
                <motion.div
                  className="relative"
                  style={{ width: 160, height: 256 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src={f.image}
                    alt={`VUDU ${f.name}`}
                    fill
                    className="object-contain"
                    style={{ filter: `drop-shadow(0 20px 40px ${f.glow})` }}
                    unoptimized
                  />
                </motion.div>

                {/* Badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-heading font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${f.primary}, ${f.secondary})` }}
                >
                  ZERO SUGAR
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-4 p-6 flex-1">
                <div>
                  <div className="font-display font-black text-3xl text-vudu-dark">{f.name}</div>
                  <div className="font-body text-xs text-vudu-dark/40 tracking-widest uppercase mt-1">{f.tagline}</div>
                </div>

                <div className="flex gap-3">
                  {[
                    { label: "Caffeine", val: `${f.caffeine}mg` },
                    { label: "Calories", val: `${f.kcal} kcal` },
                    { label: "Size", val: "355ml" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex-1 rounded-xl py-2 text-center"
                      style={{ background: `${f.primary}12` }}
                    >
                      <div className="font-heading font-bold text-sm text-vudu-dark">{s.val}</div>
                      <div className="font-body text-[10px] text-vudu-dark/40 uppercase">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-4xl text-vudu-dark">$3.99</span>
                  <span className="font-body text-sm text-vudu-dark/40">/ can</span>
                </div>

                {/* Qty + Add */}
                <div className="flex gap-3 mt-auto">
                  <div
                    className="flex items-center gap-2 rounded-xl px-3"
                    style={{ background: "rgba(10,9,8,0.05)", border: "1px solid rgba(10,9,8,0.08)" }}
                  >
                    <button
                      onClick={() => setQty((q) => ({ ...q, [f.id]: Math.max(1, (q[f.id] ?? 1) - 1) }))}
                      className="font-bold text-lg text-vudu-dark/60 hover:text-vudu-dark w-8 h-10 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="font-heading font-bold text-sm w-6 text-center">{qty[f.id] ?? 1}</span>
                    <button
                      onClick={() => setQty((q) => ({ ...q, [f.id]: (q[f.id] ?? 1) + 1 }))}
                      className="font-bold text-lg text-vudu-dark/60 hover:text-vudu-dark w-8 h-10 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <motion.button
                    onClick={() => handleAdd(f)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-heading font-bold text-sm text-white transition-all"
                    style={{
                      background: added === f.id
                        ? "#22c55e"
                        : `linear-gradient(135deg, ${f.primary}, ${f.secondary})`,
                      boxShadow: `0 8px 24px ${f.glow}`,
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <AnimatePresence mode="wait">
                      {added === f.id ? (
                        <motion.span
                          key="check"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                        >
                          <Check size={14} /> Added!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="add"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                        >
                          <ShoppingCart size={14} /> Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                <Link
                  href={`/flavors/${f.id}`}
                  className="flex items-center justify-center gap-2 font-heading text-xs tracking-widest uppercase transition-colors"
                  style={{ color: f.primary }}
                >
                  View Details <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Perks bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { icon: "🚀", title: "Free Shipping", desc: "On orders over $30" },
            { icon: "📦", title: "Bundle & Save", desc: "Up to 20% off 24-packs" },
            { icon: "🔄", title: "Easy Returns", desc: "30-day hassle-free" },
            { icon: "⚡", title: "Subscribe & Save", desc: "15% off every order" },
          ].map((p) => (
            <div
              key={p.title}
              className="flex flex-col items-center text-center gap-2 p-5 rounded-2xl"
              style={{ background: "rgba(10,9,8,0.04)", border: "1px solid rgba(10,9,8,0.07)" }}
            >
              <span className="text-2xl">{p.icon}</span>
              <div className="font-heading font-bold text-sm text-vudu-dark">{p.title}</div>
              <div className="font-body text-xs text-vudu-dark/45">{p.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
