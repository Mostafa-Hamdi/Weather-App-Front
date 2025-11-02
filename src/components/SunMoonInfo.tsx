import AstroItem from "./AstroItem";
import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

function SunMoonInfo({ astro }: any) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-100 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Sun className="text-orange-500" size={24} />
        Sun & Moon
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AstroItem
          icon={Sunrise}
          iconColor="text-orange-400"
          label="Sunrise"
          value={astro.sunrise}
        />
        <AstroItem
          icon={Sunset}
          iconColor="text-orange-600"
          label="Sunset"
          value={astro.sunset}
        />
        <AstroItem
          icon={Moon}
          iconColor="text-indigo-500"
          label="Moon Phase"
          value={astro.moon_phase}
        />
        <AstroItem
          icon={Moon}
          iconColor="text-purple-500"
          label="Illumination"
          value={`${astro.moon_illumination}%`}
        />
      </div>
    </div>
  );
}
export default SunMoonInfo;
