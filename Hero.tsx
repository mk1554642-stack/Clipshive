
import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from './Marquee';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const baseText = "We create content distribution engines that turn views into leverage. Your content is distributed across every platform by an elite clipping network built for reach. Designed to grow your brand, increase engagement, and convert attention into revenue.";
  const words = baseText.split(" ");
  
  // Timings
  // Start animation after a distinct pause (800ms) to allow Title to land first
  const baseDelayMs = 800; 
  // Stagger speed (50ms = 0.05s) - "Premium Slow" pace
  const staggerMs = 50; 

  // Calculate delays for subsequent elements based on text length
  const lastWordStart = baseDelayMs + (words.length - 1) * staggerMs;
  const buttonOneDelay = lastWordStart + 400; // Increased buffer after text finishes
  const buttonTwoDelay = buttonOneDelay + 150; 
  
  const footerTextDelay = buttonTwoDelay + 400; 
  const footerLineDelay = footerTextDelay + 250; 
  const footerMarqueeDelay = footerLineDelay + 120; 
  const bottomCtaDelay = footerMarqueeDelay + 250; 

  // Framer Motion Variants
  const descriptionWrapperVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // 0.05s = 50ms
        delayChildren: baseDelayMs / 1000 // Convert ms to seconds
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 12, // Slightly deeper start for more "rise"
      filter: 'blur(8px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1.6, // Slower, more luxurious fade
        ease: [0.2, 0.8, 0.2, 1] as const
      } 
    }
  };

  return (
    // Scaled padding: pt-36 -> pt-48 to accommodate larger navbar (top-8 + h-[84px] ~= 116px)
    <div className="relative min-h-screen overflow-hidden flex flex-col pt-36 lg:pt-48">
      
      {/* 
          Main Content Container 
          - flex-grow pushes the footer section to the bottom.
          - justify-center vertically centers the content in the available space.
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center items-start">
          
          <div className="flex flex-col items-start justify-center max-w-6xl z-10 text-left space-y-8">
            
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
              
              {/* Line 1 - Blur Fade In */}
              <span className="block animate-smooth-blur-fade whitespace-normal md:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]">
                We Scale Your Brand
              </span>
              
              {/* Line 2 - Blur Fade In (Staggered) */}
              <span className="block animate-smooth-blur-fade text-lux-black-gold mt-2 pb-4" style={{ animationDelay: '0.2s' }}>
                With Clipping.
              </span>
            </h1>

            {/* Subheadline - Premium Slow Reveal */}
            <motion.p 
              className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed font-light flex flex-wrap justify-start"
              variants={descriptionWrapperVariants}
              initial="hidden"
              animate="visible"
            >
              {words.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={wordVariants}
                  className="mr-[0.25em] inline-block"
                  style={{ willChange: 'transform, opacity, filter' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-start">
              <a 
                href="https://calendly.com/joeyjuneau56"
                target="_blank"
                rel="noopener noreferrer"
                className="animate-premium-btn group relative px-8 py-4 rounded-xl bg-white text-black text-lg font-bold transition-all duration-300 hover:scale-[1.03] hover:bg-neutral-200 inline-flex items-center justify-center shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
                style={{ animationDelay: `${buttonOneDelay}ms` }}
              >
                <span className="relative z-10 tracking-tight">
                  Get Started Today
                </span>
              </a>
              
              <Link 
                to="/about"
                className="animate-premium-btn group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 hover:scale-[1.03]"
                style={{ animationDelay: `${buttonTwoDelay}ms` }}
              >
                 {/* Glassy Bubble Background with Inner Highlights */}
                 <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.2),0_10px_30px_-5px_rgba(0,0,0,0.3)] group-hover:bg-white/25 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_15px_40px_-5px_rgba(0,0,0,0.4)] transition-all duration-300"></div>
                 
                 {/* Gloss Reflection (Top Half) */}
                 <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent rounded-t-xl opacity-60 pointer-events-none"></div>

                 <span className="relative z-10 tracking-tight drop-shadow-sm">
                    About Us
                 </span>
              </Link>
            </div>
          </div>

      </div>

      {/* 
          Footer / Bottom Section 
          - mt-auto keeps it at the bottom.
      */}
      <div className="relative z-10 w-full mt-auto pt-12">
        
        {/* Marquee Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
            <div className="flex flex-col items-center justify-center gap-6">
            
            {/* Text and Line */}
            <div className="flex flex-col items-center text-center w-full">
                <h3 
                    className="text-lg md:text-xl font-medium text-neutral-500 tracking-[0.2em] uppercase animate-minimalist-fade"
                    style={{ animationDelay: `${footerTextDelay}ms` }}
                >
                    Built to <span className="text-white font-bold">dominate</span> the feed for
                </h3>
                
                <div
                    className="mt-4 h-[1px] w-full animate-expand-line"
                    style={{ 
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                        animationDelay: `${footerLineDelay}ms` 
                    }}
                ></div>
            </div>
            
            {/* Marquee Component */}
            <div 
                className="w-full animate-minimalist-fade"
                style={{ animationDelay: `${footerMarqueeDelay}ms` }}
            >
                <Marquee />
            </div>
            </div>
        </div>

        {/* 
            Bottom CTA with Futuristic Frames
        */}
        <div 
            className="w-full flex items-center justify-center pb-10 animate-premium-btn relative"
            style={{ animationDelay: `${bottomCtaDelay}ms` }}
        >
            {/* Left Futuristic Panel */}
            <div 
                className="hidden lg:block absolute right-1/2 mr-[160px] top-1/2 -translate-y-[40px] h-[400px] w-[500px] pointer-events-none opacity-80"
            >
                <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#000" stopOpacity="0" />
                            <stop offset="60%" stopColor="#888" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                    <path d="M0 10 H420 L500 80 V400 H80 V80 L0 10 Z" fill="url(#gradLeft)" fillOpacity="0.1" />
                </svg>
            </div>

            {/* Right Futuristic Panel */}
            <div 
                className="hidden lg:block absolute left-1/2 ml-[160px] top-1/2 -translate-y-[40px] h-[400px] w-[500px] pointer-events-none opacity-80"
            >
                <svg width="100%" height="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradRight" x1="100%" y1="0%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#000" stopOpacity="0" />
                            <stop offset="60%" stopColor="#888" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                    <path d="M500 10 H80 L0 80 V400 H420 V80 L500 10 Z" fill="url(#gradRight)" fillOpacity="0.1" />
                </svg>
            </div>

            <div className="relative group flex items-center justify-center z-10">
                
                {/* Main Button */}
                <a
                    href="https://calendly.com/joeyjuneau56"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex items-center justify-center rounded-xl overflow-hidden cursor-pointer"
                >
                    {/* Glowing Border */}
                    <div 
                        className="absolute inset-[-100%] opacity-70 blur-md animate-spin-slow" 
                        style={{
                            background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #D4AF37 85%, transparent 100%)'
                        }}
                    />

                    {/* Inner Content Content */}
                    <div className="relative m-[1.5px] bg-[#050505] rounded-[10px] px-12 py-5 flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:bg-[#0a0a0a]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <span className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors relative z-10">
                            Book a 30-min call
                        </span>
                    </div>
                </a>

            </div>
        </div>

      </div>
      
      {/* Decorative Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 z-0 pointer-events-none"
        style={{
            background: 'linear-gradient(to top, #020202 0%, rgba(2,2,2,0) 100%)'
        }}
      ></div>
    </div>
  );
};

export default Hero;
