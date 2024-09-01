export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type LocationData = {
  lat: number;
  lon: number;
  name: string;
};

export type CurrentWeatherType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type ForecastDataType = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "1h": number;
  };
  sys: {
    pod: "d" | "n";
  };
  dt_txt: string;
};

export type ForecastDataResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastDataType[];
};

export type City = {
  name: string;
  countryCode: string;
};
