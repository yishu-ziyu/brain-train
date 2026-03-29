import { useState, useEffect } from 'react';
import { SchulteGrid } from './features/schulte/SchulteGrid';
import { StroopGame } from './features/stroop/StroopGame';
import { MemoryGame } from './features/memory/MemoryGame';
import { ReactionGame } from './features/reaction/ReactionGame';
import { History } from './features/history/History';
import { Onboarding, shouldShowOnboarding } from './features/onboarding/Onboarding';
import { Showcase } from './features/showcase/Showcase';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';

import { getStreak } from './services/storageService';
import { useI18n } from './i18n/I18nContext';

type GameMode = 'home' | 'schulte' | 'stroop' | 'memory' | 'reaction' | 'history' | 'showcase';

function App() {
  const { t, locale, toggleLocale } = useI18n();
  const [mode, setMode] = useState<GameMode>('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const streak = getStreak();

  useEffect(() => {
    if (shouldShowOnboarding()) {
      setShowOnboarding(true);
    }
  }, []);

  const renderHomeGrid = () => (
    <div className="animate-scale-in">
      <div style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
        {t.selectProtocol}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 'var(--spacing-4)',
        gridAutoRows: 'minmax(120px, auto)',
      }}>
        {/* Schulte Grid */}
        <Card onClick={() => setMode('schulte')} padding="lg" style={{ 
          gridColumn: 'span 12',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          background: 'linear-gradient(160deg, var(--color-bg-secondary) 0%, rgba(217, 119, 87, 0.08) 100%)', // Orange hint
          minHeight: '160px'
        }}>
          <div>
            <h3 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-accent-primary)', fontSize: 'var(--font-size-xl)' }}>{t.schulteTitle}</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              {t.schulteDesc}
            </p>
          </div>
        </Card>

        {/* Memory */}
        <Card onClick={() => setMode('memory')} padding="lg" style={{ 
          gridColumn: 'span 7',
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(160deg, var(--color-bg-secondary) 0%, rgba(106, 155, 204, 0.08) 100%)' // Blue hint
        }}>
          <h3 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-accent-secondary)' }}>{t.memoryTitle}</h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
            {t.memoryDesc}
          </p>
        </Card>

        {/* Reaction */}
        <Card onClick={() => setMode('reaction')} padding="lg" style={{ 
          gridColumn: 'span 5',
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(160deg, var(--color-bg-secondary) 0%, rgba(120, 140, 93, 0.08) 100%)' // Green hint
        }}>
          <h3 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-accent-success)' }}>{t.reactionTitle}</h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
            {t.reactionDesc}
          </p>
        </Card>

        {/* Stroop Challenge */}
        <Card onClick={() => setMode('stroop')} padding="lg" style={{ 
          gridColumn: 'span 12',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          background: 'linear-gradient(160deg, var(--color-bg-secondary) 0%, rgba(224, 158, 80, 0.08) 100%)', // Warning/Soft orange hint
          minHeight: '160px'
        }}>
          <div>
            <h3 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-accent-warning)', fontSize: 'var(--font-size-xl)' }}>{t.stroopTitle}</h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              {t.stroopDesc}
            </p>
          </div>
        </Card>

        {/* History */}
        <Card onClick={() => setMode('history')} padding="md" style={{ 
          gridColumn: 'span 12',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--color-bg-secondary)',
          border: '1px dashed var(--color-glass-border)'
        }}>
          <h3 style={{ color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            📊 {t.historyTitle}
          </h3>
        </Card>
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-8)' }}>
        <Button variant="ghost" size="sm" onClick={() => setMode('showcase')} style={{ opacity: 0.5 }}>
          ✨ {locale === 'zh' ? '开启展厅模式' : 'Enter Showcase'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="app-container" style={{ padding: 'var(--spacing-4)', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
      {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

      <header className="glass-panel" style={{
        padding: 'var(--spacing-6)',
        borderRadius: 'var(--radius-xl)',
        marginBottom: 'var(--spacing-8)',
        textAlign: 'center',
        position: 'relative'
      }}>
        {mode !== 'home' ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode('home')}
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
          >
            {t.back}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLocale}
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontWeight: 'bold' }}
          >
            {t.langSwitch}
          </Button>
        )}
        <h1
          style={{
            fontSize: 'var(--font-size-2xl)',
            background: 'linear-gradient(to right, var(--color-accent-primary), var(--color-accent-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 'var(--spacing-1)',
            cursor: 'pointer',
          }}
          onClick={() => setMode('home')}
        >
          {t.appTitle}
        </h1>
        {mode === 'home' && streak.current > 0 && (
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            🔥 {streak.current} {t.dayStreak}
          </div>
        )}
      </header>

      <main className="animate-fade-in" style={{ paddingBottom: 'var(--spacing-8)' }}>
        {mode === 'home' && renderHomeGrid()}
        {mode === 'showcase' && <Showcase onClose={() => setMode('home')}>{renderHomeGrid()}</Showcase>}

        {mode === 'schulte' && <SchulteGrid />}
        {mode === 'stroop' && <StroopGame />}
        {mode === 'memory' && <MemoryGame />}
        {mode === 'reaction' && <ReactionGame />}
        {mode === 'history' && <History />}
      </main>
    </div>
  );
}

export default App;
