import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
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
    color = '#ffffff',
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

        const group = new THREE.Group();
        scene.add(group);

        // Subtler monochromatic grid
        const gridHelper = new THREE.GridHelper(40, 20, 0x222222, 0x111111);
        gridHelper.position.y = 0;
        group.add(gridHelper);
        objectsRef.current.gridHelper = gridHelper;

        const barWidth = 2;
        const barGap = 1;
        const totalWidth = dataPoints.length * (barWidth + barGap);
        const startX = -totalWidth / 2 + barWidth / 2;

        const threeColor = new THREE.Color(color);
        const bars: THREE.Mesh[] = [];

        dataPoints.forEach((value, index) => {
            const barHeight = Math.max(value, 2);
            const geometry = new THREE.BoxGeometry(barWidth, barHeight, barWidth);

            const material = new THREE.MeshBasicMaterial({
                color: threeColor,
                transparent: true,
                opacity: 0.4 // More translucent for luxury
            });

            const bar = new THREE.Mesh(geometry, material);
            bar.position.x = startX + index * (barWidth + barGap);
            bar.position.y = barHeight / 2;
            bar.position.z = 0;
            bar.userData = { index, value, originalScale: 1 };

            bars.push(bar);
            group.add(bar);

            // Wireframe overlay for tech feel
            const wireGeometry = new THREE.BoxGeometry(barWidth, barHeight, barWidth);
            const wireMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.1
            });
            const wire = new THREE.Mesh(wireGeometry, wireMaterial);
            bar.add(wire);
        });

        objectsRef.current.bars = bars;

        const particleCount = 60;
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

            particlePositions[i * 3] = (Math.random() - 0.5) * 50;
            particlePositions[i * 3 + 1] = Math.random() * 30;
            particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }

        particleTargetsRef.current = particleTargets;
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.08,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        group.add(particles);
        objectsRef.current.particles = particles;

        const raycaster = new THREE.Raycaster();

        const handleMouseMove = throttle((event: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouseRef.current, camera);
            const intersects = raycaster.intersectObjects(bars);
            setHoveredIndex(intersects.length > 0 ? intersects[0].object.userData.index : -1);
        }, 16);

        containerRef.current.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            timeRef.current += 0.01;
            frameCountRef.current++;

            bars.forEach((bar, index) => {
                const isHovered = index === hoveredIndex;
                const targetScale = isHovered ? 1.05 : 1;
                bar.scale.y += (targetScale - bar.scale.y) * 0.1;
                bar.position.y = (bar.userData.value * bar.scale.y) / 2 + Math.sin(timeRef.current + index * 0.5) * 0.05;
                const mat = Array.isArray(bar.material) ? bar.material[0] : bar.material;
                mat.opacity = isHovered ? 0.6 : 0.4;
            });

            if (frameCountRef.current % 2 === 0 && objectsRef.current.particles && particleTargetsRef.current) {
                const positions = objectsRef.current.particles.geometry.attributes.position.array as Float32Array;
                const targets = particleTargetsRef.current;
                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    positions[i3] += (targets[i3] - positions[i3]) * 0.01;
                    positions[i3 + 1] += (targets[i3 + 1] - positions[i3 + 1]) * 0.01;
                    positions[i3 + 2] += (targets[i3 + 2] - positions[i3 + 2]) * 0.01;
                    positions[i3 + 1] += Math.sin(timeRef.current * 1.5 + i) * 0.005;
                }
                objectsRef.current.particles.geometry.attributes.position.needsUpdate = true;
            }

            group.rotation.y = Math.sin(timeRef.current * 0.2) * 0.03;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
            cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            containerRef.current?.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
            objectsRef.current.bars.forEach(bar => {
                if (bar.geometry) bar.geometry.dispose();
                if (bar.material) (Array.isArray(bar.material) ? bar.material : [bar.material]).forEach(m => m.dispose());
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
                className="w-full overflow-hidden"
                style={{ height }}
            />

            {hoveredIndex >= 0 && (labels?.[hoveredIndex] || dataPoints[hoveredIndex]) && (
                <div className="absolute top-4 right-4 bg-zinc-950 border border-white/10 rounded-none px-6 py-4 shadow-2xl backdrop-blur-xl animate-reveal">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">{labels?.[hoveredIndex] || 'Metric'}</div>
                    <div className="text-2xl font-black text-white">{dataPoints[hoveredIndex]}</div>
                </div>
            )}
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
    }>({
        meshes: [],
        lines: []
    });
    const timeRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        camera.position.z = 15;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
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

        // Luxury monochromatic color mapping
        const monochromaticColors = ['#ffffff', '#a1a1aa', '#71717a', '#3f3f46'];

        segments.forEach((segment, idx) => {
            const segmentAngle = (segment.value / total) * Math.PI * 2;
            const shape = new THREE.Shape();
            const outerRadius = 4.5;
            const innerRadius = 3.8;

            shape.absarc(0, 0, outerRadius, currentAngle, currentAngle + segmentAngle, false);
            shape.absarc(0, 0, innerRadius, currentAngle + segmentAngle, currentAngle, true);

            const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false });
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(monochromaticColors[idx % monochromaticColors.length]),
                transparent: true,
                opacity: 0.8
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = Math.PI / 2;
            group.add(mesh);
            meshes.push(mesh);

            const edges = new THREE.EdgesGeometry(geometry);
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
            const line = new THREE.LineSegments(edges, lineMaterial);
            line.rotation.x = Math.PI / 2;
            group.add(line);
            lines.push(line);

            currentAngle += segmentAngle;
        });

        objectsRef.current.meshes = meshes;
        objectsRef.current.lines = lines;

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            timeRef.current += 0.01;
            group.rotation.z = timeRef.current * 0.1;
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            if (containerRef.current && rendererRef.current?.domElement) containerRef.current.removeChild(rendererRef.current.domElement);
            objectsRef.current.meshes.forEach(mesh => {
                mesh.geometry.dispose();
                (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(m => m.dispose());
            });
            rendererRef.current?.dispose();
        };
    }, [segments, size]);

    return (
        <div className="flex flex-col items-center gap-12">
            <div ref={containerRef} style={{ width: size, height: size }} />
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {segments.map((segment, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{segment.label}</span>
                        <span className="text-sm font-black text-white">{segment.value}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Data3DVis;
