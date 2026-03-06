
import React from 'react';
import { Users, BarChart3, Zap, Globe, ShieldCheck, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceStage {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  accent: string;
  gradient: string;
}

// --- 1. DELTA WING ANIMATION (Now used for Launch - LIGHT BLUE THEME) ---
const DeltaWingAnimation = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#020202]">
        {/* Blueprint Grid */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                 backgroundSize: '24px 24px',
                 maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
             }} 
        />

        {/* Diagonal Line - Cyan */}
        <div className="absolute w-[200%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -rotate-45" />

        {/* Rocket Projectile Container */}
        <motion.div
            className="absolute z-10"
            initial={{ x: -60, y: 60, opacity: 0 }}
            animate={{ 
                x: [ -60, -20, 100 ], 
                y: [ 60, 20, -100 ],
                opacity: [0, 1, 0],
                scale: [0.8, 1, 1.3]
            }}
            transition={{
                duration: 2.4,
                times: [0, 0.25, 1], 
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 1
            }}
        >
            {/* 
                ROTATION WRAPPER
                1. We rotate the wrapper 45deg to match the flight path (NE).
            */}
            <div className="relative transform rotate-45">
                
                {/* 
                    ROCKET ICON 
                    1. We rotate the icon -45deg so it points UP (0deg) relative to this wrapper.
                    2. This makes positioning the flame at the bottom-center trivial and perfect.
                */}
                <div className="relative z-20">
                     <Rocket 
                        size={48} 
                        className="text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] -rotate-45" 
                        fill="#020202" // Solid body to hide background lines
                        strokeWidth={1.5}
                    />
                </div>

                {/* 
                    ENGINE FIRE
                    1. Positioned absolute relative to the wrapper.
                    2. Left 50%, Top 50% puts it in the center.
                    3. We push it down (mt-5) to sit exactly at the tail of the "Upright" rocket.
                    4. z-10 puts it behind the rocket body.
                */}
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-3 z-10 flex flex-col items-center origin-top"
                >
                    {/* Core Hotspot (White/Bright Blue) */}
                    <motion.div 
                        className="w-2 h-4 bg-white rounded-full blur-[1px] shadow-[0_0_10px_cyan]"
                        animate={{ height: [12, 16, 12], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
                    />
                    
                    {/* Main Exhaust Plume (Cyan/Blue) */}
                    <motion.div 
                        className="w-4 h-16 -mt-2 bg-gradient-to-b from-cyan-400 via-blue-600 to-transparent rounded-full blur-[4px]"
                        animate={{ height: [40, 60, 40], opacity: [0.6, 0.9, 0.6] }}
                        transition={{ duration: 0.15, repeat: Infinity, repeatType: "reverse" }}
                    />
                </motion.div>

            </div>
        </motion.div>
        
        {/* Launchpad Pulse - Cyan */}
        <motion.div
            className="absolute bottom-10 left-10 w-6 h-6 rounded-full border border-cyan-500/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 3], opacity: [1, 0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.9 }}
        />
    </div>
  );
};

