import React, { useRef, useEffect } from 'react';
import * as THREE from '../../node_modules/@types/three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { throttle } from './threeUtils';

gsap.registerPlugin(ScrollTrigger);

interface Scroll3DSectionProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'spiral' | 'wave' | 'helix';
}

const Scroll3DSection: React.FC<Scroll3DSectionProps> = ({
    children,
    className = '',
    variant = 'spiral'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const groupRef = useRef<THREE.Group | null>(null);
    const objectsRef = useRef<{
        spiral: THREE.Points | null;
        plane: THREE.Mesh | null;
        strands: THREE.Points[];
        ambientParticles: THREE.Points | null;
    }>({
        spiral: null,
        plane: null,
        strands: [],
        ambientParticles: null
    });
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);
    const frameCountRef = useRef(0);
    const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 30;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        // Create 3D elements based on variant
        const group = new THREE.Group();
        groupRef.current = group;

        if (variant === 'spiral') {
            // Spiral of particles
            const particleCount = 1000; // Reduced from 2000
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const colorPalette = [
                new THREE.Color(0x6366f1),
                new THREE.Color(0x8b5cf6),
                new THREE.Color(0x06b6d4),
            ];

            for (let i = 0; i < particleCount; i++) {
                const t = i / particleCount;
                const angle = t * Math.PI * 20; // 5 full rotations
                const radius = 5 + t * 15;
                const y = (t - 0.5) * 40;

                positions[i * 3] = Math.cos(angle) * radius;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = Math.sin(angle) * radius;

                const color = colorPalette[Math.floor(t * colorPalette.length)];
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.15,
                vertexColors: true,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            const spiral = new THREE.Points(geometry, material);
            group.add(spiral);
            objectsRef.current.spiral = spiral;
        } else if (variant === 'wave') {
            // Wave plane
            const geometry = new THREE.PlaneGeometry(60, 40, 40, 30); // Reduced resolution
            const material = new THREE.MeshBasicMaterial({
                color: 0x6366f1,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });

            const plane = new THREE.Mesh(geometry, material);
            plane.rotation.x = -Math.PI / 3;
            group.add(plane);
            objectsRef.current.plane = plane;
        } else if (variant === 'helix') {
            // Double helix
            const strandCount = 300; // Reduced from 500
            const strands: THREE.Points[] = [];

            for (let strand = 0; strand < 2; strand++) {
                const geometry = new THREE.BufferGeometry();
                const positions = new Float32Array(strandCount * 3);

                for (let i = 0; i < strandCount; i++) {
                    const t = i / strandCount;
                    const angle = t * Math.PI * 8 + strand * Math.PI;
                    const radius = 3;
                    const y = (t - 0.5) * 30;

                    positions[i * 3] = Math.cos(angle) * radius;
                    positions[i * 3 + 1] = y;
                    positions[i * 3 + 2] = Math.sin(angle) * radius;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

                const material = new THREE.PointsMaterial({
                    color: strand === 0 ? 0x6366f1 : 0x06b6d4,
                    size: 0.2,
                    transparent: true,
                    opacity: 0.8,
                    blending: THREE.AdditiveBlending
                });

                const helixStrand = new THREE.Points(geometry, material);
                strands.push(helixStrand);
                group.add(helixStrand);
            }
            objectsRef.current.strands = strands;
        }

        scene.add(group);

        // Add ambient particles
        const ambientCount = 250; // Reduced from 500
        const ambientGeometry = new THREE.BufferGeometry();
        const ambientPositions = new Float32Array(ambientCount * 3);

        for (let i = 0; i < ambientCount; i++) {
            ambientPositions[i * 3] = (Math.random() - 0.5) * 80;
            ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
            ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }

        ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientPositions, 3));

        const ambientMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.3
        });

        const ambientParticles = new THREE.Points(ambientGeometry, ambientMaterial);
        scene.add(ambientParticles);
        objectsRef.current.ambientParticles = ambientParticles;

        // GSAP ScrollTrigger animation
        const trigger1 = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
                if (groupRef.current) {
                    groupRef.current.rotation.y = self.progress * Math.PI * 2;
                }
            }
        });
        scrollTriggersRef.current.push(trigger1);

        const trigger2 = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
            onUpdate: (self) => {
                if (cameraRef.current) {
                    cameraRef.current.position.z = 30 - self.progress * 20;
                }
            }
        });
        scrollTriggersRef.current.push(trigger2);

        // Mouse interaction
        const handleMouseMove = throttle((e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }, 16);

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let waveTime = 0;
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            timeRef.current += 0.01;
            frameCountRef.current++;

            targetRotationRef.current.x += (mouseRef.current.y * 0.5 - targetRotationRef.current.x) * 0.05;
            targetRotationRef.current.y += (mouseRef.current.x * 0.5 - targetRotationRef.current.y) * 0.05;

            group.rotation.x = targetRotationRef.current.x;
            group.rotation.z = Math.sin(timeRef.current * 0.5) * 0.1;

            if (objectsRef.current.ambientParticles) {
                objectsRef.current.ambientParticles.rotation.y += 0.0002;
            }

            // Animate wave plane - only every 2nd frame
            if (variant === 'wave' && objectsRef.current.plane && frameCountRef.current % 2 === 0) {
                waveTime += 0.02;
                const geometry = objectsRef.current.plane.geometry;
                const positions = geometry.attributes.position.array as Float32Array;
                
                for (let i = 0; i < positions.length; i += 3) {
                    const x = positions[i];
                    const y = positions[i + 1];
                    positions[i + 2] =
                        Math.sin(x * 0.2 + waveTime) * 2 +
                        Math.cos(y * 0.15 + waveTime) * 2;
                }
                
                geometry.attributes.position.needsUpdate = true;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return;
            cameraRef.current.aspect = window.innerWidth / window.innerHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            
            // Kill all ScrollTriggers
            scrollTriggersRef.current.forEach(trigger => trigger.kill());
            scrollTriggersRef.current = [];
            
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            // Dispose geometries and materials
            if (objectsRef.current.spiral) {
                objectsRef.current.spiral.geometry.dispose();
                (objectsRef.current.spiral.material as THREE.Material).dispose();
            }

            if (objectsRef.current.plane) {
                objectsRef.current.plane.geometry.dispose();
                (objectsRef.current.plane.material as THREE.Material).dispose();
            }

            objectsRef.current.strands.forEach(strand => {
                if (strand.geometry) strand.geometry.dispose();
                if (strand.material) {
                    if (Array.isArray(strand.material)) {
                        strand.material.forEach(m => m.dispose());
                    } else {
                        strand.material.dispose();
                    }
                }
            });

            if (objectsRef.current.ambientParticles) {
                objectsRef.current.ambientParticles.geometry.dispose();
                (objectsRef.current.ambientParticles.material as THREE.Material).dispose();
            }

            rendererRef.current?.dispose();
        };
    }, [variant]);

    return (
        <section ref={containerRef} className={`relative ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
            />
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
};

export default Scroll3DSection;
