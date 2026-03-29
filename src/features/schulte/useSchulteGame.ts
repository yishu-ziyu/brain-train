import { useState, useCallback } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { addRecord, getBestRecord, type GameRecord } from '../../services/storageService';

export type GameStatus = 'idle' | 'playing' | 'won';
export type GridSize = 3 | 5 | 7;

interface UseSchulteGameProps {
    size?: GridSize;
}

export const useSchulteGame = ({ size: initialSize = 5 }: UseSchulteGameProps = {}) => {
    const [gridSize, setGridSize] = useState<GridSize>(initialSize);
    const [grid, setGrid] = useState<number[]>([]);
    const [nextExpected, setNextExpected] = useState<number>(1);
    const [status, setStatus] = useState<GameStatus>('idle');
    const [lastWrongClick, setLastWrongClick] = useState<number | null>(null);
    const [lastRecord, setLastRecord] = useState<GameRecord | null>(null);
    const [bestRecord, setBestRecord] = useState<GameRecord | null>(null);

    const { time, timeRef, start: startTimer, pause: pauseTimer, reset: resetTimer, formatTime } = useTimer();

    const generateGrid = useCallback((s: number) => {
        const total = s * s;
        const numbers = Array.from({ length: total }, (_, i) => i + 1);
        // Fisher-Yates shuffle
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setGrid(numbers);
    }, []);

    const startGame = useCallback((newSize?: GridSize) => {
        const s = newSize ?? gridSize;
        if (newSize) setGridSize(newSize);
        generateGrid(s);
        setNextExpected(1);
        setStatus('playing');
        setLastWrongClick(null);
        setLastRecord(null);
        resetTimer();
        startTimer();

        // Load best for this difficulty
        setBestRecord(getBestRecord('schulte', `${s}x${s}`));
    }, [gridSize, generateGrid, resetTimer, startTimer]);

    const handleCellClick = useCallback((number: number) => {
        if (status !== 'playing') return;

        if (number === nextExpected) {
            const newNext = nextExpected + 1;
            setNextExpected(newNext);

            const maxNumber = gridSize * gridSize;
            if (newNext > maxNumber) {
                setStatus('won');
                pauseTimer();
                const finalTime = timeRef.current;
                const record = addRecord('schulte', finalTime, `${gridSize}x${gridSize}`);
                setLastRecord(record);
                setBestRecord(getBestRecord('schulte', `${gridSize}x${gridSize}`));
            }
        } else {
            setLastWrongClick(number);
            setTimeout(() => setLastWrongClick(null), 300);
        }
    }, [status, nextExpected, gridSize, pauseTimer, timeRef]);

    return {
        grid,
        gridSize,
        status,
        nextExpected,
        time,
        formatTime,
        startGame,
        handleCellClick,
        lastWrongClick,
        lastRecord,
        bestRecord,
    };
};
