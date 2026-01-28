import * as THREE from '../../node_modules/@types/three';

// Shared WebGL renderer manager to prevent multiple contexts
class SharedRendererManager {
    private static instance: SharedRendererManager;
    private sharedRenderer: THREE.WebGLRenderer | null = null;
    private activeScenes = new Set<string>();
    private resizeHandlers: Map<string, () => void> = new Map();

    private constructor() {}

    static getInstance(): SharedRendererManager {
        if (!SharedRendererManager.instance) {
            SharedRendererManager.instance = new SharedRendererManager();
        }
        return SharedRendererManager.instance;
    }

    getRenderer(): THREE.WebGLRenderer {
        if (!this.sharedRenderer) {
            this.sharedRenderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
            });
            this.sharedRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.setupGlobalResize();
        }
        return this.sharedRenderer;
    }

    registerScene(sceneId: string, resizeHandler: () => void): void {
        this.activeScenes.add(sceneId);
        this.resizeHandlers.set(sceneId, resizeHandler);
    }

    unregisterScene(sceneId: string): void {
        this.activeScenes.delete(sceneId);
        this.resizeHandlers.delete(sceneId);
    }

    private setupGlobalResize(): void {
        window.addEventListener('resize', () => {
            this.resizeHandlers.forEach(handler => handler());
        });
    }

    dispose(): void {
        if (this.sharedRenderer && this.activeScenes.size === 0) {
            this.sharedRenderer.dispose();
            this.sharedRenderer = null;
        }
    }
}

// Throttle utility for mouse events
export function throttle<T extends (...args: any[]) => void>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return function (...args: Parameters<T>) {
        if (!inThrottle) {
            func.apply(null, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Resource disposal helper
export function disposeThreeObject(obj: THREE.Object3D | null): void {
    if (!obj) return;

    obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.dispose());
                } else {
                    child.material.dispose();
                }
            }
        } else if (child instanceof THREE.Points) {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.dispose());
                } else {
                    child.material.dispose();
                }
            }
        } else if (child instanceof THREE.Line) {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.dispose());
                } else {
                    child.material.dispose();
                }
            }
        }
    });
}

export const sharedRendererManager = SharedRendererManager.getInstance();
export default sharedRendererManager;
