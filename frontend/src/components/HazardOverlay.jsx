import React from 'react';

const labelStyles = {
  person: 'border-red-400 bg-red-500/10 text-red-100',
  pedestrian: 'border-red-400 bg-red-500/10 text-red-100',
  pothole: 'border-yellow-400 bg-yellow-500/10 text-yellow-100',
  cow: 'border-orange-400 bg-orange-500/10 text-orange-100',
  dog: 'border-orange-400 bg-orange-500/10 text-orange-100',
  'road barricade': 'border-amber-400 bg-amber-500/10 text-amber-100',
};

const HazardOverlay = ({ detections, frameSize }) => (
  <div className="absolute inset-0 pointer-events-none z-10">
    {Array.isArray(detections) && detections.map((det, i) => {
      const frameWidth = frameSize?.width || 1;
      const frameHeight = frameSize?.height || 1;
      const [x, y, width, height] = det.bbox;
      const style = labelStyles[det.label] || 'border-cyan-400 bg-cyan-500/10 text-cyan-100';

      return (
        <div
          key={det.id || i}
          className={`absolute border-2 flex flex-col justify-start transition-all duration-75 ${style}`}
          style={{
            left: `${(x / frameWidth) * 100}%`,
            top: `${(y / frameHeight) * 100}%`,
            width: `${(width / frameWidth) * 100}%`,
            height: `${(height / frameHeight) * 100}%`,
          }}
        >
          <div className="bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap self-start -mt-5 rounded-t-sm backdrop-blur-sm uppercase tracking-wide">
            {det.label} · {(det.confidence * 100).toFixed(0)}%
          </div>
        </div>
      );
    })}
  </div>
);

export default HazardOverlay;
