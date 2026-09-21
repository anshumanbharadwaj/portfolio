"use client";

import { motion } from "framer-motion";

export default function Currently() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column */}
          <div className="md:col-span-5 flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-100 bg-emerald-50/50 text-[10px] font-bold uppercase tracking-wider text-emerald-700 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Focus
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-stone-900"
            >
              Currently
            </motion.h2>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-xl sm:text-2xl md:text-3xl leading-relaxed text-stone-700 max-w-2xl"
            >
              Exploring wellness, AI-powered products, and human-centered digital experiences while continuously refining my design craft.
            </motion.p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
