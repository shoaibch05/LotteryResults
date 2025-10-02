import React from 'react'
import ResultsHeader from '../components/page_components/ResultHeader';
import JackpotBanner from '../components/page_components/JackpotBanner';
import DateRangeSelector from '../components/page_components/DateRangeSelector';
import ResultsTable from '../components/page_components/ResultsTable';

const MiddayResults = () => {
    const sampleResults = [
  {
    title: "Midday Results",
    date: "2025-09-26",
    midday: [2, 9, 0, 7],
    jackpot: "$5,000",
  },
  {
    title: "Midday Results",
    date: "2025-09-25",
    midday: [7, 8, 2, 1],
    jackpot: "$5,000",
  },
];
  return (
        <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page header */}
      <ResultsHeader
        title={sampleResults[0].title}
        description="New York Lotto Results are shown here shortly after each draw takes place. Make sure you refresh the page to see the very latest result."
      />

      {/* Jackpot Banner */}
      <JackpotBanner title="New York Lotto" amount="$4.5 Million" bgColor={"bg-blue-950"}/>

    
      

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
  )
}

export default MiddayResults;