import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Optional: Set the base path for your app if it's deployed in a subdirectory
    build: {
        outDir: 'dist', // Output directory for the build
    },
});
