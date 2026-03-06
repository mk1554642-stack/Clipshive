
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavItem } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path.startsWith('#')) return false;
    return location.pathname === path;
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        if (location.pathname !== '/') {
            navigate(`/${href}`);
        }
      }
    } else {
        setMobileMenuOpen(false);
    }
  };

  // "Heavy Glass" Aesthetic Style
  const glassIslandStyle = "pointer-events-auto bg-black/10 backdrop-blur-3xl backdrop-saturate-150 border border-white/[0.12] shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center justify-center transition-all duration-300 hover:bg-black/20 hover:border-white/20 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]";

  return (
    <>
      {/* 
         NAVBAR CONTAINER
         Dynamic Top Position: Starts at top-4 (reduced from 8), moves to top-2 when scrolled.
      */}
      <header 
        className={`fixed left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) pointer-events-none ${isScrolled ? 'top-2' : 'top-4'}`}
      >
        <div className="max-w-7xl mx-auto relative flex items-center justify-between h-[84px]">
          
          {/* 
            ISLAND 1: LOGO
            Updated with Slide-Left Mask Animation for Text
          */}
          <Link 
            to="/" 
            className="pointer-events-auto group relative flex items-center justify-start origin-left transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)"
          >
             {/* Image Container - Always visible */}
             <div className="shrink-0 flex items-center justify-end relative z-0">
                <img 
                    src="https://iili.io/fU167UP.png" 
                    alt="ClipsHive Logo"
                    // Scrolled: Slightly smaller (h-14 md:h-16) vs (h-20 md:h-24)
                    className={`block w-auto object-contain transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isScrolled ? 'h-14 md:h-16' : 'h-20 md:h-24'}`}
                />
             </div>

             {/* 
                Divider Line 
                Collapses width and opacity when scrolled 
             */}
             <div 
                className={`
                    w-[1px] bg-white/20 relative z-10 shrink-0 
                    transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
                    ${isScrolled 
                        ? 'h-0 opacity-0 -ml-2 mr-0' 
                        : 'h-10 md:h-12 opacity-100 -ml-6 md:-ml-10 mr-4 md:mr-6'
                    }
                `}
             ></div>
             
             {/* 
                Text Container - The Mask
                Collapses max-width to 0 when scrolled to hide content
             */}
             <div 
                className={`
                    overflow-hidden relative z-0 flex items-center
                    transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
                    ${isScrolled ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'}
                `}
             >
                {/* 
                    Inner Text - The Slide
                    Slides left (-100%) when scrolled, Slides right (0) when at top
                */}
                <div 
                    className={`
                        font-bold tracking-tighter whitespace-nowrap text-2xl md:text-3xl
                        transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)
                        ${isScrolled ? '-translate-x-full' : 'translate-x-0'}
                    `}
                >
                    <span className="text-white">Clips</span><span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e0e0e0] to-[#777777]">Hive</span>
                </div>
             </div>
          </Link>

          {/* 
            ISLAND 2: NAVIGATION
            Floating Center
          */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <div className={`${glassIslandStyle} rounded-full p-2 gap-1`}>
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                      <div key={item.label} className="relative">
                        {item.href.startsWith('#') ? (
                          <a
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className={`
                              relative px-6 py-2.5 rounded-full text-[16px] font-medium transition-all duration-300 cursor-pointer block
                              ${active ? 'text-white' : 'text-white/70 hover:text-[#D4AF37]'}
                            `}
                          >
                            <span className="relative z-10">{item.label}</span>
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            className={`
                              relative px-6 py-2.5 rounded-full text-[16px] font-medium transition-all duration-500 block
                              ${active ? 'text-white' : 'text-white/70 hover:text-[#D4AF37]'}
                            `}
                          >
                            <span className="relative z-10">{item.label}</span>
                          </Link>
                        )}
                      </div>
                  );
                })}
            </div>
          </nav>

          {/* 
            ISLAND 3: ACTIONS
          */}
          <div className="flex items-center gap-4">
            {/* Desktop Button */}
            <div className={`${glassIslandStyle} hidden md:flex rounded-full p-2`}>
                <a 
                  href="https://calendly.com/joeyjuneau56" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="
                    flex items-center justify-center 
                    px-6 py-2.5
                    bg-white text-black 
                    rounded-full 
                    text-[16px] font-bold 
                    hover:scale-[1.03] active:scale-[0.97]
                    transition-all duration-200
                    shadow-[0_4px_15px_rgba(255,255,255,0.2)]
                  "
                >
                  Book A Call
                </a>
            </div>

            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`${glassIslandStyle} md:hidden w-[58px] h-[58px] rounded-full text-white/80 hover:text-white`}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </header>


      {/* 
        MOBILE MENU DROPDOWN 
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(20px)' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[380px] z-50 bg-black/20 backdrop-blur-3xl backdrop-saturate-150 border border-white/[0.12] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] origin-top ring-1 ring-white/5 transition-all duration-700 ${isScrolled ? 'top-24' : 'top-32'}`}
          >
            <div className="flex flex-col p-2 space-y-1">
              {navItems.map((item) => (
                 item.href.startsWith('#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="block px-4 py-5 rounded-2xl text-center text-[17px] text-white/70 hover:text-[#D4AF37] hover:bg-white/[0.08] transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                 ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block px-4 py-5 rounded-2xl text-center text-[17px] font-medium transition-colors ${
                        isActive(item.href) 
                        ? 'bg-white text-black shadow-lg shadow-white/10' 
                        : 'text-white/70 hover:text-[#D4AF37] hover:bg-white/[0.08]'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                 )
              ))}
              <div className="pt-3 px-1 pb-1">
                  <a 
                    href="https://calendly.com/joeyjuneau56" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full text-center bg-white text-black font-bold text-[17px] px-4 py-5 rounded-2xl hover:bg-[#f5f5f7] transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] active:scale-95"
                  >
                      Book Strategy Call
                  </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
