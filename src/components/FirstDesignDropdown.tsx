"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ChevronDown, 
  ExternalLink, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  UserCheck, 
  HeartHandshake,
  Maximize2
} from "lucide-react";

interface ScreenItem {
  id: string;
  category: "elder" | "caretaker";
  title: string;
  hindiTitle: string;
  description: string;
  src: string;
  badge: string;
}

const SCREENS: ScreenItem[] = [
  // ── Elder Flow (6 screens) ──────────────────────────
  {
    id: "elder_1",
    category: "elder",
    title: "Splash & Welcome",
    hindiTitle: "अपना ख़याल — शुरू हो जाओ",
    description: "Welcomes elderly users with an elder-friendly visual theme and a single clear action button to begin.",
    src: "/first-design/elder_1_splash.png",
    badge: "Elder Flow · 01",
  },
  {
    id: "elder_2",
    category: "elder",
    title: "Role Selection",
    hindiTitle: "आपकी भूमिका क्या है? (माता-पिता)",
    description: "Allows the user to select their role as either Caretaker ('देखभाल करने वाला') or Parent ('माता-पिता').",
    src: "/first-design/elder_2_role.png",
    badge: "Elder Flow · 02",
  },
  {
    id: "elder_3",
    category: "elder",
    title: "Parent Profile Setup",
    hindiTitle: "मुझे अपने बारे में बताओ",
    description: "Simplified profile creation with senior photo and accessible form fields for credentials.",
    src: "/first-design/elder_3_onboarding.png",
    badge: "Elder Flow · 03",
  },
  {
    id: "elder_4",
    category: "elder",
    title: "Medication Checklist & Schedule",
    hindiTitle: "दवा समय सारणी (सुबह और रात)",
    description: "Daily routine tracker organized into Morning ('सुबह') and Night ('रात') with real pill photos for foolproof recognition.",
    src: "/first-design/elder_4_schedule.png",
    badge: "Elder Flow · 04",
  },
  {
    id: "elder_5",
    category: "elder",
    title: "Audio Pill Reminder (7:40 AM)",
    hindiTitle: "सोमवार सुबह 7:40 बजे — सुने / ले लिया",
    description: "Prominent pill card with an audio player button ('सुने') to listen to family voice reminders and an oversized confirmation button.",
    src: "/first-design/elder_5_reminder_1.png",
    badge: "Elder Flow · 05",
  },
  {
    id: "elder_6",
    category: "elder",
    title: "Pill Alert & Confirmation (9:30 AM)",
    hindiTitle: "विटामिन सी की गोलियाँ — मैंने इसे ले लिया है",
    description: "High-contrast reminder dialog with visual pill shape identification and single-tap intake confirmation.",
    src: "/first-design/elder_6_reminder_2.png",
    badge: "Elder Flow · 06",
  },

  // ── Caretaker Flow (7 screens) ──────────────────────
  {
    id: "caretaker_1",
    category: "caretaker",
    title: "Caretaker App Entry",
    hindiTitle: "अपना ख़याल — शुरू हो जाओ",
    description: "Initial onboarding screen configured for adult child caregivers managing parental health.",
    src: "/first-design/caretaker_1_splash.png",
    badge: "Caretaker Flow · 01",
  },
  {
    id: "caretaker_2",
    category: "caretaker",
    title: "Caregiver Role Selection",
    hindiTitle: "देखभाल करने वाला (Caretaker)",
    description: "Activates caregiver monitoring capabilities, multi-recipient tracking, and coordination features.",
    src: "/first-design/caretaker_2_role.png",
    badge: "Caretaker Flow · 02",
  },
  {
    id: "caretaker_3",
    category: "caretaker",
    title: "Caregiver Profile Setup",
    hindiTitle: "मुझे अपने बारे में बताओ (रिया कलिता)",
    description: "Connects the adult child caregiver profile to parental tracking and emergency communication services.",
    src: "/first-design/caretaker_3_onboarding.png",
    badge: "Caretaker Flow · 03",
  },
  {
    id: "caretaker_4",
    category: "caretaker",
    title: "Live Health & Alert Dashboard",
    hindiTitle: "दोपहर 12:30 बजे मेटफ़ॉर्मिन छूट गया!",
    description: "Urgent top alert banner for missed medications, recipient health status, and quick-access emergency SOS.",
    src: "/first-design/caretaker_4_dashboard.png",
    badge: "Caretaker Flow · 04",
  },
  {
    id: "caretaker_5",
    category: "caretaker",
    title: "Parent Status & Remote Controls",
    hindiTitle: "पापा — अंतिम बार 5 मिनट पहले सक्रिय था",
    description: "Monitors real-time activity, triggers voice notifications ('याद दिलाएं'), and lets caregivers mark meds as taken remotely.",
    src: "/first-design/caretaker_5_parent_status.png",
    badge: "Caretaker Flow · 05",
  },
  {
    id: "caretaker_6",
    category: "caretaker",
    title: "Prescription Management Vault",
    hindiTitle: "नुस्खे प्रबंधित करें (डॉ. अजीत सेठी)",
    description: "Centralized record storage for doctor prescriptions, dosages, treatment plans, and appointment logs.",
    src: "/first-design/caretaker_6_prescriptions.png",
    badge: "Caretaker Flow · 06",
  },
  {
    id: "caretaker_7",
    category: "caretaker",
    title: "Prescription Scanner & Upload",
    hindiTitle: "कागजी पर्ची / डिजिटल प्रिस्क्रिप्शन",
    description: "Camera scanner for capturing physical prescription slips with AI parsing, plus digital document upload.",
    src: "/first-design/caretaker_7_scan.png",
    badge: "Caretaker Flow · 07",
  },
];

