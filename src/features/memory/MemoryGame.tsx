import React from 'react';
import { useMemoryGame } from './useMemoryGame';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nContext';

export const MemoryGame: React.FC = () => {
  const { t } = useI18n();
  const {
    level,
    status,
    currentNumber,
    userInput,
    setUserInput,
    maxLevel,
    startGame,
    nextLevel,
    submitAnswer,
    bestRecord,
  } = useMemoryGame();

  if (status === 'idle') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: 'var(--spacing-4)' }}>{t.memoryTitle}</h2>
          <p style={{ marginBottom: 'var(--spacing-6)', color: 'var(--color-text-secondary)' }}>
            {t.memoryInstruction}
          </p>
          <Button variant="primary" size="lg" onClick={startGame} fullWidth>
            {t.startChallenge}
          </Button>
          {bestRecord && (
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-3)' }}>
              {t.personalBest}: <span style={{ color: 'var(--color-accent-success)', fontWeight: 'bold' }}>{t.memoryLevel} {bestRecord.score}</span>
            </div>
          )}
        </Card>
      </div>
    );
  }

  if (status === 'showing') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          {t.memoryLevel} {level}
        </div>
        <Card className="glass-panel" style={{
          maxWidth: '400px',
          margin: '0 auto',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
            {t.memoryRemember}
          </div>
          <div className="animate-scale-in" style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: '900',
            fontFamily: 'var(--font-family-mono)',
            letterSpacing: '0.15em',
            color: 'var(--color-text-accent)',
            textShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
          }}>
            {currentNumber}
          </div>
        </Card>
      </div>
    );
  }

  if (status === 'input') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          {t.memoryLevel} {level}
        </div>
        <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--spacing-4)', color: 'var(--color-text-secondary)' }}>
            {t.memoryRecall}
          </div>
          <input
            type="text"
            inputMode="numeric"
            autoFocus
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.replace(/[^0-9]/g, ''))}
            onKeyDown={(e) => { if (e.key === 'Enter' && userInput) submitAnswer(); }}
            style={{
              width: '100%',
              padding: 'var(--spacing-4)',
              fontSize: 'var(--font-size-2xl)',
              fontFamily: 'var(--font-family-mono)',
              textAlign: 'center',
              letterSpacing: '0.2em',
              background: 'var(--color-bg-tertiary)',
              color: 'var(--color-text-primary)',
              border: '2px solid var(--color-glass-border)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent-primary)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--color-glass-border)'; }}
          />
          <Button
            variant="primary"
            size="lg"
            onClick={submitAnswer}
            fullWidth
            disabled={!userInput}
            style={{ marginTop: 'var(--spacing-4)' }}
          >
            {t.memorySubmit}
          </Button>
        </Card>
      </div>
    );
  }

  if (status === 'correct') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--color-accent-success)', marginBottom: 'var(--spacing-2)' }}>
            ✅ {t.memoryCorrect}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-6)' }}>
            {t.memoryLevel} {level} · {level + 2} digits
          </p>
          <Button variant="primary" size="lg" onClick={nextLevel} fullWidth>
            {t.memoryNext} →
          </Button>
        </Card>
      </div>
    );
  }

  if (status === 'wrong') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--color-accent-danger)', marginBottom: 'var(--spacing-4)' }}>
            ❌ {t.memoryWrong}
          </h2>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spacing-6)',
            marginBottom: 'var(--spacing-6)',
            fontSize: 'var(--font-size-sm)',
          }}>
            <div>
              <div style={{ color: 'var(--color-text-secondary)' }}>{t.memoryYouTyped}</div>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 'bold', color: 'var(--color-accent-danger)' }}>{userInput}</div>
            </div>
            <div>
              <div style={{ color: 'var(--color-text-secondary)' }}>{t.memoryAnswer}</div>
              <div style={{ fontFamily: 'var(--font-family-mono)', fontWeight: 'bold', color: 'var(--color-accent-success)' }}>{currentNumber}</div>
            </div>
          </div>
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-6)' }}>
            {t.memoryMaxLevel}: {maxLevel}
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
            <Button variant="primary" onClick={startGame} style={{ flex: 1 }}>
              {t.playAgain}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // done
  return null;
};
