import React from 'react';
import { useStroopGame, type StroopDifficulty } from './useStroopGame';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Grid } from '../../components/ui/Grid';
import { useI18n } from '../../i18n/I18nContext';

export const StroopGame: React.FC = () => {
    const { t, locale } = useI18n();
    const {
        currentWord,
        score,
        timeLeft,
        status,
        difficulty,
        feedback,
        stats,
        startGame,
        handleOptionClick,
        bestRecord,
        COLORS
    } = useStroopGame();

    const DIFFICULTIES: { value: StroopDifficulty; label: string; desc: string }[] = [
        { value: 'easy', label: t.stroopEasy, desc: t.stroopEasyDesc },
        { value: 'normal', label: t.stroopNormal, desc: t.stroopNormalDesc },
        { value: 'hard', label: t.stroopHard, desc: t.stroopHardDesc },
    ];

    if (status === 'idle') {
        return (
            <div className="animate-fade-in" style={{ textAlign: 'center' }}>
                <Card className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: 'var(--spacing-4)' }}>{t.stroopTitle}</h2>
                    <p style={{ marginBottom: 'var(--spacing-6)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                        {t.stroopInstruction} <strong style={{ color: 'var(--color-text-primary)' }}>{t.stroopTextColor}</strong>{t.stroopNotWord}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
                        {DIFFICULTIES.map(({ value, label, desc }) => (
                            <Button
                                key={value}
                                variant={value === 'normal' ? 'primary' : 'secondary'}
                                size="lg"
                                onClick={() => startGame(value)}
                                fullWidth
                            >
                                <span style={{ fontWeight: 'bold' }}>{label}</span>
                                <span style={{
                                    fontSize: 'var(--font-size-xs)',
                                    opacity: 0.7,
                                    marginLeft: 'var(--spacing-2)',
                                }}>{desc}</span>
                            </Button>
                        ))}
                    </div>
                    {bestRecord && (
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                            {t.personalBest} ({t[`stroop${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}` as keyof typeof t]}): <span style={{ color: 'var(--color-accent-success)', fontWeight: 'bold' }}>{bestRecord.score}</span>
                        </div>
                    )}
                </Card>
            </div>
        );
    }

    if (status === 'ended') {
        const accuracy = stats.correct + stats.wrong > 0
            ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
            : 0;
        const isNewBest = bestRecord && score === bestRecord.score && score > 0;

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
                    <h2 style={{ color: 'var(--color-accent-primary)', marginBottom: 'var(--spacing-2)' }}>{t.stroopTimesUp}</h2>

                    <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-4)' }}>
                        {score}
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 'var(--spacing-6)',
                        marginBottom: 'var(--spacing-6)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                    }}>
                        <div>
                            <div style={{ fontWeight: 'bold', color: 'var(--color-accent-success)' }}>{stats.correct}</div>
                            <div>{t.correct}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', color: 'var(--color-accent-danger)' }}>{stats.wrong}</div>
                            <div>{t.wrong}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', color: 'var(--color-text-accent)' }}>{accuracy}%</div>
                            <div>{t.accuracy}</div>
                        </div>
                    </div>

                    {bestRecord && !isNewBest && (
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-4)' }}>
                            {t.personalBest} ({t[`stroop${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}` as keyof typeof t]}): {bestRecord.score}
                        </div>
                    )}

                    <Button variant="primary" onClick={() => startGame()} fullWidth>
                        {t.stroopTryAgain}
                    </Button>
                </Card>
            </div>
        );
    }

    // Playing state
    const feedbackBorder = feedback === 'correct'
        ? '2px solid var(--color-accent-success)'
        : feedback === 'wrong'
            ? '2px solid var(--color-accent-danger)'
            : '2px solid transparent';

    // Need localized color names for the text display
    const mappedColorMap: Record<string, string> = {
        'RED': locale === 'zh' ? '红色' : 'RED',
        'BLUE': locale === 'zh' ? '蓝色' : 'BLUE',
        'GREEN': locale === 'zh' ? '绿色' : 'GREEN',
        'YELLOW': locale === 'zh' ? '黄色' : 'YELLOW',
    };

    return (
        <div className="stroop-game animate-scale-in" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-8)',
                padding: '0 var(--spacing-4)'
            }}>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>
                    {t.score}: <span style={{ color: 'var(--color-accent-primary)' }}>{score}</span>
                </div>
                <div style={{
                    fontFamily: 'var(--font-family-mono)',
                    color: timeLeft < 5 ? 'var(--color-accent-danger)' : 'var(--color-text-accent)',
                    fontWeight: 'bold',
                    fontSize: timeLeft < 5 ? 'var(--font-size-xl)' : 'var(--font-size-base)',
                    transition: 'all 0.2s',
                }}>
                    {timeLeft}s
                </div>
            </div>

            <Card className="glass-panel" style={{
                marginBottom: 'var(--spacing-12)',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: feedbackBorder.split(' ').pop(),
                borderWidth: '2px',
                borderStyle: 'solid',
                transition: 'border-color 0.15s',
            }}>
                <div style={{
                    fontSize: 'clamp(3rem, 10vw, 4rem)',
                    fontWeight: '900',
                    color: currentWord.color,
                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    letterSpacing: '0.05em',
                    transition: 'transform 0.1s',
                    transform: feedback ? 'scale(0.95)' : 'scale(1)',
                }}>
                    {mappedColorMap[currentWord.text] || currentWord.text}
                </div>
            </Card>

            <Grid columns={2} gap="md">
                {COLORS.map((colorOption) => (
                    <Button
                        key={colorOption.name}
                        onClick={() => handleOptionClick(colorOption.value)}
                        style={{
                            height: '80px',
                            fontSize: 'var(--font-size-lg)',
                            borderBottom: `4px solid ${colorOption.value}`,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                        }}
                    >
                        {mappedColorMap[colorOption.name] || colorOption.name}
                    </Button>
                ))}
            </Grid>
        </div>
    );
};
