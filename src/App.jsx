import { useState } from "react";
import {
  Search,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Cloud,
  Sun,
  Moon,
  Sunrise,
  Sunset,
} from "lucide-react";
import AirCard from "./components/AirCard";

export default function WeatherApp() {
  const [address, setAddress] = useState(() => {
    try {
      const locationStorage = localStorage.getItem("location");
      return locationStorage ? JSON.parse(locationStorage) : "";
    } catch (err) {
      throw new Error("Invalid Location");
    }
  });
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(() => {
    try {
      const saved = localStorage.getItem("data");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://weather-app-backend-rkqo.onrender.com/weather?address=${address || "London"}`,
      );
      const data = await response.json();
      setWeatherData(data.data);
      localStorage.setItem("data", JSON.stringify(data.data));
      setLocation(address || "London");
      localStorage.setItem("location", address);
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const getAirQualityLevel = (index) => {
    const levels = {
      1: { label: "Good", color: "text-green-600", bg: "bg-green-100" },
      2: { label: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100" },
      3: {
        label: "Unhealthy for Sensitive",
        color: "text-orange-600",
        bg: "bg-orange-100",
      },
      4: { label: "Unhealthy", color: "text-red-600", bg: "bg-red-100" },
      5: {
        label: "Very Unhealthy",
        color: "text-purple-600",
        bg: "bg-purple-100",
      },
      6: { label: "Hazardous", color: "text-rose-600", bg: "bg-rose-100" },
    };
    return levels[index] || levels["1"];
  };

  // ✅ Safe access using optional chaining
  const airQuality = getAirQualityLevel(
    weatherData?.air_quality?.["us-epa-index"],
  );

  return (
    <div
      className={`min-h-screen ${
        weatherData?.is_day === "yes"
          ? "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
          : "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"
      } p-4 sm:p-6 lg:p-8 transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg flex items-center justify-center gap-3">
            {weatherData?.is_day === "yes" ? (
              <Sun className="animate-spin-slow" size={48} />
            ) : (
              <Moon className="animate-pulse" size={48} />
            )}
            Weather Forecast
          </h1>
          <p className="text-blue-100 text-lg">
            Real-time weather information and forecasts
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-6">
          <div className="mb-8">
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name or address"
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`cursor-pointer w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Search size={20} />
              {loading ? "Loading..." : "Get Weather Forecast"}
            </button>
          </div>

          {weatherData && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="text-blue-500" size={28} />
                  <h2 className="text-3xl font-bold text-gray-800">
                    {location}
                  </h2>
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

              {/* Temperature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl opacity-90 font-medium">
                      Temperature
                    </span>
                    <Thermometer size={32} className="animate-pulse" />
                  </div>
                  <div className="text-7xl font-bold mb-2">
                    {weatherData.temperature}°
                  </div>
                  <div className="text-lg opacity-90">Celsius</div>
                </div>

                <div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl opacity-90 font-medium">
                      Feels Like
                    </span>
                    <Thermometer size={32} className="animate-pulse" />
                  </div>
                  <div className="text-7xl font-bold mb-2">
                    {weatherData.feelslike}°
                  </div>
                  <div className="text-lg opacity-90">Celsius</div>
                </div>
              </div>

              {/* Weather Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-100">
                  <Droplets className="text-cyan-600 mb-3" size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Humidity
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {weatherData.humidity}%
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                  <Wind className="text-green-600 mb-3" size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Wind Speed
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {weatherData.wind_speed}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    km/h {weatherData.wind_dir}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <Cloud className="text-blue-600 mb-3" size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Cloud Cover
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {weatherData.cloudcover}%
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-100">
                  <Gauge className="text-purple-600 mb-3" size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Pressure
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {weatherData.pressure}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">mb</div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-5 border border-amber-100">
                  <Eye className="text-amber-600 mb-3" size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Visibility
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {weatherData.visibility}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">km</div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-5 border border-rose-100">
                  <Sun className="text-rose-600 mb-3" size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    UV Index
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {weatherData.uv_index}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-100">
                  <Cloud className="text-indigo-600 mb-3" size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Precipitation
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {weatherData.precip}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">mm</div>
                </div>

                <div
                  className={`${airQuality.bg} rounded-xl p-5 border border-gray-200`}
                >
                  <Wind className={`${airQuality.color} mb-3`} size={28} />
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    Air Quality
                  </div>
                  <div className={`text-2xl font-bold ${airQuality.color}`}>
                    {airQuality.label}
                  </div>
                </div>
              </div>

              {/* Sun & Moon */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-100 mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Sun className="text-orange-500" size={24} />
                  Sun & Moon
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Sunrise
                      className="text-orange-400 mx-auto mb-2"
                      size={32}
                    />
                    <div className="text-sm text-gray-600">Sunrise</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.astro.sunrise}
                    </div>
                  </div>
                  <div className="text-center">
                    <Sunset
                      className="text-orange-600 mx-auto mb-2"
                      size={32}
                    />
                    <div className="text-sm text-gray-600">Sunset</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.astro.sunset}
                    </div>
                  </div>
                  <div className="text-center">
                    <Moon className="text-indigo-500 mx-auto mb-2" size={32} />
                    <div className="text-sm text-gray-600">Moon Phase</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.astro.moon_phase}
                    </div>
                  </div>
                  <div className="text-center">
                    <Moon className="text-purple-500 mx-auto mb-2" size={32} />
                    <div className="text-sm text-gray-600">Illumination</div>
                    <div className="text-lg font-bold text-gray-800">
                      {weatherData.astro.moon_illumination}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Air Quality Details */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Wind className="text-green-600" size={24} />
                  Air Quality Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <AirCard heading={"CO"} stats={weatherData.air_quality.co} />
                  <AirCard
                    heading={"NO₂"}
                    stats={weatherData.air_quality.no2}
                  />
                  <AirCard heading={"O₃"} stats={weatherData.air_quality.o3} />
                  <AirCard
                    heading={"SO₂"}
                    stats={weatherData.air_quality.so2}
                  />
                  <AirCard
                    heading={"PM2.5"}
                    stats={weatherData.air_quality.pm2_5}
                  />
                  <AirCard
                    heading={"PM10"}
                    stats={weatherData.air_quality.pm10}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-white text-sm opacity-80">
          <p>Comprehensive weather data and forecasts</p>
        </div>
      </div>
    </div>
  );
}
