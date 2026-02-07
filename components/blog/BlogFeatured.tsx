'use client';

import { BlogArticle, getCategoryNameById } from '@/data/blog/articles';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@/components/ui/Icons';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface BlogFeaturedProps {
  articles: BlogArticle[];
}

export function BlogFeatured({ articles }: BlogFeaturedProps) {
  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const otherArticles = articles.slice(1, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Featured Article */}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={cardVariants}
        className="lg:col-span-2"
      >
      <Link
        href={`/blog/${mainArticle.slug}`}
        className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100 group"
      >
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={mainArticle.image}
            alt={mainArticle.imageAlt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute top-4 left-4 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            In Evidenza
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
              {getCategoryNameById(mainArticle.category) ?? mainArticle.category}
            </span>
            <span className="text-gray-500 text-sm">
              {format(new Date(mainArticle.date), 'd MMM yyyy', { locale: it })}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-primary-600 mb-3 group-hover:text-primary-700 transition-colors">
            {mainArticle.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {mainArticle.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{mainArticle.readingTime} min di lettura</span>
            <span className="text-primary-500 font-semibold group-hover:underline inline-flex items-center gap-1">
              Leggi di più
              <ArrowRightIcon size={16} className="w-4 h-4 flex-shrink-0" />
            </span>
          </div>
        </div>
      </Link>
      </motion.div>

      {/* Other Featured Articles */}
      <div className="space-y-6">
        {otherArticles.map((article, i) => (
          <motion.div
            key={article.id}
            custom={i + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={cardVariants}
          >
          <Link
            href={`/blog/${article.slug}`}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-primary-100 group block"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-semibold">
                  {getCategoryNameById(article.category) ?? article.category}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                {article.title}
              </h4>
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                {article.excerpt}
              </p>
              <span className="text-primary-500 text-xs font-semibold group-hover:underline inline-flex items-center gap-1">
                Leggi
                <ArrowRightIcon size={14} className="w-3 h-3 flex-shrink-0" />
              </span>
            </div>
          </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
