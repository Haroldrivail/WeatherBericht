import { useState, useEffect } from "react";
import { weatherApi, type WeatherData, type ForecastData } from "../services/weatherApi";
import { Forecast } from "./Forecast";

// Maximum number of recent searches to store
const MAX_RECENT_SEARCHES = 5;

export function WeatherDashboard() {
  const [city, setCity] = useState<string>("");
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usingGeolocation, setUsingGeolocation] = useState<boolean>(false);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Add a city to recent searches
  const addToRecentSearches = (cityName: string) => {
    if (!cityName || cityName.trim() === "") return;
    
    setRecentSearches(prev => {
      // Remove the city if it already exists to avoid duplicates
      const filteredSearches = prev.filter(s => s.toLowerCase() !== cityName.toLowerCase());
      
      // Add the city to the beginning of the array
      const newSearches = [cityName, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);
      
      // Save to localStorage
      localStorage.setItem("recentSearches", JSON.stringify(newSearches));
      
      return newSearches;
    });
  };

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
      
      // Add the city to recent searches
      addToRecentSearches(cityName);
      
      // Hide recent searches dropdown after selection
      setShowRecentSearches(false);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to get weather based on user's geolocation
  const getWeatherByGeolocation = () => {
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
            addToRecentSearches(weatherData.location.name);
          }
          
          // Hide recent searches dropdown
          setShowRecentSearches(false);
        } catch (err) {
          setError("Failed to fetch weather data. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
      }
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city.trim());
    }
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    setUnit(prevUnit => {
      const newUnit = prevUnit === "metric" ? "imperial" : "metric";
      
      // Refetch weather data with the new unit
      if (currentWeather) {
        if (usingGeolocation && currentWeather) {
          // If using geolocation, refetch with coordinates
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              fetchWeatherByCoords(latitude, longitude, newUnit);
            },
            (error) => {
              setError(`Error getting location: ${error.message}`);
            }
          );
        } else if (city) {
          // Otherwise refetch with city name
          fetchWeatherData(city);
        }
      }
      
      return newUnit;
    });
  };

  // Helper function to fetch weather by coordinates and unit
  const fetchWeatherByCoords = async (lat: number, lon: number, unitSystem: "metric" | "imperial") => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await weatherApi.getCurrentWeatherByCoords(lat, lon, unitSystem);
      const forecastData = await weatherApi.getForecastByCoords(lat, lon, unitSystem);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle click on a recent search item
  const handleRecentSearchClick = (cityName: string) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  // Use geolocation on initial load
  useEffect(() => {
    getWeatherByGeolocation();
  }, []);

  // Format temperature to show one decimal place
  const formatTemp = (temp: number) => {
    return Math.round(temp * 10) / 10;
  };

  // Format date from timestamp
  const formatDate = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Get icon URL for weather code
  const getWeatherIconUrl = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather Dashboard</h1>
      
      <div className="mb-6 relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => setShowRecentSearches(true)}
              placeholder="Enter city name"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              required
            />
            
            {/* Recent searches dropdown */}
            {showRecentSearches && recentSearches.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg dark:border-gray-700">
                <div className="flex justify-between items-center p-2 border-b dark:border-gray-700">
                  <span className="font-medium">Recent Searches</span>
                  <button 
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    Clear All
                  </button>
                </div>
                <ul>
                  {recentSearches.map((searchItem, index) => (
                    <li 
                      key={index}
                      onClick={() => handleRecentSearchClick(searchItem)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {searchItem}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
          <button
            type="button"
            onClick={getWeatherByGeolocation}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            📍 Use My Location
          </button>
          <button
            type="button"
            onClick={toggleUnit}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            aria-label="Toggle temperature unit"
          >
            {unit === "metric" ? "°C" : "°F"}
          </button>
        </form>
      </div>

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
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">
                {currentWeather.location.name}
                {currentWeather.location.country && `, ${currentWeather.location.country}`}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {formatDate(currentWeather.current.time)}
              </p>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <img 
                src={getWeatherIconUrl(currentWeather.current.weatherIcon)}
                alt={currentWeather.current.weatherDescription}
                className="w-16 h-16"
              />
              <div className="text-4xl font-bold ml-2">
                {formatTemp(currentWeather.current.temperature)}°{unit === "metric" ? "C" : "F"}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-xl capitalize">{currentWeather.current.weatherDescription}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Feels Like</p>
              <p className="font-bold">
                {formatTemp(currentWeather.current.apparentTemperature)}°{unit === "metric" ? "C" : "F"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="font-bold">{currentWeather.current.humidity}%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Wind</p>
              <p className="font-bold">
                {currentWeather.current.windSpeed} {unit === "metric" ? "m/s" : "mph"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">Pressure</p>
              <p className="font-bold">{currentWeather.current.pressure} hPa</p>
            </div>
          </div>
        </div>
      )}

      {forecast && !loading && (
        <Forecast forecast={forecast} unit={unit} />
      )}
    </div>
  );
}