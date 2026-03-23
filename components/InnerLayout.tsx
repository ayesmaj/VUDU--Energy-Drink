"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
