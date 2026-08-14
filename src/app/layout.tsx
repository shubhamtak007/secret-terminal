import type { Metadata } from "next";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/src/components/ui/sonner';

const inter = Inter({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ["latin"],
    display: 'swap'
});

export const metadata: Metadata = {
    title: "Secret Terminal",
    description: "A simple coin app."
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-title" content="Secret Terminal" />
            </head>

            <body className={`${inter.className}`}>
                {children}
                <Toaster />
                <Analytics />
            </body>
        </html>
    );
}
