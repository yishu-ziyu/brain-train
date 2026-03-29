import { useState, useCallback } from 'react';
import { addRecord, getBestRecord, type GameRecord } from '../../services/storageService';

export type MemoryStatus = 'idle' | 'showing' | 'input' | 'correct' | 'wrong' | 'done';

export const useMemoryGame = () => {
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState<MemoryStatus>('idle');
  const [currentNumber, setCurrentNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [maxLevel, setMaxLevel] = useState(0);
  const [lastRecord, setLastRecord] = useState<GameRecord | null>(null);
  const [bestRecord, setBestRecord] = useState<GameRecord | null>(null);

  const generateNumber = useCallback((digits: number) => {
    let num = '';
    for (let i = 0; i < digits; i++) {
      num += Math.floor(Math.random() * 10).toString();
    }
    return num;
  }, []);

  const startGame = useCallback(() => {
    setLevel(1);
    setMaxLevel(0);
    setStatus('showing');
    setUserInput('');
    setLastRecord(null);
    setBestRecord(getBestRecord('memory'));

    const num = generateNumber(3); // Start with 3 digits
    setCurrentNumber(num);

    // Show number for a duration proportional to digit count
    setTimeout(() => {
      setStatus('input');
    }, 2000);
  }, [generateNumber]);

  const nextLevel = useCallback(() => {
    const newLevel = level + 1;
    setLevel(newLevel);
    setUserInput('');

    const digits = newLevel + 2; // Level 1 = 3 digits, Level 2 = 4, etc.
    const num = generateNumber(digits);
    setCurrentNumber(num);
    setStatus('showing');

    // Show time increases with digit count
    const showTime = 1000 + digits * 300;
    setTimeout(() => {
      setStatus('input');
    }, showTime);
  }, [level, generateNumber]);

  const submitAnswer = useCallback(() => {
    if (userInput === currentNumber) {
      const newMax = Math.max(maxLevel, level);
      setMaxLevel(newMax);
      setStatus('correct');
    } else {
      const finalLevel = Math.max(maxLevel, level - 1);
      setMaxLevel(finalLevel);
      setStatus('wrong');

      // Save record
      const record = addRecord('memory', level - 1, `${level + 1}-digits`);
      setLastRecord(record);
      setBestRecord(getBestRecord('memory'));
    }
  }, [userInput, currentNumber, level, maxLevel]);

  const endGame = useCallback(() => {
    const finalLevel = maxLevel;
    setStatus('done');
    if (!lastRecord) {
      const record = addRecord('memory', finalLevel, `${finalLevel + 2}-digits`);
      setLastRecord(record);
      setBestRecord(getBestRecord('memory'));
    }
  }, [maxLevel, lastRecord]);

  return {
    level,
    status,
    currentNumber,
    userInput,
    setUserInput,
    maxLevel,
    lastRecord,
    bestRecord,
    startGame,
    nextLevel,
    submitAnswer,
    endGame,
  };
};
