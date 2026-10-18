import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ContentQuery } from '../hooks/useContentQuery';

export function QueryStatus({
  query,
  children,
}: {
  query: ContentQuery<unknown>;
  children: ReactNode;
}) {
  const { t } = useTranslation('common');

  if (query.status === 'loading') {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6" role="status" aria-live="polite">
        <p className="text-sm text-ink-soft">{t('pages.loading')}</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {['one', 'two', 'three'].map((item) => (
            <div key={item} className="aspect-[4/3] animate-pulse rounded-sm bg-sand" />
          ))}
        </div>
      </div>
    );
  }

  if (query.status === 'error') {
    return (
      <div className="mx-auto max-w-lg px-4 py-32 text-center" role="alert">
        <p className="text-lg text-ink">{t('pages.loadError')}</p>
        <button
          type="button"
          onClick={query.retry}
          className="mt-5 rounded-sm bg-bhagwa px-5 py-2.5 text-sm font-medium text-cream hover:bg-bhagwa-light"
        >
          {t('actions.tryAgain')}
        </button>
      </div>
    );
  }

  return children;
}

export function EmptyCatalog({ message }: { message: string }) {
  return <p className="py-16 text-center text-ink-soft">{message}</p>;
}

export function MissingContent({
  title,
  to,
  action,
}: {
  title: string;
  to: string;
  action: string;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center">
      <h1 className="font-display text-3xl text-ink">{title}</h1>
      <Link to={to} className="mt-4 inline-block text-bhagwa hover:underline">
        {action}
      </Link>
    </div>
  );
}
