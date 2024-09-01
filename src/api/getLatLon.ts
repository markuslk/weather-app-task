export async function getLatLon(
  city: string,
): Promise<{ lat: number; lon: number; name: string }> {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
  );
  if (!res.ok) {
    throw new Error("Error getting weather forecast data");
  }
  const data = await res.json();

  if (!data) {
    throw new Error("Error getting data");
  }

  const { lat, lon, name } = data[0];
  return { lat, lon, name };
}
