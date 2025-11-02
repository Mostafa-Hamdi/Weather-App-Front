import TemperatureCard from "./TemperatureCard";
import { Thermometer } from "lucide-react";

function TemperatureCards({ weatherData }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <TemperatureCard
        label="Temperature"
        value={weatherData.temperature}
        gradient="from-orange-400 to-red-500"
      />
      <TemperatureCard
        label="Feels Like"
        value={weatherData.feelslike}
        gradient="from-purple-400 to-pink-500"
      />
    </div>
  );
}
export default TemperatureCards;