// --- 2. ORBITAL ANIMATION (Now used for Build - PURPLE THEME) ---
const OrbitalAnimation = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#020202]">
             {/* Central Core - Purple */}
             <div className="relative z-10">
                 <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.4)]">
                    <Globe className="text-white w-8 h-8" />
                 </div>
                 {/* Ripple */}
                 <motion.div 
                    className="absolute inset-0 rounded-full border border-purple-500/30"
                    animate={{ scale: [1, 2], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                 />
             </div>

             {/* Orbiting Satellites */}
             <motion.div 
                className="absolute w-[140px] h-[140px] border border-white/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             >
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-[#111] border border-purple-500 rounded-full shadow-[0_0_10px_purple]" />
             </motion.div>
             
             <motion.div 
                className="absolute w-[200px] h-[200px] border border-white/5 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             >
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
             </motion.div>
        </div>
    )
}

// --- 3. SCALE ANIMATION (Growing Bars - Amber/Gold) ---
const ScaleAnimation = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#020202] gap-3 items-end pb-12">
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="w-8 rounded-t-lg bg-gradient-to-t from-amber-600 to-amber-300 relative overflow-hidden"
                    initial={{ height: 20 }}
                    animate={{ height: [40 + i*10, 80 + i*20, 40 + i*10] }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.2
                    }}
                >
                    {/* Shimmer effect */}
                    <motion.div 
                        className="absolute inset-0 bg-white/30"
                        animate={{ translateY: ['100%', '-100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                </motion.div>
            ))}
            
            {/* Background Graph Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                <path d="M0 100 Q 50 100 100 50 T 200 20" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
        </div>
    )
}

const stages: ServiceStage[] = [
  {
    id: "01",
    title: "Build",
    description: "We engineer a private, dedicated clipping community for your brand. You supply the raw assets; we construct the infrastructure.",
    icon: <OrbitalAnimation />, 
    tags: ["Infrastructure", "Vision Alignment"],
    accent: "text-purple-400", // CHANGED TO PURPLE
    gradient: "from-purple-500/20 to-indigo-500/5" // CHANGED TO PURPLE
  },
  {
    id: "02",
    title: "Launch",
    description: "The machine goes live. Clippers are guided through a rigorous launch protocol, coached to produce high-retention content.",
    icon: <DeltaWingAnimation />, 
    tags: ["Protocol Activation", "Global Reach"],
    accent: "text-cyan-400", // CHANGED TO LIGHT BLUE/CYAN
    gradient: "from-cyan-500/20 to-blue-500/5" // CHANGED TO LIGHT BLUE/CYAN
  },
  {
    id: "03",
    title: "Scale",
    description: "We identify outliers and double down. Our team manages payouts and optimization, ensuring your brand dominates indefinitely.",
    icon: <ScaleAnimation />,
    tags: ["Optimization", "Dominance"],
    accent: "text-amber-400",
    gradient: "from-amber-500/20 to-orange-500/5"
  }
];

const Services: React.FC = () => {
  return (
    <section id="how-we-work" className="relative py-32 bg-[#020202] overflow-hidden">
      
      {/* Ambient Background Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-[#020202] to-[#020202] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-32 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>
                <span className="text-xs font-bold text-white tracking-widest uppercase">Our Process</span>
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
            >
                Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] to-[#999]">Growth.</span>
            </motion.h2>
        </div>

        {/* Vertical Stack of Premium Cards */}
        <div className="flex flex-col gap-12 md:gap-24">
            {stages.map((stage, index) => (
                <PremiumCard key={index} stage={stage} index={index} />
            ))}
        </div>

      </div>
    </section>
  );
};

const PremiumCard: React.FC<{ stage: ServiceStage; index: number }> = ({ stage, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative w-full"
        >
            {/* 
                THE GLASS CONTAINER 
                - Multiple layers for depth
                - Shinier borders
            */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A]/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,1)] hover:border-white/20 transition-colors duration-500">
                
                {/* Internal Glow Gradient */}
                <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b ${stage.gradient} opacity-20 blur-[100px] pointer-events-none`} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    
                    {/* 
                        CONTENT SECTION 
                        - Dynamically ordered based on index for Zig-Zag layout on Desktop
                    */}
                    <div className={`relative z-10 p-8 md:p-16 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        
                        {/* Step Number Background */}
                        <div className="absolute top-10 left-10 text-[120px] font-bold text-white/[0.02] leading-none select-none pointer-events-none font-mono">
                            {stage.id}
                        </div>

                        <div className="relative">
                            <div className={`inline-flex items-center gap-2 mb-6 ${stage.accent}`}>
                                <Zap className="w-5 h-5 fill-current" />
                                <span className="text-sm font-bold uppercase tracking-wider">Phase {stage.id}</span>
                            </div>
                            
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                {stage.title}
                            </h3>
                            
                            <p className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-md">
                                {stage.description}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {stage.tags.map((tag, i) => (
                                    <div key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm font-medium text-neutral-300 backdrop-blur-sm">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 
                        VISUAL SECTION (THE BOX)
                        - A dedicated "Viewport" for the animation
                    */}
                    <div className={`relative h-[400px] lg:h-auto p-4 md:p-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="w-full h-full relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] bg-[#050505] group-hover:shadow-[inset_0_0_60px_rgba(0,0,0,1)] transition-all duration-700">
                            
                            {/* Inner Bezel highlight */}
                            <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none z-20"></div>
                            
                            {/* Render The Animation */}
                            {stage.icon}

                            {/* Glass Reflection Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none z-10"></div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

export default Services;
