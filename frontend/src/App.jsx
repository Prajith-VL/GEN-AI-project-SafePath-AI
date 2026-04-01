import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DriveView from './components/DriveView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const App = () => {
  const [currentTab, setCurrentTab] = useState('drive');
  const [isActive, setIsActive] = useState(true); // Default to active for demo
  const [detections, setDetections] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isActive && currentTab === 'drive' && videoRef.current) {
      interval = setInterval(async () => {
        const video = videoRef.current;
        if (!video || video.videoWidth === 0) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const formData = new FormData();
          formData.append('image', blob, 'frame.jpg');

          try {
            const res = await fetch(`${API_BASE_URL}/detect`, {
              method: 'POST',
              body: formData,
            });
            const data = await res.json();
            if (Array.isArray(data)) {
              setDetections(data);
            } else {
              setDetections([]);
            }
          } catch (err) {
            console.error('API Error:', err);
          }
        }, 'image/jpeg');
      }, 500);
    } else {
      setDetections([]);
    }
    return () => clearInterval(interval);
  }, [isActive, currentTab]);

  return (
    <div className="h-screen w-full bg-[#05080f] flex flex-col font-sans overflow-hidden text-white selection:bg-cyan-500/30">
      
      {/* Absolute entire-screen layout */}
      <div className="flex h-full w-full">
        <Sidebar currentTab={currentTab} setTab={setCurrentTab} />
        
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <Topbar />
          
          <div className="flex-1 overflow-hidden relative">
             {currentTab === 'drive' && <DriveView isActive={isActive} videoRef={videoRef} detections={detections} />}
             {currentTab === 'analytics' && <AnalyticsView />}
             {currentTab === 'settings' && <SettingsView />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;
