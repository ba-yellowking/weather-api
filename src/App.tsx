import './App.css';
import { useEffect, useState } from "react";
import Background from "./components/Background.tsx";
import InputCity from "./components/inputCity/InputCity.tsx";

import bg1 from "./assets/background-image/bg-image-1.jpg";
import bg2 from "./assets/background-image/bg-image-2.jpg";
import bg3 from "./assets/background-image/bg-image-3.jpg";
import bg4 from "./assets/background-image/bg-image-4.jpg";
import bg5 from "./assets/background-image/bg-image-5.jpg";
import {getWeatherByCity} from "./services/GetWeather.tsx";

export interface WeatherData {
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

function App() {

  const localBackgrounds = [bg1, bg2, bg3, bg4, bg5];

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [backgroundQuery, setBackgroundQuery] = useState<string>("");

  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const toggleUnit = () => {
    setUnit(prev => prev === "metric" ? "imperial" : "metric");
    console.log(unit)
  };

  const inputCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  useEffect(() => {
    const randomBg = localBackgrounds[Math.floor(Math.random() * localBackgrounds.length)];
    document.body.style.backgroundImage = `url(${randomBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background-image 0.5s ease';
  }, []);

  const getWeather = () => {
    getWeatherByCity(city, unit)
      .then(data => {
        console.log(data)
        setWeatherData(data);
        setBackgroundQuery(city);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="weather-container">
      {weatherData && <Background query={backgroundQuery} />}

      <div className={`weather ${weatherData ? "expanded" : ""}`}>
        {weatherData ? (
          <>
            <div className="weather__header">
              <p className="selected-city">{weatherData.name}</p>

              <div className="unit" onClick={() => {
                toggleUnit();
                if (city) getWeather();
              }}>
                {unit === "metric" ? "°C" : "°F"}
              </div>

            </div>

            <div className="weather__body">
              <p className="temp">
                {unit === "metric"
                  ? `${Math.floor(weatherData.main.temp)}°C`
                  : `${Math.floor(weatherData.main.temp)}°F`}
              </p>
            </div>

            <div className="weather__footer">
              <InputCity city={city} inputCity={inputCity} handleKeyDown={handleKeyDown} getWeather={getWeather}/>
            </div>
          </>
        ) : (
          <InputCity city={city} inputCity={inputCity} handleKeyDown={handleKeyDown} getWeather={getWeather}/>
        )}
      </div>
    </div>
  );
}

export default App;
