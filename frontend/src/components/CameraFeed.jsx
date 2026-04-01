import React, { useEffect } from 'react';

const CameraFeed = ({ isActive, videoRef }) => {
  useEffect(() => {
    let stream;
    if (isActive) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Camera error:", err));
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    }
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [isActive, videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className={`w-full h-full object-cover transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default CameraFeed;
