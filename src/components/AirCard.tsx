interface AirCardProps {
  heading: string;
  stats: number;
}

function AirCard({ heading, stats }: AirCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="text-sm text-gray-600 font-medium mb-1">{heading}</div>
      <div className="text-2xl font-bold text-gray-800">
        {typeof stats === "number" ? stats.toFixed(1) : "N/A"}
      </div>
      <div className="text-xs text-gray-500 mt-1">μg/m³</div>
    </div>
  );
}
export default AirCard;
