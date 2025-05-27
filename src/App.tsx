import './App.css';
import { useState } from "react";
import Background from "./components/Background.tsx";
import InputCity from "./components/inputCity/InputCity.tsx";
import {getWeatherByCity} from "./services/GetWeather.tsx";
import {WeatherData} from "./types/weather";
import { createHandlers } from "./handlers/WeatherHandlers.tsx";
import RandomLocalBackground from "./assets/background-image/BackgroundImage.tsx";
import {useToggleUnits} from "./assets/hooks/useToggleUnits.ts";
import {FormatDate} from "./utils/FormatDate.ts";

function App() {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [backgroundQuery, setBackgroundQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { unit, toggleUnit } = useToggleUnits(weatherData, setWeatherData, setError);


  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const data = await getWeatherByCity(city, unit);
      console.log(data)
      setWeatherData(data);
      setBackgroundQuery(city);
      setError(false);
    } catch (error) {
      console.error(error);
      setCity("")
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const { handleCityChange, handleKeyDown } = createHandlers(fetchWeather, setCity);

  // date
  let formattedDate = "";
  if (weatherData) {
    formattedDate = FormatDate(weatherData.dt)
  }

  return (
    <div className="weather-container">
      <RandomLocalBackground />
      {weatherData && <Background query={backgroundQuery} />}

      <div className={`weather ${weatherData ? "expanded" : ""}`}>
        {weatherData && (
          <>
            <div className="weather__header">
              <div className="header-left">
                <p className="selected-city">{weatherData.name}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].main}
                  className="weather-icon"
                />
                <p className="weather-description">{weatherData.weather[0].description}</p>
              </div>

              <p className="date">{formattedDate}</p>

              <div className="unit" onClick={toggleUnit}>
                {unit === "metric" ? "°F" : "°C"}
              </div>
            </div>

            <div className="weather__body">
              <div className="body-left">
                <div className={`temp ${isLoading ? "hidden" : ""}`}>
                  {Math.floor(weatherData.main.temp)}{unit === "metric" ? "°C" : "°F"}
                </div>
              </div>
              <div className="body-right">
                <p className={`feels-like ${isLoading ? "hidden" : ""}`}>
                  Feels like: {weatherData.main.feels_like} {unit === "metric" ? "°C" : "°F"}
                </p>
                <p className={`wind-speed ${isLoading ? "hidden" : ""}`}>
                  Wind speed: {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mi/h"}
                </p>
              </div>
            </div>
          </>
        )}

        <div className="weather__footer">
          <InputCity
            city={city}
            handleCityChange={handleCityChange}
            handleKeyDown={handleKeyDown}
            fetchWeather={fetchWeather}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
