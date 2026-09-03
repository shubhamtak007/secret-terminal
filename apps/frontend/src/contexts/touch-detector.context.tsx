"use client";

import { createContext, useContext, ReactNode, useState, SetStateAction, Dispatch, useEffect } from 'react';

type TouchDetectorContextProviderProps = {
    children: ReactNode
}

type TouchDetectorContextType = {
    isTouch: boolean,
    setIsTouch: Dispatch<SetStateAction<boolean>>
}

const TouchDetectorContext = createContext<TouchDetectorContextType | undefined>(undefined);

const TouchDetectorContextProvider = ({ children }: TouchDetectorContextProviderProps) => {
    const [isTouch, setIsTouch] = useState<boolean>(false);

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            setIsTouch(event.pointerType === 'touch');
        };

        window.addEventListener('pointermove', handlePointerMove);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, []);

    return (
        <TouchDetectorContext.Provider
            value={{ isTouch, setIsTouch }}
        >
            {children}
        </TouchDetectorContext.Provider>
    );
}

const useTouchDetector = (): TouchDetectorContextType => {
    const context = useContext(TouchDetectorContext);

    if (!context) {
        throw new Error('useTouchDetector must be in TouchDetectorContextProvider');
    }

    return context;
}

export { TouchDetectorContextProvider, useTouchDetector }