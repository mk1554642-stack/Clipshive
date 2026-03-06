
import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WorkCarousel from '../components/WorkCarousel';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <main className="flex-grow w-full">
            <Hero />
            <Services />
            <WorkCarousel />
            <FAQ />
            
            {/* CTA Section - Moved to bottom to match About page layout */}
            <div className="py-32 border-t border-white/5 bg-black/20 backdrop-blur-sm relative">
                <div 
                    className="absolute inset-0 pointer-events-none opacity-30" 
                    style={{ background: 'radial-gradient(ellipse at bottom, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
                ></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]">Ready to</span> <span className="text-gold-gradient">scale?</span>
                    </h2>
                    <p className="text-neutral-400 mb-10 text-xl max-w-2xl mx-auto">Join the top 1% of creators dominating the short-form landscape. Your audience is waiting.</p>
                    <a href="https://calendly.com/joeyjuneau56" target="_blank" rel="noopener noreferrer" className="group relative inline-block px-10 py-5 bg-gold-gradient text-black text-lg font-bold rounded-xl shadow-[0_4px_20px_rgba(202,138,4,0.15)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]">
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

export default Home;
