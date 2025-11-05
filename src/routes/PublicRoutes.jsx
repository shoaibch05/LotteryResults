import { memo, Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TimerProvider } from "../context/TimerContext";
import SubscriptionForm from "../components/SubscriptionForm";
import LotteryChecker from "../components/page_components/checker/LotteryChecker";
import Sitemap from "../Pages/StaticPages/Sitemap";
import About from "../Pages/StaticPages/About";
import Disclaimer from "../Pages/StaticPages/Disclaimer";
import Privacy from "../Pages/StaticPages/Privacy";
import ResultsMiddayDetail from "../Pages/ResultsMiddayDetail";
import ResultsEveningDetail from "../Pages/ResultsEveningDetail";

// Lazy load public pages with better chunk names
const Home = lazy(() => import(/* webpackChunkName: "home" */ "../Pages/Home"));
const LotteryPage = lazy(() =>
  import(/* webpackChunkName: "lottery" */ "../Pages/LotteryPage")
);
const ResultsOverview = lazy(() =>
  import(/* webpackChunkName: "results" */ "../Pages/ResultsOverview")
);
const ResultDetail = lazy(() =>
  import(/* webpackChunkName: "detail" */ "../Pages/ResultDetail")
);
const MiddayResults = lazy(() =>
  import(/* webpackChunkName: "midday" */ "../Pages/MiddayResults")
);
const EveningResults = lazy(() =>
  import(/* webpackChunkName: "evening" */ "../Pages/EveningResults")
);

const HotNumberResult = lazy(() =>
  import(/* webpackChunkName: "hot-check" */ "../Pages/HotNumberResult")
);
const UniversalFAQ = lazy(() => import("../Pages/StaticPages/Faqs"));

// Better loading component with fixed height to prevent shifts
const LoadingFallback = () => (
  <div
    className="flex items-center justify-center"
    style={{ minHeight: "600px" }} // Reserve space during loading
  >
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const PublicRoutes = memo(() => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-gray-100"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <TimerProvider>
        <Header />
        {showModal && <SubscriptionForm onClose={() => setShowModal(false)} />}

        <main
          style={{
            flex: "1 0 auto",
            minHeight: "600px", // CRITICAL: Reserve minimum space
            width: "100%",
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:slug" element={<LotteryPage />} />
              <Route path="/:slug/info" element={<LotteryPage />} />
              <Route path="/:slug/results" element={<ResultsOverview />} />
              <Route path="/:slug/results/:date" element={<ResultDetail />} />
              <Route path="/:slug/midday" element={<MiddayResults />} />
              <Route
                path="/:slug/midday/:date"
                element={<ResultsMiddayDetail />}
              />
              <Route path="/:slug/evening" element={<EveningResults />} />
              <Route
                path="/:slug/evening/:date"
                element={<ResultsEveningDetail />}
              />
              <Route path="/:slug/HotNumbers" element={<LotteryChecker />} />
              <Route
                path="/:slug/HotNumbers/checkNumbers"
                element={<HotNumberResult />}
              />
              <Route path="/faqs" element={<UniversalFAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/sitemap" element={<Sitemap />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </TimerProvider>
    </div>
  );
});

PublicRoutes.displayName = "PublicRoutes";

export default PublicRoutes;
