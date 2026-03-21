import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'C++', 'Python', 'Java', 'SQL'],
    color: '#00f0ff',
  },
  {
    title: 'Frameworks',
    skills: ['React', 'Next.js', 'Node.js', 'Express.js'],
    color: '#b026ff',
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'PostgreSQL'],
    color: '#ff0055',
  },
  {
    title: 'Core Concepts',
    skills: ['DSA', 'OS', 'DBMS'],
    color: '#00ffaa',
  },
];

export default function Skills() {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodesRef.current,
        { scale: 0, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 flex flex-col items-center justify-center z-10 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Neural Pathways
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative w-full">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => (nodesRef.current[index] = el)}
              className="group relative flex flex-col items-center"
            >
              {/* Core Node */}
              <div 
                className="w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center rounded-full glass-panel cursor-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 group-hover:z-10"
                style={{
                  boxShadow: `0 0 20px ${category.color}40`,
                  border: `1px solid ${category.color}80`,
                }}
              >
                {/* Rotating ring */}
                <div 
                  className="absolute -inset-4 border-t border-r rounded-full animate-[spin_8s_linear_infinite]"
                  style={{ borderColor: category.color, opacity: 0.5 }}
                />
                
                <h3 className="text-lg font-bold z-10 text-center" style={{ color: category.color, textShadow: `0 0 10px ${category.color}80` }}>
                  {category.title}
                </h3>
              </div>

              {/* Connecting lines & Sub-skills */}
              <div className="mt-8 flex flex-wrap justify-center gap-3 w-full">
                {category.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs md:text-sm md:px-4 md:py-2 rounded-full glass-panel opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all duration-300 font-mono tracking-wide"
                    style={{
                      borderBottom: `2px solid ${category.color}80`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
