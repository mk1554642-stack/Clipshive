
import React, { useState, useRef, useEffect } from 'react';

const BackgroundVideo = React.memo(() => {
  const [activeVideo, setActiveVideo] = useState<'forward' | 'reverse'>('forward');
  const [isLoaded, setIsLoaded] = useState(false);
  const forwardRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);

  // Handle the Boomerang Loop
  const handleForwardEnded = () => {
    if (reverseRef.current) {
      reverseRef.current.currentTime = 0;
      reverseRef.current.play().catch(() => {}); // Catch play interruption errors
      setActiveVideo('reverse');
    }
  };

  const handleReverseEnded = () => {
    if (forwardRef.current) {
      forwardRef.current.currentTime = 0;
      forwardRef.current.play().catch(() => {});
      setActiveVideo('forward');
    }
  };

  const onLoaded = () => setIsLoaded(true);

  // OPTIMIZED URLS:
  // 1. fps_24: Cinematic look, 20% less decoding work than 30fps.
  // 2. w_1280: 720p is visually identical for backgrounds but 50% lighter than 1080p.
  // 3. br_2500: 2.5Mbps bitrate cap prevents network buffering stutter.
  // 4. q_auto:eco: More aggressive compression for background textures.
  const VIDEO_SETTINGS = "fps_24,q_auto:eco,br_2500,w_1280,f_auto";
  const POSTER_SETTINGS = "q_auto,f_jpg,w_1280";
  const ID = "v1767529641/background_oooay4";
  
  const forwardSrc = `https://res.cloudinary.com/daepdtgua/video/upload/${VIDEO_SETTINGS}/${ID}.mp4`;
  const reverseSrc = `https://res.cloudinary.com/daepdtgua/video/upload/${VIDEO_SETTINGS},e_reverse/${ID}.mp4`;
  const posterSrc = `https://res.cloudinary.com/daepdtgua/video/upload/${POSTER_SETTINGS}/${ID}.jpg`;

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-[#020202] transform-gpu">
        {/* Container for opacity transition */}
        <div className={`relative w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <video
                ref={forwardRef}
                autoPlay
                muted
                playsInline
                disableRemotePlayback
                onEnded={handleForwardEnded}
                onCanPlay={onLoaded}
                poster={posterSrc}
                // CHANGED: Opacity set to 60% as requested
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 'forward' ? 'opacity-60 z-10' : 'opacity-0 z-0'}`}
                style={{ willChange: 'opacity' }}
            >
                <source src={forwardSrc} type="video/mp4" />
            </video>
            
            <video
                ref={reverseRef}
                muted
                playsInline
                disableRemotePlayback
                onEnded={handleReverseEnded}
                // CHANGED: Opacity set to 60% as requested
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 'reverse' ? 'opacity-60 z-10' : 'opacity-0 z-0'}`}
                style={{ willChange: 'opacity' }}
            >
                <source src={reverseSrc} type="video/mp4" />
            </video>
        </div>

        {/* 
            PERFORMANCE OVERLAY SYSTEM:
            Removed the bg-black/60 darkener since the video itself is now opacity-60 against the black background.
        */}

        {/* 1. Gold Tint (Simple Gradient) */}
        <div 
            className="absolute inset-0 z-20 pointer-events-none opacity-20"
            style={{
                background: `linear-gradient(to bottom, #D4AF37 0%, transparent 80%)`
            }}
        />
        
        {/* 2. Cinematic Vignette (Simple Gradient) */}
        <div 
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
                background: `radial-gradient(circle at center, transparent 20%, #020202 130%)`
            }}
        />
    </div>
  );
});

export default BackgroundVideo;
