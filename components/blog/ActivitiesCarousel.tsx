'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { casaActivities, ActivityCard } from '@/data/blog/activities';

function ActivityCardItem({ activity }: { activity: ActivityCard }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="relative h-44 sm:h-52">
        <Image
          src={activity.image}
          alt={activity.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 280px, 320px"
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-bold text-primary-700 mb-2">
          {activity.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

export function ActivitiesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 320;
    const gap = 24;
    const step = cardWidth + gap;
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative -mx-4 sm:mx-0 mt-6 mb-10">
      {/* Frecce desktop */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Attività precedenti"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Prossime attività"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-6 overflow-x-auto overflow-y-hidden pb-2 px-4 sm:px-0 snap-x snap-mandatory scroll-smooth [scrollbar-width:thin] [scrollbar-color:theme(colors.primary.300)_transparent]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {casaActivities.map((activity) => (
          <div key={activity.id} className="snap-center">
            <ActivityCardItem activity={activity} />
          </div>
        ))}
      </div>
    </div>
  );
}
