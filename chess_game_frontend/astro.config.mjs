/* @ts-check */
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    server: {
        host: '0.0.0.0',
        allowedHosts: ['.kavia.ai'],
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    }
})
