"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Label on top of grid */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-8 font-display"
        >
          01 / About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="md:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium text-3xl sm:text-4xl md:text-5xl tracking-tight text-stone-900 leading-tight"
            >
              Design is how people experience ideas.
            </motion.h2>
          </div>

          {/* Right Column: Bio Statement */}
          <div className="md:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone-500 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl"
            >
              I'm Anshuman Bharadwaj, an interaction designer passionate about building products that solve real problems. My work combines user research, product strategy, and visual design to create experiences that are simple, useful, and memorable.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
