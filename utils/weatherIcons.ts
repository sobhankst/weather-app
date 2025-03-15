import {
  BiSun,
  BiMoon,
  BiCloud,
  BiCloudRain,
  BiCloudSnow,
  BiCloudDrizzle,
  BiWind,
  BiCloudLightning,
} from "react-icons/bi";

export const weatherIcons = {
  "01d": BiSun, // Clear sky (day)
  "01n": BiMoon, // Clear sky (night)
  "02d": BiCloud, // Few clouds (day)
  "02n": BiCloud, // Few clouds (night)
  "03d": BiCloud, // Scattered clouds (day)
  "03n": BiCloud, // Scattered clouds (night)
  "04d": BiCloud, // Broken clouds (day)
  "04n": BiCloud, // Broken clouds (night)
  "09d": BiCloudRain, // Shower rain (day)
  "09n": BiCloudRain, // Shower rain (night)
  "10d": BiCloudDrizzle, // Rain (day)
  "10n": BiCloudDrizzle, // Rain (night)
  "11d": BiCloudLightning, // Thunderstorm (day)
  "11n": BiCloudLightning, // Thunderstorm (night)
  "13d": BiCloudSnow, // Snow (day)
  "13n": BiCloudSnow, // Snow (night)
  "50d": BiWind, // Mist (day)
  "50n": BiWind, // Mist (night)
};

export type WeatherIconCode = keyof typeof weatherIcons;
