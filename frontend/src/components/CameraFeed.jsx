import React, { useEffect } from 'react';

const CameraFeed = ({ demoVideoUrl, isActive, sourceMode, videoRef }) => {
  useEffect(() => {
    let stream;

    const stopCurrentStream = () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    if (!isActive) {
      stopCurrentStream();
      return undefined;
    }

    if (sourceMode === 'demo') {
      stopCurrentStream();
      if (videoRef.current) {
        videoRef.current.src = demoVideoUrl || '';
        if (demoVideoUrl) {
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
        }
      }
      return undefined;
    }

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((capturedStream) => {
        stream = capturedStream;
        if (videoRef.current) {
          videoRef.current.src = '';
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Camera error:', err));

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [demoVideoUrl, isActive, sourceMode, videoRef]);

  return (
    <video
      ref={videoRef}
      autoPlay
      controls={sourceMode === 'demo'}
      loop={sourceMode === 'demo'}
      playsInline
      muted
      className={`w-full h-full object-cover transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default CameraFeed;
