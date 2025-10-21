import { useEffect, useState } from "react";
import DateRangeSelector from "../components/page_components/DateRangeSelector";
import JackpotBanner from "../components/page_components/JackpotBanner";
import ResultsHeader from "../components/page_components/ResultHeader";
import ResultsTable from "../components/page_components/ResultsTable";
import { getAllRecentsPosts } from "../api/postApi";
import { fetchCategorybyslug } from "../api/categoriesApi";

const sampleResults = [
  {
    date: "2025-09-26",
    midday: [2, 9, 0, 7],
    evening: [1, 3, 4, 9],
  },
  {
    date: "2025-09-25",
    midday: [7, 8, 2, 1],
    evening: [4, 0, 6, 3],
  },
];

const ResultsOverview = () => {
  const[results, setResults] = useState();
  const[category, setcategory] = useState();

  useEffect(() =>{
    const fetchdata = async() =>{
      try {
        const results = getAllRecentsPosts();
        setResults(results);
        const cat = fetchCategorybyslug()
      } catch (error) {
        
      }
    } 

  },[]

)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page header */}
      <ResultsHeader
        title="New York Lotto Results"
        description="New York Lotto Results are shown here shortly after each draw takes place. Make sure you refresh the page to see the very latest result."
      />

      {/* Jackpot Banner */}
      <JackpotBanner
        title="New York Lotto"
        amount="$4.5 Million"
        bgColor={"bg-red-950"}
      />

      {/* Date Range Filter */}
      <DateRangeSelector />

      {/* Results Table */}
      <ResultsTable results={sampleResults} />

      {/* Past Winning Button */}
      {/* <div className="flex justify-center mt-6">
        <button className="bg-blue-700 text-white px-6 py-3 rounded font-semibold">
          Past Winning Numbers
        </button>
      </div> */}
    </div>
  );
};

export default ResultsOverview;
