# 🧠 BRAIN LAB

A cognitive training web app built with React + TypeScript + Vite. Train your brain with scientifically-grounded exercises designed to improve focus, attention, memory, and processing speed.

## Supported Languages (i18n)

- 🇺🇸 English
- 🇨🇳 简体中文

## Features

### 🔢 Schulte Grid

- **What**: Find numbers in ascending order as fast as possible
- **Trains**: Peripheral vision, visual scanning speed, focused attention
- **Difficulty**: 3×3 / 5×5 / 7×7 grids

### 🎨 Stroop Challenge

- **What**: Identify the display color of a word, ignoring what the word says
- **Trains**: Selective attention, cognitive inhibition, processing speed
- **Difficulty**: Easy (no penalty) / Normal (-1 per miss) / Hard (20s, -2 per miss)

### 🧠 Number Memory

- **What**: Memorize an increasingly long sequence of numbers
- **Trains**: Short-term memory, working memory capacity
- **Progression**: Starts at 3 digits, increases by 1 digit per level

### ⚡ Reaction Speed

- **What**: Click as soon as the screen turns green
- **Trains**: Simple reflex response, sustained attention
- **Format**: 5 rounds per session to calculate average reaction time

### 📊 Training History

- All scores persisted locally (localStorage)
- Personal best continuous tracking per game per difficulty
- Immersive **Trend Charts** to visualize your progress over time (recent 15 games)
- Day streak habit tracking

## Tech Stack

- **React 19** + **TypeScript 5.9** + **Vite 7**
- Pure CSS with design tokens (CSS custom properties)
- Glassmorphism UI with dark cyberpunk theme
- Fully Client-Side Architecture (No backend required)
- Custom React Context-based i18n implementation

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/ui/       # Reusable UI (Card, Button, Grid, TrendChart)
├── features/
│   ├── history/         # Training history & trend charts
│   ├── memory/          # Number Memory game
│   ├── onboarding/      # First-time user tutorial
│   ├── reaction/        # Reaction Speed game
│   ├── schulte/         # Schulte Grid game
│   └── stroop/          # Stroop Challenge game
├── hooks/               # Custom hooks
├── i18n/                # Internationalization context & translations
├── services/            # Data persistence (localStorage)
└── styles/              # Design system
```

## License

MIT
