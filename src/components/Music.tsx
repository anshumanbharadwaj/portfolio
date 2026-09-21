"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

export default function Music() {
  const tracks = [
    {
      title: "yaeow - i need u (remix)",
      thumbnail: "https://img.youtube.com/vi/uZbSW7cZ_CE/hqdefault.jpg",
      url: "https://youtu.be/uZbSW7cZ_CE?si=bZxb3aG4ffPH9v8j",
    },
    {
      title: "euphoria (original)",
      thumbnail: "https://img.youtube.com/vi/_RJvjbHpEJo/hqdefault.jpg",
      url: "https://youtu.be/_RJvjbHpEJo?si=of9GmJ7Mz4tAI6b5",
    },
    {
      title: "kid laroi - nights like this flip",
      thumbnail: "https://img.youtube.com/vi/6H6KfJU0Ixk/hqdefault.jpg",
      url: "https://youtube.com/shorts/6H6KfJU0Ixk?si=-GNBuiuWm9OhCUHV",
    },
  ];

  return (
    <section id="music" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle background wash */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-indigo-50/20 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-8 font-display"
        >
          Music
        </motion.p>

        {/* Heading */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-900 leading-tight"
          >
            I make beats too!
          </motion.h2>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {tracks.map((track, idx) => (
            <motion.div
              key={track.url}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-stone-300 mb-5">
                  <Image
                    src={track.thumbnail}
                    alt={track.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, 350px"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors duration-500 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-lg transform transition-all duration-300 opacity-90 group-hover:opacity-100"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5 text-[#2563EB]" />
                    </motion.div>
                  </div>
                </div>

                {/* Track Details */}
                <div>
                  <h3 className="font-display font-medium text-lg text-stone-900 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {track.title}
                  </h3>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
