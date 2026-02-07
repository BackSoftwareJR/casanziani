'use client';

import { ReactNode } from 'react';

const CHECK_ICON_SVG =
  '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';

const titleDecoration = '<div class="w-12 h-1 bg-brand-gold rounded-full mb-4"></div>';

function applyInlineFormatting(text: string): string {
  let out = text;
  out = out.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary-700">$1</strong>');
  out = out.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-500 hover:text-primary-600 underline">$1</a>');
  return out;
}

export type ContentSegment =
  | { type: 'html'; content: string }
  | { type: 'component'; id: 'casa-info-box' | 'activities-carousel' };

export interface BlogArticleContentProps {
  content: string;
  insertCasaBoxAfterParagraph?: number;
  replaceSectionWithCarousel?: string;
  renderCasaInfoBox?: ReactNode;
  renderActivitiesCarousel?: ReactNode;
}

export function BlogArticleContent({
  content,
  insertCasaBoxAfterParagraph = 0,
  replaceSectionWithCarousel,
  renderCasaInfoBox,
  renderActivitiesCarousel,
}: BlogArticleContentProps) {
  const sections = content.split(/\n\n+/).filter((s) => s.trim());
  const segments: ContentSegment[] = [];
  let paragraphCount = 0;
  let skipUntilNextH2 = false;
  let listBlockCount = 0; // prima sezione lista = box, le altre = testo

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].trim();
    if (!section) continue;

    if (skipUntilNextH2) {
      if (!section.startsWith('## ')) continue;
      skipUntilNextH2 = false;
      // fall through to process this ## section
    }

    // Blockquote: line starting with >
    if (section.startsWith('>')) {
      const quote = section.replace(/^>\s?/gm, '').trim();
      const formatted = applyInlineFormatting(quote);
      segments.push({
        type: 'html',
        content: `<div class="my-8 pl-6 pr-4 py-4 border-l-4 border-brand-gold bg-gray-50 rounded-r-lg"><blockquote class="font-serif italic text-xl text-gray-700">${formatted}</blockquote></div>`,
      });
      continue;
    }

    // H1 (solo prima riga)
    if (section.startsWith('# ')) {
      const title = section.split('\n')[0].replace(/^#\s+/, '').trim();
      segments.push({
        type: 'html',
        content: `<div class="mt-12 mb-8">${titleDecoration}<h1 class="font-serif text-4xl font-bold text-primary-600">${title}</h1></div>`,
      });
      continue;
    }

    // H2 (solo prima riga)
    if (section.startsWith('## ')) {
      const title = section.split('\n')[0].replace(/^##\s+/, '').trim();
      if (replaceSectionWithCarousel && title === replaceSectionWithCarousel) {
        segments.push({
          type: 'html',
          content: `<div class="mt-10 mb-2">${titleDecoration}<h2 class="font-serif text-3xl font-bold text-primary-600">${title}</h2></div>`,
        });
        segments.push({ type: 'component', id: 'activities-carousel' });
        skipUntilNextH2 = true;
        continue;
      }
      segments.push({
        type: 'html',
        content: `<div class="mt-10 mb-6">${titleDecoration}<h2 class="font-serif text-3xl font-bold text-primary-600">${title}</h2></div>`,
      });
      continue;
    }


    // H3 (solo prima riga come titolo; il resto può essere lista nella stessa sezione)
    if (section.startsWith('### ')) {
      const lines = section.split('\n');
      const title = lines[0].replace(/^###\s+/, '').trim();
      segments.push({
        type: 'html',
        content: `<div class="mt-8 mb-4">${titleDecoration}<h3 class="font-serif text-2xl font-bold text-primary-600">${title}</h3></div>`,
      });
      const rest = lines.slice(1).join('\n').trim();
      if (rest && (rest.includes('\n- ') || rest.startsWith('- '))) {
        const listLines = rest.split('\n').filter((line) => line.trim().startsWith('- '));
        const items = listLines.map((line) => {
          const text = line.replace(/^\-\s+/, '').trim();
          return applyInlineFormatting(text);
        });
        const useBoxStyle = listBlockCount === 0;
        listBlockCount += 1;
        if (useBoxStyle) {
          const listItemsHtml = items
            .map(
              (text) =>
                `<li class="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"><div class="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center p-1">${CHECK_ICON_SVG}</div><span class="font-medium text-gray-700 leading-relaxed">${text}</span></li>`
            )
            .join('');
          segments.push({
            type: 'html',
            content: `<ul class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 list-none">${listItemsHtml}</ul>`,
          });
        } else {
          const listItemsHtml = items
            .map((text) => `<li class="text-gray-700 leading-relaxed mb-2 text-lg">${text}</li>`)
            .join('');
          segments.push({
            type: 'html',
            content: `<ul class="list-disc pl-6 my-6 space-y-2">${listItemsHtml}</ul>`,
          });
        }
      }
      continue;
    }

    // List: lines starting with -
    if (section.includes('\n- ') || section.startsWith('- ')) {
      const lines = section.split('\n').filter((line) => line.trim().startsWith('- '));
      const items = lines.map((line) => {
        const text = line.replace(/^\-\s+/, '').trim();
        return applyInlineFormatting(text);
      });
      const useBoxStyle = listBlockCount === 0;
      listBlockCount += 1;
      if (useBoxStyle) {
        const listItemsHtml = items
          .map(
            (text) =>
              `<li class="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100"><div class="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center p-1">${CHECK_ICON_SVG}</div><span class="font-medium text-gray-700 leading-relaxed">${text}</span></li>`
          )
          .join('');
        segments.push({
          type: 'html',
          content: `<ul class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 list-none">${listItemsHtml}</ul>`,
        });
      } else {
        const listItemsHtml = items
          .map((text) => `<li class="text-gray-700 leading-relaxed mb-2 text-lg">${text}</li>`)
          .join('');
        segments.push({
          type: 'html',
          content: `<ul class="list-disc pl-6 my-6 space-y-2">${listItemsHtml}</ul>`,
        });
      }
      continue;
    }

    // Paragraph
    const formatted = applyInlineFormatting(section);
    segments.push({
      type: 'html',
      content: `<p class="text-gray-700 leading-relaxed mb-6 text-lg">${formatted}</p>`,
    });

    paragraphCount += 1;
    if (
      insertCasaBoxAfterParagraph > 0 &&
      paragraphCount === insertCasaBoxAfterParagraph &&
      renderCasaInfoBox
    ) {
      segments.push({ type: 'component', id: 'casa-info-box' });
    }
  }

  return (
    <div className="blog-content">
      {segments.map((seg, index) => {
        if (seg.type === 'html') {
          return (
            <div
              key={index}
              className="blog-content-segment"
              dangerouslySetInnerHTML={{ __html: seg.content }}
            />
          );
        }
        if (seg.id === 'casa-info-box' && renderCasaInfoBox) return <div key={index}>{renderCasaInfoBox}</div>;
        if (seg.id === 'activities-carousel' && renderActivitiesCarousel)
          return <div key={index}>{renderActivitiesCarousel}</div>;
        return null;
      })}
    </div>
  );
}
