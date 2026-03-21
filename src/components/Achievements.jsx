import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Education3D from '../assets/education_3d.png';
import Training3D from '../assets/training_3d.png';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const containerRef = useRef(null);
  const countersRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Counter Animation
      countersRef.current.forEach((counter) => {
        if (!counter) return;
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              innerHTML: target,
              duration: 2.5,
              ease: 'power3.out',
              snap: { innerHTML: 1 },
              onUpdate: function () {
                counter.innerHTML = Math.ceil(this.targets()[0].innerHTML) + '+';
              },
            });
          },
        });
      });
      
      // Cards and Timeline reveal
      gsap.fromTo(
        '.reveal-element',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.reveal-container',
            start: 'top 75%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-transparent text-white z-10 px-4 md:px-12 xl:px-32">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Achievements Section Title */}
        <div className="reveal-container w-full text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 uppercase overflow-hidden pb-2">
            Achievements
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#00f0ff] to-transparent mx-auto mt-4" />
        </div>

        {/* Achievements Counters */}
        <div className="reveal-container grid grid-cols-1 md:grid-cols-2 gap-12 text-center mt-12">
          <div className="reveal-element glass-panel p-12 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div 
              className="text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <span ref={el => countersRef.current[0] = el} data-target="280">0</span>
            </div>
            <p className="mt-4 text-xl font-mono text-[#00f0ff] uppercase tracking-widest">
              LeetCode Problems
            </p>
          </div>

          <div className="reveal-element glass-panel p-12 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#b026ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div 
              className="text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 drop-shadow-[0_0_15px_rgba(176,38,255,0.4)]"
            >
              <span ref={el => countersRef.current[1] = el} data-target="117">0</span>
            </div>
            <p className="mt-4 text-xl font-mono text-[#b026ff] uppercase tracking-widest">
              Day Streak
            </p>
          </div>
        </div>

        <div className="reveal-container flex flex-col gap-28">

          {/* Training Section */}
          <div className="space-y-8 w-full" id="training">
            <h3 className="text-3xl font-black mb-12 text-gray-200">
              <span className="text-[#00ffaa]">01. </span> Training
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side: Training Details */}
              <div className="relative border-l-2 border-[#00ffaa]/30 pl-8 space-y-12">
                <div className="reveal-element relative">
                  <div className="absolute w-4 h-4 bg-[#00ffaa] rounded-full -left-[42px] top-1 shadow-[0_0_15px_#00ffaa]" />
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl md:text-2xl font-bold text-white leading-tight">C++ Internship Certificate</h4>
                    <span className="text-sm font-mono text-gray-500 shrink-0 ml-4">July’ 2025</span>
                  </div>
                  <a 
                    href="https://files.lpu.in/umsweb/skilldevcourse/SkillDevelopmentCertificates/12309902_836_20_08_2025.pdf?_gl=1*m8gfbu*_gcl_au*MTgwNDA2NDQxMy4xNzY5NzkxNjc3" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block text-[#00ffaa] hover:underline mb-4 font-mono text-sm"
                  >
                    View Certificate
                  </a>
                  <ul className="space-y-4 text-gray-400 font-light text-base md:text-lg list-disc ml-4">
                    <li>Completed intensive object-oriented programming course focusing on C++ design principles and practical real-world implementation projects using industry-standard development tools.</li>
                    <li>Demonstrated proficiency in classes, inheritance, polymorphism, and modular scalable software development practices and techniques for building robust enterprise-level applications.</li>
                    <li>Successfully completed structured training emphasizing problem solving, debugging, and efficient clean maintainable code organization across multiple academic and real-time coding assignments.</li>
                  </ul>
                </div>
              </div>

              {/* Right Side: 3D Holographic Rendering */}
              <div className="reveal-element hidden md:flex items-center justify-center p-8">
                <div className="relative w-full aspect-square max-w-[380px] perspective-[1000px]">
                  <div className="absolute inset-0 rounded-full border-2 border-[#00ffaa]/20 animate-[spin_12s_linear_infinite]" />
                  <img 
                    src={Training3D} 
                    alt="C++ Training Hologram" 
                    className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(0,255,170,0.4)] animate-hologram" 
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ffaa]/10 blur-3xl rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-8 w-full" id="certifications">
            <h3 className="text-3xl font-black mb-12 text-gray-200">
              <span className="text-[#b026ff]">02. </span> Certifications
            </h3>

            <div className="space-y-6">
              {[
                { 
                  title: 'ChatGPT-4 Prompt Engineering', 
                  issuer: 'Infosys', 
                  date: 'Sep’ 2025', 
                  color: '#b026ff',
                  url: 'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_014157693153288192147/1-230b091c-145f-48e9-985a-614d227fce4c.pdf'
                },
                { 
                  title: 'Master Generative AI & Generative AI tools (ChatGPT & more)', 
                  issuer: 'Certificate', 
                  date: 'Sep’ 2025', 
                  color: '#00f0ff',
                  url: 'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_014157710267834368237/1-1a496f04-7a28-491b-b204-bcbe5da6e02f.pdf'
                },
                { 
                  title: 'Build Generative AI Apps and Solutions with No-Code Tools', 
                  issuer: 'Certificate', 
                  date: 'Sep’ 2025', 
                  color: '#00ffaa',
                  url: 'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_014157683688415232146/1-509895f7-3dbd-4a22-8d1c-c275e8fd4615.pdf'
                },
                { 
                  title: 'Web Development Fundamentals', 
                  issuer: 'Free Code Camp', 
                  date: 'Nov’ 2023', 
                  color: '#ffffff',
                  url: 'https://www.freecodecamp.org/certification/fcc338602d6-4f12-4ede-a16a-8f1a9fa3fb60/responsive-web-design'
                },
              ].map((cert, i) => (
                <a 
                  key={i} 
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block reveal-element glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                  style={{ borderLeft: `4px solid ${cert.color}` }}
                >
                  <div>
                    <h5 className="text-lg font-bold text-white group-hover:text-white mb-1 transition-colors flex items-center gap-2">
                      {cert.title}
                    </h5>
                    <p className="text-sm font-light text-gray-400">{cert.issuer}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-500 bg-white/5 py-1 px-3 rounded-full shrink-0">
                      {cert.date}
                    </span>
                    <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cert.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="space-y-8 w-full" id="education">
            <h3 className="text-3xl font-black mb-12 text-gray-200">
              <span className="text-[#00f0ff]">03. </span> Education
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side: Timeline */}
              <div className="relative border-l-2 border-[#00f0ff]/30 pl-8 space-y-12">
                <div className="reveal-element relative">
                  <div className="absolute w-4 h-4 bg-[#00f0ff] rounded-full -left-[42px] top-1 shadow-[0_0_15px_#00f0ff]" />
                  <span className="text-sm font-mono text-gray-500 block mb-1">Since Aug’ 2023 – Present</span>
                  <h4 className="text-xl font-bold text-white mb-2">Lovely Professional University | Phagwara, Punjab</h4>
                  <p className="text-gray-400 font-light max-w-2xl">B-Tech in Computer Science (AI & ML)</p>
                </div>

                <div className="reveal-element relative">
                  <div className="absolute w-4 h-4 bg-gray-600 rounded-full -left-[42px] top-1" />
                  <span className="text-sm font-mono text-gray-500 block mb-1">April 2020 - March 2022</span>
                  <h4 className="text-xl font-bold text-gray-300 mb-2">SR Junior College | Vijayawada, India</h4>
                  <p className="text-gray-500 font-light max-w-2xl">Intermediate</p>
                </div>

                <div className="reveal-element relative">
                  <div className="absolute w-4 h-4 bg-gray-600 rounded-full -left-[42px] top-1" />
                  <span className="text-sm font-mono text-gray-500 block mb-1">April 2012 - March 2019</span>
                  <h4 className="text-xl font-bold text-gray-300 mb-2">Geethanjali High School | Vinukonda, India</h4>
                  <p className="text-gray-500 font-light max-w-2xl">Matriculation</p>
                </div>
              </div>

              {/* Right Side: 3D Holographic Rendering */}
              <div className="reveal-element hidden md:flex items-center justify-center p-8">
                <div className="relative w-full aspect-square max-w-[400px] perspective-[1000px]">
                  {/* Decorative orbital rings behind */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#00f0ff]/20 animate-[spin_10s_linear_infinite] opacity-50 backdrop-blur-3xl" />
                  <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#b026ff]/30 animate-[spin_15s_linear_infinite_reverse] opacity-50" />
                  
                  {/* The actual generated 3D image */}
                  <img 
                    src={Education3D} 
                    alt="Education 3D Hologram graphic" 
                    className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_30px_rgba(0,240,255,0.4)] animate-hologram opacity-80" 
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                  
                  {/* Floating particles to enhance depth */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#00f0ff]/10 blur-xl animate-pulse" />
                  <div className="absolute -bottom-8 -left-4 w-16 h-16 rounded-full bg-[#b026ff]/20 blur-xl animate-pulse delay-700" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
