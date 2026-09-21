"use client";

import { motion } from "framer-motion";
import { Search, Compass, Sparkles } from "lucide-react";

const philosophies = [
  {
    icon: Search,
    title: "Research",
    description: "Understanding people before designing solutions.",
  },
  {
    icon: Compass,
    title: "Strategy",
    description: "Balancing user needs with business goals.",
  },
  {
    icon: Sparkles,
    title: "Craft",
    description: "Creating experiences that are intuitive and visually refined.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-36 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6 font-display"
        >
          02 / Philosophy
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium text-3xl sm:text-4xl md:text-5xl tracking-tight text-stone-900 leading-tight mb-16 max-w-2xl"
        >
          Principles that guide my approach to product design.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-10 hover:border-stone-300 hover:shadow-xs transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAFAFA] border border-stone-100 flex items-center justify-center mb-8 text-stone-600 group-hover:text-[#4F46E5] group-hover:bg-indigo-50/50 group-hover:border-indigo-100/30 transition-all duration-300">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-medium text-xl text-stone-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-stone-500 font-normal leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
