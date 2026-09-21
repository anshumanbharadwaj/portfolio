"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FirstDesignDropdown from "@/components/FirstDesignDropdown";

/* ─── Scroll-reveal wrapper ─────────────────────────────── */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Exact Figma phone images ──────────────────────────── */
/* ─── Circle for 5 Ws grid ──────────────────────────────── */
function Circle({
  label,
  desc,
  highlight = false,
}: {
  label: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className="aspect-square w-full rounded-full border-2 border-[#2563EB] flex flex-col items-center justify-center text-center p-5"
      style={{ background: highlight ? "rgba(239,246,255,0.95)" : "rgba(255,255,255,0.95)" }}>
      <div className="text-sm font-bold text-[#2563EB] mb-1.5">{label}</div>
      <div className="text-[11px] text-stone-600 leading-snug">{desc}</div>
    </div>
  );
}

/* ─── Exact Figma phone images ──────────────────────────── */
function PhoneImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "9/19.5" }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain drop-shadow-2xl"
        sizes="(max-width: 768px) 50vw, 300px"
      />
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function SoulCareCaseStudy() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-white pt-28 pb-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-6 md:px-12"
        >
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-400 hover:text-[#2563EB] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Work
            </Link>
          </motion.div>

          {/* ── HERO: exact Figma iPhone mockups ──────────── */}
          <Section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Two exact Figma iPhones */}
              <div className="flex justify-center items-end gap-4 md:gap-6">
                <PhoneImage
                  src="/sc_phone_1_splash.png"
                  alt="SoulCare splash screen"
                  className="w-[42%] max-w-[180px]"
                />
                <PhoneImage
                  src="/sc_phone_2_dashboard.png"
                  alt="SoulCare dashboard screen"
                  className="w-[42%] max-w-[180px] mb-6"
                />
              </div>
              {/* Description */}
              <div className="flex flex-col gap-6">
                {/* Ongoing work badge above intro */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-medium self-start shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>I&apos;m still working on this project</span>
                </div>

                {/* Real SoulCare logo */}
                <div className="relative w-36 h-28">
                  <Image
                    src="/soulcare-logo.jpg"
                    alt="SoulCare logo"
                    fill
                    className="object-contain object-left"
                    sizes="144px"
                    priority
                  />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900 leading-snug">
                  SoulCare is a mobile healthcare platform designed to reduce the mental, emotional, and logistical burden faced by adult children caring for elderly parents.
                </h1>
                <p className="text-stone-500 text-base leading-relaxed">
                  The platform focuses on family coordination, medication adherence, and elder-friendly interaction, addressing gaps left by existing single-user health apps.
                </p>
              </div>
            </div>
          </Section>

          {/* ── Project Metadata bar ─────────────────────── */}
          <Section className="mb-20">
            <div className="border border-[#2563EB]/20 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#2563EB]/10">
                {[
                  { label: "Role", value: "Interaction Designer & Researcher" },
                  { label: "Duration", value: "4 Months" },
                  { label: "Tools", value: "Figma" },
                  { label: "Platform", value: "iOS & Android" },
                ].map((item) => (
                  <div key={item.label} className="px-8 py-6">
                    <div className="text-xs font-bold text-stone-900 mb-1">{item.label}</div>
                    <div className="text-sm text-stone-500">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── Problem Statement ─────────────────────────── */}
          <Section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative w-full rounded-3xl overflow-hidden">
                <Image
                  src="/soulcare-illustration.jpg"
                  alt="SoulCare problem statement illustration — woman managing medications, appointments, work and family responsibilities"
                  width={1024}
                  height={683}
                  className="w-full h-auto object-cover rounded-3xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#2563EB] mb-4">Problem Statement</h2>
                <p className="text-stone-700 text-base leading-relaxed">
                  Adult children struggle to manage medications, appointments, and healthcare coordination for elderly parents while balancing work and family responsibilities.
                </p>
              </div>
            </div>
          </Section>

          {/* ── Research / Competitive Analysis ─────────── */}
          <Section className="mb-20">
            <div className="text-center mb-10">
              <div className="text-sm font-bold text-[#2563EB] mb-2">Research</div>
              <h2 className="text-2xl font-semibold text-stone-800">
                I started by going through the existing products
              </h2>
              <div className="mt-6 inline-block">
                <div className="bg-[#2563EB] text-white text-sm font-semibold px-8 py-3 rounded-xl">
                  Competitive Analysis
                </div>
              </div>
            </div>

            <div className="border border-stone-200 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 bg-stone-50 border-b border-stone-200">
                {["App", "Strengths", "Weaknesses", "Gap"].map((h) => (
                  <div key={h} className="px-6 py-3 text-xs font-bold text-stone-500 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {[
                { app: "MyTherapy", strength: "Multilingual; combines med + health tracking", weakness: "Complex interface for elderly", gap: "Family/caregivers can't easily participate" },
                { app: "Medisafe", strength: "Strong behavioral-science integration", weakness: "Single user focus and weak family integration", gap: "Hard to navigate for elderly user" },
                { app: "CareZone", strength: "Combines meds, appointments, insurance in one place", weakness: "Poor UX; fragmented sub-platforms", gap: "Overwhelming for less tech-savvy users" },
              ].map((row, i, arr) => (
                <div key={row.app} className={`grid grid-cols-4 hover:bg-blue-50/30 transition-colors ${i < arr.length - 1 ? "border-b border-stone-100" : ""}`}>
                  <div className="px-6 py-5"><span className="text-sm font-bold text-[#2563EB]">{row.app}</span></div>
                  <div className="px-6 py-5 text-sm text-stone-600">{row.strength}</div>
                  <div className="px-6 py-5 text-sm text-stone-600">{row.weakness}</div>
                  <div className="px-6 py-5 text-sm text-stone-600">{row.gap}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 5 Ws ─────────────────────────────────────── */}
          <Section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2563EB]">5 Ws</h2>
            </div>
            {/* 3×3 grid: corners = WHO/WHEN/WHERE/WHAT, centre = WHY */}
            <div className="grid grid-cols-3 grid-rows-3 gap-4 mx-auto" style={{ maxWidth: 680 }}>
              {/* Row 1 */}
              <Circle label="WHO"   desc="Adult child caregivers and million elderly adults facing coordination challenges" />
              <div /> {/* empty top-centre */}
              <Circle label="WHEN"  desc="Their busy life, having hard time managing work and family" />
              {/* Row 2 */}
              <div /> {/* empty middle-left */}
              <Circle label="WHY"   desc="Lack of time and pressure due to hectic lifes." highlight />
              <div /> {/* empty middle-right */}
              {/* Row 3 */}
              <Circle label="WHERE" desc="Home environments where family is highly busy at work, or lives far away" />
              <div /> {/* empty bottom-centre */}
              <Circle label="WHAT"  desc="Family coordination failures, and technology barriers" />
            </div>
          </Section>

          {/* ── User Personas ─────────────────────────────── */}
          <Section className="mb-20">
            <div className="inline-block bg-[#2563EB] text-white text-sm font-bold px-6 py-2.5 rounded-xl mb-10">
              User Samples
            </div>

            {[
              {
                heading: "Persona 1",
                name: "Riya Kalita",
                age: "35",
                occupation: "HR Manager at a mid-sized IT firm",
                location: "Pune, India",
                needs: ["Real-time family collaboration for care tasks", "Simple document vault for prescriptions, insurance, and reports"],
                goals: ["Use one trusted app to manage everything", "Reduce mental load and ensure her father's well-being"],
                pain: ["Fragmented information and duplicate paperwork", "Emotional burnout from managing all responsibilities alone"],
              },
              {
                heading: "Persona 2",
                name: "Mridul Kalita",
                age: "78",
                occupation: "Retired Engineer",
                location: "Guwahati, Assam",
                needs: ["Use one trusted app to manage everything", "Stay connected to family for support"],
                goals: ["Stay independent and healthy", "Avoid bothering his children for daily help"],
                pain: ["Anxiety about forgetting meds", "Frustration with insurance paperwork and medical records"],
              },
            ].map((p) => (
              <div key={p.heading} className="mb-12">
                <h3 className="text-2xl font-bold text-[#2563EB] mb-6">{p.heading}</h3>
                <div className="bg-[#2563EB]/90 rounded-2xl p-6 mb-4 flex items-center gap-6">
                  {p.heading === "Persona 1" ? (
                    <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden border-2 border-white/30">
                      <Image
                        src="/riya-kalita.jpg"
                        alt="Riya Kalita"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden border-2 border-white/30">
                      <Image
                        src="/mridul-kalita.jpg"
                        alt="Mridul Kalita"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}
                  <div className="text-white">
                    <h4 className="text-xl font-bold mb-2">{p.name}</h4>
                    <div className="space-y-0.5 text-[15px]">
                      <div>Age – {p.age}</div>
                      <div>Occupation – {p.occupation}</div>
                      <div>Location – {p.location}</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#2563EB]/90 rounded-2xl p-5 text-white">
                    <h5 className="font-bold mb-3 text-base">Needs and expectations</h5>
                    <ul className="space-y-2.5">
                      {p.needs.map((n) => (
                        <li key={n} className="flex items-start gap-2.5 text-[15px]">
                          <span className="w-4 h-4 rounded-full border-2 border-white/60 flex-shrink-0 mt-0.5" />
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#2563EB]/90 rounded-2xl p-5 text-white">
                    <h5 className="font-bold mb-3 text-base">Goals</h5>
                    <ul className="space-y-2.5">
                      {p.goals.map((g) => (
                        <li key={g} className="flex items-start gap-2.5 text-[15px]">
                          <span className="w-4 h-4 rounded-full border-2 border-white/60 flex-shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-500/90 rounded-2xl p-5 text-white">
                    <h5 className="font-bold mb-3 text-base">Pain points and frustrations</h5>
                    <ul className="space-y-2.5">
                      {p.pain.map((pp) => (
                        <li key={pp} className="flex items-start gap-2.5 text-[15px]">
                          <span className="w-4 h-4 rounded-full border-2 border-white/60 flex-shrink-0 mt-0.5" />
                          <span>{pp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </Section>

          {/* ── Key Research Insights ─────────────────────── */}
          <Section className="mb-20">
            <div className="inline-block bg-[#2563EB] text-white text-sm font-bold px-6 py-2.5 rounded-xl mb-10">
              Key Research Insights
            </div>
            <div className="space-y-3">
              {[
                "Seniors miss medications due to confusing app interfaces",
                "Care responsibilities fall disproportionately on one family member",
                "Manual tracking leads to errors and constant anxiety",
                "Existing apps feel too clinical or too fragmented",
                "Emergency response is often delayed due to poor coordination",
              ].map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex bg-[#EFF6FF] rounded-xl overflow-hidden border border-blue-100"
                >
                  <div className="w-1 self-stretch bg-[#2563EB] flex-shrink-0" />
                  <p className="px-5 py-4 text-sm text-stone-700">{insight}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ── First Design Dropdown (Initial Exploration / Vernacular UI) ── */}
          <Section className="mb-20">
            <FirstDesignDropdown />
          </Section>

          {/* ── Current Designs / Features ────────────────── */}
          <Section className="mb-20">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Current Designs
              </h2>
            </div>

            {/* Feature 1: Voice reminders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <div className="border border-[#2563EB]/30 rounded-xl bg-[#EFF6FF] px-5 py-3 inline-block mb-6">
                  <span className="text-sm font-bold text-[#2563EB]">Voice medication reminders</span>
                </div>
                <p className="text-stone-700 text-base leading-relaxed mb-4">
                  Voice messages reminders with caretaker own voice.<br />
                  For the feeling of personal touch and warmth from family members.
                </p>
                <h4 className="font-bold text-stone-900 mb-2">Why?</h4>
                <p className="text-stone-600 text-base leading-relaxed">
                  Elders might not catch notifications but a voice message notification from their own loved ones will feel personal.
                </p>
              </div>
              {/* Exact Figma screens */}
              <div className="flex justify-center items-end gap-4 md:gap-6">
                <PhoneImage
                  src="/sc_phone_3_voice.png"
                  alt="SoulCare voice reminder screen"
                  className="w-[42%] max-w-[180px]"
                />
                <PhoneImage
                  src="/sc_phone_4_medications.png"
                  alt="SoulCare medications screen"
                  className="w-[42%] max-w-[180px] mb-6"
                />
              </div>
            </div>

            {/* Feature 2: Centralized health dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 lg:order-1 flex justify-center items-end gap-4 md:gap-6">
                <PhoneImage
                  src="/sc_phone_1_splash.png"
                  alt="SoulCare initial splash screen"
                  className="w-[42%] max-w-[180px]"
                />
                <PhoneImage
                  src="/sc_phone_2_dashboard.png"
                  alt="SoulCare dashboard screen"
                  className="w-[42%] max-w-[180px] mb-6"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="border border-[#2563EB]/30 rounded-xl bg-[#EFF6FF] px-5 py-3 inline-block mb-6">
                  <span className="text-sm font-bold text-[#2563EB]">Centralized health dashboard</span>
                </div>
                <p className="text-stone-700 text-base leading-relaxed mb-4">
                  A centralised dashboard to check steps and heartbeat (if they are using it) and medications of users parents.
                </p>
                <h4 className="font-bold text-stone-900 mb-2">Why?</h4>
                <p className="text-stone-600 text-base leading-relaxed">
                  This is the first screen the caretaker will see while onboarding the application. It will cover all the basic information the app is used for.
                </p>
              </div>
            </div>

            {/* Feature 3: AI Prescription Scanner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="border border-[#2563EB]/30 rounded-xl bg-[#EFF6FF] px-5 py-3 inline-block mb-6">
                  <span className="text-sm font-bold text-[#2563EB]">AI Prescription Scanner</span>
                </div>
                <p className="text-stone-700 text-base leading-relaxed mb-4">
                  Upload your paper prescription to extract details with AI and manage your schedule automatically.
                </p>
                <h4 className="font-bold text-stone-900 mb-2">Why?</h4>
                <p className="text-stone-600 text-base leading-relaxed">
                  Elderly users often have paper prescriptions. OCR + AI reduces manual data entry and prevents medication errors.
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {["AI-Powered Extraction", "Privacy Protected", "Auto-Schedule"].map((badge) => (
                    <span key={badge} className="bg-[#EFF6FF] border border-blue-100 text-[#2563EB] text-xs font-semibold px-3 py-1.5 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-end gap-4 md:gap-6">
                <PhoneImage
                  src="/sc_phone_5_scan.png"
                  alt="SoulCare prescription scan screen"
                  className="w-[42%] max-w-[180px]"
                />
                <PhoneImage
                  src="/sc_phone_4_medications.png"
                  alt="SoulCare medications list"
                  className="w-[42%] max-w-[180px] mb-6"
                />
              </div>
            </div>
          </Section>

          {/* ── CTA ──────────────────────────────────────── */}
          <Section>
            <div className="bg-[#EFF6FF] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100">
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">View the complete design in Figma</h3>
                <p className="text-stone-500 text-sm">See all screens, flows, components and design tokens.</p>
              </div>
              <a
                href="https://www.figma.com/design/bOyTC0HBRm7mLCcpshT2uB/SoulCare?node-id=874-410&m=dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-[#2563EB] hover:bg-blue-700 transition-colors text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-md"
              >
                Open in Figma →
              </a>
            </div>
          </Section>

          {/* ── Ongoing Work Note ────────────────────────── */}
          <Section className="mt-12 mb-6 text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-stone-50 border border-stone-200/80 text-stone-600 text-xs sm:text-sm font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>I&apos;m still working on this project</span>
            </div>
          </Section>

        </motion.div>
      </main>
      <Footer />
    </>
  );
}
