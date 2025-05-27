import React from "react";

export const createHandlers = (
  fetchWeather: () => void,
  setCity: (val: string) => void
) => {
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return { handleCityChange, handleKeyDown };
};