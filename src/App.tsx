import './App.css';
import { useState } from "react";
import axios from "axios";
import Background from "./components/Background.tsx";

function App() {

  interface WeatherData {
    name: string;
    main: {
      temp: number;
      feels_like: number;
    };
    weather: {
      main: string;
      icon: string;
    }[];
  }

  type Fahrenheit = number;

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [backgroundQuery, setBackgroundQuery] = useState<string>("nature");

  const toFahrenheit = (celsius: number): Fahrenheit =>
    Math.round((celsius * 9) / 5 + 32);

  const inputCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const getWeather = () => {

    const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

    axios
      .get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data)
        setBackgroundQuery(city);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="weather-container">
      {<Background query={backgroundQuery} />}

      <div className={`weather ${weatherData ? "expanded" : ""}`}>
        {weatherData ? (
          <>
            <div className="weather__header">
              <p className="selected-city">{weatherData.name}</p>
            </div>

            <div className="weather__body">
              <p className="temp">
                {`${Math.floor(weatherData.main.temp)}°C / ${toFahrenheit(weatherData.main.temp)}°F`}
              </p>
            </div>

            <div className="weather__footer">
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter a city"
                  value={city}
                  onChange={inputCity}
                  className="input-area"
                />
                <button className="button-weather" onClick={getWeather}>
                  <p>Get weather</p>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter a city"
              value={city}
              onChange={inputCity}
              className="input-area"
            />
            <button className="button-weather" onClick={getWeather}>
              <p>Get weather</p>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
