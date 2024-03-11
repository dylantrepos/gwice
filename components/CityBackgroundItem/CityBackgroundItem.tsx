import { ImageBackground, View } from 'react-native';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { CityWeatherItem } from '../cityWeather/CityWeatherItem/CityWeatherItem';
import { TextItem } from '../general/TextItem/TextItem';
import style from './CityBackgroundItem.style';

export const CityBackgroundItem = () => {
  const { image, cityName } = useSelector((state: RootState) => state.generalReducer.currentCity);

  return (
    <View style={style.container}>
      <ImageBackground style={style.image} source={image.homeImage}></ImageBackground>
      <TextItem style={style.cityName}>{cityName}</TextItem>
      <CityWeatherItem />
    </View>
  );
};
