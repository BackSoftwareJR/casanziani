'use client';

import { createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode } from 'react';

const RESTORED_SCROLL_THRESHOLD_PX = 120;

interface AccessibilityContextType {
  fontSize: 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge';
  setFontSize: (size: 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge') => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  /** True quando la pagina è stata ricaricata con scroll già avanzato: niente animazioni, tutto già visibile */
  skipAnimations: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge'>('normal');
  const [highContrast, setHighContrastState] = useState(false);
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [restoredScroll, setRestoredScroll] = useState(false);

  // Se la pagina è stata ricaricata con scroll già a metà/fondo, non animare: tutto già visibile
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.scrollY > RESTORED_SCROLL_THRESHOLD_PX) {
      setRestoredScroll(true);
    }
  }, []);

  const skipAnimations = reducedMotion || restoredScroll;

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') as AccessibilityContextType['fontSize'] | null;
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true';

    if (savedFontSize) {
      setFontSizeState(savedFontSize);
    }
    if (savedHighContrast) {
      setHighContrastState(savedHighContrast);
    }
    if (savedReducedMotion) {
      setReducedMotionState(savedReducedMotion);
    }

    // Check system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotionState(true);
    }
  }, []);

  // Apply fontSize to HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Apply high contrast
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  // Apply reduced motion
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    localStorage.setItem('reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);

  const setFontSize = (size: 'small' | 'normal' | 'large' | 'xlarge' | 'xxlarge') => {
    setFontSizeState(size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
  };

  const setReducedMotion = (enabled: boolean) => {
    setReducedMotionState(enabled);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
        skipAnimations,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
