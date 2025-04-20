import { Link } from "react-router";
import type { Route } from "./+types/terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service | WeatherBericht" },
    { name: "description", content: "Terms of Service for the WeatherBericht weather application" },
  ];
}

/**
 * Terms of Service page
 */
export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">Last updated: April 20, 2025</p>
        
        <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using WeatherBericht, you agree to be bound by these Terms of Service 
          and our Privacy Policy. If you do not agree to these terms, please do not use our service.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
        <p className="mb-4">
          WeatherBericht provides weather forecast information and related services. The weather 
          data is sourced from third-party providers, primarily the Open-Meteo API. We do our best 
          to ensure accuracy, but cannot guarantee the precision of weather information provided.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
        <p className="mb-4">When using our service, you agree not to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Use WeatherBericht for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the integrity or performance of the service</li>
          <li>Attempt to reverse engineer, decompile, or otherwise try to extract the source code of our application</li>
          <li>Use any automated system or software to extract data from our service ("scraping")</li>
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
        <p className="mb-4">
          The WeatherBericht name, logo, software, and all content within the application are 
          protected by copyright, trademark, and other intellectual property laws. You may not 
          reproduce, distribute, modify, or create derivative works based on any part of our 
          service without explicit written permission.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">5. Disclaimer of Warranties</h2>
        <p className="mb-4">
          WeatherBericht is provided "as is" and "as available" without warranties of any kind, 
          either expressed or implied. We do not guarantee that:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>The service will always be available or error-free</li>
          <li>Weather information will be 100% accurate</li>
          <li>The service will meet your specific requirements</li>
          <li>Any errors in the service will be corrected</li>
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by applicable law, WeatherBericht and its creators 
          shall not be liable for any indirect, incidental, special, consequential, or punitive 
          damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
          or any loss of data, use, goodwill, or other intangible losses resulting from:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Your use or inability to use the service</li>
          <li>Any actions taken based on weather information provided by our service</li>
          <li>Unauthorized access to or alteration of your data</li>
          <li>Any third-party conduct on our service</li>
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
        <p className="mb-4">
          Our service incorporates data from third-party APIs. We are not responsible for the 
          accuracy, availability, or reliability of these third-party services. Use of data 
          obtained from these services is subject to their respective terms and conditions.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">8. Modifications to Service</h2>
        <p className="mb-4">
          We reserve the right to modify, suspend, or discontinue any part of WeatherBericht 
          at any time, with or without notice to you. We will not be liable to you or any third 
          party for any such modifications, suspension, or discontinuation.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms of Service from time to time. We will notify you of any 
          changes by posting the new Terms on this page. Your continued use of WeatherBericht 
          after such changes constitutes your acceptance of the new Terms.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
          <span className="block mt-2 font-medium">terms@weatherbericht.example.com</span>
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