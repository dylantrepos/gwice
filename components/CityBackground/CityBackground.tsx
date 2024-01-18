import { View, Text, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'; 
import style from './CityBackground.style';
import { RootState } from '../../store/store';

import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { CityWeather } from '../CityWeather/CityWeather';

const CityBackground = () => {

  const { image, cityName } = useSelector((state: RootState) => state.general.currentCity);  

  const [fontsLoaded] = useFonts({
    'Poppins_400Regular': Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={style.container}>
      <ImageBackground  style={style.image} source={image.homeImage}>
        <Text style={style.cityName}>{cityName}</Text>
        <CityWeather />
      </ImageBackground>
    </View>
  );
};

export default CityBackground;
