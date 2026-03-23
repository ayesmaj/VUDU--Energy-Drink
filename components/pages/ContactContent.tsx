"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Instagram, Twitter, Check } from "lucide-react";

const TOPICS = ["General Inquiry", "Wholesale", "Press & Media", "Ambassadors", "Careers", "Store Locator"];

export default function ContactContent() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div
      className="min-h-screen pt-28 pb-24"
      style={{ background: "#0A0908" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display font-black text-[clamp(56px,8vw,120px)] leading-none tracking-tight text-white mb-4">
            Let&apos;s talk
          </h1>
          <p className="font-body text-lg text-white/45 max-w-md mx-auto">
            Whether it&apos;s a wholesale order, press inquiry, or just saying hi — we&apos;re here.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left info */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {/* Info cards */}
            {[
              {
                icon: Mail,
                label: "Email us",
                value: "hello@vududrink.com",
                href: "mailto:hello@vududrink.com",
              },
              {
                icon: MapPin,
                label: "Find us",
                value: "Los Angeles, California",
                href: "#stores",
              },
              {
                icon: Instagram,
                label: "Instagram",
                value: "@vuduenergy",
                href: "https://instagram.com/drinkvudu",
              },
              {
                icon: Twitter,
                label: "Twitter / X",
                value: "@vududrink",
                href: "https://twitter.com/vududrink",
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-5 rounded-2xl transition-all group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(232,134,10,0.15)" }}
                >
                  <Icon size={16} className="text-vudu-mango" />
                </div>
                <div>
                  <div className="font-heading text-xs text-white/40 uppercase tracking-widest">{label}</div>
                  <div className="font-body text-sm text-white/80 group-hover:text-white transition-colors">{value}</div>
                </div>
              </a>
            ))}

            {/* Stores section */}
            <div
              className="p-5 rounded-2xl"
              id="stores"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h3 className="font-display font-black text-xl text-white mb-3">Find a Store</h3>
              <p className="font-body text-sm text-white/40 leading-relaxed mb-4">
                Available in 30+ countries at major retailers, gyms, and convenience stores.
              </p>
              <div className="flex flex-col gap-2">
                {["Walmart", "Target", "GNC", "7-Eleven", "Amazon"].map((store) => (
                  <div key={store} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-vudu-mango" />
                    <span className="font-body text-sm text-white/60">{store}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3 p-8 rounded-3xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center gap-4 text-center h-full min-h-[400px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)" }}
                  >
                    <Check size={36} className="text-white" />
                  </div>
                  <h3 className="font-display font-black text-3xl text-white">Message sent!</h3>
                  <p className="font-body text-white/45 max-w-xs">
                    We&apos;ll get back to you within 24 hours. In the meantime, follow us on social.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                    className="font-heading text-sm text-white/40 hover:text-white transition-colors underline underline-offset-4 mt-4"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="font-display font-black text-2xl text-white mb-2">Send a message</h3>

                  {/* Topic pills */}
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className="px-4 py-2 rounded-full font-heading text-xs tracking-wide transition-all"
                        style={{
                          background: topic === t
                            ? "linear-gradient(135deg, #E8860A, #FFD000)"
                            : "rgba(255,255,255,0.06)",
                          color: topic === t ? "#fff" : "rgba(255,255,255,0.45)",
                          border: topic === t ? "none" : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Fields */}
                  {[
                    { id: "name", label: "Your Name", type: "text", placeholder: "First Last" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                  ].map((field) => (
                    <div key={field.id} className="flex flex-col gap-2">
                      <label className="font-heading text-xs text-white/40 uppercase tracking-widest">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                        className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/25 outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(232,134,10,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2">
                    <label className="font-heading text-xs text-white/40 uppercase tracking-widest">Message</label>
                    <textarea
                      placeholder="What's on your mind?"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/25 outline-none resize-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(232,134,10,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 rounded-xl font-heading font-bold text-sm text-white"
                    style={{
                      background: "linear-gradient(135deg, #E8860A, #FFD000)",
                      boxShadow: "0 8px 32px rgba(232,134,10,0.4)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
