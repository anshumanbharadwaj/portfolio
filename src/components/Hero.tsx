"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const name1 = "ANSHUMAN";
  const name2 = "BHARADWAJ";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.05,
        ease: "easeOut" as const,
      },
    },
  };

  const cursorVariants = {
    blinking: {
      opacity: [1, 0, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 md:pt-36 pb-16 overflow-hidden bg-[#FAFAFA]">
      {/* Background Animated Shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-indigo-100/40 blur-[80px] md:blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[15%] right-[5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full bg-violet-100/35 blur-[90px] md:blur-[140px] animate-float-medium" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-200/80 bg-white shadow-xs text-xs font-bold tracking-wider uppercase text-stone-500 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Interaction Designer
            </motion.div>

            {/* Large statement */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-stone-900 leading-[0.95] mb-8 uppercase"
            >
              {name1.split("").map((char, index) => (
                <motion.span 
                  key={`n1-${index}`} 
                  variants={charVariants}
                  whileHover={{ color: "#2563EB" }}
                  transition={{ duration: 0.15 }}
                  className="cursor-default select-none"
                >
                  {char}
                </motion.span>
              ))}
              <br />
              {name2.split("").map((char, index) => (
                <motion.span 
                  key={`n2-${index}`} 
                  variants={charVariants}
                  whileHover={{ color: "#2563EB" }}
                  transition={{ duration: 0.15 }}
                  className="cursor-default select-none"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span 
                variants={charVariants} 
                whileHover={{ color: "#4F46E5" }}
                transition={{ duration: 0.15 }}
                className="text-[#2563EB] cursor-default select-none"
              >
                .
              </motion.span>
              <motion.span
                variants={charVariants}
                className="inline-block"
              >
                <motion.span
                  variants={cursorVariants}
                  animate="blinking"
                  className="inline-block w-[4px] h-[0.8em] bg-[#2563EB] ml-1.5 align-middle"
                />
              </motion.span>
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone-500 text-lg font-normal leading-relaxed max-w-xl mb-10"
            >
              Focused on transforming complex challenges into intuitive products through research, strategy, and visual design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-connect-modal"))}
                className="w-full sm:w-auto text-xs font-bold tracking-widest uppercase bg-stone-900 hover:bg-[#4F46E5] text-white px-8 py-4.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                Let's Connect
              </button>
              <a
                href="https://drive.google.com/file/d/1zggrH6dmCSRkw0K92XFhtpWjFCt_3wsx/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-xs font-bold tracking-widest uppercase bg-white hover:bg-stone-50 text-stone-900 border border-stone-200 px-8 py-4.5 rounded-full transition-all duration-300 flex items-center justify-center gap-1 group"
              >
                Resume
                <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden bg-white border border-stone-200/80 p-3.5 group shadow-xs">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#FAFAFA]">
                <Image
                  src="/portrait.jpg"
                  alt="Anshuman Bharadwaj Portrait"
                  fill
                  sizes="(max-w-768px) 100vw, 400px"
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
