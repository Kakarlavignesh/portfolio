import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += Math.random() * 15;
      if (t >= 100) {
        t = 100;
        clearInterval(interval);
        
        // Split text animation for sequence
        gsap.to('.loader-text', {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            gsap.to('.loader-overlay', {
              yPercent: -100,
              duration: 1.2,
              ease: 'power3.inOut',
              onComplete,
            });
          }
        });
      }
      setProgress(Math.floor(t));
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader-overlay fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center text-white">
      <div className="loader-text text-center space-y-6 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-mono tracking-[0.2em] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b026ff]">
          System Init
        </h1>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[#00f0ff] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-xs text-gray-500 flex justify-between w-64 uppercase tracking-widest">
          <span>Loading Assets</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
