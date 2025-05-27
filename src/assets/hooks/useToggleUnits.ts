import { useState, useEffect } from "react";
import { getWeatherByCity } from "../../services/GetWeather.tsx";
import { WeatherData } from "../../types/weather";

export function useToggleUnits(weatherData: WeatherData | null, setWeatherData: React.Dispatch<React.SetStateAction<WeatherData | null>>, setError: React.Dispatch<React.SetStateAction<boolean>>) {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const toggleUnit = () => {
    setUnit(prev => (prev === "metric" ? "imperial" : "metric"));
  };

  useEffect(() => {
    if (weatherData?.name) {
      getWeatherByCity(weatherData.name, unit)
        .then(setWeatherData)
        .catch(() => setError(true));
    }
  }, [unit, weatherData?.name, setWeatherData, setError]);

  return { unit, toggleUnit };
}
