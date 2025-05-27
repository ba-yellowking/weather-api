import "./InputCity.css";

interface InputCityProps {
  city: string;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  fetchWeather: () => void;
  error: boolean;
}

function InputCity({ city, handleCityChange, handleKeyDown, fetchWeather, error }: InputCityProps) {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder={error ? "Sorry, can't find this city" : "Enter a city"}
        value={city}
        onChange={handleCityChange}
        className="input-area"
        onKeyDown={handleKeyDown}
      />
      <button className="button-weather" onClick={fetchWeather}>
        <p>Get weather</p>
      </button>
    </div>
  );
}

export default InputCity;
