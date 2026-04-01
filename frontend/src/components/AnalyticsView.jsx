import React from 'react';
import { Download, Play, Share2 } from 'lucide-react';

const AnalyticsView = () => {
  return (
    <div className="h-full w-full p-6 grid grid-cols-12 grid-rows-6 gap-6 overflow-y-auto bg-[#05080f]">
       
       {/* Top Left - Score Circle */}
       <div className="col-span-12 lg:col-span-4 row-span-2 bg-[#0a0f16] rounded-2xl border border-[#1e293b] p-6 flex flex-col items-center justify-center relative">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* SVG Circle */}
            <svg className="w-full h-full transform -rotate-90 absolute">
               <circle cx="64" cy="64" r="58" stroke="#1e293b" strokeWidth="8" fill="none" />
               <circle cx="64" cy="64" r="58" stroke="#22d3ee" strokeWidth="8" fill="none" strokeDasharray="364" strokeDashoffset="54" className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" strokeLinecap="round" />
            </svg>
            <div className="text-center z-10">
              <div className="text-4xl font-black text-white">85</div>
              <div className="text-[8px] font-bold tracking-widest text-cyan-400 mt-1">SAFETY SCORE</div>
            </div>
          </div>
          <div className="flex w-full justify-between mt-6 px-4">
             <div className="text-center">
               <div className="text-white font-bold text-sm">42.8</div>
               <div className="text-[8px] text-gray-500 font-bold tracking-wider">KM DISTANCE</div>
             </div>
             <div className="text-center">
               <div className="text-white font-bold text-sm">1h 12m</div>
               <div className="text-[8px] text-gray-500 font-bold tracking-wider">DRIVE TIME</div>
             </div>
          </div>
       </div>

       {/* Top Right - Insights Text & Stats */}
       <div className="col-span-12 lg:col-span-8 row-span-2 bg-[#0a0f16] rounded-2xl border border-[#1e293b] p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-2">POST-DRIVE INSIGHTS</h3>
            <h2 className="text-2xl font-black text-white mb-2">Steady Control & High Alertness</h2>
            <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
              Your driving performance was in the top 15th percentile for urban conditions. LIDAR detected 12 critical hazards with 100% successful avoidance rate. Minimal harsh braking recorded.
            </p>
          </div>
          
          <div className="flex gap-4 mt-6">
             <div className="flex-[1] bg-[#05080f] rounded-xl border border-[#1e293b] p-4 border-b-2 border-b-cyan-500">
               <div className="text-[9px] text-gray-500 font-bold tracking-wider mb-1 uppercase">Cornering G-Force</div>
               <div className="text-xl font-bold text-white mb-1">0.42g</div>
               <div className="text-[9px] text-gray-400 uppercase">Within safety limit</div>
             </div>
             <div className="flex-[1] bg-[#05080f] rounded-xl border border-[#1e293b] p-4 border-b-2 border-b-yellow-500">
               <div className="text-[9px] text-gray-500 font-bold tracking-wider mb-1 uppercase">Fuel Economy</div>
               <div className="text-xl font-bold text-white mb-1">18.2 <span className="text-[10px] text-gray-400">km/l</span></div>
               <div className="text-[9px] text-gray-400 uppercase">Optimal throttle input</div>
             </div>
             <div className="flex-[1] bg-[#05080f] rounded-xl border border-[#1e293b] p-4 border-b-2 border-b-red-500">
               <div className="text-[9px] text-gray-500 font-bold tracking-wider mb-1 uppercase">Critical Hazards</div>
               <div className="text-xl font-bold text-white mb-1">04</div>
               <div className="text-[9px] text-gray-400 uppercase">Requiring steering assist</div>
             </div>
          </div>
       </div>

       {/* Bottom Left - Heat Map */}
       <div className="col-span-12 lg:col-span-6 row-span-4 bg-[#0a0f16] rounded-2xl border border-[#1e293b] overflow-hidden relative group">
          <div className="absolute top-6 left-6 z-10 bg-black/50 backdrop-blur px-3 py-1.5 rounded border border-gray-700">
            <span className="text-[9px] font-bold text-white tracking-widest uppercase">HAZARD HEAT MAP</span>
          </div>
          
          {/* Mock Triangle Graphic */}
          <div className="w-full h-full flex items-center justify-center bg-[#151a23]">
             <div className="relative w-80 h-80">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                   <polygon points="50,10 90,90 10,90" fill="none" stroke="#2a3547" strokeWidth="15" strokeLinejoin="round" />
                   <polygon points="50,10 90,90 10,90" fill="#1e2635" />
                   {/* Center icon exclamation */}
                   <path d="M48,35 L52,35 L51,60 L49,60 Z M50,70 A3,3 0 1,0 50,76 A3,3 0 1,0 50,70" fill="#0a0f16" />
                </svg>
                {/* Dots */}
                <div className="absolute top-[25%] right-[20%] w-6 h-6 bg-yellow-500/30 rounded-full flex items-center justify-center border border-yellow-500/50">
                   <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="absolute top-[30%] right-[3%] text-[8px] text-yellow-500 font-bold bg-black/50 px-1 py-0.5 rounded border border-yellow-500/30 uppercase tracking-widest">STRAY ANIMAL</div>

                <div className="absolute bottom-[35%] left-[25%] w-6 h-6 bg-red-500/30 rounded-full flex items-center justify-center border border-red-500/50">
                   <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <div className="absolute bottom-[28%] left-[20%] text-[8px] text-red-500 font-bold bg-black/50 px-1 py-0.5 rounded border border-red-500/30 uppercase tracking-widest">POTHOLE</div>
             </div>
          </div>
          
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button className="bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded text-[10px] font-bold tracking-wider uppercase backdrop-blur transition-colors">EXPORT KML</button>
            <button className="bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/50 text-cyan-400 px-4 py-2 rounded text-[10px] font-bold tracking-wider uppercase backdrop-blur transition-colors flex items-center gap-1">
               <Play size={12} /> REPLAY DRIVE
            </button>
          </div>
       </div>

       {/* Bottom Right - Frequent Hazards */}
       <div className="col-span-12 lg:col-span-6 row-span-4 bg-[#0a0f16] rounded-2xl border border-[#1e293b] p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-6">FREQUENT HAZARDS ENCOUNTERED</h3>
            
            <div className="space-y-3">
              <div className="bg-[#111721] border border-yellow-900/30 border-l-[3px] border-l-yellow-500 rounded-lg p-4 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="text-yellow-500 bg-yellow-950/50 p-2 rounded">🐾</div>
                    <div>
                      <div className="text-white font-bold text-sm">Stray Animals</div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">3 Detections • High Priority</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">AVOIDANCE</div>
                    <div className="text-cyan-400 text-[10px] font-black tracking-widest uppercase">SUCCESSFUL</div>
                 </div>
              </div>

              <div className="bg-[#111721] border border-red-900/30 border-l-[3px] border-l-red-500 rounded-lg p-4 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="text-red-500 bg-red-950/50 p-2 rounded">⚠️</div>
                    <div>
                      <div className="text-white font-bold text-sm">Aggressive Overtaking</div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">5 Detections • Proximity Alert</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">INTERVENTION</div>
                    <div className="text-red-500 text-[10px] font-black tracking-widest uppercase">ASSISTED</div>
                 </div>
              </div>

              <div className="bg-[#111721] border border-gray-800 border-l-[3px] border-l-gray-500 rounded-lg p-4 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="text-gray-400 bg-gray-900 p-2 rounded">🚧</div>
                    <div>
                      <div className="text-white font-bold text-sm">Unmarked Speed Breaker</div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">2 Detections • Road Condition</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">MAP TAG</div>
                    <div className="text-gray-400 text-[10px] font-black tracking-widest uppercase">SAVED</div>
                 </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
              <div className="flex-[1] bg-gradient-to-r from-cyan-950/30 to-transparent border border-cyan-900/30 rounded-xl p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="text-cyan-400">☁️</div>
                   <div>
                     <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">ROAD VISIBILITY</div>
                     <div className="text-white font-bold tracking-wide">EXCELLENT</div>
                   </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">AVG LIGHTING</div>
                    <div className="text-cyan-400 font-bold text-sm tracking-wide">420 LUX</div>
                 </div>
              </div>
          </div>
          
          <button className="w-full mt-4 bg-cyan-400 hover:bg-cyan-300 transition-colors text-black font-black text-xs tracking-widest uppercase py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2">
             <Share2 size={16} /> DOWNLOAD SESSION REPORT
          </button>
       </div>

    </div>
  );
};

export default AnalyticsView;
