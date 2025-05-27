export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    main: string;
    icon: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
  dt: number;
}