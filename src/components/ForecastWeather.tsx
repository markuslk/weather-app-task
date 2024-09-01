import { ForecastDataType } from "../lib/types";
import WeatherIcon from "./icons/WeatherIcon";

const ForecastWeather = ({
  day,
  forecastData,
  weatherCode,
}: {
  day: string;
  forecastData: ForecastDataType[];
  weatherCode: number;
}) => {
  const avgDailyTemp =
    forecastData.reduce((acc, curr) => acc + curr.main.temp, 0) /
    forecastData.length;
  const avgDailyWindSpeed =
    forecastData.reduce((acc, curr) => acc + curr.wind.speed, 0) /
    forecastData.length;

  return (
    <div className="animate-fade flex w-full flex-col items-center gap-2.25 bg-dark-gray p-4 text-secondary-white">
      <h4 className="font-medium leading-4.5">{day}</h4>
      <WeatherIcon
        weatherCode={weatherCode.toString()}
        color="#B7B1B1"
        size="32"
      />
      <h5 className="text-xs/4.5">{avgDailyTemp.toFixed(2)}°C</h5>
      <h5 className="text-xs/4.5">{avgDailyWindSpeed.toFixed(2)} m/s</h5>
    </div>
  );
};
export default ForecastWeather;
