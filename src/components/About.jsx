import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Card tilt effect on scroll
      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = -(clientY - top - height / 2) / 20;

    gsap.to(cardRef.current, {
      rotationY: x,
      rotationX: y,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotationY: 0, rotationX: 0, duration: 1, ease: 'power2.out' });
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center px-4 py-20 z-10" id="about">
      <div 
        className="relative max-w-4xl mx-auto group perspective-[1000px] w-full"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative glass-panel p-8 md:p-16 transform-style-3d shadow-2xl overflow-hidden rounded-3xl"
        >
          {/* Holographic glow effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/10 via-transparent to-[#b026ff]/10 pointer-events-none mix-blend-screen" />
          <div className="absolute -inset-[100%] top-0 left-1/2 w-[200%] h-[200%] bg-gradient-to-b from-white/10 to-transparent rotate-45 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

          {/* Hologram lines overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-sm font-mono tracking-widest text-[#00f0ff] uppercase mb-4 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
              &gt; Init Phase: Identify
            </h2>
            <div ref={textRef} className="space-y-6 text-lg md:text-2xl font-light text-gray-300 leading-relaxed">
              <p>
                I’m Kakarla Vignesh Reddy, a Computer Science student specializing in AI & ML, with a strong focus on Data Structures, System Design, and Full-Stack Development.
              </p>
              <p>
                I enjoy building systems that are not just functional, but interactive and intuitive. My work reflects a deep interest in visualizing complex logic, especially through projects like a real-time DSA Visualizer that executes and animates algorithms across multiple languages.
              </p>
              <p>
                With hands-on experience in JavaScript, Java, Python, and modern frameworks like React and Node.js, I focus on creating applications that combine clean architecture, performance, and engaging user experience.
              </p>
              <p>
                I’ve solved 280+ problems on LeetCode and maintained a consistent problem-solving streak, which has strengthened my analytical thinking and approach to breaking down complex problems.
              </p>
              <p>
                I’m always exploring new technologies, refining my skills, and aiming to build products that stand out through both functionality and experience.
              </p>
            </div>
          </div>
        </div>

        {/* Floating decoration block */}
        <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-[#b026ff]/30 blur-[100px] rounded-full" />
        <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-[#00f0ff]/30 blur-[100px] rounded-full" />
      </div>
    </section>
  );
}
