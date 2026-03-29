import React from 'react';
import { useSchulteGame, type GridSize } from './useSchulteGame';
import { Grid } from '../../components/ui/Grid';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nContext';

const SIZES: { value: GridSize; label: string }[] = [
    { value: 3, label: '3×3' },
    { value: 5, label: '5×5' },
    { value: 7, label: '7×7' },
];

export const SchulteGrid: React.FC = () => {
    const { t } = useI18n();
    const {
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
    } = useSchulteGame({ size: 5 });

    if (status === 'idle') {
        return (
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-4)' }}>{t.schulteTitle}</h2>
                    <p style={{ marginBottom: 'var(--spacing-6)', color: 'var(--color-text-secondary)' }}>
                        {t.schulteInstruction}
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
                        {SIZES.map(({ value, label }) => (
                            <Button
                                key={value}
                                variant="primary"
                                size="lg"
                                onClick={() => startGame(value)}
                                style={{ flex: 1 }}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                    {bestRecord && (
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-2)' }}>
                            {t.personalBest} ({gridSize}×{gridSize}): <span style={{ color: 'var(--color-accent-success)', fontWeight: 'bold' }}>{formatTime(bestRecord.score)}s</span>
                        </div>
                    )}
                </Card>
            </div>
        );
    }

    if (status === 'won') {
        const isNewBest = bestRecord && lastRecord && bestRecord.id === lastRecord.id;
        return (
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    {isNewBest && (
                        <div style={{
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'bold',
                            color: 'var(--color-accent-warning)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: 'var(--spacing-2)',
                        }}>
                            {t.newPersonalBest}
                        </div>
                    )}
                    <h2 style={{ color: 'var(--color-accent-success)', marginBottom: 'var(--spacing-2)' }}>{t.schulteExcellent}</h2>
                    <p style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>
                        {formatTime(time)}s
                    </p>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-6)' }}>
                        {t.schulteGrid}: {gridSize}×{gridSize}
                        {bestRecord && !isNewBest && (
                            <> · {t.schulteBest}: <span style={{ color: 'var(--color-accent-success)' }}>{formatTime(bestRecord.score)}s</span></>
                        )}
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                        <Button variant="primary" onClick={() => startGame()} style={{ flex: 1 }}>
                            {t.playAgain}
                        </Button>
                        <Button variant="ghost" onClick={() => startGame(gridSize === 7 ? 3 : gridSize === 5 ? 7 : 5 as GridSize)} style={{ flex: 1 }}>
                            {t.schulteTry} {gridSize === 7 ? '3×3' : gridSize === 5 ? '7×7' : '5×5'}
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="schulte-game animate-scale-in" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-4)',
                padding: '0 var(--spacing-2)'
            }}>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>
                    {t.schulteFind}: <span style={{ color: 'var(--color-accent-primary)' }}>{nextExpected}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-text-accent)' }}>
                    {formatTime(time)}
                </div>
            </div>

            <Grid columns={gridSize} gap={gridSize >= 7 ? 'sm' : 'md'}>
                {grid.map((number) => {
                    const isWrong = lastWrongClick === number;
                    const isFound = number < nextExpected;
                    const cellFontSize = gridSize >= 7 ? 'var(--font-size-base)' : 'var(--font-size-xl)';

                    return (
                        <button
                            key={number}
                            onClick={() => handleCellClick(number)}
                            className={isWrong ? 'animate-shake' : ''}
                            style={{
                                aspectRatio: '1',
                                background: isFound
                                    ? 'rgba(14, 165, 233, 0.1)'
                                    : 'var(--color-bg-secondary)',
                                color: isFound
                                    ? 'var(--color-accent-primary)'
                                    : 'var(--color-text-primary)',
                                border: isFound
                                    ? '1px solid var(--color-accent-primary)'
                                    : '1px solid var(--color-glass-border)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: cellFontSize,
                                fontWeight: 'bold',
                                cursor: isFound ? 'default' : 'pointer',
                                transition: 'all 0.1s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: isFound ? 0.4 : 1,
                            }}
                        >
                            {number}
                        </button>
                    );
                })}
            </Grid>
        </div>
    );
};
