import type { ScaleToken } from '../types.js';

/**
 * Motion tokens: duration and easing curves.
 *
 * Duration scale ranges from instant (0ms) for state changes that should
 * appear immediate, through to slow (700ms) for complex page transitions.
 *
 * Easing curves follow Material Design 3 conventions with a spring curve
 * for playful micro-interactions.
 */

// -- Duration -----------------------------------------------------------------

const durationTokens: ScaleToken[] = [
  {
    name: 'st-motion-duration-instant',
    value: '0ms',
    description: 'Instant — no perceptible delay for state toggles and opacity changes',
  },
  {
    name: 'st-motion-duration-fast',
    value: '100ms',
    description: 'Fast — quick feedback for hover states and small UI shifts',
  },
  {
    name: 'st-motion-duration-normal',
    value: '200ms',
    description: 'Normal — default transition for most interactive elements',
  },
  {
    name: 'st-motion-duration-moderate',
    value: '400ms',
    description: 'Moderate — expanding panels, accordions, and content reveals',
  },
  {
    name: 'st-motion-duration-slow',
    value: '700ms',
    description: 'Slow — complex page transitions and choreographed sequences',
  },
];

// -- Easing curves ------------------------------------------------------------

const easingTokens: ScaleToken[] = [
  {
    name: 'st-motion-easing-default',
    value: 'cubic-bezier(0.2, 0, 0, 1)',
    description: 'Default easing — standard deceleration curve for most transitions',
  },
  {
    name: 'st-motion-easing-in',
    value: 'cubic-bezier(0.4, 0, 1, 1)',
    description: 'Ease-in — accelerating curve for elements leaving the screen',
  },
  {
    name: 'st-motion-easing-out',
    value: 'cubic-bezier(0, 0, 0.2, 1)',
    description: 'Ease-out — decelerating curve for elements entering the screen',
  },
  {
    name: 'st-motion-easing-in-out',
    value: 'cubic-bezier(0.4, 0, 0.2, 1)',
    description: 'Ease-in-out — symmetric curve for elements moving across the screen',
  },
  {
    name: 'st-motion-easing-spring',
    value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    description: 'Spring — overshooting curve for playful micro-interactions and bounces',
  },
];

// -- Combined export ----------------------------------------------------------

export const motionTokens: ScaleToken[] = [...durationTokens, ...easingTokens];
