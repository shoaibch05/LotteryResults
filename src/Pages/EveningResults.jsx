import React, { useEffect, useState } from "react";
import ResultsHeader from "../components/page_components/ResultHeader";
import JackpotBanner from "../components/page_components/JackpotBanner";
import DateRangeSelector from "../components/page_components/DateRangeSelector";
import ResultsTable from "../components/page_components/ResultsTable";
import { useLocation } from "react-router-dom";
import { getAllEveningresultsBycategory } from "../api/postApi";
import { formatDate, parseNumbers } from "../utils/utilityfun";
import { getLotteryBySlug } from "../api/lotteryApi";

const EveningResults = () => {
  const [category, setCategory] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const location = useLocation();

  const handleFilter = (fromDate, toDate) => {
    if (!fromDate || !toDate) {
      setFilteredResults([]);
      setIsFiltered(false);
      return;
    }

    const filtered = results.filter((r) => {
      const resultDate = dayjs(r.date, "MMMM D, YYYY");
      return (
        resultDate.isAfter(dayjs(fromDate).subtract(1, "day")) &&
        resultDate.isBefore(dayjs(toDate).add(1, "day"))
      );
    });

    setFilteredResults(filtered);
    setIsFiltered(true);
  };

  // Extract slug from URL
  const pathParts = location.pathname.split("/").filter(Boolean);
  const slug = pathParts.length > 0 ? pathParts[0].toLowerCase() : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEveningresultsBycategory(slug);
        const formattedResults = data.map((item) => ({
          id: item.id,
          date: formatDate(item.created_at),
          midday: parseNumbers(item.Midday_Winnings),
          evening: parseNumbers(item.Evening_Winnings),
        }));

        setResults(formattedResults);

        const categoryData = await getLotteryBySlug(slug);
        setCategory(categoryData);
      } catch (error) {
        console.log("There was something wrong!", error);
      }
    };
    fetchData();
  }, [slug]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page header */}
      <ResultsHeader
        title={
          category ? `${category.NAME} Evening Results` : "Evening Results"
        }
        description={`${
          category?.NAME || "Lottery"
        } Results are shown here shortly after each draw takes place. Make sure you refresh the page to see the very latest result.`}
      />

      {/* Jackpot Banner */}
      <JackpotBanner />

      {/* Date Range Filter */}
      <DateRangeSelector onFilter={handleFilter} />

      {/* Results Table */}
      <ResultsTable results={isFiltered ? filteredResults : results} hasBonus />

      {/* Past Winning Button */}
      {/* <div className="flex justify-center mt-6">
        <button className="bg-blue-700 text-white px-6 py-3 rounded font-semibold">
          Past Winning Numbers
        </button>
      </div> */}
    </div>
  );
};

export default EveningResults;
