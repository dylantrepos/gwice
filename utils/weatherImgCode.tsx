import { ImageProps } from "react-native";

type WeatherCodeIcons = {
  day: Record<string, ImageProps>;
  night: Record<string, ImageProps>;
};

export const weatherCodeIcons: WeatherCodeIcons = {
  day: {
    0: require("../assets/images/weather-icons/day-clear-sky.png"),
    1: require("../assets/images/weather-icons/day-mainly-clear.png"),
    2: require("../assets/images/weather-icons/day-partly-cloudy.png"),
    3: require("../assets/images/weather-icons/overcast.png"),
    45: require("../assets/images/weather-icons/day-fog.png"),
    48: require("../assets/images/weather-icons/day-fog.png"),
    51: require("../assets/images/weather-icons/drizzle.png"),
    53: require("../assets/images/weather-icons/drizzle.png"),
    55: require("../assets/images/weather-icons/drizzle.png"),
    56: require("../assets/images/weather-icons/drizzle-freezing.png"),
    57: require("../assets/images/weather-icons/drizzle-freezing.png"),
    61: require("../assets/images/weather-icons/rain-slight.png"),
    63: require("../assets/images/weather-icons/rain-moderate.png"),
    65: require("../assets/images/weather-icons/rain-heavy.png"),
    66: require("../assets/images/weather-icons/rain-freezing.png"),
    67: require("../assets/images/weather-icons/rain-freezing.png"),
    71: require("../assets/images/weather-icons/snow-fall-slight.png"),
    73: require("../assets/images/weather-icons/snow-fall-moderate.png"),
    75: require("../assets/images/weather-icons/snow-fall-heavy.png"),
    77: require("../assets/images/weather-icons/snow.png"),
    80: require("../assets/images/weather-icons/rain-slight.png"),
    81: require("../assets/images/weather-icons/rain-moderate.png"),
    82: require("../assets/images/weather-icons/rain-heavy.png"),
    85: require("../assets/images/weather-icons/snow-fall-slight.png"),
    86: require("../assets/images/weather-icons/snow-fall-heavy.png"),
    95: require("../assets/images/weather-icons/thunderstorm-heavy.png"),
    96: require("../assets/images/weather-icons/thunderstorm-slight.png"),
    99: require("../assets/images/weather-icons/thunderstorm-heavy.png")
  },
  night: {
    0: require("../assets/images/weather-icons/night-clear-sky.png"),
    1: require("../assets/images/weather-icons/night-mainly-clear.png"),
    2: require("../assets/images/weather-icons/night-partly-cloudy.png"),
    3: require("../assets/images/weather-icons/overcast.png"),
    45: require("../assets/images/weather-icons/night-fog.png"),
    48: require("../assets/images/weather-icons/night-fog.png"),
    51: require("../assets/images/weather-icons/drizzle.png"),
    53: require("../assets/images/weather-icons/drizzle.png"),
    55: require("../assets/images/weather-icons/drizzle.png"),
    56: require("../assets/images/weather-icons/drizzle-freezing.png"),
    57: require("../assets/images/weather-icons/drizzle-freezing.png"),
    61: require("../assets/images/weather-icons/rain-slight.png"),
    63: require("../assets/images/weather-icons/rain-moderate.png"),
    65: require("../assets/images/weather-icons/rain-heavy.png"),
    66: require("../assets/images/weather-icons/rain-freezing.png"),
    67: require("../assets/images/weather-icons/rain-freezing.png"),
    71: require("../assets/images/weather-icons/snow-fall-slight.png"),
    73: require("../assets/images/weather-icons/snow-fall-moderate.png"),
    75: require("../assets/images/weather-icons/snow-fall-heavy.png"),
    77: require("../assets/images/weather-icons/snow.png"),
    80: require("../assets/images/weather-icons/rain-slight.png"),
    81: require("../assets/images/weather-icons/rain-moderate.png"),
    82: require("../assets/images/weather-icons/rain-heavy.png"),
    85: require("../assets/images/weather-icons/snow-fall-slight.png"),
    86: require("../assets/images/weather-icons/snow-fall-heavy.png"),
    95: require("../assets/images/weather-icons/thunderstorm-heavy.png"),
    96: require("../assets/images/weather-icons/thunderstorm-slight.png"),
    99: require("../assets/images/weather-icons/thunderstorm-heavy.png")
  }
};