import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  const { t } = useTranslation('common');
  return (
    <nav aria-label={t('pages.breadcrumb')} className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${String(index)}`} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden className="text-bhagwa/50">
                  /
                </span>
              )}
              {item.to && !last ? (
                <Link to={item.to} className="hover:text-bhagwa">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? 'text-ink' : undefined}
                  aria-current={last ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
