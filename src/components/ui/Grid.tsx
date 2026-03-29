import React from 'react';

interface GridProps {
    children: React.ReactNode;
    columns?: number;
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Grid: React.FC<GridProps> = ({
    children,
    columns = 5,
    gap = 'md',
    className = ''
}) => {
    const gapSize = {
        sm: 'var(--spacing-2)',
        md: 'var(--spacing-3)',
        lg: 'var(--spacing-4)',
    }[gap];

    return (
        <div
            className={className}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: gapSize,
                width: '100%',
                margin: '0 auto',
                maxWidth: '500px' // Optimal for touch
            }}
        >
            {children}
        </div>
    );
};
