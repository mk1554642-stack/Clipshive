
import React from 'react';

// Single set of items, rendered twice in separate tracks for seamless looping
const items = [
  "Musicians", "Streamers", "Podcasters", "Coaches", "Creators", "Startups", "Influencers"
];

const Marquee: React.FC = () => {
  return (
    <div 
      className="w-full relative overflow-hidden flex items-center"
      style={{
        // Using mask-image allows the text to fade out at the edges
        // while keeping the actual background transparent so the video shows through.
        maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
      }}
    >
      
      {/* Track 1 */}
      {/* OPTIMIZATION: Added transform-gpu and will-change via inline style */}
      <div 
        className="flex shrink-0 items-center justify-around whitespace-nowrap gap-24 pr-24 animate-scroll py-3"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      >
        {items.map((item, index) => (
          <div key={`t1-${index}`} className="flex items-center group cursor-default">
            <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777] group-hover:text-yellow-400 transition-colors duration-300 tracking-wide">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Track 2 (Duplicate for seamless loop) */}
      <div 
        className="flex shrink-0 items-center justify-around whitespace-nowrap gap-24 pr-24 animate-scroll py-3" 
        aria-hidden="true"
        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      >
        {items.map((item, index) => (
          <div key={`t2-${index}`} className="flex items-center group cursor-default">
            <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777] group-hover:text-yellow-400 transition-colors duration-300 tracking-wide">
              {item}
            </span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Marquee;
