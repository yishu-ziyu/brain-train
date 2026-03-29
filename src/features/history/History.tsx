import React from 'react';
import { getGameRecords, getBestRecord, getStreak, type GameRecord } from '../../services/storageService';
import { Card } from '../../components/ui/Card';
import { TrendChart } from '../../components/ui/TrendChart';
import { useTimer } from '../../hooks/useTimer';
import { useI18n } from '../../i18n/I18nContext';

export const History: React.FC = () => {
    const { t } = useI18n();
    const { formatTime } = useTimer();

    const schulteRecords = getGameRecords('schulte').slice(0, 15);
    const stroopRecords = getGameRecords('stroop').slice(0, 15);
    const memoryRecords = getGameRecords('memory').slice(0, 15);
    const reactionRecords = getGameRecords('reaction').slice(0, 15);

    const schulteBest = getBestRecord('schulte');
    const stroopBest = getBestRecord('stroop');
    const memoryBest = getBestRecord('memory');
    const reactionBest = getBestRecord('reaction');

    const streak = getStreak();

    const formatDate = (ts: number) => {
        const d = new Date(ts);
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const hour = d.getHours().toString().padStart(2, '0');
        const min = d.getMinutes().toString().padStart(2, '0');
        return `${month}/${day} ${hour}:${min}`;
    };

    // Prepare chart data (chronological order)
    const prepareChartData = (records: GameRecord[], isTime: boolean = false) => {
        return [...records].reverse().map(r => ({
            value: isTime ? Number(formatTime(r.score)) : r.score,
            label: formatDate(r.timestamp)
        }));
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto' }}>
            {/* Streak */}
            <Card className="glass-panel" style={{ marginBottom: 'var(--spacing-4)', textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold' }}>
                    🔥 {streak.current}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                    {t.dayStreak}
                </div>
            </Card>

            {/* Personal Bests Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--spacing-3)',
                marginBottom: 'var(--spacing-6)'
            }}>
                <Card className="glass-panel" style={{ textAlign: 'center' }} padding="sm">
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                        {t.schulteBestLabel}
                    </div>
                    <div style={{ fontWeight: 'bold', color: 'var(--color-accent-primary)', fontFamily: 'var(--font-family-mono)' }}>
                        {schulteBest ? `${formatTime(schulteBest.score)}s` : '—'}
                    </div>
                    {schulteBest && <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{schulteBest.difficulty}</div>}
                </Card>

                <Card className="glass-panel" style={{ textAlign: 'center' }} padding="sm">
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                        {t.stroopBestLabel}
                    </div>
                    <div style={{ fontWeight: 'bold', color: 'var(--color-accent-secondary)', fontFamily: 'var(--font-family-mono)' }}>
                        {stroopBest ? `${stroopBest.score} pts` : '—'}
                    </div>
                    {stroopBest && <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{t[`stroop${stroopBest.difficulty.charAt(0).toUpperCase() + stroopBest.difficulty.slice(1)}` as keyof typeof t] || stroopBest.difficulty}</div>}
                </Card>

                <Card className="glass-panel" style={{ textAlign: 'center' }} padding="sm">
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                        {t.memoryBestLabel}
                    </div>
                    <div style={{ fontWeight: 'bold', color: 'var(--color-accent-warning)', fontFamily: 'var(--font-family-mono)' }}>
                        {memoryBest ? `${t.memoryLevel} ${memoryBest.score}` : '—'}
                    </div>
                </Card>

                <Card className="glass-panel" style={{ textAlign: 'center' }} padding="sm">
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-1)' }}>
                        {t.reactionBestLabel}
                    </div>
                    <div style={{ fontWeight: 'bold', color: 'var(--color-text-accent)', fontFamily: 'var(--font-family-mono)' }}>
                        {reactionBest ? `${reactionBest.score} ms` : '—'}
                    </div>
                </Card>
            </div>

            {/* Schulte History */}
            <h3 style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-accent-primary)' }}>
                {t.schulteTitle}
            </h3>
            {schulteRecords.length === 0 ? (
                <Card className="glass-panel" style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center' }} padding="sm">
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{t.noRecords}</span>
                </Card>
            ) : (
                <Card className="glass-panel" style={{ marginBottom: 'var(--spacing-6)', padding: '0' }}>
                    <div style={{ padding: 'var(--spacing-4) var(--spacing-4) 0' }}>
                        <TrendChart data={prepareChartData(schulteRecords, true)} color="var(--color-accent-primary)" lowerIsBetter={true} />
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {schulteRecords.map((r) => (
                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-2) var(--spacing-4)', borderTop: '1px solid var(--color-glass-border)', fontSize: 'var(--font-size-sm)' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{formatDate(r.timestamp)}</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{r.difficulty}</span>
                                <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-family-mono)', color: schulteBest && r.id === schulteBest.id ? 'var(--color-accent-success)' : 'var(--color-text-primary)' }}>
                                    {formatTime(r.score)}s
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Stroop History */}
            <h3 style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-accent-secondary)' }}>
                {t.stroopTitle}
            </h3>
            {stroopRecords.length === 0 ? (
                <Card className="glass-panel" style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center' }} padding="sm">
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{t.noRecords}</span>
                </Card>
            ) : (
                <Card className="glass-panel" style={{ marginBottom: 'var(--spacing-6)', padding: '0' }}>
                    <div style={{ padding: 'var(--spacing-4) var(--spacing-4) 0' }}>
                        <TrendChart data={prepareChartData(stroopRecords)} color="var(--color-accent-secondary)" />
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {stroopRecords.map((r) => (
                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-2) var(--spacing-4)', borderTop: '1px solid var(--color-glass-border)', fontSize: 'var(--font-size-sm)' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{formatDate(r.timestamp)}</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{t[`stroop${r.difficulty.charAt(0).toUpperCase() + r.difficulty.slice(1)}` as keyof typeof t] || r.difficulty}</span>
                                <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-family-mono)', color: stroopBest && r.id === stroopBest.id ? 'var(--color-accent-success)' : 'var(--color-text-primary)' }}>
                                    {r.score}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Memory History */}
            <h3 style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-accent-warning)' }}>
                {t.memoryTitle}
            </h3>
            {memoryRecords.length === 0 ? (
                <Card className="glass-panel" style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center' }} padding="sm">
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{t.noRecords}</span>
                </Card>
            ) : (
                <Card className="glass-panel" style={{ marginBottom: 'var(--spacing-6)', padding: '0' }}>
                    <div style={{ padding: 'var(--spacing-4) var(--spacing-4) 0' }}>
                        <TrendChart data={prepareChartData(memoryRecords)} color="var(--color-accent-warning)" />
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {memoryRecords.map((r) => (
                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-2) var(--spacing-4)', borderTop: '1px solid var(--color-glass-border)', fontSize: 'var(--font-size-sm)' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{formatDate(r.timestamp)}</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{r.difficulty}</span>
                                <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-family-mono)', color: memoryBest && r.id === memoryBest.id ? 'var(--color-accent-success)' : 'var(--color-text-primary)' }}>
                                    {t.memoryLevel} {r.score}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Reaction History */}
            <h3 style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-accent)' }}>
                {t.reactionTitle}
            </h3>
            {reactionRecords.length === 0 ? (
                <Card className="glass-panel" style={{ textAlign: 'center' }} padding="sm">
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{t.noRecords}</span>
                </Card>
            ) : (
                <Card className="glass-panel" style={{ padding: '0' }}>
                    <div style={{ padding: 'var(--spacing-4) var(--spacing-4) 0' }}>
                        <TrendChart data={prepareChartData(reactionRecords)} color="var(--color-text-accent)" lowerIsBetter={true} />
                    </div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {reactionRecords.map((r) => (
                            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-2) var(--spacing-4)', borderTop: '1px solid var(--color-glass-border)', fontSize: 'var(--font-size-sm)' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{formatDate(r.timestamp)}</span>
                                <span style={{ color: 'var(--color-text-secondary)' }}>{r.difficulty}</span>
                                <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-family-mono)', color: reactionBest && r.id === reactionBest.id ? 'var(--color-accent-success)' : 'var(--color-text-primary)' }}>
                                    {r.score} ms
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};
