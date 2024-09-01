import { weatherIconMappings } from "../../lib/iconMap";

interface WeatherIconProps {
  weatherCode: string;
  color: string;
  size: string;
}

export default function WeatherIcon({
  weatherCode,
  color,
  size,
}: WeatherIconProps) {
  const IconComponent = weatherIconMappings[weatherCode];

  if (!IconComponent) return null;

  return <IconComponent color={color} size={size} />;
}