export default function FirstDesignDropdown() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "elder" | "caretaker" | "overview">("all");
  const [selectedScreenIndex, setSelectedScreenIndex] = useState<number | null>(null);

  // Close lightbox on Escape key & handle arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedScreenIndex(null);
      if (e.key === "ArrowLeft" && selectedScreenIndex !== null) {
        setSelectedScreenIndex((prev) => (prev! > 0 ? prev! - 1 : SCREENS.length - 1));
      }
      if (e.key === "ArrowRight" && selectedScreenIndex !== null) {
        setSelectedScreenIndex((prev) => (prev! < SCREENS.length - 1 ? prev! + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedScreenIndex]);

  const filteredScreens = activeTab === "all" 
    ? SCREENS 
    : SCREENS.filter(s => s.category === activeTab);

  return (
    <div id="first-design" className="my-16 border border-[#2563EB]/25 rounded-3xl overflow-hidden bg-white shadow-xs transition-all">
      {/* ── Dropdown Header ──────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 sm:px-10 py-7 bg-linear-to-r from-blue-50/70 via-white to-blue-50/40 hover:from-blue-50 hover:to-blue-50/60 transition-colors flex items-center justify-between gap-6 cursor-pointer border-b border-[#2563EB]/15"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#2563EB] text-white font-bold text-xs">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              First Design
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full">
              Initial Concept · 13 Screens
            </span>
            <span className="bg-amber-500/10 text-amber-700 border border-amber-500/20 text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full">
              Vernacular UI (अपना ख़याल)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
            {isOpen ? "Collapse Screens" : "Explore Screens"}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-9 h-9 rounded-full bg-white border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] shadow-xs"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>

      {/* ── Collapsible Content ──────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-6 sm:p-10 space-y-8">
              {/* Context Summary & Figma Link */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-2xl bg-[#EFF6FF]/60 border border-blue-100">
                <div className="max-w-3xl space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#2563EB]">
                    Evolution of the Interface
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Before creating the final English design system, SoulCare started with <strong>&ldquo;अपना ख़याल&rdquo; (Apna Khayal)</strong>. 
                    This iteration explored high-contrast visuals, native Hindi text, and direct pill photography so elders could navigate independently, 
                    paired with a dedicated real-time dashboard for remote family caregiving.
                  </p>
                </div>
                <a
                  href="https://www.figma.com/design/bOyTC0HBRm7mLCcpshT2uB/SoulCare?node-id=874-410&m=dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start lg:self-center px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold tracking-wide transition-colors shadow-xs shrink-0"
                >
                  <span>Open Node in Figma</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* ── Category Filter Tabs ───────────────────────────── */}
              <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "all"
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  All Screens ({SCREENS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("elder")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "elder"
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Elder Experience (6)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("caretaker")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "caretaker"
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Caretaker Flow (7)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/70"
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Figma Board View
                </button>
              </div>

              {/* ── Screen Grids ───────────────────────────────────── */}
              {activeTab === "overview" ? (
                /* Board Overview View */
                <div className="space-y-4">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-stone-200 bg-[#304A63] shadow-md p-4">
                    <Image
                      src="/first-design/first_design_overview.png"
                      alt="Full Figma board of first design screens"
                      width={4720}
                      height={2320}
                      className="w-full h-auto object-contain rounded-xl"
                      priority
                    />
                  </div>
                  <p className="text-xs text-stone-500 text-center">
                    Original Figma canvas showing the complete 13-screen architecture across the Elder and Caretaker flows.
                  </p>
                </div>
              ) : (
                /* Individual Screens Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredScreens.map((screen, idx) => {
                    const globalIndex = SCREENS.findIndex((s) => s.id === screen.id);
                    return (
                      <motion.div
                        key={screen.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.04 }}
                        className="group flex flex-col rounded-2xl border border-stone-200/90 bg-stone-50/50 hover:bg-white hover:border-[#2563EB]/40 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                        onClick={() => setSelectedScreenIndex(globalIndex)}
                      >
                        {/* Device frame preview */}
                        <div className="relative w-full pt-6 pb-2 px-8 flex justify-center bg-linear-to-b from-stone-100/70 to-transparent">
                          <div className="relative w-[180px] aspect-[9/19.5] rounded-[24px] overflow-hidden border-4 border-stone-800 bg-black shadow-lg transition-transform duration-300 group-hover:scale-102">
                            <Image
                              src={screen.src}
                              alt={screen.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 220px"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-stone-900 text-xs font-bold shadow-xs">
                                <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                                Inspect
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Screen details */}
                        <div className="p-5 flex flex-col flex-1 border-t border-stone-100 bg-white">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB] mb-1">
                            {screen.badge}
                          </span>
                          <h4 className="font-bold text-stone-900 text-sm leading-tight mb-1">
                            {screen.title}
                          </h4>
                          <div className="text-[11px] font-medium text-stone-400 mb-2">
                            {screen.hindiTitle}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed mt-auto line-clamp-2">
                            {screen.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Lightbox / Modal ──────────────────────────── */}
      <AnimatePresence>
        {selectedScreenIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedScreenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedScreenIndex(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Phone display column */}
              <div className="md:w-1/2 bg-stone-900 p-8 flex items-center justify-center relative overflow-hidden">
                <div className="relative w-[240px] aspect-[9/19.5] rounded-[32px] overflow-hidden border-6 border-stone-700 bg-black shadow-2xl">
                  <Image
                    src={SCREENS[selectedScreenIndex].src}
                    alt={SCREENS[selectedScreenIndex].title}
                    fill
                    className="object-contain"
                    sizes="300px"
                    priority
                  />
                </div>

                {/* Left/Right controls */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenIndex((prev) => (prev! > 0 ? prev! - 1 : SCREENS.length - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenIndex((prev) => (prev! < SCREENS.length - 1 ? prev! + 1 : 0));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Information Column */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                    {SCREENS[selectedScreenIndex].badge}
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-1">
                    {SCREENS[selectedScreenIndex].title}
                  </h3>
                  <div className="text-sm font-semibold text-[#2563EB] mb-4">
                    {SCREENS[selectedScreenIndex].hindiTitle}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6">
                    {SCREENS[selectedScreenIndex].description}
                  </p>

                  <div className="space-y-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Design Rationale
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {SCREENS[selectedScreenIndex].category === "elder" 
                        ? "Designed with large touch targets, prominent Hindi vernacular labels, and integrated audio cues to ensure that non-tech-savvy elderly family members can confirm medication intake without anxiety."
                        : "Focuses on high glanceability, quick status alerts, and remote triggers allowing adult children to monitor adherence and trigger family voice notes from anywhere."}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>
                    Screen {selectedScreenIndex + 1} of {SCREENS.length}
                  </span>
                  <a
                    href="https://www.figma.com/design/bOyTC0HBRm7mLCcpshT2uB/SoulCare?node-id=874-410&m=dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2563EB] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    View in Figma <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
