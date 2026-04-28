'use client';

import { useAccessibility } from '@/components/providers/AccessibilityProvider';
import { useState } from 'react';

export function AccessibilityToolbar() {
  const { fontSize, setFontSize, highContrast, setHighContrast, reducedMotion, setReducedMotion } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-700 text-white p-3 rounded-full shadow-lg hover:bg-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 border border-white/40"
        aria-label="Apri menu accessibilità"
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-premium-surface rounded-xl shadow-xl p-4 w-64 border border-primary-200">
          <h3 className="font-display text-lg font-bold mb-4 text-premium-ink">Accessibilita</h3>
          
          {/* Font Size */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-premium-inkSoft">
              Dimensione testo
            </label>
            <div className="flex gap-2">
              {(['small', 'normal', 'large', 'xlarge', 'xxlarge'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-3 py-1 text-sm rounded ${
                    fontSize === size
                      ? 'bg-primary-700 text-white'
                      : 'bg-primary-50 text-premium-inkSoft hover:bg-primary-100'
                  } transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  aria-pressed={fontSize === size}
                >
                  {size === 'small' && 'A'}
                  {size === 'normal' && 'A'}
                  {size === 'large' && 'A'}
                  {size === 'xlarge' && 'A'}
                  {size === 'xxlarge' && 'A'}
                </button>
              ))}
            </div>
            <p className="text-xs text-premium-inkSoft mt-1">
              {fontSize === 'small' && 'Piccolo'}
              {fontSize === 'normal' && 'Normale'}
              {fontSize === 'large' && 'Grande'}
              {fontSize === 'xlarge' && 'Molto grande'}
              {fontSize === 'xxlarge' && 'Extra grande'}
            </p>
          </div>

          {/* High Contrast */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-semibold text-premium-inkSoft">Alto contrasto</span>
            </label>
          </div>

          {/* Reduced Motion */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(e) => setReducedMotion(e.target.checked)}
                className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-semibold text-premium-inkSoft">Riduci animazioni</span>
            </label>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-2 px-4 py-2 bg-primary-50 text-premium-inkSoft rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Chiudi
          </button>
        </div>
      )}
    </div>
  );
}
