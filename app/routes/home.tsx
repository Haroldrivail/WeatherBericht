import type { Route } from "./+types/home";
import { WeatherDashboard } from "../components/WeatherDashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Weather Dashboard | WeatherBericht" },
    { name: "description", content: "Get current weather and forecast information for any location" },
  ];
}

export default function Home() {
  return <WeatherDashboard />;
}
