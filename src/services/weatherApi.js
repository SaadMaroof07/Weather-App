const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

/**
 * Fetches current weather for a given city from OpenWeatherMap.
 * Keeps all API-specific details (URL, params, error shapes) in one place
 * so components never talk to `fetch` directly.
 *
 * @param {string} city
 * @param {"metric"|"imperial"} units
 * @returns {Promise<object>} normalized weather data
 */
export async function fetchWeatherByCity(city, units = "metric") {
  if (!API_KEY) {
    throw new Error(
      "Missing API key. Add VITE_OPENWEATHER_API_KEY to a .env file (see .env.example)."
    );
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`We couldn't find a city called "${city}". Check the spelling and try again.`);
    }
    if (response.status === 401) {
      throw new Error("Invalid API key. Double-check VITE_OPENWEATHER_API_KEY in your .env file.");
    }
    throw new Error("Something went wrong while fetching the weather. Please try again.");
  }

  const data = await response.json();
  return normalizeWeatherData(data, units);
}

/**
 * Fetches current weather for a given latitude/longitude pair.
 * Used by the "Use my location" button.
 */
export async function fetchWeatherByCoords(lat, lon, units = "metric") {
  if (!API_KEY) {
    throw new Error(
      "Missing API key. Add VITE_OPENWEATHER_API_KEY to a .env file (see .env.example)."
    );
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Couldn't fetch weather for your location. Please try searching by city instead.");
  }

  const data = await response.json();
  return normalizeWeatherData(data, units);
}

/**
 * Maps OpenWeatherMap's raw response shape to the flat shape our
 * components expect, so the rest of the app doesn't need to know
 * anything about OpenWeatherMap's specific JSON structure.
 */
function normalizeWeatherData(data, units) {
  return {
    city: data.name,
    country: data.sys?.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0]?.main,
    description: data.weather[0]?.description,
    icon: data.weather[0]?.icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    units,
  };
}
