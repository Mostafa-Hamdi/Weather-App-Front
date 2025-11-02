import AirCard from "./AirCard";
import { Wind } from "lucide-react";

function AirQualityDetails({ airQuality }: any) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Wind className="text-green-600" size={24} />
        Air Quality Details
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <AirCard heading="CO" stats={airQuality.co} />
        <AirCard heading="NO₂" stats={airQuality.no2} />
        <AirCard heading="O₃" stats={airQuality.o3} />
        <AirCard heading="SO₂" stats={airQuality.so2} />
        <AirCard heading="PM2.5" stats={airQuality.pm2_5} />
        <AirCard heading="PM10" stats={airQuality.pm10} />
      </div>
    </div>
  );
}
export default AirQualityDetails;
