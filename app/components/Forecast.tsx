import { type ForecastData } from "../services/weatherApi";

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
  /**
   * Format date to show weekday and date
   * @param dateStr string - Date string in ISO format
   * @returns string
   */
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  /**
   * Format temperature to one decimal place
   * @param temp number - Temperature in Celsius or Fahrenheit
   * @returns number - Formatted temperature
   */
  const formatTemp = (temp: number) => {
    return Math.round(temp * 10) / 10;
  };
  
  /**
   * Get weather information based on the weather code
   * @param code number - Weather code
   * @returns { description: string; icon: string } - Weather description and icon
   */
  const getWeatherInfo = (code: number): { description: string; icon: string } => {
    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    switch (code) {
      case 0:
        return { description: "Clear sky", icon: "01d" };
      case 1:
        return { description: "Mainly clear", icon: "01d" };
      case 2:
        return { description: "Partly cloudy", icon: "02d" };
      case 3:
        return { description: "Overcast", icon: "03d" };
      case 45:
      case 48:
        return { description: "Fog", icon: "50d" };
      case 51:
        return { description: "Light drizzle", icon: "09d" };
      case 53:
        return { description: "Moderate drizzle", icon: "09d" };
      case 55:
        return { description: "Dense drizzle", icon: "09d" };
      case 56:
      case 57:
        return { description: "Freezing drizzle", icon: "09d" };
      case 61:
        return { description: "Slight rain", icon: "10d" };
      case 63:
        return { description: "Moderate rain", icon: "10d" };
      case 65:
        return { description: "Heavy rain", icon: "10d" };
      case 66:
      case 67:
        return { description: "Freezing rain", icon: "13d" };
      case 71:
        return { description: "Slight snow fall", icon: "13d" };
      case 73:
        return { description: "Moderate snow fall", icon: "13d" };
      case 75:
        return { description: "Heavy snow fall", icon: "13d" };
      case 77:
        return { description: "Snow grains", icon: "13d" };
      case 80:
        return { description: "Slight rain showers", icon: "09d" };
      case 81:
        return { description: "Moderate rain showers", icon: "09d" };
      case 82:
        return { description: "Violent rain showers", icon: "09d" };
      case 85:
      case 86:
        return { description: "Snow showers", icon: "13d" };
      case 95:
        return { description: "Thunderstorm", icon: "11d" };
      case 96:
      case 99:
        return { description: "Thunderstorm with hail", icon: "11d" };
      default:
        return { description: "Unknown", icon: "50d" };
    }
  };

  /**
   * Get the URL for the weather icon
   * @param icon string - Weather icon code
   * @returns 
   */
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  /**
   * Calculate the average temperature for the day
   * @param min number - Minimum temperature
   * @param max number - Maximum temperature
   * @returns number - Average temperature
   */
  const calculateDailyAvgTemp = (min: number, max: number) => {
    return (min + max) / 2;
  };

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