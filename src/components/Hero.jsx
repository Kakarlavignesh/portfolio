import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import FloatingElements from '../assets/floating_elements.png';
import NeuralBlob from '../assets/neural_blob.png';
import ProfilePic from '../assets/profile.png';

export default function Hero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const taglineRef = useRef(null);
  const bgRefs = useRef([]);
  const profileRef = useRef(null);
  const hSparkRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background Elements Animation
      bgRefs.current.forEach((el, i) => {
        if (!el) return;
        
        gsap.to(el, {
          y: 'random(-40, 40)',
          x: 'random(-40, 40)',
          rotation: 'random(-15, 15)',
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5
        });
      });

      // Special Animation for the Spark above 'H'
      if (hSparkRef.current) {
        gsap.to(hSparkRef.current, {
          y: -20,
          rotation: 360,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
        
        gsap.to(hSparkRef.current, {
          opacity: 0.8,
          scale: 1.2,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Profile Picture Animation
      if (profileRef.current) {
        gsap.fromTo(profileRef.current, 
          { x: 100, opacity: 0, scale: 0.9 },
          { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.8 }
        );
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(title1Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 })
        .fromTo(title2Ref.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.7')
        .fromTo(taglineRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen w-full px-4 md:px-12 overflow-hidden bg-[#050505]"
    >
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00f0ff] opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 opacity-[0.03] blur-[100px] pointer-events-none" />

      {/* Background Decorative Elements (Balanced) */}
      <img 
        ref={el => bgRefs.current[0] = el}
        src={FloatingElements} 
        alt="" 
        className="absolute top-[10%] left-[5%] w-24 h-24 md:w-32 md:h-32 object-contain mix-blend-screen opacity-40 rotate-12" 
      />
      <img 
        ref={el => bgRefs.current[1] = el}
        src={FloatingElements} 
        alt="" 
        className="absolute bottom-[10%] right-[30%] w-20 h-20 md:w-28 md:h-28 object-contain mix-blend-screen opacity-30 -rotate-45" 
      />
      <img 
        ref={el => bgRefs.current[2] = el}
        src={FloatingElements} 
        alt="" 
        className="absolute top-[70%] left-[8%] w-16 h-16 md:w-24 md:h-24 object-contain mix-blend-screen opacity-40 rotate-[120deg]" 
      />
      
      {/* Animation above the letter 'H' in 'VIGNESH' */}
      <div 
        ref={hSparkRef}
        className="absolute top-[28%] left-[45%] md:left-[28%] lg:left-[35%] w-32 h-32 pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full scale-110 animate-pulse" />
        <img 
          src={NeuralBlob} 
          alt="" 
          className="w-full h-full object-contain mix-blend-screen opacity-40" 
        />
      </div>

      <img 
        ref={el => bgRefs.current[3] = el}
        src={NeuralBlob} 
        alt="" 
        className="absolute top-[20%] right-[5%] w-40 h-40 md:w-56 md:h-56 object-contain mix-blend-screen opacity-30" 
      />
      <img 
        ref={el => bgRefs.current[4] = el}
        src={NeuralBlob} 
        alt="" 
        className="absolute bottom-[20%] left-[12%] w-28 h-28 md:w-48 md:h-48 object-contain mix-blend-screen opacity-30 rotate-45" 
      />
      <img 
        ref={el => bgRefs.current[5] = el}
        src={NeuralBlob} 
        alt="" 
        className="absolute top-[60%] right-[10%] w-20 h-20 md:w-32 md:h-32 object-contain mix-blend-screen opacity-20" 
      />

      <div className="z-10 flex flex-col md:flex-row items-center justify-center max-w-7xl w-full gap-8 md:gap-16">
        <div className="text-center md:text-left flex flex-col items-center md:items-start select-none">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight leading-[1.1] text-transparent drop-shadow-md overflow-hidden pb-4 flex flex-col items-center md:items-start">
            <div className="overflow-hidden">
              <span ref={title1Ref} className="block pb-2 text-white font-light tracking-widest uppercase">
                Vignesh
              </span>
            </div>
            <div className="overflow-hidden">
              <span ref={title2Ref} className="block pb-2 font-bold uppercase tracking-[0.2em]" 
                    style={{ 
                      color: '#00f0ff',
                      textShadow: '0 0 10px rgba(0, 240, 255, 0.4), 0 0 20px rgba(0, 240, 255, 0.2)' 
                    }}>
                Reddy
              </span>
            </div>
          </h1>

          <p ref={taglineRef} className="mt-6 md:mt-8 text-xl md:text-2xl lg:text-3xl text-gray-400 font-light max-w-2xl tracking-[0.4em] uppercase">
            Fullstack Developer
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
            <span className="text-[10px] uppercase tracking-widest font-mono mb-2 text-white">Scroll</span>
            <div className="w-[1px] h-[60px] bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="relative z-10 flex justify-center mt-12 md:mt-0">
          {/* Animated Glow behind image */}
          <div className="absolute inset-0 bg-cyan-500/10 blur-[60px] rounded-full scale-110 animate-pulse" />
          
          <div 
            ref={profileRef}
            className="relative w-64 h-80 md:w-[320px] md:h-[400px] lg:w-[380px] lg:h-[480px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            style={{
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)'
            }}
          >
            <img 
              src={ProfilePic} 
              alt="Vignesh Reddy" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 border border-white/5 rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent to-[#050505] opacity-50 pointer-events-none" />
    </section>
  );
}
