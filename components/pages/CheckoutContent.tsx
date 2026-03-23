"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart, PRICE_PER_CAN_VALUE } from "@/lib/cart-context";
import { Zap, Lock, Check, ChevronLeft, CreditCard, Truck } from "lucide-react";

type Step = "info" | "shipping" | "payment" | "success";

const STEPS = [
  { id: "info",     label: "Info",     icon: "👤" },
  { id: "shipping", label: "Shipping", icon: "📦" },
  { id: "payment",  label: "Payment",  icon: "💳" },
];

function Field({ label, placeholder, type = "text", value, onChange, half = false }: {
  label: string; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void; half?: boolean;
}) {
  return (
    <div className={half ? "flex-1" : "w-full"}>
      <label className="block font-heading text-xs text-white/40 uppercase tracking-widest mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-all"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(232,134,10,0.6)")}
        onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  );
}

export default function CheckoutContent() {
  const { items, subtotal, totalItems, clearCart } = useCart();

  const shipping = subtotal >= 30 ? 0 : 5.99;
  const tax      = subtotal * 0.08;
  const total    = subtotal + shipping + tax;

  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);
  const [orderId] = useState(() => "VD-" + Math.random().toString(36).slice(2, 8).toUpperCase());

  const [info, setInfo]     = useState({ first: "", last: "", email: "", phone: "" });
  const [addr, setAddr]     = useState({ line1: "", line2: "", city: "", state: "", zip: "", country: "United States" });
  const [card, setCard]     = useState({ name: "", number: "", expiry: "", cvc: "" });

  function fmtCard(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function fmtExpiry(v: string) {
    return v.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})/, "$1/");
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("success"); clearCart(); }, 1800);
  }

  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-20" style={{ background: "#0A0908" }}>
        <div className="text-6xl">🛒</div>
        <h2 className="font-display font-black text-4xl text-white">Your cart is empty</h2>
        <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-heading font-bold text-white text-sm"
          style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)" }}>
          <Zap size={14} className="fill-white" /> Shop Now
        </Link>
      </div>
    );
  }

  /* ── Success screen ─────────────────── */
  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20" style={{ background: "#0A0908" }}>
        <motion.div
          className="flex flex-col items-center gap-6 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)", boxShadow: "0 20px 60px rgba(232,134,10,0.5)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 200 }}
          >
            <Check size={44} className="text-white" strokeWidth={3} />
          </motion.div>

          <div>
            <div className="font-heading text-xs text-white/30 tracking-widest uppercase mb-2">Order Confirmed</div>
            <h2 className="font-display font-black text-5xl text-white mb-2">You&apos;re all set!</h2>
            <p className="font-body text-lg text-white/45">Order #{orderId} is being prepared.</p>
          </div>

          <div className="w-full p-5 rounded-2xl flex flex-col gap-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { icon: "📧", label: "Confirmation sent to", val: info.email || "your email" },
              { icon: "📦", label: "Estimated delivery",   val: "3–5 business days" },
              { icon: "🚀", label: "Shipping",             val: shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}` },
            ].map(({ icon, label, val }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                  <div className="font-heading text-xs text-white/35 uppercase tracking-widest">{label}</div>
                  <div className="font-body text-sm text-white/80">{val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 w-full">
            <Link href="/shop" className="flex-1 py-4 rounded-full text-center font-heading font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)" }}>
              Shop More
            </Link>
            <Link href="/" className="flex-1 py-4 rounded-full text-center font-heading font-bold text-sm border"
              style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)" }}>
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24" style={{ background: "#0A0908" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Back */}
        <Link href="/shop" className="inline-flex items-center gap-2 font-heading text-xs text-white/30 hover:text-white/70 transition-colors tracking-widest uppercase mb-10">
          <ChevronLeft size={14} /> Back to Shop
        </Link>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10">
          {STEPS.map((s, i) => {
            const idx  = STEPS.findIndex((x) => x.id === step);
            const done = i < idx;
            const active = s.id === step;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-xs transition-all"
                    style={{
                      background: done ? "#22c55e" : active ? "linear-gradient(135deg, #E8860A, #FFD000)" : "rgba(255,255,255,0.08)",
                      color: done || active ? "#fff" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {done ? <Check size={12} strokeWidth={3} /> : i + 1}
                  </div>
                  <span className={`font-heading text-sm ${active ? "text-white" : "text-white/35"}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="w-12 h-px" style={{ background: i < idx ? "#22c55e" : "rgba(255,255,255,0.1)" }} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">

              {/* ── Step 1: Info ── */}
              {step === "info" && (
                <motion.form key="info"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-6"
                  onSubmit={(e) => { e.preventDefault(); setStep("shipping"); }}
                >
                  <h2 className="font-display font-black text-3xl text-white">Contact Info</h2>
                  <div className="flex flex-col gap-4 p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex gap-3">
                      <Field label="First Name" placeholder="John" value={info.first} onChange={(v) => setInfo({ ...info, first: v })} half />
                      <Field label="Last Name"  placeholder="Doe"  value={info.last}  onChange={(v) => setInfo({ ...info, last: v })}  half />
                    </div>
                    <Field label="Email" placeholder="you@example.com" type="email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} />
                    <Field label="Phone (optional)" placeholder="+1 (555) 000-0000" type="tel" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} />
                  </div>
                  <motion.button type="submit" className="w-full py-4 rounded-2xl font-heading font-bold text-base text-white flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)", boxShadow: "0 8px 32px rgba(232,134,10,0.35)" }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    Continue to Shipping <ChevronLeft size={16} className="rotate-180" />
                  </motion.button>
                </motion.form>
              )}

              {/* ── Step 2: Shipping ── */}
              {step === "shipping" && (
                <motion.form key="shipping"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-6"
                  onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
                >
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setStep("info")} className="text-white/40 hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                    <h2 className="font-display font-black text-3xl text-white">Shipping Address</h2>
                  </div>

                  {/* Shipping methods */}
                  <div className="flex flex-col gap-3">
                    {[
                      { label: "Standard", sub: "3–5 business days", price: shipping === 0 ? "Free" : "$5.99", icon: <Truck size={18} /> },
                      { label: "Express",  sub: "1–2 business days", price: "$14.99", icon: <Zap size={18} className="fill-current" /> },
                    ].map((opt, i) => (
                      <div key={opt.label} className="flex items-center gap-4 p-4 rounded-xl cursor-pointer"
                        style={{ background: i === 0 ? "rgba(232,134,10,0.1)" : "rgba(255,255,255,0.04)", border: i === 0 ? "1px solid rgba(232,134,10,0.35)" : "1px solid rgba(255,255,255,0.07)" }}>
                        <div className="flex-shrink-0" style={{ color: i === 0 ? "#E8860A" : "rgba(255,255,255,0.3)" }}>{opt.icon}</div>
                        <div className="flex-1">
                          <div className="font-heading font-bold text-sm text-white">{opt.label}</div>
                          <div className="font-body text-xs text-white/40">{opt.sub}</div>
                        </div>
                        <div className="font-heading font-bold text-sm" style={{ color: i === 0 ? "#E8860A" : "rgba(255,255,255,0.4)" }}>{opt.price}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Field label="Address" placeholder="123 Main St" value={addr.line1} onChange={(v) => setAddr({ ...addr, line1: v })} />
                    <Field label="Apt, suite, etc (optional)" placeholder="Apt 4B" value={addr.line2} onChange={(v) => setAddr({ ...addr, line2: v })} />
                    <div className="flex gap-3">
                      <Field label="City" placeholder="Los Angeles" value={addr.city} onChange={(v) => setAddr({ ...addr, city: v })} half />
                      <Field label="State" placeholder="CA" value={addr.state} onChange={(v) => setAddr({ ...addr, state: v })} half />
                    </div>
                    <div className="flex gap-3">
                      <Field label="ZIP Code" placeholder="90001" value={addr.zip} onChange={(v) => setAddr({ ...addr, zip: v })} half />
                      <Field label="Country" placeholder="United States" value={addr.country} onChange={(v) => setAddr({ ...addr, country: v })} half />
                    </div>
                  </div>

                  <motion.button type="submit" className="w-full py-4 rounded-2xl font-heading font-bold text-base text-white flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)", boxShadow: "0 8px 32px rgba(232,134,10,0.35)" }}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    Continue to Payment <ChevronLeft size={16} className="rotate-180" />
                  </motion.button>
                </motion.form>
              )}

              {/* ── Step 3: Payment ── */}
              {step === "payment" && (
                <motion.form key="payment"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-6"
                  onSubmit={handlePlaceOrder}
                >
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setStep("shipping")} className="text-white/40 hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                    <h2 className="font-display font-black text-3xl text-white">Payment</h2>
                    <div className="ml-auto flex items-center gap-1 text-white/30">
                      <Lock size={12} />
                      <span className="font-body text-xs">SSL Encrypted</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard size={16} className="text-white/40" />
                      <span className="font-heading text-xs text-white/40 uppercase tracking-widest">Card Details</span>
                      <div className="ml-auto flex gap-2">
                        {["💳 VISA", "MC", "AMEX"].map((b) => (
                          <span key={b} className="font-heading text-[10px] px-2 py-0.5 rounded text-white/30" style={{ background: "rgba(255,255,255,0.06)" }}>{b}</span>
                        ))}
                      </div>
                    </div>
                    <Field label="Cardholder Name" placeholder="John Doe" value={card.name} onChange={(v) => setCard({ ...card, name: v })} />
                    <div>
                      <label className="block font-heading text-xs text-white/40 uppercase tracking-widest mb-2">Card Number</label>
                      <input required placeholder="1234 5678 9012 3456" value={card.number}
                        onChange={(e) => setCard({ ...card, number: fmtCard(e.target.value) })}
                        className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", letterSpacing: "0.1em" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(232,134,10,0.6)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block font-heading text-xs text-white/40 uppercase tracking-widest mb-2">Expiry</label>
                        <input required placeholder="MM/YY" value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: fmtExpiry(e.target.value) })}
                          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(232,134,10,0.6)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block font-heading text-xs text-white/40 uppercase tracking-widest mb-2">CVC</label>
                        <input required placeholder="123" maxLength={4} value={card.cvc}
                          onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "") })}
                          className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-all"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(232,134,10,0.6)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button type="submit" disabled={loading}
                    className="w-full py-5 rounded-2xl font-heading font-bold text-base text-white flex items-center justify-center gap-2"
                    style={{ background: loading ? "rgba(232,134,10,0.5)" : "linear-gradient(135deg, #E8860A, #FFD000)", boxShadow: loading ? "none" : "0 12px 40px rgba(232,134,10,0.45)" }}
                    whileHover={loading ? {} : { scale: 1.02 }} whileTap={loading ? {} : { scale: 0.97 }}>
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing…
                      </div>
                    ) : (
                      <><Lock size={15} /> Place Order — ${total.toFixed(2)}</>
                    )}
                  </motion.button>

                  <p className="text-center font-body text-xs text-white/20">
                    By placing your order you agree to our Terms of Service and Privacy Policy.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 flex flex-col gap-4 p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <h3 className="font-display font-black text-xl text-white">Order Summary</h3>

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.flavor.id} className="flex items-center gap-3">
                    <div className="relative flex-shrink-0" style={{ width: 44, height: 70 }}>
                      <Image src={item.flavor.image} alt={item.flavor.name} fill className="object-contain" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-heading font-bold text-sm text-white truncate">{item.flavor.name}</div>
                      <div className="font-body text-xs text-white/40">Qty: {item.qty}</div>
                    </div>
                    <div className="font-heading font-bold text-sm text-white">${(item.qty * PRICE_PER_CAN_VALUE).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

              <div className="flex flex-col gap-2">
                {[
                  { label: "Subtotal",                    val: `$${subtotal.toFixed(2)}` },
                  { label: shipping === 0 ? "Shipping 🎉" : "Shipping", val: shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}` },
                  { label: "Tax",                         val: `$${tax.toFixed(2)}` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between">
                    <span className="font-body text-sm text-white/40">{label}</span>
                    <span className="font-heading text-sm text-white/70">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 mt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="font-heading font-bold text-base text-white">Total</span>
                  <span className="font-display font-black text-2xl text-white">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-col gap-2 pt-2">
                {[
                  { icon: "🔒", text: "256-bit SSL encryption" },
                  { icon: "🔄", text: "30-day hassle-free returns" },
                  { icon: "📦", text: `${totalItems} item${totalItems !== 1 ? "s" : ""} in your order` },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className="text-sm">{icon}</span>
                    <span className="font-body text-xs text-white/35">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
