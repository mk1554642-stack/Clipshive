
import React, { useEffect, useRef } from 'react';

const Cursor: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  
  // Mutable state for physics to avoid re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    // 1. Mouse Move Listener
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Initialize position on first interaction to prevent "flying in"
      if (!isVisible.current) {
        isVisible.current = true;
        current.current.x = e.clientX;
        current.current.y = e.clientY;
        if (circleRef.current) {
            circleRef.current.style.opacity = '1';
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 2. Animation Loop
    let rafId: number;
    const animate = () => {
      // Lerp logic from snippet: currentX += (mouseX - currentX) * 0.15
      const easing = 0.15;
      current.current.x += (mouse.current.x - current.current.x) * easing;
      current.current.y += (mouse.current.y - current.current.y) * easing;

      if (circleRef.current) {
        // Snippet Transform Logic
        circleRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      // Style Update: Solid white background (bg-white), removed border
      // Logic: 0.15 Lerp + 0.08s Linear Transition (preserved from previous version)
      className="fixed top-0 left-0 w-[14px] h-[14px] bg-white rounded-full pointer-events-none z-[9999] hidden md:block transition-transform duration-[80ms] ease-linear"
      style={{
        opacity: 0, // Hidden until first mouse move
        willChange: 'transform',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)' // Added soft glow for premium solid feel
      }}
    />
  );
};

export default Cursor;
