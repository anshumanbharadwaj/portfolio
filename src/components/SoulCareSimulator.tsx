"use client";

import React, { useState, useEffect } from "react";
import { 
  Smile, Meh, Frown, MessageSquare, Calendar, Search, Filter, Check, 
  Heart, User, Clock, ArrowRight, Send, Star, MapPin, 
  Activity, Compass, ArrowLeft, RefreshCw, Sparkles, SendHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Therapist {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  match: number;
  specialty: string;
  image: string;
}

const THERAPISTS: Therapist[] = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Clinical Psychologist",
    rating: 4.9,
    reviews: 124,
    match: 98,
    specialty: "Anxiety & CBT",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    name: "Dr. Marcus Vance",
    role: "Licensed Counselor",
    rating: 4.8,
    reviews: 98,
    match: 92,
    specialty: "Stress & Mindfulness",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  }
];

export default function SoulCareSimulator() {
  const [screen, setScreen] = useState<string>("splash");
  
  // App States
  const [goals, setGoals] = useState<string[]>([]);
  const [mood, setMood] = useState<string | null>(null);
  const [moodHistory, setMoodHistory] = useState<{ day: string; value: number }[]>([
    { day: "Mon", value: 3 },
    { day: "Tue", value: 4 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 4 },
    { day: "Fri", value: 3 },
    { day: "Sat", value: 5 },
    { day: "Sun", value: 4 }
  ]);
  const [tasks, setTasks] = useState<{ id: string; name: string; completed: boolean; icon: string }[]>([
    { id: "mood", name: "Daily Mood Check-in", completed: false, icon: "Smile" },
    { id: "breath", name: "10-Min Deep Breathing", completed: false, icon: "Activity" },
    { id: "match", name: "Therapist Matchmaker", completed: false, icon: "Heart" }
  ]);
  const [breathingState, setBreathingState] = useState<"idle" | "inhale" | "exhale" | "done">("idle");
  const [breathingTimer, setBreathingTimer] = useState<number>(10);
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "therapist"; text: string; time: string }[]>([
    { sender: "therapist", text: "Hello Jane, I'm Dr. Sarah Jenkins. Welcome to SoulCare! How can I support you today?", time: "10:30 AM" }
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [bookedDate, setBookedDate] = useState<string | null>(null);
  const [bookedTime, setBookedTime] = useState<string | null>(null);

  // Auto-breathing cycle
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingState === "inhale" || breathingState === "exhale") {
      interval = setInterval(() => {
        setBreathingTimer((prev) => {
          if (prev <= 1) {
            if (breathingState === "inhale") {
              setBreathingState("exhale");
              return 5;
            } else {
              setBreathingState("done");
              setTasks(prevTasks => 
                prevTasks.map(t => t.id === "breath" ? { ...t, completed: true } : t)
              );
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingState]);

  // Calculate Progress
  const progressPercent = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  // Checkbox goal toggle
  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  // Log mood action
  const handleLogMood = (selectedMood: string) => {
    setMood(selectedMood);
    let score = 3;
    if (selectedMood === "Happy") score = 5;
    if (selectedMood === "Calm") score = 4;
    if (selectedMood === "Anxious") score = 2;
    if (selectedMood === "Sad") score = 1;
    
    // Add to history
    setMoodHistory(prev => {
      const nextHistory = [...prev];
      nextHistory[nextHistory.length - 1] = { day: "Sun", value: score };
      return nextHistory;
    });

    // Complete task
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === "mood" ? { ...t, completed: true } : t)
    );

    setScreen("analytics");
  };

  // Send Chat Message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg = { sender: "user" as const, text, time: "10:32 AM" };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage("");
    setIsTyping(true);

    // Simulated response
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I understand how you feel. Let's work together to practice some coping skills today.";
      if (text.toLowerCase().includes("breath") || text.toLowerCase().includes("breathing")) {
        replyText = "Deep breathing is a great grounding exercise. Try our Guided Self-Care activity, or take 5 deep inhales now.";
      } else if (text.toLowerCase().includes("anxious") || text.toLowerCase().includes("stress")) {
        replyText = "Anxiety can feel very overwhelming. Let's focus on what is within your control right now. I am here for you.";
      }
      setChatMessages(prev => [...prev, { sender: "therapist" as const, text: replyText, time: "10:32 AM" }]);
    }, 1500);
  };

  const handleQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  const resetSimulator = () => {
    setScreen("splash");
    setGoals([]);
    setMood(null);
    setTasks([
      { id: "mood", name: "Daily Mood Check-in", completed: false, icon: "Smile" },
      { id: "breath", name: "10-Min Deep Breathing", completed: false, icon: "Activity" },
      { id: "match", name: "Therapist Matchmaker", completed: false, icon: "Heart" }
    ]);
    setBreathingState("idle");
    setChatMessages([
      { sender: "therapist", text: "Hello Jane, I'm Dr. Sarah Jenkins. Welcome to SoulCare! How can I support you today?", time: "10:30 AM" }
    ]);
    setSelectedTherapist(null);
    setBookedDate(null);
    setBookedTime(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Reset simulator floating button */}
      <button 
        onClick={resetSimulator}
        className="mb-4 flex items-center gap-2 text-xs font-medium text-secondary hover:text-accent transition-colors bg-white px-3 py-1.5 rounded-full border border-border"
      >
        <RefreshCw size={12} /> Reset Simulator
      </button>

      {/* iPhone 15 Pro Wrapper */}
      <div className="relative mx-auto w-[320px] h-[640px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-neutral-800 ring-1 ring-neutral-700/50 overflow-hidden flex flex-col">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full absolute right-4"></div>
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 pt-2 pb-1 text-[10px] font-bold text-neutral-800 select-none z-40 bg-neutral-50/50 backdrop-blur-md">
          <span>9:41</span>
          <div className="flex gap-1 items-center">
            <span className="w-3 h-2 bg-neutral-800 rounded-xs"></span>
            <span className="w-2.5 h-1.5 bg-neutral-800 rounded-xs"></span>
          </div>
        </div>

        {/* App Content Area */}
        <div className="flex-1 bg-neutral-50 rounded-[38px] overflow-hidden flex flex-col relative text-[#111111] font-sans">
          
          <AnimatePresence mode="wait">
            
            {/* 1. Splash Screen */}
            {screen === "splash" && (
              <motion.div 
                key="splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between p-6 text-center"
              >
                <div className="flex-1 flex flex-col justify-center items-center gap-4">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Heart className="text-white" size={36} />
                  </div>
                  <h1 className="text-2xl font-bold font-display tracking-tight text-neutral-900">SoulCare</h1>
                  <p className="text-xs text-secondary px-4">
                    Your personalized companion for mental wellness and emotional support.
                  </p>
                </div>
                
                <button
                  onClick={() => setScreen("goals")}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-xl shadow-lg shadow-accent/20 text-xs transition-all flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {/* 2. Onboarding Goals */}
            {screen === "goals" && (
              <motion.div 
                key="goals"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-between p-6"
              >
                <div>
                  <h2 className="text-lg font-bold font-display mt-2 mb-1 text-neutral-900">What are your goals?</h2>
                  <p className="text-[11px] text-secondary mb-4">Select all that apply to customize your journey.</p>
                  
                  <div className="space-y-2.5">
                    {["Reduce Anxiety", "Improve Sleep", "Track Mood", "Manage Stress", "Practice Mindfulness"].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                          goals.includes(goal)
                            ? "border-accent bg-accent-light text-accent font-medium shadow-sm"
                            : "border-border bg-white text-secondary hover:border-neutral-300"
                        }`}
                      >
                        <span className="text-xs">{goal}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          goals.includes(goal) ? "bg-accent border-accent text-white" : "border-neutral-300 bg-white"
                        }`}>
                          {goals.includes(goal) && <Check size={10} />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setScreen("dashboard")}
                  disabled={goals.length === 0}
                  className={`w-full py-3 rounded-xl font-medium text-xs text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                    goals.length > 0 
                      ? "bg-accent shadow-accent/20 hover:bg-accent/90" 
                      : "bg-neutral-300 shadow-none cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight size={14} />
                </button>
              </motion.div>
            )}

            {/* 3. Dashboard */}
            {screen === "dashboard" && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-5 border-b border-border bg-white flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-secondary uppercase font-semibold tracking-wider">Welcome back</span>
                    <h3 className="text-sm font-bold text-neutral-950 font-display">Good morning, Jane</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-accent-light border border-accent/20 overflow-hidden flex items-center justify-center">
                    <User size={14} className="text-accent" />
                  </div>
                </div>

                {/* Body scroll */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {/* Progress Card */}
                  <div className="bg-gradient-to-r from-accent to-[#0D9488] p-4 rounded-2xl text-white shadow-md shadow-accent/10 relative overflow-hidden">
                    <div className="relative z-10">
                      <span className="text-[10px] font-medium opacity-80">Today's Progress</span>
                      <h4 className="text-xl font-bold font-display mt-0.5">{progressPercent}% Completed</h4>
                      <p className="text-[10px] opacity-75 mt-1 leading-relaxed">
                        {progressPercent === 100 
                          ? "Incredible work! You've completed your daily routine." 
                          : "Take a few minutes to support your mental health today."}
                      </p>
                    </div>
                    {/* Ring Visual */}
                    <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 border-8 border-white/10 rounded-full" />
                  </div>

                  {/* Tasks List */}
                  <div>
                    <h5 className="text-[11px] font-bold text-neutral-900 mb-2.5 uppercase tracking-wider">Your Daily Journey</h5>
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => {
                            if (task.id === "mood") setScreen("mood-logger");
                            if (task.id === "breath") {
                              setBreathingState("idle");
                              setBreathingTimer(10);
                              setScreen("breathing");
                            }
                            if (task.id === "match") setScreen("find-therapist");
                          }}
                          className="w-full flex items-center justify-between p-3.5 bg-white border border-border rounded-xl hover:border-neutral-300 hover:shadow-sm text-left transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              task.completed ? "bg-emerald-50 text-emerald-600" : "bg-neutral-50 text-secondary"
                            }`}>
                              {task.id === "mood" ? <Smile size={16} /> : task.id === "breath" ? <Activity size={16} /> : <Heart size={16} />}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-neutral-900">{task.name}</p>
                              <p className="text-[9px] text-secondary mt-0.5">
                                {task.completed ? "Completed" : "Tap to start activity"}
                              </p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                            task.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-neutral-200"
                          }`}>
                            {task.completed && <Check size={12} />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="bg-white border-t border-border py-2 px-6 flex justify-between items-center text-secondary">
                  <button className="flex flex-col items-center gap-0.5 text-accent">
                    <Compass size={16} />
                    <span className="text-[9px] font-medium">Journey</span>
                  </button>
                  <button onClick={() => setScreen("analytics")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <Activity size={16} />
                    <span className="text-[9px] font-medium">Trends</span>
                  </button>
                  <button onClick={() => setScreen("find-therapist")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <User size={16} />
                    <span className="text-[9px] font-medium">Therapy</span>
                  </button>
                  <button onClick={() => setScreen("chat")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <MessageSquare size={16} />
                    <span className="text-[9px] font-medium">Chat</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 4. Mood Logger */}
            {screen === "mood-logger" && (
              <motion.div 
                key="mood-logger"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex-1 flex flex-col justify-between p-6 bg-white"
              >
                <div>
                  <button onClick={() => setScreen("dashboard")} className="flex items-center gap-1.5 text-xs text-secondary hover:text-neutral-950 mb-4 font-medium">
                    <ArrowLeft size={14} /> Back
                  </button>
                  
                  <h2 className="text-lg font-bold font-display text-neutral-950">How are you feeling today?</h2>
                  <p className="text-[11px] text-secondary mb-6">Select the mood that matches your current emotional state.</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: "Happy", icon: Smile, color: "text-amber-500 bg-amber-50 border-amber-200" },
                      { label: "Calm", icon: Sparkles, color: "text-accent bg-accent-light border-accent/20" },
                      { label: "Anxious", icon: Activity, color: "text-purple-600 bg-purple-50 border-purple-200" },
                      { label: "Sad", icon: Frown, color: "text-blue-500 bg-blue-50 border-blue-200" }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleLogMood(item.label)}
                        className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all hover:scale-[1.02] cursor-pointer ${item.color}`}
                      >
                        <item.icon size={28} className="mb-2" />
                        <span className="text-xs font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-2xl border border-border">
                    <span className="text-[9px] text-secondary font-bold uppercase tracking-wider">Thought Check</span>
                    <p className="text-[10px] text-secondary mt-1 leading-relaxed">
                      Logging your mood regularly helps build emotional awareness and tracking. You'll view personalized trends next.
                    </p>
                  </div>
                </div>
                
                <div className="text-[10px] text-secondary text-center">Your privacy is encrypted and secured by SoulCare.</div>
              </motion.div>
            )}

            {/* 5. Mood Analytics */}
            {screen === "analytics" && (
              <motion.div 
                key="analytics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="p-5 border-b border-border bg-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setScreen("dashboard")} className="text-secondary hover:text-neutral-950">
                      <ArrowLeft size={16} />
                    </button>
                    <h3 className="text-sm font-bold font-display text-neutral-950">Mood Analytics</h3>
                  </div>
                  <span className="text-[9px] bg-accent-light text-accent px-2 py-0.5 rounded-full font-bold">Weekly</span>
                </div>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {/* Highlight Card */}
                  <div className="bg-white p-4 rounded-2xl border border-border">
                    <span className="text-[9px] text-accent font-bold uppercase tracking-wider">Personalized Insight</span>
                    <h4 className="text-xs font-bold text-neutral-900 mt-1">You felt 15% calmer this week</h4>
                    <p className="text-[10px] text-secondary mt-1 leading-relaxed">
                      Good progress! Your calm scores increased on days you completed the deep breathing activities.
                    </p>
                  </div>

                  {/* SVG Chart Container */}
                  <div className="bg-white p-4 rounded-2xl border border-border">
                    <span className="text-[9px] text-secondary font-bold uppercase tracking-wider block mb-3">Weekly Mood Trends</span>
                    <div className="relative w-full h-32 flex items-end justify-between px-1">
                      {/* Grid Lines */}
                      <div className="absolute inset-x-0 top-0 border-b border-dashed border-neutral-100 h-0 w-full" />
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-b border-dashed border-neutral-100 h-0 w-full" />

                      {/* SVG Line Graph */}
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke="#14B8A6"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          points="20,70 55,40 90,90 125,40 160,70 195,20 230,50"
                        />
                        {/* Interactive dots */}
                        <circle cx="20" cy="70" r="4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1" />
                        <circle cx="55" cy="40" r="4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1" />
                        <circle cx="90" cy="90" r="4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1" />
                        <circle cx="125" cy="40" r="4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1" />
                        <circle cx="160" cy="70" r="4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1" />
                        <circle cx="195" cy="20" r="4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1" />
                        <circle cx="230" cy="50" r="5" fill="#0D9488" stroke="#FFFFFF" strokeWidth="2.5" />
                      </svg>

                      {/* Labels */}
                      {moodHistory.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center z-10" style={{ width: "14%" }}>
                          <span className="text-[9px] text-secondary font-medium mt-1">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="bg-white border-t border-border py-2 px-6 flex justify-between items-center text-secondary">
                  <button onClick={() => setScreen("dashboard")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <Compass size={16} />
                    <span className="text-[9px] font-medium">Journey</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5 text-accent">
                    <Activity size={16} />
                    <span className="text-[9px] font-medium">Trends</span>
                  </button>
                  <button onClick={() => setScreen("find-therapist")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <User size={16} />
                    <span className="text-[9px] font-medium">Therapy</span>
                  </button>
                  <button onClick={() => setScreen("chat")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <MessageSquare size={16} />
                    <span className="text-[9px] font-medium">Chat</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 6. Breathing Exercise */}
            {screen === "breathing" && (
              <motion.div 
                key="breathing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col justify-between p-6 bg-white"
              >
                <div>
                  <button onClick={() => setScreen("dashboard")} className="flex items-center gap-1.5 text-xs text-secondary hover:text-neutral-950 mb-4 font-medium">
                    <ArrowLeft size={14} /> Back
                  </button>
                  
                  <h2 className="text-lg font-bold font-display text-neutral-950">Deep Breathing</h2>
                  <p className="text-[11px] text-secondary">Slow your breathing to calm your central nervous system.</p>
                </div>

                {/* Animation Area */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 my-4">
                  {/* Expanding Breathing Circle */}
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: breathingState === "inhale" ? 1.6 : breathingState === "exhale" ? 0.9 : 1,
                        opacity: breathingState === "inhale" ? 0.4 : breathingState === "exhale" ? 0.8 : 0.6
                      }}
                      transition={{ duration: 5, ease: "easeInOut", repeat: breathingState === "idle" ? 0 : Infinity }}
                      className="w-24 h-24 bg-accent rounded-full absolute"
                    />
                    <div className="w-20 h-20 bg-accent hover:bg-accent/95 rounded-full flex items-center justify-center text-white font-bold relative z-10 shadow-lg shadow-accent/20">
                      <Activity size={24} className="animate-pulse" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-sm font-bold capitalize text-neutral-900">
                      {breathingState === "idle" && "Ready to start?"}
                      {breathingState === "inhale" && "Inhale deeply..."}
                      {breathingState === "exhale" && "Exhale slowly..."}
                      {breathingState === "done" && "Exercise completed!"}
                    </h3>
                    <p className="text-[11px] text-secondary mt-1">
                      {breathingState === "idle" && "We'll guide you through a 2-cycle breathing session."}
                      {breathingState === "inhale" && "Feel the breath fill your lungs."}
                      {breathingState === "exhale" && "Release stress and let go."}
                      {breathingState === "done" && "You did awesome! Log this in your dashboard."}
                    </p>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center gap-1.5 bg-neutral-50 px-3.5 py-1.5 rounded-full border border-border">
                    <Clock size={12} className="text-secondary" />
                    <span className="text-xs font-semibold tabular-nums text-neutral-900">00:{breathingTimer < 10 ? `0${breathingTimer}` : breathingTimer}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {breathingState === "idle" && (
                    <button
                      onClick={() => {
                        setBreathingState("inhale");
                        setBreathingTimer(5);
                      }}
                      className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-xl shadow-md text-xs"
                    >
                      Start Exercise
                    </button>
                  )}
                  {(breathingState === "inhale" || breathingState === "exhale") && (
                    <button
                      onClick={() => setBreathingState("idle")}
                      className="w-full border border-neutral-200 text-secondary hover:text-neutral-900 py-3 rounded-xl text-xs font-medium"
                    >
                      Reset
                    </button>
                  )}
                  {breathingState === "done" && (
                    <button
                      onClick={() => {
                        setScreen("dashboard");
                      }}
                      className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-xl shadow-md text-xs"
                    >
                      Done & Return
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* 7. Find a Therapist */}
            {screen === "find-therapist" && (
              <motion.div 
                key="find-therapist"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div className="p-5 border-b border-border bg-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setScreen("dashboard")} className="text-secondary hover:text-neutral-950">
                      <ArrowLeft size={16} />
                    </button>
                    <h3 className="text-sm font-bold font-display text-neutral-950">Find a Therapist</h3>
                  </div>
                </div>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {/* Search bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search therapists, specialties..."
                      className="w-full pl-9 pr-4 py-2 bg-white border border-border rounded-xl text-xs focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  {/* Filter Pills */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {["All", "Anxiety", "Stress", "CBT", "Depression"].map((tag, idx) => (
                      <span key={idx} className={`text-[10px] px-2.5 py-1 rounded-full font-medium border flex-shrink-0 cursor-pointer ${
                        idx === 0 
                          ? "bg-accent border-accent text-white" 
                          : "bg-white border-border text-secondary hover:border-neutral-300"
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Therapist Listing */}
                  <div className="space-y-3">
                    {THERAPISTS.map((t, idx) => (
                      <div 
                        key={idx}
                        className="bg-white p-3.5 border border-border rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all flex flex-col gap-3"
                      >
                        <div className="flex gap-3">
                          <img 
                            src={t.image} 
                            alt={t.name}
                            className="w-12 h-12 rounded-xl object-cover border border-neutral-100"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-bold text-neutral-950">{t.name}</h4>
                              <span className="text-[9px] bg-accent-light text-accent px-1.5 py-0.5 rounded-full font-bold">{t.match}% Match</span>
                            </div>
                            <p className="text-[10px] text-secondary mt-0.5">{t.role}</p>
                            <div className="flex items-center gap-1 text-[9px] text-amber-500 font-bold mt-1">
                              <Star size={10} fill="currentColor" />
                              <span>{t.rating}</span>
                              <span className="text-secondary font-normal">({t.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-dashed border-border">
                          <span className="text-[10px] text-secondary font-medium">{t.specialty}</span>
                          <button
                            onClick={() => {
                              setSelectedTherapist(t);
                              setScreen("matching");
                            }}
                            className="bg-accent hover:bg-accent/90 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                          >
                            Match Details <ArrowRight size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Nav */}
                <div className="bg-white border-t border-border py-2 px-6 flex justify-between items-center text-secondary">
                  <button onClick={() => setScreen("dashboard")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <Compass size={16} />
                    <span className="text-[9px] font-medium">Journey</span>
                  </button>
                  <button onClick={() => setScreen("analytics")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <Activity size={16} />
                    <span className="text-[9px] font-medium">Trends</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5 text-accent">
                    <User size={16} />
                    <span className="text-[9px] font-medium">Therapy</span>
                  </button>
                  <button onClick={() => setScreen("chat")} className="flex flex-col items-center gap-0.5 hover:text-neutral-900">
                    <MessageSquare size={16} />
                    <span className="text-[9px] font-medium">Chat</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* 8. Matchmaker Details */}
            {screen === "matching" && selectedTherapist && (
              <motion.div 
                key="matching"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col justify-between bg-white p-5"
              >
                <div>
                  <button onClick={() => setScreen("find-therapist")} className="flex items-center gap-1.5 text-xs text-secondary hover:text-neutral-950 mb-4 font-medium">
                    <ArrowLeft size={14} /> Back
                  </button>

                  <div className="text-center space-y-2 mt-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-accent-light p-1.5 border border-accent/20 relative">
                      <img 
                        src={selectedTherapist.image} 
                        alt={selectedTherapist.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                        {selectedTherapist.match}% Match
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-950 font-display mt-2">{selectedTherapist.name}</h3>
                    <p className="text-[10px] text-secondary">{selectedTherapist.role}</p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <h4 className="text-[10px] font-bold text-neutral-950 uppercase tracking-wider">Why you matched</h4>
                    <div className="bg-neutral-50 border border-border p-3.5 rounded-xl space-y-2">
                      <div className="flex gap-2 items-start text-[10px] text-secondary">
                        <Check size={12} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>Supports your goal of **Reducing Anxiety**</span>
                      </div>
                      <div className="flex gap-2 items-start text-[10px] text-secondary">
                        <Check size={12} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>Specializes in **Cognitive Behavioral Therapy (CBT)**</span>
                      </div>
                      <div className="flex gap-2 items-start text-[10px] text-secondary">
                        <Check size={12} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>Has availability in the evenings (matching your habits)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setScreen("booking")}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-xl shadow-md text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Book Session <Calendar size={14} />
                </button>
              </motion.div>
            )}

            {/* 9. Calendar Booking */}
            {screen === "booking" && selectedTherapist && (
              <motion.div 
                key="booking"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex-1 flex flex-col justify-between bg-white p-5"
              >
                <div>
                  <button onClick={() => setScreen("matching")} className="flex items-center gap-1.5 text-xs text-secondary hover:text-neutral-950 mb-3 font-medium">
                    <ArrowLeft size={14} /> Back
                  </button>

                  <h3 className="text-sm font-bold font-display text-neutral-950">Book a Session</h3>
                  <p className="text-[10px] text-secondary">Select an available date and time slot with {selectedTherapist.name}.</p>

                  {/* Horizontal mini calendar */}
                  <div className="mt-4">
                    <span className="text-[9px] text-secondary font-bold uppercase tracking-wider block mb-2">Select Date</span>
                    <div className="grid grid-cols-4 gap-2">
                      {["Mon 15", "Tue 16", "Wed 17", "Thu 18"].map((dateVal) => (
                        <button
                          key={dateVal}
                          onClick={() => setBookedDate(dateVal)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            bookedDate === dateVal 
                              ? "bg-accent border-accent text-white shadow-sm" 
                              : "bg-white border-border text-secondary hover:border-neutral-300"
                          }`}
                        >
                          <span className="text-[9px] font-bold block opacity-70">{dateVal.split(" ")[0]}</span>
                          <span className="text-xs font-bold block mt-0.5">{dateVal.split(" ")[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mt-4">
                    <span className="text-[9px] text-secondary font-bold uppercase tracking-wider block mb-2">Select Time</span>
                    <div className="grid grid-cols-2 gap-2">
                      {["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setBookedTime(slot)}
                          className={`p-2 rounded-xl border text-center text-[10px] font-semibold transition-all cursor-pointer ${
                            bookedTime === slot 
                              ? "bg-accent border-accent text-white shadow-sm" 
                              : "bg-white border-border text-secondary hover:border-neutral-300"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  disabled={!bookedDate || !bookedTime}
                  onClick={() => {
                    setTasks(prevTasks => 
                      prevTasks.map(t => t.id === "match" ? { ...t, completed: true } : t)
                    );
                    setScreen("chat");
                  }}
                  className={`w-full py-3 rounded-xl font-medium text-xs text-white shadow-lg transition-all flex items-center justify-center gap-1.5 ${
                    bookedDate && bookedTime 
                      ? "bg-accent shadow-accent/20 hover:bg-accent/90" 
                      : "bg-neutral-300 shadow-none cursor-not-allowed"
                  }`}
                >
                  Confirm Booking <Check size={14} />
                </button>
              </motion.div>
            )}

            {/* 10. Chat System */}
            {screen === "chat" && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-between"
              >
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-white flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => setScreen("dashboard")} className="text-secondary hover:text-neutral-950">
                      <ArrowLeft size={16} />
                    </button>
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                        alt="Dr. Sarah" 
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="w-2 h-2 bg-emerald-500 border border-white rounded-full absolute bottom-0 right-0"></span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-950 leading-tight">Dr. Sarah Jenkins</h4>
                      <span className="text-[8px] text-secondary">Active Clinical Psychologist</span>
                    </div>
                  </div>
                </div>

                {/* Chat Message Window */}
                <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto bg-neutral-50 flex flex-col justify-end">
                  <div className="space-y-2">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col max-w-[78%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                      >
                        <div className={`p-2.5 rounded-2xl text-[10px] leading-relaxed ${
                          msg.sender === "user" 
                            ? "bg-accent text-white rounded-tr-none shadow-sm shadow-accent/10" 
                            : "bg-white border border-border text-neutral-900 rounded-tl-none"
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[8px] text-secondary mt-0.5 px-1">{msg.time}</span>
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="bg-white border border-border px-3 py-2 rounded-2xl mr-auto rounded-tl-none flex items-center gap-1 w-12 justify-center">
                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-100"></span>
                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce delay-200"></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Reply Prompts */}
                <div className="px-3 py-1.5 bg-white border-t border-neutral-100 overflow-x-auto flex gap-1.5 shrink-0 select-none">
                  {[
                    "I feel anxious today.",
                    "Let's do breathing.",
                    "Thank you!"
                  ].map((promptText, pIdx) => (
                    <button 
                      key={pIdx}
                      onClick={() => handleQuickReply(promptText)}
                      className="text-[9px] bg-neutral-50 hover:bg-neutral-100 text-secondary hover:text-neutral-950 px-2.5 py-1 rounded-full border border-border shrink-0 font-medium transition-colors"
                    >
                      {promptText}
                    </button>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputMessage);
                  }}
                  className="bg-white p-3 border-t border-border flex gap-2 items-center"
                >
                  <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-neutral-50 border border-border rounded-xl text-xs focus:outline-none focus:border-accent"
                  />
                  <button 
                    type="submit"
                    className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent/90 transition-colors shadow-sm cursor-pointer"
                  >
                    <SendHorizontal size={14} />
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* iPhone Home Indicator bar */}
        <div className="h-6 w-full flex items-center justify-center select-none bg-neutral-50/50 backdrop-blur-md rounded-b-[38px]">
          <div className="w-28 h-1 bg-neutral-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
