"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FAFAFA] border-b border-stone-200/80 py-4 shadow-sm"
          : "bg-transparent py-8"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-3 font-display font-medium tracking-tight text-base sm:text-lg text-stone-900 hover:opacity-75 transition-opacity"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-stone-200 bg-stone-50 shadow-sm flex-shrink-0">
            <Image
              src="/portrait.jpg"
              alt="Anshuman Bharadwaj Avatar Logo"
              fill
              sizes="(max-w-640px) 44px, 48px"
              className="object-cover"
              priority
            />
          </div>
          <span>Anshuman Bharadwaj</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-wider uppercase text-stone-500">
          <Link href="/#work" className="hover:text-stone-900 transition-colors">
            Work
          </Link>
          <Link href="/#music" className="hover:text-stone-900 transition-colors">
            Music
          </Link>
          <Link href="/#contact" className="hover:text-stone-900 transition-colors">
            Contact
          </Link>
        </nav>

        <div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-connect-modal"))}
            className="text-xs font-bold tracking-wider uppercase bg-stone-900 hover:bg-[#4F46E5] text-white px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
          >
            Let's Connect
          </button>
        </div>
      </div>
    </motion.header>
  );
}
