"use client";
import { useState } from "react";
import {
  BiSun,
  BiCloud,
  BiCloudRain,
  BiCloudSnow,
  BiCloudDrizzle,
  BiWind,
  BiSearch,
  BiCloudLightning,
  BiMoon,
} from "react-icons/bi";
const getWeatherIcon = (iconCode: string) => {
  switch (iconCode) {
    // Day icons
    case "01d": // Clear sky (day)
      return <BiSun className="size-32 text-yellow-400" />;
    case "02d": // Few clouds (day)
      return <BiCloud className="size-32 text-gray-400" />;
    case "03d": // Scattered clouds (day)
      return <BiCloud className="size-32 text-gray-500" />;
    case "04d": // Broken clouds (day)
      return <BiCloud className="size-32 text-gray-600" />;
    case "09d": // Shower rain (day)
      return <BiCloudRain className="size-32 text-blue-400" />;
    case "10d": // Rain (day)
      return <BiCloudDrizzle className="size-32 text-blue-500" />;
    case "11d": // Thunderstorm (day)
      return <BiCloudLightning className="size-32 text-yellow-600" />;
    case "13d": // Snow (day)
      return <BiCloudSnow className="size-32 text-white" />;
    case "50d": // Mist (day)
      return <BiWind className="size-32 text-gray-300" />;

    // Night icons
    case "01n": // Clear sky (night)
      return <BiMoon className="size-32 text-gray-300" />;
    case "02n": // Few clouds (night)
      return <BiCloud className="size-32 text-gray-400" />;
    case "03n": // Scattered clouds (night)
      return <BiCloud className="size-32 text-gray-500" />;
    case "04n": // Broken clouds (night)
      return <BiCloud className="size-32 text-gray-600" />;
    case "09n": // Shower rain (night)
      return <BiCloudRain className="size-32 text-blue-400" />;
    case "10n": // Rain (night)
      return <BiCloudDrizzle className="size-32 text-blue-500" />;
    case "11n": // Thunderstorm (night)
      return <BiCloudLightning className="size-32 text-yellow-600" />;
    case "13n": // Snow (night)
      return <BiCloudSnow className="size-32 text-white" />;
    case "50n": // Mist (night)
      return <BiWind className="size-32 text-gray-300" />;

    // Default icon (clear sky)
    default:
      return <BiSun className="size-32 text-yellow-400" />;
  }
};

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export default function Home() {
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WeatherData | null>(null);
  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`,
      );
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message);
        console.log(errorData);
        setData(null);
        return;
      }
      const weatherData: WeatherData = await res.json();
      setData(weatherData);
      setError(null);
      console.log(weatherData);
    } catch {
      setError("Network error. Please try again.");
      setData(null);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-45 from-purple-500/60 to-pink-500/60 p-5">
      <div className="flex h-full w-full max-w-md flex-col items-center gap-2 rounded-xl bg-linear-30 from-purple-500 to-pink-500 p-4 shadow-md backdrop-blur-2xl">
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            name="city"
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            className={`${error ? "border-2 border-red-500" : "border-none"} w-full rounded-full bg-white px-5 py-2 outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <button
            onClick={getWeather}
            type="submit"
            aria-label="search"
            className="flex cursor-pointer items-center justify-center rounded-full bg-purple-500 p-3 text-xl font-medium text-white shadow-md"
          >
            <BiSearch className="h-6 w-6 object-cover" />
          </button>
        </div>
        {error && <p className="mt-2 text-red-300">{error}</p>}

        <div className="mt-10 flex w-full items-center justify-center text-white">
          {getWeatherIcon(data?.weather[0]?.icon || "01d")}
          {/* <BiMoon className="size-32 object-cover" /> */}
        </div>
        <h2 className="my-5 text-4xl font-bold">
          {data ? data.name : "London"}
        </h2>
        <p className="text-6xl font-medium text-white">
          {data ? Math.round(data.main.temp) : 16}&#0176; <sup>c</sup>
        </p>
        <div className="mt-5 flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <BiWind className="size-10 object-cover" />
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-lg font-medium capitalize">Speed</h3>
              <p className="text-xl font-medium text-white">
                {data ? data.wind.speed : 0} km/h
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end gap-1">
              <h3 className="text-lg font-medium capitalize">Humidity</h3>
              <p className="text-xl font-medium text-white">
                {data ? data.main.humidity : 0}
              </p>
            </div>
            <BiWind className="size-10 rotate-180 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
