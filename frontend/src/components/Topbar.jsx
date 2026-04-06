import React from 'react';
import { MapPin, SignalHigh, Wifi } from 'lucide-react';

const severityPills = {
  CRITICAL: 'text-red-300 border-red-500/50 bg-red-500/10',
  WARNING: 'text-yellow-200 border-yellow-500/40 bg-yellow-500/10',
  INFO: 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10',
};

const Topbar = ({ highestSeverity, notification, sourceMode }) => {
  const pillClass = severityPills[highestSeverity] || severityPills.INFO;

  return (
    <div className="w-full bg-[#0a0f16]/90 backdrop-blur-md border-b border-[#1e293b] px-4 py-3 sm:px-6 lg:px-8 z-40">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <h1 className="text-xl sm:text-2xl font-black tracking-widest text-white uppercase italic shrink-0">
          SafePath AI
          </h1>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border ${pillClass}`}>
              <span className="text-[10px] font-bold tracking-widest uppercase">System Status</span>
              <span className="text-[10px] font-black tracking-widest uppercase">{highestSeverity}</span>
            </div>
            <div className="inline-flex items-center gap-3 border border-[#1e293b] rounded-full px-4 py-1.5 bg-[#0f1520]">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
              <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                {sourceMode === 'live' ? 'Live Camera' : 'Demo Mode'}
              </span>
            </div>
          </div>
          {notification && (
            <div className="min-w-0 max-w-2xl text-[11px] text-gray-300 font-medium leading-relaxed md:truncate">
              {notification.title}: {notification.message}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 xl:justify-end">
          <div className="hidden md:flex items-center gap-4 text-gray-400">
            <SignalHigh size={16} />
            <span className="text-[10px] font-bold text-gray-300 mr-2">5G</span>
            <Wifi size={16} />
            <MapPin size={16} />
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
    </div>
  );
};

export default Topbar;
