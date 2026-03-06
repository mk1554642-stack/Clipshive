
import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleFaqClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const faqElement = document.getElementById('faq');

    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#faq');
    }
  };

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-6 group">
                 
                 {/* 
                    Image Container 
                    - Includes the Logo and a masking patch
                 */}
                 <div className="shrink-0 flex items-center justify-end relative z-0 overflow-hidden">
                    <motion.img 
                        src="https://iili.io/fU167UP.png" 
                        alt="ClipsHive Logo"
                        className="block h-20 md:h-24 w-auto object-contain relative z-0"
                        // Animation: Starts shifted right and rotated.
                        // x: '100%' moves it fully to the right. 
                        // It slides LEFT into place.
                        initial={{ x: '100%', rotate: 25 }} 
                        whileInView={{ x: 0, rotate: 0 }} 
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    
                    {/* 
                        The "Line Mask" Patch 
                        - Sits on the right side of the container.
                        - Width matches the negative margin of the divider line (w-6 for -ml-6, w-10 for -ml-10).
                        - Hides the logo while it travels through this area, creating the illusion 
                          that it emerges strictly from the vertical line.
                    */}
                    <div className="absolute right-0 top-0 bottom-0 w-6 md:w-10 bg-black z-10"></div>
                 </div>

                 {/* 
                    Divider Line 
                    - z-20 ensures it sits on top of the black mask patch.
                    - Negative margins (-ml) pull it left to sit exactly at the edge of the mask.
                 */}
                 <div className="h-10 md:h-12 w-[1px] bg-white/20 relative z-20 shrink-0 -ml-6 md:-ml-10 mr-4 md:mr-6"></div>
                 
                 {/* Text Container - Static */}
                 <div className="overflow-hidden relative z-0">
                    <div 
                        className="text-2xl md:text-3xl font-bold tracking-tighter"
                    >
                        <span className="text-white">Clips</span><span className="text-[#D4AF37]">Hive</span>
                    </div>
                 </div>
            </Link>
            <p className="text-neutral-400 max-w-sm mb-6">
              The premium short-form content agency tailored for high-ticket coaches, consultants, and brands.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777] mt-2">Pages</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-neutral-400 hover:text-yellow-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-neutral-400 hover:text-yellow-500 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-yellow-500 transition-colors">Contact</Link></li>
              <li><a href="/#faq" onClick={handleFaqClick} className="text-neutral-400 hover:text-yellow-500 transition-colors cursor-pointer">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777] mt-2">Socials</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-neutral-400 hover:text-yellow-500 transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} ClipsHive. All rights reserved.
          </p>
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-neutral-400 text-sm">Accepting New Clients</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
