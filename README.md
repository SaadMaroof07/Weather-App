# Weather App

A responsive weather application built with **React.js** and the **OpenWeatherMap API**.
Search any city to see the current temperature, conditions, humidity, and wind speed —
or use the 📍 button to get weather for your current location.

Final task — Aptura Tech Solutions, 1-Month Internship Program (Batch 02).

## Features

- Search weather by city name
- "Use my location" (browser geolocation)
- °C / °F unit toggle
- City name, temperature, weather condition + icon, humidity, wind speed
- Loading state while fetching
- Clear error messages for invalid city names, network failures, or a missing/invalid API key

## Tech Stack

- **React 19** + **Vite** — fast dev server and build tooling
- Plain CSS (no framework) — kept dependency-free
- **OpenWeatherMap** Current Weather API

## Project structure

```
src/
├── components/
│   ├── SearchBar.jsx       # controlled search input + location button
│   ├── WeatherCard.jsx     # presentational display of weather data
│   ├── UnitToggle.jsx      # °C / °F switch
│   ├── Loader.jsx          # loading spinner
│   └── ErrorMessage.jsx    # error banner
├── hooks/
│   └── useWeather.js       # all fetching + loading/error state, reusable
├── services/
│   └── weatherApi.js       # OpenWeatherMap API calls, normalizes the response
├── App.jsx                 # composes the components together
├── App.css / index.css     # styling
└── main.jsx                # React entry point
```

This separation keeps each piece focused on one job: `weatherApi.js` is the
only file that knows about OpenWeatherMap's URL/response shape, `useWeather.js`
owns all state management, and every component under `components/` just
renders props — `WeatherCard` in particular has no logic of its own, so it's
easy to reuse or test on its own.

## Setup

1. **Get a free API key**
   Sign up at [openweathermap.org/api](https://openweathermap.org/api) and
   grab a key from "My API keys". New keys can take up to ~2 hours to activate.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your API key**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and paste your key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_key_here
   ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open the printed local URL (usually http://localhost:5173).

5. **Build for production**
   ```bash
   npm run build
   ```
   Output goes to `dist/`.

## Deployment (Vercel)

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Vite; leave the default build settings (`npm run build`, output dir `dist`).
4. Under **Environment Variables**, add:
   - Key: `VITE_OPENWEATHER_API_KEY`
   - Value: your OpenWeatherMap key
5. Click **Deploy**.

### Deployment (Netlify) — alternative

1. Push to GitHub, then **Add new site → Import an existing project** on Netlify.
2. Build command: `npm run build`, publish directory: `dist`.
3. Add the same `VITE_OPENWEATHER_API_KEY` environment variable under **Site settings → Environment variables**.
4. Deploy.

## Error handling

- Empty search → "Please enter a city name."
- Unknown city (404 from the API) → friendly "couldn't find that city" message
- Missing/invalid API key → explicit message telling you to check `.env`
- Any other network/API failure → generic retry message, without crashing the UI
