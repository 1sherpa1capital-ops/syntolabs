import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface FloatingOrbProps {
    color?: string;
    size?: number;
    position?: { x: number; y: number };
    className?: string;
    pulseSpeed?: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({
    color = '#6366f1',
    size = 1,
    position = { x: 0, y: 0 },
    className = '',
    pulseSpeed = 1
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const objectsRef = useRef<{
        orb: THREE.Mesh | null;
        glows: THREE.Mesh[];
        ring: THREE.Points | null;
    }>({
        orb: null,
        glows: [],
        ring: null
    });
    const timeRef = useRef(0);
    const frameCountRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(200, 200);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Parse color
        const threeColor = new THREE.Color(color);

        // Main orb
        const orbGeometry = new THREE.SphereGeometry(size, 32, 32);
        const orbMaterial = new THREE.MeshBasicMaterial({
            color: threeColor,
            transparent: true,
            opacity: 0.6
        });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        scene.add(orb);
        objectsRef.current.orb = orb;

        // Outer glow layers
        const glows: THREE.Mesh[] = [];
        for (let i = 1; i <= 4; i++) {
            const glowGeometry = new THREE.SphereGeometry(size + i * 0.3, 32, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: threeColor,
                transparent: true,
                opacity: 0.15 / i,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            scene.add(glow);
            glows.push(glow);
        }
        objectsRef.current.glows = glows;

        // Particle ring around orb
        const particleCount = 50; // Reduced from 100
        const ringGeometry = new THREE.BufferGeometry();
        const ringPositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = size + 0.8;
            ringPositions[i * 3] = Math.cos(angle) * radius;
            ringPositions[i * 3 + 1] = Math.sin(angle) * radius;
            ringPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }

        ringGeometry.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
        const ringMaterial = new THREE.PointsMaterial({
            color: threeColor,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const ring = new THREE.Points(ringGeometry, ringMaterial);
        scene.add(ring);
        objectsRef.current.ring = ring;

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            timeRef.current += 0.01 * pulseSpeed;
            frameCountRef.current++;

            // Only update every 2nd frame for particle-heavy operations
            if (frameCountRef.current % 2 === 0) {
                // Pulse effect
                const pulse = 1 + Math.sin(timeRef.current * 2) * 0.1;
                orb.scale.set(pulse, pulse, pulse);

                // Rotate ring
                ring.rotation.z += 0.005;
                ring.rotation.x = Math.sin(timeRef.current * 0.5) * 0.2;
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            // Dispose geometries and materials
            if (objectsRef.current.orb) {
                objectsRef.current.orb.geometry.dispose();
                (objectsRef.current.orb.material as THREE.Material).dispose();
            }

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

            if (objectsRef.current.ring) {
                objectsRef.current.ring.geometry.dispose();
                (objectsRef.current.ring.material as THREE.Material).dispose();
            }

            rendererRef.current?.dispose();
        };
    }, [color, size, pulseSpeed]);

    return (
        <div
            ref={containerRef}
            className={`absolute pointer-events-none ${className}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: '200px',
                height: '200px',
                filter: 'blur(1px)'
            }}
            aria-hidden="true"
        />
    );
};

// Batched floating orbs for background - optimized to use fewer orbs
interface OrbFieldProps {
    count?: number;
    className?: string;
}

export const OrbField: React.FC<OrbFieldProps> = ({ count = 3, className = '' }) => {
    const orbs = Array.from({ length: count }, (_, i) => ({
        id: i,
        color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][i % 5],
        size: 0.5 + Math.random() * 1.5,
        position: {
            x: Math.random() * 100,
            y: Math.random() * 100
        },
        pulseSpeed: 0.5 + Math.random() * 1.5
    }));

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {orbs.map((orb) => (
                <div
                    key={orb.id}
                    style={{
                        position: 'absolute',
                        left: `${orb.position.x}%`,
                        top: `${orb.position.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '200px',
                        height: '200px',
                        filter: 'blur(1px)',
                        pointerEvents: 'none'
                    }}
                >
                    <FloatingOrb
                        color={orb.color}
                        size={orb.size}
                        position={{ x: 0, y: 0 }}
                        pulseSpeed={orb.pulseSpeed}
                    />
                </div>
            ))}
        </div>
    );
};

export default FloatingOrb;
