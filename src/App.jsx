import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "2c1705a214e94de98c9123118261002";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    );
    const data = await res.json();
    setWeather(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white px-4">
      <div className="w-full max-w-lg">

        {/* Headline */}
        <h1 className="text-center text-4xl font-extrabold mb-10 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-fade">
          Weather Forecast
        </h1>

        {/* Search Box */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-lg mb-10">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={fetchWeather}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-105 transition-all shadow-md"
          >
            Go
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-cyan-300 animate-pulse">
            Fetching weather...
          </p>
        )}

        {/* Result */}
        {weather && weather.current && (
          <div className="animate-slideUp bg-gradient-to-br from-indigo-500/30 via-cyan-500/20 to-purple-500/30 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.5)] text-center">

            <h2 className="text-2xl font-semibold mb-1">
              {weather.location.name}
            </h2>
            <p className="text-cyan-200 mb-6">
              {weather.current.condition.text}
            </p>

            <div className="flex justify-center mb-4">
              <img
                src={weather.current.condition.icon}
                alt="icon"
                className="w-24 h-24 animate-float"
              />
            </div>

            <div className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              {Math.round(weather.current.temp_c)}°
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="rounded-xl bg-white/10 p-4">
                💧 Humidity
                <p className="text-lg font-bold mt-1">
                  {weather.current.humidity}%
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                🌬 Wind
                <p className="text-lg font-bold mt-1">
                  {weather.current.wind_kph} km/h
                </p>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .animate-fade {
            animation: fade 0.8s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.7s ease-out;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
