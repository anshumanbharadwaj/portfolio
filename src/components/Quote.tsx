"use client";

import { motion } from "framer-motion";

export default function Quote() {
  return (
    <section className="py-28 md:py-44 bg-white relative overflow-hidden flex items-center justify-center">
      {/* Background subtle light wash */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-indigo-50/20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center"
        >
          <span className="font-display text-stone-200 text-7xl md:text-8xl select-none leading-none h-6 mb-6">
            “
          </span>
          
          <p className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-stone-900 leading-[1.15] max-w-4xl">
            Good design isn’t decoration.
            <br />
            <span className="text-[#4F46E5] font-semibold">It’s clarity.</span>
          </p>
          
          <span className="font-display text-stone-200 text-7xl md:text-8xl select-none leading-none h-6 mt-8">
            ”
          </span>
        </motion.div>
      </div>
    </section>
  );
}
