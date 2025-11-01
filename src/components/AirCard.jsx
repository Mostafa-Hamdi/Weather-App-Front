import React from "react";

const AirCard = ({ heading, stats }) => {
  return (
    <div className="text-center">
      <div className="text-sm text-gray-600 mb-1">{heading}</div>
      <div className="text-lg font-bold text-gray-800">
        {parseFloat(stats).toFixed(1)}
      </div>
    </div>
  );
};

export default AirCard;
