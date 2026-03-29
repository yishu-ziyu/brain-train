import React from 'react';
import { useReactionGame } from './useReactionGame';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nContext';

export const ReactionGame: React.FC = () => {
  const { t } = useI18n();
  const {
    status,
    round,
    currentTime,
    average,
    best,
    totalRounds,
    times,
    startGame,
    handleClick,
    nextRound,
    bestRecord,
  } = useReactionGame();

  if (status === 'idle') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: 'var(--spacing-4)' }}>{t.reactionTitle}</h2>
          <p style={{ marginBottom: 'var(--spacing-6)', color: 'var(--color-text-secondary)' }}>
            {t.reactionInstruction}
          </p>
          <Button variant="primary" size="lg" onClick={startGame} fullWidth>
            {t.startChallenge}
          </Button>
          {bestRecord && (
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-3)' }}>
              {t.personalBest}: <span style={{ color: 'var(--color-accent-success)', fontWeight: 'bold' }}>{bestRecord.score} {t.reactionResult}</span>
            </div>
          )}
        </Card>
      </div>
    );
  }

  if (status === 'waiting' || status === 'ready' || status === 'tooEarly') {
    const bgColor = status === 'ready'
      ? 'var(--color-accent-success)'
      : status === 'tooEarly'
        ? 'var(--color-accent-danger)'
        : 'var(--color-accent-warning)';

    const text = status === 'ready'
      ? t.reactionClick
      : status === 'tooEarly'
        ? t.reactionTooEarly
        : t.reactionWait;

    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
          {t.reactionRound} {round} / {totalRounds}
        </div>
        <div
          onClick={handleClick}
          style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            height: '300px',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: bgColor,
            transition: 'background-color 0.15s',
            userSelect: 'none',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'bold',
            color: '#fff',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            {text}
          </span>
        </div>
      </div>
    );
  }

  if (status === 'clicked') {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>
            {t.reactionRound} {round} / {totalRounds}
          </div>
          <div style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 'bold',
            fontFamily: 'var(--font-family-mono)',
            color: currentTime && currentTime < 250 ? 'var(--color-accent-success)' : 'var(--color-text-accent)',
            marginBottom: 'var(--spacing-2)',
          }}>
            {currentTime} <span style={{ fontSize: 'var(--font-size-lg)' }}>{t.reactionResult}</span>
          </div>
          <Button variant="primary" size="lg" onClick={nextRound} fullWidth>
            {t.memoryNext} →
          </Button>
        </Card>
      </div>
    );
  }

  // Done - show results
  return (
    <div className="animate-fade-in" style={{ textAlign: 'center' }}>
      <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--color-accent-primary)', marginBottom: 'var(--spacing-4)' }}>
          {t.reactionDone}
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-8)',
          marginBottom: 'var(--spacing-6)',
        }}>
          <div>
            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold', fontFamily: 'var(--font-family-mono)', color: 'var(--color-text-accent)' }}>
              {average}
            </div>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{t.reactionAverage}</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold', fontFamily: 'var(--font-family-mono)', color: 'var(--color-accent-success)' }}>
              {best}
            </div>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{t.reactionBest}</div>
          </div>
        </div>

        {/* Individual rounds */}
        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          {times.map((time, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 'var(--spacing-2) var(--spacing-3)',
              borderBottom: '1px solid var(--color-glass-border)',
              fontSize: 'var(--font-size-sm)',
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>#{i + 1}</span>
              <span style={{
                fontFamily: 'var(--font-family-mono)',
                fontWeight: 'bold',
                color: time === best ? 'var(--color-accent-success)' : 'var(--color-text-primary)',
              }}>
                {time} {t.reactionResult}
                {time === best && ' ⚡'}
              </span>
            </div>
          ))}
        </div>

        {bestRecord && (
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
            {t.personalBest}: {bestRecord.score} {t.reactionResult}
          </div>
        )}

        <Button variant="primary" onClick={startGame} fullWidth>
          {t.playAgain}
        </Button>
      </Card>
    </div>
  );
};
