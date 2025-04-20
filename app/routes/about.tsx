import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | WeatherBericht" },
    { name: "description", content: "Learn about the WeatherBericht weather application" },
  ];
}

/**
 * About page with project information
 */
export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">About WeatherBericht</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
        <p className="mb-4">
          WeatherBericht is a modern weather dashboard application built with React that 
          provides users with current weather conditions and forecasts for any location 
          around the world.
        </p>
        <p className="mb-4">
          The name "WeatherBericht" combines the English word "Weather" with the German 
          word "Bericht" (meaning "report"), symbolizing our commitment to providing 
          accurate and detailed weather reports.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Current weather conditions display</li>
          <li>5-day weather forecast</li>
          <li>Search for weather by city name</li>
          <li>Geolocation support to get local weather</li>
          <li>Temperature unit toggle (Celsius/Fahrenheit)</li>
          <li>Recent searches history with localStorage persistence</li>
          <li>Responsive design for mobile and desktop</li>
          <li>Dark/light mode support</li>
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center text-3xl mb-2">
                {tech.icon}
              </div>
              <span className="text-sm text-center">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
        <p className="mb-4">
          Weather data is provided by the Open-Meteo API, a free and open-source weather API.
        </p>
        <div className="flex justify-center">
          <a 
            href="https://open-meteo.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Visit Open-Meteo
          </a>
        </div>
      </div>
    </div>
  );
}

// Technology icons and labels
const technologies = [
  {
    name: "React",
    icon: "⚛️",
  },
  {
    name: "TypeScript",
    icon: "TS",
  },
  {
    name: "React Router",
    icon: "🛣️",
  },
  {
    name: "Tailwind CSS",
    icon: "🎨",
  },
  {
    name: "Vite",
    icon: "⚡",
  },
  {
    name: "Open-Meteo API",
    icon: "🌦️",
  },
  {
    name: "Axios",
    icon: "🔄",
  },
  {
    name: "LocalStorage",
    icon: "💾",
  },
];