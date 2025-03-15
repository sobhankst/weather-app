import React, { useMemo } from "react";
import { WeatherIconCode, weatherIcons } from "../utils/weatherIcons";
interface WeatherIconProps {
  iconCode: WeatherIconCode;
}

const WeatherIcon = ({ iconCode }: WeatherIconProps) => {
  const IconComponent = useMemo(() => weatherIcons[iconCode], [iconCode]);

  return <IconComponent className="size-32" />;
};
export default WeatherIcon;
