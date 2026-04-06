import React from 'react';
import { AlertTriangle, Info, Siren } from 'lucide-react';

const severityConfig = {
  CRITICAL: {
    container: 'border-red-900/50 bg-red-950/25',
    text: 'text-red-200',
    badge: 'text-red-300 bg-red-500/15 border-red-500/30',
    Icon: Siren,
  },
  WARNING: {
    container: 'border-yellow-900/50 bg-yellow-950/20',
    text: 'text-yellow-100',
    badge: 'text-yellow-200 bg-yellow-500/15 border-yellow-500/30',
    Icon: AlertTriangle,
  },
  INFO: {
    container: 'border-cyan-900/50 bg-cyan-950/20',
    text: 'text-cyan-100',
    badge: 'text-cyan-200 bg-cyan-500/15 border-cyan-500/30',
    Icon: Info,
  },
};

const HazardPanel = ({ alerts }) => (
  <div className="w-full h-full flex flex-col bg-[#0a0f16] rounded-2xl border border-[#1e293b] overflow-hidden">
    <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
      <h2 className="text-xs font-bold text-gray-400 tracking-widest flex items-center gap-2 uppercase">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        Live Hazard Alerts
      </h2>
      <span className="text-[10px] text-gray-500 font-bold tracking-[0.25em] uppercase">
        {alerts.length} tracked
      </span>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {alerts.length === 0 ? (
        <div className="text-gray-600 text-sm h-full flex items-center justify-center font-mono tracking-wider uppercase">
          No hazards detected
        </div>
      ) : (
        alerts.map((alert) => {
          const config = severityConfig[alert.severity] || severityConfig.INFO;
          const Icon = config.Icon;

          return (
            <div
              key={alert.id}
              className={`rounded-xl border p-4 flex items-start gap-3 backdrop-blur-md ${config.container}`}
            >
              <div className={`mt-1 rounded-lg p-2 ${config.badge}`}>
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className={`text-sm font-black tracking-wide uppercase ${config.text}`}>{alert.title}</div>
                  <div className={`border rounded-full px-2 py-1 text-[9px] font-black tracking-[0.18em] uppercase ${config.badge}`}>
                    {alert.severity}
                  </div>
                </div>
                <p className="text-sm text-white/75 mt-2 leading-relaxed">{alert.message}</p>
                {Array.isArray(alert.labels) && alert.labels.length > 0 && (
                  <div className="text-[10px] text-gray-500 mt-2 uppercase tracking-[0.18em]">
                    Sources: {alert.labels.join(', ')}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
);

export default HazardPanel;
