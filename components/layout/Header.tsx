'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AccessibilityToolbar } from '@/components/ui/AccessibilityToolbar';
import { MobileMenu } from './MobileMenu';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Galleria', href: '/galleria' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contatti', href: '/#contatti' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Salta al contenuto principale
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="container mx-auto px-6 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between min-h-[48px] sm:min-h-[52px]">
            {/* Logo */}
            <Link href="/" data-track="nav_click:logo_header" className="flex items-center gap-2 shrink-0 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
              <Image
                src="/images/logo.jpg"
                alt="C.A.S.A Logo"
                width={96}
                height={36}
                className="rounded-lg w-16 sm:w-20 h-auto object-contain max-h-10"
                sizes="(max-width: 640px) 80px, 96px"
                priority
              />
              <span className="font-serif text-base sm:text-lg font-bold text-primary-600 hidden sm:block whitespace-nowrap">
                C.A.S.A
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-track={`nav_click:${item.name.toLowerCase().replace(/\s/g, '_')}`}
                  className="text-gray-700 hover:text-primary-600 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 rounded px-2 py-1"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/#contatti"
                data-track="cta_click:chiama_ora_header"
                className="bg-primary-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 shadow-md hover:shadow-lg"
              >
                Chiama ora
              </Link>
            </div>

            {/* Mobile: Contattaci — sempre visibile in header */}
            <Link
              href="/#contatti"
              data-track="cta_click:contattaci_header_mobile"
              className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span aria-hidden>Contattaci</span>
              <svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navigation={navigation}
        />
      </header>
      <AccessibilityToolbar />
    </>
  );
}
