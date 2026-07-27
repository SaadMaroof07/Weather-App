/**
 * Pure presentational component: receives already-normalized weather
 * data as props and just renders it. Has no fetching or state logic
 * of its own, which makes it easy to reuse or test in isolation.
 */
export default function WeatherCard({ weather }) {
  const { city, country, temperature, feelsLike, condition, description, icon, humidity, windSpeed, units } = weather;
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="weather-card">
      <div className="weather-card__header">
        <h2>
          {city}
          {country ? `, ${country}` : ""}
        </h2>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description || condition}
        />
      </div>

      <p className="temperature">
        {temperature}
        {tempUnit}
      </p>
      <p className="condition">{description}</p>
      <p className="feels-like">Feels like {feelsLike}{tempUnit}</p>

      <div className="weather-card__details">
        <div className="detail">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{humidity}%</span>
        </div>
        <div className="detail">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{windSpeed} {windUnit}</span>
        </div>
      </div>
    </div>
  );
}
