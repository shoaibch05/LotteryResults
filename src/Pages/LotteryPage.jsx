// src/pages/LotteryPage.jsx
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getLotteryBySlug } from "../api/lotteryApi";
// import { T } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

const LotteryHero = lazy(() =>
  import("../components/page_components/LotteryHero")
);
// import LotteryHero from "../components/page_components/LotteryHero";
const LotteryHistory = lazy(() =>
  import("../components/page_components/LotteryHistory")
);
const HowToPlay = lazy(() => import("../components/page_components/HowtoPlay"));
const TopWinners = lazy(() =>
  import("../components/page_components/TopWinners")
);
const LotteryFAQs = lazy(() =>
  import("../components/page_components/LotteryFAQs")
);

const LotteryPage = () => {
  const { slug } = useParams();
  const [lottery, setLottery] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [lotteries, setLotteries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getLotteryBySlug(slug);
        setLottery(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [slug]);

  // IntersectionObserver-based deferred section renderer
  const LazySection = ({ heightClass = "h-56", children }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const node = ref.current;
      if (!node || visible) return;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      obs.observe(node);
      return () => obs.disconnect();
    }, [visible]);

    return (
      <div ref={ref}>
        {visible ? (
          children
        ) : (
          <div className={`${heightClass} bg-gray-100 rounded mb-8`} />
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-28 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="h-64 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="h-56 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="h-56 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="h-40 bg-gray-100 rounded mb-8 animate-pulse" />
      </div>
    );
  }

  // Not found state
  if (!lottery) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Lottery Not Found
          </h2>
          <p className="text-gray-600">
            The lottery "{slug}" could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Suspense
        fallback={<div className="h-28 bg-white rounded mb-8 animate-pulse" />}
      >
        <LotteryHero title={lottery.NAME} description={lottery.description} />
      </Suspense>

      <LazySection heightClass="h-64">
        <Suspense
          fallback={
            <div className="h-64 bg-gray-100 rounded mb-8 animate-pulse" />
          }
        >
          <LotteryHistory history={lottery.History} />
        </Suspense>
      </LazySection>

      <LazySection heightClass="h-56">
        <Suspense
          fallback={
            <div className="h-56 bg-gray-100 rounded mb-8 animate-pulse" />
          }
        >
          <HowToPlay steps={lottery.How_To_Play} />
        </Suspense>
      </LazySection>

      <LazySection heightClass="h-56">
        <Suspense
          fallback={
            <div className="h-56 bg-gray-100 rounded mb-8 animate-pulse" />
          }
        >
          <TopWinners winners={lottery.Winners} />
        </Suspense>
      </LazySection>
    </div>
  );
};

export default LotteryPage;
