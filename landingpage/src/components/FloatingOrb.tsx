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
    color = '#ffffff',
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

        const threeColor = new THREE.Color(color);

        // Minimal Orb - More of a "dot" for luxury
        const orbGeometry = new THREE.SphereGeometry(size * 0.5, 32, 32);
        const orbMaterial = new THREE.MeshBasicMaterial({
            color: threeColor,
            transparent: true,
            opacity: 0.8
        });
        const orb = new THREE.Mesh(orbGeometry, orbMaterial);
        scene.add(orb);
        objectsRef.current.orb = orb;

        // Subtler glows
        const glows: THREE.Mesh[] = [];
        for (let i = 1; i <= 3; i++) {
            const glowGeometry = new THREE.SphereGeometry(size * 0.5 + i * 0.5, 32, 32);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: threeColor,
                transparent: true,
                opacity: 0.05 / i,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            scene.add(glow);
            glows.push(glow);
        }
        objectsRef.current.glows = glows;

        // Thin particle ring
        const particleCount = 40;
        const ringGeometry = new THREE.BufferGeometry();
        const ringPositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = size * 0.5 + 1.2;
            ringPositions[i * 3] = Math.cos(angle) * radius;
            ringPositions[i * 3 + 1] = Math.sin(angle) * radius;
            ringPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
        }

        ringGeometry.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
        const ringMaterial = new THREE.PointsMaterial({
            color: threeColor,
            size: 0.02,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });
        const ring = new THREE.Points(ringGeometry, ringMaterial);
        scene.add(ring);
        objectsRef.current.ring = ring;

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            timeRef.current += 0.01 * pulseSpeed;
            frameCountRef.current++;

            if (frameCountRef.current % 2 === 0) {
                const pulse = 1 + Math.sin(timeRef.current * 1.5) * 0.05;
                orb.scale.set(pulse, pulse, pulse);
                ring.rotation.z += 0.002;
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
            if (objectsRef.current.orb) {
                objectsRef.current.orb.geometry.dispose();
                (objectsRef.current.orb.material as THREE.Material).dispose();
            }
            objectsRef.current.glows.forEach(glow => {
                glow.geometry.dispose();
                (Array.isArray(glow.material) ? glow.material : [glow.material]).forEach(m => m.dispose());
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
            }}
            aria-hidden="true"
        />
    );
};

// Batched floating orbs for background - optimized to use monochromatic luxury palette
interface OrbFieldProps {
    count?: number;
    className?: string;
}

export const OrbField: React.FC<OrbFieldProps> = ({ count = 3, className = '' }) => {
    const orbs = Array.from({ length: count }, (_, i) => ({
        id: i,
        color: ['#ffffff', '#a1a1aa', '#71717a'][i % 3],
        size: 0.4 + Math.random() * 0.6,
        position: {
            x: Math.random() * 100,
            y: Math.random() * 100
        },
        pulseSpeed: 0.4 + Math.random() * 0.6
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
