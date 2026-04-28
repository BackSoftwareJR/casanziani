'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: Array<{ name: string; href: string }>;
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  const menuContent = (
    <div
      className="lg:hidden bg-premium-surface overflow-y-auto overflow-x-hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        minWidth: '100%',
        minHeight: '100%',
        zIndex: 99999,
      }}
      aria-modal="true"
      aria-label="Menu di navigazione"
      role="dialog"
    >
      {/* Barra superiore con pulsante chiudi */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-premium-surface border-b border-primary-200 min-h-[60px] shrink-0">
        <span className="font-display text-lg font-bold text-premium-ink">Menu</span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 -m-2 text-premium-inkSoft hover:text-primary-600 hover:bg-primary-50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Chiudi menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Link di navigazione */}
      <nav className="px-6 py-8">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                data-track={`nav_click:menu_${item.name.toLowerCase().replace(/\s/g, '_')}`}
                onClick={onClose}
                className="block text-lg font-semibold text-premium-ink hover:text-primary-700 hover:bg-primary-50 py-4 px-4 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="pt-4 mt-4 border-t border-gray-200">
            <a
              href="tel:+393490631492"
              data-track="cta_click:chiama_ora_menu_mobile"
              onClick={onClose}
              className="flex items-center justify-center w-full bg-premium-sage text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-[color:var(--color-sage-dark)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Chiama ora
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );

  return createPortal(menuContent, document.body);
}
