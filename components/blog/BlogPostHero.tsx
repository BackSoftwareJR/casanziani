'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getCategoryNameById } from '@/data/blog/articles';
import type { BlogArticle } from '@/data/blog/articles';

interface BlogPostHeroProps {
  post: BlogArticle;
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  const categoryName = getCategoryNameById(post.category) ?? post.category;

  return (
    <motion.div
      className="relative h-[400px] md:h-[500px] w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-brand-gold rounded-full mb-4" aria-hidden />
          <div className="inline-block bg-premium-sage text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {categoryName}
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
            <span>Di {post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('it-IT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime} min di lettura</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
