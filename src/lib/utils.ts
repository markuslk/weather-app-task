import { ForecastDataType } from "./types";

export function convertToDate(
  timezone: number,
  dt: number,
  weekdayFormat: "short" | "long",
): string {
  const utc_time = new Date(dt * 1000);
  const local_time = new Date(utc_time.getTime() + timezone * 1000);

  const options = { weekday: weekdayFormat };
  const dateFormatter = new Intl.DateTimeFormat("UTC", options);

  return dateFormatter.format(local_time);
}

export function convertPressure(num: number) {
  const convertedPressure = ((3 * num) / 4).toFixed(2);
  return convertedPressure;
}

export function getFrequentWeatherCode(weatherList: ForecastDataType[]) {
  const weatherCodes: { [key: number]: number } = {};

  weatherList.forEach((item) => {
    item.weather.forEach((weather) => {
      weatherCodes[weather.id] = weatherCodes[weather.id] + 1;
    });
  });

  const weatherCode = Object.keys(weatherCodes).reduce((prev, curr) => {
    return weatherCodes[Number(curr)] > weatherCodes[Number(prev)]
      ? curr
      : prev;
  }, Object.keys(weatherCodes)[0]);

  return Number(weatherCode);
}
