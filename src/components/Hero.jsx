import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import FloatingElements from '../assets/floating_elements.png';
import NeuralBlob from '../assets/neural_blob.png';

export default function Hero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const taglineRef = useRef(null);
  const bgRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background Elements Animation
      bgRefs.current.forEach((el, i) => {
        if (!el) return;
        
        // Random floating motion
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

        // Pulsing scale
        gsap.to(el, {
          scale: '+=0.05',
          opacity: 0.7,
          duration: `random(3, 5)`,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.3
        });
      });

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
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 overflow-hidden bg-[#050505]"
    >
      {/* Decorative Floating 3D Elements */}
      <img 
        ref={el => bgRefs.current[0] = el}
        src={FloatingElements} 
        alt="" 
        className="absolute top-[15%] left-[10%] w-32 h-32 md:w-48 md:h-48 object-contain mix-blend-screen opacity-60 rotate-12" 
      />
      <img 
        ref={el => bgRefs.current[1] = el}
        src={FloatingElements} 
        alt="" 
        className="absolute bottom-[20%] right-[12%] w-40 h-40 md:w-64 md:h-64 object-contain mix-blend-screen opacity-60 -rotate-45" 
      />
      <img 
        ref={el => bgRefs.current[2] = el}
        src={FloatingElements} 
        alt="" 
        className="absolute top-[60%] left-[5%] w-24 h-24 md:w-32 md:h-32 object-contain mix-blend-screen opacity-60 rotate-[120deg]" 
      />
      <img 
        ref={el => bgRefs.current[3] = el}
        src={FloatingElements} 
        alt="" 
        className="absolute top-[10%] right-[5%] w-16 h-16 md:w-28 md:h-28 object-contain mix-blend-screen opacity-60" 
      />

      {/* Organic Neural Elements */}
      <img 
        ref={el => bgRefs.current[4] = el}
        src={NeuralBlob} 
        alt="" 
        className="absolute top-[20%] right-[15%] w-48 h-48 md:w-72 md:h-72 object-contain mix-blend-screen opacity-60" 
      />
      <img 
        ref={el => bgRefs.current[5] = el}
        src={NeuralBlob} 
        alt="" 
        className="absolute bottom-[25%] left-[10%] w-32 h-32 md:w-56 md:h-56 object-contain mix-blend-screen opacity-60 rotate-45" 
      />
      <img 
        ref={el => bgRefs.current[6] = el}
        src={NeuralBlob} 
        alt="" 
        className="absolute top-[60%] right-[3%] w-24 h-24 md:w-40 md:h-40 object-contain mix-blend-screen opacity-60" 
      />

      <div className="z-10 text-center max-w-5xl mx-auto flex flex-col items-center select-none pointer-events-none">
        


        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight leading-[1.1] text-transparent drop-shadow-md overflow-hidden pb-4 flex flex-col items-center">
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

        <p ref={taglineRef} className="mt-6 md:mt-8 text-xl md:text-3xl text-gray-400 font-light max-w-2xl tracking-[0.4em] uppercase">
          Fullstack Developer
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
          <span className="text-[10px] uppercase tracking-widest font-mono mb-2">Scroll</span>
          <div className="w-[1px] h-[60px] bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent to-[#050505] opacity-50 pointer-events-none" />
    </section>
  );
}
