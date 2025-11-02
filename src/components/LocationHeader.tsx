import { MapPin } from "lucide-react";
function LocationHeader({ location, weatherData }: any) {
  return (
    <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
      <div className="flex items-center justify-center gap-2 mb-3">
        <MapPin className="text-blue-500" size={28} />
        <h2 className="text-3xl font-bold text-gray-800">{location}</h2>
      </div>
      <div className="flex items-center justify-center gap-4 mb-2">
        <img
          src={weatherData.weather_icons[0]}
          alt="weather"
          className="w-16 h-16"
        />
        <div>
          <p className="text-2xl font-semibold text-gray-700">
            {weatherData.weather_descriptions[0]}
          </p>
          <p className="text-gray-500">
            Observed at {weatherData.observation_time}
          </p>
        </div>
      </div>
    </div>
  );
}
export default LocationHeader;
