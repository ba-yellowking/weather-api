import axios from "axios";

export const getWeatherByCity = async (city: string, unit: "metric" | "imperial") => {
  const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  return response.data;
  // посмотреть response
};