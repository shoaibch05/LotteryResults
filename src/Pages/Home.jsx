// src/Pages/Home.jsx
import React, { Suspense, useEffect, useState } from "react";

const GameCard = React.lazy(() => import("../components/GameCard"));

import PowerballLogo from "../assets/powerball-logo-white.svg";
import MegaMillions from "../assets/mega-millions-logo-white.svg";
import LatestPosts from "../components/page_components/RecentsPosts";
import { useAds } from "../context/AdProvider";

import AdBanner from "../components/AdBanner";
import { getPostBycategory } from "../api/postApi";
import { getLatestJackpotByCategory } from "../api/jackpotApi";
import { formatDate, parseNumbers } from "../utils/utilityfun";
import SEO from "../components/SEO";

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

preloadImages();

// Helper function to parse lottery numbers
// Checks if last item is a key-value pair (contains ":"), if so treats it as bonus

const Home = () => {
  const { getAdsFor } = useAds();
  const adsUnderHeader = getAdsFor("homepage", "underHeader");
  const adsUnderGameCards = getAdsFor("homepage", "underGameCards");
  const adsBottom = getAdsFor("homepage", "bottom");

  const [megaData, setMegaData] = useState(null);
  const [powerData, setPowerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch MegaMillions data
        const [megaPost, megaJackpot] = await Promise.all([
          getPostBycategory("megamillions"),
          getLatestJackpotByCategory("megamillions"),
        ]);

        if (megaPost && megaPost[0]) {
          const post = megaPost[0];
          const midday = parseNumbers(post.Midday_Winnings);
          const evening = parseNumbers(post.Evening_Winnings);

          setMegaData({
            id: 1,
            headerTitle: "Mega Millions Results",
            headerLogo: MegaMillions,
            headerbgColor: "bg-blue-500",
            date: formatDate(post.created_at),
            midday: midday.numbers,
            evening: evening.numbers,
            MidBonusBall: midday.bonusNumber,
            EveBonusBall: evening.bonusNumber,
            jackpot: megaJackpot[0].amount || "N/A",
            nextDrawDate: megaJackpot[0].draw_date || null,
            payoutLink: `/results/${post.id}`,
            primaryBtnText: "More Mega Millions Results",
          });
        }

        // Fetch Powerball data
        const [powerPost, powerJackpot] = await Promise.all([
          getPostBycategory("powerball"),
          getLatestJackpotByCategory("powerball"),
        ]);

        if (powerPost && powerPost[0]) {
          const post = powerPost[0];
          const midday = parseNumbers(post.Midday_Winnings);
          const evening = parseNumbers(post.Evening_Winnings);

          setPowerData({
            id: 2,
            headerTitle: "PowerBall Results",
            headerLogo: PowerballLogo,
            headerbgColor: "bg-red-600",
            date: formatDate(post.created_at),
            midday: midday.numbers,
            evening: evening.numbers,
            MidBonusBall: midday.bonusNumber,
            EveBonusBall: evening.bonusNumber,
            jackpot: powerJackpot[0].amount || "N/A",
            nextDrawDate: powerJackpot[0].draw_date || null,
            payoutLink: `/results/${post.id}`,
            primaryBtnText: "View PowerBall Results",
          });
        }
      } catch (error) {
        console.error("Error fetching lottery data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array - runs once on mount

  const draws = [megaData, powerData].filter(Boolean);
  const seoTitle =
    "New York Lottery Results - Latest Winning Numbers & Jackpots";
  const seoDescription =
    "Get the latest New York Lottery results including Powerball, Mega Millions, Lotto, Take 5, Numbers, Win 4, and more. Check winning numbers, jackpots, and prize breakdowns updated daily.";
  const seoKeywords =
    "New York lottery, lottery results, winning numbers, Powerball, Mega Millions, NY Lotto, jackpot, prize breakdown";

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        type="website"
        canonical={window.location.origin}
        keywords={seoKeywords}
        author="Lottery Results Hub"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Intro text */}
        <div className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h1 className="text-2xl font-bold mb-2">New York Lottery Results</h1>
          <p className="text-gray-700">
            These are the latest New York Lottery Results from the biggest and
            most profitable lottery in the entire USA. You'll find results for
            all the NY Lotto games including Win 4, Numbers, Quick Draw, Pick
            10, Take 5 and, of course, not forgetting the state's very own New
            York Lotto.
          </p>
          <p className="text-gray-700 mt-4">
            Of course, no list of winning numbers would be complete without
            including the massive jackpot games offered by Powerball,
            MegaMillions and Cash4Life. NYLottery.org includes the results for
            these great lottery games along with prize breakdowns, draw
            statistics, latest jackpots and game information.
          </p>
          <p className="text-gray-700 mt-4">
            Join millions of Americans and fellow New Yorkers who check their
            results here every week, by bookmarking this page now.
          </p>
        </div>

        {adsUnderHeader.map((a) => (
          <AdBanner key={a.slot} slot={a.slot} height={120} />
        ))}

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {loading ? (
            // Loading skeleton
            <div className="space-y-6 md:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div
                    key={i}
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
            </div>
          ) : draws.length > 0 ? (
            <Suspense fallback={<div>Loading cards...</div>}>
              {draws.map((draw) => (
                <GameCard key={draw.id} {...draw} />
              ))}
            </Suspense>
          ) : (
            <div className="md:col-span-2 text-center py-8 text-gray-500">
              No lottery results available at this time.
            </div>
          )}
        </div>

        {adsUnderGameCards.map((a) => (
          <AdBanner key={a.slot} slot={a.slot} height={120} />
        ))}

        <LatestPosts />

        {adsBottom.map((a) => (
          <AdBanner key={a.slot} slot={a.slot} height={120} />
        ))}
      </div>
    </>
  );
};

export default React.memo(Home);
