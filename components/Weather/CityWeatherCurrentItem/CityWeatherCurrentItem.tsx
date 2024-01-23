import { View, Image, Text, ImageProps } from 'react-native';
import style from './CityWeatherCurrentItem.style';
import { OpenMeteoDataCurrent } from '../../../types/Weather';
import { Thermometer, CloudRainWind, Wind } from 'lucide-react-native';
import { iconSettings as icon } from '../weatherSettings';

type Props = {
  imageSource: ImageProps;
  weather: OpenMeteoDataCurrent;
  currentDateText: string;
}

export const CityWeatherCurrentItem = ({
  imageSource,
  currentDateText,
  weather,
}: Props) => {
  const { temperature, relativeHumidity, windSpeed, precipitation } = weather;

  return (
    <View style={style.cityWeather}> 
      <Image 
        source={imageSource} 
        style={style.image} 
      />
      <View style={style.cityWeatherInfo}>
          <Text style={style.cityWeatherDate}>{currentDateText}</Text>
          <View style={style.cityWeatherInfoDetail}>
            <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
            <Text> {temperature} </Text>
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
