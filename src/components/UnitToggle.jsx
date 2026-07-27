export default function UnitToggle({ units, onChange, disabled }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Temperature units">
      <button
        type="button"
        className={units === "metric" ? "active" : ""}
        onClick={() => onChange("metric")}
        disabled={disabled}
      >
        °C
      </button>
      <button
        type="button"
        className={units === "imperial" ? "active" : ""}
        onClick={() => onChange("imperial")}
        disabled={disabled}
      >
        °F
      </button>
    </div>
  );
}
