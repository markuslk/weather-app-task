export async function getWeatherForecast(lat: string, lon: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
  );
  if (!res.ok) {
    throw new Error("Error getting weather forecast data");
  }
  const data = await res.json();
  return data;
}
