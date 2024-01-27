import { View, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'; 
import style from './CityBackgroundItem.style';
import { RootState } from '../../store/store';
import { CityWeatherItem } from '../Weather/CityWeatherItem/CityWeatherItem';
import { Text } from '../Text/Text';
import { CulturalEventsItem } from '../CulturalEvents/CulturalEventsItem/CulturalEventsItem';



export const CityBackgroundItem = () => {

  const { image, cityName } = useSelector((state: RootState) => state.general.currentCity);  

  return (
    <View style={style.container}>
      <ImageBackground 
        style={style.image} 
        source={image.homeImage}
      >
      </ImageBackground>
      <Text styles={style.cityName} weight='500'>
        { cityName }
      </Text>
      <CityWeatherItem />
    </View>
  );
};

