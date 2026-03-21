import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Code } from 'lucide-react';
import DSAPreview from '../assets/dsa_preview.png';
import TakeoutPreview from '../assets/takeout_preview.png';
import SpeedTyperPreview from '../assets/speed_typer_preview.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'DSA Visualizer',
    subtitle: '& Learning Hub',
    description: 'An interactive platform for real-time algorithm visualization with multi-language support and an integrated Monaco Editor.',
    tech: ['React', 'Three.js', 'GSAP', 'Monaco Editor'],
    repoLink: 'https://github.com/Kakarlavignesh/Linked-list-visualizer...',
    liveLink: 'https://lucky-gecko-61839a.netlify.app/',
    color: '#00f0ff',
    image: DSAPreview,
  },
  {
    title: 'The Takeout',
    subtitle: 'Premium Restaurant Management System | Jul’ 2025',
    description: [
      'Developed a full-stack restaurant management platform using Spring Boot and Java 17, implementing patterns to handle operations like real-time order processing and reward distributions.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Java', 'Spring Boot', 'Spring Data JPA', 'H2 Database', 'Maven'],
    repoLink: 'https://github.com/Kakarlavignesh/The-take-out',
    liveLink: 'https://candid-cuchufli-ad07a3.netlify.app/',
    color: '#b026ff',
    image: TakeoutPreview,
  },
  {
    title: 'SPEED TYPER',
    subtitle: 'Interactive Application',
    description: 'A real-time speed typing game with dynamic word rendering, live scoring, and responsive user interaction.',
    tech: ['HTML', 'CSS', 'JS'],
    repoLink: 'https://github.com/Kakarlavignesh/speed-typer/tree/main/070-typing%20game',
    color: '#00ffaa',
    image: SpeedTyperPreview,
  },
];

export default function Projects() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel');

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-transparent z-10 py-32 px-4 md:px-12 xl:px-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center md:text-left">
          <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600 drop-shadow-xl leading-tight">
            Featured Projects
          </h2>
          <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-[#00f0ff] to-transparent mx-auto md:mx-0"></div>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-panel w-full flex flex-col lg:flex-row items-center justify-center gap-12"
            >
              {/* Display / Graphic */}
              <div className="flex-1 w-full max-w-2xl aspect-video rounded-2xl glass-panel relative overflow-hidden group perspective-[1000px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* Real Preview Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
                
                {/* Holographic Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,.25)_50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
                
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div 
                    className="w-full h-full border border-white/10 rounded-xl relative overflow-hidden transition-all duration-500 group-hover:bg-white/5"
                    style={{ background: `linear-gradient(135deg, ${project.color}05, transparent)` }}
                  >
                    {/* Floating Scanline */}
                    <div className="absolute top-0 left-0 w-full h-[10%] bg-white/5 blur-sm animate-[scan_4s_linear_infinite] pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-4 p-4 glass-panel backdrop-blur-md">
                      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full animate-[progress_3s_ease-in-out_infinite]" style={{ backgroundColor: project.color, width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 w-full max-w-xl text-left z-10">
                <span className="font-mono text-sm tracking-widest mb-2 block uppercase" style={{ color: project.color }}>
                  System {i + 1} // {projects.length.toString().padStart(2, '0')}
                </span>
                <h3 className="text-4xl md:text-6xl font-black mb-2 leading-tight">
                  {project.title}
                </h3>
                <h4 className="text-xl md:text-3xl font-light text-gray-400 mb-6">
                  {project.subtitle}
                </h4>
                {Array.isArray(project.description) ? (
                  <ul className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8 list-disc pl-5 space-y-2">
                    {project.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed mb-8">
                    {project.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 text-xs md:text-sm border border-white/20 rounded-md font-mono bg-white/5 backdrop-blur-md">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-6">
                  <a href={project.repoLink || "https://github.com/Kakarlavignesh"} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white hover:text-white transition-colors">
                    <span className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Github size={18} />
                    </span>
                    <span className="font-mono uppercase text-xs font-bold tracking-widest group-hover:underline underline-offset-4 decoration-2" style={{ textDecorationColor: project.color }}>
                      Repository
                    </span>
                  </a>
                  <a href={project.liveLink || "#"} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-white hover:text-white transition-colors">
                    <span className="w-10 h-10 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform" style={{ borderColor: `${project.color}50` }}>
                      <ExternalLink size={18} color={project.color} />
                    </span>
                    <span className="font-mono uppercase text-xs font-bold tracking-widest group-hover:underline underline-offset-4 decoration-2" style={{ textDecorationColor: project.color }}>
                      Live Demo
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
