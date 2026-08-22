import { useCallback, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { WelcomeLoader } from './components/WelcomeLoader';
import { shouldShowWelcome } from './lib/welcome';
import { ContactPage } from './pages/ContactPage';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { PoojaDetailPage } from './pages/PoojaDetailPage';
import { PoojasPage } from './pages/PoojasPage';
import { ServicesPage } from './pages/ServicesPage';
import { StayDetailPage } from './pages/StayDetailPage';
import { StaysPage } from './pages/StaysPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { ToursPage } from './pages/ToursPage';
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
              <Route path="tours" element={<ToursPage />} />
              <Route path="tours/:slug" element={<TourDetailPage />} />
              <Route path="stays" element={<StaysPage />} />
              <Route path="stays/:slug" element={<StayDetailPage />} />
              <Route path="poojas" element={<PoojasPage />} />
              <Route path="poojas/:slug" element={<PoojaDetailPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
