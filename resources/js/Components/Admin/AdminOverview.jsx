import React from 'react';
import { ClipboardList, Clock, Settings, CheckCircle } from 'lucide-react';

export default function OverviewCard({ stats }) {
  const items = [
    { label: 'Overall Requests', value: stats?.total_requests, icon: Settings },
    { label: 'Pending',          value: stats?.pending,        icon: Clock },
    { label: 'In Progress',      value: stats?.in_progress,    icon: ClipboardList },
    { label: 'Resolved',         value: stats?.resolved,       icon: CheckCircle },
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto font-sans">
      {/* 1. The "Tab" Header Style */}
      <div className="inline-block bg-slate-900 px-8 py-3 rounded-t-3xl border-b-4 border-amber-500 shadow-[0_-4px_10px_-5px_rgba(0,0,0,0.1)]">
        <h2 className="text-xl font-medium text-gray-100">System Overview</h2>
      </div>

      {/* 2. The Main Dark Container */}
      <div className="bg-slate-900 rounded-tr-[40px] rounded-b-[40px] p-8 lg:p-10 flex flex-col lg:flex-row gap-10 items-center">
        
        {/* Left — Glowing Gear Element */}
        <div className="w-full lg:w-64 flex shrink-0 items-center justify-center">
          <div className="z-10 w-36 h-36 bg-[#001219] border-[10px] border-amber-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
            <svg
              className="w-20 h-20 text-amber-500 animate-[rotate-slow_10s_linear_infinite]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
          </div>
        </div>

        {/* Right — The Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 flex-1 w-full">
          {items.map((item, index) => (
            <div key={index} className="relative group cursor-default">
              {/* Stat Card - Default: Slate / Hover: Amber Gradient */}
              <div className="bg-slate-800 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 h-28 rounded-[40px] flex flex-col justify-center px-10 shadow-lg transition-all duration-300 border border-slate-700 hover:border-transparent">
                <span className="text-3xl font-extrabold text-white group-hover:text-slate-950 transition-colors duration-300">
                  {item.value?.toLocaleString() ?? '0'}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-slate-900 font-bold uppercase tracking-widest mt-1 transition-colors duration-300">
                  {item.label}
                </span>
              </div>

              {/* Overlapping Icon Badge */}
              <div className="absolute -top-3 -right-3 w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-700 group-hover:border-amber-500 shadow-xl transition-all duration-300">
                <item.icon size={24} className="text-slate-500 group-hover:text-amber-500 transition-colors duration-300" strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}