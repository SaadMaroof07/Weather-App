import { useCallback, useState } from "react";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/weatherApi";

/**
 * Encapsulates all state + logic for fetching weather data, so App.jsx
 * only has to render UI and doesn't need to manage loading/error state
 * itself. This keeps the data-fetching logic reusable and testable
 * independently of any component.
 */
export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState("metric");

  const searchCity = useCallback(async (city, unitOverride) => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError("Please enter a city name.");
      return;
    }

    const effectiveUnits = unitOverride || units;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(trimmed, effectiveUnits);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const searchByLocation = useCallback(async (unitOverride) => {
    if (!navigator.geolocation) {
      setError("Geolocation isn't supported by your browser.");
      return;
    }

    const effectiveUnits = unitOverride || units;
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const data = await fetchWeatherByCoords(coords.latitude, coords.longitude, effectiveUnits);
          setWeather(data);
        } catch (err) {
          setError(err.message);
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access was denied. Please search for a city instead.");
        setLoading(false);
      }
    );
  }, [units]);

  // Re-fetches the currently displayed city when the unit toggle changes,
  // so switching °C/°F updates the temperature without a manual re-search.
  const changeUnits = useCallback((newUnits) => {
    setUnits(newUnits);
    if (weather) {
      searchCity(weather.city, newUnits);
    }
  }, [weather, searchCity]);

  return { weather, loading, error, units, searchCity, searchByLocation, changeUnits };
}
