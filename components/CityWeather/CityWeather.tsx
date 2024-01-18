import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import style from './CityWeather.style';
import useGetWeather from '../../hooks/useGetWeather';
// import axios from 'axios';

const CityWeatherHour = () => {
  return (
    <View style={style.cityWeatherSmallContainer}>
      <Image source={require('../../assets/images/sun.png')} style={style.cityWeatherSmallImage} />
      <Text style={style.cityWeatherSmallTextTitle}>18°C</Text>
      <Text>14:00</Text>
    </View>
  );
}

export const CityWeather = () => {

  // const [data, setData] = useState(null);
  const {isLoading, data} = useGetWeather();

  useEffect(() => { 
    if (!isLoading && data) {
      console.log({data});
    }
  }, [isLoading, data]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  //       setData(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <View>
      <View style={style.cityWeatherLargeContainer}>
        <Image source={require('../../assets/images/sun.png')} style={style.image} />
        <View>
          <Text style={style.textTitle}>18°C</Text>
          <Text>Précipitations : 94%</Text>
          <Text>Humidité : 89%</Text>
          <Text>Vent : 29 km/h</Text>
        </View>
      </View>
      <View style={style.cityWeatherListSmall}>
        <CityWeatherHour />
        <CityWeatherHour />
        <CityWeatherHour />
        <CityWeatherHour />
        <CityWeatherHour />
      </View>
    </View>
  );
};
