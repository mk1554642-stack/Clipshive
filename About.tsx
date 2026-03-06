
import React from 'react';
import { Instagram } from 'lucide-react';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

interface TeamMember {
  name: string;
  role: string;
  link?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Tony Eshak",
    role: "Founder, CEO",
  },
  {
    name: "Joey Juneau",
    role: "Chief Executive Officer",
    link: "https://www.instagram.com/joeythemoejoe_?igsh=c3c3cHdwcnExdmVx&utm_source=qr"
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col pt-24">
      
      {/* REFINED: Background Ambience - Smoother Gold Tint */}
      <div className="absolute top-0 inset-x-0 h-screen pointer-events-none opacity-40">
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            style={{
                background: 'radial-gradient(circle closest-side, rgba(212, 175, 55, 0.03), transparent)'
            }}
        ></div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative w-full">
        
        {/* Team Section */}
        <section className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
                {/* Badge */}
                <div className="animate-minimalist-fade inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="text-xs font-medium text-neutral-300 uppercase tracking-wider">Team Members</span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-12 tracking-tight">
                    <span className="inline-block animate-smooth-blur-fade text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]">Meet the</span>{' '}
                    <span className="inline-block animate-smooth-blur-fade delay-300 text-gold-gradient">Team Members</span>
                </h1>

                {/* Center CTA Button */}
                <div className="mb-24 animate-premium-btn delay-200">
                    <a href="https://calendly.com/joeyjuneau56" target="_blank" rel="noopener noreferrer" className="group relative inline-block px-10 py-5 bg-gold-gradient text-black text-lg font-bold rounded-xl shadow-[0_4px_20px_rgba(202,138,4,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                        <span className="relative z-10">
                            Book a 30-min call
                        </span>
                        <div className="absolute inset-0 z-0 rounded-xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                    </a>
                </div>

                {/* Team Grid */}
                <div className="flex flex-wrap justify-center gap-6 w-full animate-minimalist-fade delay-300 max-w-4xl">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index}
                            className="group relative h-[140px] w-full md:w-[calc(50%-12px)] rounded-2xl overflow-hidden"
                        >
                            {/* 1. Base Dark Background */}
                            <div className="absolute inset-0 bg-black/50 rounded-2xl" />

                            {/* 2. Spinning Gold Edge Glow - Seamless */}
                            <div 
                                className="absolute inset-[-100%] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md animate-spin-slow" 
                                style={{
                                    background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #D4AF37 85%, transparent 100%)'
                                }}
                            />

                            {/* 3. Content Mask */}
                            <div className="absolute inset-[1px] rounded-[15px] bg-[#050505] border border-white/5 flex flex-col justify-center px-8 z-10 overflow-hidden">
                                
                                {/* Top Lighting Effect */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.05)]"></div>
                                <div className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-white/5 to-transparent opacity-20"></div>
                                
                                {/* Content */}
                                <div className="flex items-center justify-between w-full relative z-20">
                                    <div>
                                        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777] group-hover:text-yellow-500 transition-colors duration-300">
                                            {member.name}
                                        </h3>
                                        <p className="text-neutral-500 text-sm font-medium mt-1">
                                            {member.role}
                                        </p>
                                    </div>
                                    
                                    {member.link ? (
                                        <a 
                                            href={member.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-xl bg-[#0F0F0F] border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/10 transition-all cursor-pointer relative z-30 hover:bg-white/5"
                                        >
                                            <Instagram size={18} />
                                        </a>
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl bg-[#0F0F0F] border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/10 transition-all">
                                            <Instagram size={18} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <FAQ />

        {/* CTA Section */}
        <div className="py-32 border-t border-white/5 bg-black/20 backdrop-blur-sm relative">
            <div 
                className="absolute inset-0 pointer-events-none opacity-20" 
                style={{ background: 'linear-gradient(to top, rgba(212,175,55,0.05) 0%, transparent 100%)' }}
            ></div>
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]">Ready to</span> <span className="text-gold-gradient">scale?</span>
                </h2>
                <p className="text-neutral-400 mb-10 text-xl max-w-2xl mx-auto">Join the top 1% of creators dominating the short-form landscape. Your audience is waiting.</p>
                <a href="https://calendly.com/joeyjuneau56" target="_blank" rel="noopener noreferrer" className="group relative inline-block px-10 py-5 bg-gold-gradient text-black text-lg font-bold rounded-xl shadow-[0_4px_20px_rgba(202,138,4,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                    <span className="relative z-10">
                      Start Scaling Today
                    </span>
                    <div className="absolute inset-0 z-0 rounded-xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                </a>
            </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default About;
