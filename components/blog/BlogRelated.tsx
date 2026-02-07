'use client';

import { BlogArticle } from '@/data/blog/articles';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { ArrowRightIcon } from '@/components/ui/Icons';

interface BlogRelatedProps {
  articles: BlogArticle[];
}

export function BlogRelated({ articles }: BlogRelatedProps) {
  if (articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/blog/${article.slug}`}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
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
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-semibold">
                {article.category}
              </span>
              <span className="text-gray-500 text-xs">
                {format(new Date(article.date), 'd MMM', { locale: it })}
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-2">
              {article.excerpt}
            </p>
            <span className="text-primary-500 text-sm font-semibold group-hover:underline inline-flex items-center gap-1">
              Leggi di più
              <ArrowRightIcon size={16} className="w-4 h-4 flex-shrink-0" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
