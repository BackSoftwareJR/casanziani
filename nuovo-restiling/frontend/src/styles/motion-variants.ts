/**
 * Casanziani Motion Core
 * ──────────────────────
 * Apple-grade easing curves, spring physics, and animation presets.
 * Every transition targets GPU-accelerated properties only
 * (transform, opacity) to guarantee 60 fps fluidity.
 */

import type { Transition, Variants } from 'framer-motion';

/* ───────────────────────────────────────────
   EASING CURVES
   ─────────────────────────────────────────── */

/** Smooth deceleration — primary entrance curve. */
export const appleEase: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Softer landing for text and body reveals. */
export const appleSoftEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Symmetric ease for looping/breathing effects. */
export const easeInOutSmooth: [number, number, number, number] = [0.4, 0, 0.2, 1];

/** Quick snap for micro-interactions. */
export const easeSnap: [number, number, number, number] = [0.25, 0.1, 0.25, 1];


/* ───────────────────────────────────────────
   SPRING PRESETS
   ─────────────────────────────────────────── */

export const springGentle: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

export const springDefault: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 200,
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
  mass: 0.6,
};

export const springHeavy: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 30,
  mass: 1.2,
};


/* ───────────────────────────────────────────
   SECTION ENTRANCE VARIANTS
   ─────────────────────────────────────────── */

/** Standard fade-up for section headers. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: appleEase },
  },
};

/** Fade-in + subtle scale-up — organic section reveal. */
export const scaleUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: appleEase },
  },
};


/* ───────────────────────────────────────────
   STAGGER ORCHESTRATION
   ─────────────────────────────────────────── */

export const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: appleEase },
  },
};


/* ───────────────────────────────────────────
   TEXT REVEAL (Mask-based)
   ─────────────────────────────────────────── */

/** Container that staggers child line reveals. */
export const textRevealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/** Single line: slides up from behind an overflow-hidden mask. */
export const textRevealLine: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: {
      duration: 0.7,
      ease: appleSoftEase,
    },
  },
};


/* ───────────────────────────────────────────
   SLIDE-IN LATERAL
   ─────────────────────────────────────────── */

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: appleEase },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: appleEase },
  },
};


/* ───────────────────────────────────────────
   CARD VARIANTS
   ─────────────────────────────────────────── */

export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: appleEase },
  },
};


/* ───────────────────────────────────────────
   SCARCITY VARIANTS
   ─────────────────────────────────────────── */

export const organicPulse: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: appleEase,
    },
  },
};

/** Organic breathing loop for the number counter. */
export const breathingPulse = {
  scale: [1, 1.04, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: easeInOutSmooth,
  },
};


/* ───────────────────────────────────────────
   IMAGE PARALLAX CONFIG
   ─────────────────────────────────────────── */

export const parallaxImage: Variants = {
  hidden: { opacity: 0, scale: 1.08, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: appleEase },
  },
};


/* ───────────────────────────────────────────
   VIEWPORT DEFAULTS
   ─────────────────────────────────────────── */

export const viewportOnce = { once: true, margin: '-80px' as const };
