import React, { useState } from 'react';
import { AlertTriangle, HelpCircle, Server } from 'lucide-react';

const SettingsView = () => {
  const [sensitivity, setSensitivity] = useState('MEDIUM');
  return (
    <div className="h-full w-full p-8 grid grid-cols-12 gap-8 overflow-y-auto bg-[#05080f]">
       
       <div className="col-span-12 mb-2">
         <h1 className="text-2xl font-black text-white tracking-wide">System Configuration</h1>
         <p className="text-gray-400 text-sm mt-1">Fine-tune ADAS response parameters for regional driving conditions.</p>
       </div>

       {/* Left Column - Configuration */}
       <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
         
         {/* Sensitivity */}
         <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-cyan-400" />
              <h3 className="text-[11px] text-cyan-400 font-black tracking-widest uppercase">COLLISION SENSITIVITY</h3>
            </div>
            
            <div className="flex bg-[#0a0f16] border border-[#1e293b] rounded-xl p-1 gap-1">
               {['LOW', 'MEDIUM', 'HIGH'].map(lvl => (
                 <button 
                   key={lvl}
                   onClick={() => setSensitivity(lvl)}
                   className={`flex-1 py-4 rounded-lg flex flex-col items-center justify-center transition-all ${
                     sensitivity === lvl 
                       ? 'bg-cyan-950/40 border border-cyan-800/60 shadow-[inset_0_0_15px_rgba(34,211,238,0.1)]' 
                       : 'hover:bg-[#111721] border border-transparent'
                   }`}
                 >
                   <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase mb-1">
                     {lvl === 'LOW' ? 'PASSIVE' : lvl === 'MEDIUM' ? 'BALANCED' : 'TACTICAL'}
                   </span>
                   <span className={`text-sm font-black tracking-wider ${sensitivity === lvl ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400'}`}>
                     {lvl}
                   </span>
                 </button>
               ))}
            </div>
            <p className="text-[10px] text-gray-500 font-mono mt-3 italic">
              *Recommended for high-entropy urban environments with mixed traffic.
            </p>
         </div>

         {/* Regional Mitigation */}
         <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-yellow-500" />
                <h3 className="text-[11px] text-yellow-500 font-black tracking-widest uppercase">REGIONAL MITIGATION</h3>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-[#a16207] bg-[#422006] px-2 py-1 rounded">CUSTOM AI MODELS</span>
            </div>

            <div className="bg-[#0a0f16] border border-[#1e293b] rounded-xl flex flex-col overflow-hidden">
               {/* Toggle 1 */}
               <div className="p-5 border-b border-[#1e293b] flex justify-between items-center hover:bg-[#0c121b] transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="text-gray-500 text-xl w-8 text-center">🐾</div>
                   <div>
                     <div className="text-white font-bold text-sm">Stray Animals</div>
                     <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">CATTLE & CANINE AVOIDANCE LOGIC</div>
                   </div>
                 </div>
                 {/* Cyan Toggle On */}
                 <div className="w-12 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center p-1 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 translate-x-6 transition-transform shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                 </div>
               </div>

               {/* Toggle 2 */}
               <div className="p-5 border-b border-[#1e293b] flex justify-between items-center hover:bg-[#0c121b] transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="text-gray-500 text-xl w-8 text-center">⚡</div>
                   <div>
                     <div className="text-white font-bold text-sm">Wrong-way Drivers</div>
                     <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">COUNTER-FLOW TRAFFIC ALERTS</div>
                   </div>
                 </div>
                 {/* Cyan Toggle On */}
                 <div className="w-12 h-6 rounded-full bg-cyan-950 border border-cyan-800 flex items-center p-1 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 translate-x-6 transition-transform shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                 </div>
               </div>

               {/* Toggle 3 */}
               <div className="p-5 flex justify-between items-center hover:bg-[#0c121b] transition-colors opacity-60">
                 <div className="flex items-center gap-4">
                   <div className="text-gray-500 text-xl w-8 text-center">⚠️</div>
                   <div>
                     <div className="text-white font-bold text-sm">Unmarked Potholes</div>
                     <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">SURFACE DEFORMITY DETECTION</div>
                   </div>
                 </div>
                 {/* Gray Toggle Off */}
                 <div className="w-12 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center p-1 cursor-pointer">
                    <div className="w-4 h-4 rounded-full bg-gray-500 transition-transform"></div>
                 </div>
               </div>
            </div>
         </div>

       </div>

       {/* Right Column - System & Calibration */}
       <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
          
          {/* Sensor Calibration */}
          <div className="bg-[#0a0f16] border border-[#1e293b] rounded-2xl p-6">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-4 border-2 border-cyan-400 rounded-sm grid grid-cols-2 gap-[1px] p-[1px]">
                  <div className="bg-cyan-400 rounded-[1px]"></div><div className="bg-cyan-400 rounded-[1px]"></div>
                  <div className="bg-cyan-400 rounded-[1px]"></div><div className="bg-cyan-400 rounded-[1px]"></div>
                </div>
                <h3 className="text-[11px] text-white font-black tracking-widest uppercase">SENSOR CALIBRATION</h3>
             </div>

             <div className="space-y-5">
               <div>
                  <div className="flex justify-between text-[8px] font-bold text-gray-300 tracking-widest uppercase mb-2">
                    <span>LIDAR ARRAY [FRONT/TOP]</span>
                    <span className="text-white">98% OPTIMAL</span>
                  </div>
                  <div className="w-full h-1 bg-[#1e293b] overflow-hidden">
                    <div className="h-full bg-cyan-400 w-[98%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                  </div>
               </div>

               <div>
                  <div className="flex justify-between text-[8px] font-bold text-gray-300 tracking-widest uppercase mb-2">
                    <span>360° OPTICAL SENSORS</span>
                    <span className="text-yellow-500 animate-pulse">CALIBRATING...</span>
                  </div>
                  <div className="w-full h-1 bg-[#1e293b] overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[65%] shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  </div>
               </div>
             </div>

             <div className="mt-8 bg-[#05080f] rounded-lg border border-[#1e293b] p-4 flex items-center gap-4">
               <div className="text-gray-400">📡</div>
               <div>
                 <div className="text-white font-bold text-sm tracking-wide">RTK PRECISION LOCK</div>
                 <div className="text-[9px] text-gray-500 font-mono tracking-wider mt-1">LAT: 28.6139 | LON: 77.2090</div>
               </div>
             </div>

             <button className="w-full mt-6 border border-cyan-500/50 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-400 font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all flex justify-center items-center gap-2">
               ⟳ INITIATE RECALIBRATION
             </button>
          </div>

          {/* System Logs */}
          <div className="flex-1 bg-[#0a0f16] border border-[#1e293b] rounded-2xl p-6 flex flex-col relative overflow-hidden">
             {/* Gradient fade at bottom */}
             <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0a0f16] to-transparent pointer-events-none z-10"></div>
             
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">SYSTEM LOG V4.2.1</h3>
               <span className="text-gray-500 tracking-widest">...</span>
             </div>

             <div className="space-y-4 font-mono text-[9px] tracking-wider relative flex-1">
               <div className="flex gap-4">
                 <span className="text-gray-600">08:42:01</span>
                 <span className="text-gray-400">Neural Engine optimization for heavy rain mode completed.</span>
               </div>
               <div className="flex gap-4">
                 <span className="text-gray-600">08:42:05</span>
                 <span className="text-yellow-500">Warning: High humidity detected in Front-Left sensor housing.</span>
               </div>
               <div className="flex gap-4">
                 <span className="text-gray-600">08:42:12</span>
                 <span className="text-cyan-400 opacity-80">Calibration data sync with Cloud-Core successful.</span>
               </div>
               <div className="flex gap-4 opacity-50">
                 <span className="text-gray-600">08:42:15</span>
                 <span className="text-gray-400">System heartbeat OK.</span>
               </div>
             </div>
             
             {/* Bottom Admin Buttons */}
             <div className="flex justify-between gap-4 mt-4 z-20">
               <button className="flex-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-400 text-[10px] font-bold tracking-widest uppercase py-3 rounded-lg flex justify-center items-center gap-2 transition-colors">
                 <HelpCircle size={14} /> GUIDE
               </button>
               <button className="flex-1 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-500 text-[10px] font-bold tracking-widest uppercase py-3 rounded-lg flex justify-center items-center gap-2 transition-colors">
                 ! EMERGENCY RESET
               </button>
             </div>
          </div>

       </div>
    </div>
  );
};

export default SettingsView;
