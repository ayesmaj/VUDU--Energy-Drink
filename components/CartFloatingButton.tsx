"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartFloatingButton() {
  const { totalItems, openCart } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          onClick={openCart}
          className="fixed bottom-8 right-6 z-[70] flex items-center gap-3 px-5 py-4 rounded-2xl font-heading font-bold text-white text-sm shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #E8860A, #FFD000)",
            boxShadow: "0 20px 60px rgba(232,134,10,0.5), 0 4px 16px rgba(0,0,0,0.3)",
          }}
          initial={{ scale: 0, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          whileHover={{ scale: 1.06, boxShadow: "0 24px 70px rgba(232,134,10,0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <ShoppingBag size={20} className="fill-white" />
            <motion.div
              key={totalItems}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 400 }}
            >
              <span className="font-heading font-black text-[10px]" style={{ color: "#E8860A" }}>
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            </motion.div>
          </div>
          <span>View Cart</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
