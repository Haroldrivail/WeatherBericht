// Functions related to weather data formatting and conversion

/**
 * Format temperature to show one decimal place
 * @param temp number - Temperature in Celsius or Fahrenheit
 * @returns number - Formatted temperature
 */
export const formatTemp = (temp: number) => {
  return Math.round(temp * 10) / 10;
};

/**
 * Convert temperature from Celsius to Fahrenheit
 * @param celsius number - Temperature in Celsius
 * @returns number - Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

/**
 * Convert temperature from Fahrenheit to Celsius
 * @param fahrenheit number - Temperature in Fahrenheit
 * @returns number - Temperature in Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};

/**
 * Convert temperature based on unit system
 * @param temp number - Temperature to convert
 * @param fromUnit string - Current unit system ('metric' or 'imperial')
 * @param toUnit string - Target unit system ('metric' or 'imperial')
 * @returns number - Converted temperature
 */
export const convertTemperature = (
  temp: number,
  fromUnit: 'metric' | 'imperial',
  toUnit: 'metric' | 'imperial'
): number => {
  // If units are the same, no conversion needed
  if (fromUnit === toUnit) return temp;
  
  // Convert from Celsius to Fahrenheit
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return celsiusToFahrenheit(temp);
  }
  
  // Convert from Fahrenheit to Celsius
  return fahrenheitToCelsius(temp);
};

/**
 * Format date from timestamp
 * @param timeStr string - Date string in ISO format
 * @param options object - Format options for date display
 * @returns string - Formatted date string
 */
export const formatDate = (
  timeStr: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }
) => {
  const date = new Date(timeStr);
  return date.toLocaleDateString(undefined, options);
};

/**
 * Format date with time from timestamp
 * @param timeStr string - Date string in ISO format
 * @returns string - Formatted date and time string
 */
export const formatDateWithTime = (timeStr: string) => {
  const date = new Date(timeStr);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get weather icon URL for a given icon code
 * @param icon string - Weather icon code
 * @returns string - URL to the weather icon
 */
export const getWeatherIconUrl = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

/**
 * Calculate the average temperature for the day
 * @param min number - Minimum temperature
 * @param max number - Maximum temperature
 * @returns number - Average temperature
 */
export const calculateDailyAvgTemp = (min: number, max: number) => {
  return (min + max) / 2;
};

/**
 * Get weather information based on WMO Weather interpretation codes
 * @param code number - Weather code
 * @returns { description: string; icon: string } - Weather description and icon
 */
export const getWeatherInfo = (code: number): { description: string; icon: string } => {
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