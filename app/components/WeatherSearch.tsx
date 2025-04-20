import { useState, useEffect, useRef } from "react";
import { loadRecentSearches, clearRecentSearches } from "../utils/localStorageService";

interface WeatherSearchProps {
  city: string;
  onCityChange: (city: string) => void;
  onSearch: (city: string) => void;
  onGeolocation: () => void;
  onUnitToggle: () => void;
  unit: "metric" | "imperial";
}

/**
 * Component for weather search functionality
 */
export function WeatherSearch({ 
  city, 
  onCityChange, 
  onSearch, 
  onGeolocation, 
  onUnitToggle, 
  unit 
}: WeatherSearchProps) {
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load recent searches on client-side only using useEffect
  useEffect(() => {
    setRecentSearches(loadRecentSearches());
  }, []);
  
  // Handle clicks outside of the recent searches dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowRecentSearches(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowRecentSearches(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);
  
  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      setIsLoading(true);
      onSearch(city.trim());
      setShowRecentSearches(false);
      // Simulate loading state for better UX
      setTimeout(() => setIsLoading(false), 1000);
    }
  };
  
  /**
   * Handle click on a recent search item
   */
  const handleRecentSearchClick = (cityName: string) => {
    onCityChange(cityName);
    setIsLoading(true);
    onSearch(cityName);
    setShowRecentSearches(false);
    // Simulate loading state for better UX
    setTimeout(() => setIsLoading(false), 1000);
  };
  
  /**
   * Clear recent searches from local storage and state
   */
  const handleClearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from closing
    clearRecentSearches();
    setRecentSearches([]);
  };

  /**
   * Focus the search input
   */
  const focusSearchInput = () => {
    inputRef.current?.focus();
  };

  /**
   * Handle keyboard navigation in dropdown
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && showRecentSearches && recentSearches.length > 0) {
      e.preventDefault();
      const dropdown = document.querySelector('ul');
      const firstItem = dropdown?.querySelector('li');
      (firstItem as HTMLElement)?.focus();
    }
  };
  
  return (
    <div className="mb-6 relative" ref={searchContainerRef}>
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Check Weather</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Enter a city name or use your current location</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <div className="relative group">
            <input
              ref={inputRef}
              type="text"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              onFocus={() => setShowRecentSearches(true)}
              onKeyDown={handleKeyDown}
              placeholder="Enter city name..."
              className="w-full p-3 pl-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 text-base"
              aria-label="City name"
              required
              disabled={isLoading}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            {city && (
              <button
                type="button"
                onClick={() => {
                  onCityChange('');
                  focusSearchInput();
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Recent searches dropdown */}
          {showRecentSearches && recentSearches.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg dark:border-gray-700 overflow-hidden animate-fadeIn">
              <div className="flex justify-between items-center p-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <span className="font-medium text-gray-700 dark:text-gray-200">Recent Searches</span>
                <button 
                  type="button"
                  onClick={handleClearRecentSearches}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150"
                  aria-label="Clear all recent searches"
                >
                  Clear All
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto" role="listbox">
                {recentSearches.map((searchItem, index) => (
                  <li 
                    key={index}
                    onClick={() => handleRecentSearchClick(searchItem)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center border-b last:border-b-0 dark:border-gray-700 transition-colors duration-150 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700"
                    tabIndex={0}
                    role="option"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleRecentSearchClick(searchItem);
                      }
                    }}
                  >
                    <span className="mr-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    {searchItem}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex flex-row gap-2 sm:flex-nowrap">
          <button 
            type="submit" 
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow transition duration-150 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            aria-label="Search for city"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span>Search</span>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setIsLoading(true);
              onGeolocation();
              setTimeout(() => setIsLoading(false), 1000);
            }}
            className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg shadow transition duration-150 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Use my current location"
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">My Location</span>
          </button>
          
          <button
            type="button"
            onClick={onUnitToggle}
            className="flex-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white w-12 sm:w-16 py-3 rounded-lg shadow transition duration-150 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label={unit === "metric" ? "Switch to Fahrenheit" : "Switch to Celsius"}
          >
            {unit === "metric" ? "°C" : "°F"}
          </button>
        </div>
      </form>

      {/* Search tips */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Try searching for a city like "Berlin" or "New York"</span>
      </div>
    </div>
  );
}