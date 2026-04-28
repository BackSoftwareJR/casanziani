import { Metadata } from 'next';
import {
  blogArticles,
  blogCategories,
  getFeaturedArticles,
  getRecentArticles,
  getArticlesByCategory,
  isValidCategoryId,
  getCategoryNameById,
} from '@/data/blog/articles';
import { BlogList } from '@/components/blog/BlogList';
import { BlogCategories } from '@/components/blog/BlogCategories';
import { BlogFeatured } from '@/components/blog/BlogFeatured';
import { BlogHeroCarousel } from '@/components/blog/BlogHeroCarousel';
import { BackgroundPattern } from '@/components/blog/BackgroundPattern';
import { AnimatedSection } from '@/components/blog/AnimatedSection';
import { DocumentTextIcon } from '@/components/ui/Icons';

const BLOG_HERO_EXTRA_IMAGES = [
  { src: '/images/foto_orizzontali/IMG_2382.webp', alt: 'C.A.S.A. - Ambiente familiare e qualità di vita' },
  { src: '/images/IMG_4208.webp', alt: 'C.A.S.A. - Residenza per anziani Abbiategrasso' },
  { src: '/images/foto_orizzontali/IMG_2390.webp', alt: 'C.A.S.A. - Struttura accogliente' },
];

export const metadata: Metadata = {
  title: 'Blog - Consigli e Informazioni per Anziani e Famiglie',
  description: 'Scopri consigli, informazioni e storie su assistenza agli anziani, attività ricreative, salute, alimentazione e molto altro. Il blog di C.A.S.A.',
  keywords: [
    'blog anziani',
    'consigli assistenza anziani',
    'attività anziani',
    'salute anziani',
    'alimentazione anziani',
    'casa famiglia',
    'Abbiategrasso',
  ],
  openGraph: {
    title: 'Blog C.A.S.A. - Consigli e Informazioni',
    description: 'Consigli, informazioni e storie su assistenza agli anziani e qualità della vita',
    type: 'website',
    url: 'https://casanziani.com/blog',
  },
  alternates: {
    canonical: 'https://casanziani.com/blog',
  },
};

type BlogPageProps = {
  searchParams?: Promise<{ categoria?: string | string[] }> | { categoria?: string | string[] };
};

export default async function BlogPage(props: BlogPageProps) {
  const resolved = (await (props.searchParams ?? Promise.resolve({}))) as {
    categoria?: string | string[];
  };
  const raw = resolved.categoria;
  const categoria =
    typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] : undefined;

  const hasValidCategory = Boolean(categoria && isValidCategoryId(categoria));
  const articlesToShow = hasValidCategory
    ? getArticlesByCategory(categoria!)
    : blogArticles;
  const categoryName = categoria ? getCategoryNameById(categoria) : null;

  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles(6);

  const heroSlides = [
    ...featuredArticles.slice(0, 3).map((a) => ({ src: a.image, alt: a.imageAlt })),
    ...BLOG_HERO_EXTRA_IMAGES,
  ].filter((s, i, arr) => arr.findIndex((x) => x.src === s.src) === i);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog C.A.S.A. - Consigli e Informazioni per Anziani e Famiglie',
    description: 'Consigli, informazioni e storie su assistenza agli anziani, attività ricreative, salute, alimentazione. Il blog di C.A.S.A. Abbiategrasso.',
    url: 'https://casanziani.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'C.A.S.A. Abbiategrasso',
      url: 'https://casanziani.com',
    },
    blogPost: blogArticles.slice(0, 20).map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      url: `https://casanziani.com/blog/${a.slug}`,
      datePublished: a.date,
      author: { '@type': 'Person', name: a.author },
      image: a.image.startsWith('http') ? a.image : `https://casanziani.com${a.image}`,
    })),
  };

  return (
    <div className="min-h-screen bg-primary-50 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Hero: carousel + titolo */}
      <section className="relative" aria-labelledby="blog-heading">
        <div className="container mx-auto px-4 sm:px-6 pt-4 pb-8">
          <BlogHeroCarousel slides={heroSlides} />
        </div>
        <div className="relative bg-white border-b border-primary-200 py-10 sm:py-12">
          <BackgroundPattern variant="waves" opacity={0.06} className="text-primary-500" />
          <div className="container mx-auto px-4 sm:px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div
                className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-100 text-primary-600 mb-6"
                aria-hidden
              >
                <DocumentTextIcon size={32} className="w-8 h-8 sm:w-9 sm:h-9" />
              </div>
              <h1
                id="blog-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-premium-ink mb-4"
              >
                Il Nostro Blog
              </h1>
              <p className="section-subtitle text-lg sm:text-xl">
                Consigli, informazioni e storie per migliorare la qualità della vita degli anziani e supportare le famiglie
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articoli in Evidenza */}
      {featuredArticles.length > 0 && (
        <AnimatedSection delay={0.1} className="relative py-12 bg-background">
          <BackgroundPattern variant="dots" opacity={0.07} className="text-primary-600" />
          <div className="container mx-auto px-4 sm:px-6 relative">
            <h2 className="font-serif text-3xl font-bold text-primary-700 mb-8 text-center">
              Articoli in Evidenza
            </h2>
            <BlogFeatured articles={featuredArticles} />
          </div>
        </AnimatedSection>
      )}

      {/* Esplora per Categoria */}
      <AnimatedSection delay={0.15} className="relative py-12 bg-premium-surface">
        <BackgroundPattern variant="grid" opacity={0.06} className="text-primary-400" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <h2 className="font-serif text-3xl font-bold text-primary-700 mb-8 text-center">
            Esplora per Categoria
          </h2>
          <BlogCategories
            categories={blogCategories}
            activeCategoryId={hasValidCategory ? categoria! : undefined}
          />
        </div>
      </AnimatedSection>

      {/* Tutti gli Articoli (filtrati) */}
      <AnimatedSection delay={0.2} className="relative py-12 bg-background">
        <BackgroundPattern variant="leaves" opacity={0.06} className="text-primary-600" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <h2 className="font-serif text-3xl font-bold text-primary-700 mb-8 text-center">
            {categoryName ? `Articoli: ${categoryName}` : 'Tutti gli Articoli'}
          </h2>
          {articlesToShow.length > 0 ? (
            <BlogList articles={articlesToShow} />
          ) : (
            <p className="text-center text-gray-600 py-12">
              Nessun articolo in questa categoria al momento.
            </p>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
