import React from 'react';
import { Wifi, SignalHigh, MapPin } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="w-full h-16 bg-[#0a0f16]/90 backdrop-blur-md border-b border-[#1e293b] flex items-center justify-between px-8 z-40">

      {/* Left side */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-black tracking-widest text-white uppercase italic">
          SafePath AI
        </h1>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded border border-cyan-800/30 bg-cyan-950/20">
          <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">System Status:</span>
          <span className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">Nominal</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-gray-400">
          <SignalHigh size={16} />
          <span className="text-[10px] font-bold text-gray-300 mr-2">5G</span>
          <Wifi size={16} />
          <MapPin size={16} />
        </div>

        <div className="flex items-center gap-3 border border-[#1e293b] rounded-full px-4 py-1.5 bg-[#0f1520]">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">Lidar Active</span>
        </div>

        <div className="hidden lg:flex items-center gap-3 border-l border-[#1e293b] pl-6">
          <div className="text-right">
            <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Driver</div>
            <div className="text-xs text-white font-bold">OP_ALPHA_7</div>
          </div>
          <div className="w-8 h-8 rounded bg-gray-800 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Topbar;
