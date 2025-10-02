// src/components/ResultDetailHeader.jsx
import { memo } from "react";

const ResultDetailHeader = ({ date }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold ">
        Numbers Draw Results for {date}
      </h1>
      <p className="text-gray-700 mt-2">
        The results from the {date} Numbers Draw can be found below. You can see
        the winning numbers from both the midday and evening draws along with a
        breakdown of winners in each category.
      </p>
    </div>
  );
};

export default memo(ResultDetailHeader);
