import { View, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'; 
import style from './CityBackgroundItem.style';
import { RootState } from '../../store/store';
import { CityWeatherItem } from '../../modules/CityWeather/components/CityWeatherItem/CityWeatherItem';
import { TextItem } from '../TextItem/TextItem';



export const CityBackgroundItem = () => {

  const { image, cityName } = useSelector((state: RootState) => state.generalReducer.currentCity);  

  return (
    <View style={style.container}>
      <ImageBackground 
        style={style.image} 
        source={image.homeImage}
      >
      </ImageBackground>
      <TextItem styles={style.cityName} weight='300'>
        { cityName }
      </TextItem>
      <CityWeatherItem />
    </View>
  );
};

