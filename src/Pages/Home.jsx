// src/Pages/Home.jsx
import React, { Suspense, useMemo } from "react";

const GameCard = React.lazy(() => import("../components/GameCard"));

import PowerballLogo from "../assets/powerball-logo-white.svg";
import MegaMillions from "../assets/mega-millions-logo-white.svg";
import LatestPosts from "../components/page_components/RecentsPosts";
import { useAds } from "../context/AdProvider";
import AdBanner from "../components/AdBanner";

// Preload critical images
const preloadImages = () => {
  if (typeof window !== "undefined") {
    [PowerballLogo, MegaMillions].forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }
};

// Preload on component module load
preloadImages();

const Home = () => {
  const { getAdsFor } = useAds();
  const adsUnderHeader = getAdsFor("homepage", "underHeader");
  const adsUnderGameCards = getAdsFor("homepage", "underGameCards");
  const adsBottom = getAdsFor("homepage", "bottom");
  // Memoize draws data to prevent unnecessary re-renders
  const draws = useMemo(
    () => [
      {
        id: 1,
        headerTitle: "Mega Millions Results",
        headerLogo: MegaMillions,
        headerbgColor: "bg-blue-500",
        date: "September 24th 2025",
        midday: [1, 6, 27],
        evening: [47, 53, 56],
        MidBonusBall: 37,
        EveBonusBall: 56,
        jackpot: "$4.3 Million",
        nextDrawDate: "2025-09-28T19:00:00",
        payoutLink: "#",
        primaryBtnText: "More New York Lotto Results",
      },
      {
        id: 2,
        headerTitle: "PowerBall Results",
        headerLogo: PowerballLogo,
        headerbgColor: "bg-red-600",
        date: "October 2nd 2025",
        midday: [5, 12, 19],
        evening: [19, 34, 45],
        MidBonusBall: 19,
        EveBonusBall: 45,
        jackpot: "$500 Million",
        nextDrawDate: "2025-10-05T22:00:00",
        payoutLink: "#",
        primaryBtnText: "View PowerBall Results",
      },
    ],
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Intro text - Added content-visibility for performance */}
      <div className="bg-white shadow-md p-6 rounded-lg mb-8 cv-auto">
        <h1 className="text-2xl font-bold mb-2">New York Lottery Results</h1>
        <p className="text-gray-700">
          These are the latest New York Lottery Results from the biggest and
          most profitable lottery in the entire USA. You'll find results for all
          the NY Lotto games including Win 4, Numbers, Quick Draw, Pick 10, Take
          5 and, of course, not forgetting the state's very own New York Lotto.
        </p>
        <p className="text-gray-700 mt-4">
          Of course, no list of winning numbers would be complete without
          including the massive jackpot games offered by Powerball, MegaMillions
          and Cash4Life. NYLottery.org includes the results for these great
          lottery games along with prize breakdowns, draw statistics, latest
          jackpots and game information.
        </p>
        <p className="text-gray-700 mt-4">
          Join millions of Americans and fellow New Yorkers who check their
          results here every week, by bookmarking this page now.
        </p>
      </div>

      {adsUnderHeader.map((a) => (
        <AdBanner key={a.slot} slot={a.slot} height={120} />
      ))}

      {/* Cards with optimized suspense fallback */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Suspense
          fallback={
            <div className="space-y-6">
              {draws.map((draw) => (
                <div
                  key={draw.id}
                  className="bg-white shadow-md rounded-md overflow-hidden border border-gray-200 min-h-[400px] animate-pulse"
                >
                  <div className="bg-gray-300 h-12"></div>
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          {draws.map((draw) => (
            <GameCard key={draw.id} {...draw} />
          ))}
        </Suspense>
      </div>
      {adsUnderGameCards.map((a) => (
        <AdBanner key={a.slot} slot={a.slot} height={120} />
      ))}
      <LatestPosts />
      {adsBottom.map((a) => (
        <AdBanner key={a.slot} slot={a.slot} height={120} />
      ))}
    </div>
  );
};

export default React.memo(Home);
