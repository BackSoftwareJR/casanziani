'use client';

import Image from 'next/image';

interface ImageStripProps {
  src: string;
  alt?: string;
  className?: string;
  overlay?: boolean;
}

export function ImageStrip({ src, alt = '', className = '', overlay = true }: ImageStripProps) {
  return (
    <section className={`relative h-48 sm:h-56 md:h-64 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" aria-hidden />
      )}
    </section>
  );
}
