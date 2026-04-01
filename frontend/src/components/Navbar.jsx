import React from 'react';

const Navbar = ({ isActive }) => (
  <nav className="w-full bg-black/40 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center z-50">
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}></div>
      <h1 className="text-xl font-bold tracking-widest text-white">
        SAFEPATH <span className="text-gray-500">AI</span>
      </h1>
    </div>
    <div className="flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-700">
      <span className="text-xs font-mono text-gray-400">STATUS:</span>
      <span className={`text-xs font-bold ${isActive ? 'text-green-400' : 'text-gray-500'}`}>
        {isActive ? 'ACTIVE' : 'STANDBY'}
      </span>
    </div>
  </nav>
);

export default Navbar;
