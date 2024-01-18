import React from 'react';
import { View, Image, Text } from 'react-native';
import style from './CityWeather.style';
import { SERVER_URL } from "@env" 

const CityWeatherHour = () => {
  return (
    <View style={style.cityWeatherSmallContainer}>
      <Image source={require('../assets/images/sun.png')} style={style.cityWeatherSmallImage} />
      <Text style={style.cityWeatherSmallTextTitle}>18°C</Text>
      <Text>14:00</Text>
    </View>
  );
}

export const CityWeather = () => {

  return (
    <View>
      <View style={style.cityWeatherLargeContainer}>
        <Image source={require('../assets/images/sun.png')} style={style.image} />
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
