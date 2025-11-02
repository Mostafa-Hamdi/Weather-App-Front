import { Thermometer } from "lucide-react";
function TemperatureCard({ label, value, gradient }: any) {
  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl opacity-90 font-medium">{label}</span>
        <Thermometer size={32} className="animate-pulse" />
      </div>
      <div className="text-7xl font-bold mb-2">{value}°</div>
      <div className="text-lg opacity-90">Celsius</div>
    </div>
  );
}
export default TemperatureCard;
