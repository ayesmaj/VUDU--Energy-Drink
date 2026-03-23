"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { label: "Flavors",  hash: "#flavors",  page: "/shop"  },
  { label: "Why VUDU", hash: "#why-vudu", page: "/story" },
  { label: "Story",    hash: "#story",    page: "/story" },
  { label: "Shop",     hash: "#cta",      page: "/shop"  },
];

const FLAVORS_QUICK = ["Peach Mango", "Green Apple", "Tropical Punch"];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeHint,  setActiveHint]  = useState(0);
  const { totalItems, openCart } = useCart();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cycle active flavor hint
  useEffect(() => {
    intervalRef.current = setInterval(() =>
      setActiveHint((p) => (p + 1) % FLAVORS_QUICK.length), 2000
    );
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const navigate = (hash: string, page: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    router.push(page);
  };

  const goShop = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      const el = document.querySelector("#cta");
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    router.push("/shop");
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || pathname !== "/" ? "glass-dark" : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
          {/* Logo
              ASSET: place your V logo PNG at /public/brand/logo-v.png
              Use the cyan version (logo-v-cyan.png) for dark nav,
              red version (logo-v-red.png) as alternate.
              The image should have a transparent background (no black fill).
          */}
          <motion.a
            href="/"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/brand/logo-v.png"
                alt="VUDU logo mark"
                fill
                className="object-contain"
                style={{ filter: scrolled || pathname !== "/" ? "none" : "brightness(0)" }}
                onError={() => {/* fallback — image not yet placed */}}
                unoptimized
              />
            </div>
            <span
              className="font-display font-black text-3xl tracking-wider"
              style={{
                color: scrolled || pathname !== "/" ? "#FAFAF5" : "#0A0908",
                letterSpacing: "0.15em",
              }}
            >
              VUDU
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.hash, link.page)}
                className={cn(
                  "px-4 py-2 rounded-full font-heading font-medium text-sm tracking-wide transition-all duration-200",
                  "hover:bg-white/10",
                  scrolled || pathname !== "/" ? "text-white/80 hover:text-white" : "text-vudu-dark/70 hover:text-vudu-dark"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Flavor cycling pill */}
            <div className="hidden lg:flex items-center gap-2 glass-dark rounded-full px-4 py-2 overflow-hidden">
              <div className="w-2 h-2 rounded-full bg-vudu-mango animate-pulse-glow" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeHint}
                  className="font-heading text-xs text-white/70 tracking-widest uppercase"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {FLAVORS_QUICK[activeHint]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Cart icon */}
            <motion.button
              className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all"
              style={{ background: totalItems > 0 ? "rgba(232,134,10,0.15)" : "transparent" }}
              onClick={openCart}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              aria-label="Open cart"
            >
              <ShoppingBag size={18} style={{ color: scrolled || pathname !== "/" ? (totalItems > 0 ? "#E8860A" : "rgba(255,255,255,0.7)") : (totalItems > 0 ? "#E8860A" : "#0A0908") }} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-heading font-black text-[10px] text-white"
                    style={{ background: "linear-gradient(135deg, #E8860A, #FFD000)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 400 }}
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA */}
            <motion.button
              className="btn-primary text-white hidden sm:flex"
              style={{ background: "linear-gradient(135deg, #FF8C00, #FF4D8B)" }}
              onClick={goShop}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Get VUDU
            </motion.button>

            {/* Hamburger */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-[2px] rounded-full transition-all duration-300",
                    scrolled || pathname !== "/" ? "bg-white" : "bg-vudu-dark",
                    menuOpen && i === 0 && "w-5 translate-y-[7px] rotate-45",
                    menuOpen && i === 1 && "w-0 opacity-0",
                    menuOpen && i === 2 && "w-5 -translate-y-[7px] -rotate-45",
                    !menuOpen && "w-5"
                  )}
                />
              ))}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-20"
            style={{ background: "rgba(10,9,8,0.96)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center flex-1 gap-6 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => navigate(link.hash, link.page)}
                  className="font-display font-bold text-8xl text-white/80 hover:text-white transition-colors"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                className="btn-primary text-white mt-4"
                style={{ background: "linear-gradient(135deg, #FF8C00, #FF4D8B)" }}
                onClick={goShop}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                Get VUDU
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
