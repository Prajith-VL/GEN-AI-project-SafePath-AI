import React from 'react';
import { AlertTriangle, Camera, MonitorPlay, Shield, Upload, Video, X } from 'lucide-react';
import CameraFeed from './CameraFeed';
import HazardOverlay from './HazardOverlay';
import HazardPanel from './HazardPanel';

const severityStyles = {
  CRITICAL: {
    badge: 'bg-red-500/20 text-red-300 border-red-500/50',
    card: 'bg-[#1a0f14] border-red-900/40',
    icon: 'bg-red-600 text-white',
  },
  WARNING: {
    badge: 'bg-yellow-500/20 text-yellow-200 border-yellow-500/50',
    card: 'bg-[#171208] border-yellow-900/40',
    icon: 'bg-yellow-500 text-[#15130a]',
  },
  INFO: {
    badge: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50',
    card: 'bg-[#09151a] border-cyan-900/40',
    icon: 'bg-cyan-500 text-[#061016]',
  },
};

const fallbackCards = [
  {
    id: 'system-ready',
    title: 'SYSTEM MONITORING',
    message: 'Detection pipeline is active and waiting for high-priority hazards.',
    severity: 'INFO',
  },
  {
    id: 'demo-tip',
    title: 'DEMO MODE READY',
    message: 'Upload a road video to simulate the live alert experience.',
    severity: 'WARNING',
  },
];

