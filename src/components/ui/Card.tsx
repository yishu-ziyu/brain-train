import React from 'react';
import './Card.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    onClick,
    style = {}
}) => {
    const paddingValue = {
        none: '0',
        sm: 'var(--spacing-3)',
        md: 'var(--spacing-6)',
        lg: 'var(--spacing-8)',
    }[padding];

    return (
        <div
            className={`card glass-panel ${onClick ? 'card-clickable' : ''} ${className}`}
            onClick={onClick}
            style={{
                padding: paddingValue,
                ...style
            }}
        >
            {children}
        </div>
    );
};
