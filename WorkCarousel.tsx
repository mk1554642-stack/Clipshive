
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

// Source videos provided by user
// OPTIMIZATION APPLIED: 
// f_auto = auto format (webm/av1)
// q_auto = auto quality (smart compression)
// w_600 = resized to 600px width (plenty for a 320px card, saves massive bandwidth)
const sourceVideos = [
  "https://res.cloudinary.com/daepdtgua/video/upload/f_auto,q_auto,w_600/v1769987983/0130_1_1_xhom6a.mp4",
  "https://res.cloudinary.com/daepdtgua/video/upload/f_auto,q_auto,w_600/v1769987974/0130_1_qfjeti.mp4",
  "https://res.cloudinary.com/daepdtgua/video/upload/f_auto,q_auto,w_600/v1769988736/0202_zxjm5e.mp4",
  "https://res.cloudinary.com/daepdtgua/video/upload/f_auto,q_auto,w_600/v1769994795/Fck_your_mental_health_in_2026._MrBeast_entrepreneur_motivation_2026_krfaw3.mp4",
  "https://res.cloudinary.com/daepdtgua/video/upload/f_auto,q_auto,w_600/v1769994804/Whenever_you_start_doing_something_you_will_suck_-_and_that_s_ok._AlexHormozi_jyiuob.mp4"
];

// Duplicate the list to ensure the track is wide enough for smooth scrolling
// [v1...v5, v1...v5, v1...v5]
const videos = [...sourceVideos, ...sourceVideos, ...sourceVideos];

interface VideoCardProps {
    src: string; 
    shouldLoad: boolean;
    onClick: (src: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, shouldLoad, onClick }) => (
  <div 
    onClick={() => onClick(src)}
    className="relative w-[280px] md:w-[320px] h-[500px] md:h-[570px] rounded-3xl overflow-hidden flex-shrink-0 group bg-[#050505] shadow-2xl cursor-pointer"
  >
    
    {/* Spinning Gold Edge Glow (Visible on Hover) */}
    <div 
        className="absolute inset-[-100%] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md animate-spin-slow pointer-events-none" 
        style={{
            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #D4AF37 85%, transparent 100%)'
        }}
    />

    {/* Inner Content Container - Masking the video */}
    <div className="absolute inset-[1px] rounded-[23px] bg-[#050505] overflow-hidden border border-white/5 z-10">
        
        {/* Video Element - Defer loading until animation completes */}
        {shouldLoad && (
            <video 
                src={src} 
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
        )}
        
        {/* Fallback/Placeholder Gradient while loading or if video fails */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#111] to-black transition-opacity duration-500 ${shouldLoad ? 'opacity-0' : 'opacity-100'}`} />
        
        {/* Cinematic Gradient Overlays */}
        {/* Top Vignette */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        {/* Bottom Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Play Icon / Overlay Hint */}
        <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
             <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Play className="fill-white text-white ml-1" size={28} />
             </div>
        </div>
    </div>
  </div>
);

const WorkCarousel: React.FC = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    // Delay video loading to allow page transition (approx 600-800ms) to finish smoothly.
    const timer = setTimeout(() => {
        setShouldLoad(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (src: string) => {
    // Upgrade quality for full screen: replace w_600 with w_1280 (or w_1080)
    const highResSrc = src.replace('w_600', 'w_1280');
    setSelectedVideo(highResSrc);
  };

  return (
    <section id="featured-work" className="py-24 relative overflow-hidden bg-black/20 backdrop-blur-sm border-t border-white/5">
       
       {/* Background Ambience */}
       <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none" 
        style={{ 
            background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.15), transparent 70%)',
        }} 
       />

       {/* Scrolling Container - Constrained to max-w-7xl to match Hero frame */}
       <div 
         className="flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
         style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
         }}
       >
         
         {/* Track 1 */}
         <div 
            className="flex shrink-0 gap-6 md:gap-8 animate-scroll pr-6 md:pr-8"
            style={{ animationDuration: '100s', willChange: 'transform' }}
         >
           {videos.map((src, i) => (
             <VideoCard key={`t1-${i}`} src={src} shouldLoad={shouldLoad} onClick={handleVideoClick} />
           ))}
         </div>

         {/* Track 2 (Duplicate for Loop) */}
         <div 
            className="flex shrink-0 gap-6 md:gap-8 animate-scroll pr-6 md:pr-8" 
            aria-hidden="true"
            style={{ animationDuration: '100s', willChange: 'transform' }}
         >
           {videos.map((src, i) => (
             <VideoCard key={`t2-${i}`} src={src} shouldLoad={shouldLoad} onClick={handleVideoClick} />
           ))}
         </div>
         
         {/* Track 3 (Extra buffer for very wide screens) */}
         <div 
            className="flex shrink-0 gap-6 md:gap-8 animate-scroll pr-6 md:pr-8" 
            aria-hidden="true"
            style={{ animationDuration: '100s', willChange: 'transform' }}
         >
           {videos.map((src, i) => (
             <VideoCard key={`t3-${i}`} src={src} shouldLoad={shouldLoad} onClick={handleVideoClick} />
           ))}
         </div>

       </div>

       {/* Full Screen Video Modal */}
       <AnimatePresence>
            {selectedVideo && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8"
                    onClick={() => setSelectedVideo(null)}
                >
                    {/* Close Button */}
                    <button 
                        className="absolute top-6 right-6 sm:top-10 sm:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 z-50 backdrop-blur-md border border-white/5"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVideo(null);
                        }}
                    >
                        <X size={24} />
                    </button>

                    {/* Content Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-[500px] h-[80vh] md:h-[85vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <video
                            src={selectedVideo}
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                            playsInline
                        />
                        
                        {/* Subtle Border Gradient */}
                        <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none"></div>
                    </motion.div>
                </motion.div>
            )}
       </AnimatePresence>

    </section>
  );
};

export default WorkCarousel;
