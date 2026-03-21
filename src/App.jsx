import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import Scene from './components/Scene';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Loader from './components/Loader';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const container = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Keep GSAP ticker in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div 
        ref={container} 
        className="relative w-full overflow-hidden bg-[#050505] text-white" 
        style={{ display: loading ? 'none' : 'block' }}
      >
        <Navigation />

        {/* 3D Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
            <Environment preset="city" />
            <Scene />
            <Preload all />
          </Canvas>
        </div>

        {/* Content wrapper with IDs for navigation */}
        <main className="relative z-10 w-full flex flex-col">
          <div id="hero">
            <Hero />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="achievements">
            <Achievements />
          </div>
          <div id="contact">
            <Contact />
          </div>
        </main>
      </div>
    </>
  );
}
