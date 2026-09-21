"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Mail, Copy, Check, ExternalLink } from "lucide-react";

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

export default function ConnectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-connect-modal", handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-connect-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("anshumanbharadwaj142@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md"
        >
          {/* Overlay Click Area to Close */}
          <div className="absolute inset-0 cursor-default" onClick={() => setIsOpen(false)} />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.92, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-stone-100 z-10 overflow-hidden"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-50/50 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8 pr-6">
              <h2 className="font-display font-bold text-2xl text-stone-900 mb-2">
                Let's work together
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                Choose a channel to start a conversation or connect professionally.
              </p>
            </div>

            {/* Connection Options */}
            <div className="space-y-4">
              {/* Email Card */}
              <div className="group relative rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-white hover:border-[#2563EB]/40 transition-all duration-300 p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">
                      Email
                    </span>
                    <a
                      href="mailto:anshumanbharadwaj142@gmail.com"
                      className="font-medium text-stone-900 hover:text-[#2563EB] transition-colors text-sm break-all"
                    >
                      anshumanbharadwaj142@gmail.com
                    </a>
                  </div>
                </div>

                {/* Copy Action */}
                <button
                  onClick={handleCopyEmail}
                  className="flex-shrink-0 p-2.5 rounded-xl border border-stone-200 bg-white text-stone-500 hover:text-[#2563EB] hover:border-[#2563EB]/40 hover:shadow-xs active:scale-95 transition-all duration-200"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 animate-scale-up" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn Card */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-white hover:border-[#2563EB]/40 hover:shadow-xs transition-all duration-300 p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                    <LinkedInIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-0.5">
                      LinkedIn
                    </span>
                    <span className="font-medium text-stone-900 group-hover:text-[#2563EB] transition-colors text-sm">
                      linkedin.com/in/anshuman
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-stone-200 bg-white text-stone-400 group-hover:text-[#2563EB] group-hover:border-[#2563EB]/40 transition-all duration-200">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            </div>

            {/* Footer Status indicator */}
            <div className="mt-8 pt-5 border-t border-stone-100 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-stone-500">
                Currently accepting freelance contracts
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
