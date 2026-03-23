import type { Metadata } from "next";
import { Syne, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";
import CartFloatingButton from "@/components/CartFloatingButton";

/* ── Google Fonts ───────────────────────────────────────── */
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* ── Metadata ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "VUDU Energy — Feel the VUDU",
  description:
    "VUDU is a premium energy drink brand crafted for those who live at full voltage. Smooth energy. Bold flavors. Pure VUDU.",
  openGraph: {
    title: "VUDU Energy — Feel the VUDU",
    description: "Premium energy drink. Smooth. Bold. Alive.",
    type: "website",
  },
};

/* ── Root Layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceGrotesk.variable} ${plusJakarta.variable}`}
      style={{ scrollBehavior: "auto" }}
    >
      <head>
        {/* Dharma Gothic M — Adobe Fonts */}
        <link rel="stylesheet" href="https://use.typekit.net/upr3aph.css" />
      </head>
      <body className="bg-vudu-cream text-vudu-dark antialiased overflow-x-hidden">
        <CartProvider>
          {children}
          <CartDrawer />
          <CartFloatingButton />
        </CartProvider>
      </body>
    </html>
  );
}
