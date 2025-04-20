// Functions for managing localStorage data

// Maximum number of recent searches to store
export const MAX_RECENT_SEARCHES = 5;

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && window.localStorage;

/**
 * Load recent searches from localStorage
 * @returns string[] - Array of recent city searches
 */
export const loadRecentSearches = (): string[] => {
  if (!isBrowser) return [];
  
  const savedSearches = localStorage.getItem("recentSearches");
  if (savedSearches) {
    return JSON.parse(savedSearches);
  }
  return [];
};

/**
 * Save a city to recent searches
 * @param cityName string - Name of the city to save
 * @param maxItems number - Maximum number of searches to keep
 * @returns string[] - Updated recent searches array
 */
export const addToRecentSearches = (
  cityName: string,
  maxItems: number = MAX_RECENT_SEARCHES
): string[] => {
  if (!isBrowser || !cityName || cityName.trim() === "") return loadRecentSearches();
  
  const currentSearches = loadRecentSearches();
  
  // Remove the city if it already exists to avoid duplicates
  const filteredSearches = currentSearches.filter(
    s => s.toLowerCase() !== cityName.toLowerCase()
  );
  
  // Add the city to the beginning of the array
  const newSearches = [cityName, ...filteredSearches].slice(0, maxItems);
  
  // Save to localStorage
  localStorage.setItem("recentSearches", JSON.stringify(newSearches));
  
  return newSearches;
};

/**
 * Clear all recent searches from localStorage
 */
export const clearRecentSearches = (): void => {
  if (!isBrowser) return;
  localStorage.removeItem("recentSearches");
};