import React, { useState, useEffect } from 'react';

const sections = [
  { name: 'About', id: 'about' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Training', id: 'training' },
  { name: 'Certifications', id: 'certifications' },
  { name: 'Achievements', id: 'achievements' },
  { name: 'Education', id: 'education' },
  { name: 'Resume', id: 'resume' },
  { name: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 3D Animated Logo */}
      <div
        className="fixed top-8 left-6 md:left-12 z-[100] hidden sm:block cursor-pointer select-none transition-all duration-500 ease-in-out"
        style={{ perspective: '1000px' }}
        onClick={() => scrollTo('hero')}
      >
        <div
          className="animate-hologram text-xl md:text-3xl font-black tracking-widest text-[#00f0ff] uppercase drop-shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          PORTFOLIO
        </div>
      </div>

      <nav className="fixed top-6 right-6 md:right-[5%] z-[100] glass-panel px-6 py-3 rounded-full border border-white/10 flex items-center justify-center flex-nowrap overflow-x-auto overflow-y-hidden max-w-[calc(100vw-300px)] w-fit gap-4 md:gap-6 bg-[#050505]/60 backdrop-blur-xl transition-all duration-500 shadow-2xl no-scrollbar ease-in-out">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.name}
              onClick={() => scrollTo(sec.id)}
              className={`whitespace-nowrap flex-shrink-0 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-300 px-3 py-1 rounded-full ${isActive
                  ? 'text-[#00f0ff] bg-white/10 shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105 font-bold'
                  : 'text-gray-400 hover:text-white hover:scale-105'
                }`}
            >
              {sec.name}
            </button>
          );
        })}
      </nav>
    </>
  );
}
