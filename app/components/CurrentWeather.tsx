import { type WeatherData } from "../services/weatherApi";
import { formatTemp, formatDateWithTime, getWeatherIconUrl } from "../utils/weatherUtils";

interface CurrentWeatherProps {
  weatherData: WeatherData;
  unit: "metric" | "imperial";
}

/**
 * Component to display current weather conditions
 */
export function CurrentWeather({ weatherData, unit }: CurrentWeatherProps) {
  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Location header with blue background */}
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center">
          {weatherData.location.name}
          {weatherData.location.country && (
            <span className="ml-2 text-white/80 text-lg md:text-xl">
              {weatherData.location.country}
            </span>
          )}
        </h2>
        <p className="text-white/80 text-sm mt-1">
          {formatDateWithTime(weatherData.current.time)}
        </p>
      </div>
      
      {/* Main weather display */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <img 
              src={getWeatherIconUrl(weatherData.current.weatherIcon)}
              alt={weatherData.current.weatherDescription}
              className="w-20 h-20 md:w-24 md:h-24 transition-transform hover:scale-110 duration-300"
            />
            <div className="ml-2">
              <div className="text-4xl md:text-5xl font-bold">
                {formatTemp(weatherData.current.temperature)}
                <span className="text-3xl align-top ml-1">°{unit === "metric" ? "C" : "F"}</span>
              </div>
              <p className="text-xl capitalize mt-1 text-gray-700 dark:text-gray-300">
                {weatherData.current.weatherDescription}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
            <p className="text-xl font-bold">
              {formatTemp(weatherData.current.apparentTemperature)}°{unit === "metric" ? "C" : "F"}
            </p>
          </div>
        </div>
        
        {/* Weather details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-center transition-transform hover:translate-y-[-5px] duration-300">
            <div className="flex justify-center mb-2 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Humidity</p>
            <p className="text-xl font-bold">{weatherData.current.humidity}%</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-center transition-transform hover:translate-y-[-5px] duration-300">
            <div className="flex justify-center mb-2 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Wind</p>
            <p className="text-xl font-bold">
              {weatherData.current.windSpeed} {unit === "metric" ? "m/s" : "mph"}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-center transition-transform hover:translate-y-[-5px] duration-300">
            <div className="flex justify-center mb-2 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Pressure</p>
            <p className="text-xl font-bold">{weatherData.current.pressure} hPa</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-750 p-3 rounded-lg text-center transition-transform hover:translate-y-[-5px] duration-300">
            <div className="flex justify-center mb-2 text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Visibility</p>
            <p className="text-xl font-bold">
              {weatherData.current.visibility ? `${Math.round(weatherData.current.visibility / 1000)} km` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}