import { memo, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Lazy load public pages with better chunk names
const Home = lazy(() => import(/* webpackChunkName: "home" */ '../Pages/Home'));
const LotteryPage = lazy(() => import(/* webpackChunkName: "lottery" */ '../Pages/LotteryPage'));
const ResultsOverview = lazy(() => import(/* webpackChunkName: "results" */ '../Pages/ResultsOverview'));
const ResultDetail = lazy(() => import(/* webpackChunkName: "detail" */ '../Pages/ResultDetail'));
const MiddayResults = lazy(() => import(/* webpackChunkName: "midday" */ '../Pages/MiddayResults'));
const EveningResults = lazy(() => import(/* webpackChunkName: "evening" */ '../Pages/EveningResults'));
const HotNumbersPage = lazy(() => import(/* webpackChunkName: "hot-numbers" */ '../Pages/HotNumberPage'));
const HotNumberResult = lazy(() => import(/* webpackChunkName: "hot-check" */ '../Pages/HotNumberResult'));
const UniversalFAQ = lazy(() => import('../Pages/StaticPages/Faqs'));

// Better loading component
const LoadingFallback = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const PublicRoutes = memo(() => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<LotteryPage />} />
            <Route path="/:slug/info" element={<LotteryPage />} />
            <Route path="/:slug/results" element={<ResultsOverview />} />
            <Route path="/:slug/results/:date" element={<ResultDetail />} />
            <Route path="/:slug/midday" element={<MiddayResults />} />
            <Route path="/:slug/evening" element={<EveningResults />} />
            <Route path="/:slug/HotNumbers" element={<HotNumbersPage />} />
            <Route path="/:slug/HotNumbers/checkNumbers" element={<HotNumberResult />} />
            <Route path="/faqs" element={<UniversalFAQ />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
});

PublicRoutes.displayName = 'PublicRoutes';

export default PublicRoutes;

