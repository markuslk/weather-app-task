import { CurrentWeatherType } from "../lib/types";

export async function getCurrentWeather(
  lat: string,
  lon: string,
): Promise<CurrentWeatherType> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
  );
  if (!res.ok) {
    throw new Error("Error getting weather data");
  }
  const data = await res.json();
  return data;
}
