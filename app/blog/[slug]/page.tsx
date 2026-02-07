import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogArticles, getArticleBySlug, getRecentArticles } from '@/data/blog/articles';
import { BlogArticleContent } from '@/components/blog/BlogArticleContent';
import { BlogRelated } from '@/components/blog/BlogRelated';
import { CasaInfoBox } from '@/components/blog/CasaInfoBox';
import { ActivitiesCarousel } from '@/components/blog/ActivitiesCarousel';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { BackgroundPattern } from '@/components/blog/BackgroundPattern';

const SITE_URL = 'https://casanziani.com';

function fullImageUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getArticleBySlug(slug);

  if (!post) {
    return {
      title: 'Articolo non trovato',
    };
  }

  const canonical = `${SITE_URL}/blog/${slug}`;
  const imageUrl = fullImageUrl(post.image);

  return {
    title: `${post.title} | Blog C.A.S.A.`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

const ACTIVITIES_SECTION_HEADING = 'Le Nostre Attività a C.A.S.A.';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getArticleBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedArticles = getRecentArticles(3).filter((a) => a.id !== post.id);
  const showActivitiesCarousel = post.slug === 'benefici-attivita-ricreative-anziani';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: fullImageUrl(post.image),
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'C.A.S.A. Abbiategrasso',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${slug}` },
    ],
  };

  return (
    <article className="min-h-screen bg-background pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <BlogPostHero post={post} />

      {/* Content con pattern di sfondo */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
        <BackgroundPattern variant="cross" opacity={0.05} className="text-primary-500" />
        <div className="relative max-w-4xl mx-auto">
          <BlogArticleContent
              content={post.content}
              insertCasaBoxAfterParagraph={3}
              replaceSectionWithCarousel={
                showActivitiesCarousel ? ACTIVITIES_SECTION_HEADING : undefined
              }
              renderCasaInfoBox={<CasaInfoBox />}
              renderActivitiesCarousel={
                showActivitiesCarousel ? <ActivitiesCarousel /> : undefined
              }
            />

            {/* Tags - pillole cliccabili */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-4 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wide text-gray-700 hover:bg-brand-gold hover:text-white transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA finale */}
            <div className="mt-12 bg-primary-50 p-8 rounded-2xl text-center shadow-sm border border-gray-100">
              <div className="w-12 h-1 bg-brand-gold rounded-full mx-auto mb-4" aria-hidden />
              <h3 className="font-serif text-2xl font-bold text-primary-600 mb-4">
                Vuoi Saperne di Più?
              </h3>
              <p className="text-gray-700 mb-6">
                Contattaci per una visita o per qualsiasi domanda. Saremo felici di rispondere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contatti"
                  className="bg-primary-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Contattaci
                </a>
                <a
                  href="/blog"
                  className="border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Altri Articoli
                </a>
              </div>
            </div>
        </div>
      </div>

      {/* Articoli Correlati - sezione con pattern diversa */}
      {relatedArticles.length > 0 && (
        <section className="relative bg-white py-10 sm:py-12 overflow-hidden">
          <BackgroundPattern variant="dots" opacity={0.06} className="text-primary-400" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto">
              <div className="w-12 h-1 bg-brand-gold rounded-full mx-auto mb-4" aria-hidden />
              <h2 className="font-serif text-3xl font-bold text-primary-500 mb-8 text-center">
                Articoli Correlati
              </h2>
              <BlogRelated articles={relatedArticles} />
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
