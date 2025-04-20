import { Link } from "react-router";
import type { Route } from "./+types/privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy | WeatherBericht" },
    { name: "description", content: "Privacy policy for WeatherBericht weather application" },
  ];
}

/**
 * Privacy Policy page
 */
export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="mb-4">
          Welcome to WeatherBericht's Privacy Policy. This document explains how we collect, 
          use, and protect your personal information when you use our weather application.
        </p>
        <p className="mb-4">
          Last updated: April 20, 2025
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Location Information</h3>
            <p>
              When you use our geolocation feature, we request access to your device's location 
              data to provide local weather information. This location data is only used in the 
              moment to fetch relevant weather data and is never stored on our servers.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Search History</h3>
            <p>
              We store your recent search history locally on your device using localStorage 
              to enhance your user experience and make it easier to access previously searched 
              locations. This data never leaves your device and is not accessible to us.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
            <p>
              We may collect anonymous usage data to help improve our service. This includes 
              information like app performance metrics and feature usage statistics. This data 
              is aggregated and does not identify individual users.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide accurate weather information for your location</li>
          <li>To improve and personalize your experience with our application</li>
          <li>To analyze usage patterns and optimize our service</li>
          <li>To develop new features based on user needs</li>
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Data Security</h2>
        <p className="mb-4">
          We take data security seriously. Since most of your data is stored locally on your 
          device, the risk of exposure is minimal. For any data that may be transmitted, we 
          use industry-standard encryption protocols to ensure your information remains secure.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
        <p className="mb-4">
          WeatherBericht uses the Open-Meteo API to provide weather data. When you search for 
          weather information, your location query is sent to Open-Meteo. Please refer to 
          <a href="https://open-meteo.com/en/terms" className="text-blue-600 dark:text-blue-400 hover:underline mx-1" target="_blank" rel="noopener noreferrer">
            Open-Meteo's terms
          </a>
          for information about how they handle data.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
        <p className="mb-4">
          You have the right to clear your local storage data at any time. This can be done 
          by clicking the "Clear All" button in the recent searches dropdown.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Policy Changes</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify you of any 
          changes by posting the new policy on this page with a new "Last updated" date.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our privacy policy, please contact us at:
          <span className="block mt-2 font-medium">privacy@weatherbericht.example.com</span>
        </p>
      </div>
      
      <div className="text-center mt-8">
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}