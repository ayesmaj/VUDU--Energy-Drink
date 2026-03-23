"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Twitter, Youtube, Mail, MapPin } from "lucide-react";

const NAV_COLS = [
  {
    title: "Flavors",
    links: [
      { label: "Peach Mango",    href: "/flavors/peach-mango"    },
      { label: "Green Apple",    href: "/flavors/green-apple"    },
      { label: "Tropical Punch", href: "/flavors/tropical-punch" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our Story",      href: "/story"                  },
      { label: "Ingredients",    href: "/story#ingredients"      },
      { label: "Sustainability",  href: "/story#sustainability"   },
      { label: "Press",          href: "/contact"                },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Online Store",   href: "/shop"                   },
      { label: "Find a Store",   href: "/contact#stores"         },
      { label: "Wholesale",      href: "/contact#wholesale"      },
      { label: "Subscriptions",  href: "/shop#subscriptions"     },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact Us",     href: "/contact"                },
      { label: "Ambassadors",    href: "/contact#ambassadors"    },
      { label: "Careers",        href: "/contact#careers"        },
      { label: "FAQ",            href: "/faq"                    },
    ],
  },
];

const SOCIALS = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/drinkvudu" },
  { Icon: Twitter,   label: "Twitter",   href: "https://twitter.com/vududrink"    },
  { Icon: Youtube,   label: "YouTube",   href: "https://youtube.com/@vuduenergy"  },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#0A0908", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,140,0,0.5), rgba(255,77,139,0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            {/* Logo — ASSET: /public/brand/logo-v.png (cyan version) */}
            <motion.div className="flex items-center gap-2 mb-6" whileHover={{ scale: 1.03 }}>
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/brand/logo-v.png"
                  alt="VUDU"
                  fill
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 0 12px rgba(0,200,255,0.6))" }}
                  unoptimized
                />
              </div>
              <span
                className="font-display font-black text-3xl tracking-wider text-white"
                style={{ letterSpacing: "0.15em" }}
              >
                VUDU
              </span>
            </motion.div>

            <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
              Premium energy drink crafted for those
              who live at full voltage.
            </p>

            {/* Social icons */}
            <div className="flex gap-4">
              {SOCIALS.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{
                    scale: 1.1,
                    background: "rgba(255,140,0,0.2)",
                    borderColor: "rgba(255,140,0,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-bold text-sm text-white/70 tracking-widest uppercase mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <motion.div whileHover={{ x: 3 }}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-white/35 hover:text-white/80 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div
          className="flex flex-wrap gap-6 mb-12 p-5 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <a href="mailto:hello@vududrink.com" className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <Mail size={14} />
            <span className="font-body text-sm">hello@vududrink.com</span>
          </a>
          <div className="flex items-center gap-2 text-white/40">
            <MapPin size={14} />
            <span className="font-body text-sm">Los Angeles, California</span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/25">
            © {new Date().getFullYear()} VUDU Energy Drink. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            {[
              { label: "Privacy Policy",   href: "/contact" },
              { label: "Terms of Service", href: "/contact" },
              { label: "Cookie Policy",    href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-body text-xs text-white/25 hover:text-white/60 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
            />
            <span className="font-body text-xs text-white/25">
              Available in 30+ countries
            </span>
          </div>
        </div>

        {/* Watermark */}
        <div className="text-center mt-12">
          <div
            className="font-display font-black text-[12vw] text-white/[0.025] tracking-widest uppercase select-none leading-none"
          >
            VUDU
          </div>
        </div>
      </div>
    </footer>
  );
}
