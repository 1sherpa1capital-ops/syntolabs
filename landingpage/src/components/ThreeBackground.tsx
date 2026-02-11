import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { throttle } from './threeUtils';

interface ThreeBackgroundProps {
    variant?: 'particles' | 'waves' | 'network';
    intensity?: number;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
    variant = 'particles',
    intensity = 1
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const objectsRef = useRef<{
        particles: THREE.Points | null;
        mesh: THREE.Mesh | null;
        nodes: THREE.Mesh[];
        lines: THREE.Line[];
    }>({
        particles: null,
        mesh: null,
        nodes: [],
        lines: []
    });
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetMouseRef = useRef({ x: 0, y: 0 });
    const frameCountRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 30;
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

        let particles: THREE.Points;
        let mesh: THREE.Mesh | null = null;
        let nodes: THREE.Mesh[] = [];
        let lines: THREE.Line[] = [];

        if (variant === 'particles') {
            const count = Math.floor(1000 * intensity); // Reduced from 2000
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            const color1 = new THREE.Color(0xf97316); // Orange
            const color2 = new THREE.Color(0x22c55e); // Green

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const radius = Math.random() * 40;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;

                positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i3 + 1] = (Math.random() - 0.5) * 20;
                positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

                const mixedColor = color1.clone().lerp(color2, Math.random());
                colors[i3] = mixedColor.r;
                colors[i3 + 1] = mixedColor.g;
                colors[i3 + 2] = mixedColor.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.1,
                vertexColors: true,
                transparent: true,
                opacity: 0.6,
                blending: THREE.AdditiveBlending
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);
            objectsRef.current.particles = particles;

            const animate = () => {
                animationIdRef.current = requestAnimationFrame(animate);
                frameCountRef.current++;

                // Only update every 2nd frame
                if (frameCountRef.current % 2 !== 0) return;

                targetMouseRef.current.x += (mouseRef.current.x - targetMouseRef.current.x) * 0.03;
                targetMouseRef.current.y += (mouseRef.current.y - targetMouseRef.current.y) * 0.03;

                particles.rotation.y += 0.0003;
                particles.rotation.x = targetMouseRef.current.y * 0.05;
                particles.rotation.z = targetMouseRef.current.x * 0.05;

                renderer.render(scene, camera);
            };

            animate();
        } else if (variant === 'waves') {
            const count = 50; // Reduced from 100
            const geometry = new THREE.PlaneGeometry(50, 50, count - 1, count - 1);
            const material = new THREE.MeshBasicMaterial({
                color: 0xf97316,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });

            mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = -Math.PI / 3;
            scene.add(mesh);
            objectsRef.current.mesh = mesh;

            const positions = geometry.attributes.position.array as Float32Array;
            const originalPositions = new Float32Array(positions);

            let time = 0;
            const animate = () => {
                animationIdRef.current = requestAnimationFrame(animate);
                time += 0.016;
                frameCountRef.current++;

                // Only update every 2nd frame
                if (frameCountRef.current % 2 !== 0) return;

                for (let i = 0; i < count * count; i++) {
                    const i3 = i * 3;
                    const x = originalPositions[i3];
                    const y = originalPositions[i3 + 1];
                    positions[i3 + 2] =
                        Math.sin(x * 0.2 + time) * 2 +
                        Math.cos(y * 0.15 + time) * 2;
                }

                geometry.attributes.position.needsUpdate = true;

                targetMouseRef.current.x += (mouseRef.current.x - targetMouseRef.current.x) * 0.03;
                targetMouseRef.current.y += (mouseRef.current.y - targetMouseRef.current.y) * 0.03;

                mesh!.rotation.z = targetMouseRef.current.x * 0.1;
                mesh!.rotation.x = -Math.PI / 3 + targetMouseRef.current.y * 0.1;

                renderer.render(scene, camera);
            };

            animate();
        } else if (variant === 'network') {
            const nodeCount = 30; // Reduced from 50
            const nodePositions: THREE.Vector3[] = [];
            lines = [];
            nodes = [];

            // Create nodes
            const nodeGeometry = new THREE.SphereGeometry(0.15, 8, 8);
            const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf97316 });

            for (let i = 0; i < nodeCount; i++) {
                const node = new THREE.Vector3(
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 20
                );
                nodePositions.push(node);

                const mesh = new THREE.Mesh(nodeGeometry.clone(), nodeMaterial.clone());
                mesh.position.copy(node);
                scene.add(mesh);
                nodes.push(mesh);
            }

            objectsRef.current.nodes = nodes;

            // Create connections
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0xf97316,
                transparent: true,
                opacity: 0.2
            });

            for (let i = 0; i < nodeCount; i++) {
                for (let j = i + 1; j < nodeCount; j++) {
                    const distance = nodePositions[i].distanceTo(nodePositions[j]);
                    if (distance < 8) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            nodePositions[i],
                            nodePositions[j]
                        ]);
                        const line = new THREE.Line(geometry, lineMaterial.clone());
                        lines.push(line);
                        scene.add(line);
                    }
                }
            }

            objectsRef.current.lines = lines;

            // Animate
            let time = 0;
            const animate = () => {
                animationIdRef.current = requestAnimationFrame(animate);
                time += 0.016;
                frameCountRef.current++;

                // Only update every 2nd frame
                if (frameCountRef.current % 2 !== 0) return;

                nodePositions.forEach((node, i) => {
                    node.y += Math.sin(time * 0.5 + i * 0.5) * 0.01;
                    nodes[i].position.copy(node);
                });

                // Update lines
                let lineIndex = 0;
                for (let i = 0; i < nodeCount; i++) {
                    for (let j = i + 1; j < nodeCount; j++) {
                        const distance = nodePositions[i].distanceTo(nodePositions[j]);
                        if (distance < 8 && lineIndex < lines.length) {
                            const line = lines[lineIndex];
                            const positions = line.geometry.attributes.position.array as Float32Array;
                            positions[0] = nodePositions[i].x;
                            positions[1] = nodePositions[i].y;
                            positions[2] = nodePositions[i].z;
                            positions[3] = nodePositions[j].x;
                            positions[4] = nodePositions[j].y;
                            positions[5] = nodePositions[j].z;
                            line.geometry.attributes.position.needsUpdate = true;
                            const mat = Array.isArray(line.material) ? line.material[0] : line.material;
                            mat.opacity = 1 - distance / 8;
                            lineIndex++;
                        }
                    }
                }

                targetMouseRef.current.x += (mouseRef.current.x - targetMouseRef.current.x) * 0.03;
                targetMouseRef.current.y += (mouseRef.current.y - targetMouseRef.current.y) * 0.03;

                camera.position.x = targetMouseRef.current.x * 2;
                camera.position.y = targetMouseRef.current.y * 2;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
            };

            animate();
        }

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

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && rendererRef.current?.domElement) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }

            // Dispose geometries and materials
            if (objectsRef.current.particles) {
                objectsRef.current.particles.geometry.dispose();
                (objectsRef.current.particles.material as THREE.Material).dispose();
            }

            if (objectsRef.current.mesh) {
                objectsRef.current.mesh.geometry.dispose();
                (objectsRef.current.mesh.material as THREE.Material).dispose();
            }

            objectsRef.current.nodes.forEach(node => {
                if (node.geometry) node.geometry.dispose();
                if (node.material) {
                    if (Array.isArray(node.material)) {
                        node.material.forEach(m => m.dispose());
                    } else {
                        node.material.dispose();
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

            rendererRef.current?.dispose();
        };
    }, [variant, intensity]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
        />
    );
};

export default ThreeBackground;
