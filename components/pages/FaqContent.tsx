"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Zap } from "lucide-react";

const FAQS = [
  {
    q: "How much caffeine is in VUDU?",
    a: "Each VUDU can contains 160mg of natural caffeine sourced from green coffee extract. That's roughly equivalent to 1.5 cups of coffee — enough to fuel your day without the crash.",
  },
  {
    q: "Are VUDU drinks sugar-free?",
    a: "Yes! All VUDU flavors are zero sugar. We use a blend of natural sweeteners to deliver bold, authentic fruit flavor without any added sugar or artificial sweeteners.",
  },
  {
    q: "What are the ingredients?",
    a: "VUDU is made with carbonated water, natural fruit extracts, green coffee extract (caffeine), taurine, B-vitamins (B3, B6, B12), natural sweeteners, and citric acid. Zero artificial colors. Zero artificial flavors.",
  },
  {
    q: "Is VUDU safe to drink daily?",
    a: "VUDU is designed for healthy adults. With 160mg of caffeine per can, we recommend no more than one can per day for most people. Not recommended for children, pregnant women, or those sensitive to caffeine.",
  },
  {
    q: "Where can I buy VUDU?",
    a: "VUDU is available online at our shop, and in over 5,000 retail locations including Walmart, Target, GNC, and 7-Eleven. Use the Store Locator on our Contact page to find your nearest stockist.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes! We ship to 30+ countries. International shipping rates and delivery times vary by location. Orders over $50 qualify for free international shipping.",
  },
  {
    q: "Can I become a VUDU ambassador?",
    a: "Absolutely. We&apos;re always looking for passionate people to join the VUDU family. Fill out our ambassador application on the Contact page and our team will reach out within 5 business days.",
  },
  {
    q: "Do you offer wholesale pricing?",
    a: "Yes, we offer wholesale pricing for gyms, retail stores, events, and more. Contact our wholesale team at wholesale@vududrink.com or through our Contact page with your business details.",
  },
  {
    q: "What is your return policy?",
    a: "If you&apos;re not satisfied with your VUDU purchase, we offer a 30-day money-back guarantee on all online orders. Contact us at hello@vududrink.com with your order number.",
  },
  {
    q: "Are VUDU cans recyclable?",
    a: "100% yes. All VUDU cans are made from recycled aluminum and are fully recyclable. We&apos;re committed to carbon-neutral shipping by 2026 and reducing our environmental footprint with every can produced.",
  },
];

const CATEGORIES = ["All", "Product", "Orders", "Health", "Community"];

export default function FaqContent() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-24" style={{ background: "#0A0908" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Zap size={12} className="text-vudu-mango fill-vudu-mango" />
            <span className="font-heading text-xs text-white/60 tracking-widest uppercase">FAQ</span>
          </div>
          <h1 className="font-display font-black text-[clamp(56px,8vw,110px)] leading-none tracking-tight text-white mb-4">
            Got questions?
          </h1>
          <p className="font-body text-lg text-white/45 max-w-md mx-auto">
            Everything you need to know about VUDU. Can&apos;t find your answer?{" "}
            <Link href="/contact" className="text-vudu-mango hover:underline">
              Contact us.
            </Link>
          </p>
        </motion.div>

        {/* FAQs */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left transition-all"
                style={{
                  background: open === i
                    ? "rgba(232,134,10,0.08)"
                    : "rgba(255,255,255,0.03)",
                }}
              >
                <span className="font-heading font-bold text-base text-white">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={18} className="text-white/40" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="px-5 pb-5"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <p className="font-body text-sm text-white/55 leading-relaxed pt-4">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          className="text-center mt-16 p-8 rounded-3xl"
          style={{ background: "rgba(232,134,10,0.08)", border: "1px solid rgba(232,134,10,0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-display font-black text-2xl text-white mb-2">Still have questions?</h3>
          <p className="font-body text-sm text-white/45 mb-6">Our team replies within 24 hours, always.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-sm text-white"
            style={{
              background: "linear-gradient(135deg, #E8860A, #FFD000)",
              boxShadow: "0 8px 24px rgba(232,134,10,0.4)",
            }}
          >
            <Zap size={14} className="fill-white" /> Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
