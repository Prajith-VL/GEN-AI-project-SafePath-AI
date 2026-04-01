import React from 'react';

const AlertPanel = ({ alerts }) => (
  <div className="w-full h-full flex flex-col bg-black/60 backdrop-blur-xl border-l border-gray-800">
    <div className="p-4 border-b border-gray-800/80">
      <h2 className="text-xs font-bold text-gray-400 tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
        SYSTEM ALERTS
      </h2>
    </div>
    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
      {alerts.length === 0 ? (
        <div className="text-gray-600 text-sm h-full flex items-center justify-center font-mono tracking-wider">
          NO HAZARDS DETECTED
        </div>
      ) : (
        alerts.map((alert, i) => (
          <div key={i} className="bg-red-950/30 border border-red-900/50 rounded-xl p-3 flex items-start gap-3 backdrop-blur-md">
            <div className="mt-1">⚠️</div>
            <div className="text-red-200 text-sm font-medium">{alert}</div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default AlertPanel;
