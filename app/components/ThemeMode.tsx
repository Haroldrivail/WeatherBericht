import { useState, useEffect } from "react";
import { getInitialTheme, toggleTheme, isClient } from "../utils/themeUtils";

/**
 * ThemeMode component for toggling between dark and light modes
 * @returns JSX.Element - Theme toggler button
 */
export function ThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize theme state on component mount (client-side only)
  useEffect(() => {
    if (isClient) {
      setIsDarkMode(getInitialTheme());
    }
  }, []);
  
  // Function to toggle dark/light mode
  const handleToggleTheme = () => {
    const newThemeIsDark = toggleTheme();
    setIsDarkMode(newThemeIsDark);
  };
  
  return (
    <button
      onClick={handleToggleTheme}
      className="rounded-full p-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
      aria-label="Toggle dark/light mode"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon for dark mode */}
      <svg
        className="hidden dark:block w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      
      {/* Moon icon for light mode */}
      <svg
        className="block dark:hidden w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}