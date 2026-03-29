import React from 'react';

/**
 * Showcase Component
 * A "Dribbble-style" wrapper that renders its children inside a stylized macOS window
 * with a 3D perspective and deep space glowing background.
 */
export const Showcase: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, #faf9f5 0%, #e8e6dc 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: 'var(--font-family-sans)'
        }}>
            {/* Background Glows */}
            <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(217, 119, 87, 0.15) 0%, transparent 60%)', /* Orange Brand Glow */
                filter: 'blur(60px)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                top: '40%', right: '20%',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(106, 155, 204, 0.15) 0%, transparent 60%)', /* Blue Brand Glow */
                filter: 'blur(50px)',
                zIndex: 0
            }} />

            {/* Typography Header */}
            <div style={{ 
                position: 'absolute', top: '8%', textAlign: 'center', zIndex: 10,
                display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
                <h1 style={{
                    fontSize: '2.5rem', fontWeight: 900,
                    margin: 0,
                    letterSpacing: '0.1em',
                    background: 'linear-gradient(135deg, #d97757 0%, #6a9bcc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>BRAIN LAB</h1>
                <p style={{
                    color: '#5c5c5c', fontSize: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0
                }}>Cognitive Training Platform</p>
            </div>
            
            <button
                onClick={onClose}
                style={{
                    position: 'absolute', top: '32px', left: '32px',
                    background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(20,20,19,0.1)',
                    color: '#141413', padding: '8px 16px', borderRadius: '8px',
                    cursor: 'pointer', zIndex: 20, backdropFilter: 'blur(10px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
            >
                ← Exit Showcase
            </button>

            {/* Application Mockup Frame */}
            <div style={{
                perspective: '1500px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '60px', /* To offset the header */
                zIndex: 10
            }}>
                <div style={{
                    width: '375px', // Mobile viewport width
                    height: '750px', // Mobile viewport height (simulated iOS aspect ratio)
                    background: 'var(--color-bg-primary)',
                    borderRadius: '24px',
                    boxShadow: '0 40px 100px -20px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,1)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    transform: 'rotateX(5deg) rotateY(-5deg) rotateZ(2deg) scale(0.9)',
                    transformStyle: 'preserve-3d',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    {/* macOS / iOS inspired Notch or Header Bar (simplified) */}
                    <div style={{
                        height: '24px', background: 'rgba(20,20,19,0.03)',
                        display: 'flex', alignItems: 'center', paddingLeft: '16px', paddingRight: '16px', width: '100%',
                        borderBottom: '1px solid rgba(20,20,19,0.05)'
                    }}>
                        {/* Traffic lights */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}/>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}/>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}/>
                        </div>
                    </div>

                    {/* App Inner Content wrapped inside */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}>
                        {/* Inject children, but scale them nicely or let them flow natively in this 375px container */}
                        <div style={{ pointerEvents: 'none' }}> {/* Disable clicks in showcase */}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Reflection on the floor */}
            <div style={{
                position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)',
                width: '600px', height: '20px', background: 'rgba(106, 155, 204, 0.2)',
                filter: 'blur(30px)', zIndex: 0
            }} />
        </div>
    );
};
