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
        scene.fog = new THREE.FogExp2(0x000000, 0.0015);
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
        renderer.setClearColor(0x000000, 1);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // ============ PARTICLE FIELD (Silver/White) ============
        const particleCount = 1500;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        const particleSizes = new Float32Array(particleCount);

        const colorPalette = [
            new THREE.Color(0xffffff), // Pure White
            new THREE.Color(0xa1a1aa), // Zinc 400
            new THREE.Color(0x52525b), // Zinc 600
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 60 + 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i3 + 1] = (Math.random() - 0.5) * 40;
            particlePositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            particleColors[i3] = color.r;
            particleColors[i3 + 1] = color.g;
            particleColors[i3 + 2] = color.b;

            particleSizes[i] = Math.random() * 1.5 + 0.5;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        objectsRef.current.particles = particles;

        // ============ FLOATING GEOMETRIC SHAPES (Wireframe White) ============
        const shapes: THREE.Mesh[] = [];
        const geometries = [
            new THREE.IcosahedronGeometry(2, 0),
            new THREE.OctahedronGeometry(1.5, 0),
            new THREE.TetrahedronGeometry(1.8, 0),
        ];

        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.2
        });

        for (let i = 0; i < 6; i++) {
            const geom = geometries[i % geometries.length];
            const mesh = new THREE.Mesh(geom.clone(), wireframeMaterial.clone());

            mesh.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20 - 10
            );

            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.005,
                    y: (Math.random() - 0.5) * 0.005,
                    z: (Math.random() - 0.5) * 0.005
                },
                floatSpeed: Math.random() * 0.3 + 0.2,
                floatOffset: Math.random() * Math.PI * 2,
                originalY: mesh.position.y
            };

            shapes.push(mesh);
            scene.add(mesh);
        }
        objectsRef.current.shapes = shapes;

        // ============ CENTRAL RINGS ============
        const torusGeometry = new THREE.TorusGeometry(10, 0.02, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.z = -15;
        torus.rotation.x = Math.PI * 0.45;
        scene.add(torus);
        objectsRef.current.torus = torus;

        // ============ GLOWING CORE ============
        const coreGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.position.set(-10, 5, -5);
        scene.add(core);
        objectsRef.current.core = core;

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            const delta = 0.016;
            timeRef.current += delta;

            targetMouseRef.current.x += (mouseRef.current.x - targetMouseRef.current.x) * 0.03;
            targetMouseRef.current.y += (mouseRef.current.y - targetMouseRef.current.y) * 0.03;

            particles.rotation.y += 0.0001;
            particles.rotation.x = targetMouseRef.current.y * 0.05;

            shapes.forEach((shape) => {
                shape.rotation.x += shape.userData.rotationSpeed.x;
                shape.rotation.y += shape.userData.rotationSpeed.y;
                shape.position.y = shape.userData.originalY + Math.sin(timeRef.current * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.8;
            });

            torus.rotation.z += 0.001;
            const pulse = 1 + Math.sin(timeRef.current * 3) * 0.15;
            core.scale.set(pulse, pulse, pulse);

            camera.position.x = targetMouseRef.current.x * 2;
            camera.position.y = 2 + targetMouseRef.current.y * 1;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        };

        animate();

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
        setTimeout(() => setIsLoading(false), 100);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
            rendererRef.current?.dispose();
        };
    }, []);

    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-black">
            <div ref={containerRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <div className="w-12 h-12 border border-white/20 border-t-white rounded-full animate-spin" />
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />

            <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-6">
                <div className="w-full max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-12 animate-reveal">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">AI Enterprise Solutions</span>
                    </div>

                    <h1 className="text-display mb-8 animate-reveal" style={{ animationDelay: '0.1s' }}>
                        <span className="text-gradient">Automate the</span> <br />
                        Future of Business.
                    </h1>

                    <p className="text-xl md:text-2xl text-white/50 font-medium leading-relaxed max-w-2xl mx-auto mb-12 animate-reveal" style={{ animationDelay: '0.2s' }}>
                        Stop losing leads to missed calls. <br className="hidden sm:block" />
                        Custom AI agents for qualification and 24/7 engagement.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-reveal" style={{ animationDelay: '0.3s' }}>
                        <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Book a Demo <ArrowRight size={18} />
                        </a>
                        <button
                            onClick={openModal}
                            className="btn-secondary"
                        >
                            Book Strategy Call
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
                <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};

export default ThreeHero;
