
import React from 'react';
import { Instagram } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  handle?: string;
  link?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Tony Eshak",
    role: "Founder, CEO",
    handle: "@tony"
  },
  {
    name: "Joey Juneau",
    role: "CEO",
    handle: "@joey",
    link: "https://www.instagram.com/joeythemoejoe_?igsh=c3c3cHdwcnExdmVx&utm_source=qr"
  },
  {
    name: "Amer Oukour",
    role: "CEO",
    handle: "@amer"
  },
  {
    name: "Wally",
    role: "Community Manager",
    handle: "@wally"
  }
];

const Team: React.FC = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden min-h-[80vh] flex flex-col justify-center">
      {/* REFINED: Background ambient lighting - Soft Gold Tint */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30 pointer-events-none" 
        style={{ 
            background: 'radial-gradient(circle closest-side, rgba(212, 175, 55, 0.03), transparent)',
            transform: 'translate3d(0,0,0)' 
        }} 
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-20 pointer-events-none" 
        style={{ 
            background: 'radial-gradient(circle closest-side, rgba(255, 255, 255, 0.03), transparent)',
            transform: 'translate3d(0,0,0)' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-8">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-neutral-300 tracking-wide uppercase">Team Members</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="inline-block animate-smooth-blur-fade text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]">Meet the</span>{' '}
              <span className="inline-block animate-smooth-blur-fade delay-300 text-gold-gradient">Team Members</span>
            </h2>

            {/* CTA Button */}
            <a href="https://calendly.com/joeyjuneau56" target="_blank" rel="noopener noreferrer" className="group relative inline-block px-10 py-5 bg-gold-gradient text-black text-lg font-bold rounded-xl shadow-[0_4px_20px_rgba(202,138,4,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                <span className="relative z-10">
                    Book a 30-min call
                </span>
                <div className="absolute inset-0 z-0 rounded-xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </a>
        </div>

        {/* Team Grid */}
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.slice(0, 3).map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                 <div className="hidden lg:block"></div> 
                 {teamMembers.slice(3).map((member, index) => (
                    <TeamCard key={index + 3} member={member} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

const TeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    return (
        <div className="group relative w-full h-[180px] rounded-2xl overflow-hidden">
             {/* 1. Base Dark Background */}
             <div className="absolute inset-0 bg-black/50 rounded-2xl" />

             {/* 2. Spinning Gold Edge Glow - Seamless Loop */}
             <div 
                className="absolute inset-[-100%] opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-md animate-spin-slow" 
                style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, #D4AF37 85%, transparent 100%)'
                }}
             />

             {/* 3. Content Mask */}
             <div className="absolute inset-[1px] rounded-[15px] bg-[#050505] border border-white/5 flex flex-col justify-center px-8 z-10 overflow-hidden">
                
                {/* Top Lighting Effect inside card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.05)]"></div>
                <div className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-white/5 to-transparent opacity-20"></div>

                {/* Content */}
                <div className="flex items-start justify-between relative z-20">
                    <div>
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777] group-hover:text-yellow-500 transition-colors duration-300 mb-1">
                            {member.name}
                        </h3>
                        <p className="text-neutral-400 text-sm font-medium tracking-wide uppercase">
                            {member.role}
                        </p>
                    </div>

                    {/* Social Icon */}
                    <div className="relative">
                        {member.link ? (
                            <a 
                                href={member.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/10 transition-all duration-300 block hover:bg-white/10"
                            >
                                <Instagram size={20} />
                            </a>
                        ) : (
                            <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/10 transition-all duration-300">
                                <Instagram size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;
