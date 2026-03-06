
import React from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const descriptionText = "Book a call or send us a DM on Instagram. We're ready to start scaling your brand to new heights.";
  const words = descriptionText.split(" ");

  // PERFORMANCE FIX:
  // 1. Added 'will-change' to hint the browser to use GPU layers.
  // 2. Reduced blur radius (20px -> 10px) to prevent frame drops on entry.
  // 3. Switched to "Expo Out" easing [0.19, 1, 0.22, 1] for the smoothest possible landing.
  
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.96, 
      filter: 'blur(10px)' // Optimized blur amount
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 1.0, 
        ease: [0.19, 1, 0.22, 1] as const // Exponential Out - Ultra Smooth
      } 
    }
  };

  const contentWrapperVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Nested stagger for the text lines (Title)
  const textWrapperVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Time between line 1 and line 2
      }
    }
  };

  // Nested stagger for Description Words
  const descriptionWrapperVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03, // Fast, ripple-like stagger for words
        delayChildren: 0.1
      }
    }
  };

  // Standard Item Variant (Dot, Button)
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: 'blur(8px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1.2, 
        ease: [0.19, 1, 0.22, 1] as const
      } 
    }
  };

  // Specific word variant matching Hero's "soft-blur-up" feel
  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 10, 
      filter: 'blur(8px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 1.2,
        ease: [0.2, 0.8, 0.2, 1] as const
      } 
    }
  };

  return (
    <section className="relative min-h-[60vh] w-full flex items-center justify-center text-center py-24 px-4 sm:px-6 lg:px-8">
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translate3d(0,0,0)' }}>
        <div 
          className="w-[80vw] h-[80vh] max-w-[1000px] max-h-[1000px] opacity-30"
          style={{
            background: 'radial-gradient(circle closest-side, rgba(212, 175, 55, 0.04), transparent)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        
        {/* Animated Main Card */}
        <motion.div 
            className="group relative rounded-[2rem] overflow-hidden w-full shadow-2xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ willChange: 'transform, opacity, filter' }}
        >
             {/* 1. Base Dark Background */}
             <div className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-[2rem]" />

             {/* 2. Spinning Gold Edge Glow - SHARPER & BRIGHTER */}
             <div 
                className="absolute inset-[-100%] opacity-70 blur-md animate-spin-slow" 
                style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #D4AF37 85%, transparent 100%)',
                    willChange: 'transform' // Ensure spin is GPU accelerated
                }}
             />

             {/* 3. Content Mask / Wrapper - INCREASED MARGIN TO 1.5px FOR DEFINITION */}
             <div className="relative m-[1.5px] rounded-[30px] bg-[#050505] border border-white/5 flex flex-col items-center justify-center px-6 py-20 md:px-12 md:py-24 z-10 overflow-hidden text-center">
                
                {/* Top Lighting Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
                <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none"></div>

                {/* Staggered Content Animation Wrapper */}
                <motion.div
                    variants={contentWrapperVariants}
                    className="flex flex-col items-center w-full relative z-20"
                >

                    {/* Decorative Glowing Dot */}
                    <motion.div 
                        variants={itemVariants} 
                        className="relative mb-10"
                        style={{ willChange: 'transform, opacity, filter' }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-yellow-500 blur-sm animate-pulse"></div>
                    </motion.div>
                    
                    {/* Main Headline - Split for Line-by-Line Animation */}
                    <motion.h1 
                        variants={textWrapperVariants}
                        className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
                    >
                      <motion.span 
                        className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]"
                        variants={itemVariants}
                        style={{ willChange: 'transform, opacity, filter' }}
                      >
                        Have a Question?
                      </motion.span>
                      <motion.span 
                        className="block text-gold-gradient mt-2 pb-2"
                        variants={itemVariants}
                        style={{ willChange: 'transform, opacity, filter' }}
                      >
                        We’re Here to Help.
                      </motion.span>
                    </motion.h1>

                    {/* Subtext - Word by Word Animation (Like Hero) */}
                    <motion.p 
                        variants={descriptionWrapperVariants}
                        className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto mb-12 leading-relaxed flex flex-wrap justify-center"
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

                    {/* CTA Button */}
                    <motion.div 
                        variants={itemVariants}
                        style={{ willChange: 'transform, opacity, filter' }}
                    >
                        <a href="https://calendly.com/joeyjuneau56" target="_blank" rel="noopener noreferrer" className="group relative inline-block px-10 py-5 bg-gold-gradient text-black text-lg font-bold rounded-xl shadow-[0_4px_20px_rgba(202,138,4,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                            <span className="relative z-10">
                                Book a 30-min call
                            </span>
                            <div className="absolute inset-0 z-0 rounded-xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                        </a>
                    </motion.div>

                </motion.div>

            </div>
         </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
