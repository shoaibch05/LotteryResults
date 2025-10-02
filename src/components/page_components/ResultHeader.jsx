import { memo } from "react";

const ResultsHeader = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default memo(ResultsHeader);
