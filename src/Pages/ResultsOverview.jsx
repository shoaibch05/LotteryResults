import { useEffect, useState } from "react";
import DateRangeSelector from "../components/page_components/DateRangeSelector";
import JackpotBanner from "../components/page_components/JackpotBanner";
import ResultsHeader from "../components/page_components/ResultHeader";
import ResultsTable from "../components/page_components/ResultsTable";
import { getAllPostsBycategory } from "../api/postApi";
import { getLotteryBySlug } from "../api/lotteryApi";
import { formatDate, parseNumbers } from "../utils/utilityfun";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const ResultsOverview = () => {
  const [category, setcategory] = useState(null);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (fromDate, toDate) => {
    if (!fromDate || !toDate) {
      setFilteredResults([]);
      setIsFiltered(false);
      return;
    }

    const filtered = results.filter((r) => {
      const resultDate = dayjs(r.date, "MMMM D, YYYY"); // parse your formatted date
      return (
        resultDate.isAfter(dayjs(fromDate).subtract(1, "day")) &&
        resultDate.isBefore(dayjs(toDate).add(1, "day"))
      );
    });

    setFilteredResults(filtered);
    setIsFiltered(true);
  };

  const location = useLocation();

  // Extract slug from URL
  const pathParts = location.pathname.split("/").filter(Boolean);
  const slug = pathParts.length > 0 ? pathParts[0].toLowerCase() : null;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await getAllPostsBycategory(slug);
        const formattedResults = data.map((item) => ({
          id: item.id,
          date: formatDate(item.created_at),
          midday: parseNumbers(item.Midday_Winnings),
          evening: parseNumbers(item.Evening_Winnings),
        }));

        setResults(formattedResults);

        const categoryName = await getLotteryBySlug(slug);
        setcategory(categoryName);
      } catch (error) {
        console.log("There was something wrong!", error);
      }
    };
    if (slug) fetchdata();
  }, [slug]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <ResultsHeader
        title={`${category ? `${category.NAME} Results` : "Results"}`}
        description={`${
          category?.NAME || "Lottery"
        } Results are shown here shortly after each draw takes place. Make sure you refresh the page to see the very latest result.`}
      />

      {/* Jackpot Banner */}
      <JackpotBanner />

      {/* Date Range Filter */}
      <DateRangeSelector onFilter={handleFilter} />

      {/* Results Table */}
      <ResultsTable
        results={isFiltered ? filteredResults : results}
        hasBonus={true}
      />
    </div>
  );
};

export default ResultsOverview;
