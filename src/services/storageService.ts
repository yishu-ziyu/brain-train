export interface GameRecord {
  id: string;
  game: 'schulte' | 'stroop';
  score: number; // Schulte: timeMs, Stroop: points
  difficulty: string; // e.g. '5x5', '30s-4colors'
  timestamp: number;
}

const STORAGE_KEY = 'brain-lab-records';

function getRecords(): GameRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecords(records: GameRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function addRecord(
  game: GameRecord['game'],
  score: number,
  difficulty: string
): GameRecord {
  const record: GameRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    game,
    score,
    difficulty,
    timestamp: Date.now(),
  };
  const records = getRecords();
  records.push(record);
  saveRecords(records);
  return record;
}

export function getGameRecords(game: GameRecord['game']): GameRecord[] {
  return getRecords()
    .filter((r) => r.game === game)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function getBestRecord(
  game: GameRecord['game'],
  difficulty?: string
): GameRecord | null {
  const records = getRecords().filter(
    (r) => r.game === game && (!difficulty || r.difficulty === difficulty)
  );
  if (records.length === 0) return null;

  if (game === 'schulte') {
    // Lower time is better
    return records.reduce((best, r) => (r.score < best.score ? r : best));
  }
  // Higher score is better
  return records.reduce((best, r) => (r.score > best.score ? r : best));
}

export function getRecentRecords(limit: number = 20): GameRecord[] {
  return getRecords()
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

export function getStreak(): { current: number; lastDate: string | null } {
  const records = getRecords();
  if (records.length === 0) return { current: 0, lastDate: null };

  // Get unique training dates
  const dates = [
    ...new Set(
      records.map((r) => new Date(r.timestamp).toISOString().slice(0, 10))
    ),
  ].sort((a, b) => b.localeCompare(a)); // desc

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Streak must include today or yesterday
  if (dates[0] !== today && dates[0] !== yesterday) {
    return { current: 0, lastDate: dates[0] };
  }

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diffDays =
      (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diffDays) === 1) {
      streak++;
    } else {
      break;
    }
  }

  return { current: streak, lastDate: dates[0] };
}
