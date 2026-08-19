"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    useEffect(() => {

    }, [theme]);

    return (
        <button
            onClick={() => {
                setTheme((theme === "dark") ? "light" : "dark");
            }}
            className="cursor-pointer border-gray-200 text-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            {
                theme === "dark" ?
                    <Sun className="text-[var(--text-color)]" size={18} /> :
                    <Moon size={18} className="text-[var(--text-color)]" />
            }
        </button>
    );
}
