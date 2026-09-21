"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WorkPage() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-white pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
              Selected Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Case Studies
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/work/soulcare"
                className="group block bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors rounded-3xl p-8 md:p-12 border border-blue-100 hover:border-blue-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-3 block">
                      Product Design • Research • Prototyping
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3 group-hover:text-[#2563EB] transition-colors">
                      SoulCare Mental Wellness
                    </h2>
                    <p className="text-stone-500 text-base leading-relaxed max-w-xl">
                      A mobile healthcare platform designed to reduce the mental, emotional, and logistical burden faced by adult children caring for elderly parents.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-5">
                      {["UX Research", "iOS Design", "Figma", "4 Months"].map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold text-[#2563EB] bg-white border border-blue-100 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-3 text-sm font-bold text-[#2563EB] group-hover:gap-5 transition-all">
                    View Case Study
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
