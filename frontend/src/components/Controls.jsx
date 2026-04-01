import React from 'react';

const Controls = ({ isActive, onToggle, activeFeatures, onToggleFeature }) => (
  <div className="w-full bg-black/80 backdrop-blur-xl border-t border-gray-800 p-4 flex justify-between items-center px-8 z-50">
    <div className="flex flex-col">
      <span className="text-gray-500 text-xs font-mono mb-1">SYSTEM CONTROLS</span>
      <span className={`text-sm font-bold ${isActive ? 'text-green-400' : 'text-red-400'}`}>
        {isActive ? 'MONITORING ACTIVE' : 'SYSTEM OFFLINE'}
      </span>
    </div>

    <div className="flex gap-4">
      <button 
        onClick={() => onToggleFeature('hazardMap')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
          activeFeatures.hazardMap ? 'bg-blue-600/20 text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
        }`}
      >
        🗺️ Hazard Map
      </button>
      <button 
        onClick={() => onToggleFeature('dms')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
          activeFeatures.dms ? 'bg-purple-600/20 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500'
        }`}
      >
        👁️ Driver Monitor
      </button>
    </div>

    <button
      onClick={onToggle}
      className={`px-8 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg active:scale-95 ${
        isActive 
          ? 'bg-red-600/20 text-red-500 border border-red-500/50 hover:bg-red-600/30' 
          : 'bg-green-600 text-white hover:bg-green-500'
      }`}
    >
      {isActive ? 'STOP MONITORING' : 'INITIATE SYSTEM'}
    </button>
  </div>
);

export default Controls;
