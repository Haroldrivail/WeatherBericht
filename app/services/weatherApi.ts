import axios from "axios";

// Open-Meteo API base URLs
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  current: {
    time: string;
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    weatherCode: number;
    weatherDescription: string;
    weatherIcon: string;
  };
}

export interface ForecastData {
  location: {
    name: string;
    country: string;
  };
  daily: {
    time: string[];
    weatherCode: number[];
    temperatureMax: number[];
    temperatureMin: number[];
    apparentTemperatureMax: number[];
    apparentTemperatureMin: number[];
    sunrise: string[];
    sunset: string[];
    precipitationProbabilityMax: number[];
  };
}

/**
 * Get weather information based on WMO Weather interpretation codes
 * @param code __Weather code__ (WMO Weather interpretation codes)
 * @returns { description: string; icon: string } __Weather description and icon__
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

export const weatherApi = {
  
    /**
     * Get coordinates by city name
     * @param city __City name__
     * @returns { latitude: number; longitude: number; name: string; country: string } __Coordinates of the city__
     */
  getCoordinatesByCity: async (city: string): Promise<{ latitude: number; longitude: number; name: string; country: string }> => {
    try {
      const response = await axios.get(GEOCODING_BASE_URL, {
        params: {
          name: city,
          count: 1,
          format: "json",
        },
      });
      
      if (!response.data.results || response.data.results.length === 0) {
        throw new Error("City not found");
      }
      
      const location = response.data.results[0];
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        country: location.country,
      };
    } catch (error) {
      console.error("Error geocoding city:", error);
      throw error;
    }
  },
  
  /**
   * Get current weather data for a specific city
   * @param city __City name__
   * @param unit __Unit of measurement__ (default is "metric")
   * @returns Current weather data for the specified city
   */
  getCurrentWeather: async (
    city: string, 
    unit: "metric" | "imperial" = "metric"
  ): Promise<WeatherData> => {
    try {
      // First, get the coordinates for the city
      const location = await weatherApi.getCoordinatesByCity(city);
      
      // Then get the weather data using the coordinates
      return await weatherApi.getCurrentWeatherByCoords(
        location.latitude,
        location.longitude,
        unit,
        location.name,
        location.country
      );
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  },

  /**
   * Get current weather data by coordinates
   * @param lat __Latitude__
   * @param lon __Longitude__
   * @param unit __Unit of measurement__ (default is "metric")
   * @param cityName __City name__ (optional)
   * @param country __Country name__ (optional)
   */
  getCurrentWeatherByCoords: async (
    lat: number,
    lon: number,
    unit: "metric" | "imperial" = "metric",
    cityName?: string,
    country?: string
  ): Promise<WeatherData> => {
    try {
      const temperatureUnit = unit === "metric" ? "celsius" : "fahrenheit";
      const windSpeedUnit = unit === "metric" ? "ms" : "mph";
      
      const response = await axios.get(WEATHER_BASE_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,pressure_msl,wind_speed_10m",
          temperature_unit: temperatureUnit,
          wind_speed_unit: windSpeedUnit,
        },
      });
      
      // If we don't have city name yet (like when using geolocation), we need to reverse geocode
      let locationInfo = { name: cityName || "", country: country || "" };
      if (!cityName || !country) {
        try {
          const geoResponse = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          locationInfo = {
            name: geoResponse.data.city || geoResponse.data.locality || "Unknown location",
            country: geoResponse.data.countryName || "",
          };
        } catch (error) {
          console.error("Error reverse geocoding:", error);
          locationInfo = { name: "Unknown location", country: "" };
        }
      }
      
      const current = response.data.current;
      const weatherInfo = getWeatherInfo(current.weather_code);
      
      return {
        location: {
          name: locationInfo.name,
          country: locationInfo.country,
          latitude: lat,
          longitude: lon,
        },
        current: {
          time: current.time,
          temperature: current.temperature_2m,
          apparentTemperature: current.apparent_temperature,
          humidity: current.relative_humidity_2m,
          pressure: current.pressure_msl,
          windSpeed: current.wind_speed_10m,
          weatherCode: current.weather_code,
          weatherDescription: weatherInfo.description,
          weatherIcon: weatherInfo.icon,
        },
      };
    } catch (error) {
      console.error("Error fetching current weather by coords:", error);
      throw error;
    }
  },

  /**
   * Get forecast data for a specific city
   * @param city __City name__
   * @param unit __Unit of measurement__ (default is "metric")
   * @returns Forecast data for the specified city
   */
  getForecast: async (
    city: string,
    unit: "metric" | "imperial" = "metric"
  ): Promise<ForecastData> => {
    try {
      // First, get the coordinates for the city
      const location = await weatherApi.getCoordinatesByCity(city);
      
      // Then get the forecast data using the coordinates
      return await weatherApi.getForecastByCoords(
        location.latitude,
        location.longitude,
        unit,
        location.name,
        location.country
      );
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  },

  /**
   * Get forecast by coordinates
   * @param lat __Latitude__
   * @param lon __Longitude__
   * @param unit __Unit of measurement__ (default is "metric")
   * @param cityName __City name__ (optional)
   * @param country __Country name__ (optional)
   * @returns Forecast data for the specified coordinates
   */
  getForecastByCoords: async (
    lat: number,
    lon: number,
    unit: "metric" | "imperial" = "metric",
    cityName?: string,
    country?: string
  ): Promise<ForecastData> => {
    try {
      const temperatureUnit = unit === "metric" ? "celsius" : "fahrenheit";
      
      const response = await axios.get(WEATHER_BASE_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          daily: "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max",
          temperature_unit: temperatureUnit,
          forecast_days: 7,
          timezone: "auto",
        },
      });
      
      // If we don't have city name yet, use the same approach as in getCurrentWeatherByCoords
      let locationInfo = { name: cityName || "", country: country || "" };
      if (!cityName || !country) {
        try {
          const geoResponse = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          locationInfo = {
            name: geoResponse.data.city || geoResponse.data.locality || "Unknown location",
            country: geoResponse.data.countryName || "",
          };
        } catch (error) {
          console.error("Error reverse geocoding:", error);
          locationInfo = { name: "Unknown location", country: "" };
        }
      }
      
      return {
        location: {
          name: locationInfo.name,
          country: locationInfo.country,
        },
        daily: {
          time: response.data.daily.time,
          weatherCode: response.data.daily.weather_code,
          temperatureMax: response.data.daily.temperature_2m_max,
          temperatureMin: response.data.daily.temperature_2m_min,
          apparentTemperatureMax: response.data.daily.apparent_temperature_max,
          apparentTemperatureMin: response.data.daily.apparent_temperature_min,
          sunrise: response.data.daily.sunrise,
          sunset: response.data.daily.sunset,
          precipitationProbabilityMax: response.data.daily.precipitation_probability_max,
        },
      };
    } catch (error) {
      console.error("Error fetching forecast by coords:", error);
      throw error;
    }
  },
};