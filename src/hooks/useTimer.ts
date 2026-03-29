import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (initialTime: number = 0, countDirection: 'up' | 'down' = 'up') => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const timeRef = useRef(initialTime);

    const start = useCallback(() => setIsRunning(true), []);
    const pause = useCallback(() => setIsRunning(false), []);
    const reset = useCallback(() => {
        setIsRunning(false);
        setTime(initialTime);
        timeRef.current = initialTime;
    }, [initialTime]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setTime(prev => {
                    const next = countDirection === 'up' ? prev + 10 : prev - 10;
                    timeRef.current = next;
                    return next;
                });
            }, 10);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isRunning, countDirection]);

    const formatTime = useCallback((ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
    }, []);

    return { time, timeRef, isRunning, start, pause, reset, formatTime };
};
