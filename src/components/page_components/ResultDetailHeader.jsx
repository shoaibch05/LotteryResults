// src/components/ResultDetailHeader.jsx
import { memo } from "react";

const ResultDetailHeader = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold ">{title}</h1>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  );
};

export default memo(ResultDetailHeader);
