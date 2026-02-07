'use client';

import { getRecentArticles } from '@/data/blog/articles';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { ArrowRightIcon } from '@/components/ui/Icons';

export function BlogPreview() {
  const recentArticles = getRecentArticles(3);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl font-bold text-primary-600 mb-4">
            Dal Nostro Blog
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Consigli, informazioni e storie per migliorare la qualità della vita degli anziani
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {recentArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-primary-100 group block"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {format(new Date(article.date), 'd MMM', { locale: it })}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="text-primary-500 text-sm font-semibold group-hover:underline inline-flex items-center gap-1">
                    Leggi di più
                    <ArrowRightIcon size={16} className="w-4 h-4 flex-shrink-0" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 shadow-lg hover:shadow-xl"
          >
            Vedi Tutti gli Articoli
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
