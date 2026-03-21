import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sphere, TorusKnot, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const groupRef = useRef();
  const mouseGroupRef = useRef();
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();
  const starsRef = useRef();
  
  const { viewport } = useThree();

  useLayoutEffect(() => {
    // Parallax scrolling for 3D elements
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;

        if (groupRef.current) {
          gsap.to(groupRef.current.position, {
            y: progress * -10,
            duration: 0.5,
            ease: 'power1.out',
          });
          gsap.to(groupRef.current.rotation, {
            x: progress * Math.PI,
            duration: 0.5,
            ease: 'power1.out',
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useFrame((state, delta) => {
    // Mouse interaction parameters
    const x = (state.pointer.x * viewport.width) / 5;
    const y = (state.pointer.y * viewport.height) / 5;

    // Smooth damp towards mouse position
    if (mouseGroupRef.current) {
      mouseGroupRef.current.rotation.x = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.x, y * 0.2, 0.05);
      mouseGroupRef.current.rotation.y = THREE.MathUtils.lerp(mouseGroupRef.current.rotation.y, x * 0.2, 0.05);
      mouseGroupRef.current.position.x = THREE.MathUtils.lerp(mouseGroupRef.current.position.x, x * 0.5, 0.05);
      mouseGroupRef.current.position.y = THREE.MathUtils.lerp(mouseGroupRef.current.position.y, y * 0.5, 0.05);
    }

    if (mesh1.current) {
      mesh1.current.rotation.x += delta * 0.2;
      mesh1.current.rotation.y += delta * 0.3;
    }
    if (mesh2.current) {
      mesh2.current.rotation.x -= delta * 0.1;
      mesh2.current.rotation.y -= delta * 0.4;
    }
    if (mesh3.current) {
      mesh3.current.rotation.z += delta * 0.5;
      mesh3.current.rotation.x += delta * 0.2;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#b026ff" />

      <group ref={starsRef}>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </group>

      <group ref={groupRef}>
        <group ref={mouseGroupRef}>
          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 3, Math.PI / 3]} 
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            {/* Animated Abstract Shapes */}
            <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[2, 0, -5]}>
              <Sphere ref={mesh1} args={[1.2, 64, 64]}>
                <MeshDistortMaterial
                  color="#00f0ff"
                  attach="material"
                  distort={0.4}
                  speed={2}
                  roughness={0.2}
                  metalness={0.8}
                  transparent
                  opacity={0.4}
                  wireframe
                />
              </Sphere>
            </Float>

            <Float speed={1.5} rotationIntensity={2} floatIntensity={1} position={[-3, -3, -4]}>
              <TorusKnot ref={mesh2} args={[0.8, 0.2, 128, 32]}>
                <meshStandardMaterial
                  color="#b026ff"
                  emissive="#b026ff"
                  emissiveIntensity={0.5}
                  roughness={0.1}
                  metalness={0.9}
                  transparent
                  opacity={0.7}
                />
              </TorusKnot>
            </Float>

            <Float speed={3} rotationIntensity={0.5} floatIntensity={3} position={[0, -8, -6]}>
              <mesh ref={mesh3}>
                <octahedronGeometry args={[1.5, 0]} />
                <meshStandardMaterial
                  color="#00f0ff"
                  emissive="#00f0ff"
                  emissiveIntensity={0.2}
                  roughness={0}
                  metalness={1}
                  transparent
                  opacity={0.4}
                  wireframe
                />
              </mesh>
            </Float>
          </PresentationControls>
        </group>
      </group>
    </>
  );
}
