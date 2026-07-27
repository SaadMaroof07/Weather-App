export default function Loader() {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Fetching weather...</p>
    </div>
  );
}
