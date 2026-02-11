import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Phone, ArrowRight } from 'lucide-react';
import { useTryNowModal } from '../context/TryNowModalContext';
import { BOOKING_URL } from '../config/constants';
import { throttle, disposeThreeObject } from './threeUtils';

const ThreeHero: React.FC = () => {
    const { openModal } = useTryNowModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const objectsRef = useRef<{
        particles: THREE.Points | null;
        shapes: THREE.Mesh[];
        torus: THREE.Mesh | null;
        torus2: THREE.Mesh | null;
        core: THREE.Mesh | null;
        glows: THREE.Mesh[];
    }>({
        particles: null,
        shapes: [],
        torus: null,
        torus2: null,
        core: null,
        glows: []
    });
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetMouseRef = useRef({ x: 0, y: 0 });
    const timeRef = useRef(0);
    const frameCountRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020617, 0.0015);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 30;
        camera.position.y = 2;
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x020617, 1);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // ============ PARTICLE FIELD ============
        const particleCount = 2000; // Reduced from 4000
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        const particleSizes = new Float32Array(particleCount);

        const colorPalette = [
            new THREE.Color(0x6366f1), // Indigo
            new THREE.Color(0x818cf8), // Light Indigo
            new THREE.Color(0x3b82f6), // Blue
            new THREE.Color(0x60a5fa), // Light Blue
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            // Spiral distribution
            const radius = Math.random() * 50 + 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i3 + 1] = (Math.random() - 0.5) * 30;
            particlePositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            particleColors[i3] = color.r;
            particleColors[i3 + 1] = color.g;
            particleColors[i3 + 2] = color.b;

            particleSizes[i] = Math.random() * 2 + 0.5;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        objectsRef.current.particles = particles;

        // ============ FLOATING GEOMETRIC SHAPES ============
        const shapes: THREE.Mesh[] = [];
        const geometries = [
            new THREE.IcosahedronGeometry(2, 0),
            new THREE.OctahedronGeometry(1.5, 0),
            new THREE.TetrahedronGeometry(1.8, 0),
            new THREE.DodecahedronGeometry(1.2, 0),
        ];

        // Wireframe material for tech aesthetic
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });

        // Glass material
        const glassMaterial = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
        });

        // Create floating shapes
        for (let i = 0; i < 8; i++) { // Reduced from 12
            const geom = geometries[i % geometries.length];
            const material = i % 2 === 0 ? wireframeMaterial : glassMaterial;
            const mesh = new THREE.Mesh(geom.clone(), material.clone());

            mesh.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20 - 5
            );

            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            const scale = Math.random() * 1.5 + 0.5;
            mesh.scale.set(scale, scale, scale);

            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatOffset: Math.random() * Math.PI * 2,
                originalY: mesh.position.y
            };

            shapes.push(mesh);
            scene.add(mesh);
        }
        objectsRef.current.shapes = shapes;

        // ============ TORUS RING ============
        const torusGeometry = new THREE.TorusGeometry(8, 0.05, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.3
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.z = -10;
        torus.rotation.x = Math.PI * 0.4;
        scene.add(torus);
        objectsRef.current.torus = torus;

        const torus2Geometry = new THREE.TorusGeometry(12, 0.03, 16, 100);
        const torus2Material = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.2
        });
        const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
        torus2.position.z = -15;
        torus2.rotation.x = Math.PI * 0.3;
        torus2.rotation.y = Math.PI * 0.1;
        scene.add(torus2);
        objectsRef.current.torus2 = torus2;

        // ============ GLOWING CORE ============
        const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.8
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.position.set(-8, 3, -5);
        scene.add(core);
        objectsRef.current.core = core;

        // Core glow layers
        const glows: THREE.Mesh[] = [];
        for (let i = 1; i <= 3; i++) {
            const glowGeom = new THREE.SphereGeometry(0.5 + i * 0.3, 32, 32);
            const glowMat = new THREE.MeshBasicMaterial({
                color: 0x6366f1,
                transparent: true,
                opacity: 0.3 / i
            });
            const glow = new THREE.Mesh(glowGeom, glowMat);
            glow.position.copy(core.position);
            scene.add(glow);
            glows.push(glow);
        }
        objectsRef.current.glows = glows;

        // ============ LIGHTING ============
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x3b82f6, 2, 100);
        pointLight2.position.set(-10, -10, 10);
        scene.add(pointLight2);

        // ============ ANIMATION LOOP ============
        const clock = new THREE.Clock();

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            timeRef.current += delta;
            frameCountRef.current++;

            // Smooth mouse following
            targetMouseRef.current.x += (mouseRef.current.x - targetMouseRef.current.x) * 0.05;
            targetMouseRef.current.y += (mouseRef.current.y - targetMouseRef.current.y) * 0.05;

            // Rotate particle field
            particles.rotation.y += 0.0005;
            particles.rotation.x = targetMouseRef.current.y * 0.1;
            particles.rotation.z = targetMouseRef.current.x * 0.1;

            // Animate particles (wave effect) - only every 2nd frame
            if (frameCountRef.current % 2 === 0) {
                const positions = particles.geometry.attributes.position.array as Float32Array;
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    const x = positions[i3];
                    const z = positions[i3 + 2];
                    positions[i3 + 1] += Math.sin(timeRef.current * 0.5 + x * 0.1) * 0.01;
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }

            // Animate floating shapes
            shapes.forEach((shape) => {
                shape.rotation.x += shape.userData.rotationSpeed.x;
                shape.rotation.y += shape.userData.rotationSpeed.y;
                shape.rotation.z += shape.userData.rotationSpeed.z;

                shape.position.y = shape.userData.originalY +
                    Math.sin(timeRef.current * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.5;

                // Mouse influence
                shape.rotation.x += targetMouseRef.current.y * 0.01;
                shape.rotation.y += targetMouseRef.current.x * 0.01;
            });

            // Animate torus rings
            torus.rotation.z += 0.002;
            torus2.rotation.z -= 0.001;

            // Pulse core
            const pulse = 1 + Math.sin(timeRef.current * 2) * 0.1;
            core.scale.set(pulse, pulse, pulse);

            // Camera subtle movement
            camera.position.x = targetMouseRef.current.x * 2;
            camera.position.y = 2 + targetMouseRef.current.y * 1;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        animate();

        // ============ EVENT LISTENERS ============
        const handleMouseMove = throttle((event: MouseEvent) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }, 16);

        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
            cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        // Set loading complete after first frame
        setTimeout(() => setIsLoading(false), 100);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
            
            // Dispose all geometries and materials
            geometries.forEach(g => g.dispose());
            wireframeMaterial.dispose();
            glassMaterial.dispose();
            torusGeometry.dispose();
            torusMaterial.dispose();
            torus2Geometry.dispose();
            torus2Material.dispose();
            coreGeometry.dispose();
            coreMaterial.dispose();
            
            // Dispose particle geometry and material
            if (objectsRef.current.particles) {
                objectsRef.current.particles.geometry.dispose();
                (objectsRef.current.particles.material as THREE.Material).dispose();
            }
            
            // Dispose shapes
            objectsRef.current.shapes.forEach(shape => {
                if (shape.geometry) shape.geometry.dispose();
                if (shape.material) {
                    if (Array.isArray(shape.material)) {
                        shape.material.forEach(m => m.dispose());
                    } else {
                        shape.material.dispose();
                    }
                }
            });
            
            // Dispose glows
            objectsRef.current.glows.forEach(glow => {
                if (glow.geometry) glow.geometry.dispose();
                if (glow.material) {
                    if (Array.isArray(glow.material)) {
                        glow.material.forEach(m => m.dispose());
                    } else {
                        glow.material.dispose();
                    }
                }
            });
            
            rendererRef.current?.dispose();
        };
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden">
            {/* 3D Canvas Container */}
            <div
                ref={containerRef}
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
            />

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#020617] z-10">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-white/60 text-sm">Loading experience...</p>
                    </div>
                </div>
            )}

            {/* Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full flex items-end pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
                <div className="w-full max-w-4xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                        <span className="text-white/80 text-sm font-medium">AI-Powered Call Answering</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.04em] text-white leading-[0.9] mb-6">
                        Stop Losing Leads <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                            From Your Ads.
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-white/80 font-medium leading-relaxed max-w-2xl mb-10">
                        Businesses lose up to 40% of leads to missed calls. <br className="hidden sm:block" />
                        AI agents that answer, qualify, and automate workflows 24/7.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-black text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105"
                        >
                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                            <span className="relative flex items-center gap-2">
                                Book a Demo <ArrowRight size={18} aria-hidden="true" />
                            </span>
                        </a>
                        <button
                            onClick={openModal}
                            className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all hover:scale-105"
                        >
                            <Phone size={16} aria-hidden="true" />
                            Book a Strategy Call
                        </button>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-12 flex items-center gap-6 text-white/50 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No contracts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Cancel anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>24/7 support</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default ThreeHero;
