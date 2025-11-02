import { Search, MapPin } from "lucide-react";
function SearchBar({ address, setAddress, onSubmit, loading }: any) {
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
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
        onClick={onSubmit}
        disabled={loading}
        className={`cursor-pointer w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        <Search size={20} />
        {loading ? "Loading..." : "Get Weather Forecast"}
      </button>
    </div>
  );
}

export default SearchBar;
