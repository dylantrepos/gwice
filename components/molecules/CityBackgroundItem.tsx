import { type ReactNode } from 'react';
import { ImageBackground, View } from 'react-native';
import { useSelector } from 'react-redux';
import { CityWeatherItem } from '../../features/Weather/components/organisms/CityWeatherItem/CityWeatherItem';
import { type RootState } from '../../store/store';
import style from '../../styles/components/molecules/CityBackgroundItem.style';
import { TextItem } from '../atoms/TextItem';

export const CityBackgroundItem = (): ReactNode => {
  const { image, cityName } = useSelector((state: RootState) => state.generalReducer.currentCity);

  return (
    <View style={style.container}>
      <ImageBackground style={style.image} source={image.homeImage}></ImageBackground>
      <TextItem style={style.cityName}>{cityName}</TextItem>
      <CityWeatherItem />
    </View>
  );
};
