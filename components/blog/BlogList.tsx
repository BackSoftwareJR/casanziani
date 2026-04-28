'use client';

import { BlogArticle, getCategoryNameById } from '@/data/blog/articles';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@/components/ui/Icons';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface BlogListProps {
  articles: BlogArticle[];
}

export function BlogList({ articles }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, i) => (
        <motion.div
          key={article.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          variants={itemVariants}
        >
        <Link
          href={`/blog/${article.slug}`}
          className="block wl-card overflow-hidden hover:shadow-xl transition-all duration-300 group"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {article.featured && (
              <div className="absolute top-4 right-4 bg-premium-sage text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                In Evidenza
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                {getCategoryNameById(article.category) ?? article.category}
              </span>
              <span className="text-gray-500 text-sm">
                {format(new Date(article.date), 'd MMM yyyy', { locale: it })}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-premium-ink mb-2 group-hover:text-primary-800 transition-colors">
              {article.title}
            </h3>
            <p className="text-premium-inkSoft text-sm mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{article.readingTime} min di lettura</span>
              <span className="text-primary-500 font-semibold group-hover:underline inline-flex items-center gap-1">
                Leggi di più
                <ArrowRightIcon size={16} className="w-4 h-4 flex-shrink-0" />
              </span>
            </div>
          </div>
        </Link>
        </motion.div>
      ))}
    </div>
  );
}
