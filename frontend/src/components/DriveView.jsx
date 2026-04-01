import React from 'react';
import CameraFeed from './CameraFeed';
import DetectionOverlay from './DetectionOverlay';
import { AlertTriangle, HardHat, Music, Shield } from 'lucide-react';

const DriveView = ({ isActive, videoRef, detections }) => {
  return (
    <div className="h-full w-full p-6 grid grid-cols-12 grid-rows-6 gap-6 overflow-hidden bg-[#05080f]">
      
      {/* Main Camera View (Spans mostly left/center) */}
      <div className="col-span-12 lg:col-span-8 row-span-4 rounded-2xl overflow-hidden relative border border-[#1e293b] shadow-2xl bg-[#0a0f16] group">
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono tracking-widest z-20">
            AWAITING DEPLOYMENT
          </div>
        )}
        
        {/* Video & Overlays */}
        <div className="absolute inset-0 z-0">
           <CameraFeed isActive={isActive} videoRef={videoRef} />
        </div>
        
        {/* Scanning grid effect overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20mix-blend-overlay"></div>

        {/* Detections */}
        {isActive && <DetectionOverlay detections={detections} />}

        {/* HUD Elements */}
        {isActive && (
          <>
            <div className="absolute top-6 left-6 z-20">
              <h3 className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mb-1 drop-shadow-md">CURRENT SPEED</h3>
              <div className="text-5xl font-black text-white tracking-tighter drop-shadow-lg flex items-baseline gap-1">
                64 <span className="text-xl text-cyan-400 font-bold">KM/H</span>
              </div>
            </div>
            <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-gray-700/50 rounded px-4 py-2 flex flex-col items-end">
              <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">ACTIVE SESSION</span>
              <span className="text-sm text-white font-bold tracking-wider uppercase">LIDAR ACTIVE</span>
            </div>
          </>
        )}
      </div>

      {/* Right Column - Top (Safety Score & Bars) */}
      <div className="col-span-12 lg:col-span-4 row-span-2 bg-[#0a0f16] rounded-2xl border border-[#1e293b] p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
           <div>
             <h3 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2">DRIVE SAFETY SCORE</h3>
             <div className="text-5xl font-black text-cyan-400 tracking-tighter flex items-end">
               94.2<span className="text-xl text-gray-500 font-bold mb-1">/100</span>
             </div>
           </div>
           <Shield size={48} className="text-[#152033]" />
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <div className="flex justify-between text-[9px] font-bold text-gray-400 tracking-wider mb-1">
              <span>BRAKING PRECISION</span>
              <span className="text-cyan-400">98%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-[98%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[9px] font-bold text-gray-400 tracking-wider mb-1">
              <span>LANE DISCIPLINE</span>
              <span className="text-yellow-500">82%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 w-[82%] shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Middle (Environment Radar) */}
      <div className="col-span-12 lg:col-span-4 row-span-4 bg-[#0a0f16] rounded-2xl border border-[#1e293b] p-6 flex flex-col">
        <h3 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-4">ENVIRONMENT RADAR</h3>
        <div className="flex-1 rounded-xl bg-[#05080f] border border-[#1e293b] relative flex items-center justify-center overflow-hidden">
           {/* Radar circles */}
           <div className="absolute w-[80%] h-[80%] rounded-xl border border-[#1e293b]/50"></div>
           <div className="absolute w-[50%] h-[50%] rounded-xl border border-[#1e293b]/80"></div>
           {/* Self car */}
           <div className="w-4 h-8 bg-cyan-400 rounded-sm shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"></div>
           {/* Objects */}
           <div className="absolute top-[20%] right-[30%] w-3 h-6 bg-yellow-500/80 rounded-sm"></div>
           <div className="absolute bottom-[30%] left-[20%] w-2 h-4 bg-gray-600 rounded-sm"></div>
           <div className="absolute top-[40%] right-[10%] w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center animate-pulse">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
           </div>
        </div>
      </div>

      {/* Bottom Area - Alerts & Extra */}
      <div className="col-span-12 lg:col-span-4 row-span-2 bg-[#1a0f14] rounded-2xl border border-red-900/30 p-5 flex items-center gap-5 shadow-[inset_0_0_40px_rgba(153,27,27,0.1)]">
        <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
          <AlertTriangle size={24} />
        </div>
        <div>
           <h4 className="text-red-500 font-black text-lg tracking-wide uppercase leading-tight">COLLISION ALERT</h4>
           <p className="text-red-200/70 text-[10px] uppercase tracking-wider mt-1 line-clamp-2">Vehicle approaching rapidly from right blind-spot.</p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 row-span-2 bg-[#15130a] rounded-2xl border border-yellow-900/30 p-5 flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-[#15130a] flex-shrink-0">
          <HardHat size={24} />
        </div>
        <div>
           <h4 className="text-yellow-500 font-black text-lg tracking-wide uppercase leading-tight">ROAD WORK AHEAD</h4>
           <p className="text-yellow-200/60 text-[10px] uppercase tracking-wider mt-1 line-clamp-2">Lane closure in 400m. Prepare to merge left.</p>
        </div>
      </div>

    </div>
  );
};

export default DriveView;
