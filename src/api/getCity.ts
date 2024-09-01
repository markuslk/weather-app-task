export async function getCity(
  lat: number,
  lon: number,
): Promise<{ name: string }> {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY}`,
  );
  if (!res.ok) {
    throw new Error("Error getting city location");
  }
  const data = await res.json();

  if (!data) {
    throw new Error("Error getting data");
  }

  const { name } = data[0];
  return { name };
}
