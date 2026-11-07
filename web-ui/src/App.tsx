import { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { WelcomeLoader } from './components/WelcomeLoader';
import { catalogs } from './content/catalogs';
import { shouldShowWelcome } from './lib/welcome';
import { CatalogDetailPage } from './pages/CatalogDetailPage';
import { CatalogPage } from './pages/CatalogPage';
import { ContactPage } from './pages/ContactPage';
import { GeneralPage } from './pages/GeneralPage';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { WorksPage } from './pages/WorksPage';

export default function App() {
  const [ready, setReady] = useState(() => !shouldShowWelcome());
  const [showLoader, setShowLoader] = useState(() => shouldShowWelcome());

  const handleLoaderDone = useCallback(() => {
    setShowLoader(false);
    setReady(true);
  }, []);

  return (
    <>
      {showLoader && <WelcomeLoader onDone={handleLoaderDone} />}
      {ready && (
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="works" element={<WorksPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="contact" element={<ContactPage />} />
              {catalogs.map((catalog) => (
                <Route
                  key={catalog.path}
                  path={catalog.path.slice(1)}
                  element={<CatalogPage catalogId={catalog.id} />}
                />
              ))}
              {catalogs.map((catalog) => (
                <Route
                  key={`${catalog.path}-detail`}
                  path={`${catalog.path.slice(1)}/:slug`}
                  element={<CatalogDetailPage catalogId={catalog.id} />}
                />
              ))}
              <Route path="pages/:slug" element={<GeneralPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
