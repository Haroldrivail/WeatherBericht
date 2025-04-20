// Theme utility functions

/**
 * Determine if we are running on client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if the user prefers dark mode
 * @returns boolean - true if user prefers dark mode
 */
export const getInitialTheme = (): boolean => {
  if (!isClient) return false;
  
  // Check for saved theme preference in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') return true;
  if (savedTheme === 'light') return false;
  
  // If no saved preference, use system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Set theme based on dark mode preference
 * @param isDark boolean - whether to set dark mode
 */
export const setTheme = (isDark: boolean): void => {
  if (!isClient) return;
  
  // Update document class
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

/**
 * Initialize theme based on saved preference or system setting
 */
export const initializeTheme = (): void => {
  if (!isClient) return;
  
  const isDark = getInitialTheme();
  setTheme(isDark);
};

/**
 * Toggle current theme
 * @returns boolean - the new theme state (true for dark, false for light)
 */
export const toggleTheme = (): boolean => {
  if (!isClient) return false;
  
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(!isDark);
  return !isDark;
};