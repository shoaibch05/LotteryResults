// src/pages/ResultDetail.jsx

import dayjs from "dayjs";
import NumbersDisplay from "../components/page_components/NumberDisplay";
import PrizeBreakdownTable from "../components/page_components/PrizeBreakDown";
import ResultDetailHeader from "../components/page_components/ResultDetailHeader";
import JackpotBanner from "../components/page_components/JackpotBanner";
import { getPostById, getPrizeBreakDownByPostandDraw } from "../api/postApi";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/utilityfun";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import AdBanner from "../components/AdBanner";
import { useAds } from "../context/AdProvider";

const ResultsEveningDetail = () => {
  const { getAdsFor } = useAds();
  const adsUnderHeader = getAdsFor("EveningDetail", "underHeader");

  const adsBottom = getAdsFor("EveningDetail", "bottom");

  const { id } = useParams();
  const draw = "Evening";
  const [middayBreakdown, setMiddayBreakdown] = useState([]);
  const [eveningBreakdown, setEveningBreakdown] = useState([]);
  const [postData, setPostData] = useState(null); // Initialize as null, not undefined
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreakdowns = async () => {
      try {
        const data = await getPrizeBreakDownByPostandDraw(id, draw);
        const resultDetails = await getPostById(id);

        setPostData(resultDetails);

        // Separate data for each draw type
        const midday = data.prizes.filter((p) => p.draw_type === "midday");
        const evening = data.prizes.filter((p) => p.draw_type === "evening");

        setMiddayBreakdown(midday);
        setEveningBreakdown(evening);
        setTotals(data.totals);
      } catch (err) {
        console.error("Error fetching prize breakdowns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakdowns();
  }, [id]);

  // Only construct SEO data AFTER postData is loaded
  const seoData = postData
    ? {
        canonicalUrl: `${window.location.origin}/${postData.category}/results/${postData.date}`,
        seoTitle:
          postData.meta_title ||
          `${postData.title} - ${postData.category} Results`,
        seoDescription:
          postData.meta_desc ||
          `Check the complete ${postData.category} lottery results for ${postData.date}. View winning numbers, prize breakdown, and winner statistics.`,
        seoKeywords: `${postData.category}, lottery results, winning numbers, ${postData.date}, prize breakdown, lottery winners`,
        publishedTime: new Date(postData.created_at).toISOString(),
        modifiedTime: postData.updated_at
          ? new Date(postData.updated_at).toISOString()
          : null,
        section: postData.category,
        tags: [postData.category, "lottery", "results", "winning numbers"],
      }
    : {
        // Default values while loading
        canonicalUrl: window.location.href,
        seoTitle: "Lottery Results",
        seoDescription: "Check lottery results and winning numbers.",
        seoKeywords: "lottery, results, winning numbers",
        publishedTime: null,
        modifiedTime: null,
        section: "lottery",
        tags: ["lottery", "results"],
      };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-28 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="h-64 bg-gray-100 rounded mb-8 animate-pulse" />
        <div className="h-56 bg-gray-100 rounded mb-8 animate-pulse" />
      </div>
    );
  }

  // Show error state
  if (!postData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Results Not Found
          </h2>
          <p className="text-gray-600">
            The lottery results could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={seoData.seoTitle}
        description={seoData.seoDescription}
        type="article"
        canonical={seoData.canonicalUrl}
        keywords={seoData.seoKeywords} // Add this!
        author="Lottery Results Hub"
        publishedTime={seoData.publishedTime}
        modifiedTime={seoData.modifiedTime}
        section={seoData.section}
        tags={seoData.tags}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
        <ResultDetailHeader
          title={postData?.title}
          description={postData?.content}
        />

        {adsUnderHeader.map((a) => (
          <AdBanner key={a.slot} slot={a.slot} height={120} />
        ))}
        {/* Numbers Section */}
        <div>
          <div className="bg-blue-950 text-white px-4 rounded-t">
            <h2 className="text-xl font-semibold mb-4">
              {formatDate(postData?.created_at)}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row w-full justify-center mb-8">
            <NumbersDisplay
              title="Midday"
              numbers={postData?.Midday_Winnings}
              winners={totals.midday}
            />
          </div>
        </div>

        <JackpotBanner
          title="Next Jackpot"
          amount="$5 Million"
          nextDraw={dayjs().add(5, "hour").add(20, "minute").add(45, "second")}
          bgColor={"bg-blue-900"}
        />

        {/* Prize Breakdown Section */}
        <div className="flex flex-col md:flex-row w-full justify-center gap-6">
          <PrizeBreakdownTable
            title="Midday"
            data={middayBreakdown}
            totals={totals.midday}
          />
        </div>

        {adsBottom.map((a) => (
          <AdBanner key={a.slot} slot={a.slot} height={120} />
        ))}
      </div>
    </>
  );
};

export default ResultsEveningDetail;
