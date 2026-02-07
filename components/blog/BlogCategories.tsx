'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getArticlesByCategory } from '@/data/blog/articles';
import { FolderIcon } from '@/components/ui/Icons';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface BlogCategoriesProps {
  categories: Category[];
  activeCategoryId?: string;
}

const categoryVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function BlogCategories({ categories, activeCategoryId }: BlogCategoriesProps) {
  return (
    <div className="space-y-6">
      {activeCategoryId && (
        <div className="flex justify-center">
          <Link
            href="/blog"
            scroll={false}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 text-primary-700 font-semibold hover:bg-primary-200 transition-colors text-sm"
          >
            Tutte le categorie
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, i) => {
          const articles = getArticlesByCategory(category.id);
          const count = articles.length;
          const isActive = activeCategoryId === category.id;

          return (
            <motion.div
              key={category.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              variants={categoryVariants}
            >
            <Link
              href={`/blog?categoria=${category.id}`}
              scroll={false}
              className={`block p-6 rounded-lg shadow-md text-center group transition-all ${
                isActive
                  ? 'bg-primary-100 ring-2 ring-primary-500 ring-offset-2 shadow-lg'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <div
                className={`flex justify-center mb-3 ${isActive ? 'text-primary-700' : 'text-primary-600'}`}
                aria-hidden
              >
                <FolderIcon size={40} className="w-10 h-10" />
              </div>
              <h3
                className={`font-serif text-lg font-bold mb-2 transition-colors ${
                  isActive ? 'text-primary-800' : 'text-primary-600 group-hover:text-primary-700'
                }`}
              >
                {category.name}
              </h3>
              <p className="text-gray-500 text-sm">
                {count} {count === 1 ? 'articolo' : 'articoli'}
              </p>
            </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
