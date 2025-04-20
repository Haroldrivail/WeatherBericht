import { type ForecastData } from "../services/weatherApi";
import { 
  formatTemp, 
  formatDate, 
  getWeatherInfo, 
  getWeatherIconUrl, 
  calculateDailyAvgTemp 
} from "../utils/weatherUtils";

interface ForecastProps {
  forecast: ForecastData;
  unit: "metric" | "imperial";
}

/**
 * Forecast component to display weather forecast information
 * @param param0 - Contains forecast data and unit
 * @returns JSX.Element
 */
export function Forecast({ forecast, unit }: ForecastProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.daily.time.slice(0, 5).map((date, index) => {
          const weatherInfo = getWeatherInfo(forecast.daily.weatherCode[index]);
          const avgTemp = calculateDailyAvgTemp(
            forecast.daily.temperatureMin[index],
            forecast.daily.temperatureMax[index]
          );
          
          return (
            <div 
              key={date} 
              className="border rounded-lg p-4 text-center dark:border-gray-700"
            >
              <p className="font-bold mb-2">{formatDate(date)}</p>
              <img 
                src={getWeatherIconUrl(weatherInfo.icon)}
                alt={weatherInfo.description}
                className="w-16 h-16 mx-auto"
              />
              <p className="text-xl font-bold mb-1">{formatTemp(avgTemp)}°{unit === "metric" ? "C" : "F"}</p>
              <p className="text-sm mb-1">
                <span className="text-red-500">{formatTemp(forecast.daily.temperatureMax[index])}°</span>{" / "}
                <span className="text-blue-500">{formatTemp(forecast.daily.temperatureMin[index])}°</span>
              </p>
              <p className="capitalize text-sm text-gray-600 dark:text-gray-400">
                {weatherInfo.description}
              </p>
              {forecast.daily.precipitationProbabilityMax[index] > 0 && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  💧 {forecast.daily.precipitationProbabilityMax[index]}% chance
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}