
import React, { useState, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PageTransition from './components/PageTransition';
import Cursor from './components/Cursor';
import Lenis from 'lenis';

function App() {
  const location = useLocation();
  const lenisRef = React.useRef<any>(null);

  // State for Boomerang Video Loop & Loading
  const [activeVideo, setActiveVideo] = useState<'forward' | 'reverse'>('forward');
  const [isLoaded, setIsLoaded] = useState(false);
  const forwardRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);

  // Initialize Lenis for smooth "Apple-like" scrolling
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle Hash Scrolling with Lenis
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element, { offset: 0 });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 550);
    } else {
       if (lenisRef.current) {
         lenisRef.current.scrollTo(0, { immediate: true });
       } else {
         window.scrollTo(0, 0);
       }
    }
  }, [location]);

  // Boomerang Logic: When one ends, play the other
  const handleForwardEnded = () => {
    if (reverseRef.current) {
      reverseRef.current.currentTime = 0;
      reverseRef.current.play().then(() => {
        setActiveVideo('reverse');
      }).catch(e => console.error("Reverse play error", e));
    }
  };

  const handleReverseEnded = () => {
    if (forwardRef.current) {
      forwardRef.current.currentTime = 0;
      forwardRef.current.play().then(() => {
        setActiveVideo('forward');
      }).catch(e => console.error("Forward play error", e));
    }
  };

  // Optimization: Handle video load to prioritize forward video
  const handleForwardCanPlay = () => {
    // CRITICAL FIX: Use requestAnimationFrame to ensure the initial 'opacity: 0' paint occurs.
    // Then delay by 500ms before triggering the 3s fade.
    requestAnimationFrame(() => {
        setTimeout(() => {
            setIsLoaded(true);
            // Start preloading the reverse video only after the first one is ready
            if (reverseRef.current) {
                reverseRef.current.preload = "auto"; 
            }
        }, 500);
    });
  };

  return (
    <div className="min-h-screen text-white selection:bg-[#D4AF37] selection:text-black relative">
      
      {/* Custom Cursor Added Here */}
      <Cursor />

      {/* 
        Video Background Layer 
      */}
      <div 
        className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-[#020202]"
        style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
      >
        
        {/* 
            Wrapper for the Fade-In Animation 
            UPDATED: Using inline styles for absolute control over the transition.
        */}
        <div 
            className="w-full h-full"
            style={{ 
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 3000ms ease-out',
                willChange: 'opacity'
            }}
        >
            
            <video
                ref={forwardRef}
                autoPlay
                muted
                playsInline
                preload="auto"
                fetchPriority="high"
                poster="https://res.cloudinary.com/daepdtgua/video/upload/so_0,q_auto,f_jpg,w_1920/v1767529641/background_oooay4.jpg"
                onCanPlay={handleForwardCanPlay} 
                onEnded={handleForwardEnded}
                className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[3000ms] ${activeVideo === 'forward' ? 'opacity-50 z-10' : 'opacity-0 z-0'}`}
                style={{ willChange: 'opacity' }}
            >
                <source src="https://res.cloudinary.com/daepdtgua/video/upload/fps_30,q_auto:good,br_4m,f_auto,w_1920/v1767529641/background_oooay4.mp4" type="video/mp4" />
            </video>

            {/* Reverse Video */}
            <video
                ref={reverseRef}
                muted
                playsInline
                preload="none"
                onEnded={handleReverseEnded}
                className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[3000ms] ${activeVideo === 'reverse' ? 'opacity-50 z-10' : 'opacity-0 z-0'}`}
                style={{ willChange: 'opacity' }}
            >
                <source src="https://res.cloudinary.com/daepdtgua/video/upload/fps_30,q_auto:good,br_4m,f_auto,e_reverse,w_1920/v1767529641/background_oooay4.mp4" type="video/mp4" />
            </video>
        </div>

        {/* 
           PERFORMANCE FIX: Smoother Gradient Overlays
           Using linear-gradient with transparency steps to reduce banding.
        */}
        <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
                background: `
                    linear-gradient(to bottom, 
                        rgba(0,0,0,0.5) 0%, 
                        rgba(0,0,0,0) 25%, 
                        rgba(0,0,0,0) 75%, 
                        rgba(0,0,0,0.8) 100%
                    ),
                    radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.02) 0%, rgba(0,0,0,0) 100%)
                `
            }}
        />
      </div>

      <Navbar />
      
      {/* 
        Content Wrapper
        UPDATED: Using CSS Grid to force overlap.
        'grid-cols-1' puts all children in the same cell, allowing the entering/exiting
        pages to sit strictly on top of each other for a perfect mix.
      */}
      <div className="relative z-10 grid grid-cols-1 w-full">
          <AnimatePresence mode="popLayout">
            <div key={location.pathname} className="contents">
              <Routes location={location}>
                <Route 
                    path="/" 
                    element={
                        <PageTransition>
                            <Home />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/about" 
                    element={
                        <PageTransition>
                            <About />
                        </PageTransition>
                    } 
                />
                <Route 
                    path="/contact" 
                    element={
                        <PageTransition>
                            <Contact />
                        </PageTransition>
                    } 
                />
              </Routes>
            </div>
          </AnimatePresence>
      </div>
      
    </div>
  );
}

export default App;
