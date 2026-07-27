import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import UnitToggle from "./components/UnitToggle";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

export default function App() {
  const { weather, loading, error, units, searchCity, searchByLocation, changeUnits } = useWeather();

  return (
    <div className="app">
      <header className="app__header">
        <h1>Weather App</h1>
        <p className="subtitle">Search any city for real-time weather</p>
      </header>

      <SearchBar onSearch={searchCity} onUseLocation={searchByLocation} disabled={loading} />

      {weather && !loading && (
        <UnitToggle units={units} onChange={changeUnits} disabled={loading} />
      )}

      <main className="app__content">
        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && weather && <WeatherCard weather={weather} />}
        {!loading && !error && !weather && (
          <p className="hint">Search for a city to see the current weather.</p>
        )}
      </main>
    </div>
  );
}
