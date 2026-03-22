import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ResumeImg from '../assets/resume_image.png';

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for the section header
      gsap.fromTo(
        sectionRef.current.querySelector('h2'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animation when opening/closing the resume
  useLayoutEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0, scale: 0.95 },
        { height: 'auto', opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isOpen) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 40;
    const y = -(clientY - top - height / 2) / 40;

    gsap.to(cardRef.current, {
      rotationY: x,
      rotationX: y,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotationY: 0, rotationX: 0, duration: 1, ease: 'power2.out' });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 flex flex-col items-center justify-center px-4 z-10 overflow-hidden" 
      id="resume"
    >
      <div className="max-w-4xl mx-auto w-full text-center space-y-8 mb-16 px-4">
        <h2 className="text-4xl md:text-6xl font-black tracking-widest text-[#ffb000] uppercase pb-2 drop-shadow-[0_0_12px_rgba(255,176,0,0.6)]">
          <span className="text-white opacity-40">04.</span> Resume
        </h2>
        <div className="h-[2px] w-24 bg-gradient-to-r from-[#ffb000] to-transparent mx-auto mt-4" />
        <p className="text-lg md:text-xl text-gray-400 font-mono tracking-wider max-w-2xl mx-auto">
          {isOpen ? "Full resume view active." : "Confidential document. Click below to reveal the full resume."}
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-8 w-full">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative px-12 py-6 glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all hover:border-[#ffb000]/50 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffb000]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#ffb000]/40 group-hover:shadow-[0_0_20px_rgba(255,176,0,0.3)] transition-all">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffb000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <span className="text-2xl font-black tracking-widest text-[#ffb000] uppercase">View Resume</span>
              <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">Click to decrypt & display</span>
            </div>
          </button>
        ) : (
          <div className="w-full max-w-2xl space-y-8">
            <div className="flex justify-end px-4">
               <button 
                 onClick={() => setIsOpen(false)}
                 className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all font-mono text-xs uppercase"
               >
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                 </svg>
                 Close View
               </button>
            </div>

            <div 
              ref={contentRef}
              className="relative group perspective-[2000px] w-full px-4"
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative glass-panel p-2 transform-style-3d shadow-2xl overflow-hidden rounded-xl border border-white/5 bg-white/20 backdrop-blur-md transition-all duration-500"
              >
                {/* Resume Image */}
                <div className="relative z-10 bg-white rounded-lg overflow-hidden group/img">
                  <img 
                    src={ResumeImg} 
                    alt="Resume" 
                    className="w-full h-auto brightness-100 contrast-100"
                  />
                </div>

                {/* Download Button Overlaid on Card */}
                <div className="absolute top-6 right-6 z-20">
                   <a 
                     href={ResumeImg} 
                     download="Resume.png"
                     className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00f0ff] to-[#b026ff] rounded-full text-white font-mono text-xs font-bold tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-110 transition-transform active:scale-95 whitespace-nowrap"
                   >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      DOWNLOAD
                   </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Glows */}
      <div className="absolute -z-10 -bottom-10 -right-10 w-60 h-60 bg-[#b026ff]/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute -z-10 -top-10 -left-10 w-60 h-60 bg-[#00f0ff]/30 blur-[120px] rounded-full animate-pulse delay-700" />
    </section>
  );
}
