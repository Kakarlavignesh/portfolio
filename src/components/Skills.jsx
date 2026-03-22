import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
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
    color: '#ffb000', // Changed to match portfolio gold
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
      // Reveal nodes on scroll
      gsap.fromTo(
        nodesRef.current,
        { scale: 0, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMoveNode = (e, index) => {
    const node = nodesRef.current[index];
    if (!node) return;
    
    const { left, top, width, height } = node.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 10;
    const y = (e.clientY - top - height / 2) / 10;

    gsap.to(node.querySelector('.core-node'), {
      x: x,
      y: y,
      rotationX: -y * 2,
      rotationY: x * 2,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveNode = (index) => {
    const node = nodesRef.current[index];
    if (!node) return;
    
    gsap.to(node.querySelector('.core-node'), {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power4.out',
    });
  };

  return (
    <section ref={containerRef} className="relative py-32 flex flex-col items-center justify-center z-10 px-4 overflow-hidden" id="skills">
      {/* Background glow flares */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#b026ff]/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-7xl mx-auto relative">
        <div className="text-center space-y-4 mb-24">
          <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/10 uppercase tracking-tighter">
            Neural Pathways
          </h2>
          <p className="font-mono text-[#ffb000] tracking-[0.5em] text-sm uppercase opacity-70">Knowledge Architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 relative w-full px-4">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => (nodesRef.current[index] = el)}
              onMouseMove={(e) => handleMouseMoveNode(e, index)}
              onMouseLeave={() => handleMouseLeaveNode(index)}
              className="group relative flex flex-col items-center perspective-[1000px]"
            >
              <div 
                className="core-node w-40 h-40 md:w-48 md:h-48 relative flex items-center justify-center rounded-[2rem] glass-panel transition-all transform-style-3d shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-10 group-hover:before:opacity-20 bg-black/40"
                style={{
                  boxShadow: `0 0 30px ${category.color}15, inset 0 0 1px white/20`,
                  border: `1px solid ${category.color}40`,
                }}
              >
                {/* Floating internal shards */}
                <div 
                  className="absolute inset-[15%] border border-dashed rounded-xl rotate-45 animate-[spin_12s_linear_infinite]"
                  style={{ borderColor: `${category.color}40` }}
                />
                <div 
                  className="absolute inset-[25%] border border-solid rounded-full animate-[spin_8s_linear_infinite_reverse]"
                  style={{ borderColor: `${category.color}20` }}
                />

                <div className="relative z-10 flex flex-col items-center gap-2">
                  <h3 className="text-xl font-black tracking-widest text-center uppercase" style={{ color: category.color, textShadow: `0 0 15px ${category.color}80` }}>
                    {category.title}
                  </h3>
                  <div className="h-1 w-8 rounded-full" style={{ backgroundColor: category.color }} />
                </div>
              </div>

              {/* Connected Skills - floating below */}
              <div className="mt-12 flex flex-wrap justify-center gap-4 w-full">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="skill-tag relative group/tag px-5 py-2.5 rounded-xl glass-panel border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r transition-opacity opacity-0 group-hover/tag:opacity-5" style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }} />
                    <span className="relative z-10 text-sm font-mono tracking-widest text-gray-300 group-hover/tag:text-white">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
