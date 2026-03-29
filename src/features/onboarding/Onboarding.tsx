import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useI18n } from '../../i18n/I18nContext';

const ONBOARDING_KEY = 'brain-lab-onboarded';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  { icon: '🧠', titleKey: 'onboardStep1Title', descKey: 'onboardStep1Desc' },
  { icon: '🎯', titleKey: 'onboardStep2Title', descKey: 'onboardStep2Desc' },
  { icon: '📈', titleKey: 'onboardStep3Title', descKey: 'onboardStep3Desc' },
] as const;

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { t } = useI18n();
  const [step, setStep] = useState(0);

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    onComplete();
  };

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="animate-fade-in" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(10, 14, 23, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: 'var(--spacing-4)',
    }}>
      <Card className="glass-panel animate-scale-in" style={{
        maxWidth: '380px',
        width: '100%',
        textAlign: 'center',
      }} padding="lg">
        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-6)' }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              background: i === step ? 'var(--color-accent-primary)' : 'var(--color-bg-tertiary)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>

        {/* Icon */}
        <div style={{
          fontSize: '4rem',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1,
        }}>
          {currentStep.icon}
        </div>

        {/* Content */}
        <h2 style={{
          marginBottom: 'var(--spacing-3)',
          fontSize: 'var(--font-size-xl)',
        }}>
          {t[currentStep.titleKey]}
        </h2>
        <p style={{
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--spacing-8)',
          lineHeight: 1.6,
        }}>
          {t[currentStep.descKey]}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
          {!isLast && (
            <Button variant="ghost" onClick={handleComplete} style={{ flex: 1 }}>
              {t.onboardSkip}
            </Button>
          )}
          <Button
            variant="primary"
            onClick={isLast ? handleComplete : () => setStep(s => s + 1)}
            style={{ flex: isLast ? 1 : 2 }}
          >
            {isLast ? t.onboardStart : t.onboardNext}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export function shouldShowOnboarding(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) !== 'true';
}
