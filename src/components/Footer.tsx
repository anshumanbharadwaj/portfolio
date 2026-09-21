"use client";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200/80 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-display font-medium text-base text-stone-900">
              Anshuman Bharadwaj
            </span>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
              Interaction Designer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            <span className="text-xs text-stone-500 font-medium tracking-wide">
              Designing globally
            </span>
          </div>

          <div className="text-xs text-stone-400 font-medium">
            © 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
