import {
  CurrentWeatherType,
  ForecastDataResponse,
  ForecastDataType,
} from "../lib/types";
import { convertPressure, getFrequentWeatherCode } from "../lib/utils";
import ForecastWeather from "./ForecastWeather";
import WeatherIcon from "./icons/WeatherIcon";

const CurrentWeather = ({
  currentWeather,
  forecastWeather,
}: {
  currentWeather: CurrentWeatherType;
  forecastWeather: ForecastDataResponse;
}) => {
  const timeOptions = new Intl.DateTimeFormat("en-GB", {
    hourCycle: "h24",
    timeStyle: "short",
  });
  const dayOptions = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
  });
  const today = dayOptions.format(new Date());

  const dailyForecasts = forecastWeather.list.reduce(
    (acc: { [key: string]: ForecastDataType[] }, item) => {
      const date = dayOptions.format(new Date(item.dt * 1000));

      if (date === today) return acc;

      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {},
  );

  const dailyForecastData = Object.keys(dailyForecasts).map((date) => {
    const forecastData = dailyForecasts[date];
    return {
      date,
      data: forecastData,
      mostFrequentWeatherCode: getFrequentWeatherCode(forecastData),
    };
  });

  return (
    <div className="flex w-full max-w-[680px] flex-col gap-7.5 py-7.5 md:gap-16 md:pt-18">
      <div className="animate-fade flex flex-col items-center gap-4 rounded-[10px] bg-dark-gray p-8 transition sm:flex-row sm:justify-between">
        <div className="flex gap-6">
          <WeatherIcon
            weatherCode={currentWeather.weather[0].id.toString()}
            color="#F8F8F8"
            size="62"
          />
          <div className="flex flex-col gap-2.5 font-medium text-secondary-white">
            <p className="text-4xl/9">Today</p>
            <p className="text-2xl/7">
              {timeOptions.format(Date.now())}
              <span className="ml-2 text-xs/3.5 text-light-gray">
                (updated:{" "}
                {timeOptions.format(new Date(currentWeather.dt * 1000))})
              </span>
            </p>
          </div>
        </div>
        {/* Weather info in details */}
        <div className="w-full sm:max-w-[215px]">
          <ul className="mx-auto flex max-w-[240px] flex-col gap-2 text-sm/4.5 sm:max-w-full">
            <li className="flex justify-between gap-2 sm:grid sm:grid-cols-2">
              <div className="font-light">Temperature:</div>
              <div>{`${currentWeather.main.temp}°C`}</div>
            </li>
            <li className="flex justify-between gap-2 sm:grid sm:grid-cols-2">
              <div className="font-light">Wind:</div>
              <div>{`${currentWeather.wind.speed} m/s`}, NW</div>
            </li>
            <li className="flex justify-between gap-2 sm:grid sm:grid-cols-2">
              <div className="font-light">Feels like:</div>
              <div>{`${currentWeather.main.feels_like}°C`}</div>
            </li>
            <li className="flex justify-between gap-2 sm:grid sm:grid-cols-2">
              <div className="font-light">Pressure:</div>
              <div>{`${convertPressure(currentWeather.main.pressure)} mmHg`}</div>
            </li>
            <li className="flex justify-between gap-2 sm:grid sm:grid-cols-2">
              <div className="font-light">Humidity:</div>
              <div>{`${currentWeather.main.humidity}%`}</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-4 md:gap-8">
        {dailyForecastData.map((day) => (
          <ForecastWeather
            key={day.date}
            day={day.date}
            forecastData={day.data}
            weatherCode={day.mostFrequentWeatherCode}
          />
        ))}
      </div>
    </div>
  );
};
export default CurrentWeather;
