# WeatherBericht - Weather Dashboard

A modern weather dashboard application built with React that allows users to check current weather conditions and forecasts for any location.

## Features

- Current weather conditions display
- 5-day weather forecast
- Search by city name
- Geolocation support to get local weather
- Temperature unit toggle (Celsius/Fahrenheit)
- Recent searches history with localStorage persistence
- Responsive design for mobile and desktop

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- OpenWeatherMap API

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/Haroldrivail/WeatherBericht.git
cd WeatherBericht
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key
```bash
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

> **Note:** Get your API key by signing up at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build files will be stored in the `dist` directory.

## What I Learned

- Working with external APIs
- Managing state in React applications
- Using React hooks (useState, useEffect)
- Implementing geolocation in web applications
- Storing and retrieving data from localStorage
- Creating responsive UI with Tailwind CSS
- Building a dark mode compatible interface

## Future Improvements

- Weather map integration
- Historical weather data visualization
- More detailed weather information
- Push notifications for weather alerts
- Additional themes and customization options

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/api)
- Weather icons from OpenWeatherMap
