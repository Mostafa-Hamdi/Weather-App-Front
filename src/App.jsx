import { useState } from "react";
import LocationHeader from "./components/LocationHeader";
import TemperatureCards from "./components/TemperatureCards";
import WeatherMetrics from "./components/WeatherMetrics";
import SunMoonInfo from "./components/SunMoonInfo";
import AirQualityDetails from "./components/AirQualityDetails";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorMessage from "./components/ErrorMessage";

// ===== MAIN APP COMPONENT =====
export default function WeatherApp() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://weather-app-backend-rkqo.onrender.com/weather?address=${address || "London"}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data. Please try again.");
      }

      const data = await response.json();

      if (data.error || !data.data) {
        throw new Error(
          data.error || "Location not found. Please try a different city.",
        );
      }

      setWeatherData(data.data);
      setLocation(address || "London");
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        weatherData?.is_day === "yes"
          ? "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
          : "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"
      } p-4 sm:p-6 lg:p-8 transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto">
        <Header isDay={weatherData?.is_day === "yes"} />

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 mb-6">
          <SearchBar
            address={address}
            setAddress={setAddress}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {error && <ErrorMessage message={error} />}

          {weatherData && !error && (
            <div className="animate-fadeIn">
              <LocationHeader location={location} weatherData={weatherData} />
              <TemperatureCards weatherData={weatherData} />
              <WeatherMetrics weatherData={weatherData} />
              <SunMoonInfo astro={weatherData.astro} />
              <AirQualityDetails airQuality={weatherData.air_quality} />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
