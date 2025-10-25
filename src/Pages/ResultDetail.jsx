// src/pages/LotteryResultsPage.jsx

import dayjs from "dayjs";
import NumbersDisplay from "../components/page_components/NumberDisplay";
import PrizeBreakdownTable from "../components/page_components/PrizeBreakDown";
import ResultDetailHeader from "../components/page_components/ResultDetailHeader";
import JackpotBanner from "../components/page_components/JackpotBanner";
import { getPostById, getPrizeBreakDownByPost } from "../api/postApi";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/utilityfun";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO";

const LotteryResultsPage = () => {
  const { id } = useParams();
  const [middayBreakdown, setMiddayBreakdown] = useState([]);
  const [eveningBreakdown, setEveningBreakdown] = useState([]);
  const [postData, setPostData] = useState();
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const fetchBreakdowns = async () => {
      try {
        const data = await getPrizeBreakDownByPost(id); // Replace '1' with actual postId
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
      }
    };

    fetchBreakdowns();
  }, []);

  // Construct canonical URL
  const canonicalUrl = `${window.location.origin}/${category}/results/${date}`;

  // Prepare SEO data
  const seoTitle =
    post.meta_title || `${post.title} - ${post.category} Results`;
  const seoDescription =
    post.meta_desc ||
    `Check the complete ${post.category} lottery results for ${formattedDate}. View winning numbers, prize breakdown, and winner statistics.`;

  // Keywords for SEO
  const seoKeywords = `${post.category}, lottery results, winning numbers, ${formattedDate}, prize breakdown, lottery winners`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        type="article"
        canonical={canonicalUrl}
        keywords={seoKeywords}
        author="Lottery Results Hub"
        publishedTime={new Date(post.created_at).toISOString()}
        modifiedTime={
          post.updated_at ? new Date(post.updated_at).toISOString() : null
        }
        section={post.category}
        tags={[post.category, "lottery", "results", "winning numbers"]}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50">
        <ResultDetailHeader
          title={postData?.title}
          description={postData?.content}
        />

        {/* Numbers Section */}
        <div>
          <div className="bg-blue-950 text-white px-4 rounded-t">
            <h2 className="text-xl font-semibold mb-4">
              {formatDate(postData?.created_at)}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row mb-8">
            <NumbersDisplay
              title="Midday"
              numbers={postData?.Midday_Winnings}
              winners={totals.midday}
            />
            <NumbersDisplay
              title="Evening"
              numbers={postData?.Evening_Winnings}
              winners={totals.evening}
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
        <div className="flex flex-col md:flex-row gap-6">
          <PrizeBreakdownTable
            title="Midday"
            data={middayBreakdown}
            totals={totals.midday}
          />
          <PrizeBreakdownTable
            title="Evening"
            data={eveningBreakdown}
            totals={totals.evening}
          />
        </div>
      </div>
    </>
  );
};

export default LotteryResultsPage;
