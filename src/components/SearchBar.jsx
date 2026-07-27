import { useState } from "react";

/**
 * Controlled search input. Keeps its own draft text in local state and
 * only calls back up to the parent when the user actually submits,
 * so the parent doesn't re-render on every keystroke.
 */
export default function SearchBar({ onSearch, onUseLocation, disabled }) {
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(city);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
        aria-label="City name"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Search
      </button>
      <button
        type="button"
        className="location-btn"
        onClick={onUseLocation}
        disabled={disabled}
        title="Use my current location"
        aria-label="Use my current location"
      >
        📍
      </button>
    </form>
  );
}
