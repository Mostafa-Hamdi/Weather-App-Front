import { Sun, Moon } from "lucide-react";

function Header({ isDay }: any) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg flex items-center justify-center gap-3">
        {isDay ? (
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
  );
}
export default Header;
