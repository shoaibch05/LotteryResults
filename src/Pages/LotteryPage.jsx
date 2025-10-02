// src/pages/LotteryPage.jsx
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
const LotteryHero = lazy(() => import("../components/page_components/LotteryHero"));
const LotteryHistory = lazy(() => import("../components/page_components/LotteryHistory"));
const HowToPlay = lazy(() => import("../components/page_components/HowtoPlay"));
const TopWinners = lazy(() => import("../components/page_components/TopWinners"));
const LotteryFAQs = lazy(() => import("../components/page_components/LotteryFAQs"));

const LotteryPage = () => {
  const { slug } = useParams();
  const [lottery, setLottery] = useState(null);

  // Defer loading of full lottery data to reduce initial JS and render cost
  useEffect(() => {
    let isMounted = true;
    import("../mocks/lotteriesData").then((mod) => {
      if (!isMounted) return;
      const data = mod.default || mod;
      setLottery(data[slug]);
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);
  

  if (lottery === undefined) return <div className="p-10 text-center">Lottery not found.</div>;

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
      <div ref={ref} className="cv-auto">
        {visible ? children : <div className={`${heightClass} bg-gray-100 rounded mb-8`} />}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Suspense fallback={<div className="h-28 bg-gray-100 rounded mb-8" />}> 
        <LotteryHero title={lottery.name} description={lottery.description} />
      </Suspense>

      <LazySection heightClass="h-64">
        <Suspense fallback={<div className="h-64 bg-gray-100 rounded mb-8" />}> 
          <LotteryHistory history={lottery.history} />
        </Suspense>
      </LazySection>

      <LazySection heightClass="h-56">
        <Suspense fallback={<div className="h-56 bg-gray-100 rounded mb-8" />}> 
          <HowToPlay steps={lottery.howToPlay} />
        </Suspense>
      </LazySection>

      <LazySection heightClass="h-56">
        <Suspense fallback={<div className="h-56 bg-gray-100 rounded mb-8" />}> 
          <TopWinners winners={lottery.winners} />
        </Suspense>
      </LazySection>

      <LazySection heightClass="h-40">
        <Suspense fallback={<div className="h-40 bg-gray-100 rounded mb-8" />}> 
          <LotteryFAQs faqs={lottery.faqs} />
        </Suspense>
      </LazySection>
    </div>
  );
};

export default LotteryPage;
