import { View, Image, Text} from 'react-native';
import { weatherCodeIcons } from '../../../utils/weatherImgCode';
import style from './CityWeatherHourlyItem.style';
import { OpenMeteoDataHourly} from '../../../types/Weather';

type Props = {
  weather: OpenMeteoDataHourly;
}

export const CityWeatherHourlyItem = ({
  weather
}: Props) => {
  const { temperature, hour, weatherCode, isDay, date } = weather;
  const imageSource = weatherCodeIcons[isDay ? 'day' : 'night'][weatherCode];

  return (
    <View style={style.cityWeatherHourlyContainer}>
      <Text style={style.cityWeatherHourlyTextHour}>{hour}</Text>
      <Image source={imageSource} style={style.cityWeatherHourlyImage} />
      <Text style={style.cityWeatherHourlyTextTitle}>{temperature}</Text>
      <View style={style.halfBottomBorder} />
    </View>
  );
}
