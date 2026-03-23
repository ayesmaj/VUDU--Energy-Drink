"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, Zap } from "lucide-react";
import { useCart, PRICE_PER_CAN_VALUE } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, setQty, subtotal, totalItems, clearCart } = useCart();

  const shipping = subtotal >= 30 ? 0 : 5.99;
  const tax      = subtotal * 0.08;
  const total    = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[90] flex flex-col w-full max-w-[420px] overflow-hidden"
            style={{ background: "#0D0C0F", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-vudu-mango" />
                <span className="font-display font-black text-xl text-white tracking-wide">
                  Your Cart
                </span>
                {totalItems > 0 && (
                  <span
                    className="font-heading text-xs font-bold text-white px-2 py-0.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)" }}
                  >
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="font-heading text-xs text-white/30 hover:text-white/60 transition-colors tracking-widest uppercase"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center gap-4 h-full min-h-[300px] text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-5xl">🛒</div>
                    <div className="font-display font-black text-2xl text-white">Your cart is empty</div>
                    <p className="font-body text-sm text-white/40">Add a flavor to get started.</p>
                    <button
                      onClick={closeCart}
                      className="mt-2 px-6 py-3 rounded-full font-heading text-sm text-white"
                      style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)" }}
                    >
                      Browse Flavors
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.flavor.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-4 p-4 rounded-2xl"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        {/* Can thumbnail */}
                        <div className="relative flex-shrink-0" style={{ width: 56, height: 90 }}>
                          <Image
                            src={item.flavor.image}
                            alt={item.flavor.name}
                            fill
                            className="object-contain"
                            style={{ filter: `drop-shadow(0 6px 16px ${item.flavor.glow})` }}
                            unoptimized
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-black text-lg text-white leading-tight">{item.flavor.name}</div>
                          <div className="font-body text-xs text-white/40 mb-3">${PRICE_PER_CAN_VALUE.toFixed(2)} / can</div>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <div
                              className="flex items-center gap-1 rounded-lg overflow-hidden"
                              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                              <button
                                onClick={() => setQty(item.flavor.id, item.qty - 1)}
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-heading font-bold text-sm text-white">{item.qty}</span>
                              <button
                                onClick={() => setQty(item.flavor.id, item.qty + 1)}
                                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all font-bold"
                              >
                                +
                              </button>
                            </div>

                            <div className="font-heading font-bold text-sm ml-auto" style={{ color: item.flavor.primary }}>
                              ${(item.qty * PRICE_PER_CAN_VALUE).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.flavor.id)}
                          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}

                    {/* Free shipping notice */}
                    {subtotal < 30 && (
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: "rgba(232,134,10,0.1)", border: "1px solid rgba(232,134,10,0.2)" }}
                      >
                        <span className="text-lg">🚀</span>
                        <p className="font-body text-xs text-white/60">
                          Add <span className="text-vudu-mango font-bold">${(30 - subtotal).toFixed(2)}</span> more for free shipping!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer — order summary + CTA */}
            {items.length > 0 && (
              <div
                className="flex-shrink-0 px-6 py-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Totals */}
                <div className="flex flex-col gap-2 mb-5">
                  {[
                    { label: "Subtotal", val: `$${subtotal.toFixed(2)}` },
                    { label: shipping === 0 ? "Shipping (FREE!)" : "Shipping", val: shipping === 0 ? "$0.00" : `$${shipping.toFixed(2)}` },
                    { label: "Tax (8%)", val: `$${tax.toFixed(2)}` },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between">
                      <span className="font-body text-sm text-white/40">{label}</span>
                      <span className="font-heading text-sm text-white/70">{val}</span>
                    </div>
                  ))}
                  <div
                    className="flex justify-between pt-3 mt-1"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="font-heading font-bold text-base text-white">Total</span>
                    <span className="font-display font-black text-xl text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <Link href="/checkout" onClick={closeCart}>
                  <motion.button
                    className="w-full py-4 rounded-2xl font-heading font-bold text-base text-white flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #E8860A, #FFD000)",
                      boxShadow: "0 12px 40px rgba(232,134,10,0.45)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Zap size={16} className="fill-white" />
                    Checkout — ${total.toFixed(2)}
                  </motion.button>
                </Link>

                <p className="text-center font-body text-xs text-white/25 mt-3">
                  🔒 Secure checkout · SSL encrypted
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
