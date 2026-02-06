import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Three.js chunk - all 3D rendering
                    'three': ['three'],
                    // GSAP chunk - animations
                    'gsap': ['gsap'],
                    // Vendor chunk - other heavy dependencies
                    'vendor': ['framer-motion'],
                },
            },
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
    },
})
