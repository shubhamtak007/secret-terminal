"use client";

import { useEffect, useState } from "react";

type TerminalCursorProps = {
    size?: number;
    className?: string;
};

export default function TerminalCursor({ size = 24, className, }: TerminalCursorProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible((prev) => !prev);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M4 17L10 11L4 5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <path
                d="M12 19H20"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 300ms ease-in-out",
                }}
            />
        </svg>
    );
}