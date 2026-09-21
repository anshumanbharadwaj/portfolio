"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function SelectedWork() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    // Wait for the animation to finish before navigating
    setTimeout(() => {
      router.push("/work/soulcare");
    }, 800);
  };

  return (
    <>
      {/* Page transition overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#EFF6FF] flex items-center justify-center pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                <Image
                  src="/soulcare-mockup.png"
                  alt="SoulCare Mockup"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-stone-900 font-display font-medium text-lg tracking-tight"
              >
                Opening SoulCare...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="work" className="py-24 md:py-32 bg-[#FAFAFA] border-b border-stone-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-8 font-display"
          >
            Selected Work
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left info column */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-3 block"
              >
                Product Design • UX Research • iOS
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium text-3xl sm:text-4xl tracking-tight text-stone-900 leading-tight mb-6"
              >
                SoulCare: Reducing the caregiver's burden.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-stone-500 text-base sm:text-lg leading-relaxed mb-8"
              >
                A mobile healthcare platform designed to reduce the mental, emotional, and logistical burden faced by adult children caring for elderly parents.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {["UX Research", "iOS Design", "Family Coordination"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-blue-100 px-3.5 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href="/work/soulcare"
                  onClick={handleNavigate}
                  className="inline-flex items-center gap-3 text-sm font-bold text-white bg-stone-900 hover:bg-[#2563EB] px-6 py-3 rounded-full transition-all duration-300 shadow-sm"
                >
                  Read Case Study
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Right cover graphic column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <a
                href="/work/soulcare"
                onClick={handleNavigate}
                className="group block relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-md hover:shadow-xl hover:border-stone-300 transition-all duration-500 p-8 md:p-12 flex items-center justify-center"
              >
                <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src="/soulcare-mockup.png"
                    alt="SoulCare iPhone Mockups"
                    fill
                    className="object-contain"
                    sizes="(max-w-1024px) 100vw, 600px"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/[0.01] transition-colors duration-500" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
