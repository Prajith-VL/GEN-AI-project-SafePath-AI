import React from 'react';

const DetectionOverlay = ({ detections }) => (
  <div className="absolute inset-0 pointer-events-none z-10">
    {Array.isArray(detections) && detections.map((det, i) => (
      <div
        key={i}
        className="absolute border-2 border-red-500 bg-red-500/10 flex flex-col justify-start transition-all duration-75"
        style={{
          left: `${det.bbox[0]}px`,
          top: `${det.bbox[1]}px`,
          width: `${det.bbox[2]}px`,
          height: `${det.bbox[3]}px`,
        }}
      >
        <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap self-start -mt-5 rounded-t-sm backdrop-blur-sm">
          {det.label.toUpperCase()} · {(det.confidence * 100).toFixed(0)}%
        </div>
      </div>
    ))}
  </div>
);

export default DetectionOverlay;
