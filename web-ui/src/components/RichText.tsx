import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { Link } from 'react-router-dom';

function readHref(value: unknown): string {
  if (!value || typeof value !== 'object' || !('href' in value)) return '';
  const href: unknown = value.href;
  return typeof href === 'string' ? href : '';
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-lg leading-relaxed text-ink-soft first:mt-0">{children}</p>
    ),
    h2: ({ children }) => <h2 className="mt-10 font-display text-2xl text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-display text-xl text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="mt-4 border-l-2 border-bhagwa/40 pl-4 text-ink-soft">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = readHref(value);
      if (!href) return <>{children}</>;
      if (href.startsWith('/')) {
        return (
          <Link to={href} className="text-bhagwa underline-offset-4 hover:underline">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          className="text-bhagwa underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
};

export function RichText({
  body,
  fallback,
}: {
  body: PortableTextBlock[] | null;
  fallback?: string;
}) {
  if (body && body.length > 0) {
    return (
      <div>
        <PortableText value={body} components={components} />
      </div>
    );
  }
  if (!fallback) return null;
  return <p className="text-lg leading-relaxed text-ink-soft">{fallback}</p>;
}
