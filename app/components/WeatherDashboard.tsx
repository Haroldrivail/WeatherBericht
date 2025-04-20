import { WeatherDashboard as WeatherDashboardView } from "../views/WeatherDashboard";

/**
 * WeatherDashboard component wrapper
 * This component imports the view component for backward compatibility
 */
export function WeatherDashboard() {
  return <WeatherDashboardView />;
}