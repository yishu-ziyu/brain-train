import { useState, useCallback, useEffect } from 'react';
import { addRecord, getBestRecord, type GameRecord } from '../../services/storageService';

export type GameStatus = 'idle' | 'playing' | 'ended';
export type StroopDifficulty = 'easy' | 'normal' | 'hard';

const COLORS = [
    { name: 'RED', value: '#ef4444' },
    { name: 'BLUE', value: '#3b82f6' },
    { name: 'GREEN', value: '#22c55e' },
    { name: 'YELLOW', value: '#eab308' },
];

const DIFFICULTY_CONFIG: Record<StroopDifficulty, { duration: number; penalty: number }> = {
    easy: { duration: 30, penalty: 0 },
    normal: { duration: 30, penalty: 1 },
    hard: { duration: 20, penalty: 2 },
};

export const useStroopGame = () => {
    const [currentWord, setCurrentWord] = useState<{ text: string; color: string }>({ text: '', color: '' });
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState<GameStatus>('idle');
    const [difficulty, setDifficulty] = useState<StroopDifficulty>('normal');
    const [timeLeft, setTimeLeft] = useState(30);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [lastRecord, setLastRecord] = useState<GameRecord | null>(null);
    const [bestRecord, setBestRecord] = useState<GameRecord | null>(null);
    const [stats, setStats] = useState({ correct: 0, wrong: 0 });

    const generateChallenge = useCallback(() => {
        const textIndex = Math.floor(Math.random() * COLORS.length);
        const colorIndex = Math.floor(Math.random() * COLORS.length);
        setCurrentWord({
            text: COLORS[textIndex].name,
            color: COLORS[colorIndex].value,
        });
    }, []);

    const startGame = useCallback((diff?: StroopDifficulty) => {
        const d = diff ?? difficulty;
        if (diff) setDifficulty(diff);
        const config = DIFFICULTY_CONFIG[d];
        setScore(0);
        setTimeLeft(config.duration);
        setStatus('playing');
        setFeedback(null);
        setLastRecord(null);
        setStats({ correct: 0, wrong: 0 });
        setBestRecord(getBestRecord('stroop', d));
        generateChallenge();
    }, [difficulty, generateChallenge]);

    const endGame = useCallback(() => {
        setStatus('ended');
        // Use a callback to get the latest score
        setScore(currentScore => {
            const record = addRecord('stroop', currentScore, difficulty);
            setLastRecord(record);
            setBestRecord(getBestRecord('stroop', difficulty));
            return currentScore;
        });
    }, [difficulty]);

    useEffect(() => {
        let timer: number;
        if (status === 'playing') {
            timer = window.setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [status, endGame]);

    const handleOptionClick = useCallback((colorValue: string) => {
        if (status !== 'playing') return;

        const config = DIFFICULTY_CONFIG[difficulty];

        if (colorValue === currentWord.color) {
            setScore(s => s + 1);
            setStats(s => ({ ...s, correct: s.correct + 1 }));
            setFeedback('correct');
        } else {
            setScore(s => Math.max(0, s - config.penalty));
            setStats(s => ({ ...s, wrong: s.wrong + 1 }));
            setFeedback('wrong');
        }

        setTimeout(() => {
            setFeedback(null);
            generateChallenge();
        }, 200);
    }, [status, currentWord, difficulty, generateChallenge]);

    return {
        currentWord,
        score,
        timeLeft,
        status,
        difficulty,
        feedback,
        stats,
        lastRecord,
        bestRecord,
        startGame,
        handleOptionClick,
        COLORS,
    };
};
