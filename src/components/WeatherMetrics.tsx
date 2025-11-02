import MetricCard from "./MetricCard";

function WeatherMetrics({ weatherData }: any) {
  const getAirQualityLevel = (index: number) => {
    const levels: Record<number, { label: string; color: string; bg: string }> =
      {
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
    return levels[index] || levels[1];
  };

  const airQuality = getAirQualityLevel(
    weatherData?.air_quality?.["us-epa-index"],
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        icon="Droplets"
        label="Humidity"
        value={`${weatherData.humidity}%`}
        gradient="from-cyan-50 to-blue-50"
        iconColor="text-cyan-600"
        borderColor="border-cyan-100"
      />
      <MetricCard
        icon="Wind"
        label="Wind Speed"
        value={weatherData.wind_speed}
        subtitle={`km/h ${weatherData.wind_dir}`}
        gradient="from-green-50 to-emerald-50"
        iconColor="text-green-600"
        borderColor="border-green-100"
      />
      <MetricCard
        icon="Cloud"
        label="Cloud Cover"
        value={`${weatherData.cloudcover}%`}
        gradient="from-blue-50 to-indigo-50"
        iconColor="text-blue-600"
        borderColor="border-blue-100"
      />
      <MetricCard
        icon="Gauge"
        label="Pressure"
        value={weatherData.pressure}
        subtitle="mb"
        gradient="from-purple-50 to-violet-50"
        iconColor="text-purple-600"
        borderColor="border-purple-100"
      />
      <MetricCard
        icon="Eye"
        label="Visibility"
        value={weatherData.visibility}
        subtitle="km"
        gradient="from-amber-50 to-yellow-50"
        iconColor="text-amber-600"
        borderColor="border-amber-100"
      />
      <MetricCard
        icon="Sun"
        label="UV Index"
        value={weatherData.uv_index}
        gradient="from-rose-50 to-pink-50"
        iconColor="text-rose-600"
        borderColor="border-rose-100"
      />
      <MetricCard
        icon="Cloud"
        label="Precipitation"
        value={weatherData.precip}
        subtitle="mm"
        gradient="from-indigo-50 to-blue-50"
        iconColor="text-indigo-600"
        borderColor="border-indigo-100"
      />
      <div className={`${airQuality.bg} rounded-xl p-5 border border-gray-200`}>
        <MetricCard
          icon="Wind"
          label="Air Quality"
          value={airQuality.label}
          iconColor={airQuality.color}
          valueColor={airQuality.color}
          gradient=""
          borderColor=""
          customBg={true}
        />
      </div>
    </div>
  );
}
export default WeatherMetrics;
