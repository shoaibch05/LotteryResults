// pages/HotNumberResult.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLottery } from "../context/LotteryContext";
import { getLotteryConfig } from "../config/lotteryConfig";
import { getAllPostsBycategory } from "../api/postApi";
import { formatDate, parseNumbers } from "../utils/utilityfun";
import UniversalCheckerTable from "../components/page_components/checker/CheckerTable";

const HotNumberResult = () => {
  const { slug } = useParams();
  const config = getLotteryConfig(slug);
  const { selectedMain, selectedSecondary, hasMultiplier, selectedRows } =
    useLottery();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format user numbers based on lottery type
  const formatUserNumbers = () => {
    if (config.isRowBased) {
      // For Win4 and Numbers - convert selectedRows object to array
      return {
        main: Object.values(selectedRows),
        secondary: null,
        multiplier: false,
        isRowBased: true,
      };
    } else {
      // For grid-based lotteries
      return {
        main: selectedMain,
        secondary: selectedSecondary,
        multiplier: hasMultiplier,
        isRowBased: false,
      };
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from API
        const data = await getAllPostsBycategory(slug);

        if (!data || data.length === 0) {
          setError("No results found");
          setResults([]);
          return;
        }

        // Filter only published results
        const publishedResults = data.filter(
          (item) => item.status === "published"
        );

        // Process and format results
        const formattedResults = [];

        publishedResults.forEach((item) => {
          const dateStr = formatDate(item.created_at);

          // Process Midday results if they exist
          if (item.Midday_Winnings) {
            const { numbers: middayNumbers, bonusNumber: middayBonus } =
              parseNumbers(item.Midday_Winnings);

            if (middayNumbers.length > 0) {
              formattedResults.push({
                date: `${dateStr} (Midday)`,
                numbers: middayNumbers,
                secondary: middayBonus,
                drawType: "midday",
                originalDate: item.created_at,
              });
            }
          }

          // Process Evening results if they exist
          if (item.Evening_Winnings) {
            const { numbers: eveningNumbers, bonusNumber: eveningBonus } =
              parseNumbers(item.Evening_Winnings);

            if (eveningNumbers.length > 0) {
              formattedResults.push({
                date: `${dateStr} (Evening)`,
                numbers: eveningNumbers,
                secondary: eveningBonus,
                drawType: "evening",
                originalDate: item.created_at,
              });
            }
          }

          // If no Midday/Evening fields exist (single draw lotteries like Powerball)
          // Look for generic number field or handle differently
          if (
            !item.Midday_Winnings &&
            !item.Evening_Winnings &&
            item.Winnings
          ) {
            const { numbers, bonusNumber } = parseNumbers(item.Winnings);

            if (numbers.length > 0) {
              formattedResults.push({
                date: dateStr,
                numbers: numbers,
                secondary: bonusNumber,
                drawType: "single",
                originalDate: item.created_at,
              });
            }
          }
        });

        // Sort by date (most recent first) and limit to 30 results
        const sortedResults = formattedResults
          .sort((a, b) => new Date(b.originalDate) - new Date(a.originalDate))
          .slice(0, 30);

        setResults(sortedResults);
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Failed to load results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [slug]);

  const userNumbers = formatUserNumbers();

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <p className="text-gray-600">No results available for this lottery.</p>
      </div>
    );
  }

  return (
    <div>
      <UniversalCheckerTable
        userNumbers={userNumbers}
        results={results}
        config={config}
      />
    </div>
  );
};

export default HotNumberResult;
