import React, { useRef, useEffect, useState } from 'react';
import * as THREE from '../../node_modules/@types/three';
import { throttle } from './threeUtils';

interface Data3DVisProps {
    dataPoints: number[];
    labels?: string[];
    color?: string;
    height?: string;
}

const Data3DVis: React.FC<Data3DVisProps> = ({
    dataPoints,
    labels,
    color = '#6366f1',
    height = '300px'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | -1>(-1);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const objectsRef = useRef<{
        bars: THREE.Mesh[];
        particles: THREE.Points | null;
        gridHelper: THREE.GridHelper | null;
    }>({
        bars: [],
        particles: null,
        gridHelper: null
    });
    const mouseRef = useRef(new THREE.Vector2());
    const timeRef = useRef(0);
    const frameCountRef = useRef(0);
    const particleTargetsRef = useRef<Float32Array | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(60, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        camera.position.set(0, 15, 30);
        camera.lookAt(0, 5, 0);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Group to hold all elements
        const group = new THREE.Group();
        scene.add(group);

        // Grid floor
        const gridHelper = new THREE.GridHelper(40, 20, 0x444444, 0x222222);
        gridHelper.position.y = 0;
        group.add(gridHelper);
        objectsRef.current.gridHelper = gridHelper;

        // Create bars
        const barWidth = 2;
        const barGap = 1;
        const totalWidth = dataPoints.length * (barWidth + barGap);
        const startX = -totalWidth / 2 + barWidth / 2;

        const threeColor = new THREE.Color(color);
        const bars: THREE.Mesh[] = [];

        dataPoints.forEach((value, index) => {
            const barHeight = Math.max(value, 2);
            const geometry = new THREE.BoxGeometry(barWidth, barHeight, barWidth);

            // Gradient effect using vertex colors
            const material = new THREE.MeshBasicMaterial({
                color: threeColor,
                transparent: true,
                opacity: 0.8
            });

            const bar = new THREE.Mesh(geometry, material);
            bar.position.x = startX + index * (barWidth + barGap);
            bar.position.y = barHeight / 2;
            bar.position.z = 0;
            bar.userData = { index, value, originalScale: 1 };

            bars.push(bar);
            group.add(bar);

            // Add glow effect
            const glowGeometry = new THREE.BoxGeometry(barWidth + 0.2, barHeight + 0.2, barWidth + 0.2);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: threeColor,
                transparent: true,
                opacity: 0.2,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.position.copy(bar.position);
            bar.add(glow);
        });

        objectsRef.current.bars = bars;

        // Floating particles above bars
        const particleCount = 100; // Reduced from 200
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleTargets = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const barIndex = Math.floor(Math.random() * dataPoints.length);
            const bar = bars[barIndex];
            const barHeight = bar.userData.value;

            particleTargets[i * 3] = bar.position.x + (Math.random() - 0.5) * barWidth;
            particleTargets[i * 3 + 1] = barHeight + Math.random() * 5 + 2;
            particleTargets[i * 3 + 2] = (Math.random() - 0.5) * barWidth;

            // Start from random positions
            particlePositions[i * 3] = (Math.random() - 0.5) * 50;
            particlePositions[i * 3 + 1] = Math.random() * 30;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }

        particleTargetsRef.current = particleTargets;
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: threeColor,
            size: 0.15,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        group.add(particles);
        objectsRef.current.particles = particles;

        // Raycaster for hover detection
        const raycaster = new THREE.Raycaster();

        const handleMouseMove = throttle((event: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouseRef.current, camera);
            const intersects = raycaster.intersectObjects(bars);

            if (intersects.length > 0) {
                const index = intersects[0].object.userData.index;
                setHoveredIndex(index);
            } else {
                setHoveredIndex(-1);
            }
        }, 16);

        containerRef.current.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            timeRef.current += 0.01;
            frameCountRef.current++;

            // Animate bars
            bars.forEach((bar, index) => {
                const isHovered = index === hoveredIndex;
                const targetScale = isHovered ? 1.1 : 1;
                bar.scale.y += (targetScale - bar.scale.y) * 0.1;

                // Gentle float
                bar.position.y = (bar.userData.value * bar.scale.y) / 2 + Math.sin(timeRef.current + index * 0.5) * 0.1;
            });

            // Animate particles - only every 2nd frame
            if (frameCountRef.current % 2 === 0 && objectsRef.current.particles && particleTargetsRef.current) {
                const positions = objectsRef.current.particles.geometry.attributes.position.array as Float32Array;
                const targets = particleTargetsRef.current;
                
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    positions[i3] += (targets[i3] - positions[i3]) * 0.02;
                    positions[i3 + 1] += (targets[i3 + 1] - positions[i3 + 1]) * 0.02;
                    positions[i3 + 2] += (targets[i3 + 2] - positions[i3 + 2]) * 0.02;

                    // Add wave motion
                    positions[i3 + 1] += Math.sin(timeRef.current * 2 + i * 0.1) * 0.01;
                }
                objectsRef.current.particles.geometry.attributes.position.needsUpdate = true;
            }

            // Gentle rotation
            group.rotation.y = Math.sin(timeRef.current * 0.3) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
            cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            containerRef.current?.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            // Dispose all geometries and materials
            objectsRef.current.bars.forEach(bar => {
                if (bar.geometry) bar.geometry.dispose();
                if (bar.material) {
                    if (Array.isArray(bar.material)) {
                        bar.material.forEach(m => m.dispose());
                    } else {
                        bar.material.dispose();
                    }
                }
                // Dispose glow children
                bar.children.forEach(child => {
                    if (child instanceof THREE.Mesh) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(m => m.dispose());
                            } else {
                                child.material.dispose();
                            }
                        }
                    }
                });
            });

            if (objectsRef.current.particles) {
                objectsRef.current.particles.geometry.dispose();
                (objectsRef.current.particles.material as THREE.Material).dispose();
            }

            if (objectsRef.current.gridHelper) {
                objectsRef.current.gridHelper.geometry.dispose();
                (objectsRef.current.gridHelper.material as THREE.Material).dispose();
            }

            rendererRef.current?.dispose();
        };
    }, [dataPoints, color, hoveredIndex]);

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="w-full rounded-xl overflow-hidden"
                style={{ height }}
            />

            {/* Tooltip */}
            {hoveredIndex >= 0 && (
                <div className="absolute top-4 right-4 bg-surface-elevated border border-border-subtle rounded-lg px-4 py-2 shadow-lg">
                    <div className="text-xs text-text-muted">{labels?.[hoveredIndex] || `Data Point ${hoveredIndex + 1}`}</div>
                    <div className="text-xl font-bold text-primary">{dataPoints[hoveredIndex]}</div>
                </div>
            )}

            {/* Labels */}
            <div className="flex justify-between mt-4 px-2">
                {labels?.map((label, index) => (
                    <div
                        key={index}
                        className={`text-xs text-center transition-all ${
                            index === hoveredIndex ? 'text-accent font-bold scale-110' : 'text-text-muted'
                        }`}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Ring chart component
interface Ring3DChartProps {
    segments: Array<{ label: string; value: number; color: string }>;
    size?: number;
}

export const Ring3DChart: React.FC<Ring3DChartProps> = ({ segments, size = 200 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const objectsRef = useRef<{
        meshes: THREE.Mesh[];
        lines: THREE.LineSegments[];
        centerGlow: THREE.Mesh | null;
    }>({
        meshes: [],
        lines: [],
        centerGlow: null
    });
    const timeRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.z = 15;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const group = new THREE.Group();
        scene.add(group);

        const total = segments.reduce((sum, s) => sum + s.value, 0);
        let currentAngle = 0;

        const meshes: THREE.Mesh[] = [];
        const lines: THREE.LineSegments[] = [];

        segments.forEach((segment) => {
            const segmentAngle = (segment.value / total) * Math.PI * 2;

            // Create ring segment
            const shape = new THREE.Shape();
            const outerRadius = 4;
            const innerRadius = 2.5;

            shape.absarc(0, 0, outerRadius, currentAngle, currentAngle + segmentAngle, false);
            shape.absarc(0, 0, innerRadius, currentAngle + segmentAngle, currentAngle, true);

            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: 0.5,
                bevelEnabled: false
            });

            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(segment.color),
                transparent: true,
                opacity: 0.8
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = Math.PI / 2;
            group.add(mesh);
            meshes.push(mesh);

            // Add edge highlight
            const edges = new THREE.EdgesGeometry(geometry);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
            const line = new THREE.LineSegments(edges, lineMaterial);
            line.rotation.x = Math.PI / 2;
            group.add(line);
            lines.push(line);

            currentAngle += segmentAngle;
        });

        objectsRef.current.meshes = meshes;
        objectsRef.current.lines = lines;

        // Center glow
        const centerGlow = new THREE.Mesh(
            new THREE.CircleGeometry(2, 32),
            new THREE.MeshBasicMaterial({
                color: new THREE.Color(segments[0]?.color || '#6366f1'),
                transparent: true,
                opacity: 0.3
            })
        );
        centerGlow.position.z = 0.26;
        group.add(centerGlow);
        objectsRef.current.centerGlow = centerGlow;

        // Animation
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            timeRef.current += 0.01;

            group.rotation.z = Math.sin(timeRef.current * 0.5) * 0.1;
            centerGlow.scale.setScalar(1 + Math.sin(timeRef.current * 2) * 0.05);

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

            // Dispose all geometries and materials
            objectsRef.current.meshes.forEach(mesh => {
                if (mesh.geometry) mesh.geometry.dispose();
                if (mesh.material) {
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach(m => m.dispose());
                    } else {
                        mesh.material.dispose();
                    }
                }
            });

            objectsRef.current.lines.forEach(line => {
                if (line.geometry) line.geometry.dispose();
                if (line.material) {
                    if (Array.isArray(line.material)) {
                        line.material.forEach(m => m.dispose());
                    } else {
                        line.material.dispose();
                    }
                }
            });

            if (objectsRef.current.centerGlow) {
                objectsRef.current.centerGlow.geometry.dispose();
                (objectsRef.current.centerGlow.material as THREE.Material).dispose();
            }

            rendererRef.current?.dispose();
        };
    }, [segments, size]);

    return (
        <div className="flex flex-col items-center gap-6">
            <div ref={containerRef} style={{ width: size, height: size }} />
            <div className="grid grid-cols-2 gap-4">
                {segments.map((segment, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: segment.color }}
                        />
                        <span className="text-sm text-text-muted">{segment.label}</span>
                        <span className="text-sm font-bold text-text-default">{segment.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data3DVis;
