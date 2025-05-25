import "./InputCity.css";

interface InputCityProps {
  city: string;
  inputCity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  getWeather: () => void;
}

function InputCity({ city, inputCity, handleKeyDown, getWeather }: InputCityProps) {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={inputCity}
        className="input-area"
        onKeyDown={handleKeyDown}
      />
      <button className="button-weather" onClick={getWeather}>
        <p>Get weather</p>
      </button>
    </div>
  );
}

export default InputCity;
