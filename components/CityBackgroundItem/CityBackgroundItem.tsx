import { View, Text, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'; 
import style from './CityBackgroundItem.style';
import { RootState } from '../../store/store';
import { CityWeatherItem } from '../CityWeatherItem/CityWeatherItem';

export const CityBackgroundItem = () => {

  const { image, cityName } = useSelector((state: RootState) => state.general.currentCity);  

  return (
    <View style={style.container}>
      <ImageBackground 
        style={style.image} 
        source={image.homeImage}
      >
      </ImageBackground>
      <Text style={style.cityName}>
        { cityName }
      </Text>
      <CityWeatherItem />
    </View>
  );
};

