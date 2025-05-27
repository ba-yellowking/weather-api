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
    description: string;
  }[];
  wind: {
    speed: number;
  }
}

function App() {

  const localBackgrounds = [bg1, bg2, bg3, bg4, bg5];

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [backgroundQuery, setBackgroundQuery] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isLoading, setIsLoading] = useState(false);

  const inputCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  // useEffect for randomly changing local background images
  useEffect(() => {
    const randomBg = localBackgrounds[Math.floor(Math.random() * localBackgrounds.length)];
    document.body.style.backgroundImage = `url(${randomBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background-image 0.5s ease';
  }, []);


  const toggleUnit = () => {
    setUnit(prev => prev === "metric" ? "imperial" : "metric");
    console.log(unit)
  };
  // useEffect for switch from metric C to imperial F
  useEffect(() => {
    if (weatherData) {
      getWeather();
    }
  }, [unit]);


  const getWeather = async () => {
    setIsLoading(true);
    try {
      const data = await getWeatherByCity(city, unit);
      console.log(data)
      setWeatherData(data);
      setBackgroundQuery(city);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-container">
      {weatherData && <Background query={backgroundQuery} />}

      <div className={`weather ${weatherData ? "expanded" : ""}`}>
        {weatherData ? (
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
                  {`Feels like: ${weatherData.main.feels_like} ${unit === "metric" ? "°C" : "°F"}`}
                </p>
                <p className={`wind-speed ${isLoading ? "hidden" : ""}`}>
                  {`Wind speed: ${weatherData.wind.speed} ${unit === "metric" ? "m/s" : "mi/h"}`}
                </p>
              </div>
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
