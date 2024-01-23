import { View, Image, Text } from 'react-native';
import style from './CityWeatherDaiIyItem.style';
import { OpenMeteoDataDaily } from '../../../types/Weather';
import { weatherCodeIcons } from '../../../utils/weatherImgCode';
import { Thermometer, Wind, CloudRainWind } from 'lucide-react-native';
import { dateOptions, iconSettings as icon } from '../weatherSettings';


type Props = {
  weather: OpenMeteoDataDaily;
}

export const CityWeatherDailyItem = ({
  weather,
}: Props) => {
  const { temperatureMin, temperatureMax, windSpeed, precipitation, time } = weather;
  const dateFormatted = new Date(time);
  const formattedDate = dateFormatted.toLocaleDateString('fr-FR', dateOptions);

  return (
    <View style={style.cityWeather}> 
      <Image 
        source={weatherCodeIcons.day[weather.weatherCode]} 
        style={style.image} 
      />
      <View style={style.cityWeatherInfo}>
          <Text style={style.cityWeatherDate}>{formattedDate}</Text>
          <View style={style.cityWeatherInfoDetail}>
            <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
            <View style={style.cityWeatherTemp}> 
              <Text style={style.cityWeatherTempMin}>{temperatureMin}</Text>
              <Text>|</Text>
              <Text style={style.cityWeatherTempMax}>{temperatureMax}</Text></View>
          </View>
          <View style={style.cityWeatherInfoDetail}>
            <CloudRainWind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
            <Text> {precipitation}</Text>
          </View>
          <View style={style.cityWeatherInfoDetail}>
            <Wind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
            <Text> {windSpeed}</Text>
          </View>
      </View> 
    </View>
  )
};
