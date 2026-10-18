import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';

export function NotFoundPage() {
  const { t } = useTranslation('common');
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center">
      <Seo title={t('pages.notFoundTitle')} description={t('pages.notFoundBody')} path="/404" />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bhagwa">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink">{t('pages.notFoundTitle')}</h1>
      <p className="mt-3 text-ink-soft">{t('pages.notFoundBody')}</p>
      <Link to="/" className="mt-6 inline-block text-bhagwa hover:underline">
        {t('actions.backHome')}
      </Link>
    </div>
  );
}