const DriveView = ({
  apiError,
  demoVideoName,
  demoVideoUrl,
  detections,
  frameSize,
  hazards,
  isActive,
  notifications,
  onClearDemo,
  onDemoUpload,
  setSourceMode,
  sourceMode,
  videoRef,
}) => {
  const cards = hazards.length > 0 ? hazards.slice(0, 2) : fallbackCards;

  return (
    <div className="h-full w-full overflow-y-auto bg-[#05080f] p-4 sm:p-5 lg:p-6">
      <div className="grid grid-cols-12 auto-rows-[minmax(220px,auto)] gap-4 lg:gap-6">
      <div className="col-span-12 xl:col-span-8 min-h-[460px] xl:min-h-[620px] rounded-2xl overflow-hidden relative border border-[#1e293b] shadow-2xl bg-[#0a0f16] group">
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono tracking-widest z-20">
            AWAITING DEPLOYMENT
          </div>
        )}

        <div className="absolute inset-0 z-0">
          <CameraFeed
            demoVideoUrl={demoVideoUrl}
            isActive={isActive}
            sourceMode={sourceMode}
            videoRef={videoRef}
          />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay"></div>

        {isActive && <HazardOverlay detections={detections} frameSize={frameSize} />}

        <div className="absolute inset-x-0 top-0 z-20 p-4 sm:p-5 space-y-3">
          {notifications.slice(0, 2).map((alert) => {
            const style = severityStyles[alert.severity] || severityStyles.INFO;
            return (
              <div
                key={alert.id}
                className={`mx-auto max-w-3xl rounded-xl border px-4 py-3 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)] ${style.badge}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-black tracking-[0.25em] uppercase">{alert.severity}</div>
                    <div className="text-sm font-black tracking-wide uppercase mt-1">{alert.title}</div>
                    <p className="text-xs sm:text-sm mt-1 opacity-90">{alert.message}</p>
                  </div>
                  <AlertTriangle size={18} className="shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>

        {isActive && (
          <>
             <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-20 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-black tracking-[0.25em] text-cyan-300 uppercase">
                {sourceMode === 'live' ? 'Live Camera' : 'Demo Video'}
              </span>
              <span className="rounded-full border border-gray-700/60 bg-black/40 px-3 py-1 text-[10px] font-bold tracking-[0.22em] text-gray-300 uppercase">
                {detections.length} Active Detections
              </span>
              {apiError && (
                <span className="rounded-full border border-red-500/50 bg-red-500/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-red-200 uppercase">
                  Detection Offline
                </span>
              )}
            </div>

             <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 max-w-[55%]">
               <h3 className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mb-1 drop-shadow-md">SYSTEM SPEED</h3>
               <div className="text-3xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-lg flex items-baseline gap-1">
                64 <span className="text-base sm:text-xl text-cyan-400 font-bold">KM/H</span>
               </div>
             </div>

             <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 bg-black/60 backdrop-blur-md border border-gray-700/50 rounded px-3 sm:px-4 py-2 flex flex-col items-end max-w-[42%]">
               <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">ACTIVE SESSION</span>
               <span className="text-xs sm:text-sm text-white font-bold tracking-wider uppercase text-right">
                 {sourceMode === 'live' ? 'LIDAR ACTIVE' : 'DEMO PLAYBACK'}
               </span>
             </div>
          </>
        )}
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-[#0a0f16] rounded-2xl border border-[#1e293b] p-5 sm:p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-2">HAZARD PRIORITY STATE</h3>
            <div className="text-5xl font-black text-cyan-400 tracking-tighter flex items-end">
              {hazards.length}
              <span className="text-xl text-gray-500 font-bold mb-1 ml-2">live alerts</span>
            </div>
          </div>
          <Shield size={48} className="text-[#152033]" />
        </div>

        <div className="space-y-4 mt-4">
          <div>
            <div className="flex justify-between text-[9px] font-bold text-gray-400 tracking-wider mb-1">
              <span>CRITICAL SIGNALS</span>
              <span className="text-red-400">{hazards.filter((hazard) => hazard.severity === 'CRITICAL').length}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <div className="h-full bg-red-500 w-[72%] shadow-[0_0_10px_rgba(239,68,68,0.45)]"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[9px] font-bold text-gray-400 tracking-wider mb-1">
              <span>DETECTION STREAM</span>
              <span className="text-cyan-400">{sourceMode === 'live' ? 'LIVE' : 'DEMO'}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 w-[90%] shadow-[0_0_10px_rgba(34,211,238,0.45)]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 xl:col-span-4 xl:row-span-2 min-h-[320px] xl:min-h-0">
        <HazardPanel alerts={hazards} />
      </div>

      {cards.map((card) => {
        const style = severityStyles[card.severity] || severityStyles.INFO;
        return (
          <div
            key={card.id}
            className={`col-span-12 md:col-span-6 xl:col-span-4 rounded-2xl border p-5 flex items-center gap-4 sm:gap-5 shadow-[inset_0_0_40px_rgba(0,0,0,0.08)] ${style.card}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${style.icon}`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="font-black text-lg tracking-wide uppercase leading-tight">{card.title}</h4>
              <p className="text-white/70 text-[11px] tracking-wide mt-1 line-clamp-2">{card.message}</p>
            </div>
          </div>
        );
      })}

      <div className="col-span-12 xl:col-span-4 bg-[#0a0f16] rounded-2xl border border-[#1e293b] p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Source Mode</h3>
            <p className="text-sm text-white font-bold mt-2">Keep live camera as default and switch to demo when needed.</p>
          </div>
          <Video size={28} className="text-cyan-400" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={() => setSourceMode('live')}
            className={`flex-1 rounded-xl border px-4 py-3 text-xs font-black tracking-[0.2em] uppercase transition ${
              sourceMode === 'live'
                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                : 'border-[#1e293b] bg-[#05080f] text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Camera size={15} /> Live Camera
            </span>
          </button>
          <button
            onClick={() => demoVideoUrl && setSourceMode('demo')}
            className={`flex-1 rounded-xl border px-4 py-3 text-xs font-black tracking-[0.2em] uppercase transition ${
              sourceMode === 'demo'
                ? 'border-yellow-500/50 bg-yellow-500/10 text-yellow-200'
                : 'border-[#1e293b] bg-[#05080f] text-gray-400 hover:text-white'
            } ${!demoVideoUrl ? 'opacity-60' : ''}`}
          >
            <span className="flex items-center justify-center gap-2">
              <MonitorPlay size={15} /> Demo Video
            </span>
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label className="flex-1 cursor-pointer rounded-xl border border-dashed border-cyan-700/60 bg-cyan-950/20 px-4 py-3 text-xs font-black tracking-[0.18em] text-cyan-300 uppercase text-center hover:bg-cyan-950/35 transition">
            <input type="file" accept="video/*" className="hidden" onChange={onDemoUpload} />
            <span className="flex items-center justify-center gap-2">
              <Upload size={15} /> Upload Demo Video
            </span>
          </label>
          {demoVideoUrl && (
            <button
              onClick={onClearDemo}
              className="rounded-xl border border-red-800/60 bg-red-950/30 px-3 py-3 text-red-300 hover:bg-red-950/50 transition"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="mt-3 text-[11px] text-gray-400 truncate">
          {demoVideoName ? `Loaded: ${demoVideoName}` : 'No demo video loaded'}
        </div>
      </div>
      </div>
    </div>
  );
};

export default DriveView;
