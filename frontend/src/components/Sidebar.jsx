import React from 'react';
import { Navigation, Activity, Settings, Power, User } from 'lucide-react';

const Sidebar = ({ currentTab, setTab }) => {
  const tabs = [
    { id: 'drive', label: 'DRIVE', icon: Navigation },
    { id: 'analytics', label: 'ANALYTICS', icon: Activity },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <div className="w-24 h-full bg-[#0a0f16] border-r border-[#1e293b] flex flex-col items-center py-6 justify-between flex-shrink-0 z-50">
      
      <div className="flex flex-col gap-8 w-full items-center">
        {/* Profile */}
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <div className="w-10 h-10 rounded-lg bg-cyan-900/30 border border-cyan-800 flex items-center justify-center text-cyan-500 overflow-hidden group-hover:bg-cyan-800/50 transition-all">
            <User size={20} />
          </div>
          <span className="text-[9px] font-bold text-gray-500 tracking-wider">OPERATOR</span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col w-full gap-2 mt-4 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`relative flex flex-col items-center justify-center py-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'text-cyan-400 bg-cyan-950/20 border border-cyan-800/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30 border border-transparent'
                }`}
              >
                {isActive && <div className="absolute left-0 w-1 h-1/2 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,1)]" />}
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="mb-2" />
                <span className="text-[10px] font-bold tracking-widest uppercase">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Power Button */}
      <button className="text-gray-600 hover:text-red-500 transition-colors p-4 rounded-full hover:bg-red-950/20">
        <Power size={24} />
      </button>

    </div>
  );
};

export default Sidebar;
