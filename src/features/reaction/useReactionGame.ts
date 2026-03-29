import { useState, useCallback, useRef } from 'react';
import { addRecord, getBestRecord, type GameRecord } from '../../services/storageService';

export type ReactionStatus = 'idle' | 'waiting' | 'ready' | 'clicked' | 'tooEarly' | 'done';

const TOTAL_ROUNDS = 5;

export const useReactionGame = () => {
  const [status, setStatus] = useState<ReactionStatus>('idle');
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [lastRecord, setLastRecord] = useState<GameRecord | null>(null);
  const [bestRecord, setBestRecord] = useState<GameRecord | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const startRound = useCallback(() => {
    setStatus('waiting');
    setCurrentTime(null);

    // Random delay between 1.5s and 4s
    const delay = 1500 + Math.random() * 2500;
    timeoutRef.current = window.setTimeout(() => {
      startTimeRef.current = performance.now();
      setStatus('ready');
    }, delay);
  }, []);

  const startGame = useCallback(() => {
    setRound(1);
    setTimes([]);
    setCurrentTime(null);
    setLastRecord(null);
    setBestRecord(getBestRecord('reaction'));
    startRound();
  }, [startRound]);

  const handleClick = useCallback(() => {
    if (status === 'waiting') {
      // Clicked too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setStatus('tooEarly');
      return;
    }

    if (status === 'ready') {
      const reactionTime = Math.round(performance.now() - startTimeRef.current);
      setCurrentTime(reactionTime);

      const newTimes = [...times, reactionTime];
      setTimes(newTimes);

      if (round >= TOTAL_ROUNDS) {
        // All rounds done
        const avg = Math.round(newTimes.reduce((a, b) => a + b, 0) / newTimes.length);
        const record = addRecord('reaction', avg, `${TOTAL_ROUNDS}-rounds`);
        setLastRecord(record);
        setBestRecord(getBestRecord('reaction'));
        setStatus('done');
      } else {
        setStatus('clicked');
      }
    }

    if (status === 'tooEarly') {
      startRound();
    }
  }, [status, times, round, startRound]);

  const nextRound = useCallback(() => {
    setRound(r => r + 1);
    startRound();
  }, [startRound]);

  const average = times.length > 0
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : 0;

  const best = times.length > 0 ? Math.min(...times) : 0;

  return {
    status,
    round,
    times,
    currentTime,
    average,
    best,
    totalRounds: TOTAL_ROUNDS,
    lastRecord,
    bestRecord,
    startGame,
    handleClick,
    nextRound,
  };
};
