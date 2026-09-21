"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* B */}
    <path d="M3 4h5a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H3V4zm0 8h5a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H3v-8z" />
    <path d="M3 12h8" />
    {/* e */}
    <path d="M21 13.5c0-1.38-.67-2.5-2.25-2.5s-2.25 1.12-2.25 2.5.9 2.5 2.25 2.5 2.25-.92 2.25-2.5zm-4.5 0h4.5" />
    <path d="M16.5 8.5h4" />
  </svg>
);
export default function Contact() {
  const contactLinks = [
    {
      name: "Email",
      label: "anshumanbharadwaj142@gmail.com",
      href: "mailto:anshumanbharadwaj142@gmail.com",
      icon: Mail,
    },
    {
      name: "LinkedIn",
      label: "linkedin.com/in/anshuman",
      href: "https://linkedin.com",
      icon: LinkedInIcon,
    },
    {
      name: "Behance",
      label: "behance.net/anshuman",
      href: "https://behance.net",
      icon: BehanceIcon,
    },
  ];


  return (
    <section id="contact" className="py-24 md:py-36 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-bold tracking-widest uppercase text-stone-400 mb-6 font-display"
            >
              04 / Contact
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight text-stone-900 leading-[1.1] mb-8 max-w-lg"
            >
              Let’s create something meaningful.
            </motion.h2>


          </div>

          {/* Right Column: Links */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-stone-200/80">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group py-6 flex items-center justify-between hover:text-[#4F46E5] transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-stone-500 group-hover:text-[#4F46E5] group-hover:border-indigo-100 transition-all duration-300">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-0.5 font-display">
                        {link.name}
                      </span>
                      <span className="block text-sm sm:text-base font-medium text-stone-850 group-hover:text-[#4F46E5] transition-colors">
                        {link.label}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-stone-200/80 flex items-center justify-center text-stone-400 group-hover:text-[#4F46E5] group-hover:border-[#4F46E5] group-hover:bg-indigo-50/20 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.a>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
