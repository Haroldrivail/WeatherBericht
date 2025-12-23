import { useState, useEffect } from "react";
import {
  weatherApi,
  type WeatherData,
  type ForecastData,
} from "../services/weatherApi";
import { CurrentWeather } from "../components/CurrentWeather";
import { Forecast } from "../components/Forecast";
import { WeatherSearch } from "../components/WeatherSearch";
import { addToRecentSearches } from "../utils/localStorageService";
import { convertTemperature } from "../utils/weatherUtils";

/**
 * Main Weather Dashboard view component that manages state and data flow
 */
export function WeatherDashboard() {
  const [city, setCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usingGeolocation, setUsingGeolocation] = useState<boolean>(false);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isClient, setIsClient] = useState<boolean>(false);

  // Set isClient to true when component mounts on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to fetch weather data by city name
  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherApi.getCurrentWeather(cityName, unit);
      const forecastData = await weatherApi.getForecast(cityName, unit);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setUsingGeolocation(false);

      // Only add to recent searches on the client side
      if (isClient) {
        addToRecentSearches(cityName);
      }
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to get weather based on user's geolocation
  const getWeatherByGeolocation = () => {
    // Exit early during server-side rendering
    if (!isClient) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await weatherApi.getCurrentWeatherByCoords(
            latitude,
            longitude,
            unit
          );
          const forecastData = await weatherApi.getForecastByCoords(
            latitude,
            longitude,
            unit
          );

          setCurrentWeather(weatherData);
          setForecast(forecastData);
          setUsingGeolocation(true);

          // Update city for display purposes
          if (weatherData.location.name) {
            setCity(weatherData.location.name);
            if (isClient) {
              addToRecentSearches(weatherData.location.name);
            }
          }
        } catch (err) {
          setError("Failed to fetch weather data. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      async (error) => {
        // Fallback to IP-based geolocation
        console.log("Browser geolocation failed, trying IP-based fallback...");
        try {
          const ipResponse = await fetch(
            "http://ip-api.com/json/?fields=status,city,lat,lon"
          );
          const ipData = await ipResponse.json();

          if (ipData.status === "success" && ipData.lat && ipData.lon) {
            const weatherData = await weatherApi.getCurrentWeatherByCoords(
              ipData.lat,
              ipData.lon,
              unit
            );
            const forecastData = await weatherApi.getForecastByCoords(
              ipData.lat,
              ipData.lon,
              unit
            );

            setCurrentWeather(weatherData);
            setForecast(forecastData);
            setUsingGeolocation(true);

            if (weatherData.location.name) {
              setCity(weatherData.location.name);
              if (isClient) {
                addToRecentSearches(weatherData.location.name);
              }
            }
            setLoading(false);
            return;
          }
        } catch (ipError) {
          console.error("IP geolocation fallback failed:", ipError);
        }

        // If IP fallback also fails, show error
        let errorMessage = "Unable to get your location. ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage +=
              "Please allow location access in your browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage +=
              "Location service unavailable. Please search for a city instead.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out. Please try again.";
            break;
          default:
            errorMessage += "Please search for a city instead.";
        }
        setError(errorMessage);
        setLoading(false);
      }
    );
  };

  /**
   * Convert weather data to a different unit system
   * @param data The weather data to convert
   * @param fromUnit Source unit system ('metric' or 'imperial')
   * @param toUnit Target unit system ('metric' or 'imperial')
   * @returns Converted weather data
   */
  const convertWeatherData = (
    data: WeatherData,
    fromUnit: "metric" | "imperial",
    toUnit: "metric" | "imperial"
  ): WeatherData => {
    // Create a deep copy of the data
    const convertedData = JSON.parse(JSON.stringify(data));

    // Convert temperature values
    convertedData.current.temperature = convertTemperature(
      convertedData.current.temperature,
      fromUnit,
      toUnit
    );

    convertedData.current.apparentTemperature = convertTemperature(
      convertedData.current.apparentTemperature,
      fromUnit,
      toUnit
    );

    return convertedData;
  };

  /**
   * Convert forecast data to a different unit system
   * @param data The forecast data to convert
   * @param fromUnit Source unit system ('metric' or 'imperial')
   * @param toUnit Target unit system ('metric' or 'imperial')
   * @returns Converted forecast data
   */
  const convertForecastData = (
    data: ForecastData,
    fromUnit: "metric" | "imperial",
    toUnit: "metric" | "imperial"
  ): ForecastData => {
    // Create a deep copy of the data
    const convertedData = JSON.parse(JSON.stringify(data));

    // Convert temperature arrays
    convertedData.daily.temperatureMax = convertedData.daily.temperatureMax.map(
      (temp: number) => convertTemperature(temp, fromUnit, toUnit)
    );

    convertedData.daily.temperatureMin = convertedData.daily.temperatureMin.map(
      (temp: number) => convertTemperature(temp, fromUnit, toUnit)
    );

    convertedData.daily.apparentTemperatureMax =
      convertedData.daily.apparentTemperatureMax.map((temp: number) =>
        convertTemperature(temp, fromUnit, toUnit)
      );

    convertedData.daily.apparentTemperatureMin =
      convertedData.daily.apparentTemperatureMin.map((temp: number) =>
        convertTemperature(temp, fromUnit, toUnit)
      );

    return convertedData;
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit((prevUnit) => {
      const newUnit = prevUnit === "metric" ? "imperial" : "metric";

      // Convert existing data instead of refetching
      if (currentWeather) {
        const convertedWeather = convertWeatherData(
          currentWeather,
          prevUnit,
          newUnit
        );
        setCurrentWeather(convertedWeather);
      }

      if (forecast) {
        const convertedForecast = convertForecastData(
          forecast,
          prevUnit,
          newUnit
        );
        setForecast(convertedForecast);
      }

      return newUnit;
    });
  };

  // Helper function to fetch weather by coordinates and unit
  const fetchWeatherByCoords = async (
    lat: number,
    lon: number,
    unitSystem: "metric" | "imperial"
  ) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherApi.getCurrentWeatherByCoords(
        lat,
        lon,
        unitSystem
      );
      const forecastData = await weatherApi.getForecastByCoords(
        lat,
        lon,
        unitSystem
      );

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Use geolocation on initial load - only on client side
  useEffect(() => {
    if (isClient) {
      getWeatherByGeolocation();
    }
  }, [isClient]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Dashboard</h1>

      <WeatherSearch
        city={city}
        onCityChange={setCity}
        onSearch={fetchWeatherData}
        onGeolocation={getWeatherByGeolocation}
        onUnitToggle={toggleUnit}
        unit={unit}
      />

      {loading && (
        <div className="text-center py-10">
          <p className="text-lg">Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {currentWeather && !loading && (
        <CurrentWeather weatherData={currentWeather} unit={unit} />
      )}

      {forecast && !loading && <Forecast forecast={forecast} unit={unit} />}
    </div>
  );
}
