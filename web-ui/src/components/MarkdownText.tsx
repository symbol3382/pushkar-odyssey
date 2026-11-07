import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';

export function MarkdownText({
  source,
  fallback,
}: {
  source: string;
  fallback?: string;
}) {
  const markdown = source.trim();
  if (!markdown) {
    if (!fallback) return null;
    return <p className="text-lg leading-relaxed text-ink-soft">{fallback}</p>;
  }

  return (
    <div className="markdown-body">
      <Markdown
        components={{
          p: ({ children }) => (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft first:mt-0">{children}</p>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 font-display text-2xl text-ink">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 font-display text-xl text-ink">{children}</h3>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-ink-soft">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="mt-4 border-l-2 border-bhagwa/40 pl-4 text-ink-soft">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
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
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
