import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCurrentWeather } from "./api/getCurrentWeather";
import CurrentWeather from "./components/CurrentWeather";
import LocationInput from "./components/LocationInput";
import Logo from "./components/Logo";
import ArrowIcon from "./components/icons/ArrowIcon";
import {
  type ForecastDataResponse,
  type CurrentWeatherType,
} from "./lib/types";
import { useInputContext } from "./hooks/useInputContext";
import { getWeatherForecast } from "./api/getWeatherForecast";
import { LoaderCircle } from "lucide-react";

const WeatherPage = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const [weatherData, setWeatherData] = useState<
    CurrentWeatherType | undefined
  >(undefined);
  const [forecastData, setForecastData] = useState<
    ForecastDataResponse | undefined
  >(undefined);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setIsOpen, setSearch, selectedLocation } = useInputContext();

  useEffect(() => {
    let isSubscribed = true;
    setIsOpen(false);
    setLoading(true);
    const getData = async () => {
      if (!lat || !lon) return;
      const data = await getCurrentWeather(lat, lon);

      if (isSubscribed) {
        setWeatherData(data);
      }
      if (data && !selectedLocation) {
        setIsOpen(false);
        setSearch(data.name);
      }
      const forecast = await getWeatherForecast(lat, lon);
      if (isSubscribed) {
        setForecastData(forecast);
      }
      setLoading(false);
    };

    getData().catch((error) => {
      setLoading(false);
      setError(error);
    });

    return () => {
      isSubscribed = false;
    };
  }, [lat, lon, setSearch, selectedLocation, setIsOpen]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6">
        <Logo />
        <div className="mx-auto flex w-full max-w-[1047px] -translate-y-7.5 flex-col items-center xl:-translate-y-[149px] xl:pt-0">
          <div className="flex w-full max-w-[501px] flex-col items-center gap-2.5 md:max-w-[680px] md:flex-row md:justify-center">
            <Link
              to={"/"}
              className="group flex items-center gap-2 self-start transition-opacity md:p-2.5"
            >
              <ArrowIcon className="shrink-0 transition-opacity group-hover:opacity-80" />
              <span className="border-b font-light transition-opacity group-hover:opacity-80 md:hidden">
                Go back
              </span>
            </Link>
            <LocationInput />
          </div>
          {weatherData && forecastData ? (
            <CurrentWeather
              currentWeather={weatherData}
              forecastWeather={forecastData}
            />
          ) : isLoading ? (
            <div className="py-18 md:pt-32">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <div className="py-18 md:pt-32">{error?.message}</div>
          )}
        </div>
      </div>
    </>
  );
};
export default WeatherPage;
