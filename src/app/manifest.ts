import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name": "Secret Terminal",
        "short_name": "Secret Terminal",
        "description": "A simple coin app.",
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "display": "standalone",
        "orientation": "any",
        "start_url": "/",
        "icons": [
            {
                "src": "/icon-192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/icon-512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/icon.png",
                "type": "image/png",
                "sizes": "any",
                "purpose": "any"
            }
        ]
    }
}
